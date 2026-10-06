"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import MediaUploader from "@/components/admin/MediaUploader";
import {
  Search,
  Trash2,
  Copy,
  Check,
  Video,
  ExternalLink,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { CMSMediaAsset } from "@/lib/types";

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<CMSMediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "image" | "gif" | "video">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Delete Safety Dialog State
  const [deletePendingAsset, setDeletePendingAsset] = useState<CMSMediaAsset | null>(null);
  const [deleteErrorWarning, setDeleteErrorWarning] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.assets) setAssets(data.assets);
    } catch (err) {
      console.error("Failed to load media assets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInitiateDelete = (asset: CMSMediaAsset) => {
    setDeletePendingAsset(asset);
    setDeleteErrorWarning(null);
  };

  const handleConfirmDelete = async (force = false) => {
    if (!deletePendingAsset) return;
    setIsDeleting(true);
    setDeleteErrorWarning(null);

    try {
      const res = await fetch(
        `/api/admin/media?id=${deletePendingAsset.id}${force ? "&force=true" : ""}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (res.ok && data.success) {
        setAssets((prev) => prev.filter((a) => a.id !== deletePendingAsset.id));
        setDeletePendingAsset(null);
      } else {
        setDeleteErrorWarning(data.error || "Could not delete asset");
      }
    } catch {
      setDeleteErrorWarning("Network error deleting asset");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered Assets
  const filteredAssets = assets.filter((asset) => {
    const matchesFilter =
      selectedFilter === "all" ? true : asset.mediaType === selectedFilter;
    const matchesSearch = asset.filename
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <AdminLayout
      title="Media Asset Library"
      subtitle="Upload, inspect, and organize architectural frames, GIFs, and construction video clips."
      actions={
        <button
          onClick={loadMedia}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200/90 bg-white/90 hover:bg-stone-50 text-stone-800 text-xs font-medium shadow-2xs hover:shadow-xs transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Library</span>
        </button>
      }
    >
      <div className="space-y-8">
        {/* Upload Zone */}
        <div className="bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-3xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="mb-4">
            <h2 className="text-base font-sans font-semibold text-stone-900 tracking-tight">
              Upload New Media Asset
            </h2>
            <p className="text-xs text-stone-500 font-sans mt-0.5">
              Uploaded files are stored in Supabase Storage with instant high-speed CDN provisioning.
            </p>
          </div>
          <MediaUploader onUploadComplete={() => loadMedia()} compact />
        </div>

        {/* Filters & Search Toolbar (Taste Skill Inspired Floating Pill Design) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-2xl shadow-xs">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search filename..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-[#FAF8F5]/60 text-xs font-sans focus:border-[#f26992] focus:ring-2 focus:ring-[#f26992]/20 focus:outline-none transition-all"
            />
          </div>

          {/* Type Filter Pill Container */}
          <div className="flex items-center bg-[#EBE7DF]/70 p-1 rounded-full border border-stone-300/40 gap-1">
            {(["all", "image", "gif", "video"] as const).map((filter) => {
              const isSelected = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-stone-900 font-semibold shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {filter === "all" ? "All Media" : `${filter.toUpperCase()}s`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="p-12 text-center bg-white/90 border border-stone-200/80 rounded-2xl text-xs font-mono text-stone-500 shadow-2xs">
            Loading media library...
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="p-12 text-center bg-white/90 border border-dashed border-stone-300 rounded-2xl text-xs font-sans text-stone-500 shadow-2xs">
            No assets match your search or filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="group bg-white/95 backdrop-blur-sm border border-stone-200/80 hover:border-[#f26992]/40 rounded-3xl transition-all flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-lg overflow-hidden"
              >
                {/* Media Preview Box */}
                <div className="relative aspect-video w-full bg-stone-100 overflow-hidden flex items-center justify-center border-b border-stone-200/70">
                  {asset.mediaType === "video" ? (
                    <video
                      src={asset.publicUrl}
                      className="w-full h-full object-cover"
                      muted
                      controls
                    />
                  ) : (
                    <img
                      src={asset.publicUrl}
                      alt={asset.filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* Media Type Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider">
                    {asset.mediaType}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className="text-xs font-sans font-semibold text-stone-900 truncate"
                      title={asset.filename}
                    >
                      {asset.filename}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 border-t border-stone-100 pt-2">
                    <span>
                      {(asset.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                    <span>
                      {new Date(asset.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-3 bg-[#FAF8F5] border-t border-stone-200/70 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(asset.publicUrl, asset.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-stone-600 hover:text-[#f26992] transition-colors cursor-pointer"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#f26992]" />
                        <span className="text-[#f26992]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={asset.publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-white transition-colors"
                      title="Open Media in New Tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleInitiateDelete(asset)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-white transition-colors cursor-pointer"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Safety Confirmation Modal */}
      {deletePendingAsset && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-stone-200 rounded-3xl shadow-2xl p-7 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-base font-sans font-semibold text-stone-900">
                  Delete Media Asset
                </h3>
                <span className="text-xs text-stone-500 font-sans">
                  Action cannot be undone
                </span>
              </div>
            </div>

            <p className="text-xs font-sans text-stone-600 leading-relaxed">
              Are you sure you want to permanently delete:{" "}
              <strong className="text-stone-900">{deletePendingAsset.filename}</strong>?
            </p>

            {deleteErrorWarning && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs font-mono space-y-1.5">
                <p className="font-semibold uppercase tracking-wider text-[10px]">
                  Warning: Active Usage Detected
                </p>
                <p>{deleteErrorWarning}</p>
                <p className="text-[10px] text-amber-700">
                  Deleting will remove this frame from the hero sequence.
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-3">
              <button
                type="button"
                onClick={() => setDeletePendingAsset(null)}
                className="px-4 py-2 rounded-full border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              {deleteErrorWarning ? (
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => handleConfirmDelete(true)}
                  className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
                >
                  {isDeleting ? "Force Deleting..." : "Force Delete Anyway"}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => handleConfirmDelete(false)}
                  className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
                >
                  {isDeleting ? "Deleting..." : "Delete Asset"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
