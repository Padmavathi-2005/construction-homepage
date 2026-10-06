"use client";

import React, { useEffect, useState, useRef } from "react";

export default function MovingHeroLogo() {
  const [mounted, setMounted] = useState(false);
  const [travelState, setTravelState] = useState<{
    x: number;
    y: number;
    scale: number;
    cardOpacity: number;
    navyLogoOpacity: number;
    showTraveler: boolean;
    activePoint: 1 | 2 | 3;
  }>({
    x: 0,
    y: 0,
    scale: 1,
    cardOpacity: 0,
    navyLogoOpacity: 0,
    showTraveler: false,
    activePoint: 1,
  });

  const heroProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const handleHeroProgress = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === "number") {
        heroProgressRef.current = customEvent.detail;
      }
    };

    window.addEventListener("hero-progress", handleHeroProgress);

    const updatePosition = () => {
      const scrollY = window.scrollY;
      const heroP =
        heroProgressRef.current || (window as any).__heroProgress || 0;

      // RULE 1: Only move AFTER video completely ends
      const isVideoEnded = heroP >= 0.98 || scrollY > window.innerHeight * 0.6;

      const originEl = document.getElementById("hero-logo-origin");
      const dockEl = document.getElementById("hero-logo-dock");
      const dockContent = document.getElementById("hero-logo-dock-content");

      if (!isVideoEnded || scrollY <= 2) {
        // Stays firmly at Point 1 (Hero Center) while video is playing
        if (originEl) originEl.style.opacity = "1";
        if (dockContent) dockContent.style.opacity = "0";

        setTravelState((prev) =>
          prev.showTraveler ? { ...prev, showTraveler: false, activePoint: 1 } : prev
        );
        rafIdRef.current = requestAnimationFrame(updatePosition);
        return;
      }

      // RULE 2: Scroll-driven 3-point progression ("one by one move while scroll")
      // Point 1: Hero Center (Start)
      // Point 2: Dynamic Mid-Flight Waypoint (Midway right)
      // Point 3: Section 2 Destination Dock (End)
      const maxScroll = Math.max(1, window.innerHeight * 0.75);
      const s = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Handoff logic at limits
      if (s <= 0.02) {
        if (originEl) originEl.style.opacity = "1";
        if (dockContent) dockContent.style.opacity = "0";
      } else if (s >= 0.96) {
        if (originEl) originEl.style.opacity = "0";
        if (dockContent) dockContent.style.opacity = "1";
      } else {
        if (originEl) originEl.style.opacity = "0";
        if (dockContent) dockContent.style.opacity = "0";
      }

      const showTraveler = s > 0.02 && s < 0.96;

      if (showTraveler && originEl && dockEl) {
        const originRect = originEl.getBoundingClientRect();
        const dockRect = dockEl.getBoundingClientRect();

        // Point 1 coordinates
        const pt1X = originRect.left + originRect.width / 2;
        const pt1Y = originRect.top + originRect.height / 2;

        // Point 3 coordinates
        const pt3X = dockRect.left + dockRect.width / 2;
        const pt3Y = dockRect.top + dockRect.height / 2;

        // Smooth continuous trajectory from Origin (Hero Center) to Dock (Section 2)
        const progress = Math.min(1, Math.max(0, (s - 0.02) / 0.94));
        // Smooth cubic ease-in-out curve
        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const currentX = pt1X + (pt3X - pt1X) * ease;
        const currentY = pt1Y + (pt3Y - pt1Y) * ease;
        const currentScale = 1.0 - 0.12 * ease;

        setTravelState({
          x: currentX,
          y: currentY,
          scale: currentScale,
          cardOpacity: 0,
          navyLogoOpacity: ease,
          showTraveler: true,
          activePoint: 1,
        });
      } else {
        setTravelState((prev) =>
          prev.showTraveler ? { ...prev, showTraveler: false } : prev
        );
      }

      rafIdRef.current = requestAnimationFrame(updatePosition);
    };

    rafIdRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("hero-progress", handleHeroProgress);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  if (!mounted || !travelState.showTraveler) return null;

  const lightLogoOpacity = 1 - travelState.navyLogoOpacity;

  return (
    <div
      aria-hidden="true"
      className="fixed z-40 pointer-events-none select-none transition-transform will-change-transform"
      style={{
        left: `${travelState.x}px`,
        top: `${travelState.y}px`,
        transform: `translate(-50%, -50%) scale(${travelState.scale})`,
      }}
    >
      {/* Pure Transparent Logo Moving - No card background or box shadow */}
      <div className="relative h-16 sm:h-20 w-44 sm:w-56 flex items-center justify-center">
        {/* Light Logo (White + Orange, active at Point 1 in dark hero) */}
        <img
          src="/images/amogha-logo-light.png"
          alt="Amogha Construction & Infrastructure"
          className="h-full w-auto object-contain transition-opacity duration-150 absolute"
          style={{ opacity: lightLogoOpacity }}
        />

        {/* Navy Logo (Navy + Orange, transparent background, active at Point 3 in light section) */}
        <img
          src="/images/amogha-logo-transparent.png"
          alt="Amogha Construction & Infrastructure"
          className="h-full w-auto object-contain transition-opacity duration-150 absolute"
          style={{ opacity: travelState.navyLogoOpacity }}
        />
      </div>
    </div>
  );
}
