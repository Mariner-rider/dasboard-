import type { LucideIcon } from "lucide-react";

export interface RecentItem {
  label: string;
  time: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface Props {
  items: RecentItem[];
  /** Tighter row padding used by RivinityLM. Default: comfortable (Audio Lab / Image Enhancer). */
  dense?: boolean;
}

/** Reusable "Recent" list of icon + label + timestamp rows. */
const RecentList = ({ items, dense = false }: Props) => (
  <div className={dense ? "space-y-1" : "space-y-2"}>
    {items.map((item) => (
      <button
        key={item.label}
        onClick={item.onClick}
        className={
          dense
            ? "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-accent/50 transition-colors text-left"
            : "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent/50 transition-colors text-left"
        }
      >
        <item.icon
          className={
            dense
              ? "w-3.5 h-3.5 text-muted-foreground/40 shrink-0"
              : "w-3.5 h-3.5 text-muted-foreground/50"
          }
        />
        <div className="flex-1 min-w-0">
          <p
            className={
              dense
                ? "text-[11px] font-medium text-foreground/65 truncate"
                : "text-[12px] font-medium text-foreground/70 truncate"
            }
          >
            {item.label}
          </p>
          <p className={dense ? "text-[10px] text-muted-foreground/35" : "text-[10px] text-muted-foreground/40"}>
            {item.time}
          </p>
        </div>
      </button>
    ))}
  </div>
);

export default RecentList;