import { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  FlaskConical,
  Brain,
  GitBranch,
  Bot,
  Image as ImageIcon,
  Film,
  Mic,
  Database,
  Cpu,
  Store,
  Code2,
  Globe,
  Workflow,
  Network,
  Rocket,
  LucideIcon,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import RivinityCoreMark from "@/components/rivinity/RivinityCoreMark";
import LogoAssembly from "@/components/rivinity/LogoAssembly";

type Module = {
  id: string;
  label: string;
  icon: LucideIcon;
  tagline: string;
  desc: string;
  related: string[];
  to?: string;
  preview: "memory" | "research" | "reasoning" | "agents" | "image" | "video"
    | "audio" | "apis" | "marketplace" | "datasets" | "models" | "browser"
    | "kg" | "workflows" | "deployment";
};

/**
 * 15 modules orbit the Rivinity Core. Order below defines their angular
 * position on the ring (starting at 12 o'clock, moving clockwise) so semantic
 * clusters — reasoning / agents / data / creative — sit next to each other.
 */
const MODULES: Module[] = [
  { id: "research",   label: "Research",        icon: FlaskConical, tagline: "Signal, not noise",         desc: "Signal-filtered discovery across papers, docs, and the live web.",                related: ["memory", "browser", "kg", "reasoning"],                         to: "/research",          preview: "research" },
  { id: "memory",     label: "Memory",          icon: Brain,        tagline: "Context that persists",     desc: "Persistent, scoped context that reconnects prior work into every new prompt.",   related: ["research", "reasoning", "agents", "kg", "workflows"],           preview: "memory" },
  { id: "reasoning",  label: "Reasoning",       icon: GitBranch,    tagline: "Inspectable thought",       desc: "Explicit reasoning graphs — inspectable, replayable, tunable end-to-end.",       related: ["memory", "agents", "workflows"],                                preview: "reasoning" },
  { id: "agents",     label: "Agents",          icon: Bot,          tagline: "Tools with a mind",         desc: "Tool-using workers with typed traces, scoped credentials, and observable state.",related: ["reasoning", "workflows", "browser", "apis", "marketplace"],     to: "/agent-playground",  preview: "agents" },
  { id: "workflows",  label: "Workflow Engine", icon: Workflow,     tagline: "Reusable intelligence",     desc: "Compose multi-step pipelines that run on schedule, on demand, or via API.",      related: ["agents", "reasoning", "deployment", "apis", "memory"],          preview: "workflows" },
  { id: "deployment", label: "Deployment",      icon: Rocket,       tagline: "Ship anywhere",             desc: "Ship workflows to VPC, single-tenant, or the shared cloud with one manifest.",   related: ["workflows", "apis"],                                            preview: "deployment" },
  { id: "apis",       label: "Developer APIs",  icon: Code2,        tagline: "One SDK, everything",       desc: "One SDK across every capability. Streaming, traces, and typed errors built in.", related: ["agents", "workflows", "deployment", "models", "marketplace"],   preview: "apis" },
  { id: "marketplace",label: "Marketplace",     icon: Store,        tagline: "Publish & install",         desc: "Curated agents, datasets, and tools — publish from GitHub and install in seconds.",related: ["apis", "agents", "models", "datasets"],                       to: "/marketplace",       preview: "marketplace" },
  { id: "models",     label: "Models",          icon: Cpu,          tagline: "The right model, always",   desc: "Curated frontier and open-weight fleet, load-balanced by the router.",           related: ["apis", "marketplace", "image", "video", "audio", "datasets"],   preview: "models" },
  { id: "datasets",   label: "Datasets",        icon: Database,     tagline: "Governed data",             desc: "Governed data with per-workspace scopes, lineage, and access policies.",         related: ["models", "kg", "marketplace"],                                  preview: "datasets" },
  { id: "kg",         label: "Knowledge Graph", icon: Network,      tagline: "Your workspace, linked",    desc: "Every fact you touch, linked — your workspace becomes a living graph of context.",related: ["memory", "research", "datasets"],                              preview: "kg" },
  { id: "browser",    label: "Browser",         icon: Globe,        tagline: "Agents on the open web",    desc: "A programmable browser that agents drive on your behalf, with sandboxed sessions.",related: ["agents", "research"],                                        preview: "browser" },
  { id: "image",      label: "Image",           icon: ImageIcon,    tagline: "Per-pixel fidelity",        desc: "Restore, upscale, and reframe imagery progressively — every tile visible as it renders.",related: ["models", "video"],                                       to: "/image-enhancer",    preview: "image" },
  { id: "video",      label: "Video",           icon: Film,         tagline: "Prompt to clip",            desc: "Prompt-to-clip generation with style presets, timeline scrubbing, and render history.",related: ["image", "audio", "models"],                                to: "/prompt-to-video",   preview: "video" },
  { id: "audio",      label: "Audio",           icon: Mic,          tagline: "Voice, tuned",              desc: "TTS, transcription, and voice cloning tuned for production-grade waveforms.",    related: ["video", "models"],                                              to: "/audio-lab",         preview: "audio" },
];

/* Ring geometry — evenly spaced around the Core */
const CX = 80;   // center X in SVG viewBox units
const CY = 50;   // center Y
const RX = 62;   // horizontal radius
const RY = 40;   // vertical radius
const VB_W = 160;
const VB_H = 100;

/* Radii of the invisible perimeter where spokes terminate — sized so
   each dotted spoke lands right on the tip of a visible lotus petal,
   not somewhere deep inside the flower. */
const CORE_RX = 16;
const CORE_RY = 16;

const nodePos = (i: number) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / MODULES.length;
  return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) };
};

