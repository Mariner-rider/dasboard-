import { Users, Zap, LayoutGrid, TrendingUp, ArrowUpRight, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SpotlightCard from "./SpotlightCard";

const stats = [
  {
    icon: Users,
    trendIcon: TrendingUp,
    metric: "1,200+",
    label: "builders on the waitlist",
    body: "Onboarding in batches so feedback stays personal — join the beta queue.",
    tint: "linear-gradient(135deg, hsl(260 80% 78% / 0.22), hsl(245 75% 72% / 0.10) 60%, transparent)",
    ring: "hsl(260 80% 70% / 0.28)",
  },
  {
    icon: Zap,
    trendIcon: ArrowUpRight,
    metric: "47 days",
    label: "paper to shipped feature",
    body: "Research and product sit in the same room — new capabilities ship on production hardware at production latency.",
    tint: "linear-gradient(135deg, hsl(350 95% 82% / 0.24), hsl(330 85% 78% / 0.10) 60%, transparent)",
    ring: "hsl(340 85% 75% / 0.28)",
  },
  {
    icon: LayoutGrid,
    trendIcon: Sparkles,
    metric: "12 modules",
    label: "on one connected canvas",
    body: "Chat, studios, agents, learning, research and marketplace share context, history, memory, and design language.",
    tint: "linear-gradient(135deg, hsl(22 95% 80% / 0.26), hsl(30 90% 78% / 0.10) 60%, transparent)",
    ring: "hsl(22 95% 72% / 0.30)",
  },
];

export const BuiltInTheOpen = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
      <ScrollReveal className="max-w-2xl mb-12">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/50 mb-4">
          Built in the open
        </div>
        <h2 className="text-[36px] lg:text-[48px] font-semibold tracking-tight leading-[1.15]">
          No stealth mode.{" "}
          <span className="text-[hsl(var(--accent-sky))]">Ship in the open.</span>
        </h2>
        <p className="mt-4 text-[15px] text-foreground/65 max-w-lg">
          We share the roadmap, publish every changelog, and let the waitlist hold us accountable.
        </p>
      </ScrollReveal>

      <div data-reveal-group className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
        {stats.map(({ icon: Icon, trendIcon: TrendIcon, metric, label, body, tint, ring }) => (
          <SpotlightCard
            key={metric}
            className="relative p-6 lg:p-7 flex flex-col h-full overflow-hidden"
            style={{ backgroundImage: tint }}
          >
            <div className="flex items-center justify-between mb-5">
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl glass border"
                style={{ borderColor: ring }}
              >
                <Icon className="w-4 h-4 text-foreground/75" strokeWidth={1.75} />
              </div>
              <TrendIcon className="w-4 h-4 text-foreground/60" strokeWidth={2} />
            </div>
            <div className="text-[36px] lg:text-[44px] font-semibold tracking-tight leading-none">
              {metric}
            </div>
            <div className="mt-2 text-[13px] font-medium text-foreground/70">
              {label}
            </div>
            <p className="mt-3 text-[13px] text-foreground/55 leading-relaxed">
              {body}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
};

export default BuiltInTheOpen;
