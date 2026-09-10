import { useMemo, useState } from "react";
import { Rss, Search as SearchIcon, FlaskConical, Newspaper, TrendingUp, Cpu, Sparkles, Megaphone, BookOpen, ArrowUpRight } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import Section from "@/components/marketing/Section";
import CtaSection from "@/components/marketing/CtaSection";
import MagneticButton from "@/components/landing/MagneticButton";
import { Input } from "@/components/ui/input";

type Post = {
  category: string;
  title: string;
  summary: string;
  date: string;
};

// Content moved from the AI Chat page (Latest research / Tech news / AI trends)
// plus existing editorial posts, unified into a single blog index.
const posts: Post[] = [
  // Latest research
  {
    category: "Latest research",
    title: "Chain-of-Agents: routing LLM tools via reinforcement critics",
    summary: "A critic model learns which tool to call next, cutting redundant hops by 34%.",
    date: "Jul 9, 2026",
  },
  {
    category: "Latest research",
    title: "Mixture-of-Depths scales inference 2.3× on frontier models",
    summary: "DeepMind shows selective-depth routing without accuracy loss on frontier evals.",
    date: "Jul 6, 2026",
  },
  {
    category: "Latest research",
    title: "Retrieval-native transformers show 40% factuality lift",
    summary: "Stanford paper trains retrieval into the attention layer rather than bolting it on.",
    date: "Jul 1, 2026",
  },
  // Tech news
  {
    category: "Tech news",
    title: "Apple ships on-device 3B model for Vision OS shortcuts",
    summary: "Fully local inference lands in the Shortcuts app, no network round-trip required.",
    date: "Jul 10, 2026",
  },
  {
    category: "Tech news",
    title: "NVIDIA unveils Rubin R200: 4× throughput vs Blackwell",
    summary: "Next-generation training chip targets trillion-parameter workloads at half the power.",
    date: "Jul 8, 2026",
  },
  {
    category: "Tech news",
    title: "OpenAI opens gateway pricing to enterprise tiers",
    summary: "Volume commits unlock 40% off list, with regional inference guarantees for EU customers.",
    date: "Jul 3, 2026",
  },
  // AI trends
  {
    category: "AI trends",
    title: "Agentic workflows overtake single-prompt usage in production",
    summary: "Multi-step agent runs are up 62% quarter-over-quarter across the Rivinity fleet.",
    date: "Jul 7, 2026",
  },
  {
    category: "AI trends",
    title: "Voice-first interfaces adopted by 41% of new SaaS launches",
    summary: "Founders ship voice as a primary surface — not a bolt-on — for the first time.",
    date: "Jul 4, 2026",
  },
  {
    category: "AI trends",
    title: "On-device inference searches doubled QoQ",
    summary: "Demand for local-first models is compounding as edge silicon catches up to the cloud.",
    date: "Jun 30, 2026",
  },
  // Existing editorial posts, retained
  {
    category: "Engineering",
    title: "Streaming tool calls without breaking the canvas",
    summary: "The rendering pipeline that keeps Rivinity responsive during long tool-use loops.",
    date: "Jun 28, 2026",
  },
  {
    category: "Product",
    title: "Introducing Rivinity Agents 2.0",
    summary: "Signed provenance, sandboxed execution, and a marketplace for verified agents.",
    date: "Jun 15, 2026",
  },
  {
    category: "Announcements",
    title: "Rivinity closes $210M Series B",
    summary: "Led by Sequoia, the capital funds sovereign inference regions across three continents.",
    date: "Jun 4, 2026",
  },
];

const filters = [
  { key: "All", icon: BookOpen },
  { key: "Latest research", icon: FlaskConical },
  { key: "Tech news", icon: Newspaper },
  { key: "AI trends", icon: TrendingUp },
  { key: "Engineering", icon: Cpu },
  { key: "Product", icon: Sparkles },
  { key: "Announcements", icon: Megaphone },
] as const;

