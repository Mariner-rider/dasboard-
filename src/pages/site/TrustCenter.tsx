import { Activity, AlertCircle, CheckCircle2, Cloud, Database, FileLock2, Fingerprint, Globe2, Landmark, ScrollText, Server, ShieldCheck } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import Section from "@/components/marketing/Section";
import StatsRow from "@/components/marketing/StatsRow";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import FaqSection from "@/components/marketing/FaqSection";
import CtaSection from "@/components/marketing/CtaSection";
import { Badge } from "@/components/ui/badge";

export default function TrustCenter() {
  return (
    <MarketingLayout
      title="Trust Center — Rivinity"
      description="Security, privacy and compliance for the Rivinity Intelligence Operating System. Maintained by Rivinity Labs."
    >
      <PageHero
        eyebrow="Trust Center"
        title="Trust, built into"
        gradientTail="the operating system."
        subtitle="This page is maintained by Rivinity Labs to answer common security, privacy, and compliance questions about the Rivinity platform. It reflects controls currently enabled in production."
        meta={
          <StatsRow
            stats={[
              { value: "SOC 2", label: "Type II in progress", sub: "Report expected Q4 2026" },
              { value: "GDPR", label: "Ready", sub: "EU data residency" },
              { value: "99.98%", label: "Trailing uptime", sub: "Last 90 days" },
              { value: "24/7", label: "Security on-call", sub: "Global rotation" },
            ]}
          />
        }
      />

      <Section eyebrow="Shared responsibility" title={<>How trust is divided.</>} kicker="Rivinity operates the platform. You configure your workspace. Together we keep customer data safe.">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Rivinity platform", b: "Infrastructure, model hosting, encryption, incident response, patching, and network isolation." },
            { t: "You, as admin", b: "Workspace configuration, SSO enforcement, member roles, data retention policies, and access reviews." },
            { t: "Your end users", b: "Strong authentication, careful sharing, and reporting anything that looks wrong to your admin." },
          ].map((c) => (
            <div key={c.t} className="glass border border-glass rounded-2xl p-6">
              <div className="text-[16px] font-semibold">{c.t}</div>
              <p className="mt-2 text-[13.5px] text-foreground/65 leading-relaxed">{c.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Security architecture" title={<>Controls enabled by default.</>} divider>
        <FeatureGrid
          items={[
            { icon: FileLock2, title: "Encryption everywhere", body: "TLS 1.3 in transit. AES-256 at rest. Per-tenant envelope keys managed in a hardware KMS." },
            { icon: Fingerprint, title: "SSO / SCIM", body: "SAML 2.0 SSO with Okta, Azure AD, JumpCloud and Google. SCIM provisioning for user lifecycle." },
            { icon: ShieldCheck, title: "Zero-trust network", body: "Every request is authenticated at the edge. Service-to-service mTLS with short-lived certs." },
            { icon: ScrollText, title: "Audit logs", body: "Immutable, tamper-evident audit trail. Streamable to S3, GCS, Splunk and Datadog." },
            { icon: Server, title: "Private inference", body: "Optional dedicated capacity. Requests never leave your region and never train shared models." },
            { icon: Database, title: "Data minimization", body: "Prompts and outputs are retained only for the duration you configure. Zero-retention mode available." },
          ]}
        />
      </Section>

      <Section eyebrow="Infrastructure" title={<>Where Rivinity runs.</>}>
        <div className="glass border border-glass rounded-3xl p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Cloud className="w-5 h-5 text-foreground/70" />
              <div className="mt-3 text-[15px] font-semibold">Multi-cloud</div>
              <p className="mt-2 text-[13px] text-foreground/65">Production on AWS us-east-1, us-west-2, eu-west-1 and GCP europe-west4. Active-active with automated failover.</p>
            </div>
            <div>
              <Globe2 className="w-5 h-5 text-foreground/70" />
              <div className="mt-3 text-[15px] font-semibold">Regional residency</div>
              <p className="mt-2 text-[13px] text-foreground/65">Choose US, EU or UK residency at workspace creation. Data does not leave your chosen region.</p>
            </div>
            <div>
              <Activity className="w-5 h-5 text-foreground/70" />
              <div className="mt-3 text-[15px] font-semibold">Continuous verification</div>
              <p className="mt-2 text-[13px] text-foreground/65">Config drift detection, SBOM tracking and daily image scanning across every production service.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Compliance" title={<>Programs in progress.</>} kicker="We describe controls we operate today. Certifications are marked with their current status. This page is not an independent verification.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { t: "SOC 2 Type II", s: "In progress · Q4 2026", d: "Auditor engaged, controls tested." },
            { t: "ISO 27001", s: "On roadmap · 2027", d: "Framework mapped, gap assessment underway." },
            { t: "GDPR", s: "Ready", d: "DPA available, EU residency, data-subject workflows." },
            { t: "HIPAA", s: "Available on Enterprise", d: "BAA supported for eligible workspaces." },
          ].map((c) => (
            <div key={c.t} className="glass border border-glass rounded-2xl p-5">
              <Landmark className="w-4 h-4 text-foreground/60" />
              <div className="mt-3 text-[14px] font-semibold">{c.t}</div>
              <Badge variant="secondary" className="mt-2 text-[10.5px]">{c.s}</Badge>
              <p className="mt-3 text-[12.5px] text-foreground/60">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Responsible AI" title={<>Alignment as engineering, not policy.</>} divider>
        <FeatureGrid
          cols={3}
          items={[
            { icon: ShieldCheck, title: "Model evaluations", body: "Every model runs a harm eval before production. Results are logged and reviewed monthly." },
            { icon: ScrollText, title: "Content classifiers", body: "Layered classifiers for CSAM, self-harm, and abuse. Human-reviewed appeals within 24h." },
            { icon: Fingerprint, title: "Provenance", body: "Signed manifests for every image and video generation. C2PA support ships this quarter." },
          ]}
        />
      </Section>

      <Section eyebrow="Data privacy" title={<>Your data, your rules.</>}>
        <div className="glass border border-glass rounded-3xl p-6 md:p-8 grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-[16px] font-semibold">What we collect</div>
            <ul className="mt-3 space-y-2 text-[13px] text-foreground/70">
              <li>• Account information you provide.</li>
              <li>• Prompts and outputs, retained per your policy.</li>
              <li>• Product telemetry, aggregated and de-identified.</li>
            </ul>
          </div>
          <div>
            <div className="text-[16px] font-semibold">What we never do</div>
            <ul className="mt-3 space-y-2 text-[13px] text-foreground/70">
              <li>• Train shared models on customer prompts.</li>
              <li>• Sell customer data to third parties.</li>
              <li>• Access workspace content without a signed support request.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Availability" title={<>90-day uptime.</>}>
        <div className="glass border border-glass rounded-3xl p-6 md:p-8">
          <div className="flex flex-wrap items-end gap-1">
            {Array.from({ length: 90 }).map((_, i) => {
              const bad = [17, 42, 68].includes(i);
              return (
                <div
                  key={i}
                  className={`h-9 w-[3.6px] rounded-sm ${bad ? "bg-[hsl(22_90%_60%)]" : "bg-emerald-500/70"}`}
                  title={`Day -${89 - i}`}
                />
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-[12.5px] text-foreground/60">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 87 fully operational days</span>
            <span className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-[hsl(22_90%_60%)]" /> 3 partial incidents</span>
            <a href="/status" className="ml-auto text-foreground underline underline-offset-4">Live status →</a>
          </div>
        </div>
      </Section>

      <Section eyebrow="Incident history" title={<>Transparent post-mortems.</>} divider>
        <div className="glass border border-glass rounded-3xl divide-y divide-glass overflow-hidden">
          {[
            { d: "May 12, 2026", t: "Elevated latency in eu-west-1", s: "Resolved · 42m", r: "Model routing fell back to secondary provider. Post-mortem published." },
            { d: "Apr 03, 2026", t: "Studio image renders queued", s: "Resolved · 1h 08m", r: "A capacity provisioning race delayed new render jobs. Backfilled without loss." },
            { d: "Feb 21, 2026", t: "Audit log delivery delayed", s: "Resolved · 3h", r: "Downstream S3 delivery retried automatically once the outage resolved upstream." },
          ].map((i) => (
            <a key={i.t} href="#" className="block px-6 py-5 hover:bg-accent/40 transition-colors">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[12px] text-foreground/50 tabular-nums w-28">{i.d}</span>
                <span className="text-[14.5px] font-medium flex-1">{i.t}</span>
                <Badge variant="secondary" className="text-[10.5px]">{i.s}</Badge>
              </div>
              <p className="mt-2 text-[12.5px] text-foreground/60">{i.r}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title={<>Security & trust, common questions.</>}>
        <FaqSection faqs={[
          { q: "Do you train on my prompts?", a: "No. Customer prompts and outputs are never used to train shared models. You can request zero-retention mode for even stricter handling." },
          { q: "Where is my data stored?", a: "You choose US, EU or UK residency at workspace creation. Data does not leave your region except for optional integrations you configure." },
          { q: "How do I report a vulnerability?", a: "Email security@rivinity.ai with a PGP-signed disclosure. Our public key is published on this page. We respond within eight hours." },
          { q: "Do you support BYO keys?", a: "Yes. Enterprise workspaces can bring their own KMS keys for at-rest encryption and revoke them at any time." },
          { q: "Can I get a copy of your SOC 2 report?", a: "The Type II report will be available on request after our Q4 2026 audit closes. Contact enterprise@rivinity.ai to be added to the distribution list." },
        ]} />
      </Section>

      <CtaSection
        eyebrow="Need a deeper review?"
        title="Talk to our trust team"
        gradientTail="one on one."
        subtitle="Security questionnaires, custom DPAs, or a private architecture walkthrough — we make it easy."
        primary={{ label: "Contact trust", href: "mailto:security@rivinity.ai" }}
        secondary={{ label: "Read Privacy", href: "/privacy" }}
      />
    </MarketingLayout>
  );
}
