"use client";

import React, { useEffect, useRef, useState } from "react";
import { scrollToSection } from "@/lib/scroll";

export interface ProjectShowcaseItem {
  id: string;
  image: string;
  title: string;
  location: string;
  year: string;
  aspect: "portrait" | "square" | "landscape";
  alt: string;
}

export const SHOWCASE_PROJECTS: ProjectShowcaseItem[] = [
  {
    id: "01",
    image: "/images/projects/villa_portrait_01.jpg",
    title: "THE PAVILION RESIDENCE",
    location: "CHENNAI, TAMIL NADU",
    year: "2026",
    aspect: "portrait",
    alt: "Double-height glass facade of modern villa with interior ambient lighting and courtyard pool",
  },
  {
    id: "02",
    image: "/images/projects/courtyard_square_02.jpg",
    title: "TRAVERTINE REFLECTION COURTYARD",
    location: "BENGALURU, KARNATAKA",
    year: "2025",
    aspect: "square",
    alt: "Architectural detail of travertine stone wall, timber cantilevered pergola and calm reflection pool",
  },
  {
    id: "03",
    image: "/images/construction/stage-10-evening.jpg",
    title: "SANCTUARY HILL RESIDENCE",
    location: "COONOOR, NILGIRIS",
    year: "2026",
    aspect: "landscape",
    alt: "Evening architectural perspective of completed villa with panoramic illuminated glazing",
  },
  {
    id: "04",
    image: "/images/hero-architecture.jpg",
    title: "THE HORIZON VILLA",
    location: "HYDERABAD, TELANGANA",
    year: "2025",
    aspect: "landscape",
    alt: "Contemporary monolithic residential estate with cantilevered volumes and landscape terraces",
  },
  {
    id: "05",
    image: "/images/construction/stage-07-facade.jpg",
    title: "LIMESTONE & CONCRETE MONOLITH",
    location: "GOA COASTAL REGION",
    year: "2025",
    aspect: "landscape",
    alt: "Textured natural limestone masonry and architectural concrete facade integration",
  },
  {
    id: "06",
    image: "/images/construction/stage-09-daylight.jpg",
    title: "SERENE CANOPY ESTATE",
    location: "BENGALURU, KARNATAKA",
    year: "2026",
    aspect: "landscape",
    alt: "Sunlit architectural concrete and timber pavilion surrounded by lush tropical landscaping",
  },
  {
    id: "07",
    image: "/images/construction/stage-04-frame.jpg",
    title: "THE CANTILEVER RESIDENCE",
    location: "MYSURU, KARNATAKA",
    year: "2025",
    aspect: "landscape",
    alt: "Precision structural post-tensioned cantilever architecture framing open landscaped horizons",
  },
  {
    id: "08",
    image: "/images/construction/stage-03-foundation.jpg",
    title: "TERRA EMERALD RESIDENCE",
    location: "OOTY, NILGIRIS",
    year: "2025",
    aspect: "landscape",
    alt: "Engineered deep bedrock foundation and retaining stone masonry in mountain topography",
  },
];

