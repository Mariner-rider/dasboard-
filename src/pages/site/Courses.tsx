import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Search as SearchIcon,
  MessageSquare,
  Wrench,
  Bot,
  Mic,
  Image as ImageIcon,
  GraduationCap,
  Shield,
  Sparkles,
  Code2,
  Compass,
  Clock,
} from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import Section from "@/components/marketing/Section";
import CtaSection from "@/components/marketing/CtaSection";
import MagneticButton from "@/components/landing/MagneticButton";
import { Input } from "@/components/ui/input";

type Level = "Beginner" | "Intermediate" | "Advanced";
type Course = {
  category: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  level: Level;
  duration: string;
  lessons: number;
};

const courses: Course[] = [
  // AI Chat
  {
    category: "AI Chat",
    icon: MessageSquare,
    title: "Prompting fundamentals on Rivinity",
    summary: "Learn the mental model behind Rivinity chat: context windows, tool routing, and structured outputs.",
    level: "Beginner",
    duration: "1h 20m",
    lessons: 8,
  },
  {
    category: "AI Chat",
    icon: MessageSquare,
    title: "Advanced conversation design",
    summary: "Multi-turn flows, memory scoping, and evals for production chat experiences.",
    level: "Advanced",
    duration: "2h 45m",
    lessons: 12,
  },
  {
    category: "AI Chat",
    icon: Sparkles,
    title: "Working with markdown & code responses",
    summary: "Render structured answers, tables, and syntax-highlighted code inside your chat surfaces.",
    level: "Intermediate",
    duration: "45m",
    lessons: 5,
  },

  // App Builder
  {
    category: "App Builder",
    icon: Wrench,
    title: "Ship your first app in 30 minutes",
    summary: "From prompt to preview: build, iterate, and deploy a working app on the Rivinity canvas.",
    level: "Beginner",
    duration: "30m",
    lessons: 6,
  },
  {
    category: "App Builder",
    icon: Code2,
    title: "Component patterns and design tokens",
    summary: "Reuse a semantic token system, animate with GSAP, and keep your app on-brand at scale.",
    level: "Intermediate",
    duration: "1h 50m",
    lessons: 10,
  },
  {
    category: "App Builder",
    icon: Wrench,
    title: "Production hardening & performance",
    summary: "Bundle budgets, LCP tuning, and observability for apps built on Rivinity.",
    level: "Advanced",
    duration: "2h 10m",
    lessons: 9,
  },

  // Agent Playground
  {
    category: "Agent Playground",
    icon: Bot,
    title: "Building your first autonomous agent",
    summary: "Tools, plans, and critics — assemble a working agent that ships a real task end-to-end.",
    level: "Beginner",
    duration: "1h 15m",
    lessons: 7,
  },
  {
    category: "Agent Playground",
    icon: Bot,
    title: "Multi-agent orchestration",
    summary: "Coordinate specialist agents with shared memory, evaluators, and safe hand-offs.",
    level: "Advanced",
    duration: "3h 05m",
    lessons: 14,
  },

  // Audio Lab
  {
    category: "Audio Lab",
    icon: Mic,
    title: "TTS, STT, and voice cloning basics",
    summary: "Generate, transcribe, and clone with the production-grade Audio Lab modules.",
    level: "Beginner",
    duration: "55m",
    lessons: 6,
  },

  // Image / Creative
  {
    category: "Creative Studios",
    icon: ImageIcon,
    title: "Image generation & enhancement workflows",
    summary: "Prompt, edit, and upscale — a repeatable pipeline for design and marketing teams.",
    level: "Intermediate",
    duration: "1h 25m",
    lessons: 8,
  },

  // Governance / Enterprise
  {
    category: "Governance",
    icon: Shield,
    title: "Enterprise governance & SSO",
    summary: "Configure SSO, roles, and audit trails to roll Rivinity out safely across your org.",
    level: "Intermediate",
    duration: "1h 40m",
    lessons: 9,
  },
  {
    category: "Governance",
    icon: Shield,
    title: "Data residency, retention & compliance",
    summary: "Hands-on with the controls that meet SOC 2, ISO 27001, and GDPR expectations.",
    level: "Advanced",
    duration: "2h 00m",
    lessons: 10,
  },
];

const categories = [
  { key: "All", icon: Compass },
  { key: "AI Chat", icon: MessageSquare },
  { key: "App Builder", icon: Wrench },
  { key: "Agent Playground", icon: Bot },
  { key: "Audio Lab", icon: Mic },
  { key: "Creative Studios", icon: ImageIcon },
  { key: "Governance", icon: Shield },
] as const;

