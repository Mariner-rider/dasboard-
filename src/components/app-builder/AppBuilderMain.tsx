import { useState } from "react";
import RivinityLogoTimeline from "@/components/rivinity/RivinityLogoTimeline";
import {
  Send,
  Paperclip,
  Mic,
  Sparkles,
  ChevronDown,
  Plus,
  X,
  Layout,
  Smartphone,
  Globe,
  Palette,
  Code2,
  Layers,
  Rocket,
  Component,
  Monitor,
} from "lucide-react";
import BuilderWorkbench from "./BuilderWorkbench";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
}

interface Tab {
  id: number;
  icon: typeof Layout;
  label: string;
}

const defaultTabs: Tab[] = [
  { id: 1, icon: Layout, label: "App Generator" },
  { id: 2, icon: Smartphone, label: "UI Builder" },
  { id: 3, icon: Globe, label: "Website Creator" },
];

const tabTemplates = [
  { icon: Layout, label: "Dashboard" },
  { icon: Component, label: "Component" },
  { icon: Monitor, label: "Portfolio" },
  { icon: Layers, label: "SaaS" },
];

const suggestions = [
  { icon: Code2, label: "Write code" },
  { icon: Layout, label: "Build UI" },
  { icon: Globe, label: "Deploy" },
  { icon: Palette, label: "Design" },
  { icon: Rocket, label: "Launch" },
];

const quickCards = [
  {
    icon: Code2,
    title: "Build a landing page",
    desc: "Create a conversion-focused landing page with hero, features, and CTA",
  },
  {
    icon: Layout,
    title: "Design a dashboard",
    desc: "Generate clean admin panels with charts, tables, and analytics",
  },
  {
    icon: Rocket,
    title: "Launch a SaaS product",
    desc: "Full-stack SaaS with auth, billing, dashboard, and API integration",
  },
];

const deriveProjectName = (prompt: string) => {
  const cleaned = prompt
    .replace(/^(build|create|make|design|generate|launch)\s+(me\s+)?(a|an|the)?\s*/i, "")
    .trim();
  const words = cleaned.split(/\s+/).slice(0, 4).join(" ");
  if (!words) return "New Project";
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const AppBuilderMain = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [tabs, setTabs] = useState<Tab[]>(defaultTabs);
  const [activeTab, setActiveTab] = useState(defaultTabs[0].id);
  const [workbenchOpen, setWorkbenchOpen] = useState(false);
  const [projectName, setProjectName] = useState("New Project");

  const addTab = () => {
    const template = tabTemplates[tabs.length % tabTemplates.length];
    const newTab: Tab = { id: Date.now(), icon: template.icon, label: template.label };
    setTabs((prev) => [...prev, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;
    const idx = tabs.findIndex((t) => t.id === id);
    if (activeTab === id) {
      const next = tabs[idx + 1] || tabs[idx - 1];
      setActiveTab(next.id);
    }
    setTabs((prev) => prev.filter((t) => t.id !== id));
  };

  const pushMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: text }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          content:
            "I'll help you build that. Let me generate the UI components and architecture for your project.",
        },
      ]);
    }, 700);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    if (!workbenchOpen) {
      setProjectName(deriveProjectName(input));
      setWorkbenchOpen(true);
    }
    pushMessage(input);
    setInput("");
  };

  if (workbenchOpen) {
    return (
      <BuilderWorkbench
        projectName={projectName}
        messages={messages}
        onSendMessage={pushMessage}
        onExit={() => {
          setWorkbenchOpen(false);
          setMessages([]);
        }}
      />
    );
  }

  const isEmpty = messages.length === 0;


  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const InputArea = () => (
    <div className="w-full max-w-[680px]">
      <div className="border border-border/60 rounded-2xl shadow-float input-glow transition-all duration-200 overflow-hidden bg-background">
        {/* Browser-style tabs */}
        <div className="flex items-center border-b border-border/40">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative flex items-center gap-2 px-4 py-2.5 text-[12.5px] font-medium transition-all duration-150 border-r border-border/30 min-w-0 flex-1 justify-center ${
                activeTab === tab.id
                  ? "bg-background text-foreground"
                  : "bg-muted/30 text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{tab.label}</span>
              {tabs.length > 1 && (
                <X
                  className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity ml-1"
                  onClick={(e) => closeTab(tab.id, e)}
                />
              )}
            </button>
          ))}
          <button
            onClick={addTab}
            className="px-3 py-2.5 text-muted-foreground/40 hover:text-muted-foreground/70 hover:bg-muted/30 transition-all shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Input area */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Curious? Ask and dive into building insights"
          rows={2}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none px-5 pt-4 pb-1 resize-none"
        />
        {/* Bottom toolbar */}
        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <div className="flex items-center gap-0.5">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/35 hover:text-muted-foreground/60 hover:bg-muted/40 transition-all">
              <Paperclip className="w-[15px] h-[15px]" />
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/35 hover:text-muted-foreground/60 hover:bg-muted/40 transition-all">
              <Mic className="w-[15px] h-[15px]" />
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium text-muted-foreground/50 hover:bg-muted/40 transition-all ml-1">
<<<<<<< HEAD
              <span className="w-4 h-4 rounded-full bg-[#FF7A18] flex items-center justify-center">
