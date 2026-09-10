import { Activity, CheckCircle2, AlertTriangle, MinusCircle } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import Section from "@/components/marketing/Section";
import StatsRow from "@/components/marketing/StatsRow";
import CtaSection from "@/components/marketing/CtaSection";
import { Badge } from "@/components/ui/badge";

const services = [
  { name: "API — us-east-1", status: "operational" },
  { name: "API — eu-west-1", status: "operational" },
  { name: "API — ap-southeast-1", status: "degraded" },
  { name: "Studio · Image", status: "operational" },
  { name: "Studio · Video", status: "operational" },
  { name: "Agents runtime", status: "operational" },
  { name: "Retrieval index", status: "operational" },
  { name: "Webhooks delivery", status: "operational" },
  { name: "Dashboard", status: "operational" },
  { name: "Auth / SSO", status: "operational" },
];

function bar(i: number) {
  if ([12, 41].includes(i)) return "bg-[hsl(22_90%_60%)]";
  if (i === 68) return "bg-yellow-500";
  return "bg-emerald-500/80";
}

const StatusPill = ({ s }: { s: string }) => {
  if (s === "operational") return <Badge className="bg-emerald-500/15 text-emerald-500 border border-emerald-500/20"><CheckCircle2 className="w-3 h-3 mr-1" />Operational</Badge>;
  if (s === "degraded") return <Badge className="bg-yellow-500/15 text-yellow-500 border border-yellow-500/20"><AlertTriangle className="w-3 h-3 mr-1" />Degraded</Badge>;
  return <Badge className="bg-foreground/10 text-foreground/70"><MinusCircle className="w-3 h-3 mr-1" />Maintenance</Badge>;
};

export default function Status() {
  return (
    <MarketingLayout title="Status — Rivinity" description="Live availability, incident history and scheduled maintenance for the Rivinity platform.">
      <PageHero
        eyebrow="System Status"
        title="All systems"
        gradientTail="operational."
        subtitle="Real-time availability across every Rivinity surface. Subscribe to updates by email, RSS or webhook."
        meta={<StatsRow stats={[
          { value: "99.98%", label: "90-day uptime", sub: "All regions combined" },
          { value: "2", label: "Open incidents", sub: "Investigating" },
          { value: "< 4m", label: "Median MTTA", sub: "Trailing quarter" },
          { value: "< 42m", label: "Median MTTR", sub: "Trailing quarter" },
        ]} />}
      />

      <Section eyebrow="Live status" title={<>Every surface, right now.</>}>
        <div className="glass border border-glass rounded-3xl divide-y divide-glass overflow-hidden">
          {services.map((s) => (
            <div key={s.name} className="grid md:grid-cols-[1fr_auto_180px] items-center gap-4 px-6 py-4">
              <div className="text-[14px] font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-foreground/50" />
                {s.name}
              </div>
              <div className="flex items-end gap-[3px]">
                {Array.from({ length: 90 }).map((_, i) => (
                  <div key={i} className={`h-6 w-[3px] rounded-sm ${bar(i)}`} />
                ))}
              </div>
              <div className="md:text-right"><StatusPill s={s.status} /></div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Active incidents" title={<>Being investigated.</>} divider>
        <div className="glass border border-glass rounded-2xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-[15px] font-semibold">Elevated latency in ap-southeast-1</span>
            </div>
            <Badge variant="secondary">Investigating · started 34m ago</Badge>
          </div>
          <p className="mt-3 text-[13px] text-foreground/70">Requests originating from Singapore are experiencing +180ms latency due to an upstream carrier issue. Traffic is being progressively routed via Tokyo.</p>
          <ol className="mt-5 space-y-3 text-[13px]">
            <li className="flex gap-3"><span className="text-foreground/45 tabular-nums w-16">14:22</span><span>Failover to Tokyo region initiated for 30% of traffic.</span></li>
            <li className="flex gap-3"><span className="text-foreground/45 tabular-nums w-16">14:04</span><span>Identified upstream network provider incident. Working with vendor.</span></li>
            <li className="flex gap-3"><span className="text-foreground/45 tabular-nums w-16">13:48</span><span>Investigating elevated p95 latency reports from ap-southeast-1.</span></li>
          </ol>
        </div>
      </Section>

      <Section eyebrow="Incident history" title={<>Last 30 days.</>}>
        <div className="glass border border-glass rounded-3xl divide-y divide-glass overflow-hidden">
          {[
            { d: "Jul 05", t: "Studio · Video queue backed up", s: "Resolved · 28m" },
            { d: "Jun 22", t: "Auth intermittent 500s during rotation", s: "Resolved · 12m" },
            { d: "Jun 09", t: "Retrieval slow queries after index rebuild", s: "Resolved · 51m" },
            { d: "May 30", t: "Webhook delivery delays", s: "Resolved · 3h 04m" },
          ].map((i) => (
            <a key={i.t} href="#" className="grid md:grid-cols-[80px_1fr_auto] items-center gap-4 px-6 py-4 hover:bg-accent/40 transition-colors">
              <span className="text-[12px] text-foreground/50 tabular-nums">{i.d}</span>
              <span className="text-[14px] font-medium">{i.t}</span>
              <Badge variant="secondary" className="w-max">{i.s}</Badge>
            </a>
          ))}
        </div>
      </Section>

      <Section eyebrow="Scheduled maintenance" title={<>Planned windows.</>} divider>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { d: "Jul 12, 02:00 UTC", t: "Retrieval index migration", b: "One hour window. Reads unaffected, writes queued." },
            { d: "Jul 19, 03:00 UTC", t: "Auth key rotation", b: "Zero downtime expected. Long-lived sessions unaffected." },
          ].map((m) => (
            <div key={m.t} className="glass border border-glass rounded-2xl p-6">
              <div className="text-[12px] uppercase tracking-[0.16em] text-foreground/50">{m.d}</div>
              <div className="mt-2 text-[15px] font-semibold">{m.t}</div>
              <p className="mt-2 text-[13px] text-foreground/65">{m.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection eyebrow="Stay informed" title="Subscribe to real-time" gradientTail="incident updates." primary={{ label: "Subscribe by email", href: "mailto:status@rivinity.ai" }} secondary={{ label: "Trust Center", href: "/trust" }} />
    </MarketingLayout>
  );
}
