"use client";

import React, { useState, useEffect } from "react";

interface StudioTimeProps {
  city: string;
  timeZone: string;
  code: string;
}

const studios: StudioTimeProps[] = [
  { city: "Bangalore", timeZone: "Asia/Kolkata", code: "BLR" },
  { city: "Mumbai", timeZone: "Asia/Kolkata", code: "BOM" },
  { city: "Dubai", timeZone: "Asia/Dubai", code: "DXB" },
  { city: "London", timeZone: "Europe/London", code: "LON" },
];

interface LiveStudioClockProps {
  variant?: "light" | "dark";
}

export default function LiveStudioClock({ variant = "dark" }: LiveStudioClockProps) {
  const [mounted, setMounted] = useState(false);
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);

    const updateTimes = () => {
      const now = new Date();
      const updated: Record<string, string> = {};

      studios.forEach((studio) => {
        try {
          updated[studio.code] = new Intl.DateTimeFormat("en-GB", {
            timeZone: studio.timeZone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).format(now);
        } catch {
          updated[studio.code] = "--:--:--";
        }
      });

      setTimes(updated);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const isDark = variant === "dark";

  if (!mounted) {
    return (
      <div className={`flex flex-wrap gap-4 text-xs font-mono ${isDark ? "text-[#7E8581]" : "text-[#8B8F8D]"}`}>
        <span>SYNCING ATELIER TIME...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-mono">
      {studios.map((studio) => (
        <div key={studio.code} className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-[#F26A1B]" : "bg-[var(--primary)]"}`}
          />
          <span className={`tracking-wider uppercase ${isDark ? "text-[#8E9490]" : "text-[#555A57]"}`}>
            {studio.city} ({studio.code}):
          </span>
          <span className={`font-medium tracking-wider tabular-nums ${isDark ? "text-[#F5F5F0]" : "text-[#111111]"}`}>
            {times[studio.code] || "12:00:00"}
          </span>
        </div>
      ))}
    </div>
  );
}
