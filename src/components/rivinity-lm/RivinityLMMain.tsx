import { useState } from "react";
import {
  Send, Paperclip, Mic, Sparkles, ChevronDown, Plus, X,
  MessageSquare, StickyNote, Layers, HelpCircle, Podcast,
  FileAudio, CalendarCheck, GraduationCap, Swords, Bot, BarChart3,
  BookOpen, Beaker, Globe, Code, Lightbulb, Search
} from "lucide-react";
import ContextualChatView from "./views/ContextualChatView";
import SmartNotesView from "./views/SmartNotesView";
import FlashcardsView from "./views/FlashcardsView";
import QuizzesView from "./views/QuizzesView";
import AIPodcastView from "./views/AIPodcastView";
import VoiceTranscribeView from "./views/VoiceTranscribeView";
import HomeworkPlannerView from "./views/HomeworkPlannerView";
import ExamLabView from "./views/ExamLabView";
import DebateView from "./views/DebateView";
import StudyCompanionView from "./views/StudyCompanionView";
import DataAnalystView from "./views/DataAnalystView";

const features = [
  { id: "contextual-chat", icon: MessageSquare, label: "Chat", desc: "Ask about your documents" },
  { id: "smart-notes", icon: StickyNote, label: "SmartNotes", desc: "Auto-generate Cornell notes" },
  { id: "flashcards", icon: Layers, label: "Flashcards", desc: "Spaced repetition cards" },
  { id: "quizzes", icon: HelpCircle, label: "Quizzes", desc: "Interactive quizzes" },
  { id: "ai-podcast", icon: Podcast, label: "AI Podcast", desc: "Learn on the go" },
  { id: "voice-transcribe", icon: FileAudio, label: "Transcribe", desc: "Lecture to notes" },
  { id: "homework-planner", icon: CalendarCheck, label: "Homework", desc: "Smart planning" },
  { id: "exam-lab", icon: GraduationCap, label: "ExamLab", desc: "Simulate exams" },
  { id: "debate", icon: Swords, label: "Debate", desc: "Sharpen arguments" },
  { id: "study-companion", icon: Bot, label: "Companion", desc: "Your AI tutor" },
  { id: "data-analyst", icon: BarChart3, label: "Data Analyst", desc: "Analyze data" },
];

interface Tab {
  id: number;
  icon: typeof Search;
  label: string;
}

const defaultTabs: Tab[] = [
  { id: 1, icon: BookOpen, label: "Study Session" },
  { id: 2, icon: Beaker, label: "Research Lab" },
  { id: 3, icon: Globe, label: "Explore Topics" },
];

const tabTemplates = [
  { icon: Search, label: "Research" },
  { icon: Code, label: "Problem Set" },
  { icon: Lightbulb, label: "Brainstorm" },
  { icon: BookOpen, label: "Reading" },
];

const suggestions = [
  { icon: BookOpen, label: "Explain a concept" },
  { icon: Beaker, label: "Science help" },
  { icon: Code, label: "Math solver" },
  { icon: Lightbulb, label: "Essay ideas" },
  { icon: Globe, label: "History deep-dive" },
];

const topicCards = [
  { title: "Mathematics", desc: "Algebra, Calculus, Statistics & more", gradient: "from-primary to-accent-pink" },
  { title: "Science", desc: "Physics, Chemistry, Biology", gradient: "from-secondary to-accent-purple" },
  { title: "English", desc: "Literature, Grammar, Writing", gradient: "from-accent-pink to-primary" },
  { title: "History", desc: "World History, Civilizations", gradient: "from-accent-purple to-secondary" },
];

interface Props {
  activeFeature: string;
  onFeatureChange: (id: string) => void;
}

