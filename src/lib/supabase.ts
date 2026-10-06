import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "amogha-hero-media";

// Check if valid Supabase configuration is present
const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseServiceKey) &&
  !supabaseUrl.includes("your-project.supabase.co");

export const supabaseServer = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    })
  : null;

export interface UploadResult {
  publicUrl: string;
  storagePath: string;
  filename: string;
  size: number;
  mimeType: string;
  mediaType: "image" | "gif" | "video";
}

export const ALLOWED_MIME_TYPES: Record<string, "image" | "gif" | "video"> = {
  "image/jpeg": "image",
  "image/png": "image",
  "image/webp": "image",
  "image/gif": "gif",
  "video/mp4": "video",
  "video/webm": "video",
};

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB max

export async function uploadMediaFile(
  buffer: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<UploadResult> {
  const mediaType = ALLOWED_MIME_TYPES[mimeType.toLowerCase()];
  if (!mediaType) {
    throw new Error(
      `Unsupported file type: "${mimeType}". Allowed formats: JPG, PNG, WEBP, GIF, MP4, WEBM`
    );
  }

  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    throw new Error(
      `File size exceeds 50MB limit (uploaded: ${(
        buffer.length /
        (1024 * 1024)
      ).toFixed(1)}MB)`
    );
  }

  const ext = path.extname(originalFilename) || (mediaType === "video" ? ".mp4" : ".jpg");
  const sanitizedBase = path
    .basename(originalFilename, ext)
    .replace(/[^a-zA-Z0-9-_]/g, "_")
    .toLowerCase();
  const timestamp = Date.now();
  const uniqueFilename = `${sanitizedBase}-${timestamp}${ext}`;
  const storagePath = `hero/${uniqueFilename}`;

  // 1. If Supabase is configured, upload to Supabase Storage
  if (supabaseServer) {
    try {
      const { data, error } = await supabaseServer.storage
        .from(bucketName)
        .upload(storagePath, buffer, {
          contentType: mimeType,
          upsert: false,
        });

      if (error) {
        console.warn("Supabase upload error, falling back to local:", error.message);
      } else if (data) {
        const { data: publicData } = supabaseServer.storage
          .from(bucketName)
          .getPublicUrl(storagePath);

        return {
          publicUrl: publicData.publicUrl,
          storagePath,
          filename: originalFilename,
          size: buffer.length,
          mimeType,
          mediaType,
        };
      }
    } catch (err) {
      console.warn("Supabase client failed, using local storage:", err);
    }
  }

  // 2. Resilient Local Storage Fallback (stores in public/uploads/)
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const localFilePath = path.join(uploadsDir, uniqueFilename);
  await fs.promises.writeFile(localFilePath, buffer);

  const localPublicUrl = `/uploads/${uniqueFilename}`;

  return {
    publicUrl: localPublicUrl,
    storagePath: `local/${uniqueFilename}`,
    filename: originalFilename,
    size: buffer.length,
    mimeType,
    mediaType,
  };
}
