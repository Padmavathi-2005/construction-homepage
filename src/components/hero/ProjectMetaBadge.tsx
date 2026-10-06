"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Compass, Layers } from "lucide-react";

interface ProjectMetaBadgeProps {
  delay?: number;
}

export default function ProjectMetaBadge({ delay = 1.2 }: ProjectMetaBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative max-w-sm w-full"
    >
      {/* Background card with glassmorphism */}
      <div className="relative glass-panel rounded-none p-5 md:p-6 border border-white/10 hover:border-[#C8753D]/40 transition-colors duration-500 overflow-hidden backdrop-blur-md bg-[#0D0D0D]/85">
        {/* Subtle top copper accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8753D] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Header row with coordinates & status */}
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] font-mono text-[#C8753D] uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8753D] animate-pulse" />
            FEATURED MONOGRAPH
          </div>
          <span className="text-[10px] font-mono text-[#A8A29E] tracking-wider">
            N° 084 / 2026
          </span>
        </div>

        {/* Title and typology */}
        <div className="space-y-1 mb-4">
          <h2 className="text-sm md:text-base font-display font-semibold tracking-wide text-[#F5F3EE] uppercase group-hover:text-white transition-colors">
            Villa Kronos Sanctuary
          </h2>
          <p className="text-xs text-[#A8A29E] font-sans flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#C8753D] shrink-0" />
            Austevoll Fjord, Norway (60.085° N, 5.234° E)
          </p>
        </div>

        {/* Architectural Specs Grid */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.06] text-[11px]">
          <div>
            <span className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#A8A29E]/70 mb-0.5">
              Materiality
            </span>
            <span className="text-[#F5F3EE] font-mono text-[10px] tracking-tight">
              Raw Concrete & Brushed Copper
            </span>
          </div>

          <div>
            <span className="block text-[9px] font-mono uppercase tracking-[0.18em] text-[#A8A29E]/70 mb-0.5">
              Structural Span
            </span>
            <span className="text-[#F5F3EE] font-mono text-[10px] tracking-tight">
              1,340 m² // Post-Tensioned
            </span>
          </div>
        </div>

        {/* Subtle corner marker */}
        <div className="absolute bottom-1 right-2 text-[8px] font-mono text-white/20 select-none">
          SEC.01
        </div>
      </div>
    </motion.div>
  );
}
