"use client";

import React, { useState } from "react";
import { X, Image as ImageIcon, Video, Check, Info } from "lucide-react";
import { CMSHeroStage, CMSMediaAsset } from "@/lib/types";
import MediaUploader from "./MediaUploader";

interface StageEditorDrawerProps {
  stage: CMSHeroStage | null;
  onClose: () => void;
  onSave: (updatedStage: CMSHeroStage) => void;
  mediaLibrary: CMSMediaAsset[];
}

export default function StageEditorDrawer({
  stage,
  onClose,
  onSave,
  mediaLibrary,
}: StageEditorDrawerProps) {
  if (!stage) return null;

  const [formData, setFormData] = useState<CMSHeroStage>({ ...stage });
  const [activeTab, setActiveTab] = useState<"fields" | "media-picker" | "upload">("fields");

  const handleChange = (
    field: keyof CMSHeroStage,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMediaSelect = (asset: CMSMediaAsset) => {
    setFormData((prev) => ({
      ...prev,
      mediaUrl: asset.publicUrl,
      thumbnailUrl: asset.thumbnailUrl || asset.publicUrl,
      mediaType: asset.mediaType,
      duration: asset.mediaType === "image" ? 0 : prev.duration,
      animationMode: asset.mediaType === "video" ? "video-scrub" : prev.animationMode,
    }));
    setActiveTab("fields");
  };

  const handleUploadComplete = (asset: CMSMediaAsset) => {
    handleMediaSelect(asset);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-stone-200 sm:rounded-l-3xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 border-b border-stone-200/80 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#f26992]/10 border border-[#f26992]/20 flex items-center justify-center font-mono text-xs font-semibold text-[#f26992]">
              {String(formData.order).padStart(2, "0")}
            </span>
            <div>
              <h2 className="text-base font-sans font-semibold text-stone-900 tracking-tight">
                Edit Stage: {formData.title || "Untitled Stage"}
              </h2>
              <span className="text-[11px] font-mono text-stone-500">
                Scroll scrub: {(formData.startProgress * 100).toFixed(0)}% →{" "}
                {(formData.endProgress * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full border border-stone-200 bg-white hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection (Pill Style) */}
        <div className="p-2 border-b border-stone-200/80 bg-[#FAF8F5]/50">
          <div className="flex bg-[#EBE7DF]/70 p-1 rounded-full text-xs font-medium gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("fields")}
              className={`flex-1 py-1.5 px-3 rounded-full transition-all ${
                activeTab === "fields"
                  ? "bg-white text-stone-900 font-semibold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Stage Fields
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("media-picker")}
              className={`flex-1 py-1.5 px-3 rounded-full transition-all ${
                activeTab === "media-picker"
                  ? "bg-white text-stone-900 font-semibold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Select Media ({mediaLibrary.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("upload")}
              className={`flex-1 py-1.5 px-3 rounded-full transition-all ${
                activeTab === "upload"
                  ? "bg-white text-stone-900 font-semibold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Upload New
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === "fields" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Media Preview Banner */}
              <div className="p-4 border border-stone-200/80 bg-[#FAF8F5]/80 rounded-2xl">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-mono text-stone-600 flex items-center gap-1.5 font-medium">
                    {formData.mediaType === "video" ? (
                      <Video className="w-3.5 h-3.5 text-[#f26992]" />
                    ) : (
                      <ImageIcon className="w-3.5 h-3.5 text-[#f26992]" />
                    )}
                    Active Media Asset
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab("media-picker")}
                    className="text-xs font-sans text-[#f26992] hover:underline font-medium"
                  >
                    Change Media →
                  </button>
                </div>

                <div className="relative aspect-video w-full bg-stone-100 rounded-xl overflow-hidden border border-stone-200 flex items-center justify-center">
                  {formData.mediaType === "video" ? (
                    <video
                      key={formData.mediaUrl}
                      src={formData.mediaUrl}
                      onLoadedMetadata={(e) => {
                        const dur = e.currentTarget.duration;
                        if (dur && isFinite(dur) && dur > 0) {
                          const rounded = parseFloat(dur.toFixed(1));
                          handleChange("duration", rounded);
                        }
                      }}
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <img
                      src={formData.mediaUrl}
                      alt={formData.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="mt-2 text-[10px] font-mono text-stone-400 truncate">
                  URL: {formData.mediaUrl}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5 font-medium">
                    Stage Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-sm font-sans focus:border-[#f26992] focus:ring-2 focus:ring-[#f26992]/20 focus:outline-none transition-all"
                    placeholder="e.g. FOUNDATION"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5 font-medium">
                    Subtitle / Milestone
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle || ""}
                    onChange={(e) => handleChange("subtitle", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-sm font-sans focus:border-[#f26992] focus:ring-2 focus:ring-[#f26992]/20 focus:outline-none transition-all"
                    placeholder="e.g. Reinforced concrete footings & ground beam grid"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5 font-medium">
                    Description & Specifications
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) => handleChange("description", e.target.value)}
                    rows={2}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-sm font-sans focus:border-[#f26992] focus:ring-2 focus:ring-[#f26992]/20 focus:outline-none transition-all"
                    placeholder="Cured concrete footings and structural specifications..."
                  />
                </div>
              </div>

              {/* Scroll Timeline Range */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5 font-medium">
                    Start Progress (0.00–1.00)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={formData.startProgress}
                    onChange={(e) => handleChange("startProgress", parseFloat(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-mono focus:border-[#f26992] focus:ring-2 focus:ring-[#f26992]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5 font-medium">
                    End Progress (0.00–1.00)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={formData.endProgress}
                    onChange={(e) => handleChange("endProgress", parseFloat(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-mono focus:border-[#f26992] focus:ring-2 focus:ring-[#f26992]/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Animation Mode & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5 font-medium">
                    Animation Mode
                  </label>
                  <select
                    value={formData.animationMode}
                    onChange={(e) => handleChange("animationMode", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-mono bg-white focus:border-[#0B5147] focus:ring-2 focus:ring-[#0B5147]/20 focus:outline-none transition-all"
                  >
                    <option value="crossfade">crossfade (Smooth Dissolve)</option>
                    <option value="scrub">scrub (Direct Scrub)</option>
                    <option value="video-scrub">video-scrub (Scroll controls video)</option>
                    <option value="hold">hold (Hold Frame)</option>
                    <option value="fade">fade (Fade to Background)</option>
                  </select>
                </div>

                {formData.mediaType === "video" ? (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-medium">
                        Video Duration (sec)
                      </label>
                      <span className="text-[10px] font-mono text-[#0B5147] font-semibold bg-[#0B5147]/10 px-1.5 py-0.5 rounded">
                        Auto-detected
                      </span>
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={formData.duration || ""}
                      onChange={(e) => handleChange("duration", parseFloat(e.target.value) || 0)}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-mono font-semibold text-stone-900 focus:border-[#0B5147] focus:ring-2 focus:ring-[#0B5147]/20 focus:outline-none transition-all"
                      placeholder="e.g. 6.0"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                      Duration
                    </label>
                    <div className="px-3 py-2 rounded-xl border border-dashed border-stone-200 bg-stone-50 text-xs font-mono text-stone-500 flex items-center justify-between">
                      <span className="font-semibold text-stone-700">0s (No duration)</span>
                      <span className="text-[10px] text-stone-400 font-sans">Zero wait</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Continuity Reference Notes */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Info className="w-3.5 h-3.5 text-[#f26992]" />
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-medium">
                    Continuity Reference
                  </label>
                </div>
                <input
                  type="text"
                  value={formData.continuityRef || ""}
                  onChange={(e) => handleChange("continuityRef", e.target.value)}
                  placeholder="e.g. Same camera, same building, same horizon, clear lighting"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-mono focus:border-[#f26992] focus:ring-2 focus:ring-[#f26992]/20 focus:outline-none text-stone-600 transition-all"
                />
              </div>

              {/* Enabled / Disabled Toggle */}
              <div className="flex items-center justify-between p-4 border border-stone-200/80 bg-[#FAF8F5] rounded-2xl">
                <div>
                  <span className="block text-xs font-sans font-semibold text-stone-900">
                    Stage Active on Homepage
                  </span>
                  <span className="text-[11px] font-sans text-stone-500">
                    Disabled stages are skipped during scroll progression
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange("enabled", !formData.enabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    formData.enabled ? "bg-[#f26992]" : "bg-stone-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 rounded-full bg-[#f26992] hover:bg-[#dc4d77] text-white text-xs font-medium shadow-sm shadow-[#f26992]/25 transition-all cursor-pointer"
                >
                  Save Stage Changes
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-full border border-stone-200 bg-white hover:bg-stone-100 text-xs font-medium text-stone-700 transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {activeTab === "media-picker" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-medium text-stone-600">
                  Select an Asset from Media Library
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab("upload")}
                  className="text-xs font-medium text-[#f26992] hover:underline"
                >
                  + Upload New
                </button>
              </div>

              {mediaLibrary.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-stone-300 rounded-2xl text-xs font-sans text-stone-500">
                  No media uploaded yet.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {mediaLibrary.map((asset) => {
                    const isSelected = formData.mediaUrl === asset.publicUrl;
                    return (
                      <div
                        key={asset.id}
                        onClick={() => handleMediaSelect(asset)}
                        className={`group relative border rounded-2xl cursor-pointer p-2.5 transition-all ${
                          isSelected
                            ? "border-[#f26992] bg-[#f26992]/[0.04] ring-2 ring-[#f26992]/30"
                            : "border-stone-200 hover:border-[#f26992]/50 bg-white"
                        }`}
                      >
                        <div className="aspect-video w-full bg-stone-100 rounded-xl overflow-hidden relative">
                          {asset.mediaType === "video" ? (
                            <video
                              src={asset.publicUrl}
                              className="w-full h-full object-cover"
                              muted
                            />
                          ) : (
                            <img
                              src={asset.publicUrl}
                              alt={asset.filename}
                              className="w-full h-full object-cover"
                            />
                          )}
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-[#f26992] text-white p-1 rounded-full shadow-sm">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        <div className="mt-2">
                          <p className="text-xs font-sans font-medium text-stone-900 truncate">
                            {asset.filename}
                          </p>
                          <span className="text-[10px] font-mono uppercase text-[#f26992]">
                            {asset.mediaType}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "upload" && (
            <div className="space-y-4">
              <span className="text-xs font-sans font-medium text-stone-600">
                Upload Frame directly to this Stage
              </span>
              <MediaUploader onUploadComplete={handleUploadComplete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
