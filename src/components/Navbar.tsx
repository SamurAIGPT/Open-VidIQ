"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  CheckCircle2,
  Sparkles,
  Subtitles,
  MessageSquare,
  BarChart3,
  Zap,
} from "lucide-react";

function YoutubeIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Overview", icon: BarChart3 },
    { href: "/keywords", label: "Keywords", icon: Search },
    { href: "/inspect", label: "Video Inspector", icon: CheckCircle2 },
    { href: "/transcripts", label: "Transcripts", icon: Subtitles },
    { href: "/comments", label: "Comments", icon: MessageSquare },
    { href: "/copilot", label: "AI Copilot", icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform text-white">
            <YoutubeIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-white">
                Open<span className="text-red-500">VidIQ</span>
              </span>
              <span className="rounded-md bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-bold text-purple-400 border border-purple-500/20">
                OSS
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-medium tracking-wide">
              Powered by MuAPI YouTube SERP
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-900/60 p-1 rounded-xl border border-neutral-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-red-500/15 text-red-400 border border-red-500/30 shadow-sm"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-red-400" : "text-neutral-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline">MuAPI Live</span>
            <Zap className="h-3 w-3 text-emerald-400 ml-0.5" />
          </div>

          <a
            href="https://github.com/SamurAIGPT/Open-VidIQ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
