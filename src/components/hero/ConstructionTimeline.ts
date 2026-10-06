export interface ConstructionStage {
  id: number;
  phaseNumber: string;
  name: string;
  subhead: string;
  spec: string;
  activeImage: "empty" | "foundation" | "frame" | "facade" | "daylight" | "evening";
  progressStart: number;
  progressEnd: number;
}

export const CONSTRUCTION_STAGES: ConstructionStage[] = [
  {
    id: 1,
    phaseNumber: "01 / 10",
    name: "EMPTY SITE",
    subhead: "Topographic survey & boundary alignment",
    spec: "Plot Area: 22,400 sq.ft // Natural gradient 1:40",
    activeImage: "empty",
    progressStart: 0.0,
    progressEnd: 0.1,
  },
  {
    id: 2,
    phaseNumber: "02 / 10",
    name: "SITE PREPARATION",
    subhead: "Earthwork excavation & geotechnical compaction",
    spec: "Subgrade bearing capacity: 280 kN/m²",
    activeImage: "empty",
    progressStart: 0.1,
    progressEnd: 0.2,
  },
  {
    id: 3,
    phaseNumber: "03 / 10",
    name: "FOUNDATION",
    subhead: "Reinforced concrete footings & ground beam grid",
    spec: "Grade M40 Self-Compacting Concrete // Fe550D Rebar",
    activeImage: "foundation",
    progressStart: 0.2,
    progressEnd: 0.32,
  },
  {
    id: 4,
    phaseNumber: "04 / 10",
    name: "STRUCTURAL FRAME",
    subhead: "Primary structural columns & load-bearing cores",
    spec: "Post-tensioned cantilever beams // 8.4m clear span",
    activeImage: "frame",
    progressStart: 0.32,
    progressEnd: 0.44,
  },
  {
    id: 5,
    phaseNumber: "05 / 10",
    name: "FIRST FLOOR",
    subhead: "Lower level concrete slabs & internal shear walls",
    spec: "Ceiling height 3.6m // Acoustic thermal core",
    activeImage: "frame",
    progressStart: 0.44,
    progressEnd: 0.54,
  },
  {
    id: 6,
    phaseNumber: "06 / 10",
    name: "SECOND FLOOR",
    subhead: "Cantilevered upper volume & roof terrace slab",
    spec: "Structural overhang 4.2m // Integrated perimeter drainage",
    activeImage: "frame",
    progressStart: 0.54,
    progressEnd: 0.65,
  },
  {
    id: 7,
    phaseNumber: "07 / 10",
    name: "FACADE",
    subhead: "Textured natural limestone masonry & precast cladding",
    spec: "Warm-white Portuguese limestone & board-formed concrete",
    activeImage: "facade",
    progressStart: 0.65,
    progressEnd: 0.76,
  },
  {
    id: 8,
    phaseNumber: "08 / 10",
    name: "GLASS",
    subhead: "Floor-to-ceiling structural glazing installation",
    spec: "Low-E triple glazed acoustic panels // Minimalist mullions",
    activeImage: "daylight",
    progressStart: 0.76,
    progressEnd: 0.86,
  },
  {
    id: 9,
    phaseNumber: "09 / 10",
    name: "LANDSCAPE",
    subhead: "Infinity reflecting pool, stone terrace & mature flora",
    spec: "Filtered rainwater basin // Native drought-tolerant flora",
    activeImage: "daylight",
    progressStart: 0.86,
    progressEnd: 0.93,
  },
  {
    id: 10,
    phaseNumber: "10 / 10",
    name: "COMPLETED RESIDENCE",
    subhead: "Commissioned estate // Warm architectural twilight",
    spec: "LEED Platinum Certified // 100% Bespoke Residential Craft",
    activeImage: "evening",
    progressStart: 0.93,
    progressEnd: 1.0,
  },
];
