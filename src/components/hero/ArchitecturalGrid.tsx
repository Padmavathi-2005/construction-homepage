"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ArchitecturalGrid() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-10 select-none overflow-hidden"
    >
      {/* Outer bounding structural lines */}
      <div className="absolute inset-x-6 md:inset-x-12 top-0 h-full border-x border-white/[0.04]" />
      <div className="absolute inset-y-6 md:inset-y-12 left-0 w-full border-y border-white/[0.04]" />

      {/* Top Left Crosshair */}
      <div className="absolute top-6 md:top-12 left-6 md:left-12 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <span className="text-[10px] font-mono text-[#C8753D]/60 tracking-wider">
          +
        </span>
      </div>

      {/* Top Right Crosshair */}
      <div className="absolute top-6 md:top-12 right-6 md:right-12 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <span className="text-[10px] font-mono text-[#C8753D]/60 tracking-wider">
          +
        </span>
      </div>

      {/* Bottom Left Crosshair */}
      <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 -translate-x-1/2 translate-y-1/2 flex items-center justify-center">
        <span className="text-[10px] font-mono text-[#C8753D]/60 tracking-wider">
          +
        </span>
      </div>

      {/* Bottom Right Crosshair */}
      <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 translate-x-1/2 translate-y-1/2 flex items-center justify-center">
        <span className="text-[10px] font-mono text-[#C8753D]/60 tracking-wider">
          +
        </span>
      </div>

      {/* Subtle Vertical Elevation Line (Right Side Desktop) */}
      <div className="hidden lg:flex flex-col items-center absolute right-8 top-1/2 -translate-y-1/2 space-y-4">
        <span className="text-[9px] font-mono tracking-widest text-[#A8A29E]/40 [writing-mode:vertical-rl] uppercase">
          ELEVATION // 124.8m
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#C8753D]/40 via-white/10 to-transparent" />
      </div>

      {/* Subtle Horizontal Axis Line (Left Side Desktop) */}
      <div className="hidden lg:flex items-center absolute left-8 top-1/2 -translate-y-1/2 space-x-3">
        <div className="w-8 h-[1px] bg-white/20" />
        <span className="text-[9px] font-mono tracking-widest text-[#A8A29E]/40 uppercase">
          AXIS 01-A
        </span>
      </div>
    </div>
  );
}
