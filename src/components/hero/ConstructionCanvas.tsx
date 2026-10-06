"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { MotionValue } from "framer-motion";

interface ConstructionCanvasProps {
  progress: MotionValue<number>;
  posterUrl?: string;
  videoUrl?: string;
  onVideoProgress?: (progress: number) => void;
}

export default function ConstructionCanvas({
  progress,
  posterUrl = "/images/construction/empty-land-start.jpg",
  videoUrl = "/uploads/construction_site_preparation_an__20261001170339-1790918836934.mp4",
  onVideoProgress,
}: ConstructionCanvasProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Start video playback and fade out poster
  const startVideoPlayback = useCallback(() => {
    const video = videoRef.current;
    const poster = posterRef.current;
    if (!video) return;

    if (poster) {
      poster.style.opacity = "0";
    }

    if (video.paused && !video.ended) {
      video.play().catch((err) => {
        console.warn("Playback autoplay note:", err);
      });
    }
  }, []);

  // Initialize and pause video on mount so it begins on scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Real-time animation frame loop to report smooth video progress to sync headings/stages
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animId: number;

    const reportLoop = () => {
      if (video && video.duration && isFinite(video.duration) && video.duration > 0) {
        const prog = video.currentTime / video.duration;
        onVideoProgress?.(Math.min(1, Math.max(0, prog)));
      }
      animId = requestAnimationFrame(reportLoop);
    };

    animId = requestAnimationFrame(reportLoop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [onVideoProgress]);

  // Instant response to any mouse wheel flick
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        startVideoPlayback();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [startVideoPlayback]);

  // Instant response to mobile/touch drag
  useEffect(() => {
    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      if (startY - currentY > 5) {
        startVideoPlayback();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [startVideoPlayback]);

  // Scroll listener:
  // - Scrolling even a tiny bit starts the video and it continues to the end!
  // - If user aggressively scrolls down, it fast-forwards ahead without stopping.
  // - If user scrolls back to the very top, it resets back to 0.
  useEffect(() => {
    const video = videoRef.current;
    const poster = posterRef.current;
    if (!video) return;

    return progress.on("change", (latest) => {
      const clamped = Math.max(0, Math.min(1, latest));

      if (clamped <= 0.005) {
        // Reset when scrolled back to top
        video.pause();
        video.currentTime = 0;
        if (poster) poster.style.opacity = "1";
        onVideoProgress?.(0);
        return;
      }

      // User scrolled even a little -> start playing to the end!
      startVideoPlayback();

      // If user scrolls ahead of current video time, advance forward
      if (video.duration && isFinite(video.duration) && video.duration > 0) {
        const scrollTargetTime = clamped * video.duration;
        if (scrollTargetTime > video.currentTime) {
          video.currentTime = scrollTargetTime;
        }
      }
    });
  }, [progress, isVideoLoaded, onVideoProgress, startVideoPlayback]);

  return (
    <div className="absolute inset-0 w-full h-full select-none bg-[#F8F8F5] overflow-hidden">
      {/* Video Layer that plays smoothly to completion */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        preload="auto"
        muted
        playsInline
        autoPlay={false}
        loop={false}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Starting Frame Poster Image (seamlessly dissolves away when video starts) */}
      <img
        ref={posterRef}
        src={posterUrl}
        alt="Empty Construction Site - Malleshwaram, Bengaluru"
        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 pointer-events-none"
        style={{ opacity: 1 }}
      />
    </div>
  );
}

