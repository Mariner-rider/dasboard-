import { ArrowRight, BookOpen, Boxes, Cpu, Code2, Database, Rocket, Search, Terminal, Wand2, Workflow, Zap } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import Section from "@/components/marketing/Section";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import CtaSection from "@/components/marketing/CtaSection";
import MagneticButton from "@/components/landing/MagneticButton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const guides = [
  { icon: Rocket, title: "Quickstart", body: "Ship your first Rivinity request in under three minutes.", tag: "5 min" },
  { icon: Wand2, title: "Prompting the OS", body: "Patterns and anti-patterns for talking to Rivinity effectively.", tag: "12 min" },
  { icon: Workflow, title: "Building an agent", body: "Compose tools, memory and evals into a production-grade agent.", tag: "20 min" },
  { icon: Database, title: "Connecting your data", body: "Ground the OS on your knowledge with structured and unstructured sources.", tag: "15 min" },
  { icon: Code2, title: "Streaming responses", body: "Server-sent events, backpressure, and cancellation on the wire.", tag: "10 min" },
  { icon: Boxes, title: "Deploying to production", body: "Environments, quotas, canary rollouts and rollback strategies.", tag: "18 min" },
];

const products = [
  { title: "Runtime", d: "The kernel that routes requests across models and tools.", icon: Cpu },
  { title: "Studio", d: "Image, video, and audio generation surfaces.", icon: Wand2 },
  { title: "Agents", d: "Long-running, memory-aware autonomous workflows.", icon: Workflow },
  { title: "Retrieval", d: "Structured and unstructured knowledge grounding.", icon: Database },
  { title: "Evals", d: "Automated and human-in-the-loop evaluation harness.", icon: Zap },
  { title: "CLI", d: "The command-line for the Intelligence Operating System.", icon: Terminal },
];

export default function Documentation() {
  return (
    <MarketingLayout title="Documentation — Rivinity" description="Guides, tutorials and API reference for the Rivinity Intelligence Operating System.">
      <PageHero
        eyebrow="Documentation"
        title="Learn the"
        gradientTail="Intelligence Operating System."
        subtitle="Task-oriented guides, deep dives, and reference material. Start with the quickstart, then build the thing you actually came here to build."
        actions={
          <>
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <Input placeholder="Search docs…" className="pl-9 h-11" />
            </div>
            <MagneticButton href="/api" className="cta-pill">
              API Reference <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </>
        }
      />

      <Section eyebrow="Start here" title={<>Three minutes to first request.</>}>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { n: "1", t: "Install the SDK", c: "npm install @rivinity/sdk" },
            { n: "2", t: "Set your API key", c: "export RIVINITY_API_KEY=…" },
            { n: "3", t: "Send your first request", c: "rv chat \"Summarize the Q2 report\"" },
          ].map((s) => (
            <div key={s.n} className="glass border border-glass rounded-2xl p-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">Step {s.n}</div>
              <div className="mt-2 text-[16px] font-semibold">{s.t}</div>
              <pre className="mt-4 rounded-xl bg-[hsl(230_25%_10%)] text-white/85 text-[12.5px] px-4 py-3 overflow-x-auto"><code>{s.c}</code></pre>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Guides" title={<>Read the essentials.</>} divider>
        <FeatureGrid items={guides.map((g) => ({ icon: g.icon, title: g.title, body: g.body }))} />
        <div className="mt-4 flex flex-wrap gap-2 text-[11.5px] text-foreground/50">
          {guides.map((g) => <Badge key={g.title} variant="secondary">{g.tag}</Badge>)}
        </div>
      </Section>

      <Section eyebrow="By product" title={<>Documentation, per surface.</>}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((p) => (
            <a key={p.title} href="#" className="group glass border border-glass rounded-2xl p-6 hover:border-[hsl(var(--glass-border-hover))] transition-colors">
              <p.icon className="w-5 h-5 text-foreground/70" />
              <div className="mt-4 flex items-center justify-between">
                <div className="text-[15px] font-semibold">{p.title}</div>
                <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="mt-2 text-[13px] text-foreground/65">{p.d}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section eyebrow="Recipes" title={<>Copy, paste, ship.</>} divider>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { t: "Chat with tool-use", c: `const res = await rv.chat({\n  input: "Book me a flight",\n  tools: [flights, calendar],\n});` },
            { t: "Stream an agent", c: `for await (const chunk of rv.agents.run(id)) {\n  console.log(chunk.event, chunk.data);\n}` },
            { t: "Generate an image", c: `const image = await rv.studio.image({\n  prompt: "aurora over glass mountain",\n  size: "1536x1024",\n});` },
            { t: "Ground on your data", c: `await rv.retrieval.index({\n  source: "s3://docs/*.pdf",\n  index: "handbook",\n});` },
          ].map((r) => (
            <div key={r.t} className="glass border border-glass rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-glass text-[13px] font-medium">{r.t}</div>
              <pre className="bg-[hsl(230_25%_10%)] text-white/85 text-[12.5px] px-5 py-4 overflow-x-auto"><code>{r.c}</code></pre>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Learn deeper" title={<>Design patterns.</>}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { t: "Memory hierarchies", d: "Working, episodic and semantic memory in one runtime." },
            { t: "Adaptive routing", d: "Let the runtime pick the model at token granularity." },
            { t: "Eval-driven prompts", d: "Ship prompts like you ship code — with tests." },
            { t: "Safe tool execution", d: "Sandboxes, allowlists and per-tenant secrets." },
          ].map((c) => (
            <div key={c.t} className="glass border border-glass rounded-2xl p-5">
              <BookOpen className="w-4 h-4 text-foreground/60" />
              <div className="mt-3 text-[14.5px] font-semibold">{c.t}</div>
              <p className="mt-2 text-[12.5px] text-foreground/60">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection eyebrow="API-first" title="Every surface has" gradientTail="a documented endpoint." primary={{ label: "Open API reference", href: "/api" }} secondary={{ label: "Talk to DevRel", href: "/contact" }} />
    </MarketingLayout>
  );
}
