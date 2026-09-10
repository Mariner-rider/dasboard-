import { Sparkles, Wand2, Scissors } from "lucide-react";
import ModelSelectorCard from "@/components/canvas/ModelSelectorCard";
import RightPanelShell from "@/components/panels/RightPanelShell";
import PanelSection from "@/components/panels/PanelSection";
import RecentList, { type RecentItem } from "@/components/panels/RecentList";
import CreditsCard from "@/components/panels/CreditsCard";

const recents: RecentItem[] = [
  { label: "Portrait_4x.png", time: "2m ago", icon: Sparkles },
  { label: "Landscape_restored.jpg", time: "1h ago", icon: Wand2 },
  { label: "Product_cutout.png", time: "Yesterday", icon: Scissors },
];

const ImageEnhancerRightPanel = () => (
  <RightPanelShell>
    <ModelSelectorCard label="AI Model" />

    <PanelSection label="Tips">
      <div className="glass rounded-2xl p-4 border border-glass space-y-2">
        <p className="text-[11px] text-muted-foreground/70 leading-relaxed">• Use <span className="text-foreground/80 font-medium">Digital Art</span> for illustrations.</p>
        <p className="text-[11px] text-muted-foreground/70 leading-relaxed">• Use <span className="text-foreground/80 font-medium">Real-ESRGAN</span> for photos.</p>
        <p className="text-[11px] text-muted-foreground/70 leading-relaxed">• Enable <span className="text-foreground/80 font-medium">Double Upscayl</span> for extreme enlargement.</p>
      </div>
    </PanelSection>

    <PanelSection label="Recent">
      <RecentList items={recents} />
    </PanelSection>

    <CreditsCard
      label="Enhance Credits"
      value="9,200"
      percent={92}
      caption="800 / 10,000 images processed"
    />
  </RightPanelShell>
);

export default ImageEnhancerRightPanel;
