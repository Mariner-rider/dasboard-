import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Send, Paperclip, Mic, Code, FileText, Lightbulb, Search, 
  Image as ImageIcon, ChevronDown, Plus, X, Copy, ThumbsUp, ThumbsDown, 
  RefreshCw, Pencil, Wand2, ClipboardList, Brain, Zap, Layers 
} from "lucide-react";
import ChatMarkdown from "./ChatMarkdown";
import { toast } from "sonner";
import WriteAnythingStudio from "./WriteAnythingStudio";
import { ChatEmptyState, CapabilityCards } from "./ChatEmptyState";
import SkillResultCard from "./SkillResultCard";
import { SKILLS } from "@/lib/skillsCatalog";

const SKILL_MARKER = "__SKILL__:";

type TabKind = "chat" | "write";

export interface MessageItem {
  id: number;
  role: "user" | "ai";
  content: string;
}

interface TabState {
  id: number;
  icon: typeof Search;
  label: string;
  kind: TabKind;
  messages: MessageItem[];
  draftInput: string;
}

const defaultTabs: TabState[] = [
  { id: 1, icon: Search, label: "Smart Paper Search", kind: "chat", messages: [], draftInput: "" },
  { id: 2, icon: FileText, label: "Smart Summarization", kind: "chat", messages: [], draftInput: "" },
  { id: 3, icon: Lightbulb, label: "Citation Generator", kind: "chat", messages: [], draftInput: "" },
  { id: 4, icon: Wand2, label: "Write Anything", kind: "write", messages: [], draftInput: "" },
];

const tabTemplates = [
  { icon: Search, label: "Research", kind: "chat" as TabKind },
  { icon: Code, label: "Code Gen", kind: "chat" as TabKind },
  { icon: FileText, label: "Report", kind: "chat" as TabKind },
  { icon: Lightbulb, label: "Brainstorm", kind: "chat" as TabKind },
  { icon: Wand2, label: "Write Anything", kind: "write" as TabKind },
];


interface ChatComposerProps {
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
  tabs: TabState[];
  activeTab: number;
  setActiveTab: (id: number) => void;
  onAddTab: () => void;
  onCloseTab: (id: number, e: React.MouseEvent) => void;
  skillPickerOpen: boolean;
  setSkillPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  skillQuery: string;
  setSkillQuery: (val: string) => void;
  onRunSkill: (id: string) => void;
  disabled?: boolean;
}

