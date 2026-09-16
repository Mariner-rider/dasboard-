import { useState } from "react";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";

import { PanelLeft, Clapperboard, Sparkles, Wand2, Film, Music2, Aperture, Loader2 } from "lucide-react";

const styles = ["Cinematic", "Anime", "3D Render", "Documentary", "Claymation", "Vaporwave"];
const ratios = ["16:9", "9:16", "1:1", "4:5", "21:9"];
const durations = [5, 10, 15, 30];

const PromptToVideo = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [ratio, setRatio] = useState("16:9");
  const [duration, setDuration] = useState(10);
  const [music, setMusic] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [renders, setRenders] = useState<{ id: number; prompt: string; ratio: string }[]>([]);

  const generate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setRenders((r) => [{ id: Date.now(), prompt, ratio }, ...r]);
      setGenerating(false);
    }, 1200);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="shrink-0 transition-all duration-300 ease-in-out overflow-hidden" style={{ width: sidebarOpen ? 260 : 0 }}>
        <CanvasSidebar onCollapse={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-3 left-3 z-20 w-8 h-8 rounded-xl glass border border-glass shadow-float flex items-center justify-center text-muted-foreground/60 hover:text-foreground/80 transition-all"
            aria-label="Open sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}
       

        <div className="flex-1 overflow-y-auto px-6 pb-8">
          <div className="max-w-[900px] mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#ff8b28] flex items-center justify-center">
                <Clapperboard className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-[22px] font-semibold text-foreground tracking-tight">Prompt to Video</h1>
                <p className="text-[12.5px] text-muted-foreground/70">Describe a scene. Rivinity storyboards, shoots, and scores it.</p>
              </div>
            </div>

            {/* Composer */}
            <div className="glass rounded-2xl border border-glass p-4 mb-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder="A drone shot over neon-lit Tokyo streets at dusk, rain-slick asphalt, cinematic..."
                className="w-full bg-transparent text-[13.5px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none resize-none"
              />
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-glass/60">
                <Chips label="Style" items={styles} value={style} onChange={setStyle} />
                <Chips label="Ratio" items={ratios} value={ratio} onChange={setRatio} />
                <Chips label="Duration" items={durations.map((d) => `${d}s`)} value={`${duration}s`} onChange={(v) => setDuration(parseInt(v))} />
                <button
                  onClick={() => setMusic((m) => !m)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all ${
                    music ? "bg-foreground text-background border-foreground" : "border-border/60 text-foreground/70 hover:bg-accent/60"
                  }`}
                >
                  <Music2 className="w-3 h-3" /> Score
                </button>
                <div className="ml-auto flex items-center gap-2">
                  <button className="h-8 px-3 rounded-lg glass border border-glass text-[12px] text-foreground/80 hover:bg-accent/60 flex items-center gap-1.5">
                    <Wand2 className="w-3.5 h-3.5" /> Enhance
                  </button>
                  <button
                    onClick={generate}
                    disabled={generating}
                    className="h-8 px-3.5 rounded-lg bg-foreground text-background text-[12px] font-medium hover:opacity-90 disabled:opacity-60 flex items-center gap-1.5"
                  >
                    {generating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    {generating ? "Rendering…" : "Generate"}
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {generating && (
                <div className="aspect-video rounded-2xl border border-glass glass flex items-center justify-center">
                  <div className="flex flex-col items-center text-muted-foreground/60">
                    <Loader2 className="w-6 h-6 animate-spin mb-2" />
                    <span className="text-[11.5px]">Storyboarding scenes…</span>
                  </div>
                </div>
              )}
              {renders.map((r) => (
                <div key={r.id} className="rounded-2xl border border-glass glass overflow-hidden group">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 via-accent-pink/15 to-accent-purple/20 flex items-center justify-center relative">
                    <Film className="w-8 h-8 text-foreground/40" />
                    <span className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded-md bg-background/70 backdrop-blur border border-border/50">{r.ratio}</span>
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="text-[12px] text-foreground/80 line-clamp-2">{r.prompt}</p>
                  </div>
                </div>
              ))}
              {!generating && renders.length === 0 && (
                <div className="col-span-full rounded-2xl border border-dashed border-border/50 p-10 flex flex-col items-center text-center">
                  <Aperture className="w-8 h-8 text-muted-foreground/40 mb-2" />
                  <p className="text-[13px] text-foreground/70 font-medium">No renders yet</p>
                  <p className="text-[11.5px] text-muted-foreground/60 mt-1">Write a prompt above and hit Generate to preview a scene.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Chips = ({ label, items, value, onChange }: { label: string; items: string[]; value: string; onChange: (v: string) => void }) => (
  <div className="inline-flex items-center gap-1.5">
    <span className="text-[10.5px] uppercase tracking-wider text-muted-foreground/60">{label}</span>
    <div className="flex gap-1">
      {items.map((i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`px-2 py-0.5 rounded-full text-[11px] font-medium border transition-all ${
            value === i ? "bg-foreground text-background border-foreground" : "border-border/60 text-foreground/70 hover:bg-accent/60"
          }`}
        >
          {i}
        </button>
      ))}
    </div>
  </div>
);

export default PromptToVideo;
