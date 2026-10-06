import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { getAllMediaAssets, deleteMediaAsset, checkMediaUsage } from "@/lib/hero";

export async function GET(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const assets = await getAllMediaAssets();
  return NextResponse.json({ assets });
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get("id");
    const force = searchParams.get("force") === "true";

    if (!id) {
      return NextResponse.json({ error: "Media asset ID required" }, { status: 400 });
    }

    const result = await deleteMediaAsset(id, force);
    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error,
          isBlockedByPublished: true,
        },
        { status: 409 }
      );
    }

    return NextResponse.json({ success: true, message: "Media asset deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete media asset" },
      { status: 500 }
    );
  }
}
