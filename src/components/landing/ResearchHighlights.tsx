import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  FlaskConical,
  FileText,
  SlidersHorizontal,
  Rocket,
  ShieldCheck,
  Radar,
  BadgeCheck,
  Zap,
  Compass,
  RefreshCcw,
  Disc3,
  Sparkles,
  Puzzle,
  Check,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

/* ------------------------------------------------------------------ */
/*  Research — three stacked full-width cards, alternating reveals.    */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

const items = [
  {
    tag: "Model routing",
    date: "Jul 2026",
    title: "Learned routers beat static ensembles",
    metric: "−38% latency",
    body: "A small router network selects the right frontier model per turn, cutting median latency without accuracy loss.",
  },
  {
    tag: "Memory",
    date: "Jul 2026",
    title: "Scoped memory for multi-tool agents",
    metric: "+12% accuracy",
    body: "Per-workspace episodic memory reduces context bloat and improves long-horizon task completion.",
  },
  {
    tag: "Evaluation",
    date: "Jul 2026",
    title: "Trace-first agent evaluation",
    metric: "3.4× reproducibility",
    body: "Grading agents against replayable traces surfaces regressions before they reach production.",
  },
];

type Direction = "right" | "left" | "up";

const RevealVisual = ({
  direction,
  children,
}: {
  direction: Direction;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const from = reduce
    ? { opacity: 0 }
    : direction === "right"
      ? { x: 120, opacity: 0, scale: 0.96 }
      : direction === "left"
        ? { x: -120, opacity: 0, scale: 0.96 }
        : { y: 120, opacity: 0, scale: 0.96 };
  return (
    <motion.div
      ref={ref}
      initial={from}
      animate={inView ? { x: 0, y: 0, opacity: 1, scale: 1 } : from}
      transition={{ duration: 1, ease: EASE, delay: 0.1 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

const Bullets = ({ items: bs }: { items: string[] }) => (
  <motion.ul
    className="mt-6 space-y-2.5 max-w-md"
    initial="h"
    whileInView="s"
    viewport={{ once: true, amount: 0.35 }}
    variants={{ h: {}, s: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
  >
    {bs.map((b) => (
      <motion.li
        key={b}
        variants={{
          h: { opacity: 0, x: -10 },
          s: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
        }}
        whileHover={{ x: 2 }}
        className="flex items-center gap-3 rounded-xl glass border border-glass px-3.5 py-2.5"
      >
        <span
          className="inline-flex w-5 h-5 rounded-full items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg,#FD881F,#F5A9D0 55%,#BFA7F8)" }}
        >
          <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
        </span>
        <span className="text-[13px] font-medium tracking-tight">{b}</span>
      </motion.li>
    ))}
  </motion.ul>
);

const CopyBlock = ({
  eyebrowIcon: EyebrowIcon,
  eyebrow,
  title,
  date,
  body,
  metric,
  bullets,
}: {
  eyebrowIcon: LucideIcon;
  eyebrow: string;
  title: string;
  date: string;
  body: string;
  metric: string;
  bullets: string[];
}) => (
  <div className="flex flex-col">
    <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/55 mb-4">
      <EyebrowIcon className="w-3.5 h-3.5" strokeWidth={1.75} />
      {eyebrow}
    </div>
    <h3 className="text-[26px] sm:text-[30px] md:text-[36px] font-semibold tracking-tight leading-[1.1]">
      {title}
    </h3>
    <p className="mt-3 text-[13.5px] md:text-[14.5px] text-foreground/65 leading-relaxed max-w-md">
      {body}
    </p>
    <Bullets items={bullets} />
    <div className="mt-6 flex items-center gap-4 flex-wrap">
      <span className="text-[13px] font-semibold gradient-accent-text">{metric}</span>
      <span className="text-[11px] font-medium text-foreground/40">{date}</span>
      <Link
        to="/research"
        className="text-[12.5px] font-medium text-foreground/70 hover:text-foreground inline-flex items-center gap-1"
      >
        Read paper <ArrowUpRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  </div>
);

const CardShell = ({ children }: { children: React.ReactNode }) => (
  <div className="relative rounded-2xl md:rounded-3xl glass-strong border border-glass shadow-float overflow-hidden">
    <div
      className="absolute inset-0 pointer-events-none opacity-80"
      style={{
        background:
          "radial-gradient(70% 60% at 0% 0%, rgba(253,136,31,0.14), transparent 60%), radial-gradient(70% 60% at 100% 100%, rgba(191,167,248,0.14), transparent 60%)",
      }}
      aria-hidden
    />
    <div className="relative p-5 sm:p-6 md:p-8 lg:p-10">{children}</div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Visual 1 — Prompt / Automation stepper                             */
/* ------------------------------------------------------------------ */

const Visual1 = () => {
  const steps = [
    { icon: FileText, name: "Details", sub: "Frame the training turn" },
    { icon: SlidersHorizontal, name: "Configure", sub: "Design routing + prompt", active: true },
    { icon: Rocket, name: "Launch Agent", sub: "Publish to workspaces" },
  ];
  return (
    <div className="relative rounded-2xl glass border border-glass overflow-hidden min-h-[340px] md:min-h-[400px] p-5">
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{ background: "radial-gradient(60% 60% at 100% 0%, rgba(253,136,31,0.22), transparent 60%)" }}
        aria-hidden
      />
      <div className="relative">
        <div className="mb-4">
          <div className="text-[13px] font-semibold tracking-tight">Prompt Agent</div>
          <div className="text-[10.5px] text-foreground/55">Preview and Email</div>
        </div>
        <motion.ul
          className="space-y-2.5"
          initial="h"
          whileInView="s"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ h: {}, s: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } } }}
        >
          {steps.map((s) => (
            <motion.li
              key={s.name}
              variants={{
                h: { opacity: 0, x: 24 },
                s: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
              }}
              whileHover={{ x: -2 }}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-3 border ${
                s.active
                  ? "border-white/25"
                  : "border-glass glass"
              }`}
              style={
                s.active
                  ? {
                      background:
                        "linear-gradient(135deg, rgba(253,136,31,0.18), rgba(245,169,208,0.14) 55%, rgba(191,167,248,0.18))",
                      boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.15) inset, 0 12px 30px -18px rgba(253,136,31,0.45)",
                    }
                  : undefined
              }
            >
              <span className="inline-flex w-8 h-8 rounded-lg items-center justify-center glass border border-glass shrink-0">
                <s.icon className="w-4 h-4 text-foreground/80" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <div className="text-[12.5px] font-semibold tracking-tight truncate">{s.name}</div>
                <div className="text-[10.5px] text-foreground/55 truncate">{s.sub}</div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Visual 2 — Multi-layer glowing panels                              */
/* ------------------------------------------------------------------ */

const Visual2 = () => (
  <div className="relative rounded-2xl glass border border-glass overflow-hidden min-h-[340px] md:min-h-[400px]">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(60% 70% at 30% 55%, rgba(253,136,31,0.30), transparent 65%), radial-gradient(50% 60% at 65% 45%, rgba(245,169,208,0.28), transparent 65%), radial-gradient(45% 55% at 80% 60%, rgba(191,167,248,0.30), transparent 65%)",
      }}
      aria-hidden
    />
    {/* Three stacked panels — each animates its own opacity/skew */}
    <div className="relative h-full flex items-center justify-center py-10">
      <div className="relative w-[76%] h-[220px] md:h-[260px]" style={{ perspective: "1200px" }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40 + i * 20, rotateY: -22 }}
            whileInView={{ opacity: 0.85 - i * 0.15, x: 0, rotateY: -22 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.15 }}
            className="absolute top-0 rounded-lg overflow-hidden"
            style={{
              left: `${i * 22}%`,
              width: "58%",
              height: "100%",
              transformStyle: "preserve-3d",
              background:
                "linear-gradient(135deg, rgba(253,136,31,0.55) 0%, rgba(245,169,208,0.55) 45%, rgba(191,167,248,0.55) 100%)",
              boxShadow:
                "0 20px 60px -20px rgba(253,136,31,0.35), 0 0 0 1px rgba(255,255,255,0.10) inset",
              filter: `blur(${i * 0.2}px)`,
            }}
          >
            <div
              className="absolute inset-0 mix-blend-overlay"
              style={{
                background:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>\")",
              }}
              aria-hidden
            />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Visual 3 — Vertical beam + connector icon grid                     */
/* ------------------------------------------------------------------ */

const ICONS: LucideIcon[] = [Zap, Compass, RefreshCcw, Disc3, Sparkles, Puzzle];

const Visual3 = () => (
  <div className="relative rounded-2xl glass border border-glass overflow-hidden min-h-[340px] md:min-h-[400px] p-5">
    {/* Vertical beam */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute left-[18%] top-0 bottom-0 w-[2px] origin-top"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #FD881F 20%, #F5A9D0 55%, #BFA7F8 85%, transparent)",
          boxShadow: "0 0 24px 4px rgba(253,136,31,0.55)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(35% 60% at 18% 60%, rgba(253,136,31,0.28), transparent 70%)",
        }}
      />
    </div>
    <div className="relative grid grid-cols-3 gap-3 h-full content-center pl-[30%]">
      {ICONS.map((Ic, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.07 }}
          whileHover={{ y: -3 }}
          className="aspect-square rounded-xl flex items-center justify-center glass border border-glass"
          style={{
            background:
              "linear-gradient(135deg, rgba(253,136,31,0.12), rgba(245,169,208,0.08) 55%, rgba(191,167,248,0.12))",
            boxShadow: "0 10px 30px -18px rgba(253,136,31,0.45), 0 0 0 1px rgba(255,255,255,0.06) inset",
          }}
        >
          <Ic className="w-5 h-5 text-foreground/85" strokeWidth={1.75} />
        </motion.div>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */

const ResearchHighlights = () => {
  const bullets = [
    ["Adaptive routing per turn", "Latency-aware fallbacks", "Zero accuracy regression"],
    ["Workspace-scoped recall", "Deterministic replays", "Long-horizon completion"],
    ["Replayable agent traces", "Regression diffing", "Continuous grading"],
  ];
  const eyebrows: [LucideIcon, string][] = [
    [Radar, "Model Routing"],
    [ShieldCheck, "Scoped Memory"],
    [BadgeCheck, "Evaluation"],
  ];
  const visuals = [<Visual1 />, <Visual2 />, <Visual3 />];
  const dirs: Direction[] = ["right", "left", "up"];

  return (
    <section id="research" className="mx-auto max-w-7xl px-5 lg:px-8 py-16 lg:py-24">
      <ScrollReveal className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-4 md:gap-10 items-end mb-8 md:mb-12">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/50 mb-4">
            <FlaskConical className="w-3.5 h-3.5" strokeWidth={1.75} />
            Research
          </div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[52px] font-semibold tracking-tight leading-[1.05]">
            What we've learned <span className="gradient-accent-text">building the OS.</span>
          </h2>
          <p className="mt-4 text-[14px] text-foreground/60 leading-relaxed max-w-lg">
            Notes, playbooks, and papers from the team building Rivinity.
          </p>
        </div>
        <Link
          to="/research"
          className="inline-flex text-[13px] font-medium items-center gap-1 hover:underline text-foreground/75"
        >
          All papers <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </ScrollReveal>

      <div className="space-y-6 md:space-y-8">
        {items.map((it, i) => {
          const [Icon, label] = eyebrows[i];
          return (
            <CardShell key={it.title}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                <CopyBlock
                  eyebrowIcon={Icon}
                  eyebrow={label}
                  title={it.title}
                  date={it.date}
                  body={it.body}
                  metric={it.metric}
                  bullets={bullets[i]}
                />
                <RevealVisual direction={dirs[i]}>{visuals[i]}</RevealVisual>
              </div>
            </CardShell>
          );
        })}
      </div>
    </section>
  );
};

export default ResearchHighlights;