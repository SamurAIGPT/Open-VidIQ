/**
 * VidIQ-style SEO Scoring Engine for YouTube Videos
 */

export interface SeoCheckItem {
  id: string;
  category: "Title" | "Description" | "Tags" | "Engagement" | "Metadata";
  label: string;
  status: "pass" | "warn" | "fail";
  pointsEarned: number;
  pointsMax: number;
  details: string;
  recommendation?: string;
}

export interface VideoSeoAuditResult {
  overallScore: number;
  grade: "A+" | "A" | "B" | "C" | "D" | "F";
  summary: string;
  checklist: SeoCheckItem[];
  stats: {
    titleLength: number;
    descriptionLength: number;
    tagCount: number;
    hasTimestamps: boolean;
    hasLinks: boolean;
    hasHashtags: boolean;
    likeRatio: number; // percentage
    commentRatio: number; // percentage
  };
}

export function calculateVideoSeoScore(video: {
  title?: string;
  description?: string;
  keywords?: string[];
  views_count?: number | null;
  likes_count?: number | null;
  comments_count?: number | null;
  thumbnail_url?: string | null;
  has_subtitles?: boolean;
}): VideoSeoAuditResult {
  const title = (video.title || "").trim();
  const desc = (video.description || "").trim();
  const tags = video.keywords || [];
  const views = Number(video.views_count) || 0;
  const likes = Number(video.likes_count) || 0;
  const comments = Number(video.comments_count) || 0;

  const checklist: SeoCheckItem[] = [];

  // 1. Title Length Check (Max 15 pts)
  const titleLen = title.length;
  if (titleLen >= 40 && titleLen <= 70) {
    checklist.push({
      id: "title_length",
      category: "Title",
      label: "Optimized Title Length",
      status: "pass",
      pointsEarned: 15,
      pointsMax: 15,
      details: `${titleLen} characters (sweet spot is 40–70 chars for desktop & mobile feeds).`,
    });
  } else if (titleLen > 70 && titleLen <= 90) {
    checklist.push({
      id: "title_length",
      category: "Title",
      label: "Title Length Caution",
      status: "warn",
      pointsEarned: 10,
      pointsMax: 15,
      details: `${titleLen} characters — titles over 70 chars may get truncated in mobile search cards.`,
      recommendation: "Shorten to under 70 characters so the core hook is never cut off.",
    });
  } else if (titleLen < 40 && titleLen > 10) {
    checklist.push({
      id: "title_length",
      category: "Title",
      label: "Short Title",
      status: "warn",
      pointsEarned: 8,
      pointsMax: 15,
      details: `${titleLen} characters — title could incorporate more searchable keywords or curiosity hooks.`,
      recommendation: "Add descriptive sub-hooks or target search phrases.",
    });
  } else {
    checklist.push({
      id: "title_length",
      category: "Title",
      label: "Suboptimal Title",
      status: "fail",
      pointsEarned: 3,
      pointsMax: 15,
      details: `${titleLen} characters is outside recommended bounds.`,
      recommendation: "Rewrite title between 45 and 68 characters.",
    });
  }

  // 2. Title Keyword Focus (Max 10 pts)
  const hasNumbersInTitle = /\d+/.test(title);
  const hasBracketsOrColon = /[:\-–—|\[\]\(\)]/.test(title);
  if (hasNumbersInTitle && hasBracketsOrColon) {
    checklist.push({
      id: "title_hook",
      category: "Title",
      label: "Title Formatting & Hooks",
      status: "pass",
      pointsEarned: 10,
      pointsMax: 10,
      details: "Title includes high-CTR separators and numerals.",
    });
  } else if (hasNumbersInTitle || hasBracketsOrColon) {
    checklist.push({
      id: "title_hook",
      category: "Title",
      label: "Title Formatting",
      status: "warn",
      pointsEarned: 6,
      pointsMax: 10,
      details: "Title contains some visual pacing, but can be formatted for higher CTR.",
      recommendation: "Consider adding brackets [e.g. 2026 Guide] or bold numbers.",
    });
  } else {
    checklist.push({
      id: "title_hook",
      category: "Title",
      label: "Plain Title Structure",
      status: "fail",
      pointsEarned: 2,
      pointsMax: 10,
      details: "No numerals, brackets, or structured separators detected.",
      recommendation: "Structure with clear sections e.g. 'How to X (Step-by-Step)'",
    });
  }

  // 3. Description Length & Richness (Max 15 pts)
  const descLen = desc.length;
  if (descLen >= 500) {
    checklist.push({
      id: "desc_length",
      category: "Description",
      label: "Comprehensive Description",
      status: "pass",
      pointsEarned: 15,
      pointsMax: 15,
      details: `${descLen} characters provided. Plenty of contextual signals for YouTube ranking algorithm.`,
    });
  } else if (descLen >= 200) {
    checklist.push({
      id: "desc_length",
      category: "Description",
      label: "Moderate Description Length",
      status: "warn",
      pointsEarned: 9,
      pointsMax: 15,
      details: `${descLen} characters. Good start, but YouTube indexes up to 5,000 characters.`,
      recommendation: "Expand to 500+ characters with key talking points and resources.",
    });
  } else {
    checklist.push({
      id: "desc_length",
      category: "Description",
      label: "Sparse Description",
      status: "fail",
      pointsEarned: 3,
      pointsMax: 15,
      details: `Only ${descLen} characters. Algorithms need more text to understand video topic.`,
      recommendation: "Write an in-depth 2-3 paragraph summary of what viewers will learn.",
    });
  }

  // 4. Description Links & Socials (Max 10 pts)
  const hasLinks = /https?:\/\//i.test(desc);
  if (hasLinks) {
    checklist.push({
      id: "desc_links",
      category: "Description",
      label: "Call-to-Action & Resource Links",
      status: "pass",
      pointsEarned: 10,
      pointsMax: 10,
      details: "Contains outgoing links for engagement, newsletters, or resources.",
    });
  } else {
    checklist.push({
      id: "desc_links",
      category: "Description",
      label: "Missing Links / CTAs",
      status: "warn",
      pointsEarned: 2,
      pointsMax: 10,
      details: "No links detected in description.",
      recommendation: "Add links to your social profiles, newsletter, or related videos.",
    });
  }

  // 5. Timestamps / Chapters in Description (Max 10 pts)
  const hasTimestamps = /(?:\b\d{1,2}:\d{2}\b|\b\d{1,2}:\d{2}:\d{2}\b)/.test(desc);
  if (hasTimestamps) {
    checklist.push({
      id: "desc_timestamps",
      category: "Description",
      label: "Video Chapters & Timestamps",
      status: "pass",
      pointsEarned: 10,
      pointsMax: 10,
      details: "Chapters detected! Enables Google Search key moments and improves viewer retention.",
    });
  } else {
    checklist.push({
      id: "desc_timestamps",
      category: "Description",
      label: "No Chapters Detected",
      status: "warn",
      pointsEarned: 0,
      pointsMax: 10,
      details: "Missing timestamp chapters in description (e.g. 00:00 Intro).",
      recommendation: "Add timestamps starting at 00:00 to unlock Google SERP key-moments.",
    });
  }

  // 6. Tags Volume (Max 15 pts)
  const tagCount = tags.length;
  if (tagCount >= 10 && tagCount <= 30) {
    checklist.push({
      id: "tags_volume",
      category: "Tags",
      label: "Optimal Video Tag Count",
      status: "pass",
      pointsEarned: 15,
      pointsMax: 15,
      details: `${tagCount} tags provided — ideal balance of primary and long-tail topics.`,
    });
  } else if (tagCount > 0 && tagCount < 10) {
    checklist.push({
      id: "tags_volume",
      category: "Tags",
      label: "Low Tag Count",
      status: "warn",
      pointsEarned: 8,
      pointsMax: 15,
      details: `Only ${tagCount} tags found. You are missing out on keyword coverage.`,
      recommendation: "Add 10–20 relevant tags including misspellings and long-tail variations.",
    });
  } else {
    checklist.push({
      id: "tags_volume",
      category: "Tags",
      label: "No Video Tags Found",
      status: "fail",
      pointsEarned: 0,
      pointsMax: 15,
      details: "Zero tags detected on video.",
      recommendation: "Extract tags from top-ranking competitors in our Keyword Explorer.",
    });
  }

  // 7. Title & Tag Cross-Pollination (Max 10 pts)
  const titleWords = title.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
  const tagWords = tags.map((t) => t.toLowerCase());
  const overlap = titleWords.filter((tw) => tagWords.some((t) => t.includes(tw)));
  if (overlap.length >= 2) {
    checklist.push({
      id: "tags_relevance",
      category: "Tags",
      label: "Title-to-Tag Keyword Alignment",
      status: "pass",
      pointsEarned: 10,
      pointsMax: 10,
      details: `Strong keyword synergy: ${overlap.slice(0, 3).join(", ")} matched across title and tags.`,
    });
  } else {
    checklist.push({
      id: "tags_relevance",
      category: "Tags",
      label: "Tag Synergy Gap",
      status: "warn",
      pointsEarned: 4,
      pointsMax: 10,
      details: "Title keywords are not well represented in the video tags.",
      recommendation: "Ensure exact keyphrases from your title exist as tags.",
    });
  }

  // 8. Like Ratio & Engagement (Max 15 pts)
  let likeRatio = 0;
  let commentRatio = 0;
  if (views > 0) {
    likeRatio = (likes / views) * 100;
    commentRatio = (comments / views) * 100;

    if (likeRatio >= 4.0) {
      checklist.push({
        id: "engagement_likes",
        category: "Engagement",
        label: "High Audience Like Ratio",
        status: "pass",
        pointsEarned: 15,
        pointsMax: 15,
        details: `${likeRatio.toFixed(1)}% like-to-view ratio (above creator average of 3.0%).`,
      });
    } else if (likeRatio >= 2.0) {
      checklist.push({
        id: "engagement_likes",
        category: "Engagement",
        label: "Moderate Like Ratio",
        status: "warn",
        pointsEarned: 10,
        pointsMax: 15,
        details: `${likeRatio.toFixed(1)}% like-to-view ratio is solid.`,
      });
    } else {
      checklist.push({
        id: "engagement_likes",
        category: "Engagement",
        label: "Low Like Ratio",
        status: "fail",
        pointsEarned: 4,
        pointsMax: 15,
        details: `${likeRatio.toFixed(1)}% like ratio indicates lower viewer satisfaction or passive viewers.`,
        recommendation: "Add an explicit, value-driven call-to-action to like at the 2-minute mark.",
      });
    }
  } else {
    // Brand new video or zero views
    checklist.push({
      id: "engagement_likes",
      category: "Engagement",
      label: "Engagement Pending",
      status: "warn",
      pointsEarned: 8,
      pointsMax: 15,
      details: "View data not yet accumulated.",
    });
  }

  // Sum score
  const totalEarned = checklist.reduce((acc, c) => acc + c.pointsEarned, 0);
  const totalMax = checklist.reduce((acc, c) => acc + c.pointsMax, 0);
  const overallScore = Math.round((totalEarned / totalMax) * 100);

  let grade: VideoSeoAuditResult["grade"] = "F";
  if (overallScore >= 90) grade = "A+";
  else if (overallScore >= 80) grade = "A";
  else if (overallScore >= 70) grade = "B";
  else if (overallScore >= 55) grade = "C";
  else if (overallScore >= 40) grade = "D";

  let summary = "";
  if (overallScore >= 80) {
    summary = "High-performing video SEO setup. Metadata and engagement indicators are well tuned for YouTube search discovery.";
  } else if (overallScore >= 60) {
    summary = "Solid baseline with clear optimization upside. Updating description chapters and tag alignment will boost rank velocity.";
  } else {
    summary = "Significant SEO gaps detected. Title, tags, or description require immediate attention to maximize algorithmic reach.";
  }

  return {
    overallScore,
    grade,
    summary,
    checklist,
    stats: {
      titleLength: titleLen,
      descriptionLength: descLen,
      tagCount,
      hasTimestamps,
      hasLinks,
      hasHashtags: /#\w+/.test(desc),
      likeRatio,
      commentRatio,
    },
  };
}
