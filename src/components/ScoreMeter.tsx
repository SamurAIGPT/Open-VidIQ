"use client";

import { getScoreColor } from "@/lib/utils";

interface ScoreMeterProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  grade?: string;
  showLabel?: boolean;
}

export function ScoreMeter({
  score,
  size = 140,
  strokeWidth = 10,
  grade,
  showLabel = true,
}: ScoreMeterProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;
  const style = getScoreColor(clampedScore);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="rotate-[-90deg]" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-neutral-800/80"
          />
          {/* Foreground progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={style.ring}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-3xl font-black tracking-tight ${style.text}`}>
            {clampedScore}
          </span>
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            / 100
          </span>
          {grade && (
            <span className={`mt-0.5 rounded px-1.5 py-0.2 text-[10px] font-extrabold ${style.bg} ${style.text} border ${style.border}`}>
              Grade {grade}
            </span>
          )}
        </div>
      </div>

      {showLabel && (
        <div className="mt-2 text-center">
          <span className={`text-xs font-semibold uppercase tracking-wider ${style.text}`}>
            {style.label}
          </span>
        </div>
      )}
    </div>
  );
}
