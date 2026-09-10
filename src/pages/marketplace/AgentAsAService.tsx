import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Sparkles,
  Cloud,
  ShieldCheck,
  Zap,
  Headphones,
  FileSearch,
  LineChart,
  Mail,
  Code2,
  Users,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MarketplaceLayout from "@/components/marketplace/MarketplaceLayout";

type Pricing =
  | { model: "Subscription"; price: string; unit: string }
  | { model: "Usage"; price: string; unit: string }
  | { model: "Per seat"; price: string; unit: string }
  | { model: "Free"; price: string; unit: string };

type AgentListing = {
  name: string;
  icon: LucideIcon;
  useCase: string;
  description: string;
  tags: string[];
  pricing: Pricing;
};

const listings: AgentListing[] = [
  {
    name: "SupportPilot",
    icon: Headphones,
    useCase: "Tier-1 customer support",
    description: "Drafts, triages, and resolves inbound tickets across email, chat, and web forms.",
    tags: ["Support", "Zendesk", "Intercom"],
    pricing: { model: "Subscription", price: "$79", unit: "/mo per agent" },
  },
  {
    name: "ResearchScout",
    icon: FileSearch,
    useCase: "Deep research & briefs",
    description: "Runs multi-source web research and returns a cited brief in under 3 minutes.",
    tags: ["Research", "Citations"],
    pricing: { model: "Usage", price: "$0.12", unit: "per run" },
  },
  {
    name: "OpsAnalyst",
    icon: LineChart,
    useCase: "Weekly ops reporting",
    description: "Pulls from your warehouse, writes the narrative, and posts the report to Slack.",
    tags: ["Analytics", "Slack", "BigQuery"],
    pricing: { model: "Subscription", price: "$149", unit: "/mo" },
  },
  {
    name: "InboxTriage",
    icon: Mail,
    useCase: "Executive inbox management",
    description: "Sorts, labels, and drafts replies with your voice — never sends without approval.",
    tags: ["Gmail", "Outlook"],
    pricing: { model: "Per seat", price: "$29", unit: "/mo per user" },
  },
  {
    name: "CodeReviewer",
    icon: Code2,
    useCase: "PR review co-pilot",
    description: "Reviews pull requests for style, security, and regressions with actionable comments.",
    tags: ["GitHub", "GitLab"],
    pricing: { model: "Per seat", price: "$19", unit: "/mo per dev" },
  },
  {
    name: "MeetingScribe",
    icon: Users,
    useCase: "Meeting notes & actions",
    description: "Joins your calls, produces summaries, and pushes action items to your PM tool.",
    tags: ["Zoom", "Meet", "Linear"],
    pricing: { model: "Free", price: "Free", unit: "up to 10 meetings/mo" },
  },
  {
    name: "SalesQualifier",
    icon: Sparkles,
    useCase: "Inbound lead qualification",
    description: "Enriches, scores, and routes leads to the right rep with a warm first-touch reply.",
    tags: ["HubSpot", "Salesforce"],
    pricing: { model: "Usage", price: "$0.35", unit: "per qualified lead" },
  },
  {
    name: "WorkflowRunner",
    icon: Workflow,
    useCase: "Cross-tool automations",
    description: "Chains APIs and internal tools to run repeatable back-office workflows on a schedule.",
    tags: ["Zapier", "REST", "Cron"],
    pricing: { model: "Subscription", price: "$99", unit: "/mo" },
  },
];

const pillars = [
  {
    icon: Cloud,
    title: "Hosted by Rivinity",
    body: "No infra to run. Each agent is managed, observable, and updated by the Rivinity fleet team.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-safe",
    body: "SSO, audit logs, scoped tool access, and regional data residency out of the box.",
  },
  {
    icon: Zap,
    title: "Live in minutes",
    body: "Subscribe, connect your tools, and hand off real work — no code, no fine-tuning required.",
  },
];

const pricingTint: Record<Pricing["model"], string> = {
  Subscription:
    "bg-[hsl(var(--accent-sky)/0.12)] text-[hsl(var(--accent-sky))] border-[hsl(var(--accent-sky)/0.25)]",
  Usage: "bg-foreground/[0.06] text-foreground/80 border-foreground/15",
  "Per seat": "bg-foreground/[0.06] text-foreground/80 border-foreground/15",
  Free: "bg-foreground/[0.10] text-foreground/90 border-foreground/25",
};

