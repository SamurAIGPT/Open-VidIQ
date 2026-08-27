import { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: ReactNode;
  trend?: string;
  trendPositive?: boolean;
}

export function MetricCard({
  label,
  value,
  subtext,
  icon,
  trend,
  trendPositive = true,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-4 backdrop-blur-md transition-all hover:border-neutral-700 hover:bg-neutral-900/80">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {label}
        </span>
        {icon && <div className="text-neutral-400">{icon}</div>}
      </div>

      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="text-2xl font-black tracking-tight text-white">{value}</span>
        {trend && (
          <span
            className={`text-xs font-bold ${
              trendPositive ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      {subtext && <p className="mt-1 text-xs text-neutral-400">{subtext}</p>}
    </div>
  );
}
