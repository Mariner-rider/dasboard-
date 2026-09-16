import { useEffect, useRef, useState } from "react";
import { Upload, Mic, Play, Pause, ArrowRightLeft, Download, Sparkles, User, Users, CheckCircle, ChevronDown, Trash2, RefreshCw, Zap, Drama } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MaleIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="10" cy="14" r="5"/><path d="m14 10 6-6"/><path d="M15 4h5v5"/></svg>
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FemaleIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="9" r="5"/><path d="M12 14v8"/><path d="M9 19h6"/></svg>
);

const genderOptions = [
  { id: "male-to-female", label: "Male → Female", From: MaleIcon, To: FemaleIcon },
  { id: "female-to-male", label: "Female → Male", From: FemaleIcon, To: MaleIcon },
  { id: "neutral", label: "Neutral", From: Zap, To: Drama },
];

const voiceStyles = [
  { id: "natural", label: "Natural", desc: "Authentic & conversational" },
  { id: "professional", label: "Professional", desc: "Corporate & polished" },
  { id: "dramatic", label: "Dramatic", desc: "Theatrical & expressive" },
  { id: "whisper", label: "Whisper", desc: "Soft & intimate" },
  { id: "newscast", label: "Newscast", desc: "Broadcast quality" },
];

const clonedVoices = [
  { id: "v1", name: "My Voice (Cloned)", samples: 3, quality: "High", created: "2h ago" },
  { id: "v2", name: "Customer Service", samples: 5, quality: "Premium", created: "1d ago" },
];

