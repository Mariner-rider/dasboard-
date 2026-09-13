import { useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Plus } from "lucide-react";

export type FaqItem = { q: string; a: string };

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const firstRun = useRef(true);

  useLayoutEffect(() => {
    const el = panelRef.current;
    const icon = iconRef.current;
    if (!el) return;

    if (firstRun.current) {
      // Initialise without animating
      firstRun.current = false;
      gsap.set(el, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
      if (icon) gsap.set(icon, { rotate: open ? 45 : 0 });
      return;
    }

    if (open) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => gsap.set(el, { height: "auto" }),
        },
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    if (icon) {
      gsap.to(icon, { rotate: open ? 45 : 0, duration: 0.3, ease: "power2.out" });
    }
  }, [open]);

  return (
    <div className="border-b border-glass/70 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
      >
        <span className="text-[15.5px] md:text-[16.5px] font-medium text-foreground group-hover:text-foreground transition-colors">
          {item.q}
        </span>
        <span
          ref={iconRef}
          className="shrink-0 inline-flex w-8 h-8 items-center justify-center rounded-full border border-glass text-foreground/70 group-hover:text-foreground transition-colors"
          aria-hidden
        >
          <Plus className="w-4 h-4" strokeWidth={1.75} />
        </span>
      </button>
      <div ref={panelRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="pb-5 pr-12 text-[14px] md:text-[14.5px] text-foreground/70 leading-relaxed">
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);
  return (
    <div className="glass border border-glass rounded-3xl px-6 md:px-8">
      {items.map((item, i) => (
        <FaqRow
          key={item.q}
          item={item}
          open={openIndex === i}
          onToggle={() => setOpenIndex((cur) => (cur === i ? -1 : i))}
        />
      ))}
    </div>
  );
}