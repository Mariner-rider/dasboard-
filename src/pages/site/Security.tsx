import { Cpu, Fingerprint, KeyRound, Lock, Network, ScrollText, ServerCog, ShieldCheck, SquareStack, UserCheck } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import Section from "@/components/marketing/Section";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import StatsRow from "@/components/marketing/StatsRow";
import FaqSection from "@/components/marketing/FaqSection";
import CtaSection from "@/components/marketing/CtaSection";
import { Badge } from "@/components/ui/badge";

export default function Security() {
  return (
    <MarketingLayout title="Security — Rivinity" description="A deep dive into the security architecture of the Rivinity Intelligence Operating System.">
      <PageHero
        eyebrow="Security"
        title="Security is not"
        gradientTail="a feature. It's the substrate."
        subtitle="Rivinity is built by engineers who came from banks, browsers and hyperscalers. This page explains how we protect your data, your users and your workspace."
        meta={<StatsRow stats={[
          { value: "AES-256", label: "At rest", sub: "Per-tenant envelope keys" },
          { value: "TLS 1.3", label: "In transit", sub: "PFS required" },
          { value: "mTLS", label: "Service mesh", sub: "Short-lived certs" },
          { value: "SOC 2 II", label: "In progress", sub: "Q4 2026" },
        ]} />}
      />

      <Section eyebrow="Model" title={<>Defense in depth, from silicon to session.</>} kicker="Six layers of isolation. Each one holds even if the layer above fails.">
        <FeatureGrid items={[
          { icon: Network, title: "Network", body: "Private VPCs, no public database endpoints, egress filtered by allowlist." },
          { icon: ServerCog, title: "Compute", body: "Ephemeral, immutable workloads. Every container replaced on every deploy." },
          { icon: Lock, title: "Storage", body: "AES-256 envelope encryption. Per-tenant KEKs rotate every 90 days." },
          { icon: Fingerprint, title: "Identity", body: "SSO required for enterprise. Short-lived tokens, hardware-key MFA for staff." },
          { icon: UserCheck, title: "Access", body: "Least privilege by default. All production access is time-boxed and reviewed." },
          { icon: ScrollText, title: "Audit", body: "Tamper-evident audit log for every admin, agent and API action." },
        ]} />
      </Section>

      <Section eyebrow="People & process" title={<>The controls that operate the system.</>} divider>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { t: "Background checks", b: "All employees pass a background check appropriate to their role and jurisdiction." },
            { t: "Security training", b: "Annual training with quarterly phishing simulations. Failure triggers additional coaching." },
            { t: "Vendor risk", b: "Every subprocessor is reviewed annually. High-risk vendors carry supplemental controls." },
            { t: "Change management", b: "Two-person review for production changes. Emergency changes are post-hoc audited within 48h." },
            { t: "Incident response", b: "Documented runbooks, quarterly tabletop exercises, 24/7 on-call rotation." },
            { t: "Business continuity", b: "Tested DR plans with RPO ≤ 15m and RTO ≤ 60m for tier-0 services." },
          ].map((c) => (
            <div key={c.t} className="glass border border-glass rounded-2xl p-6">
              <div className="text-[15px] font-semibold">{c.t}</div>
              <p className="mt-2 text-[13px] text-foreground/65">{c.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Product controls" title={<>What you can turn on today.</>}>
        <FeatureGrid cols={3} items={[
          { icon: ShieldCheck, title: "SSO enforcement", body: "Require SAML SSO for every member. IdP-initiated and SP-initiated flows." },
          { icon: KeyRound, title: "BYO keys (BYOK)", body: "Bring your own KMS keys. Revoke access at any time from your provider." },
          { icon: SquareStack, title: "Data residency", body: "Pin your workspace to US, EU or UK regions at creation time." },
          { icon: Cpu, title: "Private inference", body: "Optional dedicated capacity. Requests stay inside your region." },
          { icon: Lock, title: "Zero-retention mode", body: "Skip prompt and output retention entirely for compliance-heavy workloads." },
          { icon: ScrollText, title: "Audit streaming", body: "Stream immutable audit logs into S3, GCS, Splunk or Datadog." },
        ]} />
      </Section>

      <Section eyebrow="Vulnerability disclosure" title={<>Report a vulnerability.</>} divider>
        <div className="glass border border-glass rounded-3xl p-8">
          <p className="text-[14px] text-foreground/70 leading-relaxed max-w-3xl">
            We welcome responsible disclosure. Please email <a href="mailto:security@rivinity.ai" className="underline underline-offset-4">security@rivinity.ai</a> with reproduction steps and impact. Our PGP public key fingerprint is <span className="font-mono text-[12.5px]">4F2C 9A1E 33B5 7D01 8E9F · 6C4A B812 5D3E A719 F04B</span>. Median first response is under eight hours.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="secondary">Public bounty via HackerOne</Badge>
            <Badge variant="secondary">Safe harbor for good-faith research</Badge>
            <Badge variant="secondary">Coordinated disclosure timeline</Badge>
          </div>
        </div>
      </Section>

      <Section eyebrow="FAQ" title={<>Security specifics.</>}>
        <FaqSection faqs={[
          { q: "Do you undergo penetration testing?", a: "Yes. Independent penetration tests are performed at least annually and after any material architecture change. Summary reports are available under NDA." },
          { q: "How do you handle secrets?", a: "Secrets are stored in a hardware-backed KMS. Applications receive short-lived credentials via workload identity, never long-lived keys." },
          { q: "Is customer data logically or physically separated?", a: "Logical separation via per-tenant envelope keys. Enterprise workspaces can request physical isolation through dedicated compute." },
          { q: "How is staff access to production controlled?", a: "Production access is JIT, time-boxed to two hours, requires two-person approval, and every session is recorded." },
          { q: "Do you support BYOK?", a: "Yes. Enterprise customers can bring their own KMS keys and revoke access at any moment." },
        ]} />
      </Section>

      <CtaSection eyebrow="Need more depth?" title="Our trust team can walk you through" gradientTail="every control." primary={{ label: "Contact security", href: "mailto:security@rivinity.ai" }} secondary={{ label: "Open Trust Center", href: "/trust" }} />
    </MarketingLayout>
  );
}
