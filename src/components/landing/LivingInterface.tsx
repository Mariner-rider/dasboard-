import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Database,
  Network,
  Cpu,
  FileOutput,
  MessageSquare,
  Wand2,
  Mic,
  Image as ImageIcon,
  Bot,
  Film,
  Store,
} from "lucide-react";

const stages = [
  { id: "prompt", label: "Prompt received", icon: MessageSquare },
  { id: "research", label: "Research expanding", icon: Search },
  { id: "memory", label: "Memory reconnecting", icon: Database },
  { id: "reasoning", label: "Reasoning", icon: Network },
  { id: "agent", label: "Agent activating", icon: Cpu },
  { id: "output", label: "Output generated", icon: FileOutput },
];

const studioIcons = [Wand2, Mic, ImageIcon, Bot, Film, Store];

export const LivingInterface = () => {
  const [stage, setStage] = useState(0);
  const [chatLines, setChatLines] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((s) => (s + 1) % stages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prompt = "Turn my research notes into a 60-second explainer video.";
    let i = 0;
    setChatLines([]);
    const typer = setInterval(() => {
      i += 1;
      setChatLines((prev) => {
        const next = prompt.slice(0, i);
        return prev.length === 0 ? [next] : [next];
      });
      if (i >= prompt.length) clearInterval(typer);
    }, 45);
    return () => clearInterval(typer);
  }, [stage]);

  const ActiveIcon = stages[stage].icon;

  return (
    <div className="glass-strong border border-glass rounded-3xl shadow-float overflow-hidden">
      <div className="h-9 flex items-center gap-1.5 px-4 border-b border-glass">
        <span className="w-2.5 h-2.5 rounded-full bg-[hsl(0_70%_65%)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[hsl(45_90%_60%)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[hsl(140_50%_55%)]" />
        <span className="ml-3 text-[11px] text-foreground/50">rivinity — living canvas</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_220px] min-h-[280px] lg:h-[360px]">
        <aside className="hidden lg:flex border-r border-glass p-3 flex-col gap-1 text-[12px] text-foreground/70">
          <motion.div
            animate={{ opacity: stage === 0 ? 1 : 0.55 }}
            className="px-2 py-1.5 rounded-lg bg-foreground/5"
          >
            New chat
          </motion.div>
          <motion.div
            animate={{ opacity: stage === 1 ? 1 : 0.55 }}
            className="px-2 py-1.5 rounded-lg text-foreground/55"
          >
            Research synthesis
          </motion.div>
          <motion.div
            animate={{ opacity: stage === 2 ? 1 : 0.55 }}
            className="px-2 py-1.5 rounded-lg text-foreground/55"
          >
            Brand memory
          </motion.div>
          <motion.div
            animate={{ opacity: stage === 3 ? 1 : 0.55 }}
            className="px-2 py-1.5 rounded-lg text-foreground/55"
          >
            Reasoning trace
          </motion.div>
          <div className="mt-auto text-[10.5px] uppercase tracking-wider text-foreground/40">Discover</div>
          <div className="px-2 py-1 rounded-lg text-foreground/55">Latest research</div>
          <div className="px-2 py-1 rounded-lg text-foreground/55">Tech news</div>
        </aside>

        <main className="p-4 lg:p-6 flex flex-col relative overflow-hidden">
          <div className="text-[11px] text-foreground/50 mb-2 flex items-center gap-1.5">
            <motion.span
              key={stages[stage].label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5"
            >
              <ActiveIcon className="w-3 h-3" />
              {stages[stage].label}
            </motion.span>
            <span className="text-foreground/30 hidden sm:inline">· Rivinity 2.5</span>
          </div>

          <div className="text-[18px] lg:text-[22px] font-semibold tracking-tight max-w-md min-h-[52px] lg:min-h-[64px]">
            {chatLines.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline"
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.9 }}
              className="inline-block w-1.5 h-4 lg:h-5 ml-0.5 align-middle bg-foreground/60"
            />
          </div>

          <div className="mt-4 glass border border-glass rounded-2xl p-4 max-w-lg text-[12px] lg:text-[12.5px] text-foreground/70 leading-relaxed min-h-[72px] lg:min-h-[84px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {stage === 0 && (
                  <span>
                    Understanding intent: <span className="text-foreground font-medium">video</span>,{" "}
                    <span className="text-foreground font-medium">explainer</span>,{" "}
                    <span className="text-foreground font-medium">60 seconds</span>.
                  </span>
                )}
                {stage === 1 && (
                  <span>
                    Routing to <span className="text-foreground font-medium">Prompt-to-Video</span> · pulling{" "}
                    <span className="text-foreground font-medium">3 research sources</span>.
                  </span>
                )}
                {stage === 2 && (
                  <span>
                    Recalling brand voice, tone, and past scenes from{" "}
                    <span className="text-foreground font-medium">memory</span>.
                  </span>
                )}
                {stage === 3 && (
                  <span>
                    Building scene outline · selecting visuals · scoring narration.
                  </span>
                )}
                {stage === 4 && (
                  <span>
                    Agent <span className="text-foreground font-medium">VideoComposer</span> activated · rendering preview.
                  </span>
                )}
                {stage === 5 && (
                  <span>
                    Output ready: <span className="text-foreground font-medium">explainer-v2.mp4</span> · 58s.
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-auto glass border border-glass rounded-full h-11 flex items-center px-4 text-[12.5px] text-foreground/50">
            Ask anything — code, audio, video, learn…
          </div>
        </main>

        <aside className="hidden lg:grid border-l border-glass p-3 grid-cols-2 gap-2 auto-rows-min">
          {studioIcons.map((I, i) => {
            const isActive = (stage + i) % studioIcons.length < 2;
            return (
              <motion.div
                key={i}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  borderColor: isActive
                    ? "hsl(var(--glass-border-hover))"
                    : "hsl(var(--glass-border))",
                }}
                className="aspect-square rounded-xl glass border border-glass flex items-center justify-center text-foreground/70"
              >
                <I className="w-4 h-4" />
              </motion.div>
            );
          })}
        </aside>
      </div>
    </div>

  );
};

export default LivingInterface;
