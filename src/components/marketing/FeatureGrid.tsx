import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
}

export default function FeatureGrid({
  items,
  cols = 3,
}: {
  items: Feature[];
  cols?: 2 | 3 | 4;
}) {
  const gridCols =
    cols === 2
      ? "md:grid-cols-2"
      : cols === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <div data-reveal-group className={cn("grid grid-cols-1 gap-4", gridCols)}>
      {items.map((f) => {
        const Icon = f.icon;
        return (
          <div
            key={f.title}
            className="group glass border border-glass rounded-2xl p-6 hover:border-[hsl(var(--glass-border-hover))] transition-all hover:-translate-y-0.5 duration-300"
          >
            <Icon className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
            <div className="mt-4 text-[16px] font-semibold">{f.title}</div>
            <p className="mt-2 text-[13.5px] text-foreground/65 leading-relaxed">
              {f.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}
