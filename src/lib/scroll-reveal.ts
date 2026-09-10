import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Consistent scroll-reveal for section headings and card grids.
 *
 * Opt-in via markup:
 *   - Single element:  data-reveal            → fades in + slides up 24px
 *   - Staggered group: data-reveal-group      → animates direct children,
 *                                                stagger 0.08s
 *   - Opt-out:         data-no-reveal         → skips an element even if
 *                                                it matches an auto rule
 *
 * Auto-targeted (in addition to opt-in):
 *   - <h2> inside a <section> (section headings) unless data-no-reveal or
 *     inside a [data-no-reveal] ancestor or inside a hero section
 *     (`section[data-hero]`, `#hero`, or `[data-hero]` ancestor).
 *
 * Hero sections are intentionally excluded — they get bespoke per-page
 * animations later.
 */

const REVEAL_MARK = "__srReady";

type Marked = HTMLElement & { [REVEAL_MARK]?: boolean };

const isHero = (el: HTMLElement) =>
  !!el.closest(
    'section[data-hero], [data-hero], #hero, [data-reveal-hero-skip]',
  );

const isSkipped = (el: HTMLElement) =>
  !!el.closest("[data-no-reveal]");

const revealOne = (el: HTMLElement) => {
  const node = el as Marked;
  if (node[REVEAL_MARK]) return;
  node[REVEAL_MARK] = true;

  gsap.fromTo(
    el,
    { autoAlpha: 0, y: 24 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    },
  );
};

const revealGroup = (group: HTMLElement) => {
  const node = group as Marked;
  if (node[REVEAL_MARK]) return;
  node[REVEAL_MARK] = true;

  const children = Array.from(group.children).filter(
    (c): c is HTMLElement =>
      c instanceof HTMLElement && !c.hasAttribute("data-no-reveal"),
  );
  if (!children.length) return;

  gsap.fromTo(
    children,
    { autoAlpha: 0, y: 24 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: group,
        start: "top 85%",
        once: true,
      },
    },
  );
};

const scan = (root: ParentNode = document) => {
  // Explicit single-element opt-ins
  root
    .querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-group])")
    .forEach((el) => {
      if (isSkipped(el) || isHero(el)) return;
      revealOne(el);
    });

  // Staggered groups (card grids, feature rows, etc.)
  root
    .querySelectorAll<HTMLElement>("[data-reveal-group]")
    .forEach((el) => {
      if (isSkipped(el) || isHero(el)) return;
      revealGroup(el);
    });

  // Auto: section headings — <h2> inside <section> that isn't a hero.
  root
    .querySelectorAll<HTMLElement>("section h2")
    .forEach((el) => {
      if (isSkipped(el) || isHero(el)) return;
      revealOne(el);
    });
};

let started = false;
let scanTimer: number | null = null;

const scheduleScan = () => {
  if (scanTimer !== null) window.clearTimeout(scanTimer);
  scanTimer = window.setTimeout(() => {
    scanTimer = null;
    scan(document);
    ScrollTrigger.refresh();
  }, 120);
};

export const initScrollReveal = () => {
  if (typeof window === "undefined" || started) return;
  const w = window as typeof window & {
    __rivinityScrollRevealStarted?: boolean;
    __rivinityHistoryWrapped?: boolean;
  };
  if (w.__rivinityScrollRevealStarted) return;
  started = true;
  w.__rivinityScrollRevealStarted = true;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const kick = () => {
    scan(document);
    ScrollTrigger.refresh();

    // Handle SPA route changes without observing the full DOM subtree. A broad
    // MutationObserver can cascade with animation libraries on rich pages and
    // lock the preview; route/navigation hooks are enough for this reveal pass.
    if (!w.__rivinityHistoryWrapped) {
      const wrapHistory = (method: "pushState" | "replaceState") => {
        const original = window.history[method];
        window.history[method] = function (...args) {
          const result = original.apply(this, args);
          scheduleScan();
          return result;
        };
      };

      wrapHistory("pushState");
      wrapHistory("replaceState");
      window.addEventListener("popstate", scheduleScan);
      w.__rivinityHistoryWrapped = true;
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", kick, { once: true });
  } else {
    kick();
  }
};

export default initScrollReveal;