import { Globe, Layout, Palette, Smartphone } from "lucide-react";
import ModelSelectorCard from "@/components/canvas/ModelSelectorCard";
import RightPanelShell from "@/components/panels/RightPanelShell";
import PanelSection from "@/components/panels/PanelSection";
import ToolsGrid, { type ToolItem } from "@/components/panels/ToolsGrid";
import EmptyContextCard from "@/components/panels/EmptyContextCard";

const tools: ToolItem[] = [
  { icon: Globe, label: "Web Search", color: "text-primary" },
  { icon: Layout, label: "Templates", color: "text-secondary" },
  { icon: Palette, label: "Design", color: "text-accent-pink" },
  { icon: Smartphone, label: "Preview", color: "text-accent-purple" },
];

const AppBuilderRightPanel = () => (
  <RightPanelShell width={240} fullScreen>
    <ModelSelectorCard />
    <PanelSection label="Tools">
      <ToolsGrid tools={tools} />
    </PanelSection>
    <PanelSection label="Context">
      <EmptyContextCard />
    </PanelSection>
  </RightPanelShell>
);

export default AppBuilderRightPanel;
