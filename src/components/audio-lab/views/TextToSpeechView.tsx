import { useEffect, useRef, useState } from "react";
import { Play, Pause, Send, Download, RotateCcw, RotateCw, ThumbsUp, ThumbsDown, Share2, Copy, ChevronDown, Sparkles, Smile, Frown, Angry, Zap, Meh, CloudRain, AlertCircle, Leaf, Gem } from "lucide-react";

const emotions = [
  { icon: Smile, label: "Happy" },
  { icon: Frown, label: "Sad" },
  { icon: Angry, label: "Angry" },
  { icon: Zap, label: "Surprise" },
  { icon: Meh, label: "Disgust" },
  { icon: CloudRain, label: "Disappointment" },
  { icon: AlertCircle, label: "Anxious" },
  { icon: Leaf, label: "Calm" },
];

const TextToSpeechView = () => {
  const [text, setText] = useState("Bring your attention to the crown of your head... Notice any sensations there. Slowly let your awareness travel down to your forehead, your eyes, your jaw.\n\nIf you notice any tension, imagine it softening with each breath.\n\nLet this wave of awareness flow down your neck, shoulders, arms, and all the way to your fingertips.");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [currentTime, setCurrentTime] = useState(40);
  const playbackIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [hasGenerated, setHasGenerated] = useState(true);
  const [showEmotions, setShowEmotions] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>(["Disgust", "Disappointment"]);
  const [enhanceScript, setEnhanceScript] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleEmotion = (label: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(label) ? prev.filter((e) => e !== label) : [...prev, label]
    );
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  useEffect(() => {
    if (!isPlaying) {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
        playbackIntervalRef.current = null;
      }
      return;
    }

    playbackIntervalRef.current = setInterval(() => {
      setCurrentTime((time) => {
        const next = time + 1;

        if (next >= 92) {
          setIsPlaying(false);
          setProgress(100);
          return 92;
        }

        setProgress((next / 92) * 100);
        return next;
      });
    }, 1000);

    return () => {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
        playbackIntervalRef.current = null;
      }
    };
  }, [isPlaying]);

  return (
    <div className="w-full max-w-[900px] mx-auto space-y-5 sm:space-y-6 md:space-y-7 px-3 sm:px-4 md:px-0">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold tracking-[-0.025em] text-foreground/90">Text to Speech Playground</h2>
        <p className="text-[14px] leading-5 text-muted-foreground/60 mt-1.5">Convert your text into natural, expressive speech</p>
      </div>

      {/* Text editor area */}
      <div className="glass rounded-[22px] border border-glass shadow-float overflow-hidden">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
          placeholder="Type or paste your text here..."
          rows={1}
          className="w-full min-h-[250px] md:min-h-[280px] bg-transparent text-[15px] leading-7 text-foreground/80 placeholder:text-muted-foreground/30 focus:outline-none px-5 md:px-6 pt-5 pb-3 resize-none overflow-hidden"
/>

        {/* Generated audio player */}
        {hasGenerated && (
          <div className="mx-2.5 sm:mx-4 md:mx-6 mb-4 p-3.5 sm:p-4 md:p-5 rounded-2xl bg-accent/45 border border-border/30 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full gradient-accent flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="text-[11px] sm:text-[12px] leading-4 text-muted-foreground/70 min-w-0">Voice generated successfully. Press play to preview.</span>
            </div>

            {/* Waveform visualization */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 min-w-0 h-8 sm:h-10 flex items-center gap-[1.5px] sm:gap-[2px]">
                {[34, 62, 46, 78, 52, 88, 40, 70, 56, 82, 48, 66, 92, 44, 74, 58, 86, 50, 72, 38, 64, 80, 54, 90, 46, 68, 76, 42, 84, 60, 50, 72, 88, 44, 64, 80, 56, 92, 48, 70, 58, 82, 40, 66, 86, 52, 74, 46, 90, 62, 78, 50, 68, 84, 44, 72, 56, 88, 48, 76].map((height, i) => {
                  const isFilled = (i / 60) * 100 < progress;
                  return (
                    <div
                      key={i}
                      className={`flex-1 min-w-[2px] rounded-full transition-colors duration-100 ${isFilled ? "bg-foreground/70" : "bg-foreground/15"}`}
                      style={{ height: `${Math.max(15, height)}%` }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Player controls */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
              <button
                className="text-muted-foreground/50 hover:text-foreground transition-colors"
                onClick={() => {
                  const nextTime = Math.max(0, currentTime - 10);
                  setCurrentTime(nextTime);
                  setProgress((nextTime / 92) * 100);
                }}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (currentTime >= 92) {
                    setCurrentTime(0);
                    setProgress(0);
                  }
                  setIsPlaying(!isPlaying);
                }}
                className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-background" />
                ) : (
                  <Play className="w-4 h-4 text-background ml-0.5" />
                )}
              </button>
              <button
                className="text-muted-foreground/50 hover:text-foreground transition-colors"
                onClick={() => {
                  const nextTime = Math.min(92, currentTime + 10);
                  setCurrentTime(nextTime);
                  setProgress((nextTime / 92) * 100);
                }}
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Timeline */}
              <div className="order-3 basis-full w-full min-w-0 flex items-center gap-1.5 sm:order-none sm:basis-auto sm:w-auto sm:flex-1 sm:gap-2">
                <span className="text-[9px] sm:text-[11px] text-muted-foreground/50 font-mono shrink-0">{`${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, "0")}`}</span>
                <div className="flex-1 h-1 rounded-full bg-foreground/10 relative cursor-pointer" onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const nextProgress = Math.max(
                    0,
                    Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
                  );
                  setProgress(nextProgress);
                  setCurrentTime(Math.round((nextProgress / 100) * 92));
                }}>
                  <div className="h-full rounded-full bg-foreground/60 transition-all" style={{ width: `${progress}%` }} />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground shadow-md"
                    style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
                  />
                </div>
                <span className="text-[9px] sm:text-[11px] text-muted-foreground/50 font-mono shrink-0">1:32</span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 ml-auto">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-foreground hover:bg-accent/50 transition-all">
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-foreground hover:bg-accent/50 transition-all">
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-foreground hover:bg-accent/50 transition-all">
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-foreground hover:bg-accent/50 transition-all">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 sm:px-4 md:px-5 pb-4 pt-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            {/* Selected emotion chips */}
            {selectedEmotions.map((em) => {
              const emotion = emotions.find((e) => e.label === em);
              const Icon = emotion?.icon;
              return (
                <button
                  key={em}
                  onClick={() => toggleEmotion(em)}
                  className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[12px] font-medium hover:bg-primary/20 transition-colors"
                >
                  {Icon && <Icon className="w-3 h-3" />} {em.toUpperCase()}
                </button>
              );
            })}

            {/* More emotions */}
            <div className="relative">
              <button
                onClick={() => setShowEmotions(!showEmotions)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-muted/50 text-muted-foreground/50 text-[12px] font-medium hover:bg-muted transition-colors"
              >
                {emotions.length - selectedEmotions.length}+
              </button>
              {showEmotions && (
                <div className="absolute bottom-full mb-2 right-0 sm:right-auto sm:left-0 z-50 glass-strong rounded-xl border border-glass shadow-float p-3 animate-float-in w-[calc(100vw-3rem)] max-w-[260px] sm:w-auto sm:min-w-[240px]">
                  <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-2">Emotion Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {emotions.map((em) => {
                      const Icon = em.icon;
                      return (
                        <button
                          key={em.label}
                          onClick={() => toggleEmotion(em.label)}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                            selectedEmotions.includes(em.label)
                              ? "bg-primary/15 text-primary"
                              : "bg-muted/50 text-muted-foreground/60 hover:bg-muted"
                          }`}
                        >
                          <Icon className="w-3 h-3" /> {em.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setEnhanceScript(!enhanceScript)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                enhanceScript
                  ? "bg-secondary/15 text-secondary"
                  : "bg-muted/50 text-muted-foreground/50 hover:bg-muted"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              ENHANCE SCRIPT
            </button>
          </div>

          <button
            onClick={() => setHasGenerated(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl gradient-accent text-primary-foreground text-[13px] font-semibold shadow-sm hover:opacity-90 hover:shadow-md hover:-translate-y-px transition-all duration-200 flex items-center justify-center gap-2 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            SEND
          </button>
        </div>
      </div>

      {/* Character count */}
      <div className="flex flex-wrap sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2 px-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground/40 inline-flex items-center gap-1"><Gem className="w-3 h-3" /> 100,000 Credits Remaining</span>
        </div>
        <span className="text-[11px] text-muted-foreground/40">{text.length}/5,000 Characters</span>
      </div>
    </div>
  );
};

export default TextToSpeechView;
