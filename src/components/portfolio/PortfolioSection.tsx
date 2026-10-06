"use client";

import React from "react";
import { Marquee3D } from "./Marquee3D";

export default function PortfolioSection() {
  return (
    <section
      id="projects"
      className="relative w-full h-[560px] sm:h-[640px] lg:h-[720px] xl:h-[780px] bg-white text-[#0C2340] overflow-hidden border-t border-[#E5E0D5] flex items-center justify-center"
    >
      {/* Target anchor alias so both #projects and #portfolio resolve here */}
      <span id="portfolio" className="sr-only" aria-hidden="true" />
      {/* ================= 3D MARQUEE AS IMMERSIVE BACKGROUND COVER ================= */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
        <Marquee3D />
      </div>

      {/* Minimal, subtle center contrast aura so images remain crystal clear and unblurred */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_35%_at_50%_50%,rgba(12,35,64,0.18)_0%,transparent_65%)]"
      />

      {/* ================= CENTER MIDDLE OVERLAY HEADING ================= */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-normal text-white tracking-[-0.02em] leading-none [text-shadow:_0_2px_6px_rgba(0,0,0,0.7),_0_1px_2px_rgba(0,0,0,0.9)] pointer-events-auto select-text">
          Our Portfolio
        </h2>
      </div>
    </section>
  );
}
