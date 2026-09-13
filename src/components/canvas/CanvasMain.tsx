import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Paperclip, 
  Mic, 
  Code, 
  FileText, 
  Lightbulb, 
  Search, 
  Plus, 
  X, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  RefreshCw, 
  Pencil, 
  Wand2, 
  Layers, 
  BarChart3,
  BookOpen,
  ArrowUp,
  Globe
} from "lucide-react";
import ChatMarkdown from "./ChatMarkdown";
import { toast } from "sonner";
import WriteAnythingStudio from "./WriteAnythingStudio";
import { ChatEmptyState } from "./ChatEmptyState";
import SkillResultCard from "./SkillResultCard";
import { SKILLS } from "@/lib/skillsCatalog";
import { cn } from "@/lib/utils";

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
  { icon: Search, label: "Smart Paper Search", kind: "chat" as TabKind },
  { icon: FileText, label: "Smart Summarization", kind: "chat" as TabKind },
  { icon: Lightbulb, label: "Citation Generator", kind: "chat" as TabKind },
  { icon: BarChart3, label: "Deep Analysis", kind: "chat" as TabKind },
  { icon: BookOpen, label: "Literature Review", kind: "chat" as TabKind },
  { icon: Wand2, label: "Write Anything", kind: "write" as TabKind },
];

const getTabIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("write") || l.includes("wand") || l.includes("author") || l.includes("studio")) return Wand2;
  if (l.includes("code") || l.includes("dev") || l.includes("script")) return Code;
  if (l.includes("search") || l.includes("find") || l.includes("look") || l.includes("paper")) return Search;
  if (l.includes("citation") || l.includes("idea") || l.includes("think")) return Lightbulb;
  if (l.includes("doc") || l.includes("report") || l.includes("file") || l.includes("text") || l.includes("summar")) return FileText;
  return Search;
};

const getTabKind = (label: string): TabKind => {
  const l = label.toLowerCase();
  if (l.includes("write") || l.includes("wand") || l.includes("author") || l.includes("studio")) return "write";
  return "chat";
};

