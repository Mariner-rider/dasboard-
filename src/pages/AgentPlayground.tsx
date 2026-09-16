import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";

import { PanelLeft, Bot, Play, Save, Sparkles, Wrench, Cpu, Thermometer, Zap, Plus, X } from "lucide-react";

const toolCatalog = [
  { id: "web", label: "Web Search" },
  { id: "code", label: "Code Runner" },
  { id: "db", label: "Database" },
  { id: "img", label: "Image Gen" },
  { id: "vid", label: "Video Gen" },
  { id: "voice", label: "Voice / TTS" },
  { id: "docs", label: "Docs Retriever" },
  { id: "email", label: "Email Sender" },
];

const AgentPlayground = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [name, setName] = useState("Untitled Agent");
  const [system, setSystem] = useState("You are a helpful, precise assistant that reasons step-by-step.");
  const [model, setModel] = useState("Rivinity Core");
  const [temp, setTemp] = useState(0.7);
  const [tools, setTools] = useState<string[]>(["web", "code"]);
  const [input, setInput] = useState("");
  const [log, setLog] = useState<{ role: "user" | "agent" | "tool"; text: string }[]>([]);

  const toggleTool = (id: string) =>
    setTools((p) => (p.includes(id) ? p.filter((t) => t !== id) : [...p, id]));

  const run = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setLog((l) => [...l, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      setLog((l) => [
        ...l,
        { role: "tool", text: `Orchestrator → routed to: ${tools.slice(0, 2).map((t) => toolCatalog.find(c => c.id === t)?.label).join(", ") || "core"}` },
        { role: "agent", text: `Simulated response for "${q}" using ${model} @ temp ${temp}.` },
      ]);
    }, 500);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* 
        FIX: Changed width from "260 : 0" to "340 : 88" 
        Passed open and onToggle so the sidebar displays at full 340px without clipping!
      */}
      <div
        className="shrink-0 transition-all duration-300 ease-in-out border-r border-border/40"
        style={{ width: sidebarOpen ? 340 : 88 }}
      >
        <CanvasSidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
          onCollapse={() => setSidebarOpen(false)}
        />
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

        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 px-6 pb-6 overflow-hidden">
          {/* Config panel */}
          <div className="glass rounded-2xl border border-glass p-4 flex flex-col gap-4 overflow-y-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl gradient-accent flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60">Agent</p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent text-[14px] font-medium text-foreground focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium text-muted-foreground/70 mb-1 block">System prompt</label>
              <textarea
                value={system}
                onChange={(e) => setSystem(e.target.value)}
                rows={5}
                className="w-full bg-background/60 border border-border/50 rounded-lg px-2.5 py-2 text-[12.5px] focus:outline-none focus:border-border resize-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-muted-foreground/70 mb-1 flex items-center gap-1.5"><Cpu className="w-3 h-3" /> Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-background/60 border border-border/50 rounded-lg px-2.5 py-2 text-[12.5px] focus:outline-none"
              >
                <option>Rivinity Core</option>
                <option>Rivinity Fast</option>
                <option>Rivinity Reasoning</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-medium text-muted-foreground/70 mb-1 flex items-center gap-1.5"><Thermometer className="w-3 h-3" /> Temperature · {temp.toFixed(1)}</label>
              <input type="range" min={0} max={1} step={0.1} value={temp} onChange={(e) => setTemp(parseFloat(e.target.value))} className="w-full accent-primary" />
            </div>

            <div>
              <p className="text-[11px] font-medium text-muted-foreground/70 mb-1.5 flex items-center gap-1.5"><Wrench className="w-3 h-3" /> Tools</p>
              <div className="flex flex-wrap gap-1.5">
                {toolCatalog.map((t) => {
                  const active = tools.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggleTool(t.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all ${
                        active
                          ? "bg-foreground text-background border-foreground"
                          : "border-border/60 text-foreground/70 hover:bg-accent/60"
                      }`}
                    >
                      {active ? <X className="w-2.5 h-2.5 inline mr-1" /> : <Plus className="w-2.5 h-2.5 inline mr-1" />}
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto flex gap-2">
              <button className="flex-1 h-9 rounded-lg glass border border-glass text-[12.5px] font-medium text-foreground/80 hover:bg-accent/60 flex items-center justify-center gap-1.5">
                <Save className="w-3.5 h-3.5" /> Save
              </button>
              <button
                onClick={() => navigate("/app")}
                className="flex-1 h-9 rounded-lg bg-foreground text-background text-[12.5px] font-medium hover:opacity-90 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Deploy
              </button>
            </div>
          </div>

          {/* Run panel */}
          <div className="glass rounded-2xl border border-glass flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-glass flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-foreground">Playground</p>
                <p className="text-[11px] text-muted-foreground/60">Test tool routing, prompts, and responses.</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[10.5px] px-2 py-0.5 rounded-full border border-border/50 text-muted-foreground/70">
                <Zap className="w-2.5 h-2.5" /> Orchestrator on
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              {log.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground/50 text-[12.5px]">
                  <Bot className="w-8 h-8 mb-2 opacity-40" />
                  Run a prompt to see routing + response.
                </div>
              )}
              {log.map((m, i) => (
                <div
                  key={i}
                  className={`text-[12.5px] leading-relaxed px-3 py-2 rounded-xl border ${
                    m.role === "user"
                      ? "bg-foreground text-background border-foreground self-end ml-auto max-w-[80%]"
                      : m.role === "tool"
                      ? "border-dashed border-primary/40 text-primary/90 bg-primary/5 max-w-[80%]"
                      : "border-glass glass text-foreground/85 max-w-[80%]"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="border-t border-glass p-3 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && run()}
                placeholder="Ask the agent…"
                className="flex-1 bg-background/60 border border-border/50 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-border"
              />
              <button onClick={run} className="h-9 px-3 rounded-lg bg-foreground text-background text-[12.5px] font-medium flex items-center gap-1.5 hover:opacity-90">
                <Play className="w-3.5 h-3.5" /> Run
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPlayground;