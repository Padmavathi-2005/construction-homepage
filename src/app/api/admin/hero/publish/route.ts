import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { publishHeroSequence } from "@/lib/hero";

export async function POST(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await publishHeroSequence();
    return NextResponse.json({
      success: true,
      message: "Hero sequence published to production successfully",
      version: result.version,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to publish sequence" },
      { status: 500 }
    );
  }
}
