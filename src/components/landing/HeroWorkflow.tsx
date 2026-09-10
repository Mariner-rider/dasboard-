import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Paperclip,
  Mic,
  Sparkles,
  Loader2,
  ChevronDown,
  Plus,
  Layers,
  Zap,
  MousePointer2,
  CheckCircle2,
  Copy,
  ThumbsUp,
  RefreshCw,
  BookOpen,
  Code2,
  Palette,
  Component,
  Layout,
  Rocket,
  MessageSquare,
  FileText,
  GraduationCap,
} from "lucide-react";
import rivinityMark from "@/assets/rivinity-mark.png.asset.json";
import {
  SCENES,
  TYPING_MS,
  THINKING_MS,
  DONE_HOLD_MS,
  MEMORY_HOLD_MS,
  CHAT_STREAM,
  LM_LESSONS,
  BUILDER_CODE,
  MEMORY_NODES,
  CENTER,
  CHAT_TABS,
  CHAT_SUGGESTIONS,
  LM_TABS,
  LM_TOPICS,
  BUILDER_TABS,
  BUILDER_CARDS,
  type Phase,
} from "./heroWorkflowData";

const HeroWorkflow = () => {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState("");
  const [streamed, setStreamed] = useState("");
  const [lessonStep, setLessonStep] = useState(0);
  const [codeStep, setCodeStep] = useState(0);
  const [showMemory, setShowMemory] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scene = SCENES[sceneIdx];

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((r) => {
        const t = window.setTimeout(r, ms);
        timers.push(t);
      });

    const run = async () => {
      setTyped("");
      setStreamed("");
      setLessonStep(0);
      setCodeStep(0);
      setShowMemory(false);
      setPhase("idle");
      await wait(500);
      if (cancelled) return;

      setPhase("click");
      await wait(650);
      if (cancelled) return;

      setPhase("typing");
      for (let i = 1; i <= scene.prompt.length; i++) {
        if (cancelled) return;
        setTyped(scene.prompt.slice(0, i));
        await wait(TYPING_MS);
      }
      await wait(380);
      if (cancelled) return;

      setPhase("sending");
      await wait(240);
      setTyped("");
      if (cancelled) return;

      setPhase("thinking");
      await wait(THINKING_MS);
      if (cancelled) return;

      setPhase("executing");
      if (scene.id === "chat") {
        for (let i = 1; i <= CHAT_STREAM.length; i++) {
          if (cancelled) return;
          setStreamed(CHAT_STREAM.slice(0, i));
          await wait(9 + (i % 9 === 0 ? 18 : 0));
        }
      } else if (scene.id === "lm") {
        for (let i = 1; i <= LM_LESSONS.length; i++) {
          if (cancelled) return;
          setLessonStep(i);
          await wait(680);
        }
        await wait(500);
      } else {
        for (let i = 1; i <= BUILDER_CODE.length; i++) {
          if (cancelled) return;
          setCodeStep(i);
          await wait(460);
        }
        await wait(500);
      }
      if (cancelled) return;

      setPhase("done");
      await wait(DONE_HOLD_MS);
      if (cancelled) return;

      if (scene.id === "builder") {
        setShowMemory(true);
        await wait(MEMORY_HOLD_MS);
        if (cancelled) return;
        setShowMemory(false);
        setSceneIdx(0);
      } else {
        setSceneIdx((i) => (i + 1) % SCENES.length);
      }
      setRunKey((k) => k + 1);
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runKey]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [streamed, lessonStep, codeStep, phase]);

  const conversationVisible =
    phase === "sending" || phase === "thinking" || phase === "executing" || phase === "done";
  const isBusy = phase === "thinking" || phase === "executing";

  const statusLabel =
    phase === "executing"
      ? "executing"
      : phase === "thinking"
      ? "thinking"
      : phase === "done"
      ? "completed"
      : phase === "typing" || phase === "click"
      ? "typing"
      : "live";
  const statusDot = isBusy ? "bg-primary" : phase === "done" ? "bg-emerald-500" : "bg-foreground/30";

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <svg
        aria-hidden
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
        className="absolute -inset-x-10 -inset-y-16 w-[calc(100%+80px)] h-[calc(100%+128px)] pointer-events-none opacity-60 -z-10"
      >
        <defs>
          <linearGradient id="hw-flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FD881F" stopOpacity="0" />
            <stop offset="20%" stopColor="#FD881F" />
            <stop offset="55%" stopColor="#F5A9D0" />
            <stop offset="80%" stopColor="#BFA7F8" />
            <stop offset="100%" stopColor="#BFA7F8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((k) => (
          <path
            key={k}
            d={`M -20 ${180 + k * 55} C 300 ${120 + k * 40}, 900 ${260 - k * 30}, 1220 ${200 + k * 45}`}
            fill="none"
            stroke="url(#hw-flow)"
            strokeWidth={1 + k * 0.3}
            opacity={0.35 - k * 0.08}
          />
        ))}
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative surface-interactive rounded-3xl shadow-float overflow-hidden"
      >
        {/* Chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-background/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
          </div>
          <motion.div
            key={scene.id + "-label"}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: scene.accent }} />
            rivinity <span className="text-foreground/25">/</span> {scene.surface.toLowerCase()}
          </motion.div>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <motion.span
              className={`w-1.5 h-1.5 rounded-full ${statusDot}`}
              animate={{ opacity: isBusy ? [1, 0.35, 1] : 1 }}
              transition={{ duration: 1.1, repeat: isBusy ? Infinity : 0 }}
            />
            {statusLabel}
          </div>
        </div>

        {/* Scene body */}
        <div className="relative min-h-[520px] md:min-h-[560px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id + "-" + runKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              {scene.id === "chat" && (
                <ChatScene
                  phase={phase}
                  typed={typed}
                  streamed={streamed}
                  prompt={scene.prompt}
                  conversationVisible={conversationVisible}
                  scrollerRef={scrollerRef}
                />
              )}
              {scene.id === "lm" && (
                <LMScene
                  phase={phase}
                  typed={typed}
                  lessonStep={lessonStep}
                  prompt={scene.prompt}
                  conversationVisible={conversationVisible}
                  scrollerRef={scrollerRef}
                />
              )}
              {scene.id === "builder" && (
                <BuilderScene
                  phase={phase}
                  typed={typed}
                  codeStep={codeStep}
                  prompt={scene.prompt}
                  conversationVisible={conversationVisible}
                  scrollerRef={scrollerRef}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>{showMemory && <MemoryGraphOverlay />}</AnimatePresence>
        </div>
      </motion.div>

      {/* Scene indicator */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {SCENES.map((s, i) => (
          <motion.span
            key={s.id}
            animate={{
              width: i === sceneIdx ? 22 : 6,
              backgroundColor: i === sceneIdx ? s.accent : "hsl(var(--foreground) / 0.18)",
            }}
            transition={{ duration: 0.4 }}
            className="h-1.5 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

const ClickCursor = ({ accent }: { accent: string }) => (
  <motion.div
    key="cursor"
    initial={{ opacity: 0, x: -32, y: 24, scale: 0.85 }}
    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none z-30 drop-shadow-md"
  >
    <MousePointer2 className="w-4 h-4 text-foreground fill-foreground" />
    <motion.span
      className="absolute inset-0 -m-2 rounded-full border-2"
      style={{ borderColor: accent }}
      initial={{ scale: 0.4, opacity: 0.9 }}
      animate={{ scale: 2.2, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  </motion.div>
);

const TypedText = ({
  text,
  typing,
  placeholder,
}: {
  text: string;
  typing: boolean;
  placeholder: string;
}) => (
  <span className={text ? "text-foreground" : "text-muted-foreground/40"}>
    {text || placeholder}
    {typing && (
      <motion.span
        className="inline-block w-[1.5px] h-[13px] align-[-2px] ml-[1px] bg-foreground/80"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    )}
  </span>
);

const SendButton = ({ phase }: { phase: Phase }) => (
  <motion.div
    animate={{ scale: phase === "sending" ? 0.9 : 1 }}
    transition={{ duration: 0.2 }}
    className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center shrink-0 press"
  >
    <Send className="w-3.5 h-3.5 text-background" />
  </motion.div>
);

const ChatScene = ({
  phase,
  typed,
  streamed,
  prompt,
  conversationVisible,
  scrollerRef,
}: {
  phase: Phase;
  typed: string;
  streamed: string;
  prompt: string;
  conversationVisible: boolean;
  scrollerRef: React.RefObject<HTMLDivElement>;
}) => {
  const today = "Wednesday, July 15, 2026";
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="px-5 pt-4 pb-2 flex items-center justify-between shrink-0">
        <div>
          <p className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-widest">
            Workspace
          </p>
          <h2 className="text-sm font-semibold text-foreground leading-tight">AI Chat</h2>
        </div>
        <div className="h-7 px-3 rounded-full surface-interactive text-xs font-medium text-foreground/80 inline-flex items-center gap-1.5">
          <Layers className="w-3 h-3" strokeWidth={1.75} /> Skills
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence>
          {!conversationVisible && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 flex flex-col items-center justify-start px-4 pt-4"
            >
              <div className="relative mb-3">
                <div
                  className="absolute inset-0 -m-3 rounded-full blur-xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(253,136,31,0.32), rgba(245,169,208,0.14) 55%, transparent 78%)",
                  }}
                />
                <img src={rivinityMark.url} alt="Rivinity" className="relative w-12 h-12 object-contain" />
              </div>
              <p className="text-[10px] text-muted-foreground/60 tracking-wider uppercase mb-2">
                {today}
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground text-center leading-tight tracking-tight">
                What can I help you<br />build today?
              </h1>
              <div className="h-1 w-14 rounded-full gradient-accent mt-3 mb-4" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {conversationVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              ref={scrollerRef}
              className="absolute inset-0 overflow-hidden px-5 md:px-8 pt-4 pb-2 space-y-3"
            >
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-lg gradient-accent text-primary-foreground px-4 py-2.5 shadow-glow-accent">
                  <p className="text-xs md:text-sm leading-relaxed">{prompt}</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[92%] rounded-2xl rounded-bl-lg surface-interactive px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={rivinityMark.url} alt="" className="w-4 h-4 rounded object-contain" />
                    <span className="text-xs font-medium text-foreground/70">Rivinity</span>
                  </div>
                  {phase === "thinking" ? (
                    <div className="flex items-center gap-2 text-muted-foreground py-1">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span className="text-xs">Thinking…</span>
                    </div>
                  ) : (
                    <div className="text-xs md:text-sm leading-relaxed text-foreground/85 whitespace-pre-wrap">
                      {streamed}
                      {phase === "executing" && (
                        <motion.span
                          className="inline-block w-[6px] h-[14px] align-[-2px] ml-0.5 bg-foreground/70 rounded-[1px]"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.9, repeat: Infinity }}
                        />
                      )}
                    </div>
                  )}
                  {phase === "done" && (
                    <div className="flex items-center gap-0.5 mt-2 -ml-1">
                      {[Copy, ThumbsUp, RefreshCw].map((Icon, i) => (
                        <div key={i} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground">
                          <Icon className="w-3 h-3" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-5 pb-4 pt-2 shrink-0">
        <div className="mx-auto w-full max-w-[620px]">
          <div className="border border-border/60 rounded-2xl shadow-float surface-interactive overflow-hidden">
            <div className="flex items-center border-b border-border/40">
              {CHAT_TABS.map((t, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-r border-border/30 flex-1 justify-center min-w-0 truncate ${
                    i === 0 ? "bg-background text-foreground" : "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  <t.icon className="w-3 h-3 shrink-0" />
                  <span className="truncate">{t.label}</span>
                </div>
              ))}
              <div className="px-2.5 py-2 text-muted-foreground">
                <Plus className="w-3 h-3" />
              </div>
            </div>
            <div className="relative px-4 pt-3 pb-1 min-h-[46px] text-xs md:text-sm">
              <TypedText
                text={typed}
                typing={phase === "typing"}
                placeholder="Ask anything — the orchestrator picks the right tool, model & agents."
              />
              <AnimatePresence>{phase === "click" && <ClickCursor accent="#FD881F" />}</AnimatePresence>
            </div>
            <div className="flex items-center justify-between px-2.5 pb-2.5 pt-1">
              <div className="flex items-center gap-0.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground">
                  <Paperclip className="w-3.5 h-3.5" />
                </div>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground">
                  <Mic className="w-3.5 h-3.5" />
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-foreground border border-border/50 bg-background/50 ml-1">
                  <Zap className="w-2.5 h-2.5 text-primary" /> Auto-route
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-muted-foreground ml-0.5">
                  <Layers className="w-3 h-3" /> Skills <ChevronDown className="w-2.5 h-2.5 opacity-60" />
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-muted-foreground">
                  <span className="w-3.5 h-3.5 rounded-full gradient-accent flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-primary-foreground" />
                  </span>
                  orchestrator <ChevronDown className="w-2.5 h-2.5 opacity-60" />
                </span>
              </div>
              <SendButton phase={phase} />
            </div>
          </div>

          {!conversationVisible && (
            <div className="flex gap-1.5 flex-wrap justify-center mt-3">
              {CHAT_SUGGESTIONS.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full surface-interactive-hover text-xs text-foreground font-medium"
                >
                  <s.icon className="w-2.5 h-2.5" />
                  {s.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LMScene = ({
  phase,
  typed,
  lessonStep,
  prompt,
  conversationVisible,
  scrollerRef,
}: {
  phase: Phase;
  typed: string;
  lessonStep: number;
  prompt: string;
  conversationVisible: boolean;
  scrollerRef: React.RefObject<HTMLDivElement>;
}) => {
  const today = "Wednesday, July 15, 2026";
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="px-5 pt-3 pb-2 flex items-center gap-1 overflow-hidden shrink-0">
        <span className="text-xs font-medium text-muted-foreground px-2 py-1">← Home</span>
        <span className="w-px h-4 bg-border/40 mx-1" />
        {[
          { icon: MessageSquare, label: "Chat", active: true },
          { icon: FileText, label: "SmartNotes" },
          { icon: Layers, label: "Flashcards" },
          { icon: GraduationCap, label: "ExamLab" },
        ].map((f, i) => (
          <span
            key={i}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
              f.active ? "surface-interactive text-foreground" : "text-muted-foreground"
            }`}
          >
            <f.icon className="w-3 h-3" />
            {f.label}
          </span>
        ))}
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence>
          {!conversationVisible && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 flex flex-col items-center justify-start px-4 pt-3"
            >
              <div className="w-12 h-12 rounded-full gradient-accent opacity-85 shadow-glow-accent mb-3" />
              <p className="text-[10px] text-muted-foreground/60 tracking-wider uppercase mb-2">
                {today}
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground text-center leading-tight tracking-tight">
                What'd you like to<br />learn today?
              </h1>
              <div className="h-1 w-14 rounded-full gradient-accent mt-3 mb-3" />
              <div className="grid grid-cols-4 gap-2 w-full max-w-[520px] mt-1">
                {LM_TOPICS.map((t) => (
                  <div key={t.title} className="rounded-xl p-2.5 surface-interactive">
                    <p className="text-xs font-semibold text-foreground">{t.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{t.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {conversationVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              ref={scrollerRef}
              className="absolute inset-0 overflow-hidden px-5 md:px-8 pt-3 pb-2 space-y-3"
            >
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-lg gradient-accent text-primary-foreground px-4 py-2.5 shadow-glow-accent">
                  <p className="text-xs md:text-sm leading-relaxed">{prompt}</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="w-full max-w-[92%] rounded-2xl rounded-bl-lg surface-interactive px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={rivinityMark.url} alt="" className="w-4 h-4 rounded object-contain" />
                    <span className="text-xs font-medium text-foreground/70">RivinityLM</span>
                    <span className="text-foreground/25 text-xs">·</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-accent-pink">
                      Contextual Chat
                    </span>
                  </div>
                  {phase === "thinking" ? (
                    <div className="flex items-center gap-2 text-muted-foreground py-1">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span className="text-xs">Building lesson plan…</span>
                    </div>
                  ) : (
                    <LessonPlan step={lessonStep} accent="#F5A9D0" />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-5 pb-4 pt-2 shrink-0">
        <div className="mx-auto w-full max-w-[620px]">
          <div className="border border-border/60 rounded-2xl shadow-float surface-interactive overflow-hidden">
            <div className="flex items-center border-b border-border/40">
              {LM_TABS.map((t, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-r border-border/30 flex-1 justify-center truncate ${
                    i === 0 ? "bg-background text-foreground" : "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  <t.icon className="w-3 h-3" />
                  {t.label}
                </div>
              ))}
              <div className="px-2.5 py-2 text-muted-foreground">
                <Plus className="w-3 h-3" />
              </div>
            </div>
            <div className="relative px-4 pt-3 pb-1 min-h-[46px] text-xs md:text-sm">
              <TypedText text={typed} typing={phase === "typing"} placeholder="Ask me to teach you anything..." />
              <AnimatePresence>{phase === "click" && <ClickCursor accent="#F5A9D0" />}</AnimatePresence>
            </div>
            <div className="flex items-center justify-between px-2.5 pb-2 pt-1">
              <div className="flex items-center gap-0.5">
                <div className="flex flex-col px-2 py-1 rounded-lg">
                  <span className="text-[8px] text-muted-foreground uppercase tracking-wider">Prompt Mode</span>
                  <span className="text-xs font-semibold text-foreground/80 inline-flex items-center gap-1">
                    Chat <ChevronDown className="w-2.5 h-2.5 opacity-50" />
                  </span>
                </div>
                <div className="w-px h-6 bg-border/30" />
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg">
                  <Paperclip className="w-3 h-3 text-muted-foreground" />
                  <div>
                    <span className="text-[8px] text-muted-foreground uppercase tracking-wider block">Add files</span>
                    <span className="text-xs font-medium text-muted-foreground">Click or drop</span>
                  </div>
                </div>
                <div className="w-px h-6 bg-border/30" />
                <div className="flex flex-col px-2 py-1 rounded-lg">
                  <span className="text-[8px] text-muted-foreground uppercase tracking-wider">Length</span>
                  <span className="text-xs font-semibold text-foreground/80 inline-flex items-center gap-1">
                    Medium <ChevronDown className="w-2.5 h-2.5 opacity-50" />
                  </span>
                </div>
              </div>
              <SendButton phase={phase} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LessonPlan = ({ step, accent }: { step: number; accent: string }) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-1.5 mb-1">
      <BookOpen className="w-3 h-3" style={{ color: accent }} />
      <span className="text-xs font-medium text-foreground/70">Personalized lesson plan</span>
    </div>
    {LM_LESSONS.map((l, i) => (
      <AnimatePresence key={l.n}>
        {i < step && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-2.5 rounded-xl border border-border/40 surface-interactive px-2.5 py-2"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[10.5px] font-bold text-white shrink-0"
              style={{ background: `linear-gradient(135deg, ${accent}, #BFA7F8)` }}
            >
              {l.n}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-foreground truncate">{l.title}</div>
              <div className="text-[10px] text-muted-foreground">{l.tag} · {l.mins}</div>
            </div>
            <div className="h-1.5 w-10 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: accent }}
                initial={{ width: "0%" }}
                animate={{ width: `${30 + i * 25}%` }}
                transition={{ duration: 0.7, delay: 0.2 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    ))}
    {step >= LM_LESSONS.length && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-1.5 pt-0.5 text-xs text-muted-foreground"
      >
        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Ready. Remembers where you leave off.
      </motion.div>
    )}
  </div>
);

const BuilderScene = ({
  phase,
  typed,
  codeStep,
  prompt,
  conversationVisible,
  scrollerRef,
}: {
  phase: Phase;
  typed: string;
  codeStep: number;
  prompt: string;
  conversationVisible: boolean;
  scrollerRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="px-5 pt-4 pb-2 flex items-center justify-between shrink-0">
        <div>
          <p className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-widest">
            Workspace
          </p>
          <h2 className="text-sm font-semibold text-foreground leading-tight">App Builder</h2>
        </div>
        <div className="h-7 px-3 rounded-full surface-interactive text-xs font-medium text-foreground/80 inline-flex items-center gap-1.5">
          <Rocket className="w-3 h-3" /> Deploy
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence>
          {!conversationVisible && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 flex flex-col items-center justify-start px-4 pt-3"
            >
              <div className="w-12 h-12 rounded-2xl gradient-accent shadow-glow-accent flex items-center justify-center mb-3">
                <Layout className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground text-center leading-tight tracking-tight">
                What do you want<br />to build today?
              </h1>
              <div className="h-1 w-14 rounded-full gradient-accent mt-3 mb-4" />
              <div className="grid grid-cols-3 gap-2 w-full max-w-[520px]">
                {BUILDER_CARDS.map((c) => (
                  <div key={c.title} className="rounded-xl p-3 surface-interactive text-left">
                    <c.icon className="w-4 h-4 mb-1.5" style={{ color: "#BFA7F8" }} />
                    <p className="text-xs font-semibold text-foreground leading-tight">{c.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 leading-snug">{c.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {conversationVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              ref={scrollerRef}
              className="absolute inset-0 overflow-hidden px-5 md:px-8 pt-4 pb-2 space-y-3"
            >
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-lg gradient-accent text-primary-foreground px-4 py-2.5 shadow-glow-accent">
                  <p className="text-xs md:text-sm leading-relaxed">{prompt}</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="w-full max-w-[95%] rounded-2xl rounded-bl-lg surface-interactive px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={rivinityMark.url} alt="" className="w-4 h-4 rounded object-contain" />
                    <span className="text-xs font-medium text-foreground/70">App Builder</span>
                    <span className="text-foreground/25 text-xs">·</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-accent-purple">
                      Workbench
                    </span>
                  </div>
                  {phase === "thinking" ? (
                    <div className="flex items-center gap-2 text-muted-foreground py-1">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span className="text-xs">Generating components…</span>
                    </div>
                  ) : (
                    <BuilderPreview step={codeStep} accent="#BFA7F8" />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-5 pb-4 pt-2 shrink-0">
        <div className="mx-auto w-full max-w-[620px]">
          <div className="border border-border/60 rounded-2xl shadow-float surface-interactive overflow-hidden">
            <div className="flex items-center border-b border-border/40">
              {BUILDER_TABS.map((t, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-r border-border/30 flex-1 justify-center truncate ${
                    i === 0 ? "bg-background text-foreground" : "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  <t.icon className="w-3 h-3" />
                  {t.label}
                </div>
              ))}
              <div className="px-2.5 py-2 text-muted-foreground">
                <Plus className="w-3 h-3" />
              </div>
            </div>
            <div className="relative px-4 pt-3 pb-1 min-h-[46px] text-xs md:text-sm">
              <TypedText text={typed} typing={phase === "typing"} placeholder="Describe the app you want to build…" />
              <AnimatePresence>{phase === "click" && <ClickCursor accent="#BFA7F8" />}</AnimatePresence>
            </div>
            <div className="flex items-center justify-between px-2.5 pb-2.5 pt-1">
              <div className="flex items-center gap-1">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground">
                  <Paperclip className="w-3.5 h-3.5" />
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-muted-foreground">
                  <Palette className="w-3 h-3" /> Theme
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-muted-foreground">
                  <Component className="w-3 h-3" /> Components
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-muted-foreground">
                  <Code2 className="w-3 h-3" /> Stack <ChevronDown className="w-2.5 h-2.5 opacity-60" />
                </span>
              </div>
              <SendButton phase={phase} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BuilderPreview = ({ step, accent }: { step: number; accent: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
    {/* Dark code panel matching section 3.1: bg-[#0b1020]/90 border-glass */}
    <div className="rounded-xl border border-glass bg-[#0b1020]/90 p-2.5 font-mono text-xs leading-relaxed text-slate-200">
      <div className="flex items-center gap-1.5 mb-1.5 text-slate-400">
        <Code2 className="w-3 h-3" />
        <span className="text-[9px] uppercase tracking-wider">pricing.tsx</span>
      </div>
      <div className="space-y-0.5">
        {BUILDER_CODE.map((line, i) => (
          <AnimatePresence key={i}>
            {i < step && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="text-slate-100"
              >
                <span className="text-slate-500 mr-1.5 select-none">{String(i + 1).padStart(2, "0")}</span>
                {line}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
    <div className="rounded-xl border border-border/40 surface-interactive p-2.5">
      <div className="flex items-center gap-1.5 mb-1.5 text-muted-foreground">
        <Sparkles className="w-3 h-3" style={{ color: accent }} />
        <span className="text-[9px] uppercase tracking-wider">Live preview</span>
      </div>
      <div className="space-y-1.5">
        <AnimatePresence>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-semibold text-foreground">
              Choose your roast
            </motion.div>
          )}
        </AnimatePresence>
        <div className="grid grid-cols-3 gap-1.5">
          {["Light", "Medium", "Dark"].map((tier, i) => {
            const visible = step >= 3 + i;
            const isPopular = tier === "Medium";
            return (
              <AnimatePresence key={tier}>
                {visible && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="relative rounded-lg border border-border/40 surface-interactive px-1.5 py-2 text-center"
                    style={isPopular ? { boxShadow: `0 0 0 1.5px ${accent}` } : undefined}
                  >
                    <div className="text-[8.5px] uppercase tracking-wider text-muted-foreground">{tier}</div>
                    <div className="text-xs font-bold text-foreground mt-0.5">${14 + i * 4}</div>
                    {isPopular && (
                      <span
                        className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[7.5px] font-semibold uppercase tracking-wider text-white px-1 py-0.5 rounded"
                        style={{ backgroundColor: accent }}
                      >
                        Popular
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

const MemoryGraphOverlay = () => {
  const links = useMemo(
    () => MEMORY_NODES.map((n) => ({ id: n.id, x1: CENTER.x, y1: CENTER.y, x2: n.x, y2: n.y })),
    []
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-20 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground mb-1"
      >
        One shared memory
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-sm md:text-base font-medium text-foreground/85 text-center max-w-md"
      >
        Every tool talks to every other tool. Context never resets.
      </motion.div>
      <div className="relative w-full max-w-lg aspect-[5/4] mt-3">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="hw-mem-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FD881F" />
              <stop offset="50%" stopColor="#F5A9D0" />
              <stop offset="100%" stopColor="#BFA7F8" />
            </linearGradient>
          </defs>
          {links.map((l, i) => (
            <motion.line
              key={l.id}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="url(#hw-mem-line)"
              strokeWidth={0.4}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.07 }}
            />
          ))}
          {links.map((l, i) => (
            <motion.circle
              key={l.id + "-p"}
              r={0.9}
              fill="#FD881F"
              initial={{ opacity: 0 }}
              animate={{ cx: [l.x1, l.x2, l.x1], cy: [l.y1, l.y2, l.y1], opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 + i * 0.18, ease: "easeInOut" }}
            />
          ))}
        </svg>
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl surface-interactive px-3 py-2 flex items-center gap-1.5 shadow-glow-accent"
          style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
        >
          <img src={rivinityMark.url} alt="Rivinity" className="w-4 h-4 rounded object-contain" />
          <span className="text-xs font-semibold text-foreground">Rivinity Memory</span>
        </div>
        {MEMORY_NODES.map((n, i) => {
          const Icon = n.icon;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl surface-interactive px-2 py-1.5 flex items-center gap-1.5"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <Icon className="w-3 h-3 text-foreground/70" />
              <span className="text-[10.5px] font-medium text-foreground whitespace-nowrap">
                {n.label}
              </span>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.9 }}
        className="mt-3 text-xs text-muted-foreground text-center max-w-sm"
      >
        Chat something, learn it in RivinityLM, ship it in App Builder — Rivinity remembers the whole thread.
      </motion.div>
    </motion.div>
  );
};

export default HeroWorkflow;