const ChatComposer: React.FC<ChatComposerProps> = ({
  input,
  setInput,
  onSend,
  tabs,
  activeTab,
  setActiveTab,
  onAddTab,
  onCloseTab,
  skillPickerOpen,
  setSkillPickerOpen,
  skillQuery,
  setSkillQuery,
  onRunSkill,
  disabled
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Maintain focus and auto-expand height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Click outside to dismiss skill popover
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setSkillPickerOpen(false);
      }
    };
    if (skillPickerOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [skillPickerOpen, setSkillPickerOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const filteredSkills = SKILLS.filter((s) => {
    const q = skillQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q))
    );
  }).slice(0, 30);

 return (
    <div className="w-full max-w-[1100px]">
      <div className="border border-border/60 rounded-[28px] shadow-float input-glow transition-all duration-200 overflow-hidden bg-background flex flex-col min-h-[190px]">
        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-border/40 overflow-x-auto no-scrollbar shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
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
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Close ${tab.label} tab`}
                  className="w-3.5 h-3.5 flex items-center justify-center rounded hover:bg-muted/60 opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity ml-1"
                  onClick={(e) => onCloseTab(tab.id, e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onCloseTab(tab.id, e as unknown as React.MouseEvent);
                    }
                  }}
                >
                  <X className="w-3 h-3 shrink-0" />
                </span>
              )}
            </button>
          ))}
          <button
            type="button"
            onClick={onAddTab}
            className="px-3 py-2.5 text-muted-foreground/40 hover:text-muted-foreground/70 hover:bg-muted/30 transition-all shrink-0"
            title="Open new tab"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Text Area Input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything — the orchestrator picks the right tool, model & agents."
          className="w-full flex-1 bg-transparent text-[14.5px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none px-6 pt-4 pb-2 resize-none"
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 pb-3.5 pt-1 shrink-0">
          <div className="flex items-center gap-0.5">
            <button 
              type="button" 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/35 hover:text-muted-foreground/60 hover:bg-muted/40 transition-all"
              title="Attach context file"
            >
              <Paperclip className="w-[15px] h-[15px]" />
            </button>
            <button 
              type="button" 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/35 hover:text-muted-foreground/60 hover:bg-muted/40 transition-all"
              title="Voice input"
            >
              <Mic className="w-[15px] h-[15px]" />
            </button>
            <span
              title="Auto-routing dynamically selects specialized models"
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10.5px] font-medium text-foreground/70 border border-border/50 bg-background/50 ml-1 select-none"
            >
              <Zap className="w-2.5 h-2.5 text-primary" />
              Auto-route
            </span>
            <button
              type="button"
              onClick={() => setSkillPickerOpen((v) => !v)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-all ml-0.5 ${
                skillPickerOpen ? "bg-accent text-foreground" : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <Layers className="w-3.5 h-3.5" strokeWidth={1.75} />
              Skills
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>
          </div>
          <button
            type="button"
            onClick={onSend}
            disabled={!input.trim() || disabled}
            className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            title="Send prompt"
          >
            <Send className="w-3.5 h-3.5 text-background" />
          </button>
        </div>
      </div>

      {/* Dynamic Skill Selector */}
      {skillPickerOpen && (
        <div ref={popoverRef} className="relative">
          <div className="absolute left-0 right-0 mt-2 glass-strong rounded-2xl border border-glass shadow-float overflow-hidden animate-float-in z-30">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-glass">
              <Layers className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
              <input
                autoFocus
                value={skillQuery}
                onChange={(e) => setSkillQuery(e.target.value)}
                placeholder="Search skills to run…"
                className="bg-transparent outline-none text-[12.5px] flex-1 placeholder:text-muted-foreground/50"
              />
              <span className="text-[10.5px] text-muted-foreground/60">{SKILLS.length} skills</span>
            </div>
            <div className="max-h-[280px] overflow-y-auto py-1">
              {filteredSkills.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onRunSkill(s.id)}
                  className="w-full text-left px-4 py-2 hover:bg-accent/60 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium text-foreground/90 truncate">{s.name}</p>
                    <p className="text-[10.5px] text-muted-foreground/60 truncate">{s.summary}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 shrink-0">
                    {s.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CanvasMain: React.FC = () => {
  const [tabs, setTabs] = useState<TabState[]>(defaultTabs);
  const [activeTabId, setActiveTabId] = useState<number>(defaultTabs[0].id);
  const [isThinking, setIsThinking] = useState(false);
  const [skillPickerOpen, setSkillPickerOpen] = useState(false);
  const [skillQuery, setSkillQuery] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const messages = currentTab.messages;
  const input = currentTab.draftInput;

  const setInput = useCallback((val: string) => {
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, draftInput: val } : t))
    );
  }, [activeTabId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const addTab = () => {
    const template = tabTemplates[tabs.length % tabTemplates.length];
    const newTab: TabState = {
      id: Date.now(),
      icon: template.icon,
      label: template.label,
      kind: template.kind,
      messages: [],
      draftInput: "",
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
  };

  const closeTab = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;
    const idx = tabs.findIndex((t) => t.id === id);
    if (activeTabId === id) {
      const next = tabs[idx + 1] || tabs[idx - 1];
      setActiveTabId(next.id);
    }
    setTabs((prev) => prev.filter((t) => t.id !== id));
  };

  const appendTabMessage = (msg: MessageItem) => {
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId ? { ...t, messages: [...t.messages, msg] } : t
      )
    );
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    appendTabMessage({ id: Date.now(), role: "user", content: trimmed });
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      appendTabMessage({
        id: Date.now() + 1,
        role: "ai",
        content: `Analyzed query: "${trimmed}". Processing context across loaded index agents.`,
      });
      setIsThinking(false);
    }, 600);
  };

  const runSkill = (skillId: string) => {
    const skill = SKILLS.find((s) => s.id === skillId);
    if (!skill) return;
    setSkillPickerOpen(false);
    setSkillQuery("");
    appendTabMessage({ id: Date.now(), role: "user", content: `Run skill: ${skill.name}` });
    setIsThinking(true);
    setTimeout(() => {
      appendTabMessage({
        id: Date.now() + 1,
        role: "ai",
        content: `${SKILL_MARKER}${skill.id}`,
      });
      setIsThinking(false);
    }, 600);
  };

  const isEmpty = messages.length === 0;
  const isWriteMode = currentTab.kind === "write";
  if (isWriteMode) {
    return (
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <div className="flex items-center border-b border-border/40 bg-background/40">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`group relative flex items-center gap-2 px-4 py-2.5 text-[12.5px] font-medium transition-all duration-150 border-r border-border/30 ${
                activeTabId === tab.id
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
        <WriteAnythingStudio />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full">

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center overflow-y-auto">
     {isEmpty ? (
  <div className="flex-1 flex flex-col items-center justify-end px-6 w-full max-w-[1080px] mx-auto pb-10">
    <div className="w-full">
      <ChatEmptyState />
    </div>

    {/* Prompt Box */}
    <div className="w-full flex justify-center mt-12 mb-3">
      <ChatComposer 
        input={input} 
        setInput={setInput} 
        onSend={handleSend} 
        tabs={tabs} 
        activeTab={activeTabId} 
        setActiveTab={setActiveTabId} 
        onAddTab={addTab} 
        onCloseTab={closeTab} 
        skillPickerOpen={skillPickerOpen} 
        setSkillPickerOpen={setSkillPickerOpen} 
        skillQuery={skillQuery} 
        setSkillQuery={setSkillQuery} 
        onRunSkill={runSkill} 
        disabled={isThinking} 
      />
    </div>

    <CapabilityCards />

    <p className="text-[10px] text-muted-foreground/30 mt-4 mb-2">
      Rivinity can make mistakes. Verify important information.
    </p>
  </div>
) : (
          <div className="flex-1 w-full max-w-[700px] mx-auto px-6 py-8 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`animate-float-in flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="group max-w-[85%]">
                  {msg.role === "ai" && msg.content.startsWith(SKILL_MARKER) ? (
                    <SkillResultCard skillId={msg.content.slice(SKILL_MARKER.length)} />
                  ) : (
                    <div
                      className={`px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "rounded-2xl rounded-br-sm bg-[#ff8b28] text-primary-foreground whitespace-pre-wrap"
                          : "rounded-2xl rounded-bl-sm glass border border-glass text-foreground/90"
                      }`}
                    >
                      {msg.role === "user" ? msg.content : <ChatMarkdown content={msg.content} />}
                    </div>
                  )}

                  <div className={`flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <button 
                      onClick={() => { navigator.clipboard.writeText(msg.content); toast.success("Copied!"); }} 
                      className="p-1 rounded hover:bg-accent/60 transition-colors text-muted-foreground/50 hover:text-foreground" 
                      title="Copy"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {msg.role === "user" ? (
                      <button 
                        onClick={() => setInput(msg.content)} 
                        className="p-1 rounded hover:bg-accent/60 transition-colors text-muted-foreground/50 hover:text-foreground" 
                        title="Edit prompt"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <>
                        <button className="p-1 rounded hover:bg-accent/60 transition-colors text-muted-foreground/50 hover:text-green-500" title="Helpful">
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 rounded hover:bg-accent/60 transition-colors text-muted-foreground/50 hover:text-red-500" title="Unhelpful">
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 rounded hover:bg-accent/60 transition-colors text-muted-foreground/50 hover:text-foreground" title="Regenerate">
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="animate-float-in flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm glass border border-glass flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Persistent Bottom Composer */}
      {!isEmpty && (
        <div className="px-6 pb-5 pt-2 flex justify-center bg-gradient-to-t from-background via-background/90 to-transparent shrink-0">
          <ChatComposer
            input={input}
            setInput={setInput}
            onSend={handleSend}
            tabs={tabs}
            activeTab={activeTabId}
            setActiveTab={setActiveTabId}
            onAddTab={addTab}
            onCloseTab={closeTab}
            skillPickerOpen={skillPickerOpen}
            setSkillPickerOpen={setSkillPickerOpen}
            skillQuery={skillQuery}
            setSkillQuery={setSkillQuery}
            onRunSkill={runSkill}
            disabled={isThinking}
          />
        </div>
      )}
    </div>
  );
};

export default CanvasMain;