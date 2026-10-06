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

      {/* ================= CENTER FULL-WIDTH PRIMARY COLOR BANNER ================= */}
      <div className="relative z-20 w-full py-5 sm:py-6 lg:py-7 bg-[#133e63] border-y border-[#1b527e]/70 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-center text-center pointer-events-auto select-text">
        <h2 className="font-jost text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-white tracking-[-0.01em] leading-none">
          Our Portfolio
        </h2>
      </div>
    </section>
  );
}
