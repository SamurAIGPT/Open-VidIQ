import { NextResponse } from "next/server";
import { fetchYoutubeComments } from "@/lib/muapi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlOrId = searchParams.get("id") || searchParams.get("url") || "X_qZ5jQp1kA";
  const depth = parseInt(searchParams.get("depth") || "20", 10);

  try {
    const data = await fetchYoutubeComments({
      videoIdOrUrl: urlOrId,
      depth,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch YouTube comments" },
      { status: 500 }
    );
  }
}
