"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";

import {
  PanelLeft,
  Search,
  MessageSquare,
  Globe,
  Layout,
  Database,
  AudioWaveform,
  GraduationCap,
  ImageIcon,
  Star,
  Sparkles,
  ArrowUpRight,
  Filter,
  Copy,
  Check,
  Calendar,
  CheckCircle2,
  BarChart3,
  Flame,
  Activity as PulseActivity,
} from "lucide-react";

type Activity = {
  id: string;
  time: string;
  day: "Today" | "Yesterday" | "Earlier";
  title: string;
  desc: string;
  tool: string;
  toolIcon: typeof MessageSquare;
  tag: string;
  tokens: string;
  executionMs: number;
  favorite?: boolean;
};

const activities: Activity[] = [
  {
    id: "1",
    time: "10:30 AM",
    day: "Today",
    title: "Research on Quantum Computing Advances",
    desc: "Analyzed fault-tolerant qubits, benchmarked surface code thresholds, and synthesized 12 vendor whitepapers.",
    tool: "AI Chat",
    toolIcon: MessageSquare,
    tag: "Research",
    tokens: "48,290",
    executionMs: 820,
    favorite: true,
  },
  {
    id: "2",
    time: "09:15 AM",
    day: "Today",
    title: "Search: Clean Tech & Sodium-ion Battery Roadmap",
    desc: "Scraped 43 market reports on cell energy densities and drafted cathode manufacturing cost curves.",
    tool: "Web Search",
    toolIcon: Globe,
    tag: "Market",
    tokens: "18,440",
    executionMs: 1420,
  },
  {
    id: "3",
    time: "08:45 AM",
    day: "Today",
    title: "AI SaaS Landing Page Wireframe & Theme",
    desc: "Generated Tailwind responsive components, glassmorphism hero banner, and pricing switch table.",
    tool: "App Builder",
    toolIcon: Layout,
    tag: "Design",
    tokens: "92,100",
    executionMs: 2340,
  },
  {
    id: "4",
    time: "06:20 PM",
    day: "Yesterday",
    title: "Customer Retention & Cohort Telemetry",
    desc: "Executed analytical queries over Snowflake table with 90-day retention curves and churn vectors.",
    tool: "Database",
    toolIcon: Database,
    tag: "Analysis",
    tokens: "6,210",
    executionMs: 430,
  },
  {
    id: "5",
    time: "04:10 PM",
    day: "Yesterday",
    title: "Voiceover: Product Launch Script v3",
    desc: "Rendered studio-grade voiceover audio track with emotional inflection matching keynote tempo.",
    tool: "Audio Lab",
    toolIcon: AudioWaveform,
    tag: "Audio",
    tokens: "12,900",
    executionMs: 3100,
    favorite: true,
  },
  {
    id: "6",
    time: "02:00 PM",
    day: "Earlier",
    title: "Study notes: SVD Matrix Decomposition",
    desc: "Extracted proofs, LaTeX formulas, and visual intuition diagrams for machine learning eigenvalues.",
    tool: "RivinityLM",
    toolIcon: GraduationCap,
    tag: "Education",
    tokens: "24,800",
    executionMs: 910,
  },
  {
    id: "7",
    time: "11:25 AM",
    day: "Earlier",
    title: "Upscale: Product Hero Banner (4K Output)",
    desc: "Applied super-resolution model with face geometry preservation and specular highlight recovery.",
    tool: "Image Enhancer",
    toolIcon: ImageIcon,
    tag: "Visuals",
    tokens: "3,100",
    executionMs: 4200,
  },
  {
    id: "8",
    time: "10:10 AM",
    day: "Earlier",
    title: "Stripe Webhook Handler & Billing Engine",
    desc: "Configured resilient idempotency ledger for invoice settlements, billing retry schemes, and notifications.",
    tool: "App Builder",
    toolIcon: Layout,
    tag: "DevOps",
    tokens: "38,700",
    executionMs: 1150,
  },
];

const tabs = [
  "All",
  "Favorites",
  "AI Chat",
  "Web Search",
  "App Builder",
  "Audio Lab",
  "RivinityLM",
  "Image Enhancer",
] as const;

const usageBars = [
  22, 38, 45, 30, 68, 85, 94, 76, 58, 42,
  63, 89, 72, 98, 84, 60, 48, 70, 92, 100,
];

