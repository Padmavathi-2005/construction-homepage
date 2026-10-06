import "server-only";
import fs from "fs";
import path from "path";
import { prisma } from "./prisma";
import { CMSHeroStage, CMSMediaAsset, DEFAULT_INITIAL_STAGES } from "./types";

export type { CMSHeroStage, CMSMediaAsset };
export { DEFAULT_INITIAL_STAGES };

// Persistent local JSON file fallback for instant zero-config operation
const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "hero-cms.json");

interface LocalStore {
  draft: CMSHeroStage[];
  published: CMSHeroStage[];
  media: CMSMediaAsset[];
  version: number;
}

function getStore(): LocalStore {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(STORE_FILE)) {
    const initial: LocalStore = {
      draft: [...DEFAULT_INITIAL_STAGES],
      published: [...DEFAULT_INITIAL_STAGES],
      media: [],
      version: 1,
    };
    fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  }

  try {
    const content = fs.readFileSync(STORE_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    return {
      draft: [...DEFAULT_INITIAL_STAGES],
      published: [...DEFAULT_INITIAL_STAGES],
      media: [],
      version: 1,
    };
  }
}

function saveStore(store: LocalStore): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
}

/**
 * Normalizes startProgress and endProgress across ordered stages:
 * - Images have 0 duration (milestone checkpoints, no waiting time)
 * - Videos add only their exact duration (e.g. 6.0s)
 */
export function normalizeStageProgress(stages: CMSHeroStage[]): CMSHeroStage[] {
  const count = stages.length;
  if (count === 0) return [];

  // Enforce: images have no duration (0)
  const sanitized = stages.map((s, idx) => ({
    ...s,
    order: idx + 1,
    duration: s.mediaType === "image" ? 0 : s.duration || 0,
  }));

  const totalVideoDuration = sanitized.reduce(
    (acc, s) => acc + (s.mediaType === "video" ? s.duration : 0),
    0
  );

  if (totalVideoDuration > 0) {
    let current = 0;
    return sanitized.map((stage, idx) => {
      const weight = stage.mediaType === "video" ? stage.duration : 0;
      const span =
        totalVideoDuration > 0 && weight > 0
          ? weight / totalVideoDuration
          : 1 / count;
      const start = Number(current.toFixed(3));
      current += span;
      const end = Number(
        (idx === count - 1 ? 1.0 : Math.min(1, current)).toFixed(3)
      );
      return {
        ...stage,
        startProgress: start,
        endProgress: end,
      };
    });
  }

  return sanitized.map((stage, idx) => {
    const start = Number((idx / count).toFixed(3));
    const end = Number(((idx + 1) / count).toFixed(3));
    return {
      ...stage,
      startProgress: start,
      endProgress: end,
    };
  });
}

/**
 * Public Homepage Data Layer:
 * Fetches only enabled stages, sorted by order.
 * If draft === true, returns draft sequence for /admin/hero/preview.
 */
