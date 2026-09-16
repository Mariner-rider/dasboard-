import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Sparkles, Clock, Users, Mic2 } from "lucide-react";

interface Episode {
  id: number;
  title: string;
  topic: string;
  duration: string;
  hosts: string;
  status: "ready" | "generating" | "playing";
}

const episodes: Episode[] = [
  { id: 1, title: "Quantum Physics Explained", topic: "Physics", duration: "12:34", hosts: "AI Host + Expert", status: "ready" },
  { id: 2, title: "The French Revolution", topic: "History", duration: "18:20", hosts: "Two AI Hosts", status: "ready" },
  { id: 3, title: "Introduction to Machine Learning", topic: "Computer Science", duration: "15:45", hosts: "AI Tutor", status: "ready" },
];

const AIPodcastView = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode>(episodes[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [topic, setTopic] = useState("");
  const [hostStyle, setHostStyle] = useState("Conversational");
  const [generating, setGenerating] = useState(false);

  return (
    <div className="max-w-[700px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground/85">AI Podcast</h2>
          <p className="text-[12px] text-muted-foreground/50">Convert any topic into an engaging audio experience</p>
        </div>
      </div>

      {/* Generator */}
      <div className="glass rounded-2xl border border-glass p-5 mb-6 shadow-float">
        <p className="text-[12px] font-semibold text-foreground/70 mb-3">Create New Episode</p>
        <div className="flex gap-3 mb-3">
          <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic or paste your notes..."
            className="flex-1 bg-muted/30 rounded-xl px-4 py-2.5 text-[12px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {["Conversational", "Interview", "Lecture", "Debate"].map(s => (
              <button key={s} onClick={() => setHostStyle(s)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                  hostStyle === s ? "gradient-accent text-primary-foreground" : "bg-muted/50 text-muted-foreground/60 hover:text-foreground/70"
                }`}
              >{s}</button>
            ))}
          </div>
          <button onClick={() => { setGenerating(true); setTimeout(() => setGenerating(false), 2000); }}
            className="ml-auto flex items-center gap-1.5 px-5 py-2.5 rounded-xl gradient-accent text-primary-foreground text-[12px] font-medium hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-3.5 h-3.5" />{generating ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      {/* Now Playing */}
      <div className="glass rounded-2xl border border-glass p-6 mb-6 shadow-float">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center shadow-glow-accent">
            <Mic2 className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-semibold text-foreground/85">{selectedEpisode.title}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground/50"><Clock className="w-3 h-3" />{selectedEpisode.duration}</span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground/50"><Users className="w-3 h-3" />{selectedEpisode.hosts}</span>
            </div>
          </div>
        </div>

        {/* Waveform */}
        <div className="flex items-end gap-[2px] h-12 mb-4 px-2">
          {Array.from({ length: 60 }).map((_, i) => {
            const h = Math.random() * 100;
            const filled = (i / 60) * 100 < progress;
            return <div key={i} className={`flex-1 rounded-full transition-colors ${filled ? "gradient-accent" : "bg-muted"}`} style={{ height: `${Math.max(h, 15)}%` }} />;
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground/50 font-mono">4:23</span>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-accent/50 text-muted-foreground/50 transition-colors"><SkipBack className="w-4 h-4" /></button>
            <button onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center shadow-glow-accent hover:opacity-90 transition-opacity"
            >
              {isPlaying ? <Pause className="w-5 h-5 text-primary-foreground" /> : <Play className="w-5 h-5 text-primary-foreground ml-0.5" />}
            </button>
            <button className="p-2 rounded-lg hover:bg-accent/50 text-muted-foreground/50 transition-colors"><SkipForward className="w-4 h-4" /></button>
          </div>
          <span className="text-[11px] text-muted-foreground/50 font-mono">{selectedEpisode.duration}</span>
        </div>
      </div>

      {/* Episodes */}
      <div>
        <p className="text-[11px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-3">Library</p>
        <div className="space-y-2">
          {episodes.map(ep => (
            <button key={ep.id} onClick={() => setSelectedEpisode(ep)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all ${
                selectedEpisode.id === ep.id ? "glass border border-glass shadow-float" : "hover:bg-accent/50"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mic2 className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground/75 truncate">{ep.title}</p>
                <p className="text-[11px] text-muted-foreground/40">{ep.topic} · {ep.duration}</p>
              </div>
              <Play className="w-4 h-4 text-muted-foreground/30" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIPodcastView;
