"use client";

import React, { useState } from "react";
import {
  GripVertical,
  Edit2,
  Video,
  Check,
  EyeOff,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { CMSHeroStage } from "@/lib/types";

interface StageListReorderProps {
  stages: CMSHeroStage[];
  onReorder: (newStages: CMSHeroStage[]) => void;
  onEditStage: (stage: CMSHeroStage) => void;
  onToggleEnabled: (stageId: string) => void;
}

export default function StageListReorder({
  stages,
  onReorder,
  onEditStage,
  onToggleEnabled,
}: StageListReorderProps) {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragOverIdx !== index) {
      setDragOverIdx(index);
    }
  };

  const handleDragEnd = () => {
    if (draggedIdx !== null && dragOverIdx !== null && draggedIdx !== dragOverIdx) {
      const updated = [...stages];
      const [moved] = updated.splice(draggedIdx, 1);
      updated.splice(dragOverIdx, 0, moved);

      // Re-index orders and progress
      const count = updated.length;
      const reindexed = updated.map((st, i) => ({
        ...st,
        order: i + 1,
        startProgress: Number((i / count).toFixed(3)),
        endProgress: Number(((i + 1) / count).toFixed(3)),
      }));

      onReorder(reindexed);
    }

    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= stages.length) return;

    const updated = [...stages];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;

    const count = updated.length;
    const reindexed = updated.map((st, i) => ({
      ...st,
      order: i + 1,
      startProgress: Number((i / count).toFixed(3)),
      endProgress: Number(((i + 1) / count).toFixed(3)),
    }));

    onReorder(reindexed);
  };

  return (
    <div className="space-y-3 select-none">
      {stages.map((stage, idx) => {
        const isDragging = draggedIdx === idx;
        const isDragOver = dragOverIdx === idx;

        return (
          <div
            key={stage.id}
            draggable
            onDragStart={(e) => handleDragStart(e, idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={`group flex items-center justify-between p-4 bg-white/95 backdrop-blur-sm border rounded-2xl transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)] ${
              isDragging
                ? "opacity-40 scale-[0.99] border-dashed border-[#f26992]"
                : ""
            } ${
              isDragOver
                ? "border-t-2 border-t-[#f26992] bg-[#f26992]/[0.03]"
                : "border-stone-200/80"
            } hover:border-[#f26992]/50 hover:shadow-md`}
          >
            {/* Left: Drag Handle, Number, Thumbnail, Details */}
            <div className="flex items-center gap-4 min-w-0">
              {/* Drag Handle */}
              <button
                type="button"
                className="cursor-grab active:cursor-grabbing text-stone-400 hover:text-stone-800 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
                title="Drag to reorder"
              >
                <GripVertical className="w-4 h-4" />
              </button>

              {/* Order Badge */}
              <span className="w-8 h-8 shrink-0 rounded-xl bg-[#f26992]/10 border border-[#f26992]/20 flex items-center justify-center font-mono text-xs font-semibold text-[#f26992] group-hover:scale-105 transition-transform">
                {String(stage.order).padStart(2, "0")}
              </span>

              {/* Thumbnail */}
              <div className="relative w-18 h-11 shrink-0 bg-stone-100 rounded-xl border border-stone-200/80 overflow-hidden flex items-center justify-center shadow-2xs">
                {stage.mediaType === "video" ? (
                  <>
                    <video
                      src={stage.mediaUrl}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Video className="w-3.5 h-3.5 text-white" />
                    </div>
                  </>
                ) : (
                  <img
                    src={stage.mediaUrl}
                    alt={stage.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Title & Metadata */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-sans font-semibold text-stone-900 truncate">
                    {stage.title}
                  </h3>
                  {!stage.enabled && (
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-500 text-[10px] font-mono">
                      Disabled
                    </span>
                  )}
                  {stage.mediaType === "video" ? (
                    <span className="px-2 py-0.5 rounded-full bg-[#0B5147]/10 text-[#0B5147] text-[10px] font-mono font-medium flex items-center gap-1">
                      <Video className="w-2.5 h-2.5" />
                      {stage.duration > 0 ? `${stage.duration}s` : "video"}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 text-[10px] font-mono font-medium">
                      image · 0s (no wait)
                    </span>
                  )}
                </div>

                <p className="text-[11px] font-sans text-stone-500 truncate max-w-md mt-0.5">
                  {stage.subtitle || stage.description || "No milestone description"}
                </p>

                {stage.continuityRef && (
                  <span className="text-[10px] font-mono text-stone-400 block truncate mt-0.5">
                    Ref: {stage.continuityRef}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Scroll Range & Action Buttons */}
            <div className="flex items-center gap-3 shrink-0 ml-4">
              {/* Progress Tag */}
              <div className="hidden sm:flex flex-col items-end text-right font-mono text-[10px] text-stone-500">
                <span className="font-medium text-stone-800">
                  {(stage.startProgress * 100).toFixed(0)}% →{" "}
                  {(stage.endProgress * 100).toFixed(0)}%
                </span>
                <span className="text-stone-400 text-[9px] uppercase">
                  {stage.animationMode}
                </span>
              </div>

              {/* Reorder Buttons */}
              <div className="hidden lg:flex items-center gap-1 border-l border-stone-200 pl-2">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveItem(idx, "up")}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-20 transition-colors"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === stages.length - 1}
                  onClick={() => moveItem(idx, "down")}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-20 transition-colors"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Toggle Enabled */}
              <button
                type="button"
                onClick={() => onToggleEnabled(stage.id)}
                className={`p-2 rounded-xl border text-xs font-mono transition-all ${
                  stage.enabled
                    ? "border-[#f26992]/30 bg-[#f26992]/10 text-[#f26992] hover:bg-rose-100"
                    : "border-stone-200 text-stone-400 hover:text-stone-600 hover:bg-stone-50"
                }`}
                title={stage.enabled ? "Disable stage" : "Enable stage"}
              >
                {stage.enabled ? <Check className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>

              {/* Edit Stage Button */}
              <button
                type="button"
                onClick={() => onEditStage(stage)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-900 hover:text-white border border-stone-200 text-xs font-medium text-stone-700 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