/* For each module, the point on the core mark perimeter where its spoke
   lands — computed from the module's angle around the ring. */
const corePerimeter = (i: number) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / MODULES.length;
  return { x: CX + CORE_RX * Math.cos(a), y: CY + CORE_RY * Math.sin(a) };
};

const POSITIONS = MODULES.map((_, i) => nodePos(i));
const CORE_POINTS = MODULES.map((_, i) => corePerimeter(i));

const byId = (id: string) => MODULES.find((m) => m.id === id)!;
const idxOf = (id: string) => MODULES.findIndex((m) => m.id === id);

const PlatformExplorer = () => {
  const [hover, setHover] = useState<string | null>(null);
  const [auto, setAuto] = useState<string | null>("memory");

  /* Ambient auto-cycle so the graph is always alive; hover overrides. */
  useEffect(() => {
    if (hover) return;
    const id = window.setInterval(() => {
      setAuto((prev) => {
        const i = prev ? idxOf(prev) : -1;
        return MODULES[(i + 1) % MODULES.length].id;
      });
    }, 2600);
    return () => clearInterval(id);
  }, [hover]);

  const focus = hover ?? auto;

  const activeSet = useMemo(() => {
    if (!focus) return new Set<string>();
    return new Set<string>([focus, ...byId(focus).related]);
  }, [focus]);

  const activeModule = focus ? byId(focus) : null;

  return (
    <section id="platform" className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
      <ScrollReveal className="max-w-3xl mb-12 text-center mx-auto">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/50 mb-4">
          Platform Explorer
        </div>
        <h2 className="text-[36px] lg:text-[48px] font-semibold tracking-tight leading-[1.15]">
          One core.
          <br />
          <span className="gradient-accent-text">Fifteen surfaces of intelligence.</span>
        </h2>
        <p className="mt-4 text-[15px] text-foreground/65 max-w-xl mx-auto">
          Every module runs on the same Rivinity Core — same memory, same context, same identity. Hover any node to trace the flow.
        </p>
      </ScrollReveal>

      {/* Desktop / tablet: interactive intelligence network */}
      <div className="hidden md:block glass-strong border border-glass rounded-3xl shadow-float p-4 lg:p-6">
        <div
          className="relative mx-auto w-full"
          style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
          onMouseLeave={() => setHover(null)}
        >
          <NetworkSVG focus={focus} activeSet={activeSet} />

          {/* Gradient shader core — adapted from 21st.dev gradient-shader-card.
              A deliberate glowing core (animated conic + layered radials with
              screen blending) that sits behind the RivinityCoreMark and reads
              as an intentional light source rather than a stray blur. */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none pmap-shader"
            style={{ left: `${(CX / VB_W) * 100}%`, top: `${(CY / VB_H) * 100}%` }}
            aria-hidden
          >
            <div className="pmap-shader-inner">
              <div className="pmap-shader-conic" />
              <div className="pmap-shader-blob pmap-shader-blob-a" />
              <div className="pmap-shader-blob pmap-shader-blob-b" />
              <div className="pmap-shader-blob pmap-shader-blob-c" />
              <div className="pmap-shader-grain" />
            </div>
          </div>

          {/* Rivinity Core — brand primitive. Each petal lights up as its
              corresponding capability is explored. */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
            style={{ left: `${(CX / VB_W) * 100}%`, top: `${(CY / VB_H) * 100}%` }}
          >
            <RivinityCoreMark
              size={240}
              segments={MODULES.length}
              activeIndex={focus ? idxOf(focus) : null}
              idSuffix="platform-explorer"
            />
            {/* 3-part logo assembly sits inside the core outline, echoing the
                same brand primitive at a smaller scale so the geometry reads
                as intentional rather than decorative. */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <LogoAssembly size={104} startDelay={0.4} />
            </div>
          </div>

         {/* Module nodes */}
          {MODULES.map((m, i) => {
            const p = POSITIONS[i];
            const isFocus = focus === m.id;
            const isRelated = !isFocus && activeSet.has(m.id);
            const dimmed = focus && !activeSet.has(m.id);
            const Icon = m.icon;

            const commonClasses = `absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-2.5 py-1.5 flex items-center gap-2 transition-all duration-500 cursor-pointer select-none text-left ${
              isFocus
                ? "glass-strong border-glass-hover shadow-glow-accent z-30"
                : isRelated
                ? "glass-strong border-glass-hover shadow-float z-20"
                : "glass border-glass z-10"
            }`;

            const commonStyles = {
              left: `${(p.x / VB_W) * 100}%`,
              top: `${(p.y / VB_H) * 100}%`,
              opacity: dimmed ? 0.28 : 1,
              transform: `translate(-50%,-50%) scale(${isFocus ? 1.04 : 1})`,
            };

            const content = (
              <>
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                    isFocus
                      ? "text-foreground"
                      : isRelated
                      ? "text-foreground/85"
                      : "text-foreground/55"
                  }`}
                  strokeWidth={1.75}
                />
                <span className="text-[11.5px] font-semibold tracking-tight whitespace-nowrap">
                  {m.label}
                </span>
              </>
            );

            if (m.to) {
              return (
                <Link
                  key={m.id}
                  to={m.to}
                  onMouseEnter={() => setHover(m.id)}
                  onFocus={() => setHover(m.id)}
                  onBlur={() => setHover(null)}
                  aria-label={m.label}
                  className={commonClasses}
                  style={commonStyles}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={m.id}
                type="button"
                onMouseEnter={() => setHover(m.id)}
                onFocus={() => setHover(m.id)}
                onBlur={() => setHover(null)}
                aria-label={m.label}
                className={commonClasses}
                style={commonStyles}
              >
                {content}
              </button>
            );
          })}
        </div>

        
        {/* Live preview */}
        <PreviewPanel module={activeModule} />
      </div>

      {/* Mobile: horizontal carousel of the same intelligence, with live previews inline */}
      <div className="md:hidden -mx-5 px-5">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 no-scrollbar">
          {MODULES.map((m) => (
            <div
              key={m.id}
              className="snap-center shrink-0 w-[78%] glass-strong border border-glass rounded-2xl shadow-float p-4"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <m.icon className="w-4 h-4 text-foreground/70 shrink-0" strokeWidth={1.75} />
                <div>
                  <div className="text-[13.5px] font-semibold tracking-tight">{m.label}</div>
                  <div className="text-[10.5px] uppercase tracking-[0.14em] text-foreground/45">{m.tagline}</div>
                </div>
              </div>
              <LivePreview kind={m.preview} />
              <p className="mt-3 text-[12px] text-foreground/60 leading-relaxed">{m.desc}</p>
              <div className="mt-3 text-[10px] uppercase tracking-[0.14em] text-foreground/40">
                Connects to {m.related.length} modules
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pmapDash { to { stroke-dashoffset: -24; } }
        @keyframes pmapShaderSpin { to { transform: rotate(360deg); } }
        @keyframes pmapShaderDrift {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(6%,-4%) scale(1.15); }
        }
        @keyframes pmapShaderDrift2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-7%,5%) scale(1.2); }
        }
        @keyframes pmapShaderDrift3 {
          0%,100% { transform: translate(0,0) scale(1.05); }
          50%     { transform: translate(4%,6%) scale(0.95); }
        }
        @keyframes pmapShaderPulse {
          0%,100% { opacity: 0.85; }
          50%     { opacity: 1; }
        }
        .pmap-shader {
          width: 260px; height: 260px;
          border-radius: 9999px;
          filter: saturate(1.2) contrast(1.05);
          animation: pmapShaderPulse 6s ease-in-out infinite;
        }
        .pmap-shader-inner {
          position: relative; width: 100%; height: 100%;
          border-radius: inherit; overflow: hidden;
          -webkit-mask-image: radial-gradient(closest-side, #000 45%, rgba(0,0,0,0.35) 78%, transparent 100%);
                  mask-image: radial-gradient(closest-side, #000 45%, rgba(0,0,0,0.35) 78%, transparent 100%);
        }
        .pmap-shader-conic {
          position: absolute; inset: -20%;
          background: conic-gradient(from 0deg,
            #FD881F 0%, #F5A9D0 25%, #BFA7F8 50%,
            #F5A9D0 75%, #FD881F 100%);
          filter: blur(14px);
          opacity: 0.45;
          animation: pmapShaderSpin 24s linear infinite;
          mix-blend-mode: screen;
        }
        .pmap-shader-blob {
          position: absolute; border-radius: 9999px;
          filter: blur(22px);
          mix-blend-mode: screen;
        }
        .pmap-shader-blob-a {
          inset: 10% 25% 40% 10%;
          background: radial-gradient(circle, #FD881F 0%, transparent 65%);
          opacity: 0.55;
          animation: pmapShaderDrift 11s ease-in-out infinite;
        }
        .pmap-shader-blob-b {
          inset: 30% 8% 12% 30%;
          background: radial-gradient(circle, #BFA7F8 0%, transparent 65%);
          opacity: 0.55;
          animation: pmapShaderDrift2 13s ease-in-out infinite;
        }
        .pmap-shader-blob-c {
          inset: 20% 20% 25% 25%;
          background: radial-gradient(circle, #F5A9D0 0%, transparent 60%);
          opacity: 0.45;
          animation: pmapShaderDrift3 9s ease-in-out infinite;
        }
        .pmap-shader-grain {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.35) 0.5px, transparent 0.6px);
          background-size: 3px 3px;
          mix-blend-mode: overlay;
          opacity: 0.18;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default PlatformExplorer;

/* ------------------------------------------------------------------ */
/* Network SVG — organic curved lines from each module to Core, plus  */
/* inter-module edges. Uses Rivinity's flowing tri-color gradient.    */
/* ------------------------------------------------------------------ */
const NetworkSVG = ({
  focus,
  activeSet,
}: {
  focus: string | null;
  activeSet: Set<string>;
}) => {
  /* Build spoke paths — module → a point on the Rivinity Core mark's
     perimeter (not a plain circle), with a gentle perpendicular curve
     that reads as flowing intelligence rather than a straight radial. */
  const spokes = MODULES.map((m, i) => {
    const p = POSITIONS[i];
    const cp = CORE_POINTS[i];
    const mx = (p.x + cp.x) / 2;
    const my = (p.y + cp.y) / 2;
    // perpendicular offset — tangential to the ring for an organic swirl
    const dx = cp.x - p.x;
    const dy = cp.y - p.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const off = 5.5;
    const cx = mx + nx * off;
    const cy = my + ny * off;
    return { id: m.id, d: `M ${p.x} ${p.y} Q ${cx} ${cy} ${cp.x} ${cp.y}` };
  });

  /* Inter-module edges (deduped) */
  const edges: { a: string; b: string; d: string }[] = [];
  const seen = new Set<string>();
  MODULES.forEach((m, i) => {
    m.related.forEach((rid) => {
      const key = [m.id, rid].sort().join("|");
      if (seen.has(key)) return;
      seen.add(key);
      const j = idxOf(rid);
      if (j < 0) return;
      const a = POSITIONS[i];
      const b = POSITIONS[j];
      // Curve control biased toward center for an orbital feel
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const cx = mx + (CX - mx) * 0.35;
      const cy = my + (CY - my) * 0.35;
      edges.push({ a: m.id, b: rid, d: `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}` });
    });
  });

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <defs>
        <linearGradient id="pmap-flow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FD881F" />
          <stop offset="45%" stopColor="#F5A9D0" />
          <stop offset="100%" stopColor="#BFA7F8" />
        </linearGradient>
        <linearGradient id="pmap-flow-idle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FD881F" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#BFA7F8" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* inter-module edges — always visible, subdued */}
      {edges.map((e, i) => {
        const active = !!focus && (e.a === focus || e.b === focus);
        const dimmed = !!focus && !active;
        return (
          <path
            key={`e-${i}`}
            d={e.d}
            fill="none"
            stroke={active ? "url(#pmap-flow)" : "url(#pmap-flow-idle)"}
            strokeWidth={active ? 0.45 : 0.18}
            opacity={dimmed ? 0.08 : active ? 0.95 : 0.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{
              transition: "opacity 400ms ease, stroke-width 400ms ease",
              strokeDasharray: active ? "1.2 2" : undefined,
              animation: active ? "pmapDash 2.2s linear infinite" : undefined,
            }}
          />
        );
      })}

      {/* spokes — every module -> core */}
      {spokes.map((s) => {
        const active = focus === s.id || (focus && activeSet.has(s.id));
        const dimmed = !!focus && !active;
        const primary = focus === s.id;
        return (
          <path
            key={`s-${s.id}`}
            d={s.d}
            fill="none"
            stroke={primary ? "url(#pmap-flow)" : "url(#pmap-flow-idle)"}
            strokeWidth={primary ? 0.6 : active ? 0.45 : 0.38}
            opacity={dimmed ? 0.35 : primary ? 1 : active ? 0.95 : 0.8}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{
              transition: "opacity 400ms ease, stroke-width 400ms ease",
              // Always dotted — every service is visibly wired to its petal.
              strokeDasharray: primary ? "0.25 1.2" : "0.25 1.3",
              animation: primary ? "pmapDash 1.8s linear infinite" : undefined,
            }}
          />
        );
      })}

      {/* Energy pulses — traveling dots from the Core outward to each
          module, so intelligence visibly *flows* out of Rivinity into
          every surface. Reverse path so motion goes core → node. */}
      {spokes.map((s, i) => {
        const active = focus === s.id || (focus && activeSet.has(s.id));
        const dimmed = !!focus && !active;
        // Duration staggered so pulses don't all fire in lockstep.
        const dur = 2.6 + (i % 4) * 0.35;
        const delay = (i * 0.28) % dur;
        return (
          <g key={`p-${s.id}`} opacity={dimmed ? 0.2 : active ? 1 : 0.7}>
            <circle r={active ? 0.9 : 0.65} fill="url(#pmap-flow)">
              <animateMotion
                dur={`${dur}s`}
                begin={`-${delay}s`}
                repeatCount="indefinite"
                keyPoints="1;0"
                keyTimes="0;1"
                calcMode="linear"
                path={s.d}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.15;0.85;1"
                dur={`${dur}s`}
                begin={`-${delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* Live preview panel (desktop)                                       */
/* ------------------------------------------------------------------ */
const PreviewPanel = ({ module: m }: { module: Module | null }) => {
  if (!m) return null;
  const Icon = m.icon;
  return (
    <div className="mt-6 border-t border-glass pt-5 grid md:grid-cols-[1fr_minmax(280px,42%)] gap-6 items-start">
      <div key={m.id + "-copy"} className="animate-fade-in">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
          {m.tagline} · connects to {m.related.length} modules
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,rgba(253,136,31,0.28),rgba(245,169,208,0.28),rgba(191,167,248,0.28))" }}
          >
            <Icon className="w-4 h-4 text-foreground/85" />
          </span>
          <div className="text-[17px] font-semibold tracking-tight">{m.label}</div>
          {m.to && (
            <Link
              to={m.to}
              className="ml-auto md:hidden text-[12px] font-medium px-3 h-8 inline-flex items-center rounded-full glass border border-glass hover:bg-accent/60 transition-colors"
            >
              Open →
            </Link>
          )}
        </div>
        <p className="mt-2 text-[13.5px] text-foreground/65 leading-relaxed max-w-md">{m.desc}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {m.related.slice(0, 5).map((rid) => (
            <span key={rid} className="text-[10.5px] font-medium text-foreground/60 px-2 py-0.5 rounded-full glass border border-glass">
              {byId(rid).label}
            </span>
          ))}
        </div>
        {m.to && (
          <Link
            to={m.to}
            className="hidden md:inline-flex mt-4 text-[12px] font-medium px-3 h-8 items-center rounded-full glass border border-glass hover:bg-accent/60 transition-colors"
          >
            Open {m.label} →
          </Link>
        )}
      </div>
      <div key={m.id + "-preview"} className="animate-fade-in">
        <LivePreview kind={m.preview} />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Live micro-previews — one per module. SVG / DOM only, GPU friendly. */
/* ------------------------------------------------------------------ */
const PreviewFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full h-[140px] rounded-2xl glass border border-glass overflow-hidden p-3">
    {/* Soft brand wash — gives every capability preview the same
        clean, high-quality backdrop instead of a bare glass panel. */}
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none opacity-70"
      style={{
        background:
          "radial-gradient(70% 90% at 0% 0%, rgba(253,136,31,0.10), transparent 60%)," +
          "radial-gradient(70% 90% at 100% 100%, rgba(191,167,248,0.12), transparent 60%)",
      }}
    />
    <div
      aria-hidden
      className="absolute inset-x-3 bottom-0 h-px pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(245,169,208,0.35), transparent)",
      }}
    />
    <div className="relative z-10 w-full h-full">{children}</div>
  </div>
);

const useLoop = (n: number, ms: number) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => clearInterval(id);
  }, [n, ms]);
  return i;
};

const LivePreview = ({ kind }: { kind: Module["preview"] }) => {
  switch (kind) {
    case "memory":       return <MemoryPreview />;
    case "research":     return <ResearchPreview />;
    case "reasoning":    return <ReasoningPreview />;
    case "agents":       return <AgentsPreview />;
    case "workflows":    return <WorkflowsPreview />;
    case "deployment":   return <DeploymentPreview />;
    case "apis":         return <ApisPreview />;
    case "marketplace":  return <MarketplacePreview />;
    case "models":       return <ModelsPreview />;
    case "datasets":     return <DatasetsPreview />;
    case "kg":           return <KgPreview />;
    case "browser":      return <BrowserPreview />;
    case "image":        return <ImagePreview />;
    case "video":        return <VideoPreview />;
    case "audio":        return <AudioPreview />;
  }
};

const FLOW = "linear-gradient(90deg,#FD881F,#F5A9D0,#BFA7F8)";

const MemoryPreview = () => (
  <PreviewFrame>
    <svg viewBox="0 0 400 120" className="w-full h-full">
      <defs>
        <linearGradient id="mem-l" x1="0%" x2="100%"><stop offset="0%" stopColor="#FD881F"/><stop offset="100%" stopColor="#BFA7F8"/></linearGradient>
      </defs>
      {[{x:40,y:60,l:"now"},{x:150,y:25,l:"Q2 review"},{x:190,y:95,l:"pricing"},{x:310,y:55,l:"launch OKRs"}].map((n,i)=>(
        <g key={i} style={{animation:`fade-in 500ms ${i*140}ms both`}}>
          {i>0 && <line x1={40} y1={60} x2={n.x} y2={n.y} stroke="url(#mem-l)" strokeWidth="1" opacity="0.75"/>}
          <circle cx={n.x} cy={n.y} r={i===0?6:4} fill="hsl(var(--card))" stroke="url(#mem-l)" strokeWidth="1.4"/>
          <text x={n.x+8} y={n.y+3} fontSize="10" className="fill-foreground/60">{n.l}</text>
        </g>
      ))}
    </svg>
  </PreviewFrame>
);

const ResearchPreview = () => {
  const items = ["arxiv:2410.03427", "workspace/Q2-review", "notion/pricing", "gh/rivinity/core", "stanford.edu/paper"];
  return (
    <PreviewFrame>
      <div className="space-y-1.5">
        {items.map((s,i)=>(
          <div key={s} className="flex items-center gap-2 text-[11px] text-foreground/70" style={{animation:`fade-up 400ms ${i*90}ms both`}}>
            <span className="text-[9px] font-mono text-foreground/40 w-5">[{i+1}]</span>
            <span className="truncate">{s}</span>
            <span className="ml-auto text-[9px] text-foreground/40 font-mono">0.9{9-i}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
};

const ReasoningPreview = () => (
  <PreviewFrame>
    <svg viewBox="0 0 400 120" className="w-full h-full">
      <defs><linearGradient id="rp-l" x1="0%" x2="100%"><stop offset="0%" stopColor="#FD881F"/><stop offset="100%" stopColor="#BFA7F8"/></linearGradient></defs>
      {[[40,60,140,25],[40,60,140,60],[40,60,140,95],[140,25,260,45],[140,60,260,45],[140,60,260,90],[140,95,260,90],[260,45,360,60],[260,90,360,60]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#rp-l)" strokeWidth="1" opacity="0.75" style={{animation:`fade-in 500ms ${i*60}ms both`}}/>
      ))}
      {[[40,60],[140,25],[140,60],[140,95],[260,45],[260,90],[360,60]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="4" fill="hsl(var(--card))" stroke="url(#rp-l)" strokeWidth="1.4"/>
      ))}
    </svg>
  </PreviewFrame>
);

const AgentsPreview = () => {
  const lines = ["agent.boot()", "→ tool: memory.recall", "→ tool: analytics.query", "→ compose(summary)", "✓ done · 1.4s"];
  return (
    <PreviewFrame>
      <div className="font-mono text-[11px] space-y-1">
        {lines.map((l,i)=>(
          <div key={i} className="text-foreground/70" style={{animation:`fade-up 400ms ${i*120}ms both`}}>
            <span className="text-foreground/35">$</span> {l}
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
};

const WorkflowsPreview = () => {
  const steps = ["Trigger", "Fetch", "Reason", "Compose", "Notify"];
  return (
    <PreviewFrame>
      <div className="flex items-center gap-1.5 h-full">
        {steps.map((s,i)=>(
          <div key={s} className="flex items-center gap-1.5">
            <div className="glass border border-glass rounded-lg px-2 py-1.5 text-[10.5px] font-medium text-foreground/75" style={{animation:`fade-up 400ms ${i*120}ms both`}}>{s}</div>
            {i<steps.length-1 && <div className="w-4 h-[2px] rounded-full" style={{background:FLOW}}/>}
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
};

const DeploymentPreview = () => {
  const targets = [{n:"vpc-prod",r:"us-east-1"},{n:"single-tenant",r:"eu-west-2"},{n:"shared-cloud",r:"global"}];
  return (
    <PreviewFrame>
      <div className="space-y-1.5">
        {targets.map((t,i)=>(
          <div key={t.n} className="flex items-center gap-2 text-[11px]" style={{animation:`fade-up 400ms ${i*140}ms both`}}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
            <span className="font-mono text-foreground/75">{t.n}</span>
            <span className="ml-auto text-[10px] text-foreground/40 font-mono">{t.r} · healthy</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
};

const ApisPreview = () => {
  const lines = [
    `POST /v1/agents/run`,
    `{ "input": "summarize Q3", "stream": true }`,
    ``,
    `200 OK  ·  event: token`,
    `{ "token": "Growth was..." }`,
  ];
  return (
    <PreviewFrame>
      <div className="font-mono text-[10.5px] leading-[1.5] space-y-0.5">
        {lines.map((l,i)=>(
          <div key={i} className="text-foreground/70" style={{animation:`fade-up 400ms ${i*80}ms both`}}>{l||"\u00A0"}</div>
        ))}
      </div>
    </PreviewFrame>
  );
};

const MarketplacePreview = () => {
  const i = useLoop(3, 900);
  const stages = ["Push", "Review", "Published"];
  return (
    <PreviewFrame>
      <div className="flex flex-col justify-center h-full">
        <div className="text-[11px] text-foreground/60 mb-2 font-mono">rivinity/agent-quarterly-review</div>
        <div className="flex items-center gap-2">
          {stages.map((s,k)=>(
            <div key={s} className={`flex items-center gap-2 text-[11px] transition-opacity ${k<=i?"text-foreground":"text-foreground/40"}`}>
              <span className={`w-2 h-2 rounded-full ${k<i?"":"animate-pulse"}`} style={{background:k<=i?"linear-gradient(135deg,#FD881F,#BFA7F8)":"hsl(var(--border))"}}/>
              <span className="font-medium">{s}</span>
              {k<stages.length-1 && <span className="w-4 h-[1.5px] rounded-full" style={{background:k<i?FLOW:"hsl(var(--border))"}}/>}
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
};

const ModelsPreview = () => {
  const models = [
    {n:"gpt-4o", load:76},{n:"claude-3.5", load:54},{n:"gemini-2", load:31},{n:"llama-3.1", load:62},
  ];
  return (
    <PreviewFrame>
      <div className="space-y-1.5">
        {models.map((m,i)=>(
          <div key={m.n} className="flex items-center gap-2 text-[11px]" style={{animation:`fade-up 400ms ${i*90}ms both`}}>
            <span className="w-20 font-mono text-foreground/75">{m.n}</span>
            <div className="flex-1 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
              <div className="h-full rounded-full" style={{width:`${m.load}%`,background:FLOW,animation:`progressBar 700ms ${i*120}ms ease-out both`}}/>
            </div>
            <span className="text-[10px] text-foreground/45 font-mono w-8 text-right">{m.load}%</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
};

const DatasetsPreview = () => (
  <PreviewFrame>
    <div className="space-y-1.5">
      {[{n:"customer-events",r:"read",s:"12.4M"},{n:"pricing-history",r:"read/write",s:"3.1k"},{n:"support-tickets",r:"scoped",s:"84k"}].map((d,i)=>(
        <div key={d.n} className="flex items-center gap-2 text-[11px]" style={{animation:`fade-up 400ms ${i*100}ms both`}}>
          <span className="font-mono text-foreground/75 flex-1 truncate">{d.n}</span>
          <span className="text-[9.5px] px-1.5 py-0.5 rounded-full glass border border-glass text-foreground/60">{d.r}</span>
          <span className="text-[9.5px] font-mono text-foreground/40 w-12 text-right">{d.s}</span>
        </div>
      ))}
    </div>
  </PreviewFrame>
);

const KgPreview = () => (
  <PreviewFrame>
    <svg viewBox="0 0 400 120" className="w-full h-full">
      <defs><linearGradient id="kg-l" x1="0%" x2="100%"><stop offset="0%" stopColor="#FD881F"/><stop offset="100%" stopColor="#BFA7F8"/></linearGradient></defs>
      {[[80,60,180,30],[80,60,180,90],[180,30,280,60],[180,90,280,60],[280,60,350,35],[280,60,350,90]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#kg-l)" strokeWidth="1" opacity="0.7" style={{animation:`fade-in 500ms ${i*80}ms both`}}/>
      ))}
      {[[80,60,"you"],[180,30,"launch"],[180,90,"pricing"],[280,60,"Q3"],[350,35,"revenue"],[350,90,"churn"]].map(([x,y,l],i)=>(
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="4" fill="hsl(var(--card))" stroke="url(#kg-l)" strokeWidth="1.4"/>
          <text x={(x as number)+7} y={(y as number)+3} fontSize="9.5" className="fill-foreground/55">{l}</text>
        </g>
      ))}
    </svg>
  </PreviewFrame>
);

const BrowserPreview = () => (
  <PreviewFrame>
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/20"/>
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/20"/>
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/20"/>
        <div className="ml-2 flex-1 h-5 rounded-md glass border border-glass px-2 flex items-center text-[10px] font-mono text-foreground/60">
          rivinity://agent-session/browse
        </div>
      </div>
      <div className="flex-1 rounded-lg glass border border-glass p-2 space-y-1">
        {[70,90,60,80].map((w,i)=>(
          <div key={i} className="h-1.5 rounded-full bg-foreground/10 overflow-hidden">
            <div className="h-full rounded-full" style={{width:`${w}%`,background:FLOW,animation:`progressBar 600ms ${i*140}ms ease-out both`}}/>
          </div>
        ))}
      </div>
    </div>
  </PreviewFrame>
);

const ImagePreview = () => {
  /* Progressive render — tiles fade in in a scan pattern */
  const tiles = Array.from({ length: 32 });
  return (
    <PreviewFrame>
      <div className="grid grid-cols-8 gap-[2px] h-full">
        {tiles.map((_,i)=>(
          <div key={i} className="rounded-[2px]" style={{
            background:FLOW,
            opacity:0,
            animation:`fade-in 500ms ${i*35}ms forwards`,
          }}/>
        ))}
      </div>
    </PreviewFrame>
  );
};

const VideoPreview = () => {
  const i = useLoop(24, 90);
  return (
    <PreviewFrame>
      <div className="h-full flex flex-col">
        <div className="flex-1 rounded-lg" style={{background:"linear-gradient(120deg,rgba(253,136,31,0.15),rgba(245,169,208,0.15),rgba(191,167,248,0.15))"}}/>
        <div className="mt-2 relative h-4 rounded-full glass border border-glass overflow-hidden">
          <div className="absolute inset-y-0 left-0 rounded-full" style={{width:`${(i/23)*100}%`,background:FLOW,transition:"width 90ms linear"}}/>
          <div className="absolute inset-0 flex items-center justify-between px-2 text-[9px] font-mono text-foreground/50">
            <span>00:0{Math.min(9,Math.floor(i/3))}</span><span>00:24</span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
};

const AudioPreview = () => {
  const bars = 40;
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setT((v) => v + 1), 90);
    return () => clearInterval(id);
  }, []);
  return (
    <PreviewFrame>
      <div className="flex items-center gap-[3px] h-full">
        {Array.from({length:bars}).map((_,i)=>{
          const h = 20 + Math.abs(Math.sin((i+t)*0.35))*70;
          return <div key={i} className="w-[3px] rounded-full" style={{height:`${h}%`,background:FLOW,opacity:0.85}}/>;
        })}
      </div>
    </PreviewFrame>
  );
};
