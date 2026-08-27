import { NextResponse } from "next/server";
import { fetchYoutubeVideoInfo } from "@/lib/muapi";
import { calculateVideoSeoScore } from "@/lib/seoScore";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlOrId = searchParams.get("id") || searchParams.get("url") || "X_qZ5jQp1kA";

  try {
    const videoData = await fetchYoutubeVideoInfo({ videoIdOrUrl: urlOrId });
    const seoAudit = calculateVideoSeoScore(videoData);

    return NextResponse.json({
      video: videoData,
      seoAudit,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch YouTube video metadata" },
      { status: 500 }
    );
  }
}
