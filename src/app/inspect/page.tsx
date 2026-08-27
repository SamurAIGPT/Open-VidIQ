"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  ThumbsUp,
  MessageSquare,
  Clock,
  UserCheck,
  Tag,
  Copy,
  Check,
  ExternalLink,
  Search,
  Loader2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { ScoreMeter } from "@/components/ScoreMeter";
import { TagBadge } from "@/components/TagBadge";
import { formatNumber, formatDuration, formatTimeAgo, extractYoutubeVideoId } from "@/lib/utils";

function InspectContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || searchParams.get("url") || "X_qZ5jQp1kA";

  const [inputUrl, setInputUrl] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedTags, setCopiedTags] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  const fetchVideoAudit = async (urlOrId: string) => {
    const cleanId = extractYoutubeVideoId(urlOrId);
    if (!cleanId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/video?id=${encodeURIComponent(cleanId)}`);
      if (!res.ok) throw new Error("Failed to audit YouTube video");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      fetchVideoAudit(initialId);
    }
  }, [initialId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVideoAudit(inputUrl);
  };

  const handleCopyTags = () => {
    if (!data?.video?.keywords) return;
    navigator.clipboard.writeText(data.video.keywords.join(", "));
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 1800);
  };

  const video = data?.video;
  const audit = data?.seoAudit;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="border-b border-neutral-800/80 pb-6">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-purple-500/10 p-1.5 text-purple-400 border border-purple-500/20">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Video SEO Inspector & Scorecard
          </h1>
        </div>
        <p className="mt-1 text-xs text-neutral-400">
          VidIQ-style 0–100 SEO audit, tag extraction, and actionable checklist powered by{" "}
          <span className="font-mono text-neutral-300">/seo-youtube-video-info</span>
        </p>
      </div>

      {/* URL Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col sm:flex-row gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3 backdrop-blur-md"
      >
        <div className="relative flex-1 flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Paste any YouTube video URL (e.g. https://www.youtube.com/watch?v=...) or 11-char ID..."
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 py-2.5 pl-10 pr-3 text-sm text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-500/20 hover:opacity-95 disabled:opacity-50 transition-all"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Inspect Video</span>
            </>
          )}
        </button>
      </form>

      {/* Error display */}
      {error && (
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 animate-pulse">
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>
          <p className="mt-4 text-sm font-semibold text-white">
            Auditing video metadata, tags, and engagement...
          </p>
        </div>
      )}

      {/* Audit Results View */}
      {!loading && video && audit && (
        <div className="mt-8 space-y-8">
          {/* Video Overview Banner */}
          <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
              {/* Thumbnail & Video Link */}
              <div className="lg:col-span-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-xl">
                  <img
                    src={
                      video.thumbnail_url ||
                      `https://i.ytimg.com/vi/${video.video_id}/hqdefault.jpg`
                    }
                    alt={video.title}
                    className="h-full w-full object-cover"
                  />
                  {video.duration && (
                    <div className="absolute bottom-2.5 right-2.5 rounded-md bg-neutral-950/90 px-2 py-0.5 text-xs font-bold text-neutral-200 backdrop-blur-md">
                      {formatDuration(video.duration)}
                    </div>
                  )}
                </div>

                <a
                  href={`https://www.youtube.com/watch?v=${video.video_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  <span>Open on YouTube</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Title & Metadata */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                    {video.title}
                  </h2>

                  {/* Channel & Author */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-neutral-200">
                      <span>{video.channel?.title || "Creator Channel"}</span>
                      {video.channel?.is_verified && (
                        <UserCheck className="h-3.5 w-3.5 text-cyan-400" />
                      )}
                    </div>

                    {video.channel?.subscribers_count && (
                      <span className="text-neutral-400">
                        {formatNumber(video.channel.subscribers_count)} subscribers
                      </span>
                    )}

                    {video.publication_date && (
                      <div className="flex items-center gap-1 text-neutral-400">
                        <Clock className="h-3 w-3" />
                        <span>Published {formatTimeAgo(video.publication_date)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Key Metric Stats Row */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-neutral-800/80 pt-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-neutral-400">Views</span>
                    <p className="text-lg font-black text-white">{formatNumber(video.views_count)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-neutral-400">Likes</span>
                    <p className="text-lg font-black text-white">{formatNumber(video.likes_count)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-neutral-400">Comments</span>
                    <p className="text-lg font-black text-white">{formatNumber(video.comments_count)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-neutral-400">Like Ratio</span>
                    <p className="text-lg font-black text-emerald-400">
                      {audit.stats?.likeRatio?.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Scorecard & Breakdown Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Scorecard Widget (Col 4) */}
            <div className="lg:col-span-4 flex flex-col rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-md">
              <h3 className="text-base font-bold text-white text-center mb-4">
                VidIQ SEO Scorecard
              </h3>

              <div className="my-auto py-4">
                <ScoreMeter score={audit.overallScore} grade={audit.grade} size={160} />
              </div>

              <div className="mt-4 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-3 text-center">
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {audit.summary}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-2.5">
                  <span className="text-[10px] font-bold uppercase text-neutral-400">Title Chars</span>
                  <p className="text-sm font-bold text-white mt-0.5">{audit.stats?.titleLength || 0} / 70</p>
                </div>
                <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-2.5">
                  <span className="text-[10px] font-bold uppercase text-neutral-400">Tags Count</span>
                  <p className="text-sm font-bold text-white mt-0.5">{audit.stats?.tagCount || 0} tags</p>
                </div>
              </div>
            </div>

            {/* Checklist Section (Col 8) */}
            <div className="lg:col-span-8 rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Optimization Checklist ({audit.checklist?.length || 0} Checks)</span>
                </h3>
              </div>

              <div className="space-y-3">
                {audit.checklist?.map((item: any) => {
                  let Icon = CheckCircle2;
                  let colorClass = "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
                  if (item.status === "warn") {
                    Icon = AlertTriangle;
                    colorClass = "text-amber-400 bg-amber-500/10 border-amber-500/30";
                  } else if (item.status === "fail") {
                    Icon = XCircle;
                    colorClass = "text-rose-400 bg-rose-500/10 border-rose-500/30";
                  }

                  return (
                    <div
                      key={item.id + item.label}
                      className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 p-3.5 transition-all hover:border-neutral-700"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <span className={`mt-0.5 rounded-lg p-1 border ${colorClass}`}>
                            <Icon className="h-4 w-4 shrink-0" />
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{item.label}</span>
                              <span className="rounded bg-neutral-800 px-1.5 py-0.2 text-[10px] text-neutral-400 uppercase font-semibold">
                                {item.category}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-neutral-300 leading-relaxed">
                              {item.details}
                            </p>
                            {item.recommendation && (
                              <p className="mt-1 text-xs text-amber-300/90 font-medium">
                                💡 Tip: {item.recommendation}
                              </p>
                            )}
                          </div>
                        </div>

                        <span className="text-xs font-bold text-neutral-400 shrink-0">
                          +{item.pointsEarned} / {item.pointsMax}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Extracted Tags Section */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Tag className="h-4 w-4 text-red-400" />
                  <span>Video Tags Extracted ({video.keywords?.length || 0})</span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Hidden metadata keywords used by this video for search indexing
                </p>
              </div>

              {video.keywords && video.keywords.length > 0 && (
                <button
                  onClick={handleCopyTags}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-1.5 text-xs font-semibold text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800 transition-colors"
                >
                  {copiedTags ? (
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
              )}
            </div>

            {video.keywords && video.keywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {video.keywords.map((tag: string) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500">
                No video tags found on this upload. Adding 15+ tags will improve indexing.
              </p>
            )}
          </div>

          {/* Description Section */}
          {video.description && (
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="h-4 w-4 text-neutral-400" />
                  <span>Video Description</span>
                </h3>
                <button
                  onClick={() => setDescExpanded(!descExpanded)}
                  className="text-xs font-semibold text-red-400 hover:underline"
                >
                  {descExpanded ? "Show Less" : "Show Full Description"}
                </button>
              </div>

              <div
                className={`whitespace-pre-line text-xs leading-relaxed text-neutral-300 font-sans ${
                  descExpanded ? "" : "line-clamp-6"
                }`}
              >
                {video.description}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function InspectPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        </div>
      }
    >
      <InspectContent />
    </Suspense>
  );
}
