import { Brain, Zap, Cpu, Layout, AudioWaveform, GraduationCap, ImageIcon, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const models = [
  { label: "Rivinity Core", route: "/app", icon: Cpu, meta: "v2.4 · 128k ctx" },
  { label: "Rivinity Builder", route: "/app-builder", icon: Layout, meta: "v1.8 · 64k ctx" },
  { label: "Audio Lab", route: "/audio-lab", icon: AudioWaveform, meta: "v1.2 · Studio" },
  { label: "RivinityLM", route: "/rivinity-lm", icon: GraduationCap, meta: "v2.0 · 200k ctx" },
  { label: "Image Enhancer", route: "/image-enhancer", icon: ImageIcon, meta: "v1.5 · Vision" },
];

interface Props {
  label?: string;
}

const ModelSelectorCard = ({ label = "Model" }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current =
    models.find((m) => m.route === location.pathname) ||
    (location.pathname === "/" ? models[0] : models[0]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-3 px-1">
        {label}
      </p>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full glass rounded-2xl p-4 border border-glass shadow-float text-left hover:border-glass-hover transition-colors"
      >
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="w-8 h-8 rounded-xl gradient-accent flex items-center justify-center shrink-0">
            <Brain className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{current.label}</p>
            <p className="text-[11px] text-muted-foreground/60">{current.meta}</p>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-muted-foreground/50 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400/60 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
          </span>
          <Zap className="w-3 h-3 text-primary" />
          <span className="text-[11px] text-muted-foreground/60">Fast inference · Online</span>
        </div>
      </button>

      {open && (
        <div className="absolute top-full mt-1.5 left-0 right-0 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in z-50">
          {models.map((m) => {
            const Icon = m.icon;
            const active = m.route === current.route;
            return (
              <button
                key={m.route}
                onClick={() => {
                  navigate(m.route);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] transition-colors ${
                  active
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                <span className="flex-1 text-left truncate">{m.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ModelSelectorCard;
