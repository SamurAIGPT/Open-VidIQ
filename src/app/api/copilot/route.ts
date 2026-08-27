import { NextResponse } from "next/server";
import { generateCopilotIdeas } from "@/lib/muapi";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topic = body.topic || "AI Video Creation";
    const data = await generateCopilotIdeas({ topicOrKeyword: topic });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to generate AI creator ideas" },
      { status: 500 }
    );
  }
}
