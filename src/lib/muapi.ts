/**
 * MuAPI YouTube & AI Client for Open-VidIQ
 * Seamlessly connects to MuAPI's YouTube SERP suite:
 * - /seo-youtube-organic
 * - /seo-youtube-video-info
 * - /seo-youtube-video-subtitles
 * - /seo-youtube-video-comments
 * plus MuAPI AI text generation (/gpt-5-nano) for creator copilot.
 */

import {
  MOCK_ORGANIC_SERP,
  MOCK_VIDEO_DETAILS,
  MOCK_SUBTITLES,
  MOCK_COMMENTS,
} from "./mockData";
import { extractYoutubeVideoId } from "./utils";

const BASE = process.env.MUAPI_BASE_URL || "https://api.muapi.ai/api/v1";

export function getApiKey(): string | null {
  return process.env.MUAPI_API_KEY || null;
}

export function isLiveApiConfigured(): boolean {
  const k = getApiKey();
  return Boolean(k && k.length > 10 && !k.includes("your_"));
}

function jsonHeaders(): Record<string, string> {
  const key = getApiKey();
  if (!key) throw new Error("MUAPI_API_KEY is not set");
  return {
    "Content-Type": "application/json",
    "x-api-key": key,
  };
}

interface SubmitResponse {
  request_id?: string;
  id?: string;
  status?: string;
  detail?: string;
}

interface PollResponse extends Record<string, any> {
  status?: string;
  output?: any;
  result?: any;
}

/**
 * Submit task to MuAPI
 */
async function submit(endpoint: string, body: Record<string, unknown>): Promise<string> {
  const res = await fetch(`${BASE}/${endpoint}`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`MuAPI ${endpoint} (${res.status}): ${errText}`);
  }

  const json = (await res.json()) as SubmitResponse;
  const id = json.request_id || json.id;
  if (!id) {
    // Some direct endpoints might return results directly
    return JSON.stringify(json);
  }
  return id;
}

/**
 * Poll for task completion
 */
async function poll(
  requestId: string,
  opts: { intervalMs?: number; timeoutMs?: number } = {}
): Promise<PollResponse> {
  // If result was returned directly
  if (requestId.startsWith("{")) {
    try {
      return JSON.parse(requestId);
    } catch {
      // ignore
    }
  }

  const intervalMs = opts.intervalMs ?? 1500;
  const timeoutMs = opts.timeoutMs ?? 60_000;
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    const res = await fetch(`${BASE}/predictions/${requestId}/result`, {
      headers: { "x-api-key": getApiKey()! },
    });

    if (res.status === 400) {
      throw new Error(`MuAPI task failed: ${await res.text()}`);
    }
    if (!res.ok) {
      throw new Error(`MuAPI poll error (${res.status}): ${await res.text()}`);
    }

    const json = (await res.json()) as PollResponse;
    const status = (json.status || "").toLowerCase();

    if (status === "processing" || status === "pending" || status === "running") {
      await new Promise((r) => setTimeout(r, intervalMs));
      continue;
    }

    if (status === "failed" || status === "cancelled") {
      throw new Error(`MuAPI task failed: ${JSON.stringify(json)}`);
    }

    // Success - task completed
    return json.output || json.result || json;
  }

  throw new Error(`MuAPI task timed out after ${timeoutMs / 1000}s`);
}

/**
 * Execute a task from submit to finish
 */
async function runMuapiTask(endpoint: string, body: Record<string, unknown>): Promise<any> {
  const id = await submit(endpoint, body);
  return poll(id);
}

// ── 1. YouTube Organic SERP (Keyword Research) ──────────────────────────────

export interface YoutubeOrganicParams {
  keyword: string;
  location?: string;
  language?: string;
  depth?: number;
}

export async function fetchYoutubeOrganic(params: YoutubeOrganicParams) {
  const keyword = (params.keyword || "").trim();

  if (!isLiveApiConfigured()) {
    // Return rich mock data with match or default
    const mock = MOCK_ORGANIC_SERP.default;
    return {
      ...mock,
      keyword: keyword || mock.keyword,
      isDemo: true,
    };
  }

  try {
    const result = await runMuapiTask("seo-youtube-organic", {
      keyword,
      location: params.location || "United States",
      language: params.language || "English",
      depth: params.depth || 20,
    });

    // Extract tags from videos to build related tags cloud
    const items = result.items || [];
    const tagCountMap = new Map<string, number>();

    items.forEach((item: any) => {
      const words = (item.title || "")
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter((w: string) => w.length > 3);
      words.forEach((w: string) => {
        tagCountMap.set(w, (tagCountMap.get(w) || 0) + 1);
      });
    });

    const related_tags = Array.from(tagCountMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, freq]) => ({ tag, frequency: freq }));

    // Estimate competition & keyword score
    const totalViews = items.reduce(
      (acc: number, curr: any) => acc + (Number(curr.views_count) || 0),
      0
    );
    const avgViews = items.length > 0 ? Math.round(totalViews / items.length) : 0;
    const competition_score = Math.min(
      Math.max(Math.round((items.length / 20) * 40 + (avgViews > 500_000 ? 40 : 20)), 20),
      95
    );
    const overall_keyword_score = Math.round(100 - competition_score * 0.5);

    return {
      keyword,
      location: params.location || "United States",
      language: params.language || "English",
      total_results: result.total_results || items.length,
      competition_score,
      search_volume_est: Math.max(avgViews * 2, 50000),
      overall_keyword_score,
      items,
      related_tags,
      isDemo: false,
    };
  } catch (error: any) {
    console.warn("MuAPI live call failed, using graceful demo fallback:", error.message);
    return {
      ...MOCK_ORGANIC_SERP.default,
      keyword: keyword || MOCK_ORGANIC_SERP.default.keyword,
      isDemo: true,
      errorNote: error.message,
    };
  }
}

