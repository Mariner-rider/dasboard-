import { ArrowRight, Braces, Copy, Key, Lock, ShieldCheck, Terminal, Webhook, Zap } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import Section from "@/components/marketing/Section";
import CtaSection from "@/components/marketing/CtaSection";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import StatsRow from "@/components/marketing/StatsRow";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const endpoints = [
  { m: "POST", p: "/v1/chat", d: "Create a chat completion with optional tools and streaming." },
  { m: "POST", p: "/v1/agents/{id}/run", d: "Start a new run for an existing agent." },
  { m: "GET", p: "/v1/agents/{id}/runs/{run}", d: "Fetch the status and events of a run." },
  { m: "POST", p: "/v1/studio/images", d: "Generate an image with a prompt, size and style." },
  { m: "POST", p: "/v1/studio/video", d: "Generate a short-form video from a text prompt." },
  { m: "POST", p: "/v1/retrieval/index", d: "Create or update a retrieval index from a source." },
  { m: "POST", p: "/v1/retrieval/query", d: "Query an index and return ranked passages." },
  { m: "POST", p: "/v1/embeddings", d: "Return dense embeddings for a batch of inputs." },
  { m: "POST", p: "/v1/audio/tts", d: "Synthesize speech from text with a chosen voice." },
  { m: "POST", p: "/v1/audio/stt", d: "Transcribe audio into text with timestamps." },
  { m: "GET", p: "/v1/models", d: "List models available to your workspace." },
  { m: "GET", p: "/v1/usage", d: "Return usage counts and cost for a period." },
];

const codeSamples: Record<string, string> = {
  curl: `curl https://api.rivinity.ai/v1/chat \\\n  -H "Authorization: Bearer $RIVINITY_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"input":"Summarize the Q2 report","stream":true}'`,
  node: `import Rivinity from "@rivinity/sdk";\nconst rv = new Rivinity();\nconst res = await rv.chat({\n  input: "Summarize the Q2 report",\n  stream: true,\n});`,
  python: `from rivinity import Rivinity\nrv = Rivinity()\nres = rv.chat(\n    input="Summarize the Q2 report",\n    stream=True,\n)`,
  go: `client := rivinity.NewClient()\nres, err := client.Chat(ctx, rivinity.ChatRequest{\n    Input: "Summarize the Q2 report",\n    Stream: true,\n})`,
};

export default function APIReference() {
  return (
    <MarketingLayout title="API Reference — Rivinity" description="REST API and SDK reference for the Rivinity platform.">
      <PageHero
        eyebrow="Developers · API"
        title="A REST API for the"
        gradientTail="Intelligence Operating System."
        subtitle="One base URL. Predictable JSON. Streaming, tool-use and long-running runs, all first-class."
        meta={<StatsRow stats={[
          { value: "v1", label: "Stable", sub: "Semver, no breaking changes without notice" },
          { value: "12", label: "Endpoints", sub: "Chat, Agents, Studio, Retrieval, Audio" },
          { value: "SDKs", label: "TS · Python · Go", sub: "Rust SDK in beta" },
          { value: "99.98%", label: "API uptime", sub: "Last 90 days" },
        ]} />}
      />

      <Section eyebrow="Getting started" title={<>Send your first request.</>}>
        <Tabs defaultValue="curl">
          <TabsList className="glass border border-glass">
            {Object.keys(codeSamples).map((k) => (
              <TabsTrigger key={k} value={k} className="text-[12px] capitalize">{k}</TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(codeSamples).map(([k, v]) => (
            <TabsContent key={k} value={k}>
              <div className="glass border border-glass rounded-2xl overflow-hidden mt-4">
                <div className="flex items-center justify-between px-5 py-3 border-b border-glass">
                  <span className="text-[12px] text-foreground/60">POST /v1/chat</span>
                  <button className="inline-flex items-center gap-1.5 text-[11.5px] text-foreground/60 hover:text-foreground">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </button>
                </div>
                <pre className="bg-[hsl(230_25%_10%)] text-white/85 text-[12.5px] px-5 py-5 overflow-x-auto"><code>{v}</code></pre>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      <Section eyebrow="Endpoints" title={<>Every surface has a URL.</>} divider>
        <div className="glass border border-glass rounded-3xl divide-y divide-glass overflow-hidden">
          {endpoints.map((e) => (
            <a href="#" key={e.p} className="grid grid-cols-[64px_1fr] md:grid-cols-[80px_260px_1fr] items-center gap-4 px-5 md:px-6 py-4 hover:bg-accent/40 transition-colors">
              <Badge variant="secondary" className="w-max font-mono text-[10.5px]">{e.m}</Badge>
              <code className="text-[12.5px] font-mono text-foreground/85">{e.p}</code>
              <span className="hidden md:block text-[12.5px] text-foreground/60">{e.d}</span>
            </a>
          ))}
        </div>
      </Section>

      <Section eyebrow="Foundations" title={<>Consistent across every endpoint.</>}>
        <FeatureGrid items={[
          { icon: Key, title: "Authentication", body: "Bearer tokens over TLS. Per-workspace and per-agent keys, revocable in one click." },
          { icon: ShieldCheck, title: "Rate limits", body: "Adaptive per-workspace limits with clear 429 headers. Enterprise limits are custom." },
          { icon: Braces, title: "JSON everywhere", body: "Predictable JSON, typed SDKs, generated OpenAPI spec at api.rivinity.ai/openapi.json." },
          { icon: Zap, title: "Streaming", body: "Server-sent events on chat, agents and studio. Cancel a run mid-stream with one call." },
          { icon: Webhook, title: "Webhooks", body: "Signed HMAC webhooks for run completions, evals and usage thresholds." },
          { icon: Lock, title: "Idempotency", body: "Idempotency keys on all mutating endpoints prevent duplicate side effects on retry." },
        ]} />
      </Section>

      <Section eyebrow="SDKs" title={<>Client libraries.</>} divider>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { t: "TypeScript", d: "npm i @rivinity/sdk", s: "Stable · v3.2" },
            { t: "Python", d: "pip install rivinity", s: "Stable · v3.2" },
            { t: "Go", d: "go get github.com/rivinity/go", s: "Stable · v1.4" },
            { t: "Rust", d: "cargo add rivinity", s: "Beta · v0.9" },
          ].map((s) => (
            <div key={s.t} className="glass border border-glass rounded-2xl p-6">
              <Terminal className="w-4 h-4 text-foreground/60" />
              <div className="mt-3 text-[15px] font-semibold">{s.t}</div>
              <pre className="mt-3 text-[12px] text-foreground/70 font-mono">{s.d}</pre>
              <Badge variant="secondary" className="mt-3 text-[10.5px]">{s.s}</Badge>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection eyebrow="Talk to DevRel" title="Building something serious?" gradientTail="We'd love to help." primary={{ label: "Contact devrel", href: "mailto:devrel@rivinity.ai" }} secondary={{ label: "Read the docs", href: "/docs" }} />
    </MarketingLayout>
  );
}
