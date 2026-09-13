import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  Check,
  MonitorSmartphone,
  HeartPulse,
  Megaphone,
  ShoppingCart,
  Code2,
  ShieldCheck,
  Sparkles,
  Briefcase,
  FileText,
  Users,
  Landmark,
  ArrowRight,
  ArrowRightLeft,
  Wallet,
  UserCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

/* ------------------------------------------------------------------ */
/*  Multiple Products — three stacked cards with directional reveals   */
/*  Card 1: content L · graphic R  → graphic slides in from RIGHT      */
/*  Card 2: content L · graphic R  → graphic slides in from LEFT       */
/*  Card 3: content L · graphic R  → graphic rises from BOTTOM         */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

type Bullet = string;
type CardCopy = {
  title: string;
  desc: string;
  bullets: Bullet[];
};

const CARDS: CardCopy[] = [
  {
    title: "Process Automation",
    desc: "Streamline complex workflows with intelligent AI agents that enhance efficiency, accuracy, and speed across your enterprise.",
    bullets: [
      "Automate Tasks — Reduce manual effort",
      "Optimize Workflows — Boost productivity",
      "Stay Compliant — Ensure accuracy",
    ],
  },
  {
    title: "Fintech AI",
    desc: "Transform financial operations with intelligent automation, real-time insights, and secure decision-making powered by AI.",
    bullets: [
      "Smart Risk Assessment — Safer decisions",
      "Automated Compliance — Fewer errors",
      "Faster Transactions — Quicker processing",
    ],
  },
  {
    title: "HR & Recruitment AI",
    desc: "Streamline hiring, improve candidate experience, and empower teams with intelligent automation.",
    bullets: [
      "Smart Screening — Identify top talent faster",
      "Automated Hiring — Less manual work",
      "Improved Experience — Personalized hiring",
    ],
  },
];

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: HeartPulse,   title: "Healthcare",   body: "Improve patient care with intelligent automation." },
  { icon: Megaphone,    title: "Marketing",    body: "Optimize campaigns with intelligent automation." },
  { icon: ShoppingCart, title: "Ecommerce",    body: "Accelerate merchandising and improve complex workflows." },
  { icon: Code2,        title: "Development",  body: "Ship faster with agents that co-author, review, and test." },
];

/* ------------------------------------------------------------------ */

const Checklist = ({ items }: { items: Bullet[] }) => (
  <motion.ul
    className="mt-6 space-y-2.5 max-w-md"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.4 }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
    }}
  >
    {items.map((b) => (
      <motion.li
        key={b}
        variants={{
          hidden: { opacity: 0, x: -10 },
          show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
        }}
        whileHover={{ x: 2 }}
        className="flex items-center gap-3 rounded-xl glass border border-glass px-3.5 py-2.5 cursor-default"
      >
        <span
          className="inline-flex w-5 h-5 rounded-full items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #FD881F, #F5A9D0 55%, #BFA7F8)" }}
        >
          <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
        </span>
        <span className="text-[13px] font-medium tracking-tight">{b}</span>
      </motion.li>
    ))}
  </motion.ul>
);

const CopyBlock = ({ title, desc, bullets }: CardCopy) => (
  <div>
    <h3 className="text-[22px] sm:text-[26px] md:text-[32px] font-semibold tracking-tight leading-[1.15]">
      {title}
    </h3>
    <p className="mt-3 text-[13px] md:text-[14.5px] text-foreground/65 leading-relaxed max-w-md">
      {desc}
    </p>
    <Checklist items={bullets} />
  </div>
);

/* ------------------------------------------------------------------ */

type Direction = "right" | "left" | "up";

