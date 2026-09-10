import { useState } from "react";
import { Volume2, Mic, AudioWaveform, Star, ChevronDown } from "lucide-react";
import ModelSelectorCard from "@/components/canvas/ModelSelectorCard";
import RightPanelShell from "@/components/panels/RightPanelShell";
import PanelSection from "@/components/panels/PanelSection";
import RecentList, { type RecentItem } from "@/components/panels/RecentList";
import CreditsCard from "@/components/panels/CreditsCard";

const voices = [
  { id: "sarah", name: "Sarah", desc: "Warm & professional", avatar: "S" },
  { id: "jonathan", name: "Jonathan", desc: "Powerful & persuasive", avatar: "J" },
  { id: "yolanda", name: "Yolanda", desc: "Calm & friendly", avatar: "Y" },
  { id: "george", name: "George", desc: "Deep & authoritative", avatar: "G" },
  { id: "lily", name: "Lily", desc: "Bright & energetic", avatar: "L" },
];

interface Props {
  activeFeature: string;
}

const AudioLabRightPanel = ({ activeFeature }: Props) => {
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);
  const [voiceDropdownOpen, setVoiceDropdownOpen] = useState(false);

  const showVoiceSelector = activeFeature === "text-to-speech" || activeFeature === "voice-clone";

  const recents: RecentItem[] = [
    { label: "Welcome greeting", time: "2m ago", icon: Volume2 },
    { label: "Meeting transcript", time: "1h ago", icon: Mic },
    { label: "Rain ambience", time: "3h ago", icon: AudioWaveform },
  ];

  return (
    <RightPanelShell>
      <ModelSelectorCard label="AI Model" />

      {showVoiceSelector && (
        <PanelSection label="Selected Voice">
          <div className="relative">
            <button
              onClick={() => setVoiceDropdownOpen(!voiceDropdownOpen)}
              className="w-full glass rounded-2xl p-4 border border-glass shadow-float text-left hover:shadow-glow-accent transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center text-sm font-semibold text-foreground/70">
                    {selectedVoice.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{selectedVoice.name}</p>
                    <p className="text-[11px] text-muted-foreground/60">{selectedVoice.desc}</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground/50 transition-transform duration-200 ${voiceDropdownOpen ? "rotate-180" : ""}`} />
              </div>
            </button>

            {voiceDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 z-50 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in">
                {voices.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVoice(v);
                      setVoiceDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      v.id === selectedVoice.id
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-semibold text-foreground/70">
                      {v.avatar}
                    </div>
                    <div>
                      <p className="text-[13px] font-medium">{v.name}</p>
                      <p className="text-[11px] text-muted-foreground/50">{v.desc}</p>
                    </div>
                    {v.id === selectedVoice.id && (
                      <Star className="w-3 h-3 text-primary ml-auto fill-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </PanelSection>
      )}

      <PanelSection label="Recent">
        <RecentList items={recents} />
      </PanelSection>

      <CreditsCard
        label="Credits Remaining"
        value="8,450"
        percent={84.5}
        caption="84,500 / 100,000 characters used"
      />
    </RightPanelShell>
  );
};

export default AudioLabRightPanel;
