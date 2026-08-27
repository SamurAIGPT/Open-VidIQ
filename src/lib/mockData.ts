/**
 * Open-VidIQ Demo / Fallback Data
 * High-fidelity realistic YouTube data for instant zero-config testing.
 */

export interface MockVideoItem {
  rank: number;
  type: string;
  video_id: string;
  title: string;
  url: string;
  description: string;
  channel_name: string;
  channel_url: string;
  channel_id: string;
  views_count: number;
  publication_date: string;
  duration: string;
  thumbnail_url: string;
  is_live: boolean;
  badges: string[];
}

export const MOCK_ORGANIC_SERP: Record<
  string,
  {
    keyword: string;
    location: string;
    language: string;
    total_results: number;
    competition_score: number; // 0-100
    search_volume_est: number;
    overall_keyword_score: number; // 0-100 (high is great)
    items: MockVideoItem[];
    related_tags: { tag: string; frequency: number }[];
  }
> = {
  default: {
    keyword: "ai video tutorial",
    location: "United States",
    language: "English",
    total_results: 38,
    competition_score: 48, // Moderate
    search_volume_est: 284000,
    overall_keyword_score: 72,
    related_tags: [
      { tag: "ai video generator", frequency: 18 },
      { tag: "text to video", frequency: 15 },
      { tag: "sora ai", frequency: 12 },
      { tag: "kling ai tutorial", frequency: 11 },
      { tag: "midjourney animation", frequency: 9 },
      { tag: "runway gen 3", frequency: 8 },
      { tag: "how to make ai video", frequency: 8 },
      { tag: "ai filmmaking", frequency: 7 },
      { tag: "free ai video", frequency: 6 },
      { tag: "faceless youtube channel", frequency: 5 },
    ],
    items: [
      {
        rank: 1,
        type: "youtube_video",
        video_id: "X_qZ5jQp1kA",
        title: "How to Make AI Videos in 2026 (Full Beginner Guide)",
        url: "https://www.youtube.com/watch?v=X_qZ5jQp1kA",
        description: "Learn how to make professional cinematic AI videos from scratch. In this tutorial we cover prompts, camera motion, and voiceovers. Timestamps:\n00:00 Intro\n01:45 Best Free AI Models\n05:30 Camera Motion Prompts\n11:20 Sound FX & Upscaling",
        channel_name: "Creative AI Studio",
        channel_url: "https://youtube.com/@creativeaistudio",
        channel_id: "UC_creativeai_1",
        views_count: 842100,
        publication_date: "2026-04-12",
        duration: "18:42",
        thumbnail_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
        is_live: false,
        badges: ["4K", "CC"],
      },
      {
        rank: 2,
        type: "youtube_video",
        video_id: "Y9rK12mZ0pQ",
        title: "I Tested 10 AI Video Generators: Only 3 Are Worth It!",
        url: "https://www.youtube.com/watch?v=Y9rK12mZ0pQ",
        description: "Comparing Seedance, Kling, Runway, Pika, and Sora. Here is the definitive benchmark test for 2026 video creators.",
        channel_name: "Tech Breakdown",
        channel_url: "https://youtube.com/@techbreakdown",
        channel_id: "UC_techbreakdown_2",
        views_count: 512000,
        publication_date: "2026-06-01",
        duration: "14:15",
        thumbnail_url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=80",
        is_live: false,
        badges: ["4K"],
      },
      {
        rank: 3,
        type: "youtube_video",
        video_id: "dQw4w9WgXcQ",
        title: "Build Faceless AI YouTube Channels (Automated Pipeline)",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        description: "Complete workflow for creating high-retention automated YouTube shorts and long-form documentaries using generative media.",
        channel_name: "Creator Mastery",
        channel_url: "https://youtube.com/@creatormastery",
        channel_id: "UC_creatormastery_3",
        views_count: 1420000,
        publication_date: "2026-02-18",
        duration: "24:08",
        thumbnail_url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80",
        is_live: false,
        badges: ["4K", "CC"],
      },
      {
        rank: 4,
        type: "youtube_video",
        video_id: "k9N3bVxP5aW",
        title: "The Death of Traditional VFX? Hollywood Reacts to AI",
        url: "https://www.youtube.com/watch?v=k9N3bVxP5aW",
        description: "Deep dive into real-world production pipelines using AI media in film studios.",
        channel_name: "Cinema Frontier",
        channel_url: "https://youtube.com/@cinemafrontier",
        channel_id: "UC_cinemafrontier_4",
        views_count: 298000,
        publication_date: "2026-07-15",
        duration: "11:54",
        thumbnail_url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
        is_live: false,
        badges: [],
      },
    ],
  },
};