interface ChatComposerProps {
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
  tabs: TabState[];
  setTabs: React.Dispatch<React.SetStateAction<TabState[]>>;
  activeTab: number;
  setActiveTab: (id: number) => void;
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
  setTabs,
  activeTab,
  setActiveTab,
  onCloseTab,
  skillPickerOpen,
  setSkillPickerOpen,
  skillQuery,
  setSkillQuery,
  onRunSkill,
  disabled,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isAddingTab, setIsAddingTab] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const [editingTabId, setEditingTabId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

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

  const handleRenameTab = (tabId: number) => {
    if (editingName.trim()) {
      setTabs((p) =>
        p.map((t) =>
          t.id === tabId
            ? {
                ...t,
                label: editingName.trim(),
                icon: getTabIcon(editingName.trim()),
                kind: getTabKind(editingName.trim()),
              }
            : t
        )
      );
    }
    setEditingTabId(null);
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
    <div className="w-full max-w-full sm:max-w-[900px] mx-auto px-0">
      <div className="bg-white rounded-3xl border border-gray-100/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(255,85,0,0.06)] transition-all duration-200 overflow-hidden flex flex-col w-full">
        
        {/* UPPER TABS BAR */}
        <div className="flex items-center overflow-x-auto gap-2 px-4 py-2 border-b border-gray-100 bg-gray-50/50 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                className={cn(
                  "group relative flex items-center gap-2 px-3.5 py-1.5 text-[12.5px] font-medium transition-all duration-150 rounded-xl shrink-0 cursor-pointer border",
                  isActive
                    ? "bg-white text-[#FF5500] border-gray-200/80 shadow-xs"
                    : "text-[#1C1C1C] border-transparent hover:bg-white hover:border-gray-200/60"
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-colors",
                    isActive ? "text-[#FF5500]" : "text-[#1C1C1C]"
                  )}
                  strokeWidth={2}
                />
                {editingTabId === tab.id ? (
                  <input
                    autoFocus
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={() => handleRenameTab(tab.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRenameTab(tab.id);
                    }}
                    className="bg-transparent outline-none w-24 text-[12px]"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>
                    <span
                      className="truncate max-w-[130px]"
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        setEditingTabId(tab.id);
                        setEditingName(tab.label);
                      }}
                    >
                      {tab.label}
                    </span>
                    <div className="flex items-center gap-1">
                      <Pencil
                        className="w-4 h-4 text-[#1C1C1C] opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity cursor-pointer shrink-0"
                        strokeWidth={2}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTabId(tab.id);
                          setEditingName(tab.label);
                        }}
                      />
                      {tabs.length > 1 && (
                        <X
                          className="w-4 h-4 text-[#1C1C1C] opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity cursor-pointer shrink-0"
                          strokeWidth={2}
                          onClick={(e) => onCloseTab(tab.id, e)}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* TEMPLATE SELECTION EXPANDABLE PANEL */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isAddingTab ? "max-h-[300px] opacity-100 border-b border-gray-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-3 sm:p-4 bg-gray-50/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <p className="text-[11px] font-bold uppercase tracking-widest px-1 text-gray-400">
                Research Tools
              </p>
              <input
                value={newTabName}
                onChange={(e) => setNewTabName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newTabName.trim()) {
                    const newTab: TabState = {
                      id: Date.now(),
                      icon: getTabIcon(newTabName.trim()),
                      label: newTabName.trim(),
                      kind: getTabKind(newTabName.trim()),
                      messages: [],
                      draftInput: "",
                    };
                    setTabs((p) => [...p, newTab]);
                    setActiveTab(newTab.id);
                    setIsAddingTab(false);
                    setNewTabName("");
                  }
                }}
                className="bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-[11px] outline-none transition-all w-full sm:w-36 focus:border-[#FF5500]"
                placeholder="Custom name..."
              />
            </div>
            <div className="flex flex-col gap-1 max-h-[160px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {tabTemplates.map((template) => (
                <button
                  key={template.label}
                  type="button"
                  onClick={() => {
                    const newTab: TabState = {
                      id: Date.now(),
                      icon: template.icon,
                      label: template.label,
                      kind: template.kind,
                      messages: [],
                      draftInput: "",
                    };
                    setTabs((p) => [...p, newTab]);
                    setActiveTab(newTab.id);
                    setIsAddingTab(false);
                  }}
                  className="flex items-center gap-2.5 w-full h-9 px-3 rounded-lg border border-transparent hover:border-[#FF5500]/30 hover:bg-white transition-all group text-left"
                >
                  <template.icon className="w-5 h-5 text-[#1C1C1C] group-hover:text-[#FF5500] shrink-0" strokeWidth={2} />
                  <p className="text-[13px] font-medium text-[#1C1C1C] group-hover:text-[#FF5500] transition-all">
                    {template.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PROMPT TEXTAREA */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          rows={1}
          className="w-full bg-transparent text-[19px] text-[#1C1C1C] placeholder:text-gray-400 focus:outline-none resize-none leading-relaxed px-5 pt-4 pb-2 min-h-[52px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        />

        {/* BOTTOM ACTION CONTROLS */}
        <div className="flex items-center justify-between px-5 pb-3 pt-1 w-full">
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setIsAddingTab((v) => !v)}
              className="w-10 h-10 rounded-full bg-gray-50/90 hover:bg-gray-100 flex items-center justify-center shrink-0 transition-colors"
              title="Add tool"
            >
              <Plus className="w-5 h-5 text-[#1C1C1C]" strokeWidth={2} />
            </button>

            <button
              type="button"
              className="w-10 h-10 rounded-full bg-gray-50/90 hover:bg-gray-100 flex items-center justify-center shrink-0 transition-colors"
              title="Search web"
            >
              <Globe className="w-5 h-5 text-[#1C1C1C]" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={() => setSkillPickerOpen((v) => !v)}
              className={cn(
                "w-10 h-10 rounded-full bg-gray-50/90 hover:bg-gray-100 flex items-center justify-center shrink-0 transition-colors",
                skillPickerOpen && "bg-orange-50 text-[#FF5500]"
              )}
              title="Enhance / Run Skills"
            >
              <Wand2
                className={cn(
                  "w-5 h-5 transition-colors",
                  skillPickerOpen ? "text-[#FF5500]" : "text-[#1C1C1C]"
                )}
                strokeWidth={2}
              />
            </button>

            <button
              type="button"
              className="w-10 h-10 rounded-full bg-gray-50/90 hover:bg-gray-100 flex items-center justify-center shrink-0 transition-colors"
              title="Code interpreter"
            >
              <Code className="w-5 h-5 text-[#1C1C1C]" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 rounded-full bg-gray-50/90 hover:bg-gray-100 flex items-center justify-center shrink-0 transition-colors"
              title="Attach context file"
            >
              <Paperclip className="w-5 h-5 text-[#1C1C1C]" strokeWidth={2} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  toast.success(`Attached: ${files[0].name}`);
                }
              }}
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button 
              type="button" 
              className="w-10 h-10 rounded-full bg-gray-50/90 hover:bg-gray-100 flex items-center justify-center shrink-0 transition-colors"
              title="Voice input"
            >
              <Mic className="w-5 h-5 text-[#1C1C1C]" strokeWidth={2} />
            </button>

            <button 
              type="button" 
              onClick={onSend}
              disabled={!input.trim() || disabled}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-[#FF5500] hover:bg-[#E64D00] shadow-md active:scale-95 disabled:opacity-40 disabled:shadow-none shrink-0 transition-all"
              title="Send prompt"
            >
              <ArrowUp className="w-5 h-5 text-white" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>

      {/* SKILL PICKER POPOVER */}
      {skillPickerOpen && (
        <div ref={popoverRef} className="relative">
          <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden z-30">
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-gray-100">
              <Layers className="w-5 h-5 text-[#FF5500] shrink-0" strokeWidth={2} />
              <input
                autoFocus
                value={skillQuery}
                onChange={(e) => setSkillQuery(e.target.value)}
                placeholder="Search skills to run…"
                className="bg-transparent outline-none text-[13px] flex-1 text-[#1C1C1C] placeholder:text-gray-400"
              />
              <span className="text-[11px] text-gray-400 shrink-0">{SKILLS.length} skills</span>
            </div>
            <div className="max-h-[200px] overflow-y-auto py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {filteredSkills.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onRunSkill(s.id)}
                  className="w-full text-left px-3.5 py-2 hover:bg-orange-50/60 transition-colors flex items-center justify-between gap-2 group"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-[#1C1C1C] group-hover:text-[#FF5500] truncate">{s.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{s.summary}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#FF5500] shrink-0">
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
      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden">
        <div className="flex items-center border-b border-gray-200 bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overflow-x-auto shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTabId(tab.id)}
              className={cn(
                "group relative flex items-center gap-2 px-3.5 py-2 text-[12.5px] font-medium border-r border-gray-100 shrink-0 transition-colors",
                activeTabId === tab.id
                  ? "bg-white text-[#FF5500]"
                  : "bg-gray-50/50 text-[#1C1C1C] hover:text-black"
              )}
            >
              <tab.icon
                className={cn(
                  "w-5 h-5 shrink-0 transition-colors",
                  activeTabId === tab.id ? "text-[#FF5500]" : "text-[#1C1C1C]"
                )}
                strokeWidth={2}
              />
              <span className="truncate">{tab.label}</span>
              {tabs.length > 1 && (
                <X
                  className="w-4 h-4 text-[#1C1C1C] shrink-0 ml-1 opacity-60 hover:opacity-100"
                  strokeWidth={2}
                  onClick={(e) => closeTab(tab.id, e)}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          <WriteAnythingStudio />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full w-full relative overflow-hidden bg-[#FAF9F7]/30">
      {/* Scrollable Message List or Empty State */}
      <div className="flex-1 min-h-0 flex flex-col items-center overflow-y-auto overflow-x-hidden relative z-10 w-full max-w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {isEmpty ? (
          <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 w-full max-w-full sm:max-w-[1100px] mx-auto py-6">
            <div className="w-full mb-6 max-w-full">
              <ChatEmptyState />
            </div>

            <div className="relative z-10 w-full flex justify-center max-w-full">
              <ChatComposer 
                input={input} 
                setInput={setInput} 
                onSend={handleSend} 
                tabs={tabs} 
                setTabs={setTabs} 
                activeTab={activeTabId} 
                setActiveTab={setActiveTabId} 
                onCloseTab={closeTab} 
                skillPickerOpen={skillPickerOpen} 
                setSkillPickerOpen={setSkillPickerOpen} 
                skillQuery={skillQuery} 
                setSkillQuery={setSkillQuery} 
                onRunSkill={runSkill} 
                disabled={isThinking} 
              />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-full sm:max-w-[1020px] mx-auto px-4 sm:px-6 py-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="group max-w-[90%] sm:max-w-[85%]">
                  {msg.role === "ai" && msg.content.startsWith(SKILL_MARKER) ? (
                    <SkillResultCard skillId={msg.content.slice(SKILL_MARKER.length)} />
                  ) : (
                    <div
                      className={`px-4 py-3 text-[14px] leading-relaxed shadow-sm break-words ${
                        msg.role === "user"
                          ? "rounded-2xl rounded-br-sm bg-[#FF5500] text-white whitespace-pre-wrap"
                          : "rounded-2xl rounded-bl-sm bg-white border border-gray-100 text-[#1C1C1C]"
                      }`}
                    >
                      {msg.role === "user" ? msg.content : <ChatMarkdown content={msg.content} />}
                    </div>
                  )}

                  <div className={`flex items-center gap-1.5 mt-1.5 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <button 
                      onClick={() => { navigator.clipboard.writeText(msg.content); toast.success("Copied!"); }} 
                      className="p-1 rounded hover:bg-gray-100 text-[#1C1C1C]" 
                      title="Copy"
                    >
                      <Copy className="w-5 h-5 text-[#1C1C1C]" strokeWidth={2} />
                    </button>
                    {msg.role === "user" ? (
                      <button 
                        onClick={() => setInput(msg.content)} 
                        className="p-1 rounded hover:bg-gray-100 text-[#1C1C1C]" 
                        title="Edit prompt"
                      >
                        <Pencil className="w-5 h-5 text-[#1C1C1C]" strokeWidth={2} />
                      </button>
                    ) : (
                      <>
                        <button className="p-1 rounded hover:bg-gray-100 hover:text-green-600 transition-colors" title="Helpful">
                          <ThumbsUp className="w-5 h-5 text-[#1C1C1C]" strokeWidth={2} />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100 hover:text-red-600 transition-colors" title="Unhelpful">
                          <ThumbsDown className="w-5 h-5 text-[#1C1C1C]" strokeWidth={2} />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100 text-[#1C1C1C]" title="Regenerate">
                          <RefreshCw className="w-5 h-5 text-[#1C1C1C]" strokeWidth={2} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-white border border-gray-100 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Pinned Bottom Composer */}
      {!isEmpty && (
        <div className="px-4 sm:px-6 pb-3 pt-2 flex justify-center bg-gradient-to-t from-[#FAF9F7] via-[#FAF9F7]/95 to-transparent shrink-0 relative z-10 w-full">
          <ChatComposer
            input={input}
            setInput={setInput}
            onSend={handleSend}
            tabs={tabs}
            setTabs={setTabs}
            activeTab={activeTabId}
            setActiveTab={setActiveTabId}
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