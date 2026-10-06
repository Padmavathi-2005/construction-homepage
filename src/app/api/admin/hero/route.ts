import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import {
  getAdminStages,
  saveDraftStages,
  normalizeStageProgress,
  CMSHeroStage,
} from "@/lib/hero";

export async function GET(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const isDraft = searchParams.get("draft") !== "false";

  const stages = await getAdminStages(isDraft);
  return NextResponse.json({ stages });
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { stages, autoNormalize = true } = body;

    if (!Array.isArray(stages)) {
      return NextResponse.json(
        { error: "Expected stages array" },
        { status: 400 }
      );
    }

    const processedStages = autoNormalize
      ? normalizeStageProgress(stages)
      : stages;

    const saved = await saveDraftStages(processedStages);

    return NextResponse.json({
      success: true,
      stages: saved,
      message: "Draft stages saved successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save draft stages" },
      { status: 500 }
    );
  }
}
