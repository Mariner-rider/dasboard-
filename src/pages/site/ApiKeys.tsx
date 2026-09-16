import { ArrowRight, Key, Shield, Terminal, Copy, Lock, Activity, AlertTriangle } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import Section from "@/components/marketing/Section";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import CtaSection from "@/components/marketing/CtaSection";
import MagneticButton from "@/components/landing/MagneticButton";

const capabilities = [
  { icon: Key, title: "Scoped keys", body: "Per-workspace, per-project, per-environment. Rotate or revoke without downtime." },
  { icon: Shield, title: "Least-privilege by default", body: "Every key opts into the exact modules and resources it needs. Nothing more." },
  { icon: Activity, title: "Full audit trail", body: "Every call is logged with actor, IP, and route — exportable to your SIEM." },
  { icon: Lock, title: "Secrets, not in code", body: "Store keys in the Rivinity Secrets Vault or your existing secret manager." },
];

const scopes = [
  { name: "chat.read", desc: "Read chat threads and messages" },
  { name: "chat.write", desc: "Send prompts and receive completions" },
  { name: "agents.invoke", desc: "Run agents defined in Agent Playground" },
  { name: "studio.audio", desc: "TTS, STT, and voice-cloning endpoints" },
  { name: "studio.image", desc: "Image enhance, upscale, and edit" },
  { name: "studio.video", desc: "Prompt-to-video generation" },
  { name: "research.read", desc: "Query the research + trends corpus" },
  { name: "workspace.admin", desc: "Manage members, roles, and billing" },
];

export default function ApiKeys() {
  return (
    <MarketingLayout
      title="API Keys — Rivinity"
      description="Scoped, audited, revocable API keys for every Rivinity module. Least-privilege by default, with a full audit trail exportable to your SIEM."
    >
      <PageHero
        eyebrow="Developers · API Keys"
        title="One key model,"
        gradientTail="every Rivinity surface."
        subtitle="Scoped keys with a full audit trail. Rotate, revoke, and observe every call — from a first prototype to a production deployment."
        actions={
          <>
            <MagneticButton href="/app" className="cta-pill">
              Create a key <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>
            <MagneticButton
              href="/docs"
              className="inline-flex items-center h-11 px-5 rounded-full glass border border-glass text-[13px] font-medium hover:bg-accent/60 transition-colors"
            >
              Read the docs
            </MagneticButton>
          </>
        }
      />

      <Section eyebrow="Capabilities" title={<>Keys built for <span className="gradient-accent-text">production.</span></>}>
        <FeatureGrid items={capabilities} cols={4} />
      </Section>

      <Section eyebrow="Quickstart" title={<>Auth in <span className="gradient-accent-text">one header.</span></>}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="glass border border-glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-glass">
              <div className="flex items-center gap-2 text-[12px] font-medium text-foreground/70">
                <Terminal className="w-3.5 h-3.5" /> curl
              </div>
              <button
                type="button"
                className="text-[11px] font-medium text-foreground/55 hover:text-foreground inline-flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
            <pre className="p-4 text-[12.5px] leading-relaxed font-mono text-foreground/80 overflow-x-auto">
{`curl https://api.rivinity.dev/v1/chat/completions \\
  -H "Authorization: Bearer $RIVINITY_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "rivinity-core",
    "messages": [{ "role": "user", "content": "Hello" }]
  }'`}
            </pre>
          </div>
          <div className="glass border border-glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-glass">
              <div className="flex items-center gap-2 text-[12px] font-medium text-foreground/70">
                <Terminal className="w-3.5 h-3.5" /> TypeScript
              </div>
              <button
                type="button"
                className="text-[11px] font-medium text-foreground/55 hover:text-foreground inline-flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
            <pre className="p-4 text-[12.5px] leading-relaxed font-mono text-foreground/80 overflow-x-auto">
{`import { Rivinity } from "@rivinity/sdk";

const rv = new Rivinity({
  apiKey: process.env.RIVINITY_API_KEY!,
});

const res = await rv.chat.completions.create({
  model: "rivinity-core",
  messages: [{ role: "user", content: "Hello" }],
});`}
            </pre>
          </div>
        </div>
      </Section>

      <Section eyebrow="Scopes" title={<>Grant exactly <span className="gradient-accent-text">what a key needs.</span></>}>
        <div className="glass border border-glass rounded-2xl overflow-hidden divide-y divide-[hsl(var(--glass-border)/0.6)]">
          {scopes.map((s) => (
            <div key={s.name} className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 px-5 py-3">
              <code className="text-[12.5px] font-mono text-foreground/85">{s.name}</code>
              <div className="text-[12.5px] text-foreground/60">{s.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Safety" title={<>What to do if a key <span className="gradient-accent-text">leaks.</span></>}>
        <div className="glass border border-glass rounded-2xl p-6 flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <div className="text-[13.5px] text-foreground/75 leading-relaxed">
            Rotate the key from your workspace settings — it takes effect immediately. The previous key is revoked and every subsequent call fails auth. Review the audit log to see what was accessed with the compromised credential, and export the trail to your SIEM in one click.
          </div>
        </div>
      </Section>

      <CtaSection
        eyebrow="Get started"
        title="Create your first key."
        gradientTail="Scoped, revocable, in under a minute."
        primary={{ label: "Open workspace", href: "/app" }}
        secondary={{ label: "API reference", href: "/api" }}
      />
    </MarketingLayout>
  );
}