import { ArrowRight, Book, Bug, HeartHandshake, LifeBuoy, MessageCircle, MessagesSquare, Search, ShieldCheck, Sparkles, Timer, Users2 } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import Section from "@/components/marketing/Section";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import FaqSection from "@/components/marketing/FaqSection";
import CtaSection from "@/components/marketing/CtaSection";
import StatsRow from "@/components/marketing/StatsRow";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Support() {
  return (
    <MarketingLayout title="Support — Rivinity" description="Help center, guides, and human support for the Rivinity platform.">
      <PageHero
        eyebrow="Support"
        title="Help, from"
        gradientTail="actual humans."
        subtitle="Search the help center or open a conversation. Business and Enterprise plans include 24/7 coverage from engineers who ship the product."
        actions={
          <div className="relative w-full sm:w-[520px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input placeholder="How do I connect a data source?" className="pl-11 h-12 text-[14px]" />
          </div>
        }
        meta={<StatsRow stats={[
          { value: "< 4h", label: "Median first reply", sub: "All plans" },
          { value: "24/7", label: "Coverage", sub: "Business & Enterprise" },
          { value: "97%", label: "One-touch resolution", sub: "Trailing quarter" },
          { value: "98%", label: "CSAT", sub: "Trailing quarter" },
        ]} />}
      />

      <Section eyebrow="Ways to get help" title={<>Pick a lane.</>}>
        <FeatureGrid cols={4} items={[
          { icon: Book, title: "Help center", body: "Task-oriented articles for every product surface." },
          { icon: MessagesSquare, title: "Community", body: "12,000 builders in the Rivinity Discord." },
          { icon: MessageCircle, title: "Contact support", body: "Open a ticket with the team. First reply within four hours." },
          { icon: LifeBuoy, title: "Enterprise pager", body: "P1 pager access included on Enterprise plans." },
        ]} />
      </Section>

      <Section eyebrow="Popular topics" title={<>Where most conversations start.</>} divider>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            "Getting started with the SDK",
            "Setting up SSO with Okta",
            "Connecting a Postgres data source",
            "Understanding usage & billing",
            "Signing your first agent",
            "Migrating from another provider",
            "Handling long-context requests",
            "Streaming responses over SSE",
            "Rate limits and quotas",
          ].map((t) => (
            <a key={t} href="#" className="group glass border border-glass rounded-2xl p-5 flex items-center justify-between hover:border-[hsl(var(--glass-border-hover))] transition-colors">
              <span className="text-[13.5px]">{t}</span>
              <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:translate-x-0.5 transition-transform" />
            </a>
          ))}
        </div>
      </Section>

      <Section eyebrow="Plans" title={<>What's included with each plan.</>}>
        <div className="glass border border-glass rounded-3xl overflow-hidden">
          <div className="grid grid-cols-4 px-6 py-3 text-[11px] uppercase tracking-[0.14em] text-foreground/50 border-b border-glass">
            <div>Plan</div><div>Channels</div><div>Coverage</div><div className="text-right">First reply</div>
          </div>
          {[
            { p: "Free", c: "Community, Help center", cov: "Best effort", r: "48h" },
            { p: "Pro", c: "Email, Community", cov: "Business hours", r: "12h" },
            { p: "Business", c: "Email, Chat, Community", cov: "24/7", r: "4h" },
            { p: "Enterprise", c: "Chat, Slack Connect, Pager", cov: "24/7 with named CSM", r: "30m" },
          ].map((r) => (
            <div key={r.p} className="grid grid-cols-4 px-6 py-4 border-b border-glass last:border-0 text-[13px]">
              <div className="font-medium">{r.p}</div>
              <div className="text-foreground/70">{r.c}</div>
              <div className="text-foreground/70 flex items-center gap-1.5"><Timer className="w-3.5 h-3.5" />{r.cov}</div>
              <div className="text-right text-foreground/70">{r.r}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Programs" title={<>Beyond tickets.</>} divider>
        <FeatureGrid cols={3} items={[
          { icon: Users2, title: "Named CSM", body: "Enterprise workspaces get a dedicated Customer Success Manager and a technical account contact." },
          { icon: Sparkles, title: "Solutions engineering", body: "Architecture reviews, migration planning and joint prototypes for strategic customers." },
          { icon: ShieldCheck, title: "Security escalation", body: "Direct path to the security on-call for vulnerabilities and incident coordination." },
          { icon: HeartHandshake, title: "Onboarding", body: "Two-week guided onboarding for Business+ workspaces, including a live workshop." },
          { icon: Bug, title: "Bug bounty", body: "Public bounty program for eligible vulnerabilities, hosted with HackerOne." },
          { icon: MessagesSquare, title: "Community", body: "Discord and Forum, moderated by Rivinauts. Weekly office hours with the product team." },
        ]} />
      </Section>

      <Section eyebrow="FAQ" title={<>Fast answers.</>}>
        <FaqSection faqs={[
          { q: "How do I open a ticket?", a: "Sign in and click 'Help' from any product surface, or write to support@rivinity.ai." },
          { q: "Do you have phone support?", a: "Enterprise customers get a 24/7 P1 pager. All other plans use email, chat and community channels." },
          { q: "How do I request a feature?", a: "Post it in the Community, or send it via the support form and mark it as 'Feature request'. We triage weekly." },
          { q: "Can I get help migrating?", a: "Yes. Business+ plans include migration assistance from a solutions engineer at no extra cost." },
          { q: "How do I report an outage?", a: "Check status.rivinity.ai first. If it's not listed, page us via support@rivinity.ai and we will acknowledge within four hours." },
        ]} />
      </Section>

      <CtaSection eyebrow="Still stuck?" title="Talk to a human" gradientTail="right now." primary={{ label: "Contact support", href: "mailto:support@rivinity.ai" }} secondary={{ label: "Read the docs", href: "/docs" }} />
    </MarketingLayout>
  );
}
