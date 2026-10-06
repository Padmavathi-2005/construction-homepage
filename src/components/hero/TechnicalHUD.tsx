"use client";

import React from "react";
import { ConstructionStage } from "./ConstructionTimeline";

interface TechnicalHUDProps {
  currentStage: ConstructionStage;
  progressPercent: number;
}

export default function TechnicalHUD({
  currentStage,
  progressPercent,
}: TechnicalHUDProps) {
  return (
    <div className="select-none pointer-events-auto">
      {/* Small Elegant Technical HUD */}
      <div className="bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E8E8E3] px-4 py-3 sm:px-5 sm:py-3.5 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.04)]">
        {/* Top Header: Phase number & Emerald Dot */}
        <div className="flex items-center justify-between gap-4 mb-1.5 pb-1.5 border-b border-[#F1F1EC]">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "var(--primary)" }}
            />
            <span
              className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase font-semibold"
              style={{ color: "var(--primary)" }}
            >
              PHASE {currentStage.phaseNumber}
            </span>
          </div>

          <span className="text-[10px] font-mono text-[#555A57] tabular-nums">
            {progressPercent}%
          </span>
        </div>

        {/* Phase Name in IBM Plex Mono */}
        <div className="space-y-0.5">
          <div className="text-xs sm:text-sm font-mono font-medium tracking-[0.14em] text-[#111111] uppercase">
            {currentStage.name}
          </div>
          <p className="text-[10px] sm:text-[11px] font-sans text-[#555A57] tracking-wide">
            {currentStage.subhead}
          </p>
        </div>

        {/* Subtle Spec Tag */}
        <div className="mt-2 pt-2 border-t border-[#F1F1EC] text-[9px] font-mono text-[#8B8F8D] tracking-tight">
          {currentStage.spec}
        </div>
      </div>
    </div>
  );
}
