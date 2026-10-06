import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { uploadMediaFile } from "@/lib/supabase";
import { saveMediaAsset, CMSMediaAsset } from "@/lib/hero";

export async function POST(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage / resilient storage
    const uploadResult = await uploadMediaFile(buffer, file.name, file.type);

    // Save metadata asset
    const mediaAsset: CMSMediaAsset = {
      id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      filename: uploadResult.filename,
      storagePath: uploadResult.storagePath,
      publicUrl: uploadResult.publicUrl,
      mediaType: uploadResult.mediaType,
      mimeType: uploadResult.mimeType,
      size: uploadResult.size,
      thumbnailUrl: uploadResult.publicUrl,
      createdAt: new Date().toISOString(),
    };

    const savedAsset = await saveMediaAsset(mediaAsset);

    return NextResponse.json({
      success: true,
      asset: savedAsset,
      message: "Media uploaded successfully",
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload media" },
      { status: 400 }
    );
  }
}
