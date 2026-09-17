import { useState } from "react";
import rivinityLogo from "@/assets/Rivinity Logo.png";
import {
  ArrowUp,
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
import BuilderWorkbench from "../components/app-builder/BuilderWorkbench";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";
import SidebarShell from "@/components/canvas/SidebarShell";

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
  { icon: Code2, label: "Write code", prompt: "Write clean React code for " },
  { icon: Layout, label: "Build UI", prompt: "Build modern UI components for " },
  { icon: Globe, label: "Deploy", prompt: "Deploy application with " },
  { icon: Palette, label: "Design", prompt: "Design modern layout for " },
  { icon: Rocket, label: "Launch", prompt: "Launch product with " },
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
    const availableIndex = tabs.length - defaultTabs.length;
    if (availableIndex >= tabTemplates.length) {
      return;
    }
    const template = tabTemplates[availableIndex];
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
            "I'll help you build that. Generating responsive UI components and architecture now...",
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
      <div className="w-full h-full flex-1 flex min-h-0 min-w-0 overflow-hidden">
        <BuilderWorkbench
          projectName={projectName}
          messages={messages}
          onSendMessage={pushMessage}
          onExit={() => {
            setWorkbenchOpen(false);
            setMessages([]);
          }}
        />
      </div>
    );
  }

  const isEmpty = messages.length === 0;

  const InputArea = () => (
    <div className="w-full max-w-[720px] relative z-10 flex flex-col gap-2">
      {/* Main Chatbox Card (Starters strip removed for pristine look) */}
      <div className="bg-white border border-zinc-200/90 rounded-2xl shadow-lg shadow-zinc-900/[0.03] hover:border-[#FF5500]/50 transition-all duration-300 overflow-hidden">
        {/* Browser Tabs Row */}
        <div className="flex items-center border-b border-zinc-100 bg-zinc-50/70 px-1.5 pt-1.5">
          <div className="flex items-center gap-1 flex-1 min-w-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-medium transition-all duration-150 rounded-t-lg min-w-0 flex-1 justify-center ${
                    isActive
                      ? "bg-white text-zinc-900 shadow-xs border-t-2 border-[#FF5500]"
                      : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/60"
                  }`}
                >
                  <tab.icon
                    className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                      isActive ? "text-[#FF5500]" : "text-zinc-400"
                    }`}
                  />
                  <span className="truncate">{tab.label}</span>
                  {tabs.length > 1 && (
                    <X
                      className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity ml-1 text-zinc-400 hover:text-zinc-700"
                      onClick={(e) => closeTab(tab.id, e)}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={addTab}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/50 rounded-md transition-all shrink-0 ml-1 mb-0.5"
            title="New Tab"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Text Area */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Curious? Ask and dive into building insights..."
          rows={2}
          className="w-full bg-transparent text-[13.5px] text-zinc-800 placeholder:text-zinc-400/80 focus:outline-none px-5 pt-3.5 pb-1 resize-none leading-relaxed font-normal"
        />

        {/* Bottom Toolbar */}
        <div className="flex items-center justify-between px-4 pb-2.5 pt-1 border-t border-zinc-100">
          <div className="flex items-center gap-1">
            <button
              className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-[#FF5500] hover:bg-[#FF5500]/10 transition-all"
              title="Attach file"
            >
              <Paperclip className="w-3.5 h-3.5" />
            </button>
            <button
              className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-[#FF5500] hover:bg-[#FF5500]/10 transition-all"
              title="Voice prompt"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>

            {/* Model Pill */}
            <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium text-zinc-700 bg-zinc-100/80 hover:bg-[#FF5500]/10 hover:text-[#FF5500] transition-all ml-1 border border-zinc-200/60">
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF5500] flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-2 h-2" />
              </span>
              <span className="font-semibold">Rivinity Builder</span>
              <span className="text-[9.5px] text-zinc-400">v1.8</span>
              <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
            </button>
          </div>

          {/* 🌟 New ArrowUp Button */}
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
              input.trim()
                ? "bg-[#FF5500] text-white shadow-md shadow-[#FF5500]/30 hover:scale-105 active:scale-95 cursor-pointer"
                : "bg-zinc-100 text-zinc-300 cursor-not-allowed"
            }`}
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <SidebarShell>
      <div className="relative flex-1 flex flex-col min-w-0 min-h-0 bg-white overflow-hidden h-full">
        {/* 🌟 Centered Rivinity Logo */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center -translate-y-[60px] z-0 select-none overflow-hidden">
          {/* Soft ambient orange glow */}
          <div className="w-[400px] h-[400px] rounded-full bg-[#FF5500]/[0.035] blur-[80px] absolute" />

          <img
            src={rivinityLogo}
            alt="Rivinity Logo"
            className="w-[300px] max-w-[300px] h-auto object-contain opacity-[0.16] select-none pointer-events-none"
          />
        </div>

        <div className="flex-1 flex flex-col items-center z-10 overflow-y-auto px-4">
          {isEmpty ? (
            <div className="flex-1 flex flex-col items-center justify-between w-full max-w-[760px] mx-auto pt-20 pb-5 h-full">
              {/* Top Area: Clean Heading Only */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 leading-[1.14] tracking-tight">
                  What can I help you <br />
                  <span className="text-[#FF5500]">build today?</span>
                </h1>
              </div>

              {/* Bottom Area: Chatbox + Suggestions + Disclaimer */}
              <div className="w-full flex flex-col items-center gap-2.5 mt-auto">
                {InputArea()}

                {/* Suggestions Pills */}
                <div className="flex gap-2 flex-wrap justify-center max-w-[720px] pt-0.5">
                  {suggestions.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setInput(s.prompt)}
                      className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-zinc-200/90 hover:border-[#FF5500]/60 hover:bg-[#FF5500]/5 transition-all text-[11.5px] text-zinc-600 hover:text-zinc-900 font-medium shadow-2xs cursor-pointer"
                    >
                      <s.icon className="w-3 h-3 text-zinc-400 group-hover:text-[#FF5500] transition-colors" />
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] text-zinc-400 mt-0.5">
                  Rivinity can make mistakes. Review generated code before deploying.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 w-full max-w-[720px] mx-auto py-8 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-3 text-[13.5px] leading-relaxed shadow-xs ${
                      msg.role === "user"
                        ? "rounded-2xl rounded-br-none bg-[#FF5500] text-white"
                        : "rounded-2xl rounded-bl-none bg-white border border-zinc-200 text-zinc-800"
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
          <div className="px-6 pb-4 pt-2 flex justify-center z-10 bg-white">
            {InputArea()}
          </div>
        )}
      </div>
    </SidebarShell>
  );
};

export default AppBuilderMain;