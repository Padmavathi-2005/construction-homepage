"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { CMSMediaAsset } from "@/lib/types";

interface MediaUploaderProps {
  onUploadComplete?: (asset: CMSMediaAsset) => void;
  compact?: boolean;
}

export default function MediaUploader({
  onUploadComplete,
  compact = false,
}: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedExtensions = ["JPG", "JPEG", "PNG", "WEBP", "GIF", "MP4", "WEBM"];

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    setErrorMsg(null);
    setSuccessMsg(null);

    // Validation
    const ext = file.name.split(".").pop()?.toUpperCase() || "";
    if (!supportedExtensions.includes(ext)) {
      setErrorMsg(`Unsupported file: .${ext}. Please upload JPG, PNG, WEBP, GIF, MP4, or WEBM.`);
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setErrorMsg(`File too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max 50MB permitted.`);
      return;
    }

    if (ext === "GIF" && file.size > 15 * 1024 * 1024) {
      setErrorMsg("Large GIF detected (>15MB). We strongly recommend MP4/WebM for optimal scroll scrub performance.");
    }

    setIsUploading(true);
    setUploadProgress(20);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/admin/media/upload");

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 90);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        setIsUploading(false);
        setUploadProgress(100);

        if (xhr.status >= 200 && xhr.status < 300) {
          const res = JSON.parse(xhr.responseText);
          setSuccessMsg(`Successfully uploaded: ${file.name}`);
          if (onUploadComplete && res.asset) {
            onUploadComplete(res.asset);
          }
        } else {
          try {
            const errRes = JSON.parse(xhr.responseText);
            setErrorMsg(errRes.error || "Upload failed");
          } catch {
            setErrorMsg(`Server error ${xhr.status}`);
          }
        }
      };

      xhr.onerror = () => {
        setIsUploading(false);
        setErrorMsg("Network error occurred during upload");
      };

      xhr.send(formData);
    } catch (err: any) {
      setIsUploading(false);
      setErrorMsg(err.message || "Upload process failed");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl transition-all cursor-pointer flex flex-col items-center justify-center text-center select-none shadow-[0_2px_12px_rgba(0,0,0,0.02)] ${
          compact ? "p-6" : "p-10 md:p-14"
        } ${
          isDragging
            ? "border-[#f26992] bg-[#f26992]/[0.05] ring-4 ring-[#f26992]/20"
            : "border-stone-200 hover:border-[#f26992] bg-white/90"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.gif,.mp4,.webm"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="w-14 h-14 mb-3.5 rounded-2xl border border-[#f26992]/20 bg-[#f26992]/10 flex items-center justify-center text-[#f26992] shadow-2xs">
          {isUploading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <UploadCloud className="w-6 h-6" />
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-sans font-semibold text-stone-900 tracking-tight">
            Drop Media Here or Click to Browse
          </p>
          <p className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
            JPG PNG WEBP GIF MP4 WEBM // UP TO 50MB
          </p>
        </div>

        {/* Upload Progress Bar */}
        {isUploading && (
          <div className="w-full max-w-xs mt-4">
            <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-[#f26992] rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-stone-500 mt-1.5 block">
              Uploading to Supabase: {uploadProgress}%
            </span>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {errorMsg && (
        <div className="mt-3 p-3.5 bg-red-50/80 border border-red-200 rounded-2xl text-red-900 text-xs font-medium flex items-start gap-2 shadow-2xs">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mt-3 p-3.5 bg-rose-50/80 border border-rose-200 rounded-2xl text-rose-950 text-xs font-medium flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-[#f26992] shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
    </div>
  );
}
