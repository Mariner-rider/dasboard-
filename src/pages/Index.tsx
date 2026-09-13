<<<<<<< HEAD
import { useState, useRef, useEffect } from "react";
import { PanelLeft, X, Moon, ChevronDown, Search, Bell } from "lucide-react";
=======
import { useState } from "react";
import { Bell, PanelLeft, Search, X } from "lucide-react";
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
import CanvasSidebar from "@/components/canvas/CanvasSidebar";
import CanvasMain from "@/components/canvas/CanvasMain";
import { USER } from "@/lib/profile";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
<<<<<<< HEAD
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMobileSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isMobileSearchOpen]);

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <div className="relative h-full w-full flex overflow-hidden">
=======

  return (
    <div className="h-screen w-full p-2.5 md:p-4">
      <div className="relative h-full w-full flex rounded-[26px] md:rounded-[30px] glass border border-glass shadow-float overflow-hidden">
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
            aria-hidden="true"
          />
        )}

<<<<<<< HEAD
        {/* Sidebar wrapper */}
        <div
          className={`fixed md:static inset-y-0 left-0 z-50 h-full shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
            sidebarOpen
              ? "translate-x-0 w-[310px]"
              : "-translate-x-full md:translate-x-0 md:w-[68px]"
=======
        {/* Sidebar */}
        <div
          className={`fixed md:static inset-y-0 left-0 z-50 h-full shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
            sidebarOpen
              ? "translate-x-0 w-[288px]"
              : "-translate-x-full md:translate-x-0 md:w-0"
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
          }`}
        >
          <CanvasSidebar
            open={sidebarOpen}
<<<<<<< HEAD
            onToggle={() => setSidebarOpen((v) => !v)}
=======
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
            onCollapse={() => setSidebarOpen(false)}
            searchQuery={searchQuery}
          />
        </div>

<<<<<<< HEAD
        {/* Main content column */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <header className="relative h-16 sm:h-20 px-4 sm:px-8 flex items-center justify-between shrink-0 bg-transparent gap-3">
            
            {/* Left Section: Mobile Toggle + Desktop/Tablet Search */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-[360px] sm:max-w-[420px]">
              {/* Mobile Sidebar Toggle Button */}
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-sm md:hidden cursor-pointer shrink-0"
                aria-label="Toggle sidebar"
              >
                <PanelLeft className="w-5 h-5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={2} />
              </button>

              {/* Desktop/Tablet Expandable Search Pill */}
              <div className="hidden sm:flex items-center relative w-full">
                <div
                  className={`relative flex items-center transition-all duration-300 ease-out ${
                    searchQuery
                      ? "w-[340px]"
                      : "w-11 focus-within:w-[340px] hover:w-[340px]"
                  }`}
                >
                  <Search
                    className="absolute left-3.5 w-5 h-5 text-[#1C1C1C] dark:text-zinc-200 pointer-events-none z-10"
                    strokeWidth={2}
                  />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search chats, tools, agents..."
                    className="
                      h-11
                      w-full
                      pl-11
                      pr-9
                      rounded-full
                      bg-transparent
                      dark:bg-transparent
                      border
                      border-transparent
                      focus:border-black/10
                      hover:border-black/10
                      dark:focus:border-white/10
                      dark:hover:border-white/10
                      text-[15px]
                      text-[#1C1C1C]
                      dark:text-white
                      placeholder:text-gray-400
                      focus:placeholder:opacity-100
                      focus:outline-none
                      focus:bg-white
                      dark:focus:bg-zinc-900
                      focus:ring-2
                      focus:ring-black/5
                      cursor-pointer
                      focus:cursor-text
                    "
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 w-6 h-6 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors z-10 cursor-pointer"
                      aria-label="Clear search"
                    >
                      <X className="w-5 h-5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={2} />
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile Search Toggle & Floating Input */}
              <div className="sm:hidden flex items-center">
                {!isMobileSearchOpen ? (
                  <button
                    type="button"
                    onClick={() => setIsMobileSearchOpen(true)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent shrink-0 cursor-pointer"
                    aria-label="Open search"
                  >
                    <Search className="w-5 h-5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={2} />
                  </button>
                ) : (
                  <div className="absolute left-3 right-3 top-3.5 z-30 flex items-center bg-white dark:bg-zinc-900 shadow-md rounded-full px-3.5 py-2 border border-black/10">
                    <Search className="w-5 h-5 text-[#1C1C1C] dark:text-zinc-200 mr-2 shrink-0" strokeWidth={2} />
                    <input
                      ref={searchInputRef}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search chats, tools, agents..."
                      className="w-full bg-transparent text-[15px] outline-none text-[#1C1C1C] dark:text-white"
                    />
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setIsMobileSearchOpen(false);
                      }}
                      className="p-1 cursor-pointer"
                    >
                      <X className="w-5 h-5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={2} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section: Notifications + Theme + Profile */}
            <div className="ml-auto flex items-center gap-3 shrink-0">
              {/* Notifications Button */}
              <button
                className="relative w-11 h-11 rounded-full bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-xs flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer shrink-0"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={2} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FF5500] ring-2 ring-white dark:ring-zinc-900" />
              </button>

              {/* Theme Toggle Button */}
              <button
                className="w-11 h-11 rounded-full bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-xs flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer shrink-0"
                aria-label="Toggle theme"
              >
                <Moon className="w-5 h-5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={2} />
              </button>

              {/* Profile Pill */}
              <div className="flex items-center gap-3 h-11 pl-1.5 pr-4 rounded-full bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-xs hover:bg-gray-50/80 transition-colors cursor-pointer shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#FF5500] flex items-center justify-center text-[13px] font-bold text-white shadow-sm shrink-0">
                  {USER.initials}
                </div>
                <div className="hidden md:block leading-tight text-left">
                  <p className="text-[14.5px] font-semibold text-[#1C1C1C] dark:text-white tracking-tight">
                    {USER.name}
                  </p>
                  <p className="text-[12px] text-gray-500 font-normal">
                    {USER.plan}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-[#1C1C1C] dark:text-zinc-200 shrink-0 hidden md:block" strokeWidth={2} />
=======
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
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
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
