"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  MessageSquare,
  Search,
  ThumbsUp,
  HelpCircle,
  Smile,
  Loader2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { formatNumber, extractYoutubeVideoId } from "@/lib/utils";

function CommentsContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || searchParams.get("url") || "";

  const [inputUrl, setInputUrl] = useState(initialId);
  const [depth, setDepth] = useState(20);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async (urlOrId: string, depthVal: number) => {
    const cleanId = extractYoutubeVideoId(urlOrId);
    if (!cleanId) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(
        `/api/comments?id=${encodeURIComponent(cleanId)}&depth=${depthVal}`
      );
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to load video comments");
      }
      setData(json);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      fetchComments(initialId, depth);
    }
  }, [initialId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchComments(inputUrl, depth);
  };

  const sentiment = data?.sentiment_breakdown || {
    positive: 0,
    neutral: 0,
    question: 0,
    negative: 0,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="border-b border-neutral-800/80 pb-6">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-400 border border-emerald-500/20">
            <MessageSquare className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Audience & Comment Intelligence
          </h1>
        </div>
        <p className="mt-1 text-xs text-neutral-400">
          Sentiment distribution, high-engagement feedback, and question mining powered by{" "}
          <span className="font-mono text-neutral-300">/seo-youtube-video-comments</span>
        </p>
      </div>

      {/* Input Form */}
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
            placeholder="Paste YouTube video URL or ID..."
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 py-2.5 pl-10 pr-3 text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <select
          value={depth}
          onChange={(e) => setDepth(Number(e.target.value))}
          className="rounded-xl border border-neutral-800 bg-neutral-950/80 px-3 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
        >
          <option value={20}>20 Comments</option>
          <option value={40}>40 Comments</option>
          <option value={100}>100 Comments</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:opacity-95 disabled:opacity-50 transition-all"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Analyze Comments</span>
            </>
          )}
        </button>
      </form>

      {/* Error state */}
      {error && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Error analyzing comments:</span>
            <p className="mt-1 text-xs text-rose-200">{error}</p>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>
          <p className="mt-4 text-sm font-semibold text-white">
            Extracting viewer comments & running sentiment heuristics...
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            Polling MuAPI task until completed...
          </p>
        </div>
      )}

      {/* Initial Empty state */}
      {!loading && !data && !error && (
        <div className="mt-16 flex flex-col items-center justify-center text-center rounded-3xl border border-dashed border-neutral-800 p-12">
          <MessageSquare className="h-10 w-10 text-neutral-600 mb-3" />
          <h3 className="text-sm font-bold text-neutral-300">No Video Comments Analyzed Yet</h3>
          <p className="mt-1 text-xs text-neutral-500 max-w-sm">
            Paste any YouTube video URL or ID above to extract audience feedback and discover video ideas.
          </p>
        </div>
      )}

      {/* Results View */}
      {!loading && data && (
        <div className="mt-8 space-y-8">
          {/* Sentiment & Engagement Overview */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Smile className="h-4 w-4 text-emerald-400" />
                  <span>Audience Sentiment Breakdown</span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Calculated across {data.items?.length || 0} retrieved comments
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  Positive {sentiment.positive}%
                </span>
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <span className="h-2 w-2 rounded-full bg-neutral-400"></span>
                  Neutral {sentiment.neutral}%
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                  Questions {sentiment.question}%
                </span>
              </div>
            </div>

            {/* Segmented Progress Bar */}
            <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-800 flex">
              <div
                style={{ width: `${sentiment.positive}%` }}
                className="bg-emerald-500 transition-all duration-700"
              />
              <div
                style={{ width: `${sentiment.neutral}%` }}
                className="bg-neutral-600 transition-all duration-700"
              />
              <div
                style={{ width: `${sentiment.question}%` }}
                className="bg-cyan-500 transition-all duration-700"
              />
              <div
                style={{ width: `${sentiment.negative}%` }}
                className="bg-rose-500 transition-all duration-700"
              />
            </div>
          </div>

          {/* Top Viewer Questions (Goldmine for Content Ideas) */}
          {data.top_questions && data.top_questions.length > 0 && (
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-md">
              <div className="mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-400" />
                  <span>Next Video Ideas: Top Viewer Questions Mined</span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Direct questions asked by viewers in the comments. Turn these into your next uploads!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.top_questions.map((q: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-2xl border border-neutral-800/80 bg-neutral-950/60 p-4"
                  >
                    <HelpCircle className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <p className="text-xs font-medium text-neutral-200 leading-relaxed">
                      &quot;{q}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Feed */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-md">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-neutral-400" />
              <span>Top Audience Comments ({data.items?.length || 0})</span>
            </h3>

            <div className="space-y-4">
              {(data.items || []).map((comment: any, idx: number) => (
                <div
                  key={comment.comment_id || idx}
                  className="rounded-2xl border border-neutral-800/70 bg-neutral-950/40 p-4 transition-colors hover:border-neutral-700"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {comment.author_thumbnail ? (
                        <img
                          src={comment.author_thumbnail}
                          alt={comment.author_title}
                          className="h-8 w-8 rounded-full object-cover border border-neutral-700"
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-xs font-bold text-white">
                          {(comment.author_title || "U")[0]}
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {comment.author_title || "Viewer"}
                          </span>
                          {comment.publication_date && (
                            <span className="text-[11px] text-neutral-500">
                              {comment.publication_date}
                            </span>
                          )}
                        </div>

                        <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed">
                          {comment.text}
                        </p>
                      </div>
                    </div>

                    {/* Reactions */}
                    <div className="flex items-center gap-3 text-xs font-semibold text-neutral-400 shrink-0">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3.5 w-3.5 text-neutral-400" />
                        <span>{formatNumber(comment.likes_count)}</span>
                      </div>
                      {typeof comment.reply_count === "number" && comment.reply_count > 0 && (
                        <div className="flex items-center gap-1 text-neutral-400">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>{comment.reply_count}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CommentsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      }
    >
      <CommentsContent />
    </Suspense>
  );
}
