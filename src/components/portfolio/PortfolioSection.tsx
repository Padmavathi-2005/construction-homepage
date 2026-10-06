"use client";

import React from "react";
import { Marquee3D } from "./Marquee3D";

export default function PortfolioSection() {
  return (
    <section
      id="projects"
      className="relative w-full h-[560px] sm:h-[640px] lg:h-[720px] xl:h-[780px] bg-[#133e63] text-white overflow-hidden border-t border-[#1b527e]/50 flex items-center justify-center"
    >
      {/* Target anchor alias so both #projects and #portfolio resolve here */}
      <span id="portfolio" className="sr-only" aria-hidden="true" />
      {/* ================= 3D MARQUEE AS IMMERSIVE BACKGROUND COVER ================= */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
        <Marquee3D />
      </div>

      {/* ================= CENTER MIDDLE OVERLAY HEADING ================= */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <h2 className="font-jost text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-normal text-white tracking-[-0.01em] leading-none [text-shadow:_0_2px_12px_rgba(0,0,0,0.35)] pointer-events-auto select-text">
          Our Portfolio
        </h2>
      </div>
    </section>
  );
}
