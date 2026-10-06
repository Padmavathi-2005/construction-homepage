"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface ScrollIndicatorProps {
  progress: MotionValue<number>;
  onClick?: () => void;
}

export default function ScrollIndicator({ progress, onClick }: ScrollIndicatorProps) {
  // Map progress (0 to 1) to vertical line fill scale (0 to 1)
  const fillScaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center gap-2 select-none cursor-pointer focus:outline-none pointer-events-auto"
      aria-label="Scroll to build construction"
    >
      <span className="text-[10px] font-mono tracking-[0.26em] uppercase text-[#555A57] group-hover:text-[#111111] transition-colors">
        Scroll to Build
      </span>

      {/* Very thin vertical progress indicator */}
      <div className="relative w-[1.5px] h-10 bg-[#111111]/15 overflow-hidden rounded-full">
        <motion.div
          style={{
            scaleY: fillScaleY,
          }}
          className="w-full h-full bg-[#0B5147] origin-top"
        />
      </div>
    </button>
  );
}
