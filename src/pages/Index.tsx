import { useState } from "react";
import { Bell, PanelLeft, Search, X } from "lucide-react";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";
import CanvasMain from "@/components/canvas/CanvasMain";
import { USER } from "@/lib/profile";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-screen w-full p-2.5 md:p-4">
      <div className="relative h-full w-full flex rounded-[26px] md:rounded-[30px] glass border border-glass shadow-float overflow-hidden">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed md:static inset-y-0 left-0 z-50 h-full shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
            sidebarOpen
              ? "translate-x-0 w-[288px]"
              : "-translate-x-full md:translate-x-0 md:w-0"
          }`}
        >
          <CanvasSidebar
            open={sidebarOpen}
            onCollapse={() => setSidebarOpen(false)}
            searchQuery={searchQuery}
          />
        </div>

        {/* Main column */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* App top bar */}
          <header className="h-14 md:h-16 px-3 md:px-5 flex items-center gap-2 md:gap-3 shrink-0 border-b border-glass/70">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors md:hidden"
              aria-label="Toggle sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>

            {/* Search — filters chat history in the sidebar */}
            <div className="relative flex-1 max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50 pointer-events-none" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chats…"
                className="w-full h-9 pl-9 pr-8 rounded-full bg-muted/40 border border-border/60 text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="ml-auto flex items-center gap-1">
              <button
                className="relative w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 ring-2 ring-background" />
              </button>

              <div className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1.5 ml-1 rounded-full hover:bg-muted/40 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-[11px] font-bold text-primary-foreground shadow-sm">
                  {USER.initials}
                </div>
                <div className="hidden md:block leading-tight">
                  <p className="text-[12.5px] font-semibold text-foreground/90">{USER.name}</p>
                  <p className="text-[10.5px] text-muted-foreground/60">{USER.plan}</p>
                </div>
              </div>
            </div>
          </header>

          <CanvasMain />
        </div>
      </div>
    </div>
  );
};

export default Index;