=======
              <span className="w-4 h-4 rounded-full bg-[#ff8b28] flex items-center justify-center">
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
                <Sparkles className="w-2.5 h-2.5 text-primary-foreground" />
              </span>
              arc-1a
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>
          </div>
          <button
            onClick={handleSend}
            className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
          >
            <Send className="w-3.5 h-3.5 text-background" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      <div className="flex-1 flex flex-col items-center overflow-y-auto">
        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-[740px] mx-auto">
            {/* Rivinity animated logo */}
            <RivinityLogoTimeline mode="orbit" size={72} className="mb-6" />

            {/* Date */}
            <p className="text-[11px] text-muted-foreground/40 tracking-widest uppercase mb-3">
              {today}
            </p>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl font-semibold text-foreground/85 text-center leading-tight tracking-tight">
              What can I help you
              <br />
              build today?
            </h1>

            {/* Accent line */}
<<<<<<< HEAD
            <div className="h-1 w-16 rounded-full bg-[#FF7A18] mt-4 mb-8" />
=======
            <div className="h-1 w-16 rounded-full bg-[#ff8b28] mt-4 mb-8" />
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2

            {/* Input */}
            <div className="w-full flex justify-center mb-4">
              <InputArea />
            </div>

            {/* Suggestion chips */}
            <div className="flex gap-2 flex-wrap justify-center mb-10">
              {suggestions.map((s) => (
                <button
                  key={s.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors text-[12px] text-muted-foreground font-medium"
                >
                  <s.icon className="w-3 h-3" />
                  {s.label}
                </button>
              ))}
            </div>

            {/* Quick cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-[700px]">
              {quickCards.map((c) => (
                <button
                  key={c.title}
                  onClick={() => setInput(c.desc)}
                  className="text-left p-4 rounded-xl glass border border-glass border-glass-hover transition-all duration-200 group"
                >
                  <c.icon className="w-4.5 h-4.5 text-primary/70 mb-2.5 group-hover:text-primary transition-colors" />
                  <p className="text-[13px] font-medium text-foreground/80">{c.title}</p>
                  <p className="text-[11px] text-muted-foreground/50 mt-1 leading-relaxed">{c.desc}</p>
                </button>
              ))}
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-muted-foreground/30 mt-8 mb-6">
              Rivinity can make mistakes. Review generated code before deploying.
            </p>
          </div>
        ) : (
          <div className="flex-1 w-full max-w-[700px] mx-auto px-6 py-8 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`animate-float-in flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 text-[14px] leading-relaxed ${
                    msg.role === "user"
<<<<<<< HEAD
                      ? "rounded-2xl rounded-br-lg bg-[#FF7A18] text-primary-foreground"
=======
                      ? "rounded-2xl rounded-br-lg bg-[#ff8b28] text-primary-foreground"
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
                      : "rounded-2xl rounded-bl-lg glass border border-glass text-foreground/80"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isEmpty && (
        <div className="px-6 pb-5 pt-2 flex justify-center">
          <InputArea />
        </div>
      )}
    </div>
  );
};

export default AppBuilderMain;
