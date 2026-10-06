"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import StageListReorder from "@/components/admin/StageListReorder";
import StageEditorDrawer from "@/components/admin/StageEditorDrawer";
import {
  Save,
  Send,
  Eye,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sliders,
} from "lucide-react";
import { CMSHeroStage, CMSMediaAsset } from "@/lib/types";

export default function AdminHeroPage() {
  const [stages, setStages] = useState<CMSHeroStage[]>([]);
  const [mediaLibrary, setMediaLibrary] = useState<CMSMediaAsset[]>([]);
  const [editingStage, setEditingStage] = useState<CMSHeroStage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load draft sequence and media library
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [stagesRes, mediaRes] = await Promise.all([
        fetch("/api/admin/hero?draft=true").then((r) => r.json()),
        fetch("/api/admin/media").then((r) => r.json()),
      ]);

      if (stagesRes.stages) setStages(stagesRes.stages);
      if (mediaRes.assets) setMediaLibrary(mediaRes.assets);
      setHasUnsavedChanges(false);
    } catch {
      setFeedback({ type: "error", text: "Failed to load sequence data" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReorder = (newStages: CMSHeroStage[]) => {
    setStages(newStages);
    setHasUnsavedChanges(true);
  };

  const handleToggleEnabled = (stageId: string) => {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, enabled: !s.enabled } : s))
    );
    setHasUnsavedChanges(true);
  };

  const handleSaveStageFromDrawer = (updatedStage: CMSHeroStage) => {
    setStages((prev) =>
      prev.map((s) => (s.id === updatedStage.id ? updatedStage : s))
    );
    setHasUnsavedChanges(true);
  };

  const handleAddNewStage = () => {
    const newOrder = stages.length + 1;
    const newStage: CMSHeroStage = {
      id: `stage-${Date.now()}`,
      order: newOrder,
      title: `NEW STAGE ${String(newOrder).padStart(2, "0")}`,
      subtitle: "Construction phase milestone",
      description: "Description of structural milestone",
      mediaType: "image",
      mediaUrl: "/images/construction/stage-09-daylight.jpg",
      thumbnailUrl: "/images/construction/stage-09-daylight.jpg",
      startProgress: Number(((newOrder - 1) / newOrder).toFixed(3)),
      endProgress: 1.0,
      animationMode: "crossfade",
      duration: 1.0,
      enabled: true,
      continuityRef: "Same camera, matched lighting",
    };

    setStages([...stages, newStage]);
    setEditingStage(newStage);
    setHasUnsavedChanges(true);
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stages, autoNormalize: true }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStages(data.stages);
        setHasUnsavedChanges(false);
        setFeedback({
          type: "success",
          text: "Draft sequence saved! Changes are isolated in draft until published.",
        });
      } else {
        setFeedback({ type: "error", text: data.error || "Failed to save draft" });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error saving draft" });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setFeedback(null);

    try {
      if (hasUnsavedChanges) {
        await fetch("/api/admin/hero", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stages, autoNormalize: true }),
        });
      }

      const res = await fetch("/api/admin/hero/publish", { method: "POST" });
      const data = await res.json();

      if (res.ok && data.success) {
        setHasUnsavedChanges(false);
        setFeedback({
          type: "success",
          text: "Sequence successfully published to the live homepage!",
        });
      } else {
        setFeedback({ type: "error", text: data.error || "Failed to publish" });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error during publish" });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <AdminLayout
      title="Hero Sequence Management"
      subtitle="Reorder construction stages, configure scroll timeline progress, and manage media frames."
      actions={
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/hero/preview"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200/90 bg-white/90 hover:bg-stone-50 text-stone-800 text-xs font-medium shadow-2xs hover:shadow-xs transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-stone-500" />
            <span>Preview Draft</span>
          </Link>

          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSaving}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              hasUnsavedChanges
                ? "border border-[#f26992] text-[#f26992] bg-[#f26992]/10 hover:bg-[#f26992]/15 shadow-2xs"
                : "border border-stone-200/90 text-stone-700 bg-white/90 hover:bg-stone-50"
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Saving..." : "Save Draft"}</span>
          </button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#f26992] hover:bg-[#dc4d77] text-white text-xs font-medium shadow-sm shadow-[#f26992]/25 transition-all cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isPublishing ? "Publishing..." : "Publish to Live"}</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Unsaved Changes Banner */}
        {hasUnsavedChanges && (
          <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-amber-900 text-xs font-medium flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <Sliders className="w-4 h-4 text-amber-600" />
              <span>You have unsaved sequence changes. Save draft to persist edits.</span>
            </div>
            <button
              onClick={handleSaveDraft}
              className="px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-[11px] transition-colors"
            >
              Save Now
            </button>
          </div>
        )}

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl border text-xs font-medium flex items-center justify-between shadow-2xs ${
              feedback.type === "success"
                ? "bg-rose-50/70 border-rose-200/80 text-rose-950"
                : "bg-red-50 border-red-200 text-red-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-[#f26992]" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
              <span>{feedback.text}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-[11px] text-stone-500 hover:text-stone-900 px-2 py-0.5"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-sans font-semibold text-stone-900">
              Stages: {stages.length} Total
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f26992]/10 text-[#f26992] text-[11px] font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f26992]" />
              {stages.filter((s) => s.enabled).length} Enabled
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleAddNewStage}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900 hover:bg-[#f26992] text-white text-xs font-medium shadow-2xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Stage</span>
            </button>

            <button
              type="button"
              onClick={loadData}
              className="p-2 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900 shadow-2xs transition-all cursor-pointer"
              title="Refresh Stages"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Stage List with Drag and Drop Reordering */}
        {isLoading ? (
          <div className="p-12 text-center border border-stone-200/80 bg-white/90 rounded-2xl text-xs font-mono text-stone-500 shadow-2xs">
            Loading construction stages...
          </div>
        ) : stages.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-stone-300 bg-white/90 rounded-2xl text-xs font-sans text-stone-500 shadow-2xs">
            No stages found. Click &quot;Add Stage&quot; to build your sequence.
          </div>
        ) : (
          <StageListReorder
            stages={stages}
            onReorder={handleReorder}
            onEditStage={(stage) => setEditingStage(stage)}
            onToggleEnabled={handleToggleEnabled}
          />
        )}

        {/* Helper Card */}
        <div className="p-5 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-2xl text-xs text-stone-600 space-y-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2 text-stone-900 font-sans font-semibold text-xs">
            <HelpCircle className="w-4 h-4 text-[#f26992]" />
            <span>Cinematic Continuity Guidelines</span>
          </div>
          <p className="font-sans leading-relaxed text-[11px] text-stone-600">
            To ensure an ultra-smooth architectural time-lapse, maintain the exact same camera angle, perspective, horizon line, and lighting direction between stages. Reordering stages automatically renormalizes the scroll progress percentages from 0% to 100%.
          </p>
        </div>
      </div>

      {/* Stage Editor Drawer */}
      <StageEditorDrawer
        stage={editingStage}
        onClose={() => setEditingStage(null)}
        onSave={handleSaveStageFromDrawer}
        mediaLibrary={mediaLibrary}
      />
    </AdminLayout>
  );
}
