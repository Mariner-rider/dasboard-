import { Sparkles, Wand2, Scissors } from "lucide-react";
import UpscaleView from "./views/UpscaleView";
import RestoreView from "./views/RestoreView";
import BackgroundView from "./views/BackgroundView";

const features = [
  { id: "upscale", icon: Sparkles, label: "AI Upscale" },
  { id: "restore", icon: Wand2, label: "Restore & Enhance" },
  { id: "background", icon: Scissors, label: "Background" },
];

interface Props {
  activeFeature: string;
  onFeatureChange: (id: string) => void;
}

const ImageEnhancerMain = ({ activeFeature, onFeatureChange }: Props) => {
  const renderView = () => {
    switch (activeFeature) {
      case "restore": return <RestoreView />;
      case "background": return <BackgroundView />;
      default: return <UpscaleView />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      <div className="px-6 pt-2 pb-3">
        <h2 className="text-xl font-semibold text-foreground/90">Image Enhancer</h2>
        <p className="text-[13px] text-muted-foreground/60 mt-1">Enlarge and enhance low-resolution images using advanced AI — like magic.</p>
      </div>

      <div className="px-6 pb-2 flex items-center gap-2 overflow-x-auto shrink-0">
        {features.map((f) => (
          <button
            key={f.id}
            onClick={() => onFeatureChange(f.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
              activeFeature === f.id
                ? "glass border border-glass shadow-float text-foreground"
                : "text-muted-foreground/60 hover:text-foreground/80 hover:bg-accent/50"
            }`}
          >
            <f.icon className="w-4 h-4" />
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="animate-float-in">{renderView()}</div>
      </div>
    </div>
  );
};

export default ImageEnhancerMain;