const History = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]>("All");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] =
    useState<Activity>(activities[0]);

  const [tokenCounter, setTokenCounter] = useState(1503042973);

  useEffect(() => {
    const interval = setInterval(() => {
      setTokenCounter(
        (prev) => prev + Math.floor(Math.random() * 480) + 120
      );
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const [favs, setFavs] = useState<Record<string, boolean>>(
    Object.fromEntries(
      activities
        .filter((a) => a.favorite)
        .map((a) => [a.id, true])
    )
  );

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (
    id: string,
    text: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filtered = useMemo(() => {
    let list = activities;

    if (activeTab === "Favorites") {
      list = list.filter((a) => favs[a.id]);
    } else if (activeTab !== "All") {
      list = list.filter((a) => a.tool === activeTab);
    }

    if (query.trim()) {
      const q = query.toLowerCase();

      list = list.filter((a) =>
        `${a.title} ${a.desc} ${a.tool} ${a.tag}`
          .toLowerCase()
          .includes(q)
      );
    }

    return list;
  }, [activeTab, query, favs]);

  const grouped = useMemo(() => {
    const sections: Record<string, Activity[]> = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };

    filtered.forEach((activity) => {
      sections[activity.day]?.push(activity);
    });

    return sections;
  }, [filtered]);

  return (
    <div className="w-full h-screen flex overflow-hidden bg-[#FBFBFC] dark:bg-[#09090B] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-purple-500/20 transition-colors duration-200">
      {/* 
        FIX: Changed width to "340" when open and "88" when collapsed.
        Passed open and onToggle so CanvasSidebar displays its full width.
      */}
      <div
        className="shrink-0 transition-[width] duration-300 ease-in-out border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0F0F12]"
        style={{ width: sidebarOpen ? 340 : 88 }}
      >
        <CanvasSidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
          onCollapse={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 relative bg-[#FBFBFC] dark:bg-[#09090B] transition-colors duration-200">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-3.5 left-4 z-30 p-2 rounded-lg bg-white dark:bg-[#141418] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-sm dark:shadow-black/20 transition-all cursor-pointer"
            aria-label="Open sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}
        {/* Scrollable Canvas */}
        <div className="w-full flex-1 overflow-y-auto">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
            {/* Header with Live Stats Bar */}
            <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Activity Stream
                  </span>
                </div>

                <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-slate-900 dark:text-white">
                  Workspace Audit Log
                </h1>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                  Inspect runs, retrieved contexts, generated models, and token utilization in real-time.
                </p>
              </div>

              {/* Top Quick Status Pill Ledger */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white dark:bg-[#111114] border border-slate-200/90 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-black/20">
                  <PulseActivity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <div className="text-xs">
                    <span className="text-slate-400 dark:text-slate-500 font-mono">
                      STATUS:{" "}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      100% Operational
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white dark:bg-[#111114] border border-slate-200/90 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-black/20">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <div className="text-xs">
                    <span className="text-slate-400 dark:text-slate-500 font-mono">
                      ENTRIES:{" "}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {activities.length} logged
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive KPI Cards */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {/* Card 1 */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="w-full rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111114] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-black/20 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Active Plan
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Pro Enterprise
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Auto-billing active on custom quotas
                    </p>
                  </div>

                  <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/60">
                    <Sparkles className="w-4 h-4" />
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#18181C] border border-slate-200/70 dark:border-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      Session Verified
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Telemetry sync ready for Rivinity Engine
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="w-full rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111114] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-black/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span>Tokens executed in last 30 days</span>
                    <BarChart3 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  </div>

                  <div className="text-xl font-mono font-bold tracking-tight text-slate-900 dark:text-white">
                    {tokenCounter.toLocaleString()}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-end gap-1 h-12 pt-2">
                    {usageBars.map((height, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ height: 4 }}
                        animate={{ height: `${height}%` }}
                        transition={{
                          duration: 0.8,
                          delay: idx * 0.02,
                          repeat: Infinity,
                          repeatType: "reverse",
                          repeatDelay: 5,
                        }}
                        className={`flex-1 rounded-t-sm transition-colors ${
                          idx >= 14
                            ? "bg-purple-600 dark:bg-purple-500"
                            : "bg-purple-200 dark:bg-purple-950/70"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                    <span>Usage meter</span>
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">
                      $0.95 per 1M tokens
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="w-full sm:col-span-2 lg:col-span-1 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111114] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-black/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Inspector Target
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {selectedItem.day}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1 truncate">
                    {selectedItem.title}
                  </p>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-[#18181C] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-300 font-mono">
                    <span>Engine: {selectedItem.tool}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {selectedItem.executionMs}ms
                    </span>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    <span>Tokens: {selectedItem.tokens}</span>
                    <span>Tag: #{selectedItem.tag}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Search and Category Filter Strip */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-80 group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors pointer-events-none" />

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter by prompt, tool, or tag..."
                  className="w-full pl-9 pr-9 py-2 text-xs rounded-xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-purple-500 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-500/15 dark:focus:ring-purple-950/40 shadow-sm dark:shadow-black/20 transition"
                />

                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0 scrollbar-none">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab;

                  return (
                    <button
                      type="button"
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`h-8 px-3.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap border relative cursor-pointer ${
                        isActive
                          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm"
                          : "bg-white dark:bg-[#111114] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timeline Sections */}
            <div className="w-full space-y-8">
              {(["Today", "Yesterday", "Earlier"] as const).map((day) => {
                const items = grouped[day];

                if (!items || items.length === 0) return null;

                return (
                  <div key={day} className="w-full space-y-3">
                    <div className="w-full flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        <span>{day.toUpperCase()}</span>
                      </div>

                      <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

                      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                        {items.length}{" "}
                        {items.length === 1 ? "run" : "runs"}
                      </span>
                    </div>

                    <div className="w-full border border-slate-200/90 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-[#111114] shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-black/20 overflow-hidden">
                      <AnimatePresence>
                        {items.map((activity) => {
                          const Icon = activity.toolIcon;
                          const isFav = !!favs[activity.id];
                          const isCopied = copiedId === activity.id;
                          const isSelected =
                            selectedItem.id === activity.id;

                          return (
                            <motion.div
                              key={activity.id}
                              layout
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.98 }}
                              transition={{ duration: 0.18 }}
                              onClick={() => setSelectedItem(activity)}
                              className={`w-full group relative flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer transition-colors gap-4 ${
                                isSelected
                                  ? "bg-purple-50/40 dark:bg-purple-950/20"
                                  : "hover:bg-slate-50/70 dark:hover:bg-slate-900/60"
                              }`}
                            >
                              {/* Left Side Details */}
                              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                                <div className="p-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 group-hover:border-purple-200 dark:group-hover:border-purple-800 group-hover:bg-purple-50/50 dark:group-hover:bg-purple-950/30 transition-all shrink-0 mt-0.5">
                                  <Icon className="w-4 h-4" />
                                </div>

                                <div className="min-w-0 flex-1 space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                                      {activity.title}
                                    </h3>

                                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                                      {activity.tag}
                                    </span>
                                  </div>

                                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                                    {activity.desc}
                                  </p>
                                </div>
                              </div>

                              {/* Right Side Stats & Actions */}
                              <div className="flex items-center justify-between md:justify-end gap-5 pl-11 md:pl-0 shrink-0">
                                <div className="text-right hidden sm:block font-mono">
                                  <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                    {activity.tokens} tokens
                                  </div>

                                  <div className="text-[10px] text-slate-400 dark:text-slate-500">
                                    {activity.time} • {activity.executionMs}ms
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    type="button"
                                    onClick={(e) =>
                                      handleCopy(
                                        activity.id,
                                        activity.title,
                                        e
                                      )
                                    }
                                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                                    title="Copy Title"
                                  >
                                    {isCopied ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>

                                  <button
                                    type="button"
                                    onClick={(e) =>
                                      toggleFav(activity.id, e)
                                    }
                                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                      isFav
                                        ? "text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                                        : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
                                    }`}
                                    title={isFav ? "Unstar" : "Star"}
                                  >
                                    <Star
                                      className="w-3.5 h-3.5"
                                      fill={
                                        isFav
                                          ? "currentColor"
                                          : "none"
                                      }
                                    />
                                  </button>

                                  <a
                                    href={`#inspect-${activity.id}`}
                                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                                    title="Inspect execution"
                                  >
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}

              {/* Zero State */}
              {filtered.length === 0 && (
                <div className="w-full py-20 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-[#111114]">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto mb-3">
                    <Filter className="w-4 h-4" />
                  </div>

                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    No activity entries found
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                    Try broadening your search criteria or switching the category tab.
                  </p>

                  {(query || activeTab !== "All") && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setActiveTab("All");
                      }}
                      className="mt-4 px-3.5 py-1.5 text-xs font-medium rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition shadow-sm cursor-pointer"
                    >
                      Reset filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;