// Mobile-only: simple swipeable carousel with scroll-snap, autoplay and dots
function MobileShowcaseCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const N = SHOWCASE_PROJECTS.length;

  const goTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  // Track the active slide from scroll position
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const first = track.children[0] as HTMLElement | undefined;
      if (!first) return;
      const step = first.offsetWidth + 12; // card width + gap
      setActive(Math.max(0, Math.min(N - 1, Math.round(track.scrollLeft / step))));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [N]);

  // Autoplay every 3.5s; pauses while the user is touching
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActive((prev) => {
        const next = (prev + 1) % N;
        goTo(next);
        return next;
      });
    }, 3500);
    return () => clearInterval(id);
  }, [N]);

  const pause = () => {
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };
  const resumeLater = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 4000);
  };

  return (
    <div className="md:hidden w-full pr-6 sm:pr-10 pb-10">
      <div
        ref={trackRef}
        onTouchStart={pause}
        onTouchEnd={resumeLater}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SHOWCASE_PROJECTS.map((project) => (
          <div key={project.id} className="snap-start shrink-0 w-[85%]">
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-[#E8DFC8]/80 bg-black/[0.02]">
              <img
                src={project.image}
                alt={project.alt}
                loading="lazy"
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <p className="font-jost text-white text-sm font-medium tracking-wide">{project.title}</p>
                <p className="font-mono text-[10px] tracking-wider text-white/80 uppercase">
                  {project.location} · {project.year}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {SHOWCASE_PROJECTS.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            aria-label={`Show project ${idx + 1}`}
            onClick={() => {
              pause();
              goTo(idx);
              resumeLater();
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === idx ? "w-6 bg-[#F26A1B]" : "w-1.5 bg-[#133E63]/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ArchitectureShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isVisibleRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const N = SHOWCASE_PROJECTS.length;
    const section = sectionRef.current;

    // Viewport visibility observer: autoplays when visible on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.12 }
    );

    if (section) {
      observer.observe(section);
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      const el = imageRefs.current[0];
      if (el) {
        el.style.transform = "translate3d(-50%, -50%, 0) scale(1)";
        el.style.opacity = "1";
      }
      return () => {
        if (section) observer.unobserve(section);
      };
    }

    // CONTINUOUS ROTATIONAL CIRCULAR CONVEYOR PARAMETERS:
    // Pacing: smooth, serene continuous rotational motion
    const SECONDS_PER_STAGE = 3.2;
    let rawProgress = 0; // floating playhead index: 0.0 to N
    let lastTime = performance.now();
    let cachedWinW = typeof window !== "undefined" ? window.innerWidth : 1200;
    let cachedVw = viewportRef.current?.clientWidth || 640;
    let cachedVh = viewportRef.current?.clientHeight || 600;

    const handleWindowResize = () => {
      cachedWinW = window.innerWidth;
    };
    window.addEventListener("resize", handleWindowResize);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          cachedVw = entry.contentRect.width;
          cachedVh = entry.contentRect.height;
        }
      }
    });

    if (viewportRef.current) {
      cachedVw = viewportRef.current.clientWidth || 640;
      cachedVh = viewportRef.current.clientHeight || 600;
      resizeObserver.observe(viewportRef.current);
    }

    const updateMotion = (timestamp: number) => {
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      // Arc stage is hidden on mobile (< 768px) — skip all layout work there
      if (cachedWinW < 768) {
        rafIdRef.current = requestAnimationFrame(updateMotion);
        return;
      }

      // Clamp delta if tab was inactive to avoid large jumps
      const safeDelta = Math.min(delta, 0.1);

      // Autoplays indefinitely with constant continuous conveyor velocity
      if (isVisibleRef.current) {
        rawProgress = (rawProgress + safeDelta / SECONDS_PER_STAGE) % N;
      }

      const progress = rawProgress;
      const vw = cachedVw;
      const vh = cachedVh;
      const winW = cachedWinW;

      const isWide = winW >= 1440;
      const isDesktop = winW >= 1024;
      const isTablet = winW >= 640 && winW < 1024;

      // RESPONSIVE SPACING & VISIBLE CARD COUNT:
      // Desktop / Wide: 5 to 6 cards simultaneously visible with strictly even spacing
      // Tablet: 4 cards visible
      // Mobile: 3 cards visible
      const visibleTarget = isWide ? 5.6 : isDesktop ? 5.0 : isTablet ? 4.0 : 3.2;
      const stepU = 2.0 / visibleTarget;

      // Responsive card width proportioned for widescreen aesthetics
      const cardWidth = isWide
        ? Math.min(Math.max(300, vw * 0.41), 390)
        : isDesktop
          ? Math.min(Math.max(280, vw * 0.45), 360)
          : isTablet
            ? Math.min(Math.max(260, vw * 0.55), 330)
            : Math.min(Math.max(240, vw * 0.75), 300);

      // FOCAL GEOMETRY:
      // The hero card apex is positioned towards center-left to showcase beside the editorial narrative
      const focalShiftX = isDesktop ? -0.19 : isTablet ? -0.09 : 0.00;
      const exitShiftX = isDesktop ? 0.32 : isTablet ? 0.25 : 0.20;

      // ELLIPTICAL ARC PARAMETERIZATION:
      // Total active arc span spans from u = -1.40 (top entrance) to u = +1.48 (bottom exit)
      const U_MIN = -1.40;
      const U_MAX = 1.48;
      const PHI_MAX = 1.15; // ~66 degrees

      const cosPhiMax = Math.cos(PHI_MAX);
      const spanCos = Math.max(0.001, 1 - cosPhiMax);
      const xRadius = ((exitShiftX - focalShiftX) * vw) / spanCos;
      const xCenter = focalShiftX * vw + xRadius;
      const yRadius = 0.47 * vh;

      // Raw parametric point at angle phi
      const rawPointAtPhi = (phi: number) => {
        const x = xCenter - xRadius * Math.cos(phi);
        const y = yRadius * Math.sin(phi);
        return { x, y };
      };

      // ARC-LENGTH UNIFORM LOOKUP TABLE:
      // Guarantees EXACT EQUAL SPACING in pixels between every adjacent card on the circular track
      const NUM_SAMPLES = 64;
      const samples: { x: number; y: number; dist: number }[] = [];
      let totalDist = 0;

      for (let sIdx = 0; sIdx <= NUM_SAMPLES; sIdx++) {
        const frac = sIdx / NUM_SAMPLES;
        const phi = (U_MIN + frac * (U_MAX - U_MIN)) * PHI_MAX;
        const pt = rawPointAtPhi(phi);
        if (sIdx === 0) {
          samples.push({ x: pt.x, y: pt.y, dist: 0 });
        } else {
          const prev = samples[sIdx - 1];
          const segDist = Math.hypot(pt.x - prev.x, pt.y - prev.y);
          totalDist += segDist;
          samples.push({ x: pt.x, y: pt.y, dist: totalDist });
        }
      }

      // Convert target normalized arc position u in [U_MIN, U_MAX] into (x, y) with strictly uniform arc distance
      const getArcPoint = (uVal: number) => {
        const clampedU = Math.max(U_MIN, Math.min(U_MAX, uVal));
        const targetFrac = (clampedU - U_MIN) / (U_MAX - U_MIN);
        const targetDist = targetFrac * totalDist;

        // Binary search to find segment
        let low = 0;
        let high = NUM_SAMPLES;
        while (low < high) {
          const mid = (low + high) >> 1;
          if (samples[mid].dist < targetDist) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }

        const idx = Math.max(1, low);
        const p0 = samples[idx - 1];
        const p1 = samples[idx];
        const segLen = p1.dist - p0.dist;
        const t = segLen > 0 ? (targetDist - p0.dist) / segLen : 0;

        return {
          x: p0.x + (p1.x - p0.x) * t,
          y: p0.y + (p1.y - p0.y) * t,
        };
      };

      // SCALE: Smooth gentle depth perspective
      const getScale = (uVal: number) => {
        const absU = Math.abs(uVal);
        return Math.max(0.74, 1.0 - 0.20 * Math.pow(Math.min(1.2, absU), 1.15));
      };

      // OPACITY: Immediate, prompt visibility for incoming card, solid in lower arc, smooth exit
      const getOpacity = (uVal: number) => {
        if (uVal < -1.40 || uVal > 1.48) return 0;

        // Fast entrance ramp right at the top-right boundary:
        if (uVal < -0.92) {
          const t = (uVal - (-1.40)) / (-0.92 - (-1.40));
          return Math.min(0.96, Math.max(0, 0.96 * t));
        }

        // Active visible arc: crisp, clear, vivid opacity
        if (uVal <= 0.0) {
          const t = (uVal - (-0.92)) / 0.92;
          return 0.96 + 0.04 * t; // 0.96 -> 1.00
        } else if (uVal <= 1.10) {
          // Card stays solidly visible throughout the lower-right area so images occur continuously
          const t = uVal / 1.10;
          return 1.00 - 0.04 * t; // 1.00 -> 0.96
        } else {
          // Exit fade-out right at the bottom-right edge from 1.10 to 1.48
          const t = (1.48 - uVal) / (1.48 - 1.10);
          return Math.min(0.96, Math.max(0, 0.96 * t));
        }
      };

      // Z-INDEX: Apex hero card is highest, cascading underneath cleanly
      const getZIndex = (uVal: number) => {
        const absU = Math.abs(uVal);
        if (absU < 0.25) return 35;
        if (uVal < 0) {
          return Math.max(10, Math.round(30 - absU * 12));
        } else {
          return Math.max(8, Math.round(26 - absU * 12));
        }
      };

      // Update all project cards along the circular conveyor with strictly identical spacing
      for (let i = 0; i < N; i++) {
        const el = imageRefs.current[i];
        if (!el) continue;

        // Cyclic relative index difference mapped to [-N/2, +N/2]
        let diff = (progress - i) % N;
        if (diff < -N / 2) diff += N;
        if (diff > N / 2) diff -= N;

        // Strict uniform arc position u: each card is separated by stepU
        const u = diff * stepU;

        // Card is outside visible conveyor arc
        if (u < -1.40 || u > 1.48) {
          el.style.opacity = "0";
          el.style.visibility = "hidden";
          el.style.pointerEvents = "none";
          continue;
        }

        el.style.visibility = "visible";

        // Evaluate strictly uniform arc-length position
        const { x, y } = getArcPoint(u);
        const scale = getScale(u);
        const opacity = getOpacity(u);
        const zIndex = getZIndex(u);

        // Hardware-accelerated transform with pixel-accurate positions
        el.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), 0) scale(${scale.toFixed(3)})`;
        el.style.width = `${cardWidth.toFixed(1)}px`;
        el.style.opacity = `${opacity.toFixed(3)}`;
        el.style.zIndex = `${zIndex}`;
      }

      rafIdRef.current = requestAnimationFrame(updateMotion);
    };

    // Immediate initial layout pass so cards render promptly on load
    updateMotion(performance.now());

    return () => {
      if (section) observer.unobserve(section);
      window.removeEventListener("resize", handleWindowResize);
      resizeObserver.disconnect();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-white text-[#111111] py-0 pl-6 sm:pl-10 md:pl-12 lg:pl-16 xl:pl-20 pr-0 overflow-hidden border-t border-[#133E63]/10"
    >
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">

          {/* ================= LEFT COLUMN: EDITORIAL ARCHITECTURAL NARRATIVE ================= */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 xl:col-span-5 2xl:col-span-5 flex flex-col justify-center z-30 pr-6 sm:pr-10 lg:pr-2 pt-4 sm:pt-6 pb-4 sm:pb-6"
          >
            {/* Top clearance space replacing removed badge */}
            <div className="h-2 sm:h-3" aria-hidden="true" />

            {/* Editorial Main Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] text-[#0C2340] font-normal tracking-[-0.02em] leading-[1.2] mb-4 sm:mb-5">
              Amogha Construction & Infrastructure — <br className="hidden sm:inline" />
              Crafting the Future!
            </h2>

            {/* Lead Description Text */}
            <p className="font-sans text-[15px] sm:text-[16px] text-[#222222] leading-relaxed font-normal mb-3.5 max-w-lg">
              The construction partner that brings your visions to life — transforming concepts into concrete architectural realities with uncompromising engineering precision.
            </p>

            {/* Secondary Narrative */}
            <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#555555] leading-relaxed font-normal max-w-lg">
              With 26 years of industry expertise, we stand tall as Bangalore&apos;s premier civil construction and architectural development solution, building enduring residential landmarks and advanced commercial infrastructure.
            </p>

            {/* Clean breathing space replacing removed feature cards */}
            <div className="h-8 sm:h-10 lg:h-12" aria-hidden="true" />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-7 sm:mb-8">
              <a
                href="#services"
                onClick={(e) => scrollToSection("services", e)}
                className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#133E63] text-white text-[11px] sm:text-xs font-sans font-semibold tracking-[0.14em] uppercase hover:bg-[#0D2E4A] transition-all duration-300 shadow-[0_4px_16px_rgba(19,62,99,0.22)] border border-[#F26A1B]/40"
              >
                <span>OUR SERVICES</span>
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 text-[#F26A1B]">
                  →
                </span>
              </a>

              <a
                href="#projects"
                onClick={(e) => scrollToSection("projects", e)}
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold tracking-[0.12em] uppercase text-[#133E63] hover:text-[#F26A1B] transition-colors py-2 px-1"
              >
                <span>VIEW PORTFOLIO</span>
                <span className="text-[#F26A1B]">↓</span>
              </a>
            </div>

            {/* Bottom Proof Metrics / Stats Strip */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-[#133E63]/12 max-w-lg">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#0C2340] tracking-tight">
                  26<span className="text-[#F26A1B]">+</span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#666666] mt-0.5">
                  Years Expertise
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#0C2340] tracking-tight">
                  180<span className="text-[#F26A1B]">+</span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#666666] mt-0.5">
                  Projects Built
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#0C2340] tracking-tight">
                  100<span className="text-[#F26A1B]">%</span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#666666] mt-0.5">
                  Quality Assured
                </div>
              </div>
            </div>
          </div>

          {/* ================= MOBILE ONLY: SIMPLE SWIPE CAROUSEL ================= */}
          <MobileShowcaseCarousel />

          {/* ================= TABLET / DESKTOP / TV: CIRCULAR ARCHITECTURAL SHOWCASE STAGE ================= */}
          <div
            ref={viewportRef}
            className="hidden md:flex lg:col-span-7 xl:col-span-7 2xl:col-span-7 relative h-[620px] lg:h-[680px] xl:h-[720px] w-full items-center justify-center overflow-hidden mb-0 pb-0"
          >
            {/* ================= HERO LOGO DESTINATION DOCK ================= */}
            <div
              id="hero-logo-dock"
              className="hidden lg:flex absolute right-6 sm:right-8 lg:right-12 xl:right-16 top-1/2 -translate-y-1/2 z-20 pointer-events-auto"
            >
              <div
                id="hero-logo-dock-content"
                style={{ opacity: 0 }}
                className="flex flex-col items-center justify-center transition-transform duration-300 hover:scale-[1.03]"
              >
                <img
                  src="/images/amogha-logo-transparent.png"
                  alt="Amogha Construction & Infrastructure"
                  className="h-16 sm:h-20 w-auto object-contain select-none"
                />
              </div>
            </div>

            {SHOWCASE_PROJECTS.map((project, idx) => (
              <div
                ref={(el) => {
                  imageRefs.current[idx] = el;
                }}
                key={project.id}
                className="absolute top-1/2 left-1/2 will-change-transform pointer-events-none"
              >
                {/* Image card: grand widescreen landscape format with sand border */}
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[16px] sm:rounded-[18px] lg:rounded-[20px] bg-black/[0.02] border border-[#E8DFC8]/80 shadow-[0_20px_50px_rgba(0,0,0,0.10)] flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover rounded-[16px] sm:rounded-[18px] lg:rounded-[20px] select-none"
                    loading="eager"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

