import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
  sub?: string;
}

export default function StatsRow({
  stats,
  className,
}: {
  stats: Stat[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4",
        className,
      )}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="glass border border-glass rounded-2xl p-5 hover:border-[hsl(var(--glass-border-hover))] transition-colors"
        >
          <div className="text-[28px] lg:text-[36px] font-semibold tracking-tight gradient-accent-text">
            {s.value}
          </div>
          <div className="mt-1 text-[13px] text-foreground/70 font-medium">{s.label}</div>
          {s.sub && <div className="mt-1 text-[11.5px] text-foreground/45">{s.sub}</div>}
        </div>
      ))}
    </div>
  );
}