const levelClasses: Record<Level, string> = {
  Beginner:
    "bg-[hsl(var(--accent-sky)/0.12)] text-[hsl(var(--accent-sky))] border-[hsl(var(--accent-sky)/0.25)]",
  Intermediate:
    "bg-foreground/[0.06] text-foreground/80 border-foreground/15",
  Advanced:
    "bg-foreground/[0.10] text-foreground/90 border-foreground/25",
};

export default function Courses() {
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const inCat = active === "All" || c.category === active;
      const inQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);
      return inCat && inQuery;
    });
  }, [active, query]);

  // Group by category for organized sections when viewing "All"
  const grouped = useMemo(() => {
    const map = new Map<string, Course[]>();
    for (const c of visible) {
      const list = map.get(c.category) ?? [];
      list.push(c);
      map.set(c.category, list);
    }
    return Array.from(map.entries());
  }, [visible]);

  return (
    <MarketingLayout
      title="Rivinity Courses — Learn every Rivinity tool"
      description="A course library for Rivinity's tools: AI Chat, App Builder, Agent Playground, Audio Lab, and more. Filter by category, level, and duration."
    >
      <PageHero
        eyebrow="Rivinity Courses"
        title="Master every tool in the"
        gradientTail="Intelligence Operating System."
        subtitle="Short, focused courses on the modules you use every day — AI Chat, App Builder, Agent Playground, Audio Lab, and more."
        actions={
          <>
            <div className="relative w-full sm:w-96">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses…"
                className="pl-9 h-11"
              />
            </div>
            <MagneticButton href="/app" className="cta-pill">
              Start learning <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </>
        }
      />

      <Section
        eyebrow="Library"
        title={<>Courses, <span className="gradient-accent-text">by tool.</span></>}
        kicker="Pick a Rivinity tool to narrow the library. Every course is hands-on and forkable."
      >
        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => {
            const isActive = active === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={
                  "inline-flex items-center gap-1.5 h-9 px-4 rounded-full border text-[12.5px] font-medium transition-colors " +
                  (isActive
                    ? "bg-foreground text-background border-foreground"
                    : "glass border-glass text-foreground/70 hover:text-foreground hover:border-[hsl(var(--glass-border-hover))]")
                }
              >
                <c.icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                {c.key}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <div className="glass border border-glass rounded-2xl p-10 text-center text-[13.5px] text-foreground/60">
            No courses match this filter yet.
          </div>
        ) : (
          <div className="space-y-14">
            {grouped.map(([cat, list]) => (
              <div key={cat}>
                <div className="flex items-baseline justify-between mb-5">
                  <h3 className="text-[13px] uppercase tracking-widest text-foreground/60 font-medium">
                    {cat}
                  </h3>
                  <span className="text-[12px] text-foreground/45 tabular-nums">
                    {list.length} course{list.length === 1 ? "" : "s"}
                  </span>
                </div>

                <div
                  key={cat + "|" + active + "|" + query}
                  data-reveal-group
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {list.map((course) => {
                    const Icon = course.icon;
                    return (
                      <a
                        key={course.title}
                        href="/app"
                        className="group flex flex-col glass border border-glass rounded-2xl p-6 md:p-7 hover:border-[hsl(var(--glass-border-hover))] transition-colors min-h-[260px]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl glass border border-glass">
                            <Icon className="w-4 h-4 text-foreground/80" strokeWidth={1.75} />
                          </span>
                          <span
                            className={
                              "inline-flex items-center h-6 px-2.5 rounded-full border text-[11px] font-medium tracking-wide " +
                              levelClasses[course.level]
                            }
                          >
                            {course.level}
                          </span>
                        </div>

                        <h4 className="mt-5 text-[19px] md:text-[20px] font-semibold leading-snug tracking-tight text-foreground/90">
                          {course.title}
                        </h4>
                        <p className="mt-3 text-[13.5px] text-foreground/60 leading-relaxed line-clamp-3">
                          {course.summary}
                        </p>

                        <div className="mt-5 flex items-center gap-4 text-[12px] text-foreground/55">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
                            {course.duration}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <GraduationCap className="w-3.5 h-3.5" strokeWidth={1.75} />
                            {course.lessons} lessons
                          </span>
                        </div>

                        <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-foreground/85 group-hover:gap-2.5 transition-all">
                          Start course <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <CtaSection
        eyebrow="Courses"
        title="New to Rivinity?"
        gradientTail="Start with Foundations — free, this week."
        primary={{ label: "Open Rivinity", href: "/app" }}
        secondary={{ label: "Talk to sales", href: "/contact" }}
      />
    </MarketingLayout>
  );
}