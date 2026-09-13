import { useState, useEffect, ReactNode } from "react";
import CanvasSidebar from "./CanvasSidebar";
import { PanelLeft } from "lucide-react";

interface SidebarShellProps {
  children: ReactNode;
}

<<<<<<< HEAD
// Sidebar width configuration: 340px when expanded, 68px when collapsed
const SIDEBAR_EXPANDED_WIDTH = 340;
const SIDEBAR_COLLAPSED_WIDTH = 68;

const SidebarShell = ({ children }: SidebarShellProps) => {
=======
const SidebarShell = ({ children }: SidebarShellProps) => {
  // Automatically open by default on desktop (>=768px), closed by default on mobile (<768px)
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768;
    }
    return true;
  });

<<<<<<< HEAD
=======
  // Track window resize to ensure proper state across screen size changes
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen w-full flex overflow-hidden relative">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}

<<<<<<< HEAD
      {/* Sidebar Wrapper: Desktop collapsed = 68px, Expanded = 340px */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 border-r border-border/40 transition-all duration-300 ease-in-out md:shrink-0 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          width:
            typeof window !== "undefined" && window.innerWidth >= 768
              ? sidebarOpen
                ? SIDEBAR_EXPANDED_WIDTH
                : SIDEBAR_COLLAPSED_WIDTH
              : sidebarOpen
              ? SIDEBAR_EXPANDED_WIDTH
              : 0,
          overflow: "hidden",
        }}
      >
        <CanvasSidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
          onCollapse={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full h-full relative overflow-hidden">
        {/* Mobile floating toggle button */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className={`absolute top-3 left-3 z-30 w-8 h-8 rounded-xl glass border border-glass shadow-float flex md:hidden items-center justify-center text-muted-foreground/60 hover:text-foreground/80 hover:shadow-glow-accent transition-all duration-200 animate-float-in cursor-pointer ${
            sidebarOpen ? "hidden" : "flex"
=======
      {/* Sidebar Wrapper: fixed drawer overlay on mobile, inline column on desktop */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out md:shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          width: typeof window !== "undefined" && window.innerWidth >= 768 
            ? (sidebarOpen ? 260 : 0) 
            : 260,
          overflow: "hidden",
        }}
      >
        <CanvasSidebar open={sidebarOpen} onCollapse={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 w-full h-full relative overflow-hidden">
        {/* Toggle open button on mobile or when desktop is collapsed */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className={`absolute top-3 left-3 z-30 w-8 h-8 rounded-xl glass border border-glass shadow-float flex items-center justify-center text-muted-foreground/60 hover:text-foreground/80 hover:shadow-glow-accent transition-all duration-200 animate-float-in cursor-pointer ${
            sidebarOpen ? "hidden md:hidden" : "flex"
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
          }`}
          aria-label="Open sidebar"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default SidebarShell;
