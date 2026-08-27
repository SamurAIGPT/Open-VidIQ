"use client";

import Link from "next/link";
import { formatNumber, formatDuration, formatTimeAgo } from "@/lib/utils";
import { Eye, Clock, CheckCircle2, ArrowUpRight, Subtitles, MessageSquare } from "lucide-react";

interface VideoCardProps {
  video: {
    rank?: number;
    video_id: string;
    title: string;
    url?: string;
    channel_name?: string;
    views_count?: number;
    publication_date?: string;
    duration?: string;
    thumbnail_url?: string;
    badges?: string[];
  };
}

export function VideoCard({ video }: VideoCardProps) {
  const thumbnail =
    video.thumbnail_url ||
    `https://i.ytimg.com/vi/${video.video_id}/hqdefault.jpg`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-3.5 backdrop-blur-sm transition-all hover:border-neutral-700 hover:bg-neutral-900/80 hover:shadow-xl hover:shadow-red-500/5">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-950">
        <img
          src={thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Rank Badge */}
        {typeof video.rank === "number" && (
          <div className="absolute left-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950/85 text-xs font-black text-white shadow-md backdrop-blur-md border border-neutral-700/50">
            #{video.rank}
          </div>
        )}

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-2.5 right-2.5 rounded-md bg-neutral-950/85 px-1.5 py-0.5 text-[11px] font-semibold text-neutral-200 backdrop-blur-md border border-neutral-800">
            {formatDuration(video.duration)}
          </div>
        )}

        {/* CC or 4K Badges */}
        {video.badges && video.badges.length > 0 && (
          <div className="absolute bottom-2.5 left-2.5 flex gap-1">
            {video.badges.map((b) => (
              <span
                key={b}
                className="rounded bg-neutral-950/80 px-1 py-0.2 text-[9px] font-bold uppercase tracking-wider text-neutral-300 border border-neutral-700/60"
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="mt-3 flex flex-1 flex-col justify-between">
        <div>
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-neutral-100 group-hover:text-white transition-colors">
            {video.title}
          </h3>

          <div className="mt-2 flex items-center justify-between text-xs text-neutral-400">
            <span className="font-medium truncate max-w-[150px] text-neutral-300">
              {video.channel_name || "Creator"}
            </span>
            <div className="flex items-center gap-1 text-neutral-400">
              <Eye className="h-3 w-3" />
              <span>{formatNumber(video.views_count)} views</span>
            </div>
          </div>

          {video.publication_date && (
            <div className="mt-1 flex items-center gap-1 text-[11px] text-neutral-500">
              <Clock className="h-3 w-3" />
              <span>{formatTimeAgo(video.publication_date)}</span>
            </div>
          )}
        </div>

        {/* Quick Action Links */}
        <div className="mt-3.5 grid grid-cols-3 gap-1.5 border-t border-neutral-800/80 pt-2.5">
          <Link
            href={`/inspect?id=${video.video_id}`}
            className="flex items-center justify-center gap-1 rounded-lg bg-neutral-800/60 py-1 text-[11px] font-semibold text-neutral-300 hover:bg-red-500/15 hover:text-red-400 hover:border-red-500/30 transition-all border border-transparent"
          >
            <CheckCircle2 className="h-3 w-3" />
            Audit
          </Link>
          <Link
            href={`/transcripts?id=${video.video_id}`}
            className="flex items-center justify-center gap-1 rounded-lg bg-neutral-800/60 py-1 text-[11px] font-semibold text-neutral-300 hover:bg-purple-500/15 hover:text-purple-400 hover:border-purple-500/30 transition-all border border-transparent"
          >
            <Subtitles className="h-3 w-3" />
            Captions
          </Link>
          <Link
            href={`/comments?id=${video.video_id}`}
            className="flex items-center justify-center gap-1 rounded-lg bg-neutral-800/60 py-1 text-[11px] font-semibold text-neutral-300 hover:bg-cyan-500/15 hover:text-cyan-400 hover:border-cyan-500/30 transition-all border border-transparent"
          >
            <MessageSquare className="h-3 w-3" />
            Comments
          </Link>
        </div>
      </div>
    </div>
  );
}
