import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Sparkles, Rocket, HeartHandshake, Code2, Beaker, GraduationCap, Globe2, Umbrella, Coffee, Users, Search, MapPin, Building2 } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import Section from "@/components/marketing/Section";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import FaqSection from "@/components/marketing/FaqSection";
import CtaSection from "@/components/marketing/CtaSection";
import FlowDivider from "@/components/landing/FlowDivider";
import ParticleField from "@/components/landing/ParticleField";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const roles = [
  { team: "Engineering", title: "Staff Engineer, Runtime", location: "SF / Remote", type: "Full-time" },
  { team: "Engineering", title: "Senior Engineer, Agents", location: "London / Remote", type: "Full-time" },
  { team: "Engineering", title: "Frontend Engineer, Studio", location: "Remote", type: "Full-time" },
  { team: "Research", title: "Research Scientist, Reasoning", location: "SF", type: "Full-time" },
  { team: "Research", title: "Research Engineer, Retrieval", location: "London / SF", type: "Full-time" },
  { team: "Design", title: "Senior Product Designer, Canvas", location: "Tokyo / Remote", type: "Full-time" },
  { team: "Design", title: "Brand Designer", location: "SF / Remote", type: "Full-time" },
  { team: "Product", title: "Product Manager, Enterprise", location: "SF / Remote", type: "Full-time" },
  { team: "Trust", title: "Security Engineer, Corp", location: "Berlin / Remote", type: "Full-time" },
  { team: "GTM", title: "Enterprise AE, EMEA", location: "London", type: "Full-time" },
  { team: "GTM", title: "Developer Advocate", location: "Remote", type: "Full-time" },
  { team: "Ops", title: "People Partner", location: "SF", type: "Full-time" },
];

const teams = ["All", "Engineering", "Research", "Design", "Product", "Trust", "GTM", "Ops"];

