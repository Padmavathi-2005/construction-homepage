"use client";

import React, { useEffect, useState, useRef } from "react";

export default function MovingHeroLogo() {
  const [mounted, setMounted] = useState(false);
  const [travelState, setTravelState] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    showTraveler: boolean;
    progress: number;
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    showTraveler: false,
    progress: 0,
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

      // RULE 1: Only move AFTER video completely ends or user is scrolled past hero
      const isVideoEnded = heroP >= 0.98 || scrollY > window.innerHeight * 0.6;

      const originEl = document.getElementById("hero-logo-origin");
      const dockEl = document.getElementById("hero-logo-dock");
      const dockContent = document.getElementById("hero-logo-dock-content");

      // While video is still playing/scrubbing or user is at the very top (scrollY <= 1)
      if (!isVideoEnded || scrollY <= 1) {
        if (originEl) originEl.style.opacity = "1";
        if (dockContent) dockContent.style.opacity = "0";

        setTravelState((prev) =>
          prev.showTraveler ? { ...prev, showTraveler: false, progress: 0 } : prev
        );
        rafIdRef.current = requestAnimationFrame(updatePosition);
        return;
      }

      // Max scroll travel distance: from scrollY = 0 to when Section 2 has arrived
      const maxScroll = Math.max(1, window.innerHeight * 0.85);
      const rawProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Check if dock is visible and has dimensions (desktop breakpoint)
      const dockRect = dockEl ? dockEl.getBoundingClientRect() : null;
      const isDockAvailable =
        dockRect && dockRect.width > 10 && dockRect.height > 10;

      if (!isDockAvailable || !originEl) {
        // Fallback for smaller screens where dock is hidden: keep origin visible, gently fade
        if (originEl) {
          originEl.style.opacity = String(
            Math.max(0, 1 - scrollY / (window.innerHeight * 0.5))
          );
        }
        setTravelState((prev) =>
          prev.showTraveler ? { ...prev, showTraveler: false } : prev
        );
        rafIdRef.current = requestAnimationFrame(updatePosition);
        return;
      }

      // At Section 2 destination (rawProgress >= 0.97)
      if (rawProgress >= 0.97) {
        if (originEl) originEl.style.opacity = "0";
        if (dockContent) dockContent.style.opacity = "1";

        setTravelState((prev) =>
          prev.showTraveler ? { ...prev, showTraveler: false, progress: 1 } : prev
        );
        rafIdRef.current = requestAnimationFrame(updatePosition);
        return;
      }

      // In flight: 0 < rawProgress < 0.97
      // Seamlessly hand off from static origin and dock to active traveler
      if (originEl) originEl.style.opacity = "0";
      if (dockContent) dockContent.style.opacity = "0";

      const originRect = originEl.getBoundingClientRect();

      // Starting center & dimensions (from origin logo in Hero)
      const pt1X = originRect.left + originRect.width / 2;
      const pt1Y = originRect.top + originRect.height / 2;
      const originW = originRect.width;
      const originH = originRect.height;

      // Ending center & dimensions (from dock in Section 2)
      const pt3X = dockRect.left + dockRect.width / 2;
      const pt3Y = dockRect.top + dockRect.height / 2;
      const dockW = dockRect.width;
      const dockH = dockRect.height;

      // Normalized progress for flight (0 to 1)
      const normProgress = Math.min(1, Math.max(0, rawProgress / 0.97));

      // Smooth easeInOutSine: begins smoothly on frame 1 without dead-zone hesitation, decelerates gently into dock
      const ease = 0.5 - Math.cos(normProgress * Math.PI) / 2;

      // Calculate interpolated center coordinates
      const currentX = pt1X + (pt3X - pt1X) * ease;
      const currentY = pt1Y + (pt3Y - pt1Y) * ease;

      // Exact pixel dimension interpolation: starts at 100% origin size, smoothly scales to dock size
      const currentWidth = originW + (dockW - originW) * ease;
      const currentHeight = originH + (dockH - originH) * ease;

      setTravelState({
        x: currentX,
        y: currentY,
        width: currentWidth,
        height: currentHeight,
        showTraveler: true,
        progress: ease,
      });

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

  if (!mounted || !travelState.showTraveler || travelState.width <= 0) return null;

  const ease = travelState.progress;
  const lightLogoOpacity = 1 - ease;
  const navyLogoOpacity = ease;
  const dropShadowAlpha = Math.max(0, 0.5 * (1 - ease * 1.5));
  const dropShadowBlur = Math.max(0, 18 * (1 - ease));

  return (
    <div
      aria-hidden="true"
      className="fixed z-40 pointer-events-none select-none will-change-transform"
      style={{
        left: `${travelState.x}px`,
        top: `${travelState.y}px`,
        width: `${travelState.width}px`,
        height: `${travelState.height}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Light Logo (White + Orange, active in dark hero, smoothly cross-fades out) */}
        <img
          src="/images/amogha-logo-light.png"
          alt=""
          className="w-full h-full object-contain absolute inset-0 select-none"
          style={{
            opacity: lightLogoOpacity,
            filter:
              dropShadowAlpha > 0.01
                ? `drop-shadow(0 4px ${dropShadowBlur}px rgba(0,0,0,${dropShadowAlpha}))`
                : "none",
          }}
        />

        {/* Navy Logo (Navy + Orange, active in light section, smoothly cross-fades in) */}
        <img
          src="/images/amogha-logo-transparent.png"
          alt=""
          className="w-full h-full object-contain absolute inset-0 select-none"
          style={{
            opacity: navyLogoOpacity,
          }}
        />
      </div>
    </div>
  );
}
