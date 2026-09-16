import SidebarShell from "@/components/canvas/SidebarShell";
import { Newspaper, Bell, Search, ArrowUpRight, Flame } from "lucide-react";
import { useState } from "react";

const stories = [
  { title: "Apple ships on-device 3B model for Vision OS shortcuts", source: "The Verge", time: "1h", category: "Hardware", excerpt: "Vision OS 3.2 quietly bundles a distilled 3B model that runs entirely on the R2 chip — no cloud round-trips for Shortcuts intents.", hot: true },
  { title: "NVIDIA unveils Rubin R200: 4× throughput vs Blackwell", source: "Reuters", time: "5h", category: "Chips", excerpt: "Announced at GTC Fall, Rubin R200 pairs HBM4e with a new SM design that Jensen claims delivers 4× per-watt inference over Blackwell.", hot: true },
  { title: "OpenAI opens gateway pricing to enterprise tiers", source: "Bloomberg", time: "1d", category: "Business", excerpt: "New tiered pricing offers 60% discounts on GPT-5.1 for committed volume above 500M tokens per month.", hot: false },
  { title: "Meta acqui-hires Character.AI's inference team", source: "TechCrunch", time: "1d", category: "M&A", excerpt: "Twenty engineers move to Meta's Llama team; Character.AI keeps its consumer product independent.", hot: false },
  { title: "EU AI Act enforcement kicks in — first fines expected Q4", source: "Politico", time: "2d", category: "Policy", excerpt: "Foundation model providers must submit safety cards within 90 days or face penalties up to 3% of global revenue.", hot: false },
  { title: "Cursor overtakes Copilot in weekly active developers", source: "Wired", time: "2d", category: "Dev tools", excerpt: "Cursor's agent mode drove a 3× surge in weekly-active users, per JetBrains' Q3 developer survey.", hot: true },
];

const cats = ["All", "Hardware", "Chips", "Business", "M&A", "Policy", "Dev tools"];

const TechNews = () => (
  <SidebarShell>
    <TechNewsContent />
  </SidebarShell>
);

const TechNewsContent = () => {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? stories : stories.filter((s) => s.category === cat);
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-8 pt-5 pb-3 flex items-center justify-end gap-2.5">
        <button className="w-9 h-9 rounded-xl glass border border-glass flex items-center justify-center text-muted-foreground/70 hover:text-foreground transition-colors">
          <Bell className="w-4 h-4" />
        </button>
        <div className="w-9 h-9 rounded-full gradient-accent flex items-center justify-center text-primary-foreground text-[12px] font-semibold">TT</div>
      </div>

      <div className="px-8 pb-10 max-w-[1180px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-accent-pink uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5" /> Tech pulse
            </div>
            <h1 className="text-[28px] font-semibold tracking-tight text-foreground mt-1">Tech News</h1>
            <p className="text-[13.5px] text-muted-foreground mt-1">
              What's moving in AI and infrastructure — from Reuters, Bloomberg, The Verge, and more.
            </p>
          </div>
          <div className="h-9 px-3 rounded-xl glass border border-glass flex items-center gap-2 text-[12.5px] text-muted-foreground">
            <Search className="w-3.5 h-3.5" />
            <input placeholder="Search stories…" className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 w-44" />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`h-8 px-3 rounded-full text-[12px] font-medium transition-all border ${
                cat === c
                  ? "bg-accent-pink/15 text-accent-pink border-accent-pink/30"
                  : "glass border-glass text-foreground/75 hover:border-glass-hover"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 stagger">
          {filtered.map((s) => (
            <article key={s.title} className="glass border border-glass rounded-2xl p-5 hover:border-glass-hover transition-all group flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-accent-pink/10 text-accent-pink">{s.category}</span>
                {s.hot && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-orange-500">
                    <Flame className="w-3 h-3" /> Trending
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-[15px] font-semibold text-foreground leading-snug group-hover:text-accent-pink transition-colors">
                {s.title}
              </h3>
              <p className="mt-2 text-[12.5px] text-muted-foreground leading-relaxed line-clamp-3">{s.excerpt}</p>
              <div className="mt-auto pt-4 flex items-center justify-between text-[11px] text-muted-foreground/70">
                <span>{s.source} · {s.time}</span>
                <span className="flex items-center gap-1 text-accent-pink hover:underline cursor-pointer">
                  Read <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechNews;
