"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Palette, Check } from "lucide-react";

export const PRESET_COLORS = [
  { name: "Forest Green", hex: "#1E3F30" },
  { name: "Burnt Copper", hex: "#C8753D" },
  { name: "Emerald Atelier", hex: "#0B5147" },
  { name: "Heritage Bronze", hex: "#B88A3B" },
  { name: "Midnight Navy", hex: "#1D3557" },
  { name: "Warm Terracotta", hex: "#A8422B" },
  { name: "Monolith Charcoal", hex: "#171717" },
];

const adjustBrightness = (hex: string, percent: number) => {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
};

export default function ColorThemePicker() {
  const [currentColor, setCurrentColor] = useState<string>("#1E3F30");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const applyColor = useCallback((hex: string) => {
    setCurrentColor(hex);
    document.documentElement.style.setProperty("--primary", hex);
    // Calculate a darker tone for hover
    document.documentElement.style.setProperty("--primary-hover", adjustBrightness(hex, -20));
    document.documentElement.style.setProperty("--primary-glow", `${hex}33`);
    localStorage.setItem("amogha-primary-color", hex);
  }, []);

  useEffect(() => {
    // Check saved color or default
    const saved = localStorage.getItem("amogha-primary-color");
    if (saved) {
      applyColor(saved);
    }
  }, [applyColor]);

  const adjustBrightness = (hex: string, percent: number) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
    return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Popover Panel */}
      {isOpen && (
        <div className="mb-3 bg-white/95 backdrop-blur-md p-4 border border-[#E8E8E3] shadow-[0_10px_35px_-5px_rgba(0,0,0,0.12)] w-72 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#F1F1EC]">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: currentColor }}
              />
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#111111] font-semibold">
                Primary Color
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#555A57] uppercase">
              {currentColor}
            </span>
          </div>

          {/* Preset Swatches */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {PRESET_COLORS.map((preset) => (
              <button
                key={preset.hex}
                type="button"
                onClick={() => applyColor(preset.hex)}
                className="group relative flex flex-col items-center p-1.5 border border-transparent hover:border-[#E8E8E3] transition-all cursor-pointer"
                title={preset.name}
              >
                <div
                  className="w-7 h-7 rounded-none flex items-center justify-center border border-black/10 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: preset.hex }}
                >
                  {currentColor.toLowerCase() === preset.hex.toLowerCase() && (
                    <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                  )}
                </div>
                <span className="text-[8px] font-sans text-[#555A57] truncate w-full text-center mt-1">
                  {preset.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Custom Color Input */}
          <div className="pt-2 border-t border-[#F1F1EC] flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#555A57]">
              Custom Hex:
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentColor}
                onChange={(e) => applyColor(e.target.value)}
                className="w-6 h-6 p-0 border border-[#E8E8E3] cursor-pointer bg-transparent"
                title="Choose custom color"
              />
              <span className="text-[10px] font-mono text-[#111111]">
                {currentColor.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-3.5 py-2 bg-white/95 backdrop-blur-md border border-[#E8E8E3] shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-[#111111] transition-all cursor-pointer"
        aria-label="Change Primary Color"
      >
        <span
          className="w-3 h-3 rounded-full border border-black/15 shadow-xs transition-transform group-hover:scale-110"
          style={{ backgroundColor: currentColor }}
        />
        <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#111111] font-medium">
          Primary Color
        </span>
        <Palette className="w-3.5 h-3.5 text-[#555A57] group-hover:text-[#111111] transition-colors" />
      </button>
    </div>
  );
}
