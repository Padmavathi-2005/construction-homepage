"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroContentProps {
  heading: string;
  subheading: string;
}

export default function HeroContent({ heading, subheading }: HeroContentProps) {
  return (
    <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4 sm:px-6 select-none pointer-events-none">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={heading}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center w-full"
        >
          {/* Main Bright Luminous Heading */}
          <h1
            style={{
              textShadow:
                "0 2px 4px rgba(0,0,0,0.95), 0 4px 20px rgba(0,0,0,0.85), 0 0 45px rgba(112,71,235,0.45)",
            }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.6rem] font-serif font-medium text-white leading-[1.1] tracking-tight mb-4 max-w-4xl mx-auto"
          >
            {heading}
          </h1>

          {/* Subheading in Bright Crisp White */}
          <p
            style={{
              textShadow:
                "0 1px 3px rgba(0,0,0,0.95), 0 2px 12px rgba(0,0,0,0.85), 0 0 25px rgba(112,71,235,0.35)",
            }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-sans text-white leading-relaxed max-w-3xl mx-auto tracking-wide font-normal"
          >
            {subheading}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