const AgentAsAService = () => {
  return (
    <MarketplaceLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        {/* Hero */}
        <section
          data-hero
          className="relative overflow-hidden rounded-3xl glass border border-glass p-8 lg:p-10 mb-8"
        >
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-orange-300/40 via-pink-300/30 to-purple-400/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-12 w-72 h-72 rounded-full bg-gradient-to-tr from-sky-300/30 via-indigo-300/25 to-fuchsia-300/30 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/60 mb-3">
              <Bot className="w-3 h-3" /> Agent as a Service
            </span>
            <h1 className="text-[34px] lg:text-[44px] leading-[1.05] font-semibold tracking-tight">
              Hire a hosted agent, <br />
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                skip building your own.
              </span>
            </h1>
            <p className="text-[14px] text-foreground/65 mt-4 max-w-lg leading-relaxed">
              Subscribe to production-ready AI agents that ship real work — from customer support to
              research to ops reporting. Managed, observable, and safe by default.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                to="/marketplace/c/agents"
                className="h-10 px-5 rounded-full bg-foreground text-background text-[13px] font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Browse full catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/contact"
                className="h-10 px-5 rounded-full glass border border-glass text-[13px] font-medium hover:bg-accent/60 transition-colors flex items-center"
              >
                Talk to sales
              </Link>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-[18px] font-semibold tracking-tight">Why Agent as a Service</h2>
            <p className="text-[12px] text-muted-foreground/70 mt-0.5">
              Everything you'd need to run a fleet of agents — without running one.
            </p>
          </div>
          <div data-reveal-group className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl glass border border-glass p-5 hover:shadow-float transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-300/30 via-pink-300/25 to-purple-300/25 flex items-center justify-center mb-3">
                  <p.icon className="w-4 h-4 text-foreground/80" strokeWidth={1.75} />
                </div>
                <h3 className="text-[14.5px] font-semibold">{p.title}</h3>
                <p className="text-[12.5px] text-muted-foreground/75 leading-snug mt-1.5">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Listings */}
        <section className="mb-10">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-[18px] font-semibold tracking-tight">Available agents</h2>
              <p className="text-[12px] text-muted-foreground/70 mt-0.5">
                A curated slice of the catalog — subscribe or deploy in minutes.
              </p>
            </div>
            <Link
              to="/marketplace/c/agents"
              className="text-[12px] font-medium hover:underline flex items-center gap-1"
            >
              See all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div
            data-reveal-group
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {listings.map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.name}
                  to="/marketplace/c/agents"
                  className="group rounded-2xl glass border border-glass p-5 flex flex-col hover:shadow-float transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-300/30 via-pink-300/25 to-purple-300/25 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-foreground/80" strokeWidth={1.75} />
                    </div>
                    <span
                      className={
                        "inline-flex items-center h-6 px-2.5 rounded-full border text-[11px] font-medium tracking-wide " +
                        pricingTint[a.pricing.model]
                      }
                    >
                      {a.pricing.model}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{a.name}</h3>
                  <p className="text-[11.5px] uppercase tracking-widest text-muted-foreground/70 mt-1">
                    {a.useCase}
                  </p>
                  <p className="mt-3 text-[12.5px] text-muted-foreground/80 leading-snug line-clamp-3">
                    {a.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {a.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10.5px] px-2 h-5 rounded-full bg-accent/50 text-foreground/70 flex items-center"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-5 flex items-center justify-between">
                    <div className="text-[12.5px]">
                      <span className="font-semibold">{a.pricing.price}</span>
                      <span className="text-muted-foreground/70 ml-1">{a.pricing.unit}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-foreground/60 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-10">
          <div className="relative overflow-hidden rounded-3xl glass border border-glass p-8 lg:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-gradient-to-br from-orange-300/30 via-pink-300/25 to-purple-300/25 blur-3xl" />
            <div className="relative max-w-xl">
              <h2 className="text-[22px] lg:text-[26px] font-semibold tracking-tight">
                Browse the full agent catalog.
              </h2>
              <p className="text-[13px] text-foreground/65 mt-2 leading-relaxed">
                Over 80 hosted agents across support, research, ops, growth, and engineering. Deploy in
                minutes, cancel anytime.
              </p>
            </div>
            <div className="relative flex flex-wrap gap-2">
              <Link
                to="/marketplace/c/agents"
                className="h-10 px-5 rounded-full bg-foreground text-background text-[13px] font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                Browse full catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/marketplace/upload"
                className="h-10 px-5 rounded-full glass border border-glass text-[13px] font-medium hover:bg-accent/60 transition-colors flex items-center"
              >
                Publish an agent
              </Link>
            </div>
          </div>
        </section>

        <footer className="text-center py-10 text-[11.5px] text-muted-foreground/60">
          Hosted, observed, and updated by the Rivinity fleet team.
        </footer>
      </div>
    </MarketplaceLayout>
  );
};

export default AgentAsAService;