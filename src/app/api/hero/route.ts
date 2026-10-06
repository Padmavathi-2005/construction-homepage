import { NextRequest, NextResponse } from "next/server";
import { getHeroStages } from "@/lib/hero";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const isDraft = searchParams.get("draft") === "true";

    const stages = await getHeroStages(isDraft);

    // Return sanitized public stage list
    const publicStages = stages.map((s) => ({
      id: s.id,
      order: s.order,
      title: s.title,
      subtitle: s.subtitle,
      description: s.description,
      mediaType: s.mediaType,
      mediaUrl: s.mediaUrl,
      thumbnailUrl: s.thumbnailUrl,
      startProgress: s.startProgress,
      endProgress: s.endProgress,
      animationMode: s.animationMode,
      duration: s.duration,
      continuityRef: s.continuityRef,
    }));

    return NextResponse.json(
      { stages: publicStages },
      {
        headers: {
          "Cache-Control": isDraft
            ? "no-cache, no-store"
            : "public, s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch hero stages" },
      { status: 500 }
    );
  }
}
