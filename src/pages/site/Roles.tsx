import { ArrowRight, Code2, FlaskConical, Palette, Shield, LineChart, Users, MapPin } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import Section from "@/components/marketing/Section";
import StatsRow from "@/components/marketing/StatsRow";
import CtaSection from "@/components/marketing/CtaSection";
import MagneticButton from "@/components/landing/MagneticButton";
import { cn } from "@/lib/utils";

const teamsByArea = [
  { icon: Code2, area: "Engineering" },
  { icon: FlaskConical, area: "Research" },
  { icon: Palette, area: "Design" },
  { icon: Shield, area: "Trust & Security" },
  { icon: LineChart, area: "Go-to-market" },
  { icon: Users, area: "Operations" },
];

const roles = [
  { title: "Staff Engineer, Runtime", team: "Engineering", location: "Remote — Global", type: "Full-time" },
  { title: "Research Scientist, Retrieval", team: "Research", location: "London / Remote", type: "Full-time" },
  { title: "Senior Product Designer, Studios", team: "Design", location: "San Francisco / Remote", type: "Full-time" },
  { title: "Security Engineer, Enterprise", team: "Trust & Security", location: "Remote — Global", type: "Full-time" },
  { title: "Solutions Engineer, EMEA", team: "Go-to-market", location: "London", type: "Full-time" },
  { title: "Developer Advocate", team: "Go-to-market", location: "Remote — Americas", type: "Full-time" },
  { title: "Technical Program Manager, Platform", team: "Operations", location: "Bangalore / Remote", type: "Full-time" },
  { title: "Applied AI Engineer, Agents", team: "Engineering", location: "Remote — Global", type: "Full-time" },
];

export default function Roles() {
  return (
    <MarketingLayout
      title="Open roles — Rivinity Labs"
      description="Every open role at Rivinity — engineering, research, design, security, go-to-market, and operations. Distributed team, calm culture, ambitious work."
    >
      <PageHero
        eyebrow="Careers · Open roles"
        title="Come build the"
        gradientTail="Intelligence OS."
        subtitle="We're a distributed team building a category-defining product. Every role below is open right now — apply directly or refer someone great."
        actions={
          <>
            <MagneticButton href="#roles" className="cta-pill">
              See open roles <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>
            <MagneticButton
              href="/team"
              className="inline-flex items-center h-11 px-5 rounded-full glass border border-glass text-[13px] font-medium hover:bg-accent/60 transition-colors"
            >
              Meet the team
            </MagneticButton>
          </>
        }
        meta={
          <StatsRow
            stats={[
              { value: roles.length.toString(), label: "Open roles", sub: "Across all studios" },
              { value: "6", label: "Teams hiring", sub: "Eng · Research · Design · Trust · GTM · Ops" },
              { value: "Remote", label: "First", sub: "Async by default" },
              { value: "$210M", label: "Series B", sub: "Runway secured" },
            ]}
          />
        }
      />

      <Section eyebrow="Teams" title={<>Where you might <span className="gradient-accent-text">land.</span></>}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {teamsByArea.map((t) => (
            <div key={t.area} className="glass border border-glass rounded-2xl p-4 flex flex-col items-start gap-3 hover:border-[hsl(var(--glass-border-hover))] transition-colors">
              <t.icon className="w-4 h-4 text-foreground/70" strokeWidth={1.75} />
              <div className="text-[12.5px] font-medium">{t.area}</div>
              <div className="text-[11px] text-foreground/50">
                {roles.filter((r) => r.team === t.area).length} open
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section id="roles" className="mx-auto max-w-7xl px-5 lg:px-8 py-16 lg:py-20">
        <div className="mb-8 max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/50 mb-4">All open roles</div>
          <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-tight leading-[1.05]">
            {roles.length} roles across {new Set(roles.map((r) => r.team)).size} teams.
          </h2>
        </div>
        <div className="glass border border-glass rounded-2xl overflow-hidden divide-y divide-[hsl(var(--glass-border)/0.6)]">
          {roles.map((r, i) => (
            <a
              key={r.title}
              href="/contact"
              className={cn(
                "group grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] items-center gap-3 px-5 py-4 hover:bg-foreground/[0.03] transition-colors",
              )}
            >
              <div>
                <div className="text-[14.5px] font-medium">{r.title}</div>
                <div className="text-[11.5px] text-foreground/50 mt-0.5">{r.team}</div>
              </div>
              <div className="text-[12.5px] text-foreground/65 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-foreground/40" /> {r.location}
              </div>
              <div className="text-[12px] text-foreground/55">{r.type}</div>
              <div className="text-[12.5px] font-medium text-foreground/70 flex items-center gap-1 md:justify-end">
                Apply <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <CtaSection
        eyebrow="Don't see your role?"
        title="Tell us what you'd build."
        gradientTail="We hire exceptional people out of cycle."
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "Meet the team", href: "/team" }}
      />
    </MarketingLayout>
  );
}