const VoiceCloneView = () => {
  const [activeTab, setActiveTab] = useState<"clone" | "transform">("clone");
  const [selectedGender, setSelectedGender] = useState(genderOptions[0]);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(voiceStyles[0]);
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);
  const [uploadedSamples, setUploadedSamples] = useState<string[]>(["voice_sample_1.wav", "voice_sample_2.wav"]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingOriginal, setIsPlayingOriginal] = useState(false);
  const [transformText, setTransformText] = useState("Hello, welcome to our service. We're delighted to assist you today with any questions or concerns.");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const processingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pitch and speed sliders
  const [pitch, setPitch] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [stability, setStability] = useState(70);
  const [similarity, setSimilarity] = useState(80);

  useEffect(() => {
    return () => {
      if (processingTimeoutRef.current) clearTimeout(processingTimeoutRef.current);
    };
  }, []);

  const handleClone = () => {
    setIsProcessing(true);
    if (processingTimeoutRef.current) clearTimeout(processingTimeoutRef.current);
    processingTimeoutRef.current = setTimeout(() => {
      setIsProcessing(false);
      setHasResult(true);
      processingTimeoutRef.current = null;
    }, 2000);
  };

  const removeSample = (name: string) => {
    setUploadedSamples((prev) => prev.filter((s) => s !== name));
  };

  return (
    <div className="w-full max-w-[900px] mx-auto space-y-5 sm:space-y-6 md:space-y-7 px-3 sm:px-4 md:px-0">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold tracking-[-0.025em] text-foreground/90">Instant Voice Clone</h2>
        <p className="text-[14px] leading-5 text-muted-foreground/60 mt-1.5">Clone voices and transform gender with AI precision</p>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("clone")}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
            activeTab === "clone"
              ? "bg-background/80 border border-border/40 shadow-sm text-foreground"
              : "text-muted-foreground/50 hover:text-foreground/80 hover:bg-background/50"
          }`}
        >
          <Users className="w-4 h-4" />
          Clone Voice
        </button>
        <button
          onClick={() => setActiveTab("transform")}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
            activeTab === "transform"
              ? "bg-background/80 border border-border/40 shadow-sm text-foreground"
              : "text-muted-foreground/50 hover:text-foreground/80 hover:bg-background/50"
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          Transform Voice
        </button>
      </div>

      {activeTab === "clone" ? (
        <>
          {/* Upload samples section */}
          <div className="glass rounded-2xl sm:rounded-[22px] border border-glass shadow-float p-4 sm:p-5 md:p-7">
            <h3 className="text-[14px] font-semibold text-foreground/80 mb-4">Upload Voice Samples</h3>
            <p className="text-[12px] text-muted-foreground/50 mb-4">Upload 1-5 audio samples of the voice you want to clone. More samples = better quality.</p>

            {/* Uploaded files */}
            {uploadedSamples.length > 0 && (
              <div className="space-y-2 mb-4">
                {uploadedSamples.map((sample) => (
                  <div key={sample} className="flex items-center gap-3 p-3.5 rounded-2xl bg-accent/40 border border-border/30 shadow-sm transition-colors hover:bg-accent/50">
                    <Mic className="w-4 h-4 text-primary" />
                    <span className="text-[13px] text-foreground/70 flex-1">{sample}</span>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/30 hover:text-foreground hover:bg-accent/50 transition-all">
                      <Play className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeSample(sample)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="min-h-[170px] flex flex-col items-center justify-center border-2 border-dashed border-border/40 rounded-2xl px-6 py-8 text-center cursor-pointer hover:border-primary/30 hover:bg-accent/30 transition-all duration-200"
            >
              <Upload className="w-6 h-6 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-[13px] text-foreground/70 font-medium">Add voice sample</p>
              <p className="text-[11px] text-muted-foreground/40 mt-1">{uploadedSamples.length}/5 samples · Min 10 seconds each</p>
            </div>
            <input ref={fileInputRef} type="file" accept="audio/*" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setUploadedSamples((prev) => prev.length < 5 ? [...prev, file.name] : prev);
            }} />

            {/* Clone button */}
            <button
              onClick={handleClone}
              disabled={isProcessing || uploadedSamples.length === 0}
              className="w-full mt-5 px-5 py-3.5 rounded-xl gradient-accent text-primary-foreground text-[14px] font-semibold shadow-sm hover:opacity-90 hover:shadow-md transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Cloning Voice...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Clone Voice
                </>
              )}
            </button>
          </div>

          {/* Cloned voices library */}
          <div>
            <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-3 px-1">Your Cloned Voices</p>
            <div className="space-y-2">
              {clonedVoices.map((v) => (
                <div key={v.id} className="glass rounded-2xl border border-glass p-4 md:p-5 flex items-center gap-3 md:gap-4 hover:shadow-float transition-all duration-200">
                  <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center">
                    <User className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-foreground/80 break-words">{v.name}</p>
                    <p className="text-[11px] text-muted-foreground/50">{v.samples} samples · {v.quality} · {v.created}</p>
                  </div>
                  <button className="px-3.5 py-2 rounded-lg text-[11px] font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors shrink-0">
                    Use Voice
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Voice Transform */}
          <div className="glass rounded-2xl sm:rounded-[22px] border border-glass shadow-float p-4 sm:p-5 md:p-7 space-y-6">
            <h3 className="text-[14px] font-semibold text-foreground/80">Voice Transformation</h3>

            {/* Gender conversion selector */}
            <div>
              <label className="text-[11px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-2 block">Conversion Mode</label>
              <div className="relative">
                <button
                  onClick={() => setGenderDropdownOpen(!genderDropdownOpen)}
                  className="w-full min-w-0 flex items-center justify-between px-3 sm:px-4 py-3 rounded-xl bg-accent/50 border border-border/30 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <selectedGender.From className="w-5 h-5 text-foreground/70" />
                    <ArrowRightLeft className="w-4 h-4 text-muted-foreground/40" />
                    <selectedGender.To className="w-5 h-5 text-foreground/70" />
                    <span className="text-[13px] font-medium text-foreground/70 ml-2">{selectedGender.label}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground/50 transition-transform ${genderDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {genderDropdownOpen && (
                  <div className="absolute top-full mt-2 left-0 right-0 z-50 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in">
                    {genderOptions.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => {
                          setSelectedGender(g);
                          setGenderDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] transition-colors ${
                          g.id === selectedGender.id
                            ? "bg-accent text-foreground font-medium"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        }`}
                      >
                        <g.From className="w-4 h-4" />
                        <ArrowRightLeft className="w-3 h-3 text-muted-foreground/30" />
                        <g.To className="w-4 h-4" />
                        <span className="ml-2">{g.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Voice style selector */}
            <div>
              <label className="text-[11px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-2 block">Voice Style</label>
              <div className="relative">
                <button
                  onClick={() => setStyleDropdownOpen(!styleDropdownOpen)}
                  className="w-full min-w-0 flex items-center justify-between px-3 sm:px-4 py-3 rounded-xl bg-accent/50 border border-border/30 hover:border-primary/30 transition-all"
                >
                  <div>
                    <span className="text-[13px] font-medium text-foreground/70">{selectedStyle.label}</span>
                    <span className="text-[11px] text-muted-foreground/50 ml-2">· {selectedStyle.desc}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground/50 transition-transform ${styleDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {styleDropdownOpen && (
                  <div className="absolute top-full mt-2 left-0 right-0 z-50 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in">
                    {voiceStyles.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSelectedStyle(s);
                          setStyleDropdownOpen(false);
                        }}
                        className={`w-full flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-1 px-4 py-3 text-[13px] transition-colors ${
                          s.id === selectedStyle.id
                            ? "bg-accent text-foreground font-medium"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        }`}
                      >
                        <span>{s.label}</span>
                        <span className="text-[11px] text-muted-foreground/50 sm:text-right">{s.desc}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-medium text-muted-foreground/60">Pitch</label>
                  <span className="text-[11px] text-foreground/60 font-mono">{pitch}%</span>
                </div>
                <input type="range" min={0} max={100} value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-full h-1.5 accent-primary" />
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-muted-foreground/30">Lower</span>
                  <span className="text-[9px] text-muted-foreground/30">Higher</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-medium text-muted-foreground/60">Speed</label>
                  <span className="text-[11px] text-foreground/60 font-mono">{speed}%</span>
                </div>
                <input type="range" min={0} max={100} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full h-1.5 accent-primary" />
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-muted-foreground/30">Slower</span>
                  <span className="text-[9px] text-muted-foreground/30">Faster</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-medium text-muted-foreground/60">Stability</label>
                  <span className="text-[11px] text-foreground/60 font-mono">{stability}%</span>
                </div>
                <input type="range" min={0} max={100} value={stability} onChange={(e) => setStability(Number(e.target.value))} className="w-full h-1.5 accent-primary" />
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-muted-foreground/30">Variable</span>
                  <span className="text-[9px] text-muted-foreground/30">Stable</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-medium text-muted-foreground/60">Similarity</label>
                  <span className="text-[11px] text-foreground/60 font-mono">{similarity}%</span>
                </div>
                <input type="range" min={0} max={100} value={similarity} onChange={(e) => setSimilarity(Number(e.target.value))} className="w-full h-1.5 accent-primary" />
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-muted-foreground/30">Low</span>
                  <span className="text-[9px] text-muted-foreground/30">High</span>
                </div>
              </div>
            </div>

            {/* Text input for transform */}
            <div>
              <label className="text-[11px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-2 block">Text to Speak</label>
              <textarea
                value={transformText}
                onChange={(e) => setTransformText(e.target.value)}
                placeholder="Enter text to transform..."
                rows={3}
                className="w-full bg-accent/50 border border-border/30 rounded-2xl text-[14px] leading-6 text-foreground/80 placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/30 px-4 py-3.5 resize-none transition-colors"
              />
            </div>

            {/* Transform button */}
            <button
              onClick={handleClone}
              disabled={isProcessing}
              className="w-full px-5 py-3 rounded-xl gradient-accent text-primary-foreground text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Transforming...
                </>
              ) : (
                <>
                  <ArrowRightLeft className="w-4 h-4" />
                  Transform Voice
                </>
              )}
            </button>
          </div>

          {/* Result comparison */}
          {hasResult && (
            <div className="glass rounded-2xl sm:rounded-[22px] border border-glass shadow-float p-4 sm:p-5 md:p-7 animate-float-in">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-primary" />
                <h3 className="text-[14px] font-semibold text-foreground/80">Transformation Complete</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Original */}
                <div className="p-4 rounded-xl bg-accent/50 border border-border/30">
                  <p className="text-[11px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-3">Original</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setIsPlayingOriginal(!isPlayingOriginal); setIsPlaying(false); }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isPlayingOriginal ? "bg-foreground/20" : "bg-foreground/10 hover:bg-foreground/20"
                      } transition-all`}
                    >
                      {isPlayingOriginal ? <Pause className="w-4 h-4 text-foreground/70" /> : <Play className="w-4 h-4 text-foreground/70 ml-0.5" />}
                    </button>
                    <div className="flex items-center gap-[1px] h-6 flex-1">
                      {[42, 68, 52, 80, 46, 74, 58, 88, 50, 70, 44, 82, 60, 76, 48, 90, 56, 72, 64, 84, 46, 78, 54, 68, 86].map((height, i) => (
                        <div key={i} className={`w-[2px] rounded-full ${isPlayingOriginal ? "bg-foreground/40" : "bg-foreground/10"}`} style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Transformed */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-[11px] font-medium text-primary/70 uppercase tracking-widest mb-3">Transformed</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setIsPlaying(!isPlaying); setIsPlayingOriginal(false); }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isPlaying ? "gradient-accent" : "bg-primary/15 hover:bg-primary/25"
                      } transition-all`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 text-primary-foreground" /> : <Play className="w-4 h-4 text-primary ml-0.5" />}
                    </button>
                    <div className="flex items-center gap-[1px] h-6 flex-1">
                      {[36, 62, 48, 84, 54, 76, 44, 90, 58, 70, 50, 82, 46, 68, 60, 88, 52, 74, 42, 80, 56, 66, 86, 48, 72].map((height, i) => (
                        <div key={i} className={`w-[2px] rounded-full ${isPlaying ? "bg-primary/50" : "bg-primary/15"}`} style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-5">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-muted-foreground/50 hover:text-foreground hover:bg-accent/50 transition-all">
                  <RefreshCw className="w-3 h-3" /> Regenerate
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl gradient-accent text-primary-foreground text-[12px] font-semibold hover:opacity-90 transition-all">
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VoiceCloneView;