export const MOCK_VIDEO_DETAILS: Record<string, any> = {
  default: {
    video_id: "X_qZ5jQp1kA",
    title: "How to Make AI Videos in 2026 (Full Beginner Guide)",
    description: `Learn how to make professional cinematic AI videos from scratch. In this tutorial we cover prompts, camera motion, and voiceovers.

Timestamps:
00:00 - Introduction & What You Need
01:45 - The Best Generative Models in 2026
05:30 - Camera Motion & Cinematography Prompts
09:15 - Character Consistency Tricks
11:20 - Adding Audio, Narration & Sound FX
14:50 - Upscaling to Crisp 4K
17:10 - Summary & Next Steps

Resources & Tools:
MuAPI Platform: https://muapi.ai
Full Prompt Guide: https://example.com/prompts
Join our Creator Discord: https://discord.gg/example

#aivideo #generativeai #filmmaking #tutorial #videoediting`,
    views_count: 842100,
    likes_count: 46500,
    comments_count: 1890,
    duration: "18:42",
    publication_date: "2026-04-12",
    category: "Science & Technology",
    thumbnail_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    channel: {
      id: "UC_creativeai_1",
      title: "Creative AI Studio",
      url: "https://youtube.com/@creativeaistudio",
      subscribers_count: 432000,
      is_verified: true,
    },
    keywords: [
      "ai video tutorial",
      "how to make ai video",
      "ai filmmaking",
      "text to video",
      "generative ai",
      "midjourney video",
      "sora ai",
      "runway gen-3",
      "ai cinematography",
      "muapi tutorial",
      "seedance ai",
      "video editing tutorial",
      "faceless youtube",
      "ai animation guide",
    ],
  },
};

export const MOCK_SUBTITLES: Record<string, any> = {
  default: {
    video_id: "X_qZ5jQp1kA",
    language: "en",
    total_subtitles: 14,
    full_text: "Welcome back to the studio. In this video, I will show you how to build realistic cinematic AI videos in 2026. If you have been following generative video, you know that consistency and physics have improved dramatically. We will start with camera angle prompts, then dive into character seeds, and finish with audio Foley and upscaling.",
    items: [
      { start: 0.0, end: 4.5, text: "Welcome back to the studio! In this video, I will show you how to build realistic cinematic AI videos." },
      { start: 4.6, end: 9.2, text: "If you have been following generative video over the past year, you know quality exploded." },
      { start: 9.3, end: 14.8, text: "The biggest problem creators faced was morphing hands, weird artifacts, and zero temporal consistency." },
      { start: 14.9, end: 21.0, text: "Today, we have next-generation models like Seedance and Sora 2 that can maintain lighting and character anchors." },
      { start: 21.1, end: 27.4, text: "Let us jump right into our workstation and look at the exact prompt formula for high-CTR thumbnails and videos." },
      { start: 27.5, end: 34.0, text: "Step 1: Always establish the focal length. Do not just say 'cinematic'. Say '35mm anamorphic lens, shallow depth of field'." },
      { start: 34.1, end: 41.2, text: "Step 2: Add dynamic lighting: 'diffused volumetric morning sunlight, golden hour rim lights'." },
      { start: 41.3, end: 49.0, text: "Step 3: Define subject movement separately from camera movement: 'slow dolly zoom in, character turns head slowly'." },
      { start: 49.1, end: 56.5, text: "Now let us check out the generation result right here on the timeline. Notice how stable the eyes and hair remain." },
      { start: 56.6, end: 63.8, text: "Next, we will layer in background sound effects and realistic Foley audio to make it feel tangible." },
      { start: 63.9, end: 72.0, text: "Finally, upscale the 720p draft into crisp 4K using temporal super-resolution." },
      { start: 72.1, end: 80.0, text: "Make sure to subscribe for weekly generative workflows and drop any questions in the comments below!" },
    ],
  },
};

export const MOCK_COMMENTS: Record<string, any> = {
  default: {
    video_id: "X_qZ5jQp1kA",
    total_comments: 1890,
    sentiment_breakdown: {
      positive: 74, // %
      neutral: 16,
      question: 8,
      negative: 2,
    },
    top_questions: [
      "Can we use this for commercial client video work without licensing issues?",
      "How do you get the audio sync so tight when characters speak fast?",
      "What GPU specs do we need if we want to run this locally vs using the API?",
      "Is Seedance Lite faster than Runway Gen-3 Alpha?",
    ],
    items: [
      {
        comment_id: "c_101",
        author_title: "Marcus Miller",
        author_url: "https://youtube.com/@marcusmiller_vfx",
        author_thumbnail: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        text: "The camera motion prompt tip changed everything for me. Specifying '35mm anamorphic' eliminated the jitter completely. Best breakdown on YouTube!",
        publication_date: "3 days ago",
        likes_count: 342,
        reply_count: 14,
      },
      {
        comment_id: "c_102",
        author_title: "Elena Rostova",
        author_url: "https://youtube.com/@elenarostova",
        author_thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        text: "Question: Can we use these outputs for commercial client video work without licensing issues?",
        publication_date: "1 week ago",
        likes_count: 184,
        reply_count: 9,
      },
      {
        comment_id: "c_103",
        author_title: "David Chen",
        author_url: "https://youtube.com/@davidchentech",
        author_thumbnail: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        text: "The timestamps and resources are super helpful. Bookmarking this for our team pipeline.",
        publication_date: "2 weeks ago",
        likes_count: 97,
        reply_count: 2,
      },
      {
        comment_id: "c_104",
        author_title: "TechExplorer",
        author_url: "https://youtube.com/@techexplorer",
        author_thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        text: "How do you get the audio sync so tight when characters speak fast? Would love a follow up video on voice lip sync!",
        publication_date: "2 weeks ago",
        likes_count: 73,
        reply_count: 5,
      },
    ],
  },
};