// ── 2. YouTube Video Info & Metadata ────────────────────────────────────────

export interface YoutubeVideoInfoParams {
  videoIdOrUrl: string;
}

export async function fetchYoutubeVideoInfo(params: YoutubeVideoInfoParams) {
  const cleanId = extractYoutubeVideoId(params.videoIdOrUrl);

  if (!isLiveApiConfigured()) {
    return {
      ...MOCK_VIDEO_DETAILS.default,
      video_id: cleanId || MOCK_VIDEO_DETAILS.default.video_id,
      isDemo: true,
    };
  }

  try {
    const result = await runMuapiTask("seo-youtube-video-info", {
      video_id: cleanId,
    });

    return {
      ...result,
      isDemo: false,
    };
  } catch (error: any) {
    console.warn("MuAPI video info live call failed, falling back:", error.message);
    return {
      ...MOCK_VIDEO_DETAILS.default,
      video_id: cleanId || MOCK_VIDEO_DETAILS.default.video_id,
      isDemo: true,
      errorNote: error.message,
    };
  }
}

// ── 3. YouTube Video Subtitles & Captions ───────────────────────────────────

export interface YoutubeSubtitlesParams {
  videoIdOrUrl: string;
  language?: string;
}

export async function fetchYoutubeSubtitles(params: YoutubeSubtitlesParams) {
  const cleanId = extractYoutubeVideoId(params.videoIdOrUrl);

  if (!isLiveApiConfigured()) {
    return {
      ...MOCK_SUBTITLES.default,
      video_id: cleanId || MOCK_SUBTITLES.default.video_id,
      isDemo: true,
    };
  }

  try {
    const result = await runMuapiTask("seo-youtube-video-subtitles", {
      video_id: cleanId,
      subtitles_language: params.language || "en",
    });

    return {
      ...result,
      isDemo: false,
    };
  } catch (error: any) {
    console.warn("MuAPI subtitles live call failed, falling back:", error.message);
    return {
      ...MOCK_SUBTITLES.default,
      video_id: cleanId || MOCK_SUBTITLES.default.video_id,
      isDemo: true,
      errorNote: error.message,
    };
  }
}

// ── 4. YouTube Video Comments & Sentiment ───────────────────────────────────

export interface YoutubeCommentsParams {
  videoIdOrUrl: string;
  depth?: number;
}

export async function fetchYoutubeComments(params: YoutubeCommentsParams) {
  const cleanId = extractYoutubeVideoId(params.videoIdOrUrl);

  if (!isLiveApiConfigured()) {
    return {
      ...MOCK_COMMENTS.default,
      video_id: cleanId || MOCK_COMMENTS.default.video_id,
      isDemo: true,
    };
  }

  try {
    const result = await runMuapiTask("seo-youtube-video-comments", {
      video_id: cleanId,
      depth: params.depth || 20,
    });

    const items = result.items || [];
    // Extract questions and calculate sentiments
    const questions: string[] = [];
    let positiveCount = 0;
    let questionCount = 0;

    items.forEach((c: any) => {
      const text = c.text || "";
      if (text.includes("?")) {
        questions.push(text.trim());
        questionCount++;
      }
      if (
        /great|love|awesome|best|helpful|thanks|amazing|saved|clear|excellent/i.test(
          text
        )
      ) {
        positiveCount++;
      }
    });

    const total = items.length || 1;
    const positive = Math.min(Math.round((positiveCount / total) * 100) + 40, 92);
    const question = Math.round((questionCount / total) * 100);
    const neutral = Math.max(100 - positive - question - 5, 5);
    const negative = Math.max(100 - (positive + neutral + question), 2);

    return {
      video_id: cleanId,
      total_comments: result.total_comments || items.length,
      sentiment_breakdown: {
        positive,
        neutral,
        question,
        negative,
      },
      top_questions: questions.slice(0, 6),
      items,
      isDemo: false,
    };
  } catch (error: any) {
    console.warn("MuAPI comments live call failed, falling back:", error.message);
    return {
      ...MOCK_COMMENTS.default,
      video_id: cleanId || MOCK_COMMENTS.default.video_id,
      isDemo: true,
      errorNote: error.message,
    };
  }
}

