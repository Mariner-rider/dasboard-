import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import {
  LayoutTemplate,
  Code2,
  Database,
  HeartPulse,
  Boxes,
  HelpCircle,
  Volume2,
  Sparkles,
  MessageCircle,
  Users,
  Share2,
  Server,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import orbImage from "@/assets/rivinity-orb.webp";
type Chip = { icon: LucideIcon; label: string };

type Step = {
  id: string;
  tab: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  chips: Chip[];
  cta: { label: string; tail: string };
  variant: "cards" | "sphere" | "network";
};

const STEPS: Step[] = [
  {
    id: "usage",
    tab: "Usage",
    icon: LayoutTemplate,
    title: "All-in-one AI for enterprise",
    desc:
      "Connect to your business systems, understand your data and workflows, and activate agentic execution across every team.",
    chips: [
      { icon: HeartPulse, label: "Healthcare" },
      { icon: Boxes, label: "Tech Assistance" },
      { icon: HelpCircle, label: "Support" },
      { icon: Volume2, label: "Marketer" },
    ],
    cta: { label: "See", tail: "Uses" },
    variant: "cards",
  },
  {
    id: "technology",
    tab: "Technology",
    icon: Code2,
    title: "Alpha Technology",
    desc:
      "Create valuable AI agents and agentic workflows on the Rivinity Core — with confidence, provenance, and ongoing control.",
    chips: [
      { icon: Sparkles, label: "Multi-Agent" },
      { icon: Boxes, label: "Latest Model" },
      { icon: MessageCircle, label: "Dialog GPT" },
      { icon: Users, label: "Supervisor Agents" },
    ],
    cta: { label: "Explore", tail: "Tech" },
    variant: "sphere",
  },
  {
    id: "data",
    tab: "Data",
    icon: Database,
    title: "Enterprise data sources",
    desc:
      "Our design approach is ecosystem-agnostic — connect the data you already have, keep it governed, and unify it into one memory.",
    chips: [
      { icon: Share2, label: "SharePoint" },
      { icon: Server, label: "SAP" },
      { icon: MessageCircle, label: "Slack" },
      { icon: BookOpen, label: "Confluence" },
    ],
    cta: { label: "Start", tail: "Setup" },
    variant: "network",
  },
];

/* ------------------------------------------------------------------ */

const PlatformOrbit = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="platform"
      ref={ref}
      className="relative"
      style={{ height: reduce ? "auto" : "300vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="mx-auto max-w-7xl w-full px-5 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center mb-6 md:mb-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/50 mb-3">
              Platform Explorer
            </div>
            <h2 className="text-[24px] sm:text-[28px] lg:text-[40px] font-semibold tracking-tight leading-[1.1]">
              One platform.{" "}
              <span className="gradient-accent-text">Three surfaces of intelligence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)] gap-5 lg:gap-10 items-center">
            <TabsRail progress={scrollYProgress} />

            <div className="relative h-[520px] sm:h-[480px] md:h-[500px] rounded-3xl glass-strong border border-glass shadow-float overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none opacity-70"
                style={{
                  background:
                    "radial-gradient(120% 90% at 100% 50%, rgba(253,136,31,0.22), transparent 55%), radial-gradient(80% 80% at 100% 100%, rgba(191,167,248,0.22), transparent 60%)",
                }}
                aria-hidden
              />
              {STEPS.map((step, i) => (
                <OrbitPanel
                  key={step.id}
                  step={step}
                  index={i}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformOrbit;

/* ------------------------------------------------------------------ */

const TabItem = ({
  step,
  index,
  total,
  progress,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;
  const active = useTransform(progress, [start, mid, end], [0.35, 1, 0.35]);
  const barScale = useTransform(progress, [start, mid, end], [0, 1, 0]);
  const Icon = step.icon;

  return (
    <motion.div
      style={{ opacity: active }}
      className="relative shrink-0 lg:shrink flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl glass border border-glass"
    >
      <Icon className="w-4 h-4 text-foreground/75" strokeWidth={1.75} />
      <span className="text-[13px] font-medium tracking-tight whitespace-nowrap">
        {step.tab}
      </span>
      <motion.span
        style={{ scaleX: barScale, transformOrigin: "left center" }}
        className="absolute left-3.5 right-3.5 -bottom-[3px] h-[2px] rounded-full"
        aria-hidden
      >
        <span
          className="block w-full h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #FD881F, #F5A9D0 55%, #BFA7F8)",
          }}
        />
      </motion.span>
    </motion.div>
  );
};

const TabsRail = ({ progress }: { progress: MotionValue<number> }) => {
  return (
    <div className="flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-visible no-scrollbar">
      {STEPS.map((s, i) => (
        <TabItem
          key={s.id}
          step={s}
          index={i}
          total={STEPS.length}
          progress={progress}
        />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */

const OrbitPanel = ({
  step,
  index,
  progress,
}: {
  step: Step;
  index: number;
  progress: MotionValue<number>;
}) => {
  const total = STEPS.length;
  const start = index / total;
  const end = (index + 1) / total;

  const local = useTransform(progress, [start, end], [0, 1], { clamp: true });

  const arcU = useTransform(local, (v) => {
    if (v <= 0.28) {
      const t = v / 0.28;
      return 0.5 * (1 - Math.cos(t * Math.PI)) * 0.5 + 0;
    }
    if (v >= 0.72) {
      const t = (v - 0.72) / 0.28;
      return 0.5 + 0.5 * (1 - Math.cos(t * Math.PI)) * 0.5;
    }
    return 0.5;
  });

  const R = 55;
  const x = useTransform(arcU, (u) => `${R * (1 - Math.sin(u * Math.PI))}%`);
  const y = useTransform(arcU, (u) => `${R * Math.cos(u * Math.PI)}%`);
  const rotate = useTransform(arcU, (u) => (u - 0.5) * 18);
  const opacity = useTransform(
    local,
    [0, 0.14, 0.86, 1],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      style={{ x, y, rotate, opacity }}
      className="absolute inset-0 p-6 md:p-10 flex flex-col md:flex-row items-center gap-6"
    >
      <div className="flex-1 max-w-xl">
        <h3 className="text-[22px] md:text-[28px] font-semibold tracking-tight leading-[1.15]">
          {step.title}
        </h3>
        <p className="mt-3 text-[13.5px] md:text-[14.5px] text-foreground/65 leading-relaxed">
          {step.desc}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {step.chips.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-2 rounded-full glass border border-glass px-3 py-1.5 text-[12.5px] text-foreground/80"
            >
              <c.icon className="w-3.5 h-3.5 text-foreground/70" strokeWidth={1.75} />
              {c.label}
            </span>
          ))}
        </div>
        <a
          href="#modules"
          className="cta-pill mt-6 inline-flex"
        >
          {step.cta.label}{" "}
          <span className="gradient-accent-text ml-1">{step.cta.tail}</span>
        </a>
      </div>

      <div className="relative w-full md:w-[46%] h-[220px] md:h-full flex items-center justify-center">
        {step.variant === "cards" && <FloatingCards />}
        {step.variant === "sphere" && <RivinityOrb label="RIVINITY" />}
        {step.variant === "network" && <ConnectedOrb />}
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Visual variants                                                    */
/* ------------------------------------------------------------------ */

const FloatingCards = () => (
  <div className="relative w-full h-full">
    {[
      { top: "8%", left: "22%", label: "Banking Agent", delay: 0 },
      { top: "18%", left: "60%", label: "Banking Agent", delay: 0.15 },
      { top: "52%", left: "10%", label: "Trading Agent", delay: 0.3 },
      { top: "54%", left: "48%", label: "Support Agent", delay: 0.45 },
    ].map((c) => (
      <motion.div
        key={c.label + c.top}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: c.delay }}
        className="absolute w-[54%] rounded-2xl glass border border-glass px-3 py-2.5"
        style={{ top: c.top, left: c.left }}
      >
        <div className="flex items-center gap-2">
          <HeartPulse className="w-3.5 h-3.5 text-foreground/70" strokeWidth={1.75} />
          <span className="text-[12px] font-medium tracking-tight">{c.label}</span>
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-1 rounded-full bg-foreground/15 w-[80%]" />
          <div className="h-1 rounded-full bg-foreground/10 w-[55%]" />
        </div>
      </motion.div>
    ))}
  </div>
);

const RivinityOrb = ({ label }: { label: string }) => (
  <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px]">
    <div
      className="absolute inset-0 rounded-full blur-3xl opacity-70"
      style={{
        background:
          "radial-gradient(circle, rgba(253,136,31,0.55), transparent 65%)",
      }}
      aria-hidden
    />
    <img
      src={orbImage}
      alt=""
      className="relative w-full h-full object-contain drop-shadow-[0_20px_60px_rgba(191,167,248,0.35)]"
      loading="lazy"
    />
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <span className="text-white text-[20px] md:text-[26px] font-semibold tracking-[0.18em] mix-blend-screen drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
        {label}
      </span>
    </div>
  </div>
);

const ConnectedOrb = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute top-[8%] left-0 right-0 flex justify-around px-4">
      {["SP", "SF", "SL", "AZ", "GD", "DB"].map((n) => (
        <div
          key={n}
          className="w-8 h-8 rounded-full glass border border-glass flex items-center justify-center text-[10px] font-semibold text-foreground/70"
        >
          {n}
        </div>
      ))}
    </div>
    <svg
      viewBox="0 0 300 300"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    >
      <defs>
        <linearGradient id="orbit-line" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FD881F" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#BFA7F8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[30, 80, 130, 180, 230, 270].map((x, i) => (
        <path
          key={i}
          d={`M ${x} 20 Q ${x} 120 150 170`}
          stroke="url(#orbit-line)"
          strokeWidth="1"
          fill="none"
        />
      ))}
    </svg>
    <RivinityOrb label="" />
  </div>
);