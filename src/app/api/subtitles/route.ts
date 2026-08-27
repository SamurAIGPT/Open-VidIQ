import { NextResponse } from "next/server";
import { fetchYoutubeSubtitles } from "@/lib/muapi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlOrId = searchParams.get("id") || searchParams.get("url") || "X_qZ5jQp1kA";
  const language = searchParams.get("lang") || "en";

  try {
    const data = await fetchYoutubeSubtitles({
      videoIdOrUrl: urlOrId,
      language,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch YouTube subtitles" },
      { status: 500 }
    );
  }
}
