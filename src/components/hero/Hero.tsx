"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import HeroTypography from "./HeroTypography";

interface HeroProps {
  videoUrl?: string;
  reverseVideoUrl?: string;
  isDraft?: boolean;
}

export default function Hero({
  videoUrl = "/hero-construction-stream.mp4",
  reverseVideoUrl = "/hero-construction-stream-reverse.mp4",
  isDraft,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const forwardVideoRef = useRef<HTMLVideoElement>(null);
  const reverseVideoRef = useRef<HTMLVideoElement>(null);

  const [isReversing, setIsReversing] = useState(false);
  const [normalizedProgress, setNormalizedProgress] = useState(0);

  const heroCompleteRef = useRef(false);
  const isReversingRef = useRef(false);
  const scrollInactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const twoSecondGraceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const fwdVid = forwardVideoRef.current;
    const revVid = reverseVideoRef.current;

    // Utility: lock page scroll so user's scroll gestures scrub the video until complete
    const lockScroll = () => {
      document.documentElement.classList.add("lenis-stopped");
      const lenis = (window as any).__lenis;
      lenis?.stop();
    };

    // Utility: unlock scroll so user can scroll to subsequent sections
    const unlockScroll = () => {
      document.documentElement.classList.remove("lenis-stopped");
      const lenis = (window as any).__lenis;
      lenis?.start();
    };

    // Clear all playback continuation timers
    const clearTimers = () => {
      if (scrollInactivityTimerRef.current) {
        clearTimeout(scrollInactivityTimerRef.current);
        scrollInactivityTimerRef.current = null;
      }
      if (twoSecondGraceTimerRef.current) {
        clearTimeout(twoSecondGraceTimerRef.current);
        twoSecondGraceTimerRef.current = null;
      }
    };

    // Completion handler: hero video has fully finished playing forward
    const handleVideoCompletion = () => {
      const fwd = forwardVideoRef.current;
      if (heroCompleteRef.current) return;

      heroCompleteRef.current = true;
      isReversingRef.current = false;
      setIsReversing(false);

      clearTimers();

      if (fwd && fwd.duration && isFinite(fwd.duration)) {
        fwd.currentTime = fwd.duration;
        if (!fwd.paused) fwd.pause();
      }

      setNormalizedProgress(1.0);
      if (typeof window !== "undefined") {
        (window as any).__heroProgress = 1.0;
        window.dispatchEvent(new CustomEvent("hero-progress", { detail: 1.0 }));
      }
      unlockScroll();
    };

    // Forward Play: native hardware-accelerated playback at natural 1x speed with instant trigger
    const playForward = (deltaMagnitude = 0) => {
      const fwd = forwardVideoRef.current;
      const rev = reverseVideoRef.current;
      if (!fwd) return;

      // Lazy-load reverse video on first user interaction so initial page load is 100% instant
      if (rev && rev.preload !== "auto") {
        rev.preload = "auto";
      }

      clearTimers();

      // If switching from reverse to forward: seamlessly synchronize timestamps
      if (isReversingRef.current) {
        isReversingRef.current = false;
        setIsReversing(false);

        if (rev && !rev.paused) {
          rev.pause();
        }

        if (rev && rev.duration && isFinite(rev.duration) && rev.duration > 0 && fwd.duration && isFinite(fwd.duration)) {
          const revProgress = rev.currentTime / rev.duration;
          const targetFwdTime = Math.max(0, Math.min(fwd.duration, (1 - revProgress) * fwd.duration));
          fwd.currentTime = targetFwdTime;
        }
      }

      // If near completion (generous threshold so user never feels stuck at the end)
      if (fwd.duration && isFinite(fwd.duration) && (fwd.currentTime >= fwd.duration - 0.2 || fwd.ended)) {
        handleVideoCompletion();
        return;
      }

      // Standard natural 1x cinematic playback speed
      fwd.playbackRate = 1.0;

      // Trigger and play immediately with zero delay
      if (fwd.paused) {
        fwd.play().catch(() => {});
      }

      // Inactivity debounce: 150ms no scroll -> 1.0s grace continuation -> smooth pause
      scrollInactivityTimerRef.current = setTimeout(() => {
        if (twoSecondGraceTimerRef.current) {
          clearTimeout(twoSecondGraceTimerRef.current);
        }

        twoSecondGraceTimerRef.current = setTimeout(() => {
          const v = forwardVideoRef.current;
          if (v && !v.paused && !heroCompleteRef.current) {
            v.pause();
          }
          twoSecondGraceTimerRef.current = null;
        }, 1000);

        scrollInactivityTimerRef.current = null;
      }, 150);
    };

    // Reverse Play: plays dedicated reverse video at natural 1x speed with instant trigger
    const playReverse = (deltaMagnitude = 0) => {
      const fwd = forwardVideoRef.current;
      const rev = reverseVideoRef.current;
      if (!rev) return;

      if (heroCompleteRef.current) {
        heroCompleteRef.current = false;
        lockScroll();
      }

      clearTimers();

      // If switching from forward to reverse: seamlessly synchronize timestamps
      if (!isReversingRef.current) {
        isReversingRef.current = true;
        setIsReversing(true);

        if (fwd && !fwd.paused) {
          fwd.pause();
        }

        if (fwd && fwd.duration && isFinite(fwd.duration) && fwd.duration > 0 && rev.duration && isFinite(rev.duration)) {
          const fwdProgress = fwd.currentTime / fwd.duration;
          const targetRevTime = Math.max(0, Math.min(rev.duration, (1 - fwdProgress) * rev.duration));
          rev.currentTime = targetRevTime;
        }
      }

      // Check if reverse reached start of construction
      if (rev.duration && isFinite(rev.duration) && rev.currentTime >= rev.duration - 0.2) {
        rev.pause();
        rev.currentTime = rev.duration;
        if (fwd) fwd.currentTime = 0;
        isReversingRef.current = false;
        setIsReversing(false);
        setNormalizedProgress(0);
        return;
      }

      // Standard natural 1x cinematic playback speed
      rev.playbackRate = 1.0;

      // Trigger and play reverse stream immediately with zero delay
      if (rev.paused) {
        rev.play().catch(() => {});
      }

      // Inactivity debounce: 150ms no scroll -> 1.0s grace continuation -> smooth pause
      scrollInactivityTimerRef.current = setTimeout(() => {
        if (twoSecondGraceTimerRef.current) {
          clearTimeout(twoSecondGraceTimerRef.current);
        }

        twoSecondGraceTimerRef.current = setTimeout(() => {
          const v = reverseVideoRef.current;
          if (v && !v.paused) {
            v.pause();
          }
          twoSecondGraceTimerRef.current = null;
        }, 1000);

        scrollInactivityTimerRef.current = null;
      }, 150);
    };

    // Initial setup on mount
    if (fwdVid) {
      fwdVid.muted = true;
      if (window.scrollY > 100) {
        heroCompleteRef.current = true;
        if (fwdVid.duration && isFinite(fwdVid.duration)) {
          fwdVid.currentTime = fwdVid.duration;
        }
        setNormalizedProgress(1.0);
        if (typeof window !== "undefined") {
          (window as any).__heroProgress = 1.0;
          window.dispatchEvent(new CustomEvent("hero-progress", { detail: 1.0 }));
        }
        unlockScroll();
      } else {
        heroCompleteRef.current = false;
        if (fwdVid.currentTime > 0) {
          fwdVid.currentTime = 0;
        }
        fwdVid.pause();
        lockScroll();
      }
    }

    if (revVid) {
      revVid.muted = true;
      revVid.pause();
    }

    // Accessibility: prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      heroCompleteRef.current = true;
      if (fwdVid && fwdVid.duration && isFinite(fwdVid.duration)) {
        fwdVid.currentTime = fwdVid.duration;
      }
      setNormalizedProgress(1.0);
      unlockScroll();
      return;
    }

    // Mouse wheel handler: NEVER block scroll once user is beyond top of page
    const handleWheel = (e: WheelEvent) => {
      // If user has scrolled into subsequent sections, allow 100% free native/Lenis scroll
      if (heroCompleteRef.current && window.scrollY > 0) return;

      if (!heroCompleteRef.current) {
        if (e.deltaY > 0) {
          e.preventDefault();
          playForward(Math.abs(e.deltaY));
        } else if (e.deltaY < 0) {
          e.preventDefault();
          playReverse(Math.abs(e.deltaY));
        }
      } else if (window.scrollY <= 2 && e.deltaY < 0) {
        // At very top edge, scrolling up reverses hero video
        e.preventDefault();
        playReverse(Math.abs(e.deltaY));
      }
    };

    // Touch handlers for mobile / tablet
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (heroCompleteRef.current && window.scrollY > 0) return;

      const currentY = e.touches[0].clientY;
      const delta = touchStartY - currentY;
      touchStartY = currentY;

      if (!heroCompleteRef.current) {
        if (e.cancelable) e.preventDefault();
        if (delta > 1) {
          playForward(Math.abs(delta) * 2);
        } else if (delta < -1) {
          playReverse(Math.abs(delta) * 2);
        }
      } else if (window.scrollY <= 2 && delta < -1) {
        if (e.cancelable) e.preventDefault();
        playReverse(Math.abs(delta) * 2);
      }
    };

    // Keyboard navigation (ArrowDown/ArrowUp, Space, PageDown/PageUp)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (heroCompleteRef.current && window.scrollY > 0) return;

      const forwardKeys = ["ArrowDown", "PageDown", "Space"];
      const backwardKeys = ["ArrowUp", "PageUp"];

      if (!heroCompleteRef.current) {
        if (forwardKeys.includes(e.code) || forwardKeys.includes(e.key)) {
          e.preventDefault();
          playForward(100);
        } else if (backwardKeys.includes(e.code) || backwardKeys.includes(e.key)) {
          e.preventDefault();
          playReverse(100);
        }
      } else if (window.scrollY <= 2 && (backwardKeys.includes(e.code) || backwardKeys.includes(e.key))) {
        e.preventDefault();
        playReverse(100);
      }
    };

    // Scroll listener: only mark complete if deeply scrolled past hero (e.g. from anchor navigation)
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        if (!heroCompleteRef.current) {
          handleVideoCompletion();
        }
      }
    };

    // Anchor click handler (e.g. navigation menu clicks)
    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]');
      if (anchor) {
        handleVideoCompletion();
      }
    };

    // 60fps RAF loop: calculates real-time progress & manages edge completions smoothly
    const updateLoop = () => {
      const fwd = forwardVideoRef.current;
      const rev = reverseVideoRef.current;

      if (isReversingRef.current) {
        if (rev && rev.duration && isFinite(rev.duration) && rev.duration > 0) {
          const revProgress = rev.currentTime / rev.duration;
          const currentProgress = Math.max(0, Math.min(1, 1 - revProgress));
          setNormalizedProgress(currentProgress);
          if (typeof window !== "undefined") {
            (window as any).__heroProgress = currentProgress;
            window.dispatchEvent(new CustomEvent("hero-progress", { detail: currentProgress }));
          }

          // Reached end of reverse stream (initial empty ground)
          if (rev.currentTime >= rev.duration - 0.04 || rev.ended) {
            rev.pause();
            rev.currentTime = rev.duration;
            if (fwd) fwd.currentTime = 0;
            isReversingRef.current = false;
            setIsReversing(false);
            setNormalizedProgress(0);
            if (typeof window !== "undefined") {
              (window as any).__heroProgress = 0.0;
              window.dispatchEvent(new CustomEvent("hero-progress", { detail: 0.0 }));
            }
            clearTimers();
          }
        }
      } else {
        if (fwd && fwd.duration && isFinite(fwd.duration) && fwd.duration > 0) {
          const currentProgress = Math.max(0, Math.min(1, fwd.currentTime / fwd.duration));
          setNormalizedProgress(currentProgress);
          if (typeof window !== "undefined") {
            (window as any).__heroProgress = currentProgress;
            window.dispatchEvent(new CustomEvent("hero-progress", { detail: currentProgress }));
          }

          // Reached end of forward stream (completed residence)
          if (!heroCompleteRef.current) {
            if (fwd.currentTime >= fwd.duration - 0.15 || fwd.ended) {
              handleVideoCompletion();
            }
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    rafIdRef.current = requestAnimationFrame(updateLoop);

    if (fwdVid) {
      fwdVid.addEventListener("ended", handleVideoCompletion);
      fwdVid.addEventListener("error", unlockScroll);
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleDocClick);

    const handleLenisReady = () => {
      if (heroCompleteRef.current || window.scrollY > 100) {
        unlockScroll();
      } else {
        lockScroll();
      }
    };
    window.addEventListener("lenis:ready", handleLenisReady);

    const handleForceUnlock = () => {
      handleVideoCompletion();
    };
    window.addEventListener("hero-force-unlock", handleForceUnlock);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleDocClick);
      window.removeEventListener("lenis:ready", handleLenisReady);
      window.removeEventListener("hero-force-unlock", handleForceUnlock);

      if (fwdVid) {
        fwdVid.removeEventListener("ended", handleVideoCompletion);
        fwdVid.removeEventListener("error", unlockScroll);
      }

      clearTimers();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      unlockScroll();
    };
  }, []);

  const handleLoadedMetadata = () => {
    const fwd = forwardVideoRef.current;
    if (!fwd) return;
    fwd.muted = true;
    if (window.scrollY === 0 && !heroCompleteRef.current) {
      if (fwd.currentTime > 0) fwd.currentTime = 0;
      fwd.pause();
    }
  };

  const handleReverseLoadedMetadata = () => {
    const rev = reverseVideoRef.current;
    if (!rev) return;
    rev.muted = true;
    rev.pause();
  };

  return (
    <div
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden select-none"
    >
      {/* 1. Forward Stream Video: Plays natively forward on scroll down */}
      <video
        ref={forwardVideoRef}
        src={videoUrl}
        poster="/hero-poster.webp"
        preload="auto"
        muted
        playsInline
        autoPlay={false}
        loop={false}
        controls={false}
        disablePictureInPicture
        onLoadedMetadata={handleLoadedMetadata}
        className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-150 ${
          isReversing ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* 2. Reverse Stream Video: Plays natively forward on scroll up for 100% 60fps smooth rewind */}
      <video
        ref={reverseVideoRef}
        src={reverseVideoUrl}
        poster="/hero-poster.webp"
        preload="none"
        muted
        playsInline
        autoPlay={false}
        loop={false}
        controls={false}
        disablePictureInPicture
        onLoadedMetadata={handleReverseLoadedMetadata}
        className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-150 ${
          isReversing ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Center Editorial Typography with direct dual-stream progress synchronization */}
      <HeroTypography videoRef={forwardVideoRef} progress={normalizedProgress} />
    </div>
  );
}