export default function Careers() {
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [eyebrowRef.current, headlineRef.current, subtextRef.current],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1, delay: 0.05 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <MarketingLayout
      title="Careers — Rivinity"
      description="Join Rivinity. We are hiring engineers, researchers, designers and operators to build the Intelligence Operating System."
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
            Careers at Rivinity
          </div>
          <h1
            ref={headlineRef}
            style={{ opacity: 0, transform: "translateY(24px)" }}
            className="text-[44px] sm:text-[60px] lg:text-[76px] font-semibold tracking-tight leading-[0.98]"
          >
            Build the operating system for
            <br />
            <span className="gradient-accent-text">intelligence.</span>
          </h1>
          <p
            ref={subtextRef}
            style={{ opacity: 0, transform: "translateY(24px)" }}
            className="mt-5 text-[15px] lg:text-[17px] text-foreground/65 leading-relaxed max-w-2xl"
          >
            Rivinity is a small, senior team distributed across fourteen countries. We ship calm software, publish what we learn, and expect craft in every commit.
          </p>
        </div>

        <FlowDivider className="mt-16" />
      </section>

      <Section
        eyebrow="Why Rivinity"
        title={<>A rare place to do the work of your life.</>}
        kicker="Small teams. Wide autonomy. A product used by researchers, founders and creators in over a hundred countries. No status meetings, no committee reviews, no ceremony."
      >
        <FeatureGrid
          items={[
            { icon: Rocket, title: "Ship fast, ship well", body: "Every team owns a shipping cadence. Reviewers are advisors, not blockers." },
            { icon: Beaker, title: "Research that ships", body: "Every research bet has a shipping deadline. Papers publish alongside features." },
            { icon: HeartHandshake, title: "Warmth as a system", body: "Kindness is not a soft skill. It's baked into the way we review, hire and lead." },
            { icon: Sparkles, title: "Craft is expected", body: "We polish until it disappears. Software should feel weightless." },
            { icon: Globe2, title: "Live where you think best", body: "Anchored in SF, distributed across fourteen countries. Home offices funded." },
            { icon: GraduationCap, title: "Learn on the clock", body: "$3,000 annual learning stipend and one conference per year, no approvals needed." },
          ]}
        />
      </Section>

      <Section
        eyebrow="How we work"
        title={<>Engineering & Research culture.</>}
        kicker="Two disciplines. One canvas. Both operate on the same principles: small teams, deep ownership, and writing before talking."
        divider
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass border border-glass rounded-3xl p-8">
            <Code2 className="w-6 h-6 text-foreground/70" />
            <div className="mt-4 text-[20px] font-semibold">Engineering</div>
            <ul className="mt-4 space-y-3 text-[13.5px] text-foreground/70 leading-relaxed">
              <li>• Trunk-based, continuous deploy. Merges land in under an hour.</li>
              <li>• Rust & TypeScript on the runtime. Python for research surfaces.</li>
              <li>• Every engineer ships to production in their first week.</li>
              <li>• On-call is voluntary, compensated, and rotates weekly.</li>
              <li>• We write RFDs before code for anything over 200 lines of design.</li>
            </ul>
          </div>
          <div className="glass border border-glass rounded-3xl p-8">
            <Beaker className="w-6 h-6 text-foreground/70" />
            <div className="mt-4 text-[20px] font-semibold">Research</div>
            <ul className="mt-4 space-y-3 text-[13.5px] text-foreground/70 leading-relaxed">
              <li>• Publish or perish. Every direction produces public writing.</li>
              <li>• Compute is on-tap: no quota reviews, no scheduling committees.</li>
              <li>• Paper → production pipeline runs every two weeks.</li>
              <li>• We hire for taste, curiosity, and evidence of shipping.</li>
              <li>• Sabbatical every four years, four weeks fully covered.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Hiring process"
        title={<>What to expect.</>}
        kicker="A four-step process, calibrated to be respectful of your time. Median time from application to offer is 17 days."
      >
        <div className="grid md:grid-cols-4 gap-3">
          {[
            { n: "01", t: "Application", b: "We read every application within five business days. No cover letter required." },
            { n: "02", t: "Intro call", b: "45 minutes with the hiring manager. About the work, not a whiteboard." },
            { n: "03", t: "Work sample", b: "A short, paid work sample. Compensated at $500 for time and craft." },
            { n: "04", t: "Team day", b: "Four conversations in one day. Meet peers, ask hard questions, decide together." },
          ].map((s) => (
            <div key={s.n} className="glass border border-glass rounded-2xl p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                Step {s.n}
              </div>
              <div className="mt-2 text-[16px] font-semibold">{s.t}</div>
              <p className="mt-2 text-[13px] text-foreground/65 leading-relaxed">{s.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Benefits"
        title={<>Everything you need to do your best work.</>}
        divider
      >
        <FeatureGrid
          cols={4}
          items={[
            { icon: Umbrella, title: "Health, dental, vision", body: "100% covered for you and dependents, worldwide." },
            { icon: Coffee, title: "Unlimited PTO", body: "Minimum four weeks encouraged. We track it upward." },
            { icon: HeartHandshake, title: "Parental leave", body: "20 weeks paid, phased return, no strings." },
            { icon: GraduationCap, title: "Learning stipend", body: "$3,000 annual + one conference of your choice." },
            { icon: Building2, title: "Home office budget", body: "$2,500 one-time + $150 monthly for coworking." },
            { icon: Sparkles, title: "Equity", body: "Meaningful equity with a ten-year exercise window." },
            { icon: Globe2, title: "Team offsites", body: "Twice a year, funded travel to meet in person." },
            { icon: Users, title: "Sabbatical", body: "Four weeks every four years, fully compensated." },
          ]}
        />
      </Section>

      <Section
        id="roles"
        eyebrow="Open roles"
        title={<>Twelve seats open right now.</>}
        kicker="Filter by team or search by title. Don't see your role? Send a note to careers@rivinity.ai."
      >
        <div className="mb-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input placeholder="Search roles…" className="pl-9 h-11" />
          </div>
          <Tabs defaultValue="All" className="w-full md:w-auto">
            <TabsList className="glass border border-glass overflow-x-auto max-w-full">
              {teams.map((t) => (
                <TabsTrigger key={t} value={t} className="text-[12px]">
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
            {teams.map((t) => (
              <TabsContent key={t} value={t} />
            ))}
          </Tabs>
        </div>
        <div className="glass border border-glass rounded-3xl divide-y divide-glass overflow-hidden">
          {roles.map((r) => (
            <a
              key={r.title}
              href="#"
              className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-6 px-5 md:px-6 py-5 hover:bg-accent/40 transition-colors"
            >
              <Badge variant="secondary" className="w-max text-[11px]">
                {r.team}
              </Badge>
              <div className="flex-1 text-[15px] font-medium">{r.title}</div>
              <div className="flex items-center gap-2 text-[12.5px] text-foreground/55">
                <MapPin className="w-3.5 h-3.5" /> {r.location}
              </div>
              <div className="text-[12.5px] text-foreground/55">{r.type}</div>
              <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </a>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Life at Rivinity"
        title={<>Small teams. Long walks. Real writing.</>}
        kicker="Our week is built around focus, not calendars. Wednesdays are meeting-free by policy. Friday afternoons belong to demos."
        divider
      >
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Meeting-free Wednesdays", b: "One full day a week for deep work. Enforced by leadership, not by teams." },
            { t: "Friday demos", b: "Every team demos something they shipped that week. Craft is celebrated in public." },
            { t: "Reading groups", b: "Weekly paper clubs across research, systems, design and product." },
            { t: "Offsites in unusual places", b: "Kyoto, Marrakesh, Tromsø. We travel to think together." },
            { t: "Home offices funded", b: "A calm workspace matters. We help you build one." },
            { t: "Two-week onboarding", b: "Shadow every discipline before you commit to your first roadmap." },
          ].map((c) => (
            <div key={c.t} className="glass border border-glass rounded-2xl p-6">
              <div className="text-[15px] font-semibold">{c.t}</div>
              <p className="mt-2 text-[13px] text-foreground/65 leading-relaxed">{c.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title={<>Answers to common questions.</>}>
        <FaqSection
          faqs={[
            { q: "Are you fully remote?", a: "We are distributed by default. Anchored in San Francisco with hubs in London, Bengaluru, Berlin, Tokyo and Toronto. Roles are marked with a preferred region when in-person time matters." },
            { q: "Do you sponsor visas?", a: "Yes. We sponsor US H1B, O-1 and UK Skilled Worker visas for eligible candidates. Our People team handles filings end-to-end." },
            { q: "How do you make hiring decisions?", a: "The hiring manager and two peers each write a memo after the team day. We prefer strong evidence over consensus." },
            { q: "How do interns fit in?", a: "We run a twelve-week summer program for research and engineering interns. Applications open in October each year." },
            { q: "What's the compensation philosophy?", a: "Top of market for base and equity, benchmarked yearly by an external partner. We publish salary bands internally." },
            { q: "How do you handle underrepresentation?", a: "We publish demographic data annually and have partnered with three organizations to widen our funnel. There are no diversity quotas — only wider outreach and blind first reviews." },
          ]}
        />
      </Section>

      <CtaSection
        eyebrow="Don't see your role?"
        title="Send us a note. We"
        gradientTail="read every one."
        subtitle="Tell us what you'd build if you had a small team and a large canvas. Mail careers@rivinity.ai."
        primary={{ label: "Email careers", href: "mailto:careers@rivinity.ai" }}
        secondary={{ label: "Read our story", href: "/about" }}
      />
    </MarketingLayout>
  );
}
