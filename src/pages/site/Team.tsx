import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Sparkles, Compass, HeartHandshake } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import Section from "@/components/marketing/Section";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import CtaSection from "@/components/marketing/CtaSection";
import FlowDivider from "@/components/landing/FlowDivider";
import ParticleField from "@/components/landing/ParticleField";

const leadership = [
  { name: "Aarav Mehta", role: "Founder & CEO", note: "Prev. staff eng, Anthropic infra." },
  { name: "Sana Iqbal", role: "Head of Research", note: "Reasoning + retrieval, ex-DeepMind." },
  { name: "Marcus Ford", role: "Head of Product", note: "Studio design lead, ex-Figma." },
  { name: "Yuki Tanaka", role: "VP Engineering", note: "Runtime + agent orchestration." },
  { name: "Elena Ruiz", role: "Head of Trust", note: "Enterprise security, ex-Cloudflare." },
  { name: "Priya Nair", role: "Chief of Staff", note: "Scaling ops 20 → 200." },
];

const values = [
  { icon: Compass, title: "Clarity over cleverness", body: "The interface is the argument. Ship the calm version." },
  { icon: HeartHandshake, title: "Trust is the product", body: "Private-by-default, audit-first, no dark patterns." },
  { icon: Sparkles, title: "Craft is compounding", body: "Small daily lifts in taste and rigor beat quarterly heroics." },
];

export default function Team() {
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
      title="Team — Rivinity Labs"
      description="The researchers, designers, and engineers building the Intelligence Operating System — and the principles that shape how we work."
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
            Our Team
          </div>
          <h1
            ref={headlineRef}
            style={{ opacity: 0, transform: "translateY(24px)" }}
            className="text-[44px] sm:text-[60px] lg:text-[76px] font-semibold tracking-tight leading-[0.98]"
          >
            The people behind
            <br />
            <span className="gradient-accent-text">Rivinity.</span>
          </h1>
          <p
            ref={subtextRef}
            style={{ opacity: 0, transform: "translateY(24px)" }}
            className="mt-5 text-[15px] lg:text-[17px] text-foreground/65 leading-relaxed max-w-2xl"
          >
            A distributed team across 14 countries — researchers, systems engineers, designers, and operators building the calm workspace for AI.
          </p>
        </div>

        <FlowDivider className="mt-16" />
      </section>

      <Section eyebrow="Leadership" title={<>The people we <span className="gradient-accent-text">answer to.</span></>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {leadership.map((p) => (
            <div key={p.name} className="glass border border-glass rounded-2xl p-6 hover:border-[hsl(var(--glass-border-hover))] transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FD881F]/25 via-[#F5A9D0]/25 to-[#BFA7F8]/25 flex items-center justify-center text-[15px] font-semibold text-foreground/80">
                {p.name.split(" ").map((s) => s[0]).join("")}
              </div>
              <div className="mt-4 text-[15.5px] font-semibold">{p.name}</div>
              <div className="text-[13px] text-foreground/70">{p.role}</div>
              <p className="mt-2 text-[12.5px] text-foreground/55 leading-relaxed">{p.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="How we work" title={<>Three values that <span className="gradient-accent-text">actually decide things.</span></>}>
        <FeatureGrid items={values} cols={3} />
      </Section>

      <CtaSection
        eyebrow="Careers"
        title="Build the Intelligence OS with us."
        gradientTail="We're hiring across every studio."
        primary={{ label: "Open roles", href: "/roles" }}
        secondary={{ label: "About Rivinity", href: "/about" }}
      />
    </MarketingLayout>
  );
}