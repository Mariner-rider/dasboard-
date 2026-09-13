import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToolItem {
  id?: string;
  icon: LucideIcon;
  label: string;
  color?: string;
  route?: string | null;
}

interface Props {
  tools: ToolItem[];
  /** Number of columns in the grid. Default: 2. */
  columns?: 2 | 3;
  activeId?: string;
  onSelect?: (tool: ToolItem) => void;
  /** Optional dense mode used by RivinityLM (smaller icons, tighter padding). */
  dense?: boolean;
}

/**
 * Reusable icon-button grid used in every right panel's "Tools" section.
 */
const ToolsGrid = ({ tools, columns = 2, activeId, onSelect, dense = false }: Props) => {
  const gridCls = columns === 3 ? "grid-cols-3 gap-1.5" : "grid-cols-2 gap-2";
  return (
    <div className={cn("grid", gridCls)}>
      {tools.map((t) => {
        const isActive = activeId != null && t.id === activeId;
        const interactive = !!(t.route || onSelect || t.id);
        return (
          <button
            key={t.id ?? t.label}
            onClick={() => onSelect?.(t)}
            className={cn(
              "flex flex-col items-center rounded-xl border transition-all duration-150",
              dense ? "gap-1 p-2.5" : "gap-1.5 p-3",
              isActive
                ? "glass border-primary/20 shadow-glow-accent"
                : dense
                ? "border-transparent hover:glass hover:border-glass hover:shadow-float"
                : "glass border-glass border-glass-hover",
              !dense && interactive && "cursor-pointer hover:shadow-float hover:-translate-y-0.5",
              !interactive && !dense && "opacity-80",
            )}
          >
            <t.icon className={cn(dense ? "w-3.5 h-3.5" : "w-4 h-4", t.color)} />
            <span
              className={cn(
                "font-medium leading-tight text-center",
                dense ? "text-[10px] text-foreground/60" : "text-[11px] text-foreground/70",
              )}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ToolsGrid;