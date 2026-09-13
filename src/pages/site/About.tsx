import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Compass, Telescope, HeartHandshake, GlobeLock, Building2, Sparkles, Users, Lightbulb, ShieldCheck, BookOpen, Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MagneticButton from "@/components/landing/MagneticButton";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import Section from "@/components/marketing/Section";
import TimelineSection from "@/components/marketing/TimelineSection";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import CtaSection from "@/components/marketing/CtaSection";
import FaqAccordion from "@/components/marketing/FaqAccordion";
import FlowDivider from "@/components/landing/FlowDivider";
import ParticleField from "@/components/landing/ParticleField";
import RivinityCoreMark from "@/components/rivinity/RivinityCoreMark";

const leadership = [
  { name: "Aarav Mehta", role: "Founder & CEO", note: "Previously staff eng, Anthropic infra." },
  { name: "Sana Iqbal", role: "Head of Research", note: "Reasoning + retrieval, ex-DeepMind." },
  { name: "Marcus Ford", role: "Head of Product", note: "Studio design lead, ex-Figma." },
  { name: "Yuki Tanaka", role: "VP Engineering", note: "Runtime + agent orchestration." },
  { name: "Elena Ruiz", role: "Head of Trust", note: "Enterprise security, ex-Cloudflare." },
  { name: "Priya Nair", role: "Chief of Staff", note: "Scaling ops from 20 → 200 engineers." },
];