const RivinityLMMain = ({ activeFeature, onFeatureChange }: Props) => {
  const [input, setInput] = useState("");
  const [tabs, setTabs] = useState<Tab[]>(defaultTabs);
  const [activeTab, setActiveTab] = useState(defaultTabs[0].id);
  const [promptMode, setPromptMode] = useState("Chat");
  const [responseLength, setResponseLength] = useState("Medium");
  const [showPromptDropdown, setShowPromptDropdown] = useState(false);
  const [showLengthDropdown, setShowLengthDropdown] = useState(false);

  const addTab = () => {
    const template = tabTemplates[tabs.length % tabTemplates.length];
    const newTab: Tab = { id: Date.now(), icon: template.icon, label: template.label };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;
    const idx = tabs.findIndex(t => t.id === id);
    if (activeTab === id) {
      const next = tabs[idx + 1] || tabs[idx - 1];
      setActiveTab(next.id);
    }
    setTabs(prev => prev.filter(t => t.id !== id));
  };

  const handleSend = () => {
    if (!input.trim()) return;
    onFeatureChange("contextual-chat");
    setInput("");
  };

  const renderView = () => {
    switch (activeFeature) {
      case "contextual-chat": return <ContextualChatView />;
      case "smart-notes": return <SmartNotesView />;
      case "flashcards": return <FlashcardsView />;
      case "quizzes": return <QuizzesView />;
      case "ai-podcast": return <AIPodcastView />;
      case "voice-transcribe": return <VoiceTranscribeView />;
      case "homework-planner": return <HomeworkPlannerView />;
      case "exam-lab": return <ExamLabView />;
      case "debate": return <DebateView />;
      case "study-companion": return <StudyCompanionView />;
      case "data-analyst": return <DataAnalystView />;
      default: return null;
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  if (activeFeature !== "landing") {
    return (
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Feature tabs */}
        <div className="px-6 pt-4 pb-2 flex items-center gap-1.5 overflow-x-auto shrink-0">
          <button
            onClick={() => onFeatureChange("landing")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-medium text-muted-foreground/50 hover:text-foreground/70 hover:bg-accent/50 transition-all whitespace-nowrap"
          >
            ← Home
          </button>
          <div className="w-px h-5 bg-border/40 mx-1" />
          {features.map((f) => (
            <button
              key={f.id}
              onClick={() => onFeatureChange(f.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-medium transition-all duration-200 whitespace-nowrap ${
                activeFeature === f.id
                  ? "glass border border-glass shadow-float text-foreground"
                  : "text-muted-foreground/50 hover:text-foreground/70 hover:bg-accent/50"
              }`}
            >
              <f.icon className="w-3.5 h-3.5" />
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="animate-float-in">{renderView()}</div>
        </div>
      </div>
    );
  }

  // Landing page
  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      <div className="flex-1 flex flex-col items-center overflow-y-auto">
        <div className="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-[740px] mx-auto">
          {/* Orb */}
          <div className="w-14 h-14 rounded-full gradient-accent opacity-80 animate-orb mb-6 shadow-glow-accent" />

          <p className="text-[11px] text-muted-foreground/40 tracking-widest uppercase mb-3">{today}</p>

          <h1 className="text-4xl sm:text-5xl font-semibold text-foreground/85 text-center leading-tight tracking-tight">
            What'd you like to
            <br />
            learn today?
          </h1>

          <div className="h-1 w-16 rounded-full gradient-accent mt-4 mb-8" />

          {/* Input */}
          <div className="w-full max-w-[680px] mb-4">
            <div className="border border-border/60 rounded-2xl shadow-float input-glow transition-all duration-200 overflow-hidden bg-background">
              {/* Tabs */}
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
                <button onClick={addTab} className="px-3 py-2.5 text-muted-foreground/40 hover:text-muted-foreground/70 hover:bg-muted/30 transition-all shrink-0">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Ask me to teach you anything..."
                rows={2}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none px-5 pt-4 pb-1 resize-none"
              />

              {/* Controls bar */}
              <div className="flex items-center justify-between px-3 pb-3 pt-1">
                <div className="flex items-center gap-1">
                  {/* Prompt Mode */}
                  <div className="relative">
                    <button
                      onClick={() => { setShowPromptDropdown(!showPromptDropdown); setShowLengthDropdown(false); }}
                      className="flex flex-col px-3 py-1.5 rounded-lg text-left hover:bg-muted/40 transition-all"
                    >
                      <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">Prompt Mode</span>
                      <span className="text-[12px] font-semibold text-foreground/70 flex items-center gap-1">
                        {promptMode} <ChevronDown className="w-3 h-3 opacity-50" />
                      </span>
                    </button>
                    {showPromptDropdown && (
                      <div className="absolute top-full mt-1 left-0 w-36 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in z-50">
                        {["Chat", "Deep Dive", "Quick Answer", "Tutorial"].map((m) => (
                          <button key={m} onClick={() => { setPromptMode(m); setShowPromptDropdown(false); }}
                            className={`w-full px-4 py-2 text-[12px] text-left transition-colors ${m === promptMode ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"}`}
                          >{m}</button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="w-px h-6 bg-border/30" />

                  {/* File upload */}
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted/40 transition-all">
                    <Paperclip className="w-3.5 h-3.5 text-muted-foreground/40" />
                    <div className="text-left">
                      <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider block">Add files</span>
                      <span className="text-[12px] font-medium text-foreground/60">Click or drop</span>
                    </div>
                  </button>

                  <div className="w-px h-6 bg-border/30" />

                  {/* Response Length */}
                  <div className="relative">
                    <button
                      onClick={() => { setShowLengthDropdown(!showLengthDropdown); setShowPromptDropdown(false); }}
                      className="flex flex-col px-3 py-1.5 rounded-lg text-left hover:bg-muted/40 transition-all"
                    >
                      <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">Response Length</span>
                      <span className="text-[12px] font-semibold text-foreground/70 flex items-center gap-1">
                        {responseLength} <ChevronDown className="w-3 h-3 opacity-50" />
                      </span>
                    </button>
                    {showLengthDropdown && (
                      <div className="absolute top-full mt-1 left-0 w-36 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in z-50">
                        {["Short", "Medium", "Long", "Detailed"].map((l) => (
                          <button key={l} onClick={() => { setResponseLength(l); setShowLengthDropdown(false); }}
                            className={`w-full px-4 py-2 text-[12px] text-left transition-colors ${l === responseLength ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"}`}
                          >{l}</button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="w-px h-6 bg-border/30" />

                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/35 hover:text-muted-foreground/60 hover:bg-muted/40 transition-all">
                    <Mic className="w-[15px] h-[15px]" />
                  </button>
                </div>

                <button onClick={handleSend} className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity">
                  <Send className="w-3.5 h-3.5 text-background" />
                </button>
              </div>
            </div>
          </div>

          {/* Suggestion chips */}
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            {suggestions.map((s) => (
              <button key={s.label} onClick={() => setInput(s.label)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors text-[12px] text-muted-foreground font-medium"
              >
                <s.icon className="w-3 h-3" />{s.label}
              </button>
            ))}
          </div>

          {/* Explore Topics */}
          <div className="w-full max-w-[700px] mb-6">
            <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest text-center mb-4">Explore Topics</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {topicCards.map((t) => (
                <button key={t.title} onClick={() => { setInput(`Teach me about ${t.title}`); }}
                  className="group relative overflow-hidden rounded-2xl p-5 glass border border-glass border-glass-hover transition-all duration-300 hover:shadow-float text-left"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} opacity-[0.06] group-hover:opacity-[0.12] transition-opacity`} />
                  <p className="text-[14px] font-semibold text-foreground/80 relative">{t.title}</p>
                  <p className="text-[11px] text-muted-foreground/50 mt-1 relative leading-relaxed">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground/30 mt-4 mb-6">
            RivinityLM can make mistakes. Cross-check crucial information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RivinityLMMain;
