import { useState, useEffect, FormEvent, useRef } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useScroll, useTransform } from "framer-motion";
import { RivinityEffect } from "@/components/ui/google-gemini-effect";
import {
  ArrowRight,
  Sparkles,
  MessageSquare,
  Wand2,
  Mic,
  GraduationCap,
  Image as ImageIcon,
  Bot,
  Film,
  Store,
  FlaskConical,
  Newspaper,
  TrendingUp,
  Check,
  Github,
  Twitter,
  Linkedin,
  FlaskRound,
  ShieldCheck,
  Code2,
  Building2,
} from "lucide-react";
import rivinityLogo from "@/assets/rivinity-logo.png.asset.json";
import MagneticButton from "@/components/landing/MagneticButton";
import LivingInterface from "@/components/landing/LivingInterface";
import PillarDemo from "@/components/landing/PillarDemo";
import SpotlightCard from "@/components/landing/SpotlightCard";
import SecurityArchitecture from "@/components/landing/SecurityArchitecture";
import ParticleField from "@/components/landing/ParticleField";
import ScrollReveal from "@/components/landing/ScrollReveal";
import PlatformOrbit from "@/components/landing/PlatformOrbit";
import MultipleProducts from "@/components/landing/MultipleProducts";
import DeveloperPlatform from "@/components/landing/DeveloperPlatform";
import ResearchHighlights from "@/components/landing/ResearchHighlights";
import EnterpriseReadiness from "@/components/landing/EnterpriseReadiness";
import FlowDivider from "@/components/landing/FlowDivider";
import { demoByTitle } from "@/components/landing/demos/MicroDemos";
import HeroWorkflow from "@/components/landing/HeroWorkflow";
import LogoAssembly from "@/components/rivinity/LogoAssembly";
import RivinityLogoTimeline from "@/components/rivinity/RivinityLogoTimeline";
import WhyRivinity from "@/components/landing/WhyRivinity";
import BuiltInTheOpen from "@/components/landing/BuiltInTheOpen";
import IndiaTrustStrip from "@/components/landing/IndiaTrustStrip";
import RivinityFooter from "@/components/landing/RivinityFooter";
import { Plus, Activity, FileText, Globe as GlobeIcon, Image as ImageIcon2 } from "lucide-react";

const logo = rivinityLogo.url;

const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .min(3, "Enter a valid email")
    .max(254, "Email is too long")
    .email("Enter a valid email")
    .refine((v) => !/[<>"'`\\]/.test(v), "Invalid characters"),
});

const modules = [
  {
    icon: MessageSquare,
    title: "AI Chat, orchestrated",
    body: "One prompt, auto-routed to the right model and tools. Multi-tab canvas.",
    tag: "Core",
    to: "/app",
    accent: "purple" as const,
  },
  {
    icon: Wand2,
    title: "App Builder",
    body: "Describe an idea. Rivinity assembles a working React app inside a live workbench.",
    tag: "Studio",
    to: "/app-builder",
    accent: "pink" as const,
  },
  {
    icon: Mic,
    title: "Audio Lab",
    body: "Text-to-speech, transcription, and voice cloning tuned for production.",
    tag: "Studio",
    to: "/audio-lab",
    accent: "peach" as const,
  },
  {
    icon: GraduationCap,
    title: "RivinityLM",
    body: "Eleven learning modules: contextual chat, smart notes, exam lab, flashcards.",
    tag: "Learn",
    to: "/rivinity-lm",
    accent: "purple" as const,
  },
  {
    icon: ImageIcon,
    title: "Image Enhancer",
    body: "Restore, upscale, and swap backgrounds with per-pixel fidelity.",
    tag: "Studio",
    to: "/image-enhancer",
    accent: "peach" as const,
  },
  {
    icon: Bot,
    title: "Agent Playground",
    body: "Prototype agents with tool routing, temperature control, and live orchestration.",
    tag: "Advanced",
    to: "/agent-playground",
    accent: "purple" as const,
  },
  {
    icon: Film,
    title: "Prompt to Video",
    body: "Generate cinematic clips from a single prompt. Style presets and render history.",
    tag: "New",
    to: "/prompt-to-video",
    accent: "pink" as const,
  },
  {
    icon: Store,
    title: "Marketplace",
    body: "Curated datasets, models, agents, and tools. Publish from GitHub in minutes.",
    tag: "Community",
    to: "/marketplace",
    accent: "peach" as const,
  },
];

const discover = [
  { icon: FlaskConical, title: "Latest research", body: "Papers from arXiv, DeepMind, Stanford — filtered for signal.", to: "/research" },
  { icon: Newspaper, title: "Tech news", body: "What shipped this week across hardware, chips, and policy.", to: "/tech-news" },
  { icon: TrendingUp, title: "AI trends", body: "Weekly shifts tracked with progress deltas and directional signals.", to: "/ai-trends" },
];

const pillars = [
  { type: "routing" as const, title: "Auto-routed intelligence", body: "Rivinity picks the right model, tool, and context for every prompt." },
  { type: "privacy" as const, title: "Private by default", body: "Local-first history, scoped keys, and per-workspace permissions." },
  { type: "canvas" as const, title: "One canvas, every surface", body: "Chat, code, audio, video, learning — all inside a single glass workspace." },
];

const Landing = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const MAX_EMAIL = 254;

  const geminiRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: geminiRef,
    offset: ["start start", "end start"],
  });
  const flowProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = waitlistSchema.safeParse({ email });
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setStatus("ok");
    setMessage("You're on the list. We'll be in touch.");
    setEmail("");
  };

  useEffect(() => {
    document.title = "Rivinity — the Intelligence Operating System";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Rivinity is the Intelligence Operating System — twelve capabilities, one connected platform for chat, agents, research, and every AI workflow.",
      );
    }
  }, []);

  // Skeleton state for the Platform Overview grid — keeps layout stable
  // while demo micro-interactions and card content hydrate.
  const [platformReady, setPlatformReady] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setPlatformReady(true), 550);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-4">
          <div className="glass-strong border border-glass rounded-2xl shadow-float flex items-center justify-between h-14 px-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Rivinity" className="h-6 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-[13px] text-foreground/70">
              <a href="#platform" className="hover:text-foreground transition-colors">Platform</a>
              <a href="#modules" className="hover:text-foreground transition-colors">Product</a>
              <a href="#developers" className="hover:text-foreground transition-colors">Developers</a>
              <a href="#enterprise" className="hover:text-foreground transition-colors">Enterprise</a>
              <Link to="/academy" className="hover:text-foreground transition-colors">Academy</Link>
              <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
              <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            </nav>
            <div className="flex items-center gap-2">
              <Link to="/app" className="hidden sm:inline-flex text-[13px] font-medium text-foreground/70 hover:text-foreground px-3 h-9 items-center">
                Sign in
              </Link>
              <MagneticButton href="/app" className="cta-pill">
                Open Rivinity <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section data-hero className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-16 lg:pt-24 pb-16">
        <div className="absolute inset-x-0 -top-10 h-[520px] gradient-mesh pointer-events-none -z-10 opacity-60" />
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <RivinityLogoTimeline mode="assemble" size={132} className="mb-6" />
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/60 px-3 h-7 rounded-full glass border border-glass mb-6 animate-fade-up">
            <Sparkles className="w-3 h-3" /> Now with Prompt-to-Video & Agent Playground
          </span>
          <h1 className="text-[44px] sm:text-[60px] lg:text-[76px] leading-[0.98] font-semibold tracking-tight animate-fade-up">
            One canvas for
            <br />
            <span className="gradient-accent-text">every AI workflow.</span>
          </h1>
          <p className="mt-5 text-[15px] lg:text-[16px] font-medium text-foreground/80 leading-relaxed max-w-2xl animate-fade-up">
            Run every AI workflow in one calm workspace, without switching between scattered tools, for builders, researchers, and creators.
          </p>
          <p className="mt-6 text-[15px] lg:text-[17px] text-foreground/65 leading-relaxed max-w-xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Rivinity is the intelligent co-pilot for builders, researchers, and creators — all in one calm workspace.
          </p>

          <form onSubmit={onSubmit} className="mt-9 w-full max-w-lg animate-fade-up" style={{ animationDelay: "0.15s" }} noValidate>
            <div className="glass border border-glass rounded-full h-12 pl-5 pr-1 flex items-center input-glow shadow-float">
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                maxLength={MAX_EMAIL}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value.slice(0, MAX_EMAIL));
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="you@company.com"
                aria-label="Email address"
                aria-invalid={status === "error"}
                className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-foreground/40"
              />
              <MagneticButton
                onClick={() => {}}
                className="cta-pill h-10 px-4 whitespace-nowrap"
              >
                Get early access
              </MagneticButton>
              <MagneticButton
                href="/contact"
                className="ml-1 h-10 px-4 rounded-full text-[13px] font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04] transition-colors whitespace-nowrap"
              >
                Book a demo
              </MagneticButton>
            </div>
            <div className="min-h-[20px] mt-2 text-[12px]" role="status" aria-live="polite">
              {status === "ok" && <span className="text-emerald-600 dark:text-emerald-400">{message}</span>}
              {status === "error" && <span className="text-destructive">{message}</span>}
              {status === "idle" && <span className="text-foreground/50">Free during beta. No credit card.</span>}
            </div>
          </form>
        </div>

        <div className="relative mt-14 lg:mt-20 mx-auto max-w-6xl w-full">
          {/* Almost invisible radial light behind the product window (max 4%) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 55%, rgba(253,136,31,0.04), rgba(191,167,248,0.03) 45%, transparent 70%)",
            }}
          />
          <HeroWorkflow />
          <p className="mt-4 text-center text-[12px] text-foreground/50 flex items-center justify-center gap-1.5 animate-fade-up">
            <Check className="w-3 h-3 text-emerald-500" />
            Real output, not a mockup.
          </p>
        </div>


        {/* Compact trust strip */}
        <div
          className="mt-14 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 animate-fade-up"
          style={{ animationDelay: "0.35s" }}
        >
          {[
            { icon: FlaskRound, label: "Research-ready" },
            { icon: Building2, label: "Enterprise-ready" },
            { icon: Code2, label: "Developer-first" },
            { icon: ShieldCheck, label: "Private by default" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 text-[11.5px] font-medium tracking-[0.02em] text-foreground/55"
            >
              <Icon className="w-3.5 h-3.5 text-foreground/45" strokeWidth={1.75} />
              {label}
            </span>
          ))}
        </div>
      </section>

      <IndiaTrustStrip />

      <BuiltInTheOpen />

      <WhyRivinity />

      <FlowDivider className="max-w-5xl mx-auto opacity-70" />

      {/* Platform Explorer — scroll-driven orbit */}
      <PlatformOrbit />

      {/* Platform Overview (was Modules) */}
      <section id="modules" className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <ScrollReveal className="max-w-2xl mb-12">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/50 mb-3">Platform Overview</div>
          <h2 className="text-[36px] lg:text-[48px] font-semibold tracking-tight leading-[1.05]">
            Every studio is a live
            <br />
            <span className="gradient-accent-text">surface of the OS.</span>
          </h2>
          <p className="mt-4 text-[15px] text-foreground/65 max-w-lg">
            Eight tightly-connected studios share context, history, memory, and design language.
          </p>
        </ScrollReveal>
        {/* Clean aligned grid — no tilts, no icon chips. */}
        <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {!platformReady
            ? modules.map((m) => {
                return (
                  <div
                    key={`skeleton-${m.title}`}
                    aria-hidden="true"
                    className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 flex flex-col min-h-[260px]"
                  >
                    <div className="flex items-center justify-end mb-3">
                      <div className="h-4 w-14 rounded-full bg-foreground/10 animate-pulse" />
                    </div>
                    <div className="mb-3 h-16 rounded-xl bg-foreground/[0.06] animate-pulse" />
                    <div className="h-4 w-3/4 rounded bg-foreground/10 animate-pulse" />
                    <div className="mt-2 space-y-1.5">
                      <div className="h-2.5 w-full rounded bg-foreground/[0.08] animate-pulse" />
                      <div className="h-2.5 w-5/6 rounded bg-foreground/[0.08] animate-pulse" />
                    </div>
                    <div className="mt-auto pt-3 h-3 w-16 rounded bg-foreground/10 animate-pulse" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.6s_ease-in-out_infinite]"
                    />
                  </div>
                );
              })
            : modules.map((m) => {
            const Demo = demoByTitle[m.title];
            return (
              <div
                key={m.title}
                className="group relative"
              >
                <SpotlightCard
                  className="relative p-5 flex flex-col min-h-[260px] border border-border/60 transition-[box-shadow,border-color] duration-300 ease-out hover:border-border focus-within:border-border hover:shadow-sm"
                >
                {/* Soft orange → violet gradient wash on hover/focus */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--accent-peach) / 0.18) 0%, hsl(var(--accent-pink) / 0.14) 45%, hsl(var(--accent-purple) / 0.22) 100%)",
                  }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                  style={{
                    boxShadow:
                      "inset 0 1px 0 hsl(0 0% 100% / 0.5), 0 0 0 1px hsl(var(--accent-purple) / 0.25)",
                  }}
                />
                <Link to={m.to} className="relative flex flex-col h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent-purple)/0.55)]">
                  <div className="flex items-center justify-end mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50 px-2 py-0.5 rounded-full glass border border-glass">
                      {m.tag}
                    </span>
                  </div>
                  {Demo && (
                    <div className="mb-3">
                      <Demo />
                    </div>
                  )}
                  <h3 className="text-[15px] font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-1.5 text-[12.5px] text-foreground/60 leading-relaxed">{m.body}</p>
                  <div className="mt-auto pt-3 text-[12px] font-medium text-foreground/70 flex items-center gap-1">
                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </section>

      {/* Intelligence Flow — the "Born from motion" moment, promoted to a
          conceptual bridge between the platform overview and the ecosystem. */}
      <section className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div
          ref={geminiRef}
          className="relative mx-auto max-w-6xl w-full"
        >
          <RivinityEffect
            title="Born from motion."
            description="Flowing intelligence organizes itself into the Rivinity identity — then dissolves back into motion."
            pathLengths={[flowProgress]}
          />
          <div className="absolute -inset-8 -z-10 blur-3xl opacity-60 gradient-mesh rounded-[3rem]" />
        </div>
      </section>

      {/* Product Ecosystem — Multiple Products surface */}
      <MultipleProducts />

      <FlowDivider className="max-w-5xl mx-auto opacity-60" />

      {/* Developer Platform */}
      <DeveloperPlatform />

      {/* Research */}
      <ResearchHighlights />

      {/* Enterprise */}
      <EnterpriseReadiness />

      <FlowDivider className="max-w-5xl mx-auto opacity-60" />

      {/* Pricing */}

      <section id="pricing" className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/50 mb-3">Pricing</div>
          <h2 className="text-[36px] lg:text-[44px] font-semibold tracking-tight">Simple, scales with you.</h2>
          <p className="mt-4 text-[15px] text-foreground/65 max-w-lg mx-auto">
            Start free. Upgrade when your workflows scale.
          </p>
        </ScrollReveal>
        <div data-reveal-group className="grid md:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto items-end">
          {[
            { name: "Free", price: "$0", desc: "For exploring the canvas", features: ["100 messages / mo", "Basic studios", "Community marketplace"], cta: "Start free", highlight: false },
            { name: "Pro", price: "$24", desc: "For daily builders", features: ["Unlimited messages", "All studios & agents", "Prompt-to-Video credits", "Priority routing"], cta: "Go Pro", highlight: true },
            { name: "Team", price: "Custom", desc: "For orgs & agencies", features: ["Shared workspaces", "SSO & role-based access", "Private marketplace", "Dedicated support"], cta: "Contact sales", highlight: false },
          ].map((t) => {
            const isPro = t.highlight;
            return (
              <div key={t.name} className="relative">
                {isPro && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-[10px] font-semibold uppercase tracking-wider text-foreground/80 px-3 py-1 rounded-full glass-strong border border-glass shadow-float">
                    Popular
                  </span>
                )}
                <div className={isPro ? "dark bg-background text-foreground rounded-3xl shadow-float" : ""}>
                <SpotlightCard
                  className={`rounded-3xl ${
                    isPro
                      ? "p-7 md:p-9 border-glass"
                      : "p-5 md:p-6 border-glass shadow-float"
                  }`}
                  glowColor={isPro ? "hsl(var(--accent-purple) / 0.22)" : undefined}
                >
                  <div className="flex flex-col h-full">
                    <h3 className={`font-semibold tracking-tight ${isPro ? "text-[18px] md:text-[20px]" : "text-[16px] text-foreground/75"}`}>{t.name}</h3>
                    <div className={`flex items-baseline gap-1 ${isPro ? "mt-4" : "mt-3"}`}>
                      <span className={`font-semibold tracking-tight ${isPro ? "text-[42px] md:text-[48px]" : "text-[32px] text-foreground/85"}`}>{t.price}</span>
                      {t.price !== "Custom" && <span className={`text-foreground/50 ${isPro ? "text-[13px]" : "text-[12px]"}`}>/mo</span>}
                    </div>
                    <p className={`text-foreground/60 ${isPro ? "text-[13.5px] mt-2" : "text-[12px] mt-1"}`}>{t.desc}</p>
                    <ul className={`space-y-2 ${isPro ? "mt-6" : "mt-5"}`}>
                      {t.features.map((f) => (
                        <li key={f} className={`flex items-start gap-2 ${isPro ? "text-[14px]" : "text-[12.5px] text-foreground/70"}`}>
                          <Check className={`shrink-0 mt-[2px] ${isPro ? "w-4 h-4 text-foreground/70" : "w-4 h-4 text-foreground/50"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <MagneticButton
                        href="/app"
                        className={`w-full h-11 rounded-full text-[13px] font-medium inline-flex items-center justify-center ${
                          isPro ? "cta-pill" : "glass border border-glass hover:bg-accent/60 transition-colors"
                        }`}
                      >
                        {t.cta}
                      </MagneticButton>
                    </div>
                  </div>
                </SpotlightCard>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Security */}
      <section id="security" className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <ScrollReveal>
          <SecurityArchitecture />
        </ScrollReveal>
      </section>

      {/* CTA — companion prompt, matched to the site's canvas theme
          instead of a foreign dark photo band. */}
      <section className="mx-auto max-w-6xl px-5 lg:px-8 py-24">
        <div className="relative rounded-3xl overflow-hidden shadow-float glass-strong border border-glass">
          {/* Themed background — mirrors the hero: soft `gradient-mesh`
              base plus two low-opacity accent blooms drawn from the site
              palette (lavender-indigo primary + rose accent). */}
          <div aria-hidden className="absolute inset-0 gradient-mesh opacity-70 pointer-events-none" />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(45% 55% at 15% 0%, hsla(245,75%,65%,0.14), transparent 70%)," +
                "radial-gradient(45% 55% at 85% 100%, hsla(330,85%,72%,0.14), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply dark:mix-blend-screen"
            style={{
              backgroundImage:
                "radial-gradient(hsla(230,25%,12%,0.05) 1px, transparent 1px)",
              backgroundSize: "4px 4px",
            }}
          />
          {/* Decorative brand flourish — large soft-edged geometric shapes
              bleeding in from the left and right edges. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Left: violet disc bleeding off the edge */}
            <div
              className="absolute -left-40 sm:-left-56 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-3xl opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, hsl(245 85% 68% / 0.55), hsl(260 80% 72% / 0.28) 55%, transparent 75%)",
              }}
            />
            {/* Right: peach/rose shard bleeding off the edge */}
            <div
              className="absolute -right-44 sm:-right-60 top-[8%] w-[560px] h-[560px] blur-3xl opacity-70 rotate-[18deg]"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, hsl(330 90% 74% / 0.55), hsl(22 95% 72% / 0.28) 55%, transparent 78%)",
                borderRadius: "42% 58% 55% 45% / 55% 40% 60% 45%",
              }}
            />
            {/* Bottom-right: warm amber bloom */}
            <div
              className="absolute -right-32 -bottom-40 w-[420px] h-[420px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, hsl(22 95% 72% / 0.50), transparent 70%)",
              }}
            />
            {/* Top-left: pale sky accent */}
            <div
              className="absolute -left-24 -top-24 w-[360px] h-[360px] rounded-full blur-3xl opacity-55"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, hsl(210 95% 78% / 0.45), transparent 72%)",
              }}
            />
          </div>
          <div className="relative z-10 px-6 sm:px-10 pt-20 pb-10 flex flex-col items-center text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/50 mb-3">
              Get started
            </div>
            <h2 className="text-[32px] sm:text-[44px] lg:text-[54px] font-semibold tracking-tight leading-[1.05]">
              An AI companion on every device.
            </h2>
            <p className="mt-4 text-[15px] text-foreground/65 max-w-lg">
              Empowering humanity with intelligent productivity.
            </p>

            <div className="mt-12 w-full max-w-3xl glass-strong border border-glass rounded-3xl shadow-float px-5 sm:px-8 py-7">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-3 h-12 rounded-full glass border border-glass px-4"
              >
                <Plus className="w-4 h-4 text-foreground/50 shrink-0" strokeWidth={1.75} />
                <input
                  type="text"
                  placeholder="Ask anything..."
                  aria-label="Ask anything"
                  className="flex-1 bg-transparent outline-none text-[14px] text-foreground placeholder:text-foreground/40"
                />
                <button
                  type="button"
                  aria-label="Voice input"
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
                >
                  <Mic className="w-4 h-4 text-foreground/60" strokeWidth={1.75} />
                </button>
              </form>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[12.5px]">
                <span className="text-foreground/55 mr-1">Try these tasks:</span>
                {[
                  { label: "Action", icon: Activity },
                  { label: "Report", icon: FileText },
                  { label: "Webpage", icon: GlobeIcon },
                  { label: "Image", icon: ImageIcon2 },
                ].map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full glass border border-glass text-foreground/75 hover:bg-foreground/[0.04] transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Single-focus CTA cluster: one primary button, secondaries demoted to text-links. */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <MagneticButton href="/app" className="cta-pill h-11 px-5">
                Open Rivinity <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>
              <div className="flex items-center gap-5 text-[12.5px] text-foreground/60">
                <Link to="/contact" className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                  Book a demo
                </Link>
                <span aria-hidden className="w-1 h-1 rounded-full bg-foreground/25" />
                <Link to="/marketplace" className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                  Browse marketplace
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <RivinityFooter showPrimaryNav={false} />
    </div>
  );
};

export default Landing;
