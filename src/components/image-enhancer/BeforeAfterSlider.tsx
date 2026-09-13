import { useRef, useState, useCallback, useEffect } from "react";
import { GripVertical } from "lucide-react";

interface Props {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  /** Optional CSS filter to apply to the "after" image (useful for demos when a real enhanced file isn't available yet). */
  afterFilter?: string;
  /** Optional CSS filter to apply to the "before" image (e.g. subtle blur to simulate low-res). */
  beforeFilter?: string;
}

/**
 * Premium before/after comparison slider.
 * - Drag anywhere on the image, or use the handle.
 * - Keyboard: ←/→ to nudge (1%), Shift+←/→ for 5%.
 * - Calm, infrastructure-grade look: thin divider, glass handle, subtle shadow.
 */
const BeforeAfterSlider = ({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
  afterFilter,
  beforeFilter = "blur(1.2px) saturate(0.9) contrast(0.95)",
}: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, raw)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0]?.clientX ?? 0 : (e as MouseEvent).clientX;
      updateFromClientX(x);
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full h-full select-none overflow-hidden rounded-xl group ${className}`}
      onMouseDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        updateFromClientX(e.touches[0].clientX);
      }}
    >
      {/* AFTER (full image, base layer) */}
      <img
        src={after}
        alt="after"
        draggable={false}
        style={afterFilter ? { filter: afterFilter } : undefined}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />

      {/* BEFORE (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt="before"
          draggable={false}
          style={beforeFilter ? { filter: beforeFilter } : undefined}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full glass border border-glass text-[10px] font-medium tracking-widest uppercase text-foreground/70">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full glass border border-glass text-[10px] font-medium tracking-widest uppercase text-foreground/70">
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.55)] pointer-events-none"
        style={{ left: `${pos}%` }}
      />
      <button
        type="button"
        aria-label="Drag to compare"
        onKeyDown={(e) => {
          const step = e.shiftKey ? 5 : 1;
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step));
        }}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass-strong border border-glass shadow-float flex items-center justify-center text-foreground/80 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-primary/50"
        style={{ left: `${pos}%` }}
        onMouseDown={(e) => {
          e.stopPropagation();
          dragging.current = true;
        }}
      >
        <GripVertical className="w-4 h-4" strokeWidth={1.75} />
      </button>
    </div>
  );
};

export default BeforeAfterSlider;