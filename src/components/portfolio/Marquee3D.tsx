"use client";

import React from "react";
import { Marquee } from "./Marquee";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=640&h=420&q=80`;

// Premium Architectural & Construction Photography Portfolio (44 Curated High-Res Cards across 11 Columns)
const images = [
  // Col 1: Far Left edge coverage
  { id: "1600585154340-be6161a56a0c", title: "Cantilever Villa Kronos", category: "Residential Architecture" },
  { id: "1600596542815-ffad4c1539a9", title: "Serene Horizon Estate", category: "Contemporary Exterior" },
  { id: "1600607687939-ce8a6c25118c", title: "The Timber & Steel Monolith", category: "Modern Facade" },
  { id: "1512917774080-9991f1c4c750", title: "Azure Horizon Residence", category: "Luxury Architecture" },

  // Col 2: Left corner coverage
  { id: "1600566753376-12c8ab7fb75b", title: "Travertine Reflection Villa", category: "Modern Residential" },
  { id: "1613490493576-7fde63acd811", title: "Glasshouse Sanctuary", category: "Architectural Estate" },
  { id: "1513694203232-719a280e022f", title: "Minimalist Geometry Home", category: "Modern Residential" },
  { id: "1503387762-592deb58ef4e", title: "Architectural Drafting & Plan", category: "Structural Engineering" },

  // Col 3: Mid-Left
  { id: "1618221195710-dd6b41faaea6", title: "Bespoke Travertine Lounge", category: "Interior Architecture" },
  { id: "1600210492486-724fe5c67fb0", title: "Architectural Marble Kitchen", category: "Interior Design" },
  { id: "1616486338812-3dadae4b4ace", title: "Panoramic Horizon Suite", category: "Master Bedroom" },
  { id: "1584622650111-993a426fbf0a", title: "Sculpted Stone Bath Spa", category: "Luxury Ensuite" },

  // Col 4: Center-Left
  { id: "1617806118233-18e1de247200", title: "Artisan Dining Pavilion", category: "Interior Living" },
  { id: "1600585152220-90363fe7e115", title: "Double-Height Atrium Residence", category: "Interior Architecture" },
  { id: "1581094794329-c8112a89af12", title: "Acoustic Design Pavilion", category: "Commercial Interiors" },
  { id: "1545324418-cc1a3fa10c00", title: "Urban Terraces Apartment", category: "Residential Building" },

  // Col 5: Left-Center
  { id: "1486406146926-c627a92ad1ab", title: "Louvered Commercial Complex", category: "Commercial Architecture" },
  { id: "1600607687920-4e2a09cf159d", title: "Textured Limestone Joinery", category: "Architectural Detail" },
  { id: "1504307651254-35680f356dfd", title: "Engineered Framework & Core", category: "Civil Engineering" },
  { id: "1531834685032-c34bf0d84c77", title: "Reflective Glass Highrise", category: "Structural Execution" },

  // Col 6: True Center
  { id: "1574958269340-fa927503f3dd", title: "Parametric Facade Tower", category: "Modern Architecture" },
  { id: "1590381105924-c72589b9ef3f", title: "Sculptural Concrete Gallery", category: "Architectural Pavilion" },
  { id: "1600585154340-be6161a56a0c", title: "Skyline Terrace Villa", category: "Residential Architecture" },
  { id: "1600596542815-ffad4c1539a9", title: "Waterfront Coastal Residence", category: "Contemporary Exterior" },

  // Col 7: Right-Center
  { id: "1512917774080-9991f1c4c750", title: "Summit View Villa", category: "Luxury Architecture" },
  { id: "1600566753376-12c8ab7fb75b", title: "Travertine Reflection Villa", category: "Modern Residential" },
  { id: "1613490493576-7fde63acd811", title: "Glasshouse Sanctuary", category: "Architectural Estate" },
  { id: "1513694203232-719a280e022f", title: "Minimalist Geometry Home", category: "Modern Residential" },

  // Col 8: Mid-Right
  { id: "1618221195710-dd6b41faaea6", title: "Bespoke Travertine Lounge", category: "Interior Architecture" },
  { id: "1600607687939-ce8a6c25118c", title: "The Timber & Steel Monolith", category: "Modern Facade" },
  { id: "1504307651254-35680f356dfd", title: "Engineered Framework & Core", category: "Civil Engineering" },
  { id: "1545324418-cc1a3fa10c00", title: "Urban Terraces Apartment", category: "Residential Building" },

  // Col 9: Right-Mid
  { id: "1600585152220-90363fe7e115", title: "Double-Height Atrium Residence", category: "Interior Architecture" },
  { id: "1584622650111-993a426fbf0a", title: "Sculpted Stone Bath Spa", category: "Luxury Ensuite" },
  { id: "1531834685032-c34bf0d84c77", title: "Reflective Glass Highrise", category: "Structural Execution" },
  { id: "1600585154340-be6161a56a0c", title: "Cantilever Villa Kronos", category: "Residential Architecture" },

  // Col 10: Far Right-Mid
  { id: "1600596542815-ffad4c1539a9", title: "Serene Horizon Estate", category: "Contemporary Exterior" },
  { id: "1600607687939-ce8a6c25118c", title: "The Timber & Steel Monolith", category: "Modern Facade" },
  { id: "1512917774080-9991f1c4c750", title: "Azure Horizon Residence", category: "Luxury Architecture" },
  { id: "1600566753376-12c8ab7fb75b", title: "Travertine Reflection Villa", category: "Modern Residential" },

  // Col 11: Far Right edge coverage
  { id: "1613490493576-7fde63acd811", title: "Glasshouse Sanctuary", category: "Architectural Estate" },
  { id: "1513694203232-719a280e022f", title: "Minimalist Geometry Home", category: "Modern Residential" },
  { id: "1503387762-592deb58ef4e", title: "Architectural Drafting & Plan", category: "Structural Engineering" },
  { id: "1618221195710-dd6b41faaea6", title: "Bespoke Travertine Lounge", category: "Interior Architecture" },
];

export function Marquee3D() {
  // Partition images across 11 columns to provide mathematically complete edge-to-edge coverage
  const col1 = images.slice(0, 4);
  const col2 = images.slice(4, 8);
  const col3 = images.slice(8, 12);
  const col4 = images.slice(12, 16);
  const col5 = images.slice(16, 20);
  const col6 = images.slice(20, 24);
  const col7 = images.slice(24, 28);
  const col8 = images.slice(28, 32);
  const col9 = images.slice(32, 36);
  const col10 = images.slice(36, 40);
  const col11 = images.slice(40, 44);

  const renderCard = (img: (typeof images)[0], idx: number) => (
    <div
      key={`${img.id}-${idx}`}
      className="group/card relative w-56 sm:w-60 md:w-64 aspect-[16/11] rounded-2xl overflow-hidden bg-[#0d2e4a] border border-white/20 transition-all duration-500 ease-out hover:scale-[1.03] hover:border-[#F26A1B]"
    >
      <img
        src={photo(img.id)}
        alt={img.title}
        loading="lazy"
        className="w-full h-full object-cover select-none brightness-[1.02] contrast-[1.02] transition-transform duration-700 ease-out group-hover/card:scale-108"
      />
      {/* Subtle architectural overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C2340]/90 via-[#0C2340]/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <span className="font-mono text-[9px] tracking-[0.2em] text-[#F26A1B] uppercase font-semibold mb-0.5">
          {img.category}
        </span>
        <h4 className="font-jost text-white text-sm sm:text-base font-medium tracking-tight leading-snug">
          {img.title}
        </h4>
      </div>
    </div>
  );

  return (
    <div className="relative flex h-full min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] w-full flex-row items-center justify-center overflow-hidden [perspective:800px] lg:[perspective:1000px]">
      <div
        className="flex flex-row items-center gap-4 sm:gap-5 shrink-0"
        style={{
          transform:
            "translateX(-180px) translateY(0px) translateZ(-50px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee vertical repeat={8} pauseOnHover className="h-[2200px] sm:h-[2400px] lg:h-[2500px] [--duration:24s]">
          {col1.map((item, i) => renderCard(item, i))}
        </Marquee>
        <Marquee vertical reverse repeat={8} pauseOnHover className="h-[2200px] sm:h-[2400px] lg:h-[2500px] [--duration:28s]">
          {col2.map((item, i) => renderCard(item, i))}
        </Marquee>
        <Marquee vertical repeat={8} pauseOnHover className="h-[2200px] sm:h-[2400px] lg:h-[2500px] [--duration:22s]">
          {col3.map((item, i) => renderCard(item, i))}
        </Marquee>
        <Marquee vertical reverse repeat={8} pauseOnHover className="h-[2200px] sm:h-[2400px] lg:h-[2500px] [--duration:26s]">
          {col4.map((item, i) => renderCard(item, i))}
        </Marquee>
        <Marquee vertical repeat={8} pauseOnHover className="h-[2200px] sm:h-[2400px] lg:h-[2500px] [--duration:25s]">
          {col5.map((item, i) => renderCard(item, i))}
        </Marquee>
        <Marquee vertical reverse repeat={8} pauseOnHover className="h-[2200px] sm:h-[2400px] lg:h-[2500px] [--duration:29s]">
          {col6.map((item, i) => renderCard(item, i))}
        </Marquee>
        <Marquee vertical repeat={8} pauseOnHover className="h-[2200px] sm:h-[2400px] lg:h-[2500px] [--duration:23s]">
          {col7.map((item, i) => renderCard(item, i))}
        </Marquee>
        <Marquee vertical reverse repeat={8} pauseOnHover className="h-[2200px] sm:h-[2400px] lg:h-[2500px] [--duration:27s]">
          {col8.map((item, i) => renderCard(item, i))}
        </Marquee>
        <Marquee vertical repeat={8} pauseOnHover className="h-[2200px] sm:h-[2400px] lg:h-[2500px] [--duration:24s]">
          {col9.map((item, i) => renderCard(item, i))}
        </Marquee>
        <Marquee vertical reverse repeat={8} pauseOnHover className="h-[2200px] sm:h-[2400px] lg:h-[2500px] [--duration:28s]">
          {col10.map((item, i) => renderCard(item, i))}
        </Marquee>
        <Marquee vertical repeat={8} pauseOnHover className="h-[2200px] sm:h-[2400px] lg:h-[2500px] [--duration:26s]">
          {col11.map((item, i) => renderCard(item, i))}
        </Marquee>
      </div>

      {/* Subtle edge blending at extreme borders into the primary navy background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 sm:h-12 bg-gradient-to-b from-[#133e63] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 sm:h-12 bg-gradient-to-t from-[#133e63] to-transparent z-10" />
    </div>
  );
}

export default Marquee3D;
