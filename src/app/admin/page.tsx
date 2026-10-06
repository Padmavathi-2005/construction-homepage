"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Layers,
  Image as ImageIcon,
  Eye,
  CheckCircle,
  Database,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { CMSHeroStage, CMSMediaAsset } from "@/lib/types";

export default function AdminDashboardPage() {
  const [stages, setStages] = useState<CMSHeroStage[]>([]);
  const [media, setMedia] = useState<CMSMediaAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/hero?draft=true").then((r) => r.json()),
      fetch("/api/admin/media").then((r) => r.json()),
    ])
      .then(([heroData, mediaData]) => {
        if (heroData.stages) setStages(heroData.stages);
        if (mediaData.assets) setMedia(mediaData.assets);
      })
      .catch((err) => console.error("Error loading dashboard data:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout
      title="Architecture CMS Control Panel"
      subtitle="Manage the cinematic construction scroll hero, media assets, and stages in real-time."
      actions={
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/hero/preview"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200/90 bg-white/90 hover:bg-stone-50 text-stone-800 text-xs font-medium shadow-2xs hover:shadow-xs transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-stone-500" />
            <span>Preview Hero</span>
          </Link>
          <Link
            href="/admin/hero"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f26992] hover:bg-[#dc4d77] text-white text-xs font-medium shadow-sm shadow-[#f26992]/25 transition-all"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Edit Sequence</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-8">
        {/* KPI / Stats Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Stages */}
          <div className="p-5 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-2xl flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-[#f26992]/40 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-medium">
                Active Sequence
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#f26992]/10 border border-[#f26992]/20 flex items-center justify-center text-[#f26992] group-hover:scale-105 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="my-3">
              <span className="text-3xl font-mono font-bold text-stone-900 tracking-tight">
                {loading ? "..." : stages.length}
              </span>
              <span className="text-xs font-mono text-stone-500 ml-2">Stages</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#f26992]">
              <span>Scrub range: 0% → 100%</span>
            </div>
          </div>

          {/* Card 2: Sequence State */}
          <div className="p-5 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-2xl flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-[#f26992]/40 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-medium">
                CMS Status
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#f26992]/10 border border-[#f26992]/20 flex items-center justify-center text-[#f26992] group-hover:scale-105 transition-transform">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="my-3 flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f26992] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f26992]" />
              </span>
              <span className="text-base font-sans font-semibold tracking-wide text-stone-900">
                Live & Synced
              </span>
            </div>
            <span className="text-[11px] font-mono text-stone-500">
              Draft edits isolated from public
            </span>
          </div>

          {/* Card 3: Media Assets */}
          <div className="p-5 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-2xl flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-[#f26992]/40 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-medium">
                Media Library
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#f26992]/10 border border-[#f26992]/20 flex items-center justify-center text-[#f26992] group-hover:scale-105 transition-transform">
                <ImageIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="my-3">
              <span className="text-3xl font-mono font-bold text-stone-900 tracking-tight">
                {loading ? "..." : media.length}
              </span>
              <span className="text-xs font-mono text-stone-500 ml-2">Uploaded Assets</span>
            </div>
            <span className="text-[11px] font-mono text-stone-500">
              Images, GIFs, and MP4/WebM
            </span>
          </div>

          {/* Card 4: Database & Storage */}
          <div className="p-5 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-2xl flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-[#f26992]/40 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-medium">
                Storage Engine
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#f26992]/10 border border-[#f26992]/20 flex items-center justify-center text-[#f26992] group-hover:scale-105 transition-transform">
                <Database className="w-4 h-4" />
              </div>
            </div>
            <div className="my-3">
              <span className="text-sm font-sans font-semibold tracking-wide text-stone-900 block">
                PostgreSQL + Supabase
              </span>
              <span className="text-[11px] font-mono text-[#f26992]">
                Connected & Ready
              </span>
            </div>
            <span className="text-[11px] font-mono text-stone-500">
              Never store binaries in DB
            </span>
          </div>
        </div>

        {/* Quick Navigation Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Action Box 1: Hero CMS */}
          <div className="p-7 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-3xl flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] group hover:border-[#f26992]/40 hover:shadow-lg transition-all">
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#f26992]/10 border border-[#f26992]/20 flex items-center justify-center text-[#f26992] group-hover:scale-105 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-sans font-semibold text-stone-900 tracking-tight">
                    Hero Construction CMS
                  </h2>
                  <span className="text-[11px] font-mono text-stone-500">
                    Scroll timeline & frame sequencing
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mb-6">
                Drag-and-drop reorder the construction stages, edit titles and
                subtitles, assign video/GIF/image assets, and configure scroll scrub
                animation ranges.
              </p>
            </div>
            <Link
              href="/admin/hero"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-all self-start group-hover:bg-[#f26992] shadow-xs"
            >
              <span>Manage Construction Sequence</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Action Box 2: Media Library */}
          <div className="p-7 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-3xl flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] group hover:border-[#f26992]/40 hover:shadow-lg transition-all">
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#f26992]/10 border border-[#f26992]/20 flex items-center justify-center text-[#f26992] group-hover:scale-105 transition-transform">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-sans font-semibold text-stone-900 tracking-tight">
                    Media Asset Library
                  </h2>
                  <span className="text-[11px] font-mono text-stone-500">
                    Supabase storage bucket & asset inspector
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mb-6">
                Upload new high-resolution architectural photography, GIFs, or MP4
                construction footage. Search assets, filter by media type, and review
                delete safety references.
              </p>
            </div>
            <Link
              href="/admin/media"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-all self-start group-hover:bg-[#f26992] shadow-xs"
            >
              <span>Open Media Library</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Live Sequence Stage Previews */}
        <div className="bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-3xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-stone-200/70">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f26992]" />
                <h2 className="text-sm font-sans font-semibold uppercase tracking-wider text-stone-900">
                  Current Active Stages
                </h2>
              </div>
              <span className="text-[11px] font-mono text-stone-500">
                Live timeline driving the homepage cinematic scroll scrub
              </span>
            </div>
            <Link
              href="/admin/hero"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200/80 bg-white hover:bg-stone-50 text-xs font-medium text-stone-700 hover:text-[#f26992] shadow-2xs transition-all"
            >
              <span>Reorder or Edit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {stages.map((st) => (
              <div
                key={st.id}
                className="group border border-stone-200/80 hover:border-[#f26992]/50 p-2.5 bg-[#FAF8F5]/60 hover:bg-white rounded-2xl text-center transition-all shadow-2xs hover:shadow-sm"
              >
                <div className="aspect-video w-full bg-stone-100 rounded-xl overflow-hidden mb-2 border border-stone-200/60 group-hover:border-[#f26992]/30 transition-colors">
                  <img
                    src={st.thumbnailUrl || st.mediaUrl}
                    alt={st.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="inline-block px-2 py-0.5 rounded-md bg-[#f26992]/10 text-[#f26992] text-[10px] font-mono font-semibold mb-1">
                  {String(st.order).padStart(2, "0")}
                </span>
                <span className="block text-xs font-sans font-medium text-stone-800 truncate">
                  {st.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