export default function Blog() {
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const inCat = active === "All" || p.category === active;
      if (!inCat) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
      );
    });
  }, [active, query]);

  return (
    <MarketingLayout
      title="Blog — Rivinity"
      description="Latest research, tech news, and AI trends from the Rivinity team. Long-form writing about the Intelligence Operating System."
    >
      <PageHero
        eyebrow="Rivinity Journal"
        title="Research, news, and"
        gradientTail="signals we're tracking."
        subtitle="One index for the papers we're reading, the news that moves the field, and the shifts we see across the Rivinity fleet."
        actions={
          <>
            <div className="relative w-full sm:w-96">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                className="pl-9 h-11"
              />
            </div>
            <MagneticButton href="#newsletter" className="cta-pill">
              Get weekly digest <Rss className="w-3.5 h-3.5" />
            </MagneticButton>
          </>
        }
      />

      <Section
        eyebrow="Index"
        title={<>Everything, filterable.</>}
        kicker="Pick a category to narrow the feed. Dates reflect original publish, not last edit."
      >
        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => {
            const isActive = active === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={
                  "inline-flex items-center gap-1.5 h-9 px-4 rounded-full border text-[12.5px] font-medium transition-colors " +
                  (isActive
                    ? "bg-foreground text-background border-foreground"
                    : "glass border-glass text-foreground/70 hover:text-foreground hover:border-[hsl(var(--glass-border-hover))]")
                }
              >
                <f.icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                {f.key}
              </button>
            );
          })}
        </div>

        {/* Editorial index — rule-separated rows, no card chrome. */}
        {visible.length > 0 ? (
          <>
          {(() => {
            const featured = visible[0];
            const rest = visible.slice(1);
            return (
              <div key={active + "|" + query + "|featured"} className="mb-10">
                <a
                  href="#"
                  className="group grid md:grid-cols-5 gap-6 md:gap-8 items-stretch"
                >
                  {/* Featured graphic */}
                  <div className="md:col-span-3 relative overflow-hidden rounded-3xl border border-glass shadow-float aspect-[16/10] md:aspect-auto md:min-h-[280px]">
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(60% 70% at 15% 20%, hsl(245 85% 68% / 0.75), transparent 65%), radial-gradient(55% 65% at 90% 30%, hsl(330 90% 72% / 0.70), transparent 68%), radial-gradient(70% 80% at 60% 100%, hsl(22 95% 70% / 0.60), transparent 70%), linear-gradient(135deg, hsl(245 60% 40%), hsl(280 55% 42%) 55%, hsl(330 65% 50%))",
                      }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(hsla(0,0%,100%,0.08)_1px,transparent_1px)] [background-size:6px_6px] opacity-40 mix-blend-overlay" />
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white">
                      <span className="inline-flex self-start items-center h-6 px-2.5 rounded-full text-[10.5px] font-medium uppercase tracking-wider bg-white/15 backdrop-blur border border-white/25">
                        Featured · {featured.category}
                      </span>
                      <div className="flex items-center gap-2 text-[12px] font-medium text-white/85">
                        <Sparkles className="w-3.5 h-3.5" />
                        Editor's pick
                      </div>
                    </div>
                  </div>
                  {/* Featured copy */}
                  <div className="md:col-span-2 flex flex-col justify-center">
                    <time className="text-[12px] tabular-nums text-foreground/50">
                      {featured.date}
                    </time>
                    <h3 className="mt-3 text-[26px] md:text-[30px] font-semibold leading-[1.15] tracking-tight text-foreground group-hover:text-foreground transition-colors">
                      {featured.title}
                    </h3>
                    <p className="mt-3 text-[14.5px] text-foreground/65 leading-relaxed">
                      {featured.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground/80 group-hover:text-foreground">
                      Read the story <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </a>
              </div>
            );
          })()}
          {visible.length > 1 && (
          <ul
            key={active + "|" + query}
            data-reveal-group
            className="border-t border-foreground/10"
          >
            {visible.slice(1).map((p) => (
              <li key={p.title} className="border-b border-foreground/10">
                <a
                  href="#"
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 gap-y-1 py-6 md:py-7 transition-colors hover:bg-foreground/[0.02]"
                >
                  {/* Date — left */}
                  <time className="text-[12px] tabular-nums text-foreground/45 whitespace-nowrap w-[92px]">
                    {p.date}
                  </time>

                  {/* Title + summary — center */}
                  <div className="min-w-0">
                    <h3 className="text-[18px] md:text-[20px] font-semibold leading-snug tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-foreground/60 leading-relaxed line-clamp-1">
                      {p.summary}
                    </p>
                  </div>

                  {/* Category tag — right */}
                  <span className="hidden sm:inline-flex items-center h-6 px-2.5 rounded-full text-[10.5px] font-medium uppercase tracking-wider text-foreground/60 border border-foreground/15 whitespace-nowrap">
                    {p.category}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          )}
          </>
        ) : (
          <div className="glass border border-glass rounded-2xl p-10 text-center text-[13.5px] text-foreground/60">
            No articles match this filter yet.
          </div>
        )}
      </Section>

      <Section
        id="newsletter"
        eyebrow="Newsletter"
        title={<>The Weekly Rivinity.</>}
        kicker="One email each Friday. Research links, product updates, and a single hand-picked essay. No filler."
        divider
      >
        <div className="glass border border-glass rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Newspaper className="w-8 h-8 text-foreground/70" strokeWidth={1.75} />
            <div>
              <div className="text-[16px] font-semibold">Join 22,000 readers</div>
              <div className="text-[12.5px] text-foreground/55">
                Unsubscribe in one click. We never share your email.
              </div>
            </div>
          </div>
          <form className="flex gap-2 w-full md:w-auto">
            <Input placeholder="you@work.com" type="email" className="h-11 md:w-72" />
            <button
              type="submit"
              className="cta-pill h-11 px-5 rounded-full bg-foreground text-background text-[13px] font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Section>

      <CtaSection
        eyebrow="Want to write for us?"
        title="Guest essays welcome from"
        gradientTail="researchers and builders."
        primary={{ label: "Pitch an essay", href: "mailto:journal@rivinity.ai" }}
        secondary={{ label: "About the journal", href: "/about" }}
      />
    </MarketingLayout>
  );
}