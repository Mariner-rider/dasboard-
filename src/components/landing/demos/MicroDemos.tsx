import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

/* Shared hook: only tick while element is on-screen and motion is allowed.
   Hovering the tile boosts the tempo slightly so previews feel responsive. */
const useTicker = (
  fn: () => void,
  interval: number,
  ref: React.RefObject<HTMLElement>,
  hoverInterval?: number,
) => {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (reduce || !ref.current) return;
    let id: number | null = null;
    const el = ref.current;
    const active = hovered && hoverInterval ? hoverInterval : interval;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        id = window.setInterval(fn, active);
      } else if (id) {
        clearInterval(id);
        id = null;
      }
    });
    io.observe(el);
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      io.disconnect();
      if (id) clearInterval(id);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval, hoverInterval, reduce, hovered]);
  return hovered;
};

/* Frame — tiny device-like tile. Adds a subtle cursor-follow depth (max 3deg,
   0.5% translate). No new gradients, colors, or shadows. */
const Frame = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(500px) rotateX(${(-py * 3).toFixed(2)}deg) rotateY(${(px * 3).toFixed(2)}deg) translateZ(0)`;
    });
  }, []);
  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    el.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg)";
  }, []);
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full h-16 rounded-xl glass border border-glass overflow-hidden flex items-center px-3 will-change-transform transition-[transform] duration-300 ease-out"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

/* 1. Chat: multi-phase — type → research → stream → sources → save.
       Loops seamlessly, feels like the actual product. */
export const ChatDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const prompt = "Compare India's semiconductor policy with Taiwan.";
  const answer =
    "India's PLI subsidises fabs and packaging; Taiwan compounds decades of TSMC-led capacity";
  const models = ["gpt-4o", "claude-3.5", "gemini-2"];
  const sources = ["ITRI", "MeitY", "arxiv:2409"];

  type Phase = "type" | "research" | "memory" | "stream" | "sources" | "saved";
  const [phase, setPhase] = useState<Phase>("type");
  const [modelI, setModelI] = useState(0);
  const [typed, setTyped] = useState("");
  const [streamed, setStreamed] = useState("");
  const [visSources, setVisSources] = useState(0);

  useEffect(() => {
    let cancel = false;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const run = async () => {
      while (!cancel) {
        // type
        setPhase("type"); setTyped(""); setStreamed(""); setVisSources(0);
        for (let n = 1; n <= prompt.length; n++) {
          if (cancel) return;
          setTyped(prompt.slice(0, n));
          await wait(22);
        }
        await wait(280);
        // research
        setPhase("research"); await wait(650);
        // memory
        setPhase("memory"); await wait(600);
        // stream
        setPhase("stream");
        for (let n = 1; n <= answer.length; n++) {
          if (cancel) return;
          setStreamed(answer.slice(0, n));
          await wait(14);
        }
        // sources
        setPhase("sources");
        for (let s = 1; s <= sources.length; s++) {
          if (cancel) return;
          setVisSources(s); await wait(180);
        }
        await wait(500);
        // saved
        setPhase("saved"); await wait(700);
        setModelI((v) => (v + 1) % models.length);
        await wait(200);
      }
    };
    run();
    return () => { cancel = true; };
  }, []);

  useTicker(() => {}, 1000, ref);

  const status =
    phase === "research" ? "Researching · 42 docs"
    : phase === "memory" ? "Memory · prior thread reconnected"
    : phase === "saved" ? "Saved to workspace"
    : null;

  return (
    <div ref={ref}>
      <Frame>
        <div className="flex-1 min-w-0">
          {phase === "type" && (
            <div className="text-[11px] font-mono text-foreground/70 truncate">
              <span className="text-foreground/35">›</span> {typed}
              <span className="inline-block w-1 h-3 bg-foreground/60 align-middle ml-0.5 animate-pulse" />
            </div>
          )}
          {(phase === "research" || phase === "memory") && (
            <div className="flex items-center gap-2 text-[11px] text-foreground/70">
              <span className="flex gap-0.5">
                {[0,1,2].map((d)=>(
                  <span key={d} className="w-1 h-1 rounded-full bg-foreground/50"
                    style={{animation:`pulse 1s ${d*0.15}s ease-in-out infinite`}}/>
                ))}
              </span>
              <span className="truncate">{status}</span>
            </div>
          )}
          {phase === "stream" && (
            <div className="text-[11px] text-foreground/80 leading-[1.25] truncate">
              {streamed}
              <span className="inline-block w-1 h-3 bg-foreground/60 align-middle ml-0.5 animate-pulse" />
            </div>
          )}
          {phase === "sources" && (
            <div className="flex items-center gap-1 overflow-hidden">
              {sources.slice(0, visSources).map((s) => (
                <span key={s} className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-full glass border border-glass text-foreground/70 shrink-0 animate-fade-up">
                  [{s}]
                </span>
              ))}
            </div>
          )}
          {phase === "saved" && (
            <div className="flex items-center gap-1.5 text-[11px] text-foreground/75">
              <span className="w-3 h-3 rounded-full flex items-center justify-center"
                style={{background:"linear-gradient(135deg,#FD881F,#BFA7F8)"}}>
                <span className="block w-1 h-1 rounded-full bg-white"/>
              </span>
              <span className="truncate">{status}</span>
            </div>
          )}
        </div>
        <span
          key={models[modelI]}
          className="ml-2 text-[9.5px] px-1.5 py-0.5 rounded-full font-semibold text-foreground/75 glass border border-glass shrink-0"
        >
          → {models[modelI]}
        </span>
      </Frame>
    </div>
  );
};

/* 2. App Builder: skeleton assembling */
export const AppBuilderDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  useTicker(() => setStep((s) => (s + 1) % 4), 700, ref);
  const blocks = [
    { w: "60%", h: 6 },
    { w: "40%", h: 4 },
    { w: "80%", h: 4 },
    { w: "50%", h: 4 },
  ];
  return (
    <div ref={ref}>
      <Frame>
        <div className="flex flex-col gap-1.5 w-full">
          {blocks.map((b, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: i <= step ? b.w : 0,
                height: b.h,
                background: "linear-gradient(90deg,#FD881F,#F5A9D0,#BFA7F8)",
                opacity: i <= step ? 0.75 : 0,
              }}
            />
          ))}
        </div>
      </Frame>
    </div>
  );
};

/* 3. Audio: waveform + streaming transcription with speaker label */
export const AudioDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);
  useTicker(() => setTick((t) => t + 1), 110, ref, 70);
  const lines = [
    { spk: "S1", t: "The fab economics shifted after '22..." },
    { spk: "S2", t: "Right — subsidies changed the calculus." },
    { spk: "S1", t: "So packaging is the real bottleneck." },
  ];
  const [li, setLi] = useState(0);
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let cancel = false;
    const wait = (ms:number)=>new Promise<void>(r=>setTimeout(r,ms));
    (async () => {
      while (!cancel) {
        for (let k = 0; k < lines.length; k++) {
          if (cancel) return;
          setLi(k); setTyped("");
          const s = lines[k].t;
          for (let n = 1; n <= s.length; n++) {
            if (cancel) return;
            setTyped(s.slice(0, n)); await wait(24);
          }
          await wait(500);
        }
      }
    })();
    return () => { cancel = true; };
  }, []);
  const bars = Array.from({ length: 18 });
  return (
    <div ref={ref}>
      <Frame>
        <div className="flex items-center gap-[3px] h-full mr-2 shrink-0">
          {bars.map((_, i) => {
            const h = 12 + Math.abs(Math.sin((tick + i) * 0.6)) * 30;
            return (
              <span key={i} className="rounded-full"
                style={{ height: h, width: 2, background: "linear-gradient(180deg,#FD881F,#BFA7F8)", transition: "height 110ms linear", opacity: 0.75 }} />
            );
          })}
        </div>
        <div className="flex-1 min-w-0 text-[10.5px] font-mono text-foreground/70 truncate">
          <span className="text-foreground/45">{lines[li].spk}</span>{" "}
          <span>{typed}</span>
          <span className="inline-block w-1 h-2.5 bg-foreground/60 align-middle ml-0.5 animate-pulse" />
        </div>
      </Frame>
    </div>
  );
};

/* 4. RivinityLM: cornell notes drawing */
export const NotesDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  useTicker(() => setStep((s) => (s + 1) % 5), 600, ref);
  return (
    <div ref={ref}>
      <Frame>
        <div className="flex w-full h-full">
          <div className="w-1/3 border-r border-glass pr-2 flex flex-col gap-1 justify-center">
            {[0, 1].map((i) => (
              <div key={i} className="h-[3px] rounded-full bg-foreground/25" style={{ width: `${40 + i * 20}%`, opacity: step > i ? 1 : 0.15, transition: "opacity 400ms" }} />
            ))}
          </div>
          <div className="flex-1 pl-2 flex flex-col gap-1 justify-center">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[3px] rounded-full" style={{ width: `${50 + i * 15}%`, opacity: step > i + 1 ? 0.7 : 0.1, background: "linear-gradient(90deg,#F5A9D0,#BFA7F8)", transition: "opacity 400ms" }} />
            ))}
          </div>
        </div>
      </Frame>
    </div>
  );
};

/* 5. Image: progressive generation — placeholder → low → medium → final */
export const ImageDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  /* stage 0 = placeholder, 1 = low, 2 = medium, 3 = final, then loop */
  const [stage, setStage] = useState(0);
  useTicker(() => setStage((s) => (s + 1) % 4), 900, ref, 600);
  const blur = [10, 6, 2.5, 0][stage];
  const opacity = [0.35, 0.6, 0.85, 1][stage];
  const pct = [12, 46, 78, 100][stage];
  return (
    <div ref={ref}>
      <Frame>
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          {/* checker placeholder */}
          <div className="absolute inset-0"
            style={{ background: "repeating-linear-gradient(45deg, hsl(var(--muted)) 0 6px, transparent 6px 12px)" }} />
          {/* progressive render */}
          <div className="absolute inset-0 transition-[filter,opacity] duration-500 ease-out"
            style={{
              background: "linear-gradient(135deg,#FD881F,#F5A9D0,#BFA7F8)",
              filter: `blur(${blur}px)`,
              opacity,
            }} />
          {/* scan line while rendering */}
          {stage < 3 && (
            <div className="absolute inset-x-0 h-[2px] bg-white/70"
              style={{ top: `${pct}%`, boxShadow: "0 0 8px rgba(255,255,255,0.6)", transition: "top 500ms ease-out" }} />
          )}
          {/* pct chip */}
          <div className="absolute bottom-1 right-1 text-[8.5px] font-mono px-1.5 py-[1px] rounded-full glass border border-glass text-foreground/75">
            {pct}%
          </div>
        </div>
      </Frame>
    </div>
  );
};

/* 6. Agent: a small chain of nodes lighting up in sequence, then a
       final glowing target — reads as "agent executing steps". Clean
       and geometric; matches the other 7 cards. */
export const AgentDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const steps = 5;
  useTicker(() => setT((v) => (v + 1) % (steps + 1)), 520, ref, 340);
  const nodes = Array.from({ length: steps }, (_, i) => ({
    cx: 18 + i * 26,
    cy: 30,
    label: ["plan", "fetch", "reason", "call", "done"][i],
  }));
  return (
    <div ref={ref}>
      <Frame>
        <svg viewBox="0 0 160 60" className="w-full h-full">
          <defs>
            <linearGradient id="agent-demo-g" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#FD881F" />
              <stop offset="55%" stopColor="#F5A9D0" />
              <stop offset="100%" stopColor="#BFA7F8" />
            </linearGradient>
            <radialGradient id="agent-demo-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stopColor="#F5A9D0" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#F5A9D0" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Connector rail */}
          {nodes.slice(0, -1).map((n, i) => {
            const active = t > i;
            return (
              <line
                key={`l-${i}`}
                x1={n.cx + 4}
                y1={n.cy}
                x2={nodes[i + 1].cx - 4}
                y2={nodes[i + 1].cy}
                stroke={active ? "url(#agent-demo-g)" : "hsl(var(--border))"}
                strokeWidth={active ? 1.4 : 0.9}
                strokeLinecap="round"
                opacity={active ? 0.95 : 0.55}
                style={{ transition: "stroke-width 260ms ease, opacity 260ms ease" }}
              />
            );
          })}
          {/* Nodes */}
          {nodes.map((n, i) => {
            const done = t > i;
            const active = t === i;
            return (
              <g key={`n-${i}`}>
                {(active || done) && (
                  <circle cx={n.cx} cy={n.cy} r={8} fill="url(#agent-demo-glow)" />
                )}
                <circle
                  cx={n.cx}
                  cy={n.cy}
                  r={active ? 4.2 : 3.4}
                  fill={done ? "url(#agent-demo-g)" : "hsl(var(--card))"}
                  stroke="url(#agent-demo-g)"
                  strokeWidth={done ? 0 : 1.1}
                  opacity={done || active ? 1 : 0.55}
                  style={{ transition: "r 260ms ease, opacity 260ms ease" }}
                />
                {active && (
                  <text
                    x={n.cx}
                    y={n.cy + 12}
                    textAnchor="middle"
                    fontSize="6.5"
                    className="fill-foreground/70"
                  >
                    {n.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </Frame>
    </div>
  );
};

/* 7. Video: frame strip + scrubbing timeline + caption stream */
export const VideoDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [f, setF] = useState(0);
  useTicker(() => setF((v) => (v + 1) % 24), 90, ref, 60);
  const captions = ["Fade in.", "City skyline.", "Interior — dawn.", "Close on hands."];
  const captionIdx = Math.floor(f / 6) % captions.length;
  return (
    <div ref={ref}>
      <Frame>
        <div className="flex flex-col gap-1 w-full h-full py-1">
          {/* frame strip */}
          <div className="flex gap-[3px] flex-1 items-stretch">
            {Array.from({ length: 8 }).map((_, i) => {
              const active = i === Math.floor(f / 3) % 8;
              return (
                <div key={i} className="flex-1 rounded-[3px] transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, hsl(${20 + i * 24} 80% 65%), hsl(${260 + i * 8} 70% 75%))`,
                    opacity: active ? 1 : 0.4,
                    transform: active ? "scaleY(1)" : "scaleY(0.78)",
                  }} />
              );
            })}
          </div>
          {/* timeline + caption */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 h-[3px] rounded-full bg-foreground/10 overflow-hidden">
              <div className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${(f / 23) * 100}%`, background: "linear-gradient(90deg,#FD881F,#BFA7F8)", transition: "width 90ms linear" }} />
            </div>
            <span className="text-[8.5px] font-mono text-foreground/55 shrink-0">{captions[captionIdx]}</span>
          </div>
        </div>
      </Frame>
    </div>
  );
};

/* 8. Marketplace: publish → validate → success confirmation */
export const MarketDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const stages = ["Push", "Validate", "Publish"] as const;
  const [stage, setStage] = useState(0);
  useTicker(() => setStage((s) => (s + 1) % 4), 900, ref, 600);
  return (
    <div ref={ref}>
      <Frame>
        <div className="flex flex-col justify-center w-full gap-1">
          <div className="text-[9.5px] font-mono text-foreground/55 truncate">
            rivinity/agent-quarterly-review
          </div>
          <div className="flex items-center gap-1.5">
            {stages.map((s, i) => {
              const done = stage > i;
              const active = stage === i;
              return (
                <div key={s} className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full flex items-center justify-center transition-all"
                      style={{
                        background: done ? "linear-gradient(135deg,#FD881F,#BFA7F8)" : "hsl(var(--muted))",
                      }}>
                      {done ? (
                        <svg viewBox="0 0 8 8" className="w-2 h-2"><path d="M1 4l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ) : active ? (
                        <span className="w-1 h-1 rounded-full bg-foreground/60 animate-pulse" />
                      ) : null}
                    </span>
                    <span className={`text-[9.5px] font-medium transition-colors ${done || active ? "text-foreground/80" : "text-foreground/40"}`}>{s}</span>
                  </div>
                  {i < stages.length - 1 && (
                    <span className="w-3 h-[1.5px] rounded-full transition-colors"
                      style={{ background: stage > i ? "linear-gradient(90deg,#FD881F,#BFA7F8)" : "hsl(var(--border))" }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Frame>
    </div>
  );
};

export const demoByTitle: Record<string, React.ComponentType> = {
  "AI Chat, orchestrated": ChatDemo,
  "App Builder": AppBuilderDemo,
  "Audio Lab": AudioDemo,
  "RivinityLM": NotesDemo,
  "Image Enhancer": ImageDemo,
  "Agent Playground": AgentDemo,
  "Prompt to Video": VideoDemo,
  "Marketplace": MarketDemo,
};
