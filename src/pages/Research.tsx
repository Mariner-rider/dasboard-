import SidebarShell from "@/components/canvas/SidebarShell";
import { FlaskConical, Bell, Search, Bookmark, ArrowUpRight, Filter } from "lucide-react";
import { useState } from "react";

const papers = [
  { title: "Chain-of-Agents: routing LLM tools via reinforcement critics", source: "arXiv", time: "3h", authors: "Chen et al.", tag: "Agents", summary: "A router network trained via RL critics chooses the optimal tool-agent pair per subtask, reducing cost by 34% on GAIA.", cites: 42 },
  { title: "Mixture-of-Depths scales inference 2.3× on frontier models", source: "DeepMind", time: "1d", authors: "Kumar et al.", tag: "Efficiency", summary: "Dynamic-depth transformers skip layers per-token based on a learned gate. Zero quality loss at 43% fewer FLOPs.", cites: 218 },
  { title: "Retrieval-native transformers show 40% factuality lift", source: "Stanford", time: "2d", authors: "Ng et al.", tag: "RAG", summary: "Baking retrieval into pretraining rather than fine-tune surfaces long-tail knowledge without hallucination collapse.", cites: 96 },
  { title: "SPARSE-MoE: 1T param models under 80GB VRAM", source: "Mistral", time: "3d", authors: "Lavaud et al.", tag: "Scaling", summary: "Block-sparse expert routing + FP4 activations put trillion-parameter inference on a single H200 node.", cites: 61 },
  { title: "Constitutional Debate improves alignment over RLHF", source: "Anthropic", time: "4d", authors: "Bai et al.", tag: "Alignment", summary: "Two models argue policy; a judge model rewards principled positions. Beats RLHF on HH-eval by 11 points.", cites: 154 },
  { title: "Neural Program Synthesis via typed hole-driven decoding", source: "MIT", time: "5d", authors: "Solar-Lezama", tag: "Code", summary: "Decoding constrained to type-correct partial programs pushes HumanEval pass@1 to 94%.", cites: 33 },
];

const tags = ["All", "Agents", "Efficiency", "RAG", "Alignment", "Scaling", "Code", "Multimodal"];

const Research = () => (
  <SidebarShell>
    <ResearchContent />
  </SidebarShell>
);

const ResearchContent = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? papers : papers.filter((p) => p.tag === active);
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
            <div className="flex items-center gap-2 text-[11px] font-medium text-primary uppercase tracking-wider">
              <FlaskConical className="w-3.5 h-3.5" /> Research feed
            </div>
            <h1 className="text-[28px] font-semibold tracking-tight text-foreground mt-1">Latest AI Research</h1>
            <p className="text-[13.5px] text-muted-foreground mt-1">
              Curated frontier papers, distilled. Updated hourly from arXiv, DeepMind, Stanford, MIT and more.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="h-9 px-3 rounded-xl glass border border-glass flex items-center gap-2 text-[12.5px] text-muted-foreground">
              <Search className="w-3.5 h-3.5" />
              <input placeholder="Search papers…" className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 w-44" />
            </div>
            <button className="h-9 px-3.5 rounded-xl glass border border-glass text-[12.5px] font-medium text-foreground/85 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`h-8 px-3 rounded-full text-[12px] font-medium transition-all border ${
                active === t
                  ? "bg-primary/15 text-primary border-primary/30"
                  : "glass border-glass text-foreground/75 hover:border-glass-hover"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3 stagger">
          {filtered.map((p) => (
            <article key={p.title} className="glass border border-glass rounded-2xl p-5 hover:border-glass-hover transition-all group">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{p.tag}</span>
                <button className="text-muted-foreground/60 hover:text-foreground">
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>
              <h3 className="mt-3 text-[15px] font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 text-[12.5px] text-muted-foreground leading-relaxed">{p.summary}</p>
              <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground/70">
                <span>{p.authors} · {p.source} · {p.time}</span>
                <span className="flex items-center gap-1 text-primary hover:underline cursor-pointer">
                  Read paper <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Research;
