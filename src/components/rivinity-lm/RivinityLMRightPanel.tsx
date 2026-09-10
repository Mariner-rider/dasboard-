import { useState } from "react";
import {
  Upload, FileText,
  MessageSquare, StickyNote, Layers, HelpCircle, Podcast,
  FileAudio, CalendarCheck, GraduationCap, Swords, Bot, BarChart3,
  BookOpen
} from "lucide-react";
import ModelSelectorCard from "@/components/canvas/ModelSelectorCard";
import RightPanelShell from "@/components/panels/RightPanelShell";
import PanelSection from "@/components/panels/PanelSection";
import ToolsGrid, { type ToolItem } from "@/components/panels/ToolsGrid";
import RecentList, { type RecentItem } from "@/components/panels/RecentList";

const tools: ToolItem[] = [
  { id: "contextual-chat", icon: MessageSquare, label: "Chat", color: "text-primary" },
  { id: "smart-notes", icon: StickyNote, label: "SmartNotes", color: "text-secondary" },
  { id: "flashcards", icon: Layers, label: "Flashcards", color: "text-accent-pink" },
  { id: "quizzes", icon: HelpCircle, label: "Quizzes", color: "text-accent-purple" },
  { id: "ai-podcast", icon: Podcast, label: "Podcast", color: "text-primary" },
  { id: "voice-transcribe", icon: FileAudio, label: "Transcribe", color: "text-secondary" },
  { id: "homework-planner", icon: CalendarCheck, label: "Homework", color: "text-accent-pink" },
  { id: "exam-lab", icon: GraduationCap, label: "ExamLab", color: "text-accent-purple" },
  { id: "debate", icon: Swords, label: "Debate", color: "text-primary" },
  { id: "study-companion", icon: Bot, label: "Companion", color: "text-secondary" },
  { id: "data-analyst", icon: BarChart3, label: "Analyst", color: "text-accent-pink" },
];

const recentItems: RecentItem[] = [
  { label: "French Revolution Notes", time: "5m ago", icon: StickyNote },
  { label: "Calculus Quiz", time: "1h ago", icon: HelpCircle },
  { label: "Biology Flashcards", time: "3h ago", icon: Layers },
  { label: "Essay on Climate", time: "Yesterday", icon: FileText },
];

interface Props {
  activeFeature: string;
  onFeatureChange: (id: string) => void;
}

const RivinityLMRightPanel = ({ activeFeature, onFeatureChange }: Props) => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  return (
    <RightPanelShell gap={5}>
      <ModelSelectorCard label="AI Model" />

      <PanelSection label="Learning Tools">
        <ToolsGrid
          tools={tools}
          columns={3}
          dense
          activeId={activeFeature}
          onSelect={(t) => t.id && onFeatureChange(t.id)}
        />
      </PanelSection>

      <PanelSection label="Study Materials">
        <div className="glass rounded-2xl p-4 border border-glass border-dashed">
          {uploadedFiles.length === 0 ? (
            <div className="flex flex-col items-center text-center py-2">
              <Upload className="w-6 h-6 text-muted-foreground/25 mb-1.5" />
              <p className="text-[11px] text-muted-foreground/50">Drop PDFs, DOCX, or notes</p>
              <p className="text-[10px] text-muted-foreground/30 mt-0.5">AI will learn from your materials</p>
              <button className="mt-3 px-4 py-1.5 rounded-lg text-[11px] font-medium text-primary bg-primary/10 hover:bg-primary/15 transition-colors">
                Browse Files
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {uploadedFiles.map((f) => (
                <div key={f} className="flex items-center gap-2 text-[11px] text-foreground/60">
                  <FileText className="w-3 h-3" />
                  <span className="truncate flex-1">{f}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </PanelSection>

      <PanelSection label="Recent">
        <RecentList items={recentItems} dense />
      </PanelSection>

      {/* Study Stats */}
      <div className="mt-auto">
        <div className="glass rounded-2xl p-4 border border-glass">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <p className="text-[11px] font-medium text-foreground/70">Today's Progress</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-lg font-bold text-foreground/80">12</p>
              <p className="text-[10px] text-muted-foreground/40">Cards reviewed</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground/80">3</p>
              <p className="text-[10px] text-muted-foreground/40">Quizzes taken</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground/80">85%</p>
              <p className="text-[10px] text-muted-foreground/40">Accuracy</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground/80">2h</p>
              <p className="text-[10px] text-muted-foreground/40">Study time</p>
            </div>
          </div>
        </div>
      </div>
    </RightPanelShell>
  );
};

export default RivinityLMRightPanel;
