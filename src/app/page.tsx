"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Sparkles,
  Subtitles,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Tag,
  DollarSign,
  Flame,
} from "lucide-react";
import { extractYoutubeVideoId } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const [inputQuery, setInputQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputQuery.trim();
    if (!query) return;

    // Check if user pasted a YouTube video URL or 11-char ID
    if (
      query.includes("youtube.com") ||
      query.includes("youtu.be") ||
      /^[A-Za-z0-9_-]{11}$/.test(query)
    ) {
      const cleanId = extractYoutubeVideoId(query);
      router.push(`/inspect?id=${encodeURIComponent(cleanId)}`);
    } else {
      // Keyword search
      router.push(`/keywords?q=${encodeURIComponent(query)}`);
    }
  };

  const sampleKeywords = [
    "ai video tutorial",
    "nextjs 15 course",
    "iphone 16 review",
    "faceless youtube channel",
    "python for beginners",
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center text-center">
        {/* Banner Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold text-red-400 mb-6 shadow-sm backdrop-blur-md">
          <Flame className="h-3.5 w-3.5 text-red-400 fill-red-400" />
          <span>Open Source Alternative to VidIQ & TubeBuddy</span>
        </div>

        <h1 className="max-w-4xl text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.15]">
          Supercharge Your YouTube Growth{" "}
          <span className="bg-gradient-to-r from-red-500 via-rose-400 to-purple-400 bg-clip-text text-transparent">
            Without $99/mo Subscriptions
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-base sm:text-lg text-neutral-300">
          Keyword research, SERP rankings, deep video SEO scorecards, full transcripts, and AI copilot — pay only for the exact API calls you make via{" "}
          <span className="font-semibold text-neutral-100 underline decoration-red-500 decoration-2">MuAPI</span>.
        </p>

        {/* Universal Search Bar */}
        <div className="mt-10 w-full max-w-2xl">
          <form
            onSubmit={handleSearch}
            className="relative flex items-center rounded-2xl border border-neutral-700/80 bg-neutral-900/90 p-2 shadow-2xl backdrop-blur-xl transition-all focus-within:border-red-500/60 focus-within:ring-2 focus-within:ring-red-500/20"
          >
            <div className="pl-3 text-neutral-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Enter any keyword (e.g. 'ai video') or paste a YouTube URL..."
              className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-500/25 hover:opacity-95 transition-all"
            >
              <span>Explore</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Quick Click Samples */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-400">
            <span>Try:</span>
            {sampleKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => router.push(`/keywords?q=${encodeURIComponent(kw)}`)}
                className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-2.5 py-1 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800 transition-colors"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Everything You Need to Win on YouTube
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Powered by 4 specialized MuAPI YouTube SERP endpoints
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <Link
            href="/keywords"
            className="group relative flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-sm transition-all hover:border-neutral-700 hover:bg-neutral-900/80 hover:shadow-2xl hover:shadow-red-500/5"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 group-hover:scale-105 transition-transform">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                Keyword Explorer & SERP
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Live YouTube organic rankings, search volume estimates, competition score, and competitor tag clouds.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-mono text-red-400/90 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                POST /seo-youtube-organic
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-neutral-300 group-hover:text-white">
              <span>Analyze Keywords</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Feature 2 */}
          <Link
            href="/inspect"
            className="group relative flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-sm transition-all hover:border-neutral-700 hover:bg-neutral-900/80 hover:shadow-2xl hover:shadow-purple-500/5"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-105 transition-transform">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                Video SEO Inspector & Scorecard
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Deep 0–100 VidIQ-style score, actionable optimization checklist, tag extraction, and engagement ratios.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-mono text-purple-400/90 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                POST /seo-youtube-video-info
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-neutral-300 group-hover:text-white">
              <span>Audit Video</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Feature 3 */}
          <Link
            href="/transcripts"
            className="group relative flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-sm transition-all hover:border-neutral-700 hover:bg-neutral-900/80 hover:shadow-2xl hover:shadow-cyan-500/5"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                <Subtitles className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                Transcript & Subtitle Studio
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Timed closed captions extraction, spoken keyword density, searchable transcript player, and SRT exports.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400/90 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                POST /seo-youtube-video-subtitles
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-neutral-300 group-hover:text-white">
              <span>View Transcripts</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Feature 4 */}
          <Link
            href="/comments"
            className="group relative flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-sm transition-all hover:border-neutral-700 hover:bg-neutral-900/80 hover:shadow-2xl hover:shadow-emerald-500/5"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Audience & Comment Intelligence
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Viewer sentiment distribution, question mining for video ideas, and high-reaction audience comments.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                POST /seo-youtube-video-comments
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-neutral-300 group-hover:text-white">
              <span>Mine Viewer Questions</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Feature 5 */}
          <Link
            href="/copilot"
            className="group relative flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-sm transition-all hover:border-neutral-700 hover:bg-neutral-900/80 hover:shadow-2xl hover:shadow-amber-500/5"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                AI Growth Copilot
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Generate high-converting titles across 5 psychological hooks, SEO descriptions, tags, and thumbnail concepts.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                POST /gpt-5-nano
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-neutral-300 group-hover:text-white">
              <span>Generate Ideas</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Feature 6: Pay As You Go */}
          <div className="flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-sm">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">
                Zero Monthly Subscription
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                VidIQ charges $19 to $99 every single month. With Open-VidIQ, a full keyword scan costs <span className="text-emerald-400 font-bold">$0.002</span>.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-neutral-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>100% Free & Open Source (MIT)</span>
              </div>
            </div>
            <a
              href="https://muapi.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300"
            >
              <span>Get Free Sandbox Key at MuAPI</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Comparison Table Section */}
      <div className="mt-24 rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8 backdrop-blur-md">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Why Creators Are Switching to Open-VidIQ
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            Honest comparison with proprietary SaaS subscriptions
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400">
                <th className="pb-3 font-semibold">Feature</th>
                <th className="pb-3 font-bold text-red-400">Open-VidIQ (OSS)</th>
                <th className="pb-3 font-semibold text-neutral-400">VidIQ Pro / Boost</th>
                <th className="pb-3 font-semibold text-neutral-400">TubeBuddy Legend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              <tr>
                <td className="py-3 font-medium text-white">Monthly Fee</td>
                <td className="py-3 font-bold text-emerald-400">$0 / mo (Self-hosted)</td>
                <td className="py-3 text-neutral-400">$19 - $99 / mo</td>
                <td className="py-3 text-neutral-400">$29 - $49 / mo</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Cost per Keyword Check</td>
                <td className="py-3 font-bold text-emerald-400">~$0.002 (Fraction of a cent)</td>
                <td className="py-3 text-neutral-400">Locked in monthly tier</td>
                <td className="py-3 text-neutral-400">Locked in monthly tier</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Video SEO Scorecard</td>
                <td className="py-3 text-emerald-400">✓ Unlimited 0-100 Score</td>
                <td className="py-3 text-neutral-300">✓ Included</td>
                <td className="py-3 text-neutral-300">✓ Included</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Competitor Tag Extractor</td>
                <td className="py-3 text-emerald-400">✓ 1-Click Copy All</td>
                <td className="py-3 text-neutral-300">✓ Included</td>
                <td className="py-3 text-neutral-300">✓ Included</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Full Transcript Search</td>
                <td className="py-3 text-emerald-400">✓ Included with Timestamps</td>
                <td className="py-3 text-neutral-500">Limited</td>
                <td className="py-3 text-neutral-500">Limited</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Audience Question Mining</td>
                <td className="py-3 text-emerald-400">✓ Automatic from Comments</td>
                <td className="py-3 text-neutral-500">Requires Boost plan</td>
                <td className="py-3 text-neutral-500">Not available</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">AI Title & Thumbnail Ideas</td>
                <td className="py-3 text-emerald-400">✓ Unlimited via MuAPI</td>
                <td className="py-3 text-neutral-400">Daily limit on Pro</td>
                <td className="py-3 text-neutral-400">Limited credits</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
