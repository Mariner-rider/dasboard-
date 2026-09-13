import SidebarShell from "@/components/canvas/SidebarShell";
import { TrendingUp, Bell, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";

const trends = [
  { title: "Agentic workflows overtake single-prompt usage in prod", delta: "+62%", direction: "up", desc: "Multi-step agent runs now account for 58% of API traffic across the top 100 AI-native SaaS.", sample: "n=1,240 orgs" },
  { title: "Voice-first interfaces adopted by 41% of new SaaS launches", delta: "+18%", direction: "up", desc: "Realtime STT/TTS APIs shipped by OpenAI, ElevenLabs and Cartesia trigger a voice-first design wave.", sample: "n=612 launches" },
  { title: "On-device inference searches doubled QoQ", delta: "+104%", direction: "up", desc: "Developer interest in Core ML, ONNX runtime web and MLC-LLM spikes with Apple's on-device push.", sample: "GitHub topic growth" },
  { title: "RAG-only architectures declining vs hybrid agent+RAG", delta: "−22%", direction: "down", desc: "Pure retrieval pipelines being replaced by agents that plan retrieval steps dynamically.", sample: "Vector DB usage report" },
  { title: "Fine-tuning share of workloads dropping vs prompt+tools", delta: "−14%", direction: "down", desc: "Cheaper long-context + tool-use largely obviates task-specific finetunes for most SMBs.", sample: "n=780 teams" },
  { title: "Prompt-to-video engagement up 3.4× on social", delta: "+240%", direction: "up", desc: "Sora 2, Veo 3, Runway Gen-4 outputs are dominating short-form video creator tooling.", sample: "TikTok trend index" },
];

const AITrends = () => (
  <SidebarShell>
    <AITrendsContent />
  </SidebarShell>
);

const AITrendsContent = () => (
  <div className="flex-1 overflow-y-auto">
    <div className="px-8 pt-5 pb-3 flex items-center justify-end gap-2.5">
      <button className="w-9 h-9 rounded-xl glass border border-glass flex items-center justify-center text-muted-foreground/70 hover:text-foreground transition-colors">
        <Bell className="w-4 h-4" />
      </button>
      <div className="w-9 h-9 rounded-full gradient-accent flex items-center justify-center text-primary-foreground text-[12px] font-semibold">TT</div>
    </div>

    <div className="px-8 pb-10 max-w-[1180px] mx-auto">
      <div>
        <div className="flex items-center gap-2 text-[11px] font-medium text-accent-purple uppercase tracking-wider">
          <TrendingUp className="w-3.5 h-3.5" /> Signals
        </div>
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground mt-1">Trends in AI</h1>
        <p className="text-[13.5px] text-muted-foreground mt-1 max-w-[640px]">
          Quantified shifts in how AI is being built and shipped — updated weekly from analytics, GitHub, App Store, and dev survey data.
        </p>
      </div>

      {/* Highlight strip */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatCard label="Total AI signals tracked" value="1,842" delta="+124 this week" tint="from-accent-purple/20 to-accent-purple/5" />
        <StatCard label="Most-searched model" value="Claude 4.5 Sonnet" delta="+38% MoM" tint="from-primary/15 to-primary/5" />
        <StatCard label="Hottest use case" value="Agent orchestration" delta="+62% QoQ" tint="from-accent-pink/15 to-accent-pink/5" />
      </div>

      <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-3 stagger">
        {trends.map((t) => {
          const up = t.direction === "up";
          return (
            <article key={t.title} className="glass border border-glass rounded-2xl p-5 hover:border-glass-hover transition-all group">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[15px] font-semibold text-foreground leading-snug group-hover:text-accent-purple transition-colors">
                  {t.title}
                </h3>
                <span className={`flex items-center gap-1 text-[13px] font-semibold shrink-0 ${up ? "text-emerald-500" : "text-red-500"}`}>
                  {up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {t.delta}
                </span>
              </div>
              <p className="mt-2 text-[12.5px] text-muted-foreground leading-relaxed">{t.desc}</p>
              <div className="mt-4 h-1.5 w-full rounded-full bg-muted/40 overflow-hidden">
                <div
                  className={`h-full ${up ? "bg-gradient-to-r from-emerald-500/60 to-emerald-500" : "bg-gradient-to-r from-red-500/60 to-red-500"}`}
                  style={{ width: `${Math.min(100, Math.abs(parseInt(t.delta)) )}%` }}
                />
              </div>
              <p className="mt-3 text-[10.5px] text-muted-foreground/70 uppercase tracking-wider">{t.sample}</p>
            </article>
          );
        })}
      </div>
    </div>
  </div>
);

const StatCard = ({ label, value, delta, tint }: { label: string; value: string; delta: string; tint: string }) => (
  <div className={`rounded-2xl border border-glass p-5 bg-gradient-to-br ${tint}`}>
    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="text-[20px] font-semibold text-foreground mt-1.5">{value}</p>
    <p className="flex items-center gap-1 text-[11.5px] text-emerald-500 mt-1">
      <Sparkles className="w-3 h-3" /> {delta}
    </p>
  </div>
);

export default AITrends;
