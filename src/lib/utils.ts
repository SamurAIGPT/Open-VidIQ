/**
 * Open-VidIQ Utility Functions
 */

export function extractYoutubeVideoId(urlOrId: string): string {
  if (!urlOrId) return "";
  const val = urlOrId.trim();

  // If already an 11-char ID
  if (/^[A-Za-z0-9_-]{11}$/.test(val)) {
    return val;
  }

  // Standard watch URL: watch?v=...
  const watchMatch = val.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // youtu.be short URL
  const shortMatch = val.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // embed URL
  const embedMatch = val.match(/embed\/([A-Za-z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // shorts URL
  const shortsMatch = val.match(/shorts\/([A-Za-z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  return val;
}

export function formatNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return "0";
  const n = typeof num === "string" ? parseInt(num, 10) : num;
  if (isNaN(n)) return "0";

  if (n >= 1_000_000_000) {
    return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (n >= 1_000) {
    return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return n.toLocaleString();
}

export function formatDuration(duration: string | number | undefined | null): string {
  if (!duration) return "--:--";

  if (typeof duration === "string") {
    // If it's ISO 8601 like PT14M22S
    const isoMatch = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (isoMatch) {
      const hours = parseInt(isoMatch[1] || "0", 10);
      const minutes = parseInt(isoMatch[2] || "0", 10);
      const seconds = parseInt(isoMatch[3] || "0", 10);

      const secStr = seconds.toString().padStart(2, "0");
      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${secStr}`;
      }
      return `${minutes}:${secStr}`;
    }

    // If it's already "MM:SS" or "HH:MM:SS"
    if (/^\d{1,2}:\d{2}(?::\d{2})?$/.test(duration)) {
      return duration;
    }
  }

  if (typeof duration === "number") {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    const secStr = seconds.toString().padStart(2, "0");
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secStr}`;
    }
    return `${minutes}:${secStr}`;
  }

  return String(duration);
}

export function formatSecondsToTimestamp(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function formatTimeAgo(dateStr: string | undefined | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

export function getScoreColor(score: number): {
  text: string;
  bg: string;
  border: string;
  ring: string;
  label: string;
} {
  if (score >= 80) {
    return {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      ring: "#10b981",
      label: "Excellent",
    };
  }
  if (score >= 60) {
    return {
      text: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      ring: "#06b6d4",
      label: "Good",
    };
  }
  if (score >= 40) {
    return {
      text: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      ring: "#f59e0b",
      label: "Fair",
    };
  }
  return {
    text: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    ring: "#f43f5e",
    label: "Needs Work",
  };
}
