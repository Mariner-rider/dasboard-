import { ArrowRight, CalendarCheck2, CircleDot, Flag, Lightbulb, Rocket } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import Section from "@/components/marketing/Section";
import StatsRow from "@/components/marketing/StatsRow";
import CtaSection from "@/components/marketing/CtaSection";
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    title: "Shipped this quarter",
    icon: CalendarCheck2,
    tone: "text-emerald-500",
    items: [
      { t: "Living routers 2.0", d: "Token-level model selection with 3ms overhead." },
      { t: "Studio · Video", d: "Native short-form video generation with time-aware editing." },
      { t: "Signed agents", d: "Provenance and sandboxing for third-party agents." },
      { t: "SCIM 2.0", d: "Full user lifecycle across Okta, Azure AD and JumpCloud." },
      { t: "EU residency", d: "New eu-west-1 primary with active-active failover." },
    ],
  },
  {
    title: "In progress",
    icon: CircleDot,
    tone: "text-[#FD881F]",
    items: [
      { t: "Rivinity Desktop 1.0", d: "Native macOS and Windows shells with offline drafts." },
      { t: "Long-context 1M tokens", d: "Public preview for eligible workspaces." },
      { t: "Agent marketplace", d: "Discovery, ratings and revenue share for signed agents." },
      { t: "SOC 2 Type II", d: "Auditor engaged, report expected Q4 2026." },
      { t: "Streaming tool-use v2", d: "Backpressure and cancellation across tool calls." },
    ],
  },
  {
    title: "Next",
    icon: Flag,
    tone: "text-[#BFA7F8]",
    items: [
      { t: "Sovereign inference", d: "Customer-managed regions on AWS Outposts and GCP." },
      { t: "Realtime voice mode", d: "Duplex audio with 220ms end-to-end latency." },
      { t: "On-device inference", d: "8B distilled model for laptop-class hardware." },
      { t: "Workflows", d: "Visual composer for multi-step, multi-agent pipelines." },
      { t: "Fine-tuning UI", d: "Guided fine-tuning against your own evals." },
    ],
  },
  {
    title: "Exploring",
    icon: Lightbulb,
    tone: "text-[#F5A9D0]",
    items: [
      { t: "3D generation", d: "Textured meshes ready for Unity and Unreal." },
      { t: "Realtime multi-user canvas", d: "Two-user editing with intent-aware conflict resolution." },
      { t: "Custom silicon", d: "Prototype accelerator for retrieval workloads." },
      { t: "Local retrieval index", d: "Fully-local index for laptop-class datasets." },
    ],
  },
];

export default function Roadmap() {
  return (
    <MarketingLayout title="Roadmap — Rivinity" description="What we shipped, what we're building, and what we're exploring next.">
      <PageHero
        eyebrow="Roadmap"
        title="Built in the open."
        gradientTail="Shipped in the calm."
        subtitle="A living view of what we're working on. Refreshed at the start of every quarter and whenever a milestone lands."
        meta={<StatsRow stats={[
          { value: "Q3 26", label: "Current cycle", sub: "Updated July 8, 2026" },
          { value: "5", label: "Shipped this Q", sub: "Runtime, Studio, Trust" },
          { value: "5", label: "In progress", sub: "Betas open by request" },
          { value: "9", label: "In discovery", sub: "Feedback welcome" },
        ]} />}
      />

      <Section eyebrow="Kanban" title={<>The whole board.</>}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => (
            <div key={col.title} className="glass border border-glass rounded-3xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <col.icon className={`w-4 h-4 ${col.tone}`} />
                <div className="text-[13px] font-semibold">{col.title}</div>
                <Badge variant="secondary" className="ml-auto text-[10.5px]">{col.items.length}</Badge>
              </div>
              <ul className="space-y-3">
                {col.items.map((it) => (
                  <li key={it.t} className="rounded-xl border border-glass bg-background/40 p-4">
                    <div className="text-[13.5px] font-medium">{it.t}</div>
                    <p className="mt-1 text-[12px] text-foreground/60 leading-relaxed">{it.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Quarterly view" title={<>The next four quarters.</>} divider>
        <div className="glass border border-glass rounded-3xl overflow-hidden">
          {[
            { q: "Q3 2026", h: "Runtime & Trust", d: "Long-context 1M, SOC 2 Type II close, streaming tool-use v2, signed agents GA." },
            { q: "Q4 2026", h: "Marketplace & Desktop", d: "Rivinity Desktop 1.0, agent marketplace, revenue share, canary rollout tooling." },
            { q: "Q1 2027", h: "Sovereign & Voice", d: "Sovereign inference regions, realtime voice mode, workflows GA." },
            { q: "Q2 2027", h: "On-device & Fine-tune", d: "8B on-device model, guided fine-tuning UI, per-tenant KMS keys expansion." },
          ].map((r) => (
            <div key={r.q} className="grid md:grid-cols-[120px_180px_1fr] gap-4 items-center px-6 py-5 border-b border-glass last:border-0">
              <div className="text-[12px] uppercase tracking-[0.18em] text-foreground/50">{r.q}</div>
              <div className="text-[15px] font-semibold">{r.h}</div>
              <div className="text-[13px] text-foreground/65">{r.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection eyebrow="Have an idea?" title="The best roadmap items" gradientTail="come from users." primary={{ label: "Request a feature", href: "/support" }} secondary={{ label: "Read the changelog", href: "/blog" }} />
    </MarketingLayout>
  );
}