export async function getHeroStages(isDraft = false): Promise<CMSHeroStage[]> {
  // 1. Attempt PostgreSQL through Prisma
  try {
    const sequence = await prisma.heroSequence.findFirst({
      where: { isPublished: !isDraft },
      include: {
        stages: {
          where: { enabled: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (sequence && sequence.stages.length > 0) {
      return sequence.stages.map((s) => ({
        id: s.id,
        order: s.order,
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
        mediaType: (s.mediaType as "image" | "gif" | "video") || "image",
        mediaUrl: s.mediaUrl,
        thumbnailUrl: s.thumbnailUrl,
        startProgress: s.startProgress,
        endProgress: s.endProgress,
        animationMode: (s.animationMode as any) || "crossfade",
        duration: s.duration,
        enabled: s.enabled,
        continuityRef: s.continuityRef,
        createdAt: s.createdAt.toISOString(),
        updatedAt: s.updatedAt.toISOString(),
      }));
    }
  } catch (err) {
    // If DB is offline or migrating, gracefully proceed to persistent store
  }

  // 2. Resilient Persistent Store Fallback
  const store = getStore();
  const list = isDraft ? store.draft : store.published;
  return list.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
}

/**
 * Admin: Get all stages including disabled ones
 */
export async function getAdminStages(isDraft = true): Promise<CMSHeroStage[]> {
  const store = getStore();
  return (isDraft ? store.draft : store.published).sort((a, b) => a.order - b.order);
}

/**
 * Admin: Save Draft Stages
 */
export async function saveDraftStages(stages: CMSHeroStage[]): Promise<CMSHeroStage[]> {
  const store = getStore();
  store.draft = stages;
  store.version += 1;
  saveStore(store);

  // Sync with Prisma if database available
  try {
    const draftSeq = await prisma.heroSequence.upsert({
      where: { id: "draft-sequence-01" },
      create: {
        id: "draft-sequence-01",
        name: "Draft Hero Sequence",
        isPublished: false,
        version: store.version,
      },
      update: {
        version: store.version,
      },
    });

    // Replace stages
    await prisma.heroStage.deleteMany({
      where: { sequenceId: draftSeq.id },
    });

    for (const stage of stages) {
      await prisma.heroStage.create({
        data: {
          id: stage.id,
          sequenceId: draftSeq.id,
          order: stage.order,
          title: stage.title,
          subtitle: stage.subtitle,
          description: stage.description,
          mediaType: stage.mediaType,
          mediaUrl: stage.mediaUrl,
          thumbnailUrl: stage.thumbnailUrl,
          startProgress: stage.startProgress,
          endProgress: stage.endProgress,
          animationMode: stage.animationMode,
          duration: stage.duration,
          enabled: stage.enabled,
          continuityRef: stage.continuityRef,
        },
      });
    }
  } catch (err) {
    // Persistent store already persisted
  }

  return store.draft;
}

/**
 * Admin: Publish current draft to live
 */
export async function publishHeroSequence(): Promise<{ success: boolean; version: number }> {
  const store = getStore();
  store.published = JSON.parse(JSON.stringify(store.draft));
  store.version += 1;
  saveStore(store);

  // Sync to PostgreSQL if connected
  try {
    const pubSeq = await prisma.heroSequence.upsert({
      where: { id: "published-sequence-01" },
      create: {
        id: "published-sequence-01",
        name: "Published Hero Sequence",
        isPublished: true,
        version: store.version,
      },
      update: {
        version: store.version,
      },
    });

    await prisma.heroStage.deleteMany({
      where: { sequenceId: pubSeq.id },
    });

    for (const stage of store.published) {
      await prisma.heroStage.create({
        data: {
          id: stage.id,
          sequenceId: pubSeq.id,
          order: stage.order,
          title: stage.title,
          subtitle: stage.subtitle,
          description: stage.description,
          mediaType: stage.mediaType,
          mediaUrl: stage.mediaUrl,
          thumbnailUrl: stage.thumbnailUrl,
          startProgress: stage.startProgress,
          endProgress: stage.endProgress,
          animationMode: stage.animationMode,
          duration: stage.duration,
          enabled: stage.enabled,
          continuityRef: stage.continuityRef,
        },
      });
    }
  } catch (err) {
    // Local store is already published
  }

  return { success: true, version: store.version };
}

/**
 * Media Library Operations
 */
export async function getAllMediaAssets(): Promise<CMSMediaAsset[]> {
  try {
    const dbAssets = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (dbAssets.length > 0) {
      return dbAssets.map((a) => ({
        id: a.id,
        filename: a.filename,
        storagePath: a.storagePath,
        publicUrl: a.publicUrl,
        mediaType: a.mediaType as any,
        mimeType: a.mimeType,
        width: a.width,
        height: a.height,
        size: a.size,
        thumbnailUrl: a.thumbnailUrl,
        createdAt: a.createdAt.toISOString(),
      }));
    }
  } catch {
    // Proceed to store
  }

  const store = getStore();
  return store.media;
}

export async function saveMediaAsset(asset: CMSMediaAsset): Promise<CMSMediaAsset> {
  const store = getStore();
  const existingIdx = store.media.findIndex((m) => m.id === asset.id);
  if (existingIdx >= 0) {
    store.media[existingIdx] = asset;
  } else {
    store.media.unshift(asset);
  }
  saveStore(store);

  try {
    await prisma.mediaAsset.upsert({
      where: { id: asset.id },
      create: {
        id: asset.id,
        filename: asset.filename,
        storagePath: asset.storagePath,
        publicUrl: asset.publicUrl,
        mediaType: asset.mediaType,
        mimeType: asset.mimeType,
        width: asset.width,
        height: asset.height,
        size: asset.size,
        thumbnailUrl: asset.thumbnailUrl,
      },
      update: {
        publicUrl: asset.publicUrl,
        size: asset.size,
      },
    });
  } catch {}

  return asset;
}

/**
 * Delete Safety Check:
 * Checks if a media item is currently referenced by any published or draft stage.
 */
export async function checkMediaUsage(mediaUrl: string): Promise<{
  isUsedInPublished: boolean;
  isUsedInDraft: boolean;
  affectedStages: string[];
}> {
  const store = getStore();
  const publishedUsed = store.published.filter(
    (s) => s.mediaUrl === mediaUrl || s.thumbnailUrl === mediaUrl
  );
  const draftUsed = store.draft.filter(
    (s) => s.mediaUrl === mediaUrl || s.thumbnailUrl === mediaUrl
  );

  const affectedStages = Array.from(
    new Set([...publishedUsed, ...draftUsed].map((s) => `${s.order}. ${s.title}`))
  );

  return {
    isUsedInPublished: publishedUsed.length > 0,
    isUsedInDraft: draftUsed.length > 0,
    affectedStages,
  };
}

export async function deleteMediaAsset(
  mediaId: string,
  force = false
): Promise<{ success: boolean; error?: string }> {
  const store = getStore();
  const asset = store.media.find((m) => m.id === mediaId);
  if (!asset) {
    return { success: false, error: "Asset not found" };
  }

  const usage = await checkMediaUsage(asset.publicUrl);
  if (usage.isUsedInPublished && !force) {
    return {
      success: false,
      error: `This media is currently used by published hero stage(s): ${usage.affectedStages.join(
        ", "
      )}. Explicit confirmation required.`,
    };
  }

  store.media = store.media.filter((m) => m.id !== mediaId);
  saveStore(store);

  try {
    await prisma.mediaAsset.delete({ where: { id: mediaId } });
  } catch {}

  return { success: true };
}
