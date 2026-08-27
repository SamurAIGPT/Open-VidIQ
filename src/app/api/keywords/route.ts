import { NextResponse } from "next/server";
import { fetchYoutubeOrganic } from "@/lib/muapi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") || "ai video tutorial";
  const location = searchParams.get("location") || "United States";
  const language = searchParams.get("language") || "English";
  const depth = parseInt(searchParams.get("depth") || "20", 10);

  try {
    const data = await fetchYoutubeOrganic({
      keyword,
      location,
      language,
      depth,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch YouTube organic rankings" },
      { status: 500 }
    );
  }
}
