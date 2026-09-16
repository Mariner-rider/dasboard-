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
  Share2,
  Share,
  ThumbsUp, 
  ThumbsDown, 
  RefreshCw, 
  Pencil, 
  Wand2, 
  Layers, 
  BarChart3,
  BookOpen,
  ArrowUp,
  Globe,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bell,
  Moon,
  PanelLeft,
  MoreHorizontal,
  Brain
} from "lucide-react";
import ChatMarkdown from "./ChatMarkdown";
import { toast } from "sonner";
import WriteAnythingStudio from "./WriteAnythingStudio";
import DIFeasibilityDashboard from "./bigdata";
import { ChatEmptyState } from "./ChatEmptyState";
import SkillResultCard from "./SkillResultCard";
import { SKILLS } from "@/lib/skillsCatalog";
import { cn } from "@/lib/utils";
import { USER } from "@/lib/profile";

const SKILL_MARKER = "__SKILL__:";

type TabKind = "chat" | "write" | "dashboard";

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

const tabTemplates = [
  { icon: Search, label: "Smart Paper Search", kind: "chat" as TabKind },
  { icon: FileText, label: "Smart Summarization", kind: "chat" as TabKind },
  { icon: Lightbulb, label: "Citation Generator", kind: "chat" as TabKind },
  { icon: Brain, label: "Deep Analytics", kind: "chat" as TabKind },
  { icon: BarChart3, label: "Big Data", kind: "dashboard" as TabKind },
  { icon: BookOpen, label: "Literature Review", kind: "chat" as TabKind },
  { icon: Wand2, label: "Write Anything", kind: "write" as TabKind },
];

const getTabIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("deep analytic") || l.includes("analytics") || l.includes("brain")) return Brain;
  if (l.includes("big data") || l.includes("bigdata") || l.includes("feasibility") || l.includes("dashboard") || l.includes("d&i")) return BarChart3;
  if (l.includes("write") || l.includes("wand") || l.includes("author") || l.includes("studio")) return Wand2;
  if (l.includes("code") || l.includes("dev") || l.includes("script")) return Code;
  if (l.includes("search") || l.includes("find") || l.includes("look") || l.includes("paper")) return Search;
  if (l.includes("citation") || l.includes("idea") || l.includes("think")) return Lightbulb;
  if (l.includes("doc") || l.includes("report") || l.includes("file") || l.includes("text") || l.includes("summar")) return FileText;
  if (l.includes("book") || l.includes("literature") || l.includes("review")) return BookOpen;
  return Search;
};

