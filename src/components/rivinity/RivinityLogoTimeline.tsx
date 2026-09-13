import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import part1 from "@/assets/rivinity-logo-part1.png.asset.json";
import part2 from "@/assets/rivinity-logo-part2.png.asset.json";
import part3 from "@/assets/rivinity-logo-part3.png.asset.json";

/**
 * RivinityLogoTimeline — one shared GSAP timeline for the 3-part Rivinity mark.
 *
 * Modes:
 *  - "assemble" : three parts fly in from separated positions and lock into the
 *                 full logo. Runs once on mount (~1.2s). Used for hero load-in.
 *  - "orbit"    : the assembled logo gently separates and reassembles on a
 *                 continuous ~2s loop. Used inside the Born from Motion section.
 *  - "pulse"    : subtle, low-amplitude breathing loop (~1.2s). Used as a
 *                 loading indicator in place of generic spinners.
 *  - "float"    : fully static assembled mark.
 *
 * All motion respects `prefers-reduced-motion`.
 */
export type RivinityLogoMode = "assemble" | "orbit" | "pulse" | "float";

export interface RivinityLogoTimelineProps {
  mode?: RivinityLogoMode;
  size?: number;
  className?: string;
}

const PARTS = [
  { src: part3.url, offset: { x: -34, y: -22 }, rot: -14 }, // outer
  { src: part2.url, offset: { x: 30, y: -18 }, rot: 12 },   // mid
  { src: part1.url, offset: { x: 0, y: 30 }, rot: -8 },     // inner
];

export default function RivinityLogoTimeline({
  mode = "assemble",
  size = 132,
  className,
}: RivinityLogoTimelineProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const parts = Array.from(
      root.querySelectorAll<HTMLElement>("[data-logo-part]"),
    );
    if (parts.length === 0) return;

    const reducedMQ =
      typeof window !== "undefined"
        ? window.matchMedia?.("(prefers-reduced-motion: reduce)")
        : null;
    let prefersReduced = !!reducedMQ?.matches;

    // Track every animation this effect creates so we can guarantee
    // .kill() on unmount / route change, even if gsap.context() misses one.
    const animations: gsap.core.Animation[] = [];
    let loopAnimation: gsap.core.Animation | null = null;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(parts, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
        return;
      }

      if (mode === "assemble") {
        gsap.set(parts, (i) => ({
          x: PARTS[i].offset.x,
          y: PARTS[i].offset.y,
          rotate: PARTS[i].rot,
          scale: 0.7,
          opacity: 0,
        }));
        const assembleTl = gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(parts, {
            opacity: 1,
            duration: 0.35,
            stagger: 0.08,
          })
          .to(
            parts,
            {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.06,
              ease: "expo.out",
            },
            "<",
          );
        animations.push(assembleTl);
      } else if (mode === "orbit") {
        gsap.set(parts, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
        const tl = gsap.timeline({
          repeat: -1,
          paused: true,
          defaults: { ease: "sine.inOut" },
        });
        tl.to(parts, {
          x: (i) => PARTS[i].offset.x * 0.55,
          y: (i) => PARTS[i].offset.y * 0.55,
          rotate: (i) => PARTS[i].rot * 0.6,
          scale: 0.92,
          duration: 0.9,
          stagger: 0.05,
        })
          .to(parts, {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.05,
          })
          .to({}, { duration: 0.3 });
        loopAnimation = tl;
        animations.push(tl);
      } else if (mode === "float") {
        // Bilkul static: koi rotation ya scaling loop nahi chalegi
        gsap.set(parts, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
        gsap.set(root, { rotate: 0 });
      } else {
        // pulse — loader
        gsap.set(parts, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
        loopAnimation = gsap.to(parts, {
          scale: 1.08,
          rotate: (i) => (i % 2 === 0 ? 6 : -6),
          opacity: 0.75,
          duration: 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          paused: true,
          stagger: 0.12,
        });
        if (loopAnimation) animations.push(loopAnimation);
      }
    }, root);

    let observer: IntersectionObserver | null = null;
    if (loopAnimation && !prefersReduced) {
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) loopAnimation?.play();
            else loopAnimation?.pause();
          },
          { rootMargin: "160px" },
        );
        observer.observe(root);
      } else {
        loopAnimation.play();
      }
    }

    // If the user toggles reduced-motion mid-session, tear the loop down
    // rather than letting it keep running forever.
    const onReducedChange = (e: MediaQueryListEvent) => {
      if (!e.matches) return;
      prefersReduced = true;
      observer?.disconnect();
      observer = null;
      animations.forEach((a) => a.kill());
      animations.length = 0;
      loopAnimation = null;
      gsap.set(parts, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
    };
    reducedMQ?.addEventListener?.("change", onReducedChange);

    return () => {
      reducedMQ?.removeEventListener?.("change", onReducedChange);
      observer?.disconnect();
      // Explicitly kill every tracked animation so nothing survives
      // an unmount / route change.
      animations.forEach((a) => a.kill());
      animations.length = 0;
      loopAnimation = null;
      ctx.revert();
    };
  }, [mode]);

  return (
    <div
      ref={rootRef}
      className={cn("relative inline-block", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Warm ambient halo tinted with the site's accent gradient */}
      <div
        className="absolute inset-[8%] rounded-full blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(253,136,31,0.28), rgba(245,169,208,0.14) 55%, transparent 78%)",
        }}
      />
      {PARTS.map((p, i) => (
        <img
          key={i}
          data-logo-part
          src={p.src}
          alt=""
          loading={mode === "assemble" ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain select-none will-change-transform"
          style={{ filter: "drop-shadow(0 6px 22px rgba(253,136,31,0.22))" }}
        />
      ))}
    </div>
  );
}

/** Small drop-in loader (~28px) using the pulse variant. */
export function RivinityLoader({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return <RivinityLogoTimeline mode="pulse" size={size} className={className} />;
}