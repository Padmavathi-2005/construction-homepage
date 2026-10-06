"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle2, AlertCircle, Eye } from "lucide-react";
import Hero from "@/components/hero/Hero";

export default function AdminHeroPreviewPage() {
  const [isPublishing, setIsPublishing] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handlePublish = async () => {
    setIsPublishing(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/hero/publish", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback({
          type: "success",
          text: "Sequence successfully published to live homepage!",
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
    <div className="relative w-full min-h-screen bg-[#FAF8F5]">
      {/* Sticky Top Floating Control Toolbar (Taste Skill Aesthetic) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#18181b]/95 backdrop-blur-md text-white border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-lg select-none">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/hero"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Editor</span>
          </Link>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-stone-200">
            <span className="w-2 h-2 rounded-full bg-[#f26992] animate-pulse" />
            <span className="font-semibold text-white">Draft Preview Mode</span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-[11px] text-stone-400">
              Interactive Scroll Verification
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f26992] hover:bg-[#dc4d77] text-white text-xs font-medium shadow-sm shadow-[#f26992]/25 transition-all cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isPublishing ? "Publishing..." : "Publish to Production"}</span>
          </button>
        </div>
      </div>

      {/* Floating Status Notification */}
      {feedback && (
        <div
          className={`fixed top-20 right-6 z-50 p-4 rounded-2xl border text-xs font-medium shadow-2xl max-w-md ${
            feedback.type === "success"
              ? "bg-rose-50/95 border-rose-200 text-rose-950"
              : "bg-red-50/95 border-red-300 text-red-950"
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
        </div>
      )}

      {/* Production Hero Component in Draft Mode */}
      <div className="pt-14">
        <Hero isDraft={true} />
      </div>
    </div>
  );
}
