"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll parallax effect
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 180]);
  const scaleParallax = useTransform(scrollY, [0, 800], [1, 1.08]);

  // Subtle interactive mouse tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 90 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x * 20); // subtle max 20px
    mouseY.set(y * 20);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 w-full h-full overflow-hidden select-none bg-[#0A0A0A]"
    >
      {/* Animated Image Wrapper with reveal and subtle Ken Burns parallax */}
      <motion.div
        style={{
          y: yParallax,
          scale: scaleParallax,
          x: smoothX,
        }}
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1.03 }}
        transition={{
          opacity: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 3.5, ease: [0.16, 1, 0.3, 1] },
        }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src="/images/hero-architecture.jpg"
          alt="Vanguard & Kronos - Brutalist Luxury Concrete & Copper Architecture at Dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter contrast-[1.05] brightness-[0.82]"
        />
      </motion.div>

      {/* Layered Architectural Shadows & Vignette */}
      {/* 1. Header gradient for pristine navigation legibility */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/50 to-transparent pointer-events-none z-10" />

      {/* 2. Soft radial vignette centering focus on the structure */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(10,10,10,0.65)_90%)] pointer-events-none z-10" />

      {/* 3. Bottom gradient blending into deep charcoal background */}
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent pointer-events-none z-10" />

      {/* 4. Left content contrast booster */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-2/3 bg-gradient-to-r from-[#0A0A0A]/85 via-[#0A0A0A]/50 to-transparent pointer-events-none z-10" />

      {/* 5. Subtle warm copper atmospheric glow accent reflecting the materials */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#C8753D]/10 blur-[130px] pointer-events-none z-10 mix-blend-screen" />

      {/* 6. Film grain texture overlay for tactile high-end architectural feel */}
      <div className="film-grain" />
    </div>
  );
}
