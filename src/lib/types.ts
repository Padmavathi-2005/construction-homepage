export interface CMSHeroStage {
  id: string;
  order: number;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  mediaType: "image" | "gif" | "video";
  mediaUrl: string;
  thumbnailUrl?: string | null;
  startProgress: number;
  endProgress: number;
  animationMode: "hold" | "fade" | "crossfade" | "scrub" | "video-scrub";
  duration: number;
  enabled: boolean;
  continuityRef?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CMSMediaAsset {
  id: string;
  filename: string;
  storagePath: string;
  publicUrl: string;
  mediaType: "image" | "gif" | "video";
  mimeType: string;
  width?: number | null;
  height?: number | null;
  size: number;
  thumbnailUrl?: string | null;
  createdAt: string;
}

// Initial 10 architectural stages seeded from our photorealistic construction dataset
export const DEFAULT_INITIAL_STAGES: CMSHeroStage[] = [
  {
    id: "stage-01",
    order: 1,
    title: "EMPTY SITE",
    subtitle: "Topographic survey & boundary alignment",
    description: "Pristine graded natural terrain with surveyor stakes and boundary pegs in bright daylight.",
    mediaType: "image",
    mediaUrl: "/images/construction/stage-01-empty.jpg",
    thumbnailUrl: "/images/construction/stage-01-empty.jpg",
    startProgress: 0.0,
    endProgress: 0.08,
    animationMode: "crossfade",
    duration: 0,
    enabled: true,
    continuityRef: "Camera: 18mm architectural eye-level, facing north-east. Clear morning sunlight.",
  },
  {
    id: "stage-02",
    order: 2,
    title: "SITE PREPARATION",
    subtitle: "Earthwork excavation & geotechnical compaction",
    description: "Excavation grid, subterranean compaction, and foundation layout markers.",
    mediaType: "image",
    mediaUrl: "/images/construction/stage-01-empty.jpg",
    thumbnailUrl: "/images/construction/stage-01-empty.jpg",
    startProgress: 0.08,
    endProgress: 0.18,
    animationMode: "crossfade",
    duration: 0,
    enabled: true,
    continuityRef: "Same camera, surveyor boundary overlay enabled.",
  },
  {
    id: "stage-03",
    order: 3,
    title: "FOUNDATION",
    subtitle: "Reinforced concrete footings & ground beam grid",
    description: "Cured concrete footings, perimeter grade beams, rising steel rebar column cages.",
    mediaType: "image",
    mediaUrl: "/images/construction/stage-03-foundation.jpg",
    thumbnailUrl: "/images/construction/stage-03-foundation.jpg",
    startProgress: 0.18,
    endProgress: 0.3,
    animationMode: "crossfade",
    duration: 0,
    enabled: true,
    continuityRef: "Exact camera lock, grade beams poured.",
  },
  {
    id: "stage-04",
    order: 4,
    title: "STRUCTURAL FRAME",
    subtitle: "Primary structural columns & load-bearing cores",
    description: "Cast-in-place concrete pillars and load-bearing structural skeleton.",
    mediaType: "image",
    mediaUrl: "/images/construction/stage-04-frame.jpg",
    thumbnailUrl: "/images/construction/stage-04-frame.jpg",
    startProgress: 0.3,
    endProgress: 0.42,
    animationMode: "crossfade",
    duration: 0,
    enabled: true,
    continuityRef: "Exact horizon lock, 4.2m cantilever frame.",
  },
  {
    id: "stage-05",
    order: 5,
    title: "GROUND FLOOR",
    subtitle: "Lower level slabs & internal shear walls",
    description: "First floor ceiling slab and monolithic core concrete shear walls.",
    mediaType: "image",
    mediaUrl: "/images/construction/stage-04-frame.jpg",
    thumbnailUrl: "/images/construction/stage-04-frame.jpg",
    startProgress: 0.42,
    endProgress: 0.55,
    animationMode: "crossfade",
    duration: 0,
    enabled: true,
    continuityRef: "Same lighting direction, ground core walls.",
  },
  {
    id: "stage-06",
    order: 6,
    title: "SECOND FLOOR",
    subtitle: "Cantilevered upper volume & roof terrace slab",
    description: "Second level cantilever framing and upper roof terrace structural canopy.",
    mediaType: "image",
    mediaUrl: "/images/construction/stage-04-frame.jpg",
    thumbnailUrl: "/images/construction/stage-04-frame.jpg",
    startProgress: 0.55,
    endProgress: 0.68,
    animationMode: "crossfade",
    duration: 0,
    enabled: true,
    continuityRef: "Same cantilever alignment.",
  },
  {
    id: "stage-07",
    order: 7,
    title: "FACADE",
    subtitle: "Textured natural limestone masonry & precast cladding",
    description: "Warm-white textured limestone walls installed onto concrete structure.",
    mediaType: "image",
    mediaUrl: "/images/construction/stage-07-facade.jpg",
    thumbnailUrl: "/images/construction/stage-07-facade.jpg",
    startProgress: 0.68,
    endProgress: 0.8,
    animationMode: "crossfade",
    duration: 0,
    enabled: true,
    continuityRef: "Same camera, limestone wall cladding before glazing.",
  },
  {
    id: "stage-08",
    order: 8,
    title: "GLASS",
    subtitle: "Floor-to-ceiling structural glazing installation",
    description: "Triple-glazed acoustic floor-to-ceiling glass installed into black minimal frames.",
    mediaType: "image",
    mediaUrl: "/images/construction/stage-09-daylight.jpg",
    thumbnailUrl: "/images/construction/stage-09-daylight.jpg",
    startProgress: 0.8,
    endProgress: 0.88,
    animationMode: "crossfade",
    duration: 0,
    enabled: true,
    continuityRef: "Same building, glass reflection passes.",
  },
  {
    id: "stage-09",
    order: 9,
    title: "LANDSCAPE",
    subtitle: "Infinity reflecting pool, stone terrace & mature flora",
    description: "Reflecting pool filled with water, paved stone pathways, and manicured flora.",
    mediaType: "image",
    mediaUrl: "/images/construction/stage-09-daylight.jpg",
    thumbnailUrl: "/images/construction/stage-09-daylight.jpg",
    startProgress: 0.88,
    endProgress: 0.94,
    animationMode: "crossfade",
    duration: 0,
    enabled: true,
    continuityRef: "Pool water filled, loungers positioned.",
  },
  {
    id: "stage-10",
    order: 10,
    title: "COMPLETED RESIDENCE",
    subtitle: "Commissioned estate // Warm architectural twilight",
    description: "Fully completed residence transitioning into warm evening twilight with glowing interior architectural lighting.",
    mediaType: "image",
    mediaUrl: "/images/construction/stage-10-evening.jpg",
    thumbnailUrl: "/images/construction/stage-10-evening.jpg",
    startProgress: 0.94,
    endProgress: 1.0,
    animationMode: "crossfade",
    duration: 0,
    enabled: true,
    continuityRef: "Evening lighting transition, pool illumination.",
  },
];
