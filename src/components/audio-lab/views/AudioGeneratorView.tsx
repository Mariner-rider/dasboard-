import { useState, useMemo } from "react";
import { Play, Pause, Download, RefreshCw, Sparkles, Clock, Heart, AudioWaveform, Leaf, PawPrint, Building2, Music, Rocket, Ghost, Waves, LayoutGrid } from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "nature", label: "Nature", icon: Leaf },
  { id: "animals", label: "Animals", icon: PawPrint },
  { id: "urban", label: "Urban", icon: Building2 },
  { id: "music", label: "Musical", icon: Music },
  { id: "sci-fi", label: "Sci-Fi", icon: Rocket },
  { id: "horror", label: "Horror", icon: Ghost },
  { id: "ambient", label: "Ambient", icon: Waves },
];

const presets = [
  { id: "rain", label: "Gentle Rain", category: "nature", duration: "8s" },
  { id: "bird", label: "Bird Chirping", category: "animals", duration: "5s" },
  { id: "cat", label: "Cat Purring", category: "animals", duration: "6s" },
  { id: "thunder", label: "Thunder Roll", category: "nature", duration: "10s" },
  { id: "footsteps", label: "Footsteps on Gravel", category: "urban", duration: "4s" },
  { id: "laser", label: "Laser Beam", category: "sci-fi", duration: "3s" },
  { id: "ocean", label: "Ocean Waves", category: "ambient", duration: "15s" },
  { id: "piano", label: "Piano Chord", category: "music", duration: "4s" },
  { id: "dog", label: "Dog Barking", category: "animals", duration: "3s" },
  { id: "wind", label: "Howling Wind", category: "nature", duration: "12s" },
  { id: "door", label: "Door Creaking", category: "horror", duration: "5s" },
  { id: "engine", label: "Car Engine Start", category: "urban", duration: "6s" },
];

const AudioGeneratorView = () => {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(5);
  const [influence, setInfluence] = useState(0.3);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSounds, setGeneratedSounds] = useState<Array<{ id: string; prompt: string; playing: boolean; liked: boolean }>>([
    { id: "1", prompt: "A gentle rain falling on a tin roof with distant thunder", playing: false, liked: false },
    { id: "2", prompt: "Bird chirping in a sunny morning garden", playing: false, liked: false },
    { id: "3", prompt: "Cat purring softly near a warm fireplace", playing: false, liked: false },
  ]);

  const filteredPresets = useMemo(
    () => activeCategory === "all"
      ? presets
      : presets.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedSounds((prev) => [
        { id: Date.now().toString(), prompt, playing: false, liked: false },
        ...prev,
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  const togglePlay = (id: string) => {
    setGeneratedSounds((prev) =>
      prev.map((s) => ({ ...s, playing: s.id === id ? !s.playing : false }))
    );
  };

  const toggleLike = (id: string) => {
    setGeneratedSounds((prev) =>
      prev.map((s) => (s.id === id ? { ...s, liked: !s.liked } : s))
    );
  };

  return (
    <div className="w-full max-w-[900px] mx-auto space-y-5 sm:space-y-6 md:space-y-7 px-3 sm:px-4 md:px-0">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold tracking-[-0.025em] text-foreground/90">Audio Generator</h2>
        <p className="text-[14px] leading-5 text-muted-foreground/60 mt-1.5">Generate any sound effect from a text description</p>
      </div>

      {/* Prompt input */}
      <div className="glass rounded-2xl sm:rounded-[22px] border border-glass shadow-float overflow-hidden">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the sound you want to generate... e.g. 'A cat purring softly near a warm fireplace'"
          rows={3}
          className="w-full min-h-[120px] bg-transparent text-[15px] leading-7 text-foreground/80 placeholder:text-muted-foreground/30 focus:outline-none px-5 md:px-6 pt-5 pb-3 resize-none"
        />

        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-5 pb-5 pt-1">
          <div className="flex flex-wrap items-center gap-3 md:gap-5">
            {/* Duration */}
            <div className="flex flex-wrap items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-muted-foreground/40" />
              <span className="text-[11px] text-muted-foreground/50">Duration</span>
              <div className="flex items-center gap-1 shrink-0">
                <input
                  type="range"
                  min={1}
                  max={22}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-24 sm:w-20 h-1 accent-primary"
                />
                <span className="text-[11px] text-foreground/60 font-mono w-6">{duration}s</span>
              </div>
            </div>

            {/* Prompt influence */}
            <div className="flex flex-wrap items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-muted-foreground/40" />
              <span className="text-[11px] text-muted-foreground/50">Influence</span>
              <div className="flex items-center gap-1 shrink-0">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={influence * 100}
                  onChange={(e) => setInfluence(Number(e.target.value) / 100)}
                  className="w-24 sm:w-20 h-1 accent-primary"
                />
                <span className="text-[11px] text-foreground/60 font-mono w-8">{(influence * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full lg:w-auto px-5 py-2.5 rounded-xl bg-[#FF7A18]text-primary-foreground text-[13px] font-semibold shadow-sm hover:opacity-90 hover:shadow-md transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <AudioWaveform className="w-3.5 h-3.5" />
                Generate
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick presets */}
      <div>
        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-3 px-1">Quick Presets</p>
        <div className="flex gap-2 flex-wrap mb-3">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all inline-flex items-center gap-1.5 ${
                  activeCategory === c.id
                    ? "bg-foreground text-background"
                    : "bg-muted/50 text-muted-foreground/60 hover:bg-muted"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {c.label}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {filteredPresets.map((p) => (
            <button
              key={p.id}
              onClick={() => setPrompt(p.label)}
              className="glass border border-glass rounded-2xl p-3.5 text-left hover:shadow-float hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <p className="text-[13px] font-medium text-foreground/70 group-hover:text-foreground transition-colors">{p.label}</p>
              <p className="text-[10px] text-muted-foreground/40 mt-1">{p.duration}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Generated sounds */}
      {generatedSounds.length > 0 && (
        <div>
          <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-3 px-1">Generated Sounds</p>
          <div className="space-y-2">
            {generatedSounds.map((sound) => (
              <div
                key={sound.id}
                className="glass rounded-2xl border border-glass p-4 md:p-5 flex items-center gap-3 md:gap-4 hover:shadow-float transition-all duration-200"
              >
                <button
                  onClick={() => togglePlay(sound.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    sound.playing
                      ? "bg-[#FF7A18]"
                      : "bg-foreground/10 hover:bg-foreground/20"
                  }`}
                >
                  {sound.playing ? (
                    <Pause className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <Play className="w-4 h-4 text-foreground/70 ml-0.5" />
                  )}
                </button>

                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-[13px] text-foreground/75 truncate">{sound.prompt}</p>
                  {/* Mini waveform */}
                  <div className="flex items-center gap-[1px] h-4 mt-1">
                    {[38, 64, 48, 82, 56, 72, 44, 90, 52, 68, 42, 76, 58, 86, 46, 70, 54, 92, 40, 66, 80, 50, 74, 44, 88, 58, 72, 48, 84, 62, 76, 42, 90, 54, 68, 82, 46, 74, 58, 86].map((height, i) => (
                      <div
                        key={i}
                        className={`w-[2px] rounded-full ${sound.playing ? "bg-primary/60" : "bg-foreground/10"}`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleLike(sound.id)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      sound.liked
                        ? "text-pink-500"
                        : "text-muted-foreground/30 hover:text-foreground"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${sound.liked ? "fill-current" : ""}`} />
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/30 hover:text-foreground hover:bg-accent/50 transition-all">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioGeneratorView;
