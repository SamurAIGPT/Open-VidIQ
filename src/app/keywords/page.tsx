"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  TrendingUp,
  Tag,
  Copy,
  Check,
  Globe,
  Loader2,
  BarChart2,
  AlertCircle,
  Zap,
} from "lucide-react";
import { VideoCard } from "@/components/VideoCard";
import { TagBadge } from "@/components/TagBadge";
import { MetricCard } from "@/components/MetricCard";
import { formatNumber } from "@/lib/utils";

function KeywordsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "ai video tutorial";

  const [keyword, setKeyword] = useState(initialQuery);
  const [location, setLocation] = useState("United States");
  const [depth, setDepth] = useState(20);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedAllTags, setCopiedAllTags] = useState(false);

  const fetchRankings = async (searchKw: string) => {
    if (!searchKw.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/keywords?keyword=${encodeURIComponent(searchKw)}&location=${encodeURIComponent(
          location
        )}&depth=${depth}`
      );
      if (!res.ok) throw new Error("Failed to load keyword rankings");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      fetchRankings(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRankings(keyword);
  };

  const handleCopyAllTags = () => {
    if (!data?.related_tags) return;
    const tagList = data.related_tags.map((t: any) => t.tag).join(", ");
    navigator.clipboard.writeText(tagList);
    setCopiedAllTags(true);
    setTimeout(() => setCopiedAllTags(false), 1800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-red-500/10 p-1.5 text-red-400 border border-red-500/20">
              <TrendingUp className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white">
              YouTube Keyword Explorer
            </h1>
          </div>
          <p className="mt-1 text-xs text-neutral-400">
            Live SERP analysis, search volume estimates & competitor video breakdown powered by{" "}
            <span className="font-mono text-neutral-300">/seo-youtube-organic</span>
          </p>
        </div>

        {/* Demo notification if active */}
        {data?.isDemo && (
          <div className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs text-purple-300">
            <Zap className="h-4 w-4 text-purple-400" />
            <span>Showing verified demo cache. Live MuAPI calls active when key is configured.</span>
          </div>
        )}
      </div>

      {/* Search & Filter Bar */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3 backdrop-blur-md"
      >
        <div className="sm:col-span-6 relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter YouTube search term (e.g. 'nextjs tutorial', 'kling ai')..."
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 py-2.5 pl-10 pr-3 text-sm text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-3 relative flex items-center">
          <Globe className="absolute left-3.5 h-4 w-4 text-neutral-400" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full appearance-none rounded-xl border border-neutral-800 bg-neutral-950/80 py-2.5 pl-10 pr-8 text-sm text-white focus:border-red-500 focus:outline-none cursor-pointer"
          >
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
          </select>
        </div>

        <div className="sm:col-span-3 flex gap-2">
          <select
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            className="w-1/2 rounded-xl border border-neutral-800 bg-neutral-950/80 px-3 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none cursor-pointer"
          >
            <option value={20}>Top 20</option>
            <option value={50}>Top 50</option>
            <option value={100}>Top 100</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-500/20 hover:opacity-95 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Search className="h-3.5 w-3.5" />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error state */}
      {error && (
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse">
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>
          <p className="mt-4 text-sm font-semibold text-white">
            Querying YouTube SERP for &quot;{keyword}&quot;...
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            Gathering organic rankings, view velocity, and competitor tags
          </p>
        </div>
      )}

      {/* Data Results */}
      {!loading && data && (
        <div className="mt-8 space-y-8">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Overall Keyword Score"
              value={`${data.overall_keyword_score || 72}/100`}
              subtext={
                data.overall_keyword_score >= 70
                  ? "Great opportunity: High interest vs competition"
                  : "Moderate competition niche"
              }
              trend="Score"
              trendPositive={data.overall_keyword_score >= 60}
              icon={<BarChart2 className="h-4 w-4" />}
            />
            <MetricCard
              label="Estimated Search Volume"
              value={formatNumber(data.search_volume_est || 250000)}
              subtext="Estimated monthly search queries"
              trend="+14% YoY"
              trendPositive={true}
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <MetricCard
              label="Competition Level"
              value={`${data.competition_score || 45}/100`}
              subtext={
                data.competition_score > 65
                  ? "High competition from established channels"
                  : "Medium competition, easy to rank with solid SEO"
              }
              trend="Moderate"
              trendPositive={data.competition_score < 60}
              icon={<Tag className="h-4 w-4" />}
            />
            <MetricCard
              label="SERP Results Analyzed"
              value={data.total_results || (data.items?.length ?? 0)}
              subtext={`Rankings in ${data.location || "United States"}`}
              trend="Live"
              trendPositive={true}
              icon={<Globe className="h-4 w-4" />}
            />
          </div>

          {/* Competitor Tags Cloud */}
          {data.related_tags && data.related_tags.length > 0 && (
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Tag className="h-4 w-4 text-red-400" />
                    <span>Top Competitor Video Tags</span>
                  </h2>
                  <p className="text-xs text-neutral-400">
                    High-frequency keywords extracted across top-ranking videos for &quot;{data.keyword}&quot;
                  </p>
                </div>

                <button
                  onClick={handleCopyAllTags}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800 transition-colors"
                >
                  {copiedAllTags ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy All Tags</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {data.related_tags.map((item: any) => (
                  <TagBadge key={item.tag} tag={item.tag} count={item.frequency} />
                ))}
              </div>
            </div>
          )}

          {/* Top Ranking Videos SERP Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Top Ranking Videos on YouTube
                </h2>
                <p className="text-xs text-neutral-400">
                  Organic ranking order in YouTube search
                </p>
              </div>
              <span className="rounded-lg bg-neutral-900 px-2.5 py-1 text-xs text-neutral-400 border border-neutral-800">
                {data.items?.length || 0} Videos Loaded
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(data.items || []).map((video: any) => (
                <VideoCard key={video.video_id || video.url} video={video} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function KeywordsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-red-500" />
        </div>
      }
    >
      <KeywordsContent />
    </Suspense>
  );
}
