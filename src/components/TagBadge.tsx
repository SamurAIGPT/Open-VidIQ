"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface TagBadgeProps {
  tag: string;
  count?: number;
  highlighted?: boolean;
}

export function TagBadge({ tag, count, highlighted }: TagBadgeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(tag);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      onClick={handleCopy}
      className={`group flex items-center gap-1.5 cursor-pointer select-none rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
        highlighted
          ? "bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25"
          : "bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800 hover:text-white"
      }`}
    >
      <span>#{tag}</span>
      {typeof count === "number" && (
        <span className="rounded-full bg-neutral-800 px-1.5 py-0.2 text-[10px] text-neutral-400 font-semibold group-hover:bg-neutral-700">
          {count}
        </span>
      )}
      <button className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 text-neutral-400 hover:text-white">
        {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
      </button>
    </div>
  );
}
