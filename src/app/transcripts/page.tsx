"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Subtitles,
  Search,
  Copy,
  Check,
  Download,
  Clock,
  Sparkles,
  Loader2,
  AlertCircle,
  ExternalLink,
  FileText,
} from "lucide-react";
import { formatSecondsToTimestamp, extractYoutubeVideoId } from "@/lib/utils";

function TranscriptsContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || searchParams.get("url") || "X_qZ5jQp1kA";

  const [inputUrl, setInputUrl] = useState(initialId);
  const [lang, setLang] = useState("en");
  const [searchFilter, setSearchFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState<number | null>(null);

  const fetchSubtitles = async (urlOrId: string, language: string) => {
    const cleanId = extractYoutubeVideoId(urlOrId);
    if (!cleanId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/subtitles?id=${encodeURIComponent(cleanId)}&lang=${encodeURIComponent(language)}`
      );
      if (!res.ok) throw new Error("Failed to load video subtitles");
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
      fetchSubtitles(initialId, lang);
    }
  }, [initialId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSubtitles(inputUrl, lang);
  };

  const items = data?.items || [];
  const filteredItems = items.filter((item: any) =>
    (item.text || "").toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleCopyTranscript = () => {
    if (!data?.full_text) return;
    navigator.clipboard.writeText(data.full_text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 1800);
  };

  const handleDownloadTxt = () => {
    if (!data?.full_text) return;
    const blob = new Blob([data.full_text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${data.video_id || "video"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadSrt = () => {
    if (!items.length) return;
    let srt = "";
    items.forEach((item: any, idx: number) => {
      const startS = item.start || 0;
      const endS = item.end || startS + 3;
      const startStr = formatSecondsToTimestamp(startS) + ",000";
      const endStr = formatSecondsToTimestamp(endS) + ",000";

      srt += `${idx + 1}\n00:${startStr} --> 00:${endStr}\n${item.text}\n\n`;
    });

    const blob = new Blob([srt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subtitles-${data.video_id || "video"}.srt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="border-b border-neutral-800/80 pb-6">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-cyan-500/10 p-1.5 text-cyan-400 border border-cyan-500/20">
            <Subtitles className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Subtitles & Transcript Studio
          </h1>
        </div>
        <p className="mt-1 text-xs text-neutral-400">
          Searchable captions, timestamp indexing, and exports powered by{" "}
          <span className="font-mono text-neutral-300">/seo-youtube-video-subtitles</span>
        </p>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3 backdrop-blur-md"
      >
        <div className="sm:col-span-8 relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Paste YouTube video URL or ID..."
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 py-2.5 pl-10 pr-3 text-sm text-white placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2 flex items-center">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 px-3 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none cursor-pointer"
          >
            <option value="en">English (en)</option>
            <option value="es">Spanish (es)</option>
            <option value="fr">French (fr)</option>
            <option value="de">German (de)</option>
            <option value="hi">Hindi (hi)</option>
            <option value="ja">Japanese (ja)</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Subtitles className="h-3.5 w-3.5" />
                <span>Fetch Captions</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error display */}
      {error && (
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-pulse">
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>
          <p className="mt-4 text-sm font-semibold text-white">
            Extracting synchronized captions and timestamps...
          </p>
        </div>
      )}

      {/* Main Subtitles Content */}
      {!loading && data && (
        <div className="mt-8 space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/20">
                {items.length} Subtitle Blocks
              </span>
              <span className="text-xs text-neutral-400">
                Language: <span className="text-white font-semibold uppercase">{data.language || "en"}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyTranscript}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition-colors"
              >
                {copiedText ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedText ? "Copied!" : "Copy Full Text"}</span>
              </button>

              <button
                onClick={handleDownloadTxt}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition-colors"
              >
                <FileText className="h-3.5 w-3.5 text-cyan-400" />
                <span>Export TXT</span>
              </button>

              <button
                onClick={handleDownloadSrt}
                className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-purple-400" />
                <span>Export SRT</span>
              </button>
            </div>
          </div>

          {/* Transcript Viewer with Search */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-md">
            <div className="mb-4">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter spoken text in transcript (e.g. 'camera', 'prompt', 'model')..."
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 py-2 pl-3 pr-3 text-xs text-white placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="max-h-[500px] overflow-y-auto space-y-2 pr-2">
              {filteredItems.map((item: any, idx: number) => {
                const isActive = activeSubtitleIndex === idx;
                const startStr = formatSecondsToTimestamp(item.start || 0);

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveSubtitleIndex(idx)}
                    className={`flex items-start gap-3 rounded-xl p-2.5 transition-all cursor-pointer border ${
                      isActive
                        ? "bg-cyan-500/10 border-cyan-500/30 text-white"
                        : "border-transparent bg-neutral-900/30 hover:bg-neutral-900/80 hover:border-neutral-800 text-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-1 font-mono text-xs text-cyan-400 shrink-0 font-semibold bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      <Clock className="h-3 w-3" />
                      <span>{startStr}</span>
                    </div>

                    <p className="text-xs leading-relaxed">{item.text}</p>
                  </div>
                );
              })}

              {filteredItems.length === 0 && (
                <div className="py-12 text-center text-xs text-neutral-500">
                  No spoken lines match your filter.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TranscriptsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
        </div>
      }
    >
      <TranscriptsContent />
    </Suspense>
  );
}