// ── 5. AI Creator Copilot (Titles, Descriptions, Thumbnail Prompts) ─────────

export interface CopilotGenerateParams {
  topicOrKeyword: string;
  targetAudience?: string;
  tone?: string;
}

export async function generateCopilotIdeas(params: CopilotGenerateParams) {
  const topic = params.topicOrKeyword.trim();

  // If live key is set, try calling MuAPI text generation
  if (isLiveApiConfigured()) {
    try {
      const prompt = `You are a world-class YouTube growth strategist (like VidIQ and MrBeast).
For the video topic: "${topic}", generate high-CTR suggestions.
Format as valid JSON with keys:
1. "titles": Array of 5 high-converting YouTube titles with different hooks (Curiosity, Numbered/List, Contrarian, How-To, Bold Statement).
2. "description": A 3-paragraph SEO-optimized description with placeholders for timestamps and links.
3. "tags": Array of 15 high-volume YouTube search tags.
4. "thumbnail_concepts": Array of 3 visual thumbnail ideas described in detail (focal subject, expression, background, text overlay with max 3 words).`;

      const res = await runMuapiTask("gpt-5-nano", {
        prompt,
      });

      const text = res.text || res.output || res.result || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return { ...parsed, isDemo: false };
      }
    } catch (e: any) {
      console.warn("AI copilot live call failed, generating procedural output:", e.message);
    }
  }

  // High quality procedural generation fallback
  return {
    titles: [
      `I Tested ${topic} for 30 Days (The Shocking Truth)`,
      `How to Master ${topic} in 2026 (Beginner to Pro)`,
      `Don't Do ${topic} Until You Watch This!`,
      `The Only ${topic} Guide You Will Ever Need`,
      `Why 99% of People Fail at ${topic} (And How to Win)`,
    ],
    description: `Master everything you need to know about ${topic} in this complete step-by-step breakdown. We go behind the scenes to show you real-world benchmarks, beginner mistakes to avoid, and the exact roadmap used by top creators.

Timestamps:
00:00 - The Big Problem with ${topic}
02:15 - Core Fundamentals You Must Know
06:40 - Step-by-Step Practical Implementation
12:30 - Common Pitfalls & How to Avoid Them
16:00 - Final Verdict & Free Resources

Links & Resources Mentioned:
- Official Toolkit: https://muapi.ai
- Free Cheat Sheet: https://example.com/guide
- Community Discord: https://discord.gg/example

#${topic.replace(/\s+/g, "").toLowerCase()} #tutorial #creator #growth #youtube`,
    tags: [
      topic.toLowerCase(),
      `${topic.toLowerCase()} tutorial`,
      `how to do ${topic.toLowerCase()}`,
      `best ${topic.toLowerCase()} guide`,
      `${topic.toLowerCase()} 2026`,
      `${topic.toLowerCase()} tips`,
      `${topic.toLowerCase()} for beginners`,
      `advanced ${topic.toLowerCase()}`,
      `learn ${topic.toLowerCase()}`,
      "youtube growth",
      "video seo",
      "content creator",
      "viral tips",
      "creator studio",
      "open-vidiq",
    ],
    thumbnail_concepts: [
      {
        hook: "High Contrast Comparison",
        text_overlay: "WRONG VS RIGHT",
        visual: "Split screen: Left side red tinted showing frustration with cluttered setup, right side vibrant emerald showing 10x results with clean smiling face.",
        prompt_for_ai: `cinematic YouTube thumbnail, split comparison, expressive creator face, dramatic rim lighting, 8k resolution, photorealistic, 16:9 aspect ratio`,
      },
      {
        hook: "Shocked Reaction & Graphic Proof",
        text_overlay: "IT ACTUALLY WORKED?!",
        visual: "Creator on right pointing in disbelief at a glowing holographic metric chart with an arrow skyrocketing up.",
        prompt_for_ai: `youtube thumbnail of creator reacting with authentic surprise, looking at glowing holographic chart with green exponential growth line, vivid studio lighting, 16:9`,
      },
      {
        hook: "Minimalist Authority",
        text_overlay: "STOP DOING THIS",
        visual: "Close-up cinematic headshot with intense eye contact, dark moody background, glowing subtle neon red warning badge.",
        prompt_for_ai: `dark aesthetic YouTube thumbnail, sharp dramatic lighting, serious creator expression, high contrast, studio background with subtle red aura, 16:9`,
      },
    ],
    isDemo: true,
  };
}
