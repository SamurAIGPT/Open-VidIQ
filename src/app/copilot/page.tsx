"use client";

import { useState } from "react";
import {
  Sparkles,
  Type,
  Tag,
  Copy,
  Check,
  Image as ImageIcon,
  FileText,
  Loader2,
  ArrowRight,
  Flame,
  Wand2,
} from "lucide-react";
import { TagBadge } from "@/components/TagBadge";

export default function CopilotPage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedTitle, setCopiedTitle] = useState<number | null>(null);
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to generate copilot ideas");
      }
      setData(json);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const copyTitle = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedTitle(idx);
    setTimeout(() => setCopiedTitle(null), 1500);
  };

  const copyDescription = () => {
    if (!data?.description) return;
    navigator.clipboard.writeText(data.description);
    setCopiedDesc(true);
    setTimeout(() => setCopiedDesc(false), 1800);
  };

  const copyAllTags = () => {
    if (!data?.tags) return;
    navigator.clipboard.writeText(data.tags.join(", "));
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 1800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="border-b border-neutral-800/80 pb-6">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-amber-500/10 p-1.5 text-amber-400 border border-amber-500/20">
            <Sparkles className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-black tracking-tight text-white">
            AI Creator Copilot & Optimizer
          </h1>
        </div>
        <p className="mt-1 text-xs text-neutral-400">
          Viral title variants, SEO descriptions, tags, and thumbnail prompts powered by{" "}
          <span className="font-mono text-neutral-300">MuAPI AI Generative Suite</span>
        </p>
      </div>

      {/* Generator Prompt Box */}
      <form
        onSubmit={handleGenerate}
        className="mt-6 rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 backdrop-blur-md"
      >
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
          What is your video about?
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. 'Next.js 15 Full Course', 'Building a Micro SaaS', 'iPhone 16 Review'..."
            className="flex-1 rounded-2xl border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-amber-500/20 hover:opacity-95 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                <span>Generate Copilot Assets</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error state */}
      {error && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          <div className="h-5 w-5 text-rose-400 shrink-0 mt-0.5">⚠️</div>
          <div>
            <span className="font-bold">Error generating copilot ideas:</span>
            <p className="mt-1 text-xs text-rose-200">{error}</p>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>
          <p className="mt-4 text-sm font-semibold text-white">
            Generating high-converting title hooks, SEO descriptions, and thumbnail prompts...
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            Polling MuAPI task until completed...
          </p>
        </div>
      )}

      {/* Results Section */}
      {data && (
        <div className="mt-8 space-y-8">
          {/* Viral Title Variants */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-md">
            <div className="mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Type className="h-4 w-4 text-amber-400" />
                <span>High-CTR Title Variations (5 Psychological Hooks)</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Click any title to copy it to your clipboard
              </p>
            </div>

            <div className="space-y-3">
              {data.titles?.map((title: string, idx: number) => {
                const hooks = ["Curiosity Gap", "Master Guide", "Contrarian Warning", "Definitive Proof", "High Stakes"];
                return (
                  <div
                    key={idx}
                    onClick={() => copyTitle(title, idx)}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4 transition-all hover:border-amber-500/40 hover:bg-neutral-900 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-lg bg-neutral-900 px-2 py-1 text-[10px] font-extrabold uppercase text-neutral-400 border border-neutral-800">
                        {hooks[idx] || `Hook #${idx + 1}`}
                      </span>
                      <p className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {title}
                      </p>
                    </div>

                    <button className="text-neutral-400 group-hover:text-white transition-colors">
                      {copiedTitle === idx ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Thumbnail Concept Studio */}
          {data.thumbnail_concepts && (
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-md">
              <div className="mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-purple-400" />
                  <span>AI Thumbnail Visual Concepts</span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Ready-to-use prompts for MuAPI image models (/nano-banana & /nano-banana-2)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.thumbnail_concepts.map((concept: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-purple-400 uppercase">
                          Concept #{idx + 1}
                        </span>
                        <span className="rounded bg-red-500/10 px-2 py-0.5 text-[10px] font-black text-red-400 border border-red-500/20">
                          {concept.text_overlay}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white mb-2">
                        {concept.hook}
                      </h4>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {concept.visual}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-800">
                      <span className="text-[10px] font-bold uppercase text-neutral-500">AI Prompt</span>
                      <p className="mt-1 font-mono text-[11px] text-neutral-400 line-clamp-3">
                        {concept.prompt_for_ai}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description & Tags */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Description (Col 7) */}
            <div className="lg:col-span-7 rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="h-4 w-4 text-cyan-400" />
                  <span>SEO-Optimized Description</span>
                </h3>
                <button
                  onClick={copyDescription}
                  className="flex items-center gap-1 text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  {copiedDesc ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedDesc ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              <div className="whitespace-pre-line text-xs leading-relaxed text-neutral-300 font-sans rounded-2xl bg-neutral-950/60 p-4 border border-neutral-800/80">
                {data.description}
              </div>
            </div>

            {/* Suggested Tags (Col 5) */}
            <div className="lg:col-span-5 rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Tag className="h-4 w-4 text-emerald-400" />
                  <span>Generated Video Tags</span>
                </h3>
                <button
                  onClick={copyAllTags}
                  className="flex items-center gap-1 text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  {copiedTags ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedTags ? "Copied!" : "Copy All"}</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {data.tags?.map((tag: string) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
