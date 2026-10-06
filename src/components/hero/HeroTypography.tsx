"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/lib/scroll";

interface HeroTypographyProps {
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  progress?: number;
}

const HERO_CONTENT = {
  heading: "BUILT TO BELONG",
  subheading: "Modern architecture rooted in its surroundings.",
};

/* Logo + heading + subheading + CTA block - always visible with transparent background */
function HeroBlock() {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Subtle ambient contrast so white text stays crisp over variable video brightness */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-20 -inset-y-12 bg-radial from-black/35 via-black/10 to-transparent pointer-events-none rounded-full blur-2xl -z-10"
      />

      <img
        id="hero-logo-origin"
        src="/images/amogha-logo-light.png"
        alt="Amogha Construction & Infrastructure"
        className="h-20 sm:h-24 md:h-28 w-auto object-contain mb-5 sm:mb-6 drop-shadow-[0_4px_18px_rgba(0,0,0,0.5)] transition-opacity duration-300"
      />

      <h1
        className="font-serif text-white font-normal tracking-[0.03em] text-[28px] sm:text-[38px] md:text-[52px] lg:text-[60px] xl:text-[68px] leading-none whitespace-nowrap"
        style={{ textShadow: "0 2px 14px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.6)" }}
      >
        {HERO_CONTENT.heading}
      </h1>

      <p
        className="mt-3 sm:mt-4 font-serif text-base sm:text-lg md:text-xl lg:text-[22px] text-white leading-relaxed tracking-[0.02em] max-w-2xl font-light"
        style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.5)" }}
      >
        {HERO_CONTENT.subheading}
      </p>

      <div className="mt-6 sm:mt-7 pointer-events-auto">
        <a
          href="#contact"
          onClick={(e) => scrollToSection("contact", e)}
          className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white hover:bg-white/95 text-[#0B1520] rounded-[12px] text-xs sm:text-[13px] font-sans font-semibold tracking-[0.14em] uppercase border border-white shadow-[0_8px_30px_rgba(0,0,0,0.22)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.32)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span>CONTACT US</span>
          <span className="inline-block text-xs transition-transform duration-250 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#F26A1B]">
            ↗
          </span>
        </a>
      </div>
    </div>
  );
}

export default function HeroTypography({ videoRef, progress = 0 }: HeroTypographyProps) {
  const [internalProgress, setInternalProgress] = useState(progress);

  useEffect(() => {
    setInternalProgress(progress);
  }, [progress]);

  useEffect(() => {
    const handleProgressEvent = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === "number") {
        setInternalProgress(customEvent.detail);
      }
    };

    window.addEventListener("hero-progress", handleProgressEvent);
    return () => {
      window.removeEventListener("hero-progress", handleProgressEvent);
    };
  }, []);

  const effectiveProgress = Math.max(progress, internalProgress);

  // Phase logic:
  // "start"   -> progress <= 0.04 (initial state before video scrubbing begins)
  // "playing" -> 0.04 < progress < 0.90 (video is playing / scrubbing; content moves left and hides)
  // "ended"   -> progress >= 0.90 (video has ended; content appears from the right)
  const phase: "start" | "playing" | "ended" =
    effectiveProgress >= 0.90
      ? "ended"
      : effectiveProgress <= 0.04
      ? "start"
      : "playing";

  return (
    <div
      aria-live="polite"
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-20 px-4 sm:px-6 overflow-hidden"
    >
      <AnimatePresence>
        {phase === "start" && (
          <motion.div
            key="start"
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -140 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroBlock />
          </motion.div>
        )}

        {phase === "ended" && (
          <motion.div
            key="ended"
            initial={{ opacity: 0, x: 140 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 140 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroBlock />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