const RevealGraphic = ({
  direction,
  children,
}: {
  direction: Direction;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();

  const from =
    reduce
      ? { opacity: 0 }
      : direction === "right"
        ? { x: 140, opacity: 0, rotate: 2, scale: 0.95 }
        : direction === "left"
          ? { x: -140, opacity: 0, rotate: -2, scale: 0.95 }
          : { y: 160, opacity: 0, scale: 0.94 };

  return (
    <motion.div
      ref={ref}
      initial={from}
      animate={inView ? { x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 } : from}
      transition={{ duration: 1.05, ease: EASE, delay: 0.1 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

const CardShell = ({ children }: { children: React.ReactNode }) => (
  <div className="relative rounded-2xl md:rounded-3xl glass-strong border border-glass shadow-float overflow-hidden">
    <div
      className="absolute inset-0 pointer-events-none opacity-80"
      style={{
        background:
          "radial-gradient(70% 60% at 0% 0%, rgba(253,136,31,0.16), transparent 60%), radial-gradient(70% 60% at 100% 100%, rgba(191,167,248,0.16), transparent 60%)",
      }}
      aria-hidden
    />
    <div className="relative p-5 sm:p-6 md:p-8 lg:p-10">{children}</div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Graphic 1 — Agent grid                                             */
/* ------------------------------------------------------------------ */

const AGENTS: { icon: LucideIcon; name: string; desc: string }[] = [
  { icon: FileText, name: "Blog generator", desc: "Assists in writing blogs and long-form docs." },
  { icon: Landmark, name: "Banking Agent", desc: "Manages and executes routine banking tasks." },
  { icon: ShieldCheck, name: "Insurance Agent", desc: "Helps insurance teams execute claims flawlessly." },
  { icon: Sparkles, name: "Summarisation", desc: "Summarises any text with domain-aware nuance." },
  { icon: Users, name: "Recruitment Agent", desc: "Runs the full candidate pipeline end to end." },
  { icon: Briefcase, name: "Project manager", desc: "Plans, tracks and unblocks work across teams." },
];

const GraphicAutomation = () => (
  <div className="relative rounded-2xl glass border border-glass overflow-hidden min-h-[380px] md:min-h-[440px]">
    <div
      className="absolute inset-0 opacity-60 pointer-events-none"
      style={{ background: "radial-gradient(60% 60% at 100% 100%, rgba(191,167,248,0.16), transparent 60%)" }}
      aria-hidden
    />
    <div className="relative grid grid-cols-[120px_minmax(0,1fr)] sm:grid-cols-[140px_minmax(0,1fr)] h-full">
      <aside className="border-r border-glass/70 p-3 flex flex-col gap-3 min-w-0">
        <div className="text-[11px] font-semibold tracking-[0.28em] text-foreground/80">RIVINITY</div>
        <ul className="mt-1 space-y-2">
          {["Agent Process", "Select Payment", "Trigger", "Configuration", "Output"].map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              {i === 0 ? (
                <span className="inline-flex items-center gap-2 rounded-md px-2 py-1 glass border border-glass w-full">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#FD881F" }} />
                  <span className="text-[10.5px] font-medium truncate">{s}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-2 py-1 w-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/25 shrink-0" />
                  <span className="text-[10.5px] text-foreground/55 truncate">{s}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-auto h-1 w-10 rounded-full bg-foreground/15" />
      </aside>
      <div className="p-4 flex flex-col min-w-0">
        <div className="mb-3">
          <div className="text-[13px] font-semibold tracking-tight">Select Agent</div>
          <div className="text-[10.5px] text-foreground/55 mt-0.5">Search and select an agent that fits your purpose.</div>
        </div>
        <motion.div
          className="grid grid-cols-2 gap-2.5 flex-1"
          initial="h"
          whileInView="s"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ h: {}, s: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } } }}
        >
          {AGENTS.map((a) => (
            <motion.div
              key={a.name}
              variants={{ h: { opacity: 0, y: 10 }, s: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }}
              whileHover={{ y: -2 }}
              className="rounded-lg glass border border-glass p-2.5 min-w-0"
            >
              <div className="flex items-center gap-1.5">
                <a.icon className="w-3 h-3 text-foreground/80 shrink-0" strokeWidth={1.75} />
                <span className="text-[10.5px] font-semibold truncate">{a.name}</span>
              </div>
              <p className="mt-1 text-[9.5px] text-foreground/55 leading-snug line-clamp-3">{a.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-3 flex items-center gap-2 rounded-full glass border border-glass px-3 h-9 min-w-0">
          <span className="text-[10.5px] font-medium text-foreground/85 truncate">AI for Recruiter</span>
          <span className="w-px h-4 bg-foreground/15 shrink-0" />
          <span className="text-[10.5px] text-foreground/45 truncate">How can I</span>
          <span className="ml-auto w-1.5 h-4 bg-foreground/60 rounded-sm animate-pulse shrink-0" />
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Graphic 2 — Banking flow tree                                      */
/* ------------------------------------------------------------------ */

const FlowNode = ({
  title,
  sub,
  tone = "neutral",
  delay = 0,
}: { title: string; sub: string; tone?: "neutral" | "orange" | "purple"; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, ease: EASE, delay }}
    className="relative rounded-lg glass border border-glass p-2 min-w-[110px]"
    style={
      tone === "orange"
        ? { boxShadow: "0 0 0 1px rgba(253,136,31,0.35), 0 8px 24px -12px rgba(253,136,31,0.4)" }
        : tone === "purple"
          ? { boxShadow: "0 0 0 1px rgba(191,167,248,0.35), 0 8px 24px -12px rgba(191,167,248,0.4)" }
          : undefined
    }
  >
    <div className="flex items-center gap-1.5">
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: tone === "orange" ? "#FD881F" : tone === "purple" ? "#BFA7F8" : "rgba(255,255,255,0.4)" }}
      />
      <span className="text-[10px] font-semibold truncate">{title}</span>
    </div>
    <div className="mt-1 text-[9px] text-foreground/55 truncate">{sub}</div>
  </motion.div>
);

const GraphicBanking = () => (
  <div className="relative rounded-2xl glass border border-glass overflow-hidden min-h-[380px] md:min-h-[440px]">
    <div
      className="absolute inset-0 opacity-60 pointer-events-none"
      style={{ background: "radial-gradient(60% 60% at 0% 0%, rgba(253,136,31,0.14), transparent 60%)" }}
      aria-hidden
    />
    <div className="relative grid grid-cols-[130px_minmax(0,1fr)] h-full">
      <aside className="border-r border-glass/70 p-3 flex flex-col gap-3 min-w-0">
        <div className="text-[11px] font-semibold tracking-[0.28em] text-foreground/80">RIVINITY</div>
        <div className="flex gap-1 rounded-full glass border border-glass p-1">
          <span className="flex-1 text-center text-[10px] py-1 rounded-full text-foreground/60">Index</span>
          <span
            className="flex-1 text-center text-[10px] py-1 rounded-full text-white font-semibold"
            style={{ background: "linear-gradient(135deg,#FD881F,#F5A9D0 55%,#BFA7F8)" }}
          >Index</span>
        </div>
        <ul className="space-y-2 mt-1">
          {[
            { s: "Transfer money", on: true },
            { s: "Choose Payee", on: false },
            { s: "Confirmation", on: false },
          ].map((x) => (
            <li key={x.s} className="flex items-center gap-2 px-1">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: x.on ? "#FD881F" : "rgba(255,255,255,0.25)" }}
              />
              <span className={`text-[10.5px] truncate ${x.on ? "font-semibold" : "text-foreground/55"}`}>{x.s}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto h-1 w-10 rounded-full bg-foreground/15" />
      </aside>
      <div className="relative p-4 min-w-0">
        <div className="text-[10.5px] text-foreground/55 mb-3 truncate">Banking Agent / Money Transfer and Balance Check</div>
        <div className="relative">
          <div className="flex items-start gap-3 flex-wrap">
            <FlowNode title="Transfer Money" sub="action · transfer_fund" tone="orange" delay={0.15} />
            <ArrowRight className="w-3 h-3 text-foreground/40 mt-3 shrink-0" />
            <FlowNode title="Get Payee List" sub="action · get_payee_list" delay={0.3} />
            <ArrowRight className="w-3 h-3 text-foreground/40 mt-3 shrink-0" />
            <div className="flex flex-col gap-2">
              <FlowNode title="Choose Payee" sub="Existing payee" tone="purple" delay={0.45} />
              <FlowNode title="Select Payee" sub="action · transfer_fund" delay={0.55} />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <FlowNode title="Save Payee" sub="action · save_payee" delay={0.7} />
            <ArrowRight className="w-3 h-3 text-foreground/40 shrink-0" />
            <FlowNode title="Check Compute" sub="action · check_compute" tone="purple" delay={0.85} />
          </div>
          <div className="mt-6 flex items-center gap-2 text-[10px] text-foreground/55">
            <ArrowRightLeft className="w-3 h-3 text-foreground/50" />
            <span>Confirm from Backend</span>
            <Wallet className="w-3 h-3 text-foreground/50 ml-2" />
            <span>Balance verified</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Graphic 3 — Recruitment dashboard                                  */
/* ------------------------------------------------------------------ */

const GraphicRecruitment = () => (
  <div className="relative rounded-2xl glass border border-glass overflow-hidden min-h-[380px] md:min-h-[440px]">
    <div
      className="absolute inset-0 opacity-60 pointer-events-none"
      style={{ background: "radial-gradient(60% 60% at 50% 100%, rgba(245,169,208,0.16), transparent 60%)" }}
      aria-hidden
    />
    <div className="relative grid grid-cols-[130px_minmax(0,1fr)] h-full">
      <aside className="border-r border-glass/70 p-3 flex flex-col gap-3 min-w-0">
        <div className="text-[11px] font-semibold tracking-[0.28em] text-foreground/80">RIVINITY</div>
        <div className="flex gap-1 rounded-full glass border border-glass p-1">
          <span className="flex-1 text-center text-[10px] py-1 rounded-full text-foreground/60">Admin</span>
          <span
            className="flex-1 text-center text-[10px] py-1 rounded-full text-white font-semibold"
            style={{ background: "linear-gradient(135deg,#FD881F,#F5A9D0 55%,#BFA7F8)" }}
          >Personnel</span>
        </div>
        <ul className="space-y-2 mt-1">
          {[
            { s: "Profiling", on: true },
            { s: "Onboarding", on: false },
            { s: "Rejections", on: false },
          ].map((x) => (
            <li key={x.s} className="flex items-center gap-2 px-1">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: x.on ? "#FD881F" : "rgba(255,255,255,0.25)" }} />
              <span className={`text-[10.5px] truncate ${x.on ? "font-semibold" : "text-foreground/55"}`}>{x.s}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto h-1 w-10 rounded-full bg-foreground/15" />
      </aside>
      <div className="relative p-4 min-w-0 flex flex-col">
        <div className="flex justify-end gap-2 mb-3 flex-wrap">
          <span className="text-[10px] px-2.5 py-1 rounded-full glass border border-glass">Recruitment Metrics</span>
          <span
            className="text-[10px] px-2.5 py-1 rounded-full text-white font-semibold"
            style={{ background: "linear-gradient(135deg,#FD881F,#F5A9D0 55%,#BFA7F8)" }}
          >
            Candidate and Jobs
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            className="rounded-xl glass border border-glass p-3"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-semibold">
              <ShieldCheck className="w-3 h-3" style={{ color: "#FD881F" }} />
              Important alert
            </div>
            <ul className="mt-2 space-y-1 text-[9.5px] text-foreground/60">
              <li>Candidate approval still pending from Nikita</li>
              <li>Candidate offer rejected</li>
              <li>3 more new profiles found for design</li>
            </ul>
            <div className="mt-2 text-[9.5px] font-semibold text-foreground/80">View All →</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
            className="rounded-xl glass border border-glass p-3 relative overflow-hidden"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-semibold">
              <UserCheck className="w-3 h-3" style={{ color: "#BFA7F8" }} />
              Jackson · Product Design
            </div>
            <p className="mt-1 text-[9.5px] text-foreground/60 leading-snug">
              Accepted the offer letter. Joining 27th.
            </p>
            <span
              className="mt-2 inline-block text-[9.5px] px-2 py-0.5 rounded-full text-white font-semibold"
              style={{ background: "linear-gradient(135deg,#FD881F,#F5A9D0 55%,#BFA7F8)" }}
            >
              Onboard Now
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
            className="rounded-xl glass border border-glass p-3 sm:col-span-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold">
                <TrendingUp className="w-3 h-3" style={{ color: "#FD881F" }} />
                Recent Hires
              </div>
              <div className="text-[11px] font-bold" style={{ color: "#FD881F" }}>+42%</div>
            </div>
            <svg viewBox="0 0 200 40" className="w-full mt-2 h-8">
              <defs>
                <linearGradient id="rec-spark" x1="0" x2="1">
                  <stop offset="0%" stopColor="#FD881F" />
                  <stop offset="55%" stopColor="#F5A9D0" />
                  <stop offset="100%" stopColor="#BFA7F8" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0 30 C 30 28, 45 10, 70 18 S 120 34, 150 12 S 190 8, 200 14"
                fill="none" stroke="url(#rec-spark)" strokeWidth="2" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
              />
            </svg>
          </motion.div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-full glass border border-glass px-3 h-9 min-w-0">
          <span className="text-[10.5px] font-medium text-foreground/85 truncate">AI for Recruiter</span>
          <span className="w-px h-4 bg-foreground/15 shrink-0" />
          <span className="text-[10.5px] text-foreground/45 truncate">How can I</span>
          <span className="ml-auto w-1.5 h-4 bg-foreground/60 rounded-sm animate-pulse shrink-0" />
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */

const MultipleProducts = () => {
  return (
    <section id="discover" className="mx-auto max-w-7xl px-5 lg:px-8 py-16 lg:py-24">
      <ScrollReveal className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-4 md:gap-10 items-end mb-8 md:mb-12">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/50 mb-4">
            <MonitorSmartphone className="w-3.5 h-3.5" strokeWidth={1.75} />
            Products
          </div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[52px] font-semibold tracking-tight leading-[1.05]">
            Multiple <span className="gradient-accent-text">Products</span>
          </h2>
        </div>
        <p className="text-[13px] md:text-[14px] text-foreground/60 leading-relaxed max-w-xs md:text-right">
          Covers all major verticals in the tech industry with top intelligence.
        </p>
      </ScrollReveal>

      <div className="space-y-6 md:space-y-8">
        <CardShell>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            <CopyBlock {...CARDS[0]} />
            <RevealGraphic direction="right">
              <GraphicAutomation />
            </RevealGraphic>
          </div>
        </CardShell>

        <CardShell>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            <CopyBlock {...CARDS[1]} />
            <RevealGraphic direction="left">
              <GraphicBanking />
            </RevealGraphic>
          </div>
        </CardShell>

        <CardShell>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-6 lg:gap-10 items-center">
            <CopyBlock {...CARDS[2]} />
            <RevealGraphic direction="up">
              <GraphicRecruitment />
            </RevealGraphic>
          </div>
        </CardShell>
      </div>

      <div data-reveal-group className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {FEATURES.map((f) => (
          <motion.div key={f.title} whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: EASE }} className="flex flex-col">
            <span
              className="inline-flex w-11 h-11 rounded-xl items-center justify-center mb-3 glass border border-glass"
              style={{
                background:
                  "linear-gradient(135deg, rgba(253,136,31,0.18), rgba(245,169,208,0.14) 55%, rgba(191,167,248,0.18))",
              }}
            >
              <f.icon className="w-5 h-5 text-foreground/85" strokeWidth={1.75} />
            </span>
            <div className="text-[15px] font-semibold tracking-tight">{f.title}</div>
            <p className="mt-1 text-[12.5px] text-foreground/60 leading-relaxed max-w-[220px]">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MultipleProducts;