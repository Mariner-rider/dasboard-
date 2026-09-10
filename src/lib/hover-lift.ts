import { gsap } from "gsap";

/**
 * Sitewide subtle hover lift: scale 1.02 + shadow elevation on hover,
 * reverting on leave. Applied to elements marked with `data-hover-lift`.
 * Skips elements with `data-no-hover` or `disabled`.
 *
 * Implemented via event delegation on the document so we don't observe
 * or scan the DOM tree — safe on large landing pages.
 */

const RESTING = new WeakMap<Element, string>();
let started = false;
const LIFT_SHADOW =
  "0 10px 30px -12px hsl(var(--foreground) / 0.18), 0 4px 12px -6px hsl(var(--foreground) / 0.12)";

function resolveTarget(e: Event): HTMLElement | null {
  const t = e.target as HTMLElement | null;
  if (!t || typeof t.closest !== "function") return null;
  const el = t.closest<HTMLElement>("[data-hover-lift]");
  if (!el) return null;
  if (el.hasAttribute("data-no-hover")) return null;
  if ((el as HTMLButtonElement).disabled) return null;
  return el;
}

function enter(el: HTMLElement) {
  if (!RESTING.has(el)) {
    const s = getComputedStyle(el).boxShadow;
    RESTING.set(el, s === "none" ? "0 0 0 rgba(0,0,0,0)" : s);
  }
  gsap.to(el, {
    scale: 1.02,
    boxShadow: LIFT_SHADOW,
    duration: 0.2,
    ease: "power2.out",
    overwrite: "auto",
  });
}

function leave(el: HTMLElement) {
  gsap.to(el, {
    scale: 1,
    boxShadow: RESTING.get(el) ?? "0 0 0 rgba(0,0,0,0)",
    duration: 0.2,
    ease: "power2.out",
    overwrite: "auto",
  });
}

export function initHoverLift() {
  if (typeof window === "undefined" || started) return;
  const w = window as typeof window & { __rivinityHoverLiftStarted?: boolean };
  if (w.__rivinityHoverLiftStarted) return;
  started = true;
  w.__rivinityHoverLiftStarted = true;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  // `mouseover`/`mouseout` bubble (unlike `mouseenter`/`mouseleave`), which
  // is what makes a single delegated listener possible.
  document.addEventListener("mouseover", (e) => {
    const el = resolveTarget(e);
    if (!el) return;
    const related = (e as MouseEvent).relatedTarget as Node | null;
    if (related && el.contains(related)) return; // still inside
    enter(el);
  });
  document.addEventListener("mouseout", (e) => {
    const el = resolveTarget(e);
    if (!el) return;
    const related = (e as MouseEvent).relatedTarget as Node | null;
    if (related && el.contains(related)) return; // moved within the same target
    leave(el);
  });
}