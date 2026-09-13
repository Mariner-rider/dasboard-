import { useState } from "react";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";

import AppBuilderMain from "@/components/app-builder/AppBuilderMain";
import AppBuilderRightPanel from "@/components/app-builder/AppBuilderRightPanel";
import { PanelLeft } from "lucide-react";

const AppBuilder = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex overflow-hidden">
      <div
        className="shrink-0 transition-all duration-300 ease-in-out overflow-hidden"
        style={{ width: sidebarOpen ? 260 : 0 }}
      >
        <CanvasSidebar onCollapse={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-3 left-3 z-20 w-8 h-8 rounded-xl glass border border-glass shadow-float flex items-center justify-center text-muted-foreground/60 hover:text-foreground/80 hover:shadow-glow-accent transition-all duration-200 animate-float-in"
            aria-label="Open sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}
        <div className="flex-1 flex min-h-0">
          <AppBuilderMain />
          <AppBuilderRightPanel />
        </div>
      </div>
    </div>
  );
};

export default AppBuilder;