const getTabKind = (label: string): TabKind => {
  if (label.toLowerCase().includes("write") || label.toLowerCase().includes("studio")) return "write";
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
  isCompact?: boolean;
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
  isCompact = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const wandButtonRef = useRef<HTMLButtonElement>(null);
  const skillButtonRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isAddingTab, setIsAddingTab] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const [editingTabId, setEditingTabId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [input]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        skillButtonRef.current &&
        !skillButtonRef.current.contains(target) &&
        wandButtonRef.current &&
        !wandButtonRef.current.contains(target)
      ) {
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
    <div
      className="w-full mx-auto px-0 relative flex justify-center"
      style={{ maxWidth: "1050px" }}
    >
      <div className="bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-[24px] border border-gray-200/80 dark:border-zinc-800 shadow-[0_2px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.28)] transition-all duration-200 overflow-hidden flex flex-col w-full">
        
        {/* UPPER TABS BAR */}
        <div className={cn(
          "flex items-center overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          isCompact ? "gap-2 px-3 pt-2.5 pb-1" : "gap-3 sm:gap-4 px-5 sm:px-6 pt-4 pb-1.5"
        )}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                className={cn(
                  "group relative flex items-center transition-all duration-150 rounded-xl shrink-0 cursor-pointer",
                  isCompact ? "gap-1.5 px-2.5 py-1 text-[13px]" : "gap-2 px-3 py-1.5 text-[14.5px]",
                  isActive
                    ? "border border-[#FF5500]/40 dark:border-orange-500/40 text-[#FF5500] bg-orange-50/20 dark:bg-orange-950/20 shadow-2xs font-semibold"
                    : "text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white border border-transparent font-medium"
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon
                  className={cn(
                    "shrink-0 transition-colors",
                    isCompact ? "w-3.5 h-3.5" : "w-4 h-4",
                    isActive ? "text-[#FF5500]" : "text-gray-500 dark:text-zinc-400"
                  )}
                  strokeWidth={isActive ? 2.2 : 1.9}
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
                    className={cn(
                      "bg-transparent outline-none text-[#1C1C1C] dark:text-zinc-100",
                      isCompact ? "w-24 text-[12.5px]" : "w-32 text-[14px]"
                    )}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>
                    <span
                      className="whitespace-nowrap"
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        setEditingTabId(tab.id);
                        setEditingName(tab.label);
                      }}
                    >
                      {tab.label}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Pencil
                        className="w-3.5 h-3.5 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                        strokeWidth={2}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTabId(tab.id);
                          setEditingName(tab.label);
                        }}
                      />
                      {tabs.length > 1 && (
                        <X
                          className="w-3.5 h-3.5 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
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
            isAddingTab ? "max-h-[350px] opacity-100 border-t border-gray-100 dark:border-zinc-800" : "max-h-0 opacity-0"
          }`}
        >
          <div className={cn("bg-gray-50/50 dark:bg-zinc-900/50", isCompact ? "p-3" : "p-4 sm:p-4.5")}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5">
              <p className="text-[12px] font-bold uppercase tracking-wider px-1 text-gray-400 dark:text-zinc-500">
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
              className={cn(
                "bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg outline-none transition-all focus:border-[#FF5500] text-[#1C1C1C] dark:text-zinc-100",
                isCompact ? "w-full px-2.5 py-1 text-[12.5px]" : "w-full sm:w-44 px-3.5 py-1.5 text-[13.5px]"
              )}
              placeholder="Custom name..."
            />
          </div>
          <div className="flex flex-col gap-1 max-h-[180px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                className={cn(
                  "flex items-center w-full rounded-lg border border-transparent hover:border-[#FF5500]/30 hover:bg-white dark:hover:bg-zinc-800 transition-all group text-left cursor-pointer",
                  isCompact ? "gap-2 h-8 px-2" : "gap-3 h-10 px-3"
                )}
              >
                <template.icon className={cn("text-gray-500 dark:text-zinc-400 group-hover:text-[#FF5500] shrink-0", isCompact ? "w-3.5 h-3.5" : "w-4.5 h-4.5")} strokeWidth={2} />
                <p className={cn("font-medium text-[#1C1C1C] dark:text-zinc-200 group-hover:text-[#FF5500] transition-colors truncate", isCompact ? "text-[13px]" : "text-[14px]")}>
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
        className={cn(
          "w-full bg-transparent text-[#1C1C1C] dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none resize-none leading-relaxed [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          isCompact ? "px-3.5 pt-3 pb-1 text-[14px]" : "px-5 sm:px-6 pt-4 pb-1.5 text-[17px]"
        )}
        style={{ minHeight: isCompact ? "44px" : "58px" }}
      />

      {/* BOTTOM ACTION CONTROLS */}
      <div className={cn(
        "flex items-center justify-between w-full",
        isCompact ? "px-3 pb-2.5 pt-1" : "px-5 sm:px-6 pb-4 pt-2"
      )}>
        <div className={cn("flex items-center min-w-0", isCompact ? "gap-1" : "gap-2 sm:gap-2.5")}>
          <button
            type="button"
            onClick={() => setIsAddingTab((v) => !v)}
            className={cn(
              "transition-colors cursor-pointer shrink-0",
              isCompact ? "p-1.5 rounded-lg" : "p-2.5 rounded-xl",
              isAddingTab
                ? "bg-orange-50 text-[#FF5500] dark:bg-orange-950/40"
                : "text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800"
            )}
            title="Add tool"
          >
            <Plus className={cn("shrink-0", isCompact ? "w-4 h-4" : "w-5 h-5")} strokeWidth={2.2} />
          </button>

          {!isCompact && (
            <button
              type="button"
              className="p-2.5 rounded-xl text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
              title="Search web"
            >
              <Globe className="w-5 h-5" strokeWidth={2} />
            </button>
          )}

          <button
            ref={wandButtonRef}
            type="button"
            onClick={() => {
              if (!input.trim()) {
                toast.info("Type a prompt first to enhance");
                return;
              }
              setInput(
                `${input.trim()} — provide detailed academic reasoning, key citations, and structured findings.`
              );
              toast.success("Prompt enhanced!");
            }}
            className={cn(
              "text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0",
              isCompact ? "p-1.5 rounded-lg" : "p-2.5 rounded-xl"
          )}
            title="Enhance prompt"
          >
            <Wand2 className={cn("shrink-0", isCompact ? "w-4 h-4" : "w-5 h-5")} strokeWidth={2} />
          </button>

          <button
            ref={skillButtonRef}
            type="button"
            onClick={() => setSkillPickerOpen((v) => !v)}
            className={cn(
              "transition-colors cursor-pointer shrink-0",
              isCompact ? "p-1.5 rounded-lg" : "p-2.5 rounded-xl",
              skillPickerOpen
                ? "bg-orange-50 text-[#FF5500] dark:bg-orange-950/40"
                : "text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800"
            )}
            title="Skills"
          >
            <Layers
              className={cn(
                  "shrink-0 transition-colors",
                  isCompact ? "w-4 h-4" : "w-5 h-5",
                  skillPickerOpen ? "text-[#FF5500]" : "text-gray-500 dark:text-zinc-400"
              )}
              strokeWidth={2}
            />
          </button>

          {!isCompact && (
            <button
              type="button"
              className="p-2.5 rounded-xl text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
              title="Code interpreter"
            >
              <Code className="w-5 h-5" strokeWidth={2} />
            </button>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0",
              isCompact ? "p-1.5 rounded-lg" : "p-2.5 rounded-xl"
          )}
            title="Attach context file"
          >
            <Paperclip className={cn("shrink-0", isCompact ? "w-4 h-4" : "w-5 h-5")} strokeWidth={2} />
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

        <div className={cn("flex items-center shrink-0", isCompact ? "gap-1.5" : "gap-2.5 sm:gap-3")}>
          <button 
            type="button" 
            className={cn(
              "text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0",
              isCompact ? "p-1.5 rounded-lg" : "p-2.5 rounded-xl"
            )}
            title="Voice input"
        >
            <Mic className={cn("shrink-0", isCompact ? "w-4 h-4" : "w-5 h-5")} strokeWidth={2} />
        </button>

        <button 
          type="button" 
          onClick={onSend}
          disabled={!input.trim() || disabled}
          className={cn(
            "rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs text-white shrink-0",
            isCompact ? "w-8 h-8 min-w-[32px] min-h-[32px]" : "w-10 h-10 min-w-[40px] min-h-[40px]",
            input.trim()
              ? "bg-[#FF5500] hover:bg-[#E64D00] shadow-[0_2px_10px_rgba(255,85,0,0.30)] active:scale-95"
              : "bg-[#FFA285] dark:bg-orange-800/40 hover:bg-[#FF8555] disabled:opacity-40"
        )}
        title="Send prompt"
      >
        <ArrowUp className={cn("shrink-0", isCompact ? "w-4 h-4" : "w-5 h-5")} strokeWidth={2.6} />
      </button>
      </div>
    </div>
  </div>

  {/* SKILL PICKER POPOVER */}
  {skillPickerOpen && (
    <div ref={popoverRef} className="absolute left-0 right-0 top-full mt-2.5 z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
          <Layers className="w-5 h-5 text-[#FF5500] shrink-0" strokeWidth={2.2} />
          <input
            autoFocus
            value={skillQuery}
            onChange={(e) => setSkillQuery(e.target.value)}
            placeholder="Search skills to run…"
            className="bg-transparent outline-none text-[14.5px] flex-1 text-[#1C1C1C] dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500"
          />
          <span className="text-[12.5px] text-gray-400 shrink-0">
            {filteredSkills.length} available
          </span>
        </div>
        <div className="max-h-[310px] overflow-y-auto py-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {filteredSkills.length === 0 ? (
            <div className="py-6 text-center text-[13.5px] text-gray-400 dark:text-zinc-500">
              No skills found matching &ldquo;{skillQuery}&rdquo;
            </div>
          ) : (
            filteredSkills.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onRunSkill(s.id)}
                className="w-full text-left px-5 py-3 hover:bg-orange-50/40 dark:hover:bg-orange-950/20 transition-colors flex items-center justify-between gap-4 group cursor-pointer border-b border-gray-50/80 dark:border-zinc-800/40 last:border-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[14.5px] font-semibold text-[#1C1C1C] dark:text-zinc-100 group-hover:text-[#FF5500] transition-colors truncate">
                    {s.name}
                  </p>
                  <p className="text-[13px] text-gray-500 dark:text-zinc-400 font-normal leading-relaxed mt-0.5 truncate">
                    {s.summary}
                  </p>
                </div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#FF5500] bg-orange-50/50 dark:bg-orange-950/30 border border-[#FF5500]/30 px-2.5 py-0.5 rounded-full shrink-0">
                  {s.category}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )}
 </div>
  );
};

export interface CanvasMainProps {
  onChatStateChange?: (isStarted: boolean) => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const CanvasMain: React.FC<CanvasMainProps> = ({ onChatStateChange, onToggleSidebar }) => {
  const [tabs, setTabs] = useState<TabState[]>([
    { id: 1, icon: Search, label: "Smart Paper Search", kind: "chat", messages: [], draftInput: "" },
    { id: 2, icon: FileText, label: "Smart Summarization", kind: "chat", messages: [], draftInput: "" },
    { id: 3, icon: Lightbulb, label: "Citation Generator", kind: "chat", messages: [], draftInput: "" },
    { id: 4, icon: Wand2, label: "Write Anything", kind: "write", messages: [], draftInput: "" },
  ]);
  const [activeTabId, setActiveTabId] = useState<number>(1);
  const [isThinking, setIsThinking] = useState(false);
  const [skillPickerOpen, setSkillPickerOpen] = useState(false);
  const [skillQuery, setSkillQuery] = useState("");
  const [headerSearch, setHeaderSearch] = useState("");
  const [, setIsDashboardDismissed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const messages = currentTab.messages;
  const input = currentTab.draftInput;

  const setInput = useCallback((val: string) => {
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, draftInput: val } : t))
    );
  }, [activeTabId]);

  // Split layout: 20% AI Chat / 80% Big Data Dashboard
  const [splitPercent, setSplitPercent] = useState<number>(20);
  const [isDragging, setIsDragging] = useState(false);
  const splitContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleOpenTab = (e: Event) => {
      const ce = e as CustomEvent<{ label?: string }>;
      const targetLabel = ce.detail?.label || "";
      if (!targetLabel) return;

      setTabs((prev) => {
        const found = prev.find(
          (t) => t.label.toLowerCase() === targetLabel.toLowerCase()
        );
        if (found) {
          setActiveTabId(found.id);
          return prev;
        }
        const newTab: TabState = {
          id: Date.now(),
          icon: getTabIcon(targetLabel),
          label: targetLabel,
          kind: getTabKind(targetLabel),
          messages: [],
          draftInput: "",
        };
        setActiveTabId(newTab.id);
        return [...prev, newTab];
      });
    };

    window.addEventListener("open-tab", handleOpenTab);
    return () => window.removeEventListener("open-tab", handleOpenTab);
  }, []);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    isDraggingRef.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current || !splitContainerRef.current) return;
      const rect = splitContainerRef.current.getBoundingClientRect();
      const newPercent = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      const clamped = Math.min(Math.max(newPercent, 15), 85);
      setSplitPercent(clamped);
      window.dispatchEvent(
        new CustomEvent("split-ratio-change", { detail: { ratio: clamped } })
      );
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    isDraggingRef.current = true;

    const onTouchMove = (moveEvent: TouchEvent) => {
      if (!isDraggingRef.current || !splitContainerRef.current || !moveEvent.touches[0]) return;
      const rect = splitContainerRef.current.getBoundingClientRect();
      const clientX = moveEvent.touches[0].clientX;
      const newPercent = ((clientX - rect.left) / rect.width) * 100;
      const clamped = Math.min(Math.max(newPercent, 15), 85);
      setSplitPercent(clamped);
      window.dispatchEvent(
        new CustomEvent("split-ratio-change", { detail: { ratio: clamped } })
      );
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
  }, []);

  const handleResetSplit = useCallback(() => {
    setSplitPercent(20);
    window.dispatchEvent(
      new CustomEvent("split-ratio-change", { detail: { ratio: 20 } })
    );
    toast("Reset layout to 20/80");
  }, []);

  const isEmpty = messages.length === 0;

  // STRICT RULE: The Big Data screen ONLY appears when the user's prompt explicitly uses "big data"
  const hasBigDataInPrompt = messages.some(
    (m) => m.role === "user" && /big\s*data/i.test(m.content)
  );
  const isDashboardActive = hasBigDataInPrompt;

  useEffect(() => {
    onChatStateChange?.(!isEmpty);
    window.dispatchEvent(
      new CustomEvent("chat-state-change", { 
        detail: { 
          isStarted: !isEmpty, 
          isSplit: isDashboardActive,
          tabKind: currentTab.kind,
          tabLabel: currentTab.label 
        } 
      })
    );
  }, [isEmpty, onChatStateChange, isDashboardActive, currentTab.kind, currentTab.label]);

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

    // Check strictly if the user wrote a prompt containing "big data"
    const hasBigDataKeyword = /big\s*data/i.test(trimmed);

    appendTabMessage({ id: Date.now(), role: "user", content: trimmed });
    setInput("");
    setIsThinking(true);

    if (hasBigDataKeyword) {
      setIsDashboardDismissed(false);
      // Allocate 20% to AI Chat and 80% to Big Data
      setSplitPercent(20);
      window.dispatchEvent(
        new CustomEvent("split-ratio-change", { detail: { ratio: 20 } })
      );
    }

    setTimeout(() => {
      const responseContent = hasBigDataKeyword
        ? `Analyzed query: "${trimmed}". Generating Big Data D&I Feasibility Analysis dashboard on the right.`
        : `Analyzed query: "${trimmed}". Processing context across loaded index agents.`;

      appendTabMessage({
        id: Date.now() + 1,
        role: "ai",
        content: responseContent,
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

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Rivinity AI Chat",
          text: "Check out this conversation on Rivinity AI",
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Chat link copied to clipboard!");
    }
  };

  const isWriteMode = currentTab.kind === "write";

  const isCompact = splitPercent < 45;
  const isUltraCompact = splitPercent < 32;

  const exactSplitChatHeader = (
    <header className={cn(
      "relative flex h-[72px] shrink-0 items-center justify-between bg-transparent z-20 select-none w-full transition-all duration-150",
      isUltraCompact ? "px-2.5" : isCompact ? "px-3.5" : "px-5 sm:px-6"
    )}>
      <div className={cn("flex items-center min-w-0", isUltraCompact ? "gap-1.5" : "gap-2 sm:gap-3")}>
        <button
          type="button"
          onClick={onToggleSidebar}
          className={cn(
            "shrink-0 cursor-pointer items-center justify-center rounded-xl border border-black/5 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-900 md:hidden flex",
            isUltraCompact ? "h-8 w-8" : isCompact ? "h-9 w-9" : "h-11 w-11"
          )}
          aria-label="Toggle sidebar"
        >
          <PanelLeft className={cn("text-[#1C1C1C] dark:text-zinc-200", isCompact ? "h-4 w-4" : "h-5.5 w-5.5")} strokeWidth={2} />
        </button>

        <div className="flex items-center min-w-0">
          <div className={cn(
            "group relative flex items-center overflow-hidden rounded-full transition-all duration-300 ease-out",
            isUltraCompact ? "w-8 hover:w-[160px] focus-within:w-[160px]" : isCompact ? "w-9 hover:w-[200px] focus-within:w-[200px]" : "w-11 hover:w-[260px] focus-within:w-[260px] sm:hover:w-[320px] sm:focus-within:w-[320px]"
          )}>
            <Search className={cn(
              "pointer-events-none absolute z-10 text-[#1C1C1C] dark:text-zinc-200 shrink-0",
              isUltraCompact ? "left-2 h-4 w-4" : isCompact ? "left-2.5 h-4.5 w-4.5" : "left-3.5 h-5 w-5"
            )} strokeWidth={2} />
            <input
              type="text"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder={isUltraCompact ? "Search..." : "Search chats, tools, agents..."}
              className={cn(
                "w-full cursor-pointer rounded-full border border-transparent bg-transparent outline-none placeholder:text-gray-400 hover:border-gray-200/80 hover:bg-white/70 focus:cursor-text focus:border-gray-200 focus:bg-white focus:shadow-xs dark:text-white dark:placeholder:text-zinc-500 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/70 dark:focus:border-zinc-700 dark:focus:bg-zinc-900 transition-all duration-200",
                isUltraCompact ? "h-8 pl-8 pr-6 text-xs" : isCompact ? "h-9 pl-9 pr-7 text-[13.5px]" : "h-11 pl-11 pr-10 text-[15px]"
              )}
            />
            {headerSearch && (
              <button
                type="button"
                onClick={() => setHeaderSearch("")}
                className="absolute right-2.5 z-10 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={cn("flex items-center shrink-0", isUltraCompact ? "gap-1.5" : isCompact ? "gap-2" : "gap-3")}>
        <button
          type="button"
          className={cn(
            "relative shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200/70 bg-white shadow-xs transition-all hover:bg-gray-50 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800 flex",
            isUltraCompact ? "h-8 w-8" : isCompact ? "h-9 w-9" : "h-11 w-11"
          )}
          aria-label="Notifications"
        >
          <Bell className={cn("text-[#1C1C1C] dark:text-zinc-200", isCompact ? "h-4 w-4" : "h-5 w-5")} strokeWidth={1.9} />
          <span className={cn("absolute rounded-full bg-[#FF5500]", isCompact ? "right-1.5 top-1.5 h-2 w-2" : "right-2.5 top-2.5 h-2.5 w-2.5")} />
        </button>

        <button
          type="button"
          className={cn(
            "shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200/70 bg-white shadow-xs transition-all hover:bg-gray-50 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800 flex",
            isUltraCompact ? "h-8 w-8" : isCompact ? "h-9 w-9" : "h-11 w-11"
          )}
          aria-label="Toggle theme"
        >
          <Moon className={cn("text-[#1C1C1C] dark:text-zinc-200", isCompact ? "h-4 w-4" : "h-5 w-5")} strokeWidth={1.9} />
        </button>

        {isEmpty ? (
          <div className={cn(
            "shrink-0 cursor-pointer items-center rounded-full border border-gray-200/80 bg-white shadow-xs transition-colors hover:bg-gray-50/80 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800 flex",
            isUltraCompact ? "h-8 px-1" : isCompact ? "h-9 pl-1 pr-2 gap-1.5" : "h-[46px] pl-1.5 pr-4 gap-3"
          )}>
            <div className={cn(
              "shrink-0 items-center justify-center rounded-full bg-[#FF5500] font-bold text-white shadow-xs flex",
              isUltraCompact ? "h-6 w-6 text-[10px]" : isCompact ? "h-7 w-7 text-[11px]" : "h-9 w-9 text-[13px]"
            )}>
              {USER.initials}
            </div>

            {!isUltraCompact && (
              <div className="hidden text-left leading-none md:block">
                <p className={cn("font-semibold text-[#1C1C1C] dark:text-white truncate", isCompact ? "text-[12.5px] max-w-[70px]" : "text-[14.5px] max-w-[100px] xl:max-w-none")}>
                  {USER.name}
                </p>
                {!isCompact && (
                  <p className="text-[12px] font-normal text-gray-500 dark:text-gray-400 mt-1">
                    {USER.plan || "Pro Workspace"}
                  </p>
                )}
              </div>
            )}

            {!isCompact && (
              <ChevronDown className="hidden h-4.5 w-4.5 shrink-0 text-gray-500 dark:text-zinc-400 md:block ml-0.5" strokeWidth={2} />
            )}
          </div>
        ) : (
          <div className={cn("flex items-center transition-all duration-200", isUltraCompact ? "gap-1" : "gap-1.5")}>
            <button
              type="button"
              onClick={handleShare}
              className={cn(
                "rounded-full text-[#1C1C1C] hover:bg-black/5 dark:text-zinc-100 dark:hover:bg-white/10 font-semibold transition-colors cursor-pointer flex items-center justify-center",
                isUltraCompact ? "h-8 w-8 p-0" : isCompact ? "px-2.5 py-1.5 text-xs gap-1" : "px-3.5 py-2 text-[14px] gap-2"
              )}
              title="Share"
            >
              <Share className={cn(isUltraCompact ? "h-4 w-4" : isCompact ? "h-3.5 w-3.5" : "h-4.5 w-4.5")} strokeWidth={2} />
              {!isUltraCompact && <span>Share</span>}
            </button>

            <button
              type="button"
              onClick={() => toast("More options")}
              className={cn(
                "items-center justify-center rounded-full text-gray-700 hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10 transition-colors cursor-pointer flex",
                isUltraCompact ? "h-8 w-8" : isCompact ? "h-8 w-8" : "h-9 w-9"
              )}
              aria-label="More options"
            >
              <MoreHorizontal className={cn(isCompact ? "h-4 w-4" : "h-5 w-5")} strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </header>
  );

  if (isWriteMode) {
    return (
      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden">
        <div className="flex items-center border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-x-auto shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTabId(tab.id)}
              className={cn(
                "group relative flex items-center gap-2.5 px-4.5 py-3 text-[15px] font-medium border-r border-gray-100 dark:border-zinc-800 shrink-0 transition-colors cursor-pointer",
                activeTabId === tab.id
                  ? "bg-white dark:bg-zinc-800 text-[#FF5500]"
                  : "bg-gray-50/50 dark:bg-zinc-900/50 text-[#1C1C1C] dark:text-zinc-300 hover:text-black dark:hover:text-white"
              )}
            >
              <tab.icon
                className={cn(
                  "w-[18px] h-[18px] shrink-0 transition-colors",
                  activeTabId === tab.id ? "text-[#FF5500]" : "text-[#1C1C1C] dark:text-zinc-400"
                )}
                strokeWidth={2}
              />
              <span className="truncate">{tab.label}</span>
              {tabs.length > 1 && (
                <X
                  className="w-4 h-4 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 shrink-0 ml-1.5 opacity-60 hover:opacity-100"
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

  // AI Chat View (Canvas Main Prompt Box)
  const chatView = (
    <div className="flex-1 flex flex-col items-center justify-between min-w-0 min-h-0 h-full w-full relative overflow-hidden bg-[#FAF9F7]/40 dark:bg-zinc-950">
      {/* Show compact split header inside left chat panel only when actively split */}
      {isDashboardActive && exactSplitChatHeader}

      {!isEmpty && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
          style={{ top: "calc(50% - 3cm)" }}
        >
          <img
            src="/watermark.png"
            alt=""
            className="w-[660px] h-[660px] sm:w-[780px] sm:h-[780px] max-w-none object-contain opacity-[0.035] dark:opacity-[0.03]"
          />
        </div>
      )}

      {/* Scrollable Message List or Empty State */}
      <div className="flex-1 min-h-0 flex flex-col items-center overflow-y-auto overflow-x-hidden relative z-10 w-full max-w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {isEmpty ? (
          <div className="relative flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 py-8 sm:py-10 my-auto">
            <div className="w-full max-w-[1050px] mx-auto mb-8 flex justify-center">
              <ChatEmptyState />
            </div>

            <div 
              className="relative z-10 w-full max-w-[1050px] mx-auto flex justify-center mt-24 sm:mt-32 translate-y-[2cm]"
              style={{ transform: "translateY(2cm)" }}
            >
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
                isCompact={false}
              />
            </div>
          </div>
        ) : (
          <div
            className="w-full max-w-[1050px] mx-auto px-4 sm:px-6 py-6 space-y-5 sm:space-y-6 flex flex-col items-center"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`w-full flex items-start gap-2 sm:gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "ai" && (
                  <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center shrink-0 mt-2 sm:mt-2.5 select-none">
                    <img
                      src="/watermark.png"
                      alt="Rivinity"
                      className="w-7.5 h-7.5 sm:w-8 sm:h-8 object-contain"
                    />
                  </div>
                )}

                <div className={cn(
                  "group max-w-[90%] sm:max-w-[85%] flex flex-col",
                  msg.role === "user" ? "items-end" : "items-start"
                )}>
                  {msg.role === "ai" && msg.content.startsWith(SKILL_MARKER) ? (
                    <SkillResultCard skillId={msg.content.slice(SKILL_MARKER.length)} />
                  ) : (
                    <div
                      className={`w-fit text-[15px] sm:text-[15.5px] leading-relaxed break-words ${
                        msg.role === "user"
                          ? "px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl rounded-br-xs bg-[#FF5500] text-white shadow-[0_1px_3px_rgba(255,85,0,0.25)] whitespace-pre-wrap font-normal"
                          : "px-5 py-3.5 sm:px-5.5 sm:py-4 rounded-2xl rounded-bl-xs bg-white dark:bg-zinc-900 border border-gray-200/75 dark:border-zinc-800/80 text-[#1C1C1C] dark:text-zinc-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] font-normal"
                      }`}
                    >
                      {msg.role === "user" ? msg.content : <ChatMarkdown content={msg.content} />}
                    </div>
                  )}

                  <div className={`flex items-center gap-1.5 mt-1.5 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ${msg.role === "user" ? "justify-end self-end" : "justify-start self-start"}`}>
                    {msg.role === "user" ? (
                      <>
                        <button 
                          onClick={() => setInput(msg.content)} 
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors cursor-pointer" 
                          title="Edit prompt"
                        >
                          <Pencil className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <button 
                          onClick={() => { navigator.clipboard.writeText(msg.content); toast.success("Copied!"); }} 
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors cursor-pointer" 
                          title="Copy"
                        >
                          <Copy className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <button 
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({ text: msg.content }).catch(() => {});
                            } else {
                              navigator.clipboard.writeText(msg.content);
                              toast.success("Copied to clipboard for sharing!");
                            }
                          }} 
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors cursor-pointer" 
                          title="Share"
                        >
                          <Share2 className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => { navigator.clipboard.writeText(msg.content); toast.success("Copied!"); }} 
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors cursor-pointer" 
                          title="Copy"
                        >
                          <Copy className="w-4 h-4" strokeWidth={2} />
                        </button>

                        <button 
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({ text: msg.content }).catch(() => {});
                            } else {
                              navigator.clipboard.writeText(msg.content);
                              toast.success("Copied to clipboard for sharing!");
                            }
                          }} 
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors cursor-pointer" 
                          title="Share"
                        >
                          <Share2 className="w-4 h-4" strokeWidth={2} />
                        </button>

                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors cursor-pointer" title="Regenerate">
                          <RefreshCw className="w-4 h-4" strokeWidth={2} />
                        </button>

                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 dark:text-zinc-500 transition-colors cursor-pointer" title="Helpful">
                          <ThumbsUp className="w-4 h-4" strokeWidth={2} />
                        </button>

                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 dark:text-zinc-500 transition-colors cursor-pointer" title="Unhelpful">
                          <ThumbsDown className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="w-full flex items-start gap-2 sm:gap-2.5 justify-start">
                <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center shrink-0 mt-2 sm:mt-2.5 select-none">
                  <img
                    src="/watermark.png"
                    alt="Rivinity"
                    className="w-7.5 h-7.5 sm:w-8 sm:h-8 object-contain"
                  />
                </div>
                <div className="px-5 py-3.5 rounded-2xl rounded-bl-sm bg-white dark:bg-zinc-900 border border-gray-200/75 dark:border-zinc-800/80 flex items-center gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] animate-bounce [animation-delay:-0.15s] text-white" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] animate-bounce text-white" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Pinned Bottom Composer */}
      {!isEmpty && (
        <div className="px-3 sm:px-4 pb-5 pt-2.5 flex justify-center items-center bg-gradient-to-t from-[#FAF9F7] dark:from-zinc-950 via-[#FAF9F7]/95 dark:via-zinc-950/95 to-transparent shrink-0 relative z-10 w-full">
          <div className="w-full max-w-[1050px] mx-auto flex justify-center">
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
              isCompact={isDashboardActive && isCompact}
            />
          </div>
        </div>
      )}
    </div>
  );

  // SPLIT SCREEN: Left = AI chat (20%), Right = Big Data dashboard (80%)
  // Only rendered when a prompt containing "big data" has been submitted!
  if (isDashboardActive) {
    return (
      <div 
        ref={splitContainerRef}
        data-split-view="true"
        className="flex-1 flex flex-col lg:flex-row min-w-0 min-h-0 h-full w-full overflow-hidden relative select-none lg:select-auto"
      >
        {/* Left Panel: AI Chat (20% width) */}
        <div 
          className="h-full flex flex-col border-b lg:border-b-0 border-gray-200 dark:border-zinc-800 min-w-0 min-h-0 overflow-hidden shrink-0 transition-all duration-300"
          style={isDesktop ? { width: `${splitPercent}%` } : { width: "100%" }}
        >
          {chatView}
        </div>

        {/* Draggable Divider with Grab Handle */}
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleTouchStart}
          onDoubleClick={handleResetSplit}
          title="Drag left or right to resize panels (Double-click to reset to 20/80)"
          className={`hidden lg:flex items-center justify-center w-3.5 -mx-[7px] relative z-30 cursor-col-resize select-none group h-full shrink-0 transition-colors ${
            isDragging ? "bg-[#FF5500]/10" : ""
          }`}
        >
          <div
            className={`w-[2px] h-full transition-colors duration-150 ${
              isDragging
                ? "bg-[#FF5500]"
                : "bg-gray-200/90 dark:bg-zinc-800 group-hover:bg-[#FF5500]/80"
            }`}
          />
          <div
            className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-9 rounded-full border shadow-sm transition-all duration-150 ${
              isDragging
                ? "bg-[#FF5500] border-[#FF5500] text-white scale-110 shadow-md"
                : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-400 dark:text-zinc-400 group-hover:border-[#FF5500] group-hover:text-[#FF5500] group-hover:scale-105"
            }`}
          >
            <div className="flex items-center">
              <ChevronLeft className="w-2.5 h-2.5 -mr-0.5" strokeWidth={2.5} />
              <ChevronRight className="w-2.5 h-2.5" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Right Panel: Big Data Page (80% width) - Header successfully removed */}
        <div 
          data-dashboard="true"
          className="h-full flex flex-col overflow-y-auto min-w-0 min-h-0 flex-1 bg-white dark:bg-zinc-950 transition-all duration-500 ease-out animate-in fade-in slide-in-from-right-8"
          style={isDesktop ? { width: `${100 - splitPercent}%` } : { width: "100%" }}
        >
          <div className="flex-1 overflow-y-auto">
            <DIFeasibilityDashboard />
          </div>
        </div>
      </div>
    );
  }

  // If prompt doesn't contain "big data", stays in normal full-screen chat!
  return chatView;
}; 

export default CanvasMain;