export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [eyebrowRef.current, headlineRef.current, subtextRef.current, ctaRef.current],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1, delay: 0.05 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <MarketingLayout
      title="About — Rivinity Labs"
      description="Rivinity is the Intelligence Operating System. Our mission, our story, and the team building the calm workspace for every AI workflow."
    >
      <section
        ref={heroRef}
        data-hero
        className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-14 pb-10"
      >
        <div className="absolute inset-x-0 -top-10 h-[520px] gradient-mesh pointer-events-none -z-10 opacity-60" />
        <div className="absolute inset-0 pointer-events-none opacity-40 -z-10">
          <ParticleField />
        </div>

        <div className="max-w-4xl">
          <div
            ref={eyebrowRef}
            style={{ opacity: 0, transform: "translateY(24px)" }}
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/50 mb-4"
          >
            Our Story
          </div>
          <h1
            ref={headlineRef}
            style={{ opacity: 0, transform: "translateY(24px)" }}
            className="text-[44px] sm:text-[60px] lg:text-[76px] font-semibold tracking-tight leading-[0.98]"
          >
            We are building the
            <br />
            <span className="gradient-accent-text">Intelligence Operating System.</span>
          </h1>
          <p
            ref={subtextRef}
            style={{ opacity: 0, transform: "translateY(24px)" }}
            className="mt-5 text-[15px] lg:text-[17px] text-foreground/65 leading-relaxed max-w-2xl"
          >
            A single canvas where intelligence feels less like a chatbot and more like an operating system — calm, composable, and always in service of the person at the keyboard.
          </p>
          <div
            ref={ctaRef}
            style={{ opacity: 0, transform: "translateY(24px)" }}
            className="mt-8 flex items-center gap-4"
          >
            <MagneticButton href="/app" className="cta-pill h-11 px-5">
              Open Rivinity <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>
        </div>

        <FlowDivider className="mt-16" />
      </section>

      <Section
        eyebrow="Mission"
        title={<>Intelligence should feel <span className="gradient-accent-text">weightless.</span></>}
        kicker="Most AI still feels like a browser tab. We are building a coherent surface where every model, tool, and workflow lives in one place — orchestrated, private, and calm."
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass border border-glass rounded-3xl p-8">
            <Compass className="w-6 h-6 text-foreground/70" />
            <div className="mt-4 text-[20px] font-semibold">Our mission</div>
            <p className="mt-3 text-[14.5px] text-foreground/70 leading-relaxed">
              Give every builder, researcher and creator a single canvas where the entire intelligence ecosystem is one keystroke away — routed automatically, tuned for their intent, and shaped like their thought.
            </p>
          </div>
          <div className="glass border border-glass rounded-3xl p-8">
            <Telescope className="w-6 h-6 text-foreground/70" />
            <div className="mt-4 text-[20px] font-semibold">Our vision</div>
            <p className="mt-3 text-[14.5px] text-foreground/70 leading-relaxed">
              A world where intelligence disappears into the surface. No more model pickers. No more window switching. Just one continuous conversation between people, agents, and the software they are building.
            </p>
          </div>
        </div>
      </Section>

      <FlowDivider />

      <Section
        eyebrow="Our story"
        title={<>From a shared notebook to a<br />complete platform.</>}
        kicker="Rivinity began as a private notebook shared between three engineers in 2022. Every good prompt got copied, every bad one deleted. When the notebook outgrew the tab, we started building the system it deserved."
      >
        <TimelineSection
          items={[
            { year: "2022", title: "The shared notebook", body: "Three founders begin cataloguing every prompt, tool call, and reasoning trace that produces useful work. The first internal router is born." },
            { year: "2023", title: "Rivinity Labs incorporates", body: "Series Seed from Base10 and a small group of research angels. First product: the AI Chat canvas with model auto-routing." },
            { year: "2024", title: "Studio & Marketplace", body: "App Builder, Audio Lab, Image Enhancer and Prompt-to-Video ship in the same year. Marketplace opens for datasets, models and agents." },
            { year: "2025", title: "The Intelligence OS", body: "Twelve capabilities unify under one canvas. RivinityLM educational workspace launches. Series B closes at $210M." },
            { year: "2026", title: "Enterprise & Sovereignty", body: "Rivinity Enterprise ships with private inference regions, VPC deployment and full compliance coverage. First sovereign deployment goes live in the EU." },
          ]}
        />
      </Section>

      <Section
        eyebrow="Research philosophy"
        title={<>Research that ships.</>}
        kicker="Every research bet at Rivinity has a shipping deadline. We publish what we learn, open-source what we can, and prefer working systems over speculative demos."
        divider
      >
        <FeatureGrid
          items={[
            { icon: BookOpen, title: "Publish or perish", body: "Every significant research direction publishes a public write-up. Ideas compound faster in the open." },
            { icon: Cpu, title: "Systems-first", body: "New capabilities are only accepted into the platform once they run on production hardware at production latency." },
            { icon: Lightbulb, title: "Tight loops", body: "Research and product sit in the same rooms. Median time from paper to shipped feature is 47 days." },
            { icon: ShieldCheck, title: "Safety by construction", body: "Alignment is not a review gate. It is a set of primitives that new models inherit from day one." },
            { icon: Users, title: "Small teams", body: "Every capability is owned by a team of four to six. Ownership stays with the people closest to the problem." },
            { icon: Sparkles, title: "Elegance matters", body: "If a solution is not elegant, we ship it anyway — and then we refuse to stop until it is." },
          ]}
        />
      </Section>

      <Section
        eyebrow="Intelligence flow"
        title={<>Every capability, one continuous surface.</>}
        kicker="Chat, Studio, Agents, Learning, Research and the Marketplace all share the same routing spine. Nothing lives in a silo."
      >
        <div className="glass border border-glass rounded-3xl p-6 md:p-12 flex items-center justify-center">
          <RivinityCoreMark size={420} />
        </div>
      </Section>

      <Section
        eyebrow="Leadership"
        title={<>The people at the canvas.</>}
        kicker="A senior team from Anthropic, DeepMind, Figma, Cloudflare and Stripe — builders who have shipped software used by hundreds of millions."
        divider
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {leadership.map((l) => (
            <div key={l.name} className="glass border border-glass rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FD881F]/40 via-[#F5A9D0]/40 to-[#BFA7F8]/40 border border-glass" />
              <div className="mt-4 text-[16px] font-semibold">{l.name}</div>
              <div className="text-[12.5px] text-foreground/55">{l.role}</div>
              <p className="mt-3 text-[13px] text-foreground/65 leading-relaxed">{l.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Culture"
        title={<>How we work.</>}
        kicker="Five commitments that shape every hire, every review, and every product decision."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { t: "Calm by default", b: "No status meetings. Writing before talking." },
            { t: "Small teams, wide autonomy", b: "Owners ship. Reviewers don't block." },
            { t: "Craft is non-negotiable", b: "We polish until it disappears." },
            { t: "Bias for shipping", b: "Every research bet has a ship date." },
            { t: "Kind to each other", b: "Warmth is not a soft skill. It's a system." },
          ].map((c) => (
            <div key={c.t} className="glass border border-glass rounded-2xl p-5">
              <HeartHandshake className="w-4 h-4 text-foreground/60" />
              <div className="mt-3 text-[14px] font-semibold">{c.t}</div>
              <p className="mt-1.5 text-[12.5px] text-foreground/60">{c.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Global vision"
        title={<>Built in Silicon Valley. Present in fourteen countries.</>}
        kicker="Rivinity is a distributed company by design. Research is anchored in San Francisco, but our engineers, designers and researchers live where they think best."
        divider
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { city: "San Francisco", tag: "HQ" },
            { city: "London", tag: "Research" },
            { city: "Bengaluru", tag: "Engineering" },
            { city: "Berlin", tag: "Trust" },
            { city: "Tokyo", tag: "Design" },
            { city: "Toronto", tag: "Agents" },
            { city: "Singapore", tag: "APAC" },
            { city: "Dubai", tag: "Enterprise" },
          ].map((o) => (
            <div key={o.city} className="glass border border-glass rounded-2xl p-5">
              <GlobeLock className="w-4 h-4 text-foreground/50" />
              <div className="mt-3 text-[15px] font-semibold">{o.city}</div>
              <div className="text-[11.5px] text-foreground/50 uppercase tracking-[0.15em] mt-0.5">
                {o.tag}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Future roadmap"
        title={<>Where we are going next.</>}
        kicker="A public roadmap so customers, contributors and researchers can see where Rivinity is heading in the next four quarters."
      >
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { q: "Q3 2026", title: "Sovereign inference", body: "Bring-your-own hardware in three new EU regions and a UK sovereign zone." },
            { q: "Q4 2026", title: "Agent marketplace v2", body: "Verified agents with signed provenance, sandboxed execution and payouts." },
            { q: "Q1 2027", title: "RivinityLM for teams", body: "Cohort-based learning workspaces with shared notes and collaborative flashcards." },
            { q: "Q2 2027", title: "Native long-form video", body: "Ten-minute continuous scenes with sound design and edit-aware timelines." },
          ].map((r) => (
            <div key={r.title} className="glass border border-glass rounded-2xl p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                {r.q}
              </div>
              <div className="mt-2 text-[18px] font-semibold">{r.title}</div>
              <p className="mt-2 text-[13.5px] text-foreground/65 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="FAQ"
        title={<>Frequently asked <span className="gradient-accent-text">questions.</span></>}
        kicker="Everything teams ask us before they move onto Rivinity — from pricing and privacy to integrations and getting started."
        divider
      >
        <div className="max-w-3xl">
          <FaqAccordion
            items={[
              {
                q: "What exactly is Rivinity?",
                a: "Rivinity is an Intelligence Operating System — a single canvas that brings chat, agents, app building, audio, images, video, research and learning together. Instead of juggling separate tools, one workspace routes every request to the right model and keeps context across everything you do.",
              },
              {
                q: "How does pricing work?",
                a: "Rivinity has a generous free tier for individuals, a Pro plan at $20 / month with higher limits and every module unlocked, and a Team plan billed per seat. Enterprise pricing is custom and covers private inference regions, VPC deployment, SSO and dedicated support. You can change plans or cancel at any time from Settings → Billing.",
              },
              {
                q: "How does Rivinity handle my data and privacy?",
                a: "Your prompts, files and generated content are yours. By default they are never used to train foundation models, and you can turn off logging entirely from Settings → Data controls. Data is encrypted in transit and at rest, and Enterprise customers can choose regional data residency or a private VPC deployment.",
              },
              {
                q: "How do I get started?",
                a: "Sign up with an email or an SSO provider, land on the canvas, and type. The first prompt automatically routes to a sensible default model — no configuration required. Rivinity Academy has short, task-based courses if you want a guided path through Chat, App Builder, Agents and Studio.",
              },
              {
                q: "Which integrations does Rivinity support?",
                a: "Native connectors for Google Drive, Notion, Slack, GitHub, Linear, Postgres and S3-compatible storage. Model-Context-Protocol (MCP) is supported end-to-end, so any MCP server — public or private — plugs into agents and chat. Everything else is reachable through the REST API and webhooks.",
              },
              {
                q: "Can I bring my own models or API keys?",
                a: "Yes. You can attach your own OpenAI, Anthropic, Google, Mistral or self-hosted endpoints and Rivinity will route eligible requests through them. Enterprise customers can also deploy Rivinity's own models inside their VPC with no external egress.",
              },
              {
                q: "Is Rivinity SOC 2 and GDPR compliant?",
                a: "Rivinity is GDPR-ready today, with a signed DPA available on request. SOC 2 Type II and ISO 27001 audits are in progress and targeted for Q3 2026. The Trust Center at rivinity.ai/trust always shows the current, verifiable status — we never mark controls as complete before they are audited.",
              },
              {
                q: "How do I manage team members and roles?",
                a: "From Settings, open Team members to invite people by email and assign a role, and open Roles & access to review exactly what each role can do. Owners can override individual permissions from a member's profile. All membership changes are written to the audit log.",
              },
              {
                q: "Where do I manage billing and invoices?",
                a: "Settings → Billing shows your current plan, payment method, seat count and invoice history. Team and Enterprise workspaces can add a dedicated Billing role that only sees invoices and payment methods, without access to workspace content.",
              },
              {
                q: "How do I cancel or delete my account?",
                a: "You can cancel your subscription any time from Settings → Billing; you keep access through the end of the billing period. To permanently delete your account and all associated data, use Settings → Account → Delete account. Deletion is reversible for 30 days, then permanent.",
              },
            ]}
          />
        </div>
      </Section>

      <CtaSection
        eyebrow="Come build with us"
        title="Rivinity is hiring across"
        gradientTail="every discipline."
        subtitle="Engineering, research, design, trust, product, and go-to-market. If you want to build the operating system for intelligence, we would love to meet you."
        primary={{ label: "See open roles", href: "/careers" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </MarketingLayout>
  );
}
