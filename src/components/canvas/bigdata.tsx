import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, ArrowUpRight, PanelRight } from "lucide-react";

const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(" ");

interface Breakpoints {
  isNarrow: boolean;
  isStacked: boolean;
  isTiny: boolean;
}

const DIFeasibilityDashboardComponent: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [showBenefit, setShowBenefit] = useState<boolean>(true);

  // Container measurement for dynamic panel resizing with rAF and breakpoint comparison
  // Prevents re-rendering during split drag unless responsive breakpoint is actually crossed
  const containerRef = useRef<HTMLDivElement>(null);
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    isNarrow: false,
    isStacked: false,
    isTiny: false,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    let rafId: number | null = null;

    const observer = new ResizeObserver((entries) => {
      if (rafId !== null) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const entry = entries[0];
        if (!entry) return;
        const w = Math.round(entry.contentRect.width);
        if (w <= 0) return;

        const isNarrow = w < 680;
        const isStacked = w < 960;
        const isTiny = w < 430;

        setBreakpoints((prev) => {
          if (
            prev.isNarrow === isNarrow &&
            prev.isStacked === isStacked &&
            prev.isTiny === isTiny
          ) {
            return prev; // Same reference -> abort React re-render!
          }
          return { isNarrow, isStacked, isTiny };
        });
      });
    });

    observer.observe(containerRef.current);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  const { isNarrow, isStacked, isTiny } = breakpoints;

  // Exact data values & colors (Scale: 0 to 3 Billion)
  const barData = useMemo(() => [
    { role: "Executives", width: "12.8%", color: "#bbf416" }, // Lime
    { role: "Managers", width: "47.3%", color: "#ff7700" },   // Orange
    { role: "Technical", width: "76.7%", color: "#00d2f7" },  // Cyan
    { role: "Non-Technical", width: "95.0%", color: "#00b050" } // Emerald Green
  ], []);

  const ticks = useMemo(() => [
    { label: "$0B", pct: 0 },
    { label: "$1B", pct: 33.33 },
    { label: "$1.5B", pct: 50 },
    { label: "$2B", pct: 66.67 },
    { label: "$2.5B", pct: 83.33 },
    { label: "$3B", pct: 100 },
  ], []);

  // Helper function to generate clean SVG arc paths for donut chart with gaps
  const createDonutArc = useCallback((
    cx: number,
    cy: number,
    r: number,
    startAngleDeg: number,
    endAngleDeg: number
  ) => {
    const startRad = ((startAngleDeg - 90) * Math.PI) / 180.0;
    const endRad = ((endAngleDeg - 90) * Math.PI) / 180.0;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArcFlag = endAngleDeg - startAngleDeg <= 180 ? 0 : 1;

    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  }, []);

  return (
    // 1. SOFT BACKDROP FRAME: Matches Canva Main background color seamlessly
    <div className="w-full h-full p-2 sm:p-2.5 lg:p-3 bg-[#FAF9F7]/40 dark:bg-zinc-950 flex flex-col min-w-0 min-h-0 overflow-hidden select-none">
      
      {/* 2. THE FLOATING CANVAS CARD: Looks completely distinct and elevated with rounded corners & shadow */}
      <div
        ref={containerRef}
        className={cn(
          "w-full h-full flex-1 flex flex-col bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-[22px] border border-gray-200/90 dark:border-zinc-800/90 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.35)] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden transform-gpu",
          isNarrow ? "p-4 sm:p-6 space-y-6" : isStacked ? "p-6 sm:p-7 space-y-7" : "p-7 sm:p-9 lg:p-10 space-y-8"
        )}
      >
        
        {/* Top Header Row with Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <h1 className={cn(
            "font-bold text-gray-900 dark:text-white tracking-tight",
            isNarrow ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
          )}>
            D&amp;I Department Feasibility Analysis
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium">Filter by</span>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 text-xs font-semibold rounded-full pl-3.5 pr-8 py-1.5 cursor-pointer outline-none shadow-2xs hover:border-gray-300 transition-colors"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Top Right Layout Toggle Button */}
            <button
              type="button"
              className="p-1.5 rounded-lg border border-gray-200/80 bg-white dark:bg-zinc-800 text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:white shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
              title="Panel options"
            >
              <PanelRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 KPI Metrics Header Row */}
        <div className={cn(
          "grid items-start pt-1 pb-1",
          isStacked ? "grid-cols-2 gap-4 sm:gap-6" : "grid-cols-4 gap-0"
        )}>
          {/* KPI 1: Annual Turnover Cost */}
          <div className={cn("min-w-0", !isStacked && "pr-4 lg:pr-6")}>
            <div className="text-xs sm:text-[13px] text-gray-600 dark:text-zinc-400 font-normal truncate">
              Annual Turnover Cost
            </div>
            <div className="flex items-center gap-2 sm:gap-3 mt-2 flex-wrap">
              <span className={cn(
                "font-bold tracking-tight text-gray-900 dark:text-white leading-none",
                isNarrow ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
              )}>
                $ 1,190
              </span>
              <div className="flex flex-col items-start shrink-0">
                <div className="flex items-center text-[10px] sm:text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  5.2%
                </div>
                <span className="text-[9.5px] sm:text-[10px] text-gray-400 dark:text-zinc-500 mt-0.5">
                  vs last year
                </span>
              </div>
            </div>
          </div>

          {/* KPI 2: Baseline Turnover Rate */}
          <div className={cn(
            "min-w-0",
            !isStacked && "px-4 lg:px-6 border-l border-gray-200/80 dark:border-zinc-800"
          )}>
            <div className="text-xs sm:text-[13px] text-gray-600 dark:text-zinc-400 font-normal truncate">
              Baseline Turnover Rate
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2 mt-2 flex-wrap">
              <span className={cn(
                "font-bold tracking-tight text-gray-900 dark:text-white leading-none",
                isNarrow ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
              )}>
                20%
              </span>
              <span className="text-[10.5px] sm:text-[11px] text-gray-400 dark:text-zinc-500 font-normal truncate">
                Industry avg: 18%
              </span>
            </div>
          </div>

          {/* KPI 3: D&I Program Cost */}
          <div className={cn(
            "min-w-0",
            !isStacked && "px-4 lg:px-6 border-l border-gray-200/80 dark:border-zinc-800"
          )}>
            <div className="text-xs sm:text-[13px] text-gray-600 dark:text-zinc-400 font-normal truncate">
              D&amp;I Program Cost
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2 mt-2 flex-wrap">
              <span className={cn(
                "font-bold tracking-tight text-gray-900 dark:text-white leading-none",
                isNarrow ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
              )}>
                $ 208.62
              </span>
              <span className="text-[10.5px] sm:text-[11px] text-gray-400 dark:text-zinc-500 font-normal truncate">
                1.75% of revenue
              </span>
            </div>
          </div>

          {/* KPI 4: Break-Even Improvement */}
          <div className={cn(
            "min-w-0",
            !isStacked && "pl-4 lg:pl-6 border-l border-gray-200/80 dark:border-zinc-800"
          )}>
            <div className="text-xs sm:text-[13px] text-gray-600 dark:text-zinc-400 font-normal truncate">
              Break-Even Improvement
            </div>
            <div className="mt-2">
              <span className={cn(
                "font-bold tracking-tight text-gray-900 dark:text-white leading-none",
                isNarrow ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
              )}>
                3.5%
              </span>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-200/60 dark:border-zinc-800" />

        {/* Row 2: Turnover Cost Breakdown & Workforce Composition */}
        <div className={cn(
          "grid items-start",
          isStacked ? "grid-cols-1 gap-8 sm:gap-10" : "grid-cols-2 gap-10"
        )}>
          
          {/* Turnover Cost Breakdown */}
          <div className="w-full min-w-0">
            <h2 className="text-[15px] sm:text-[16px] font-bold text-gray-900 dark:text-white mb-5 sm:mb-6">
              Turnover Cost Breakdown
            </h2>

            <div className="relative">
              {/* Vertical Gridlines spanning behind the bars */}
              <div className={cn(
                "absolute top-0 bottom-7 right-0 pointer-events-none",
                isNarrow ? "left-20 sm:left-24" : "left-24 sm:left-28"
              )}>
                {ticks.map((t) => (
                  <div
                    key={t.label}
                    className="absolute top-0 bottom-0 w-[1px] bg-gray-100 dark:bg-zinc-800/90"
                    style={{ left: `${t.pct}%` }}
                  />
                ))}
                <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gray-200 dark:bg-zinc-700" />
              </div>

              {/* Horizontal Bar Rows */}
              <div className="space-y-3.5 sm:space-y-4 relative z-10 pb-2">
                {barData.map((item) => (
                  <div key={item.role} className="flex items-center">
                    <div className={cn(
                      "text-right pr-3 sm:pr-4 text-xs sm:text-[13px] text-gray-600 dark:text-zinc-400 font-normal shrink-0 truncate select-none",
                      isNarrow ? "w-20 sm:w-24 text-[11.5px]" : "w-24 sm:w-28"
                    )}>
                      {item.role}
                    </div>
                    <div className="flex-1 h-[24px] sm:h-[26px] flex items-center min-w-0">
                      <div
                        className="rounded-[2px] shadow-2xs"
                        style={{
                          height: isNarrow ? "18px" : "22px",
                          minHeight: isNarrow ? "18px" : "22px",
                          width: item.width,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* X-Axis Ticks */}
              <div className={cn(
                "relative",
                isNarrow ? "pl-20 sm:pl-24" : "pl-24 sm:pl-28"
              )}>
                <div className="w-full border-t border-gray-200 dark:border-zinc-800 relative h-7">
                  {ticks.map((tick) => {
                    const hideOnTiny = isNarrow && isTiny && (tick.label === "$1.5B" || tick.label === "$2.5B");
                    if (hideOnTiny) return null;
                    return (
                      <div
                        key={tick.label}
                        className="absolute top-0 flex flex-col items-center -translate-x-1/2"
                        style={{ left: `${tick.pct}%` }}
                      >
                        <div className="w-[1px] h-1.5 bg-gray-300 dark:bg-zinc-700" />
                        <span className="text-[10px] sm:text-[11px] text-gray-400 dark:text-zinc-500 mt-1 font-normal select-none whitespace-nowrap">
                          {tick.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Workforce Composition - Responsive Donut & Legend */}
          <div className={cn(
            "w-full min-w-0",
            !isStacked && "border-l border-gray-200/70 dark:border-zinc-800 pl-10"
          )}>
            <h2 className="text-[15px] sm:text-[16px] font-bold text-gray-900 dark:text-white mb-4">
              Workforce Composition
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-3">
              {/* Donut Graphic */}
              <div className={cn(
                "relative shrink-0 flex items-center justify-center",
                isNarrow ? "w-36 h-36 sm:w-40 sm:h-40" : "w-44 h-44"
              )}>
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Non-technical (Green) */}
                  <path
                    d={createDonutArc(50, 50, 37, 182, 434)}
                    fill="none"
                    stroke="#00b050"
                    strokeWidth="11"
                    strokeLinecap="butt"
                  />

                  {/* Executives (Lime) */}
                  <path
                    d={createDonutArc(50, 50, 37, 80, 98)}
                    fill="none"
                    stroke="#bbf416"
                    strokeWidth="11"
                    strokeLinecap="butt"
                  />

                  {/* Managers (Orange) */}
                  <path
                    d={createDonutArc(50, 50, 37, 104, 125)}
                    fill="none"
                    stroke="#ff7700"
                    strokeWidth="11"
                    strokeLinecap="butt"
                  />

                  {/* Technical (Cyan) */}
                  <path
                    d={createDonutArc(50, 50, 37, 131, 175)}
                    fill="none"
                    stroke="#00d2f7"
                    strokeWidth="11"
                    strokeLinecap="butt"
                  />
                </svg>

                {/* Center Counter */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className={cn(
                    "font-extrabold text-gray-900 dark:text-white leading-none",
                    isNarrow ? "text-[24px]" : "text-[28px]"
                  )}>
                    850
                  </span>
                  <span className="text-[10.5px] sm:text-[11px] text-gray-400 dark:text-zinc-500 font-normal mt-1">
                    Peoples
                  </span>
                </div>
              </div>

              {/* Right Side Legend */}
              <div className="space-y-2 text-xs sm:text-[13px] min-w-[130px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#bbf416]" />
                  <span className="text-gray-900 dark:text-zinc-100 font-medium">Executives</span>
                  <span className="text-gray-400 dark:text-zinc-500 font-normal">70%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#ff7700]" />
                  <span className="text-gray-900 dark:text-zinc-100 font-medium">Managers</span>
                  <span className="text-gray-400 dark:text-zinc-500 font-normal">70%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#00d2f7]" />
                  <span className="text-gray-900 dark:text-zinc-100 font-medium">Technical</span>
                  <span className="text-gray-400 dark:text-zinc-500 font-normal">70%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#00b050]" />
                  <span className="text-gray-900 dark:text-zinc-100 font-medium">Non technical</span>
                  <span className="text-gray-400 dark:text-zinc-500 font-normal">70%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-200/60 dark:border-zinc-800" />

        {/* Row 3: Budget Breakdown & ROI Scenario Modeling */}
        <div className={cn(
          "grid items-start pb-6",
          isStacked ? "grid-cols-1 gap-8 sm:gap-10" : "grid-cols-12 gap-10"
        )}>
          
          {/* Budget Breakdown */}
          <div className={cn("w-full min-w-0", !isStacked ? "col-span-5" : "col-span-1")}>
            <h2 className="text-[15px] sm:text-[16px] font-bold text-gray-900 dark:text-white mb-3">
              Budget Breakdown
            </h2>

            <div className="flex flex-col items-center justify-center mt-3">
              <div className={cn(
                "relative",
                isNarrow ? "w-36 h-36 sm:w-40 sm:h-40" : "w-44 h-44"
              )}>
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* 75% Dark Blue Sector */}
                  <path
                    d="M 50 50 L 50 96 A 46 46 0 1 1 96 50 Z"
                    fill="#0077e6"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className="dark:stroke-zinc-950"
                  />
                  {/* 25% Light Blue Sector */}
                  <path
                    d="M 50 50 L 96 50 A 46 46 0 0 1 50 96 Z"
                    fill="#7ec2fb"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className="dark:stroke-zinc-950"
                  />
                </svg>
              </div>

              {/* Bottom Legends Centered */}
              <div className="mt-4 sm:mt-5 space-y-1.5 text-xs sm:text-[13px] flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0077e6]" />
                  <span className="text-gray-900 dark:text-zinc-100 font-medium">Program Spend</span>
                  <span className="text-gray-400 dark:text-zinc-500 font-normal">75%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7ec2fb]" />
                  <span className="text-gray-900 dark:text-zinc-100 font-medium">Salaries</span>
                  <span className="text-gray-400 dark:text-zinc-500 font-normal">25%</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROI & Scenario Modeling */}
          <div className={cn(
            "w-full min-w-0",
            !isStacked ? "col-span-7 border-l border-gray-200/70 dark:border-zinc-800 pl-10" : "col-span-1"
          )}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[15px] sm:text-[16px] font-bold text-gray-900 dark:text-white">
                ROI &amp; Scenario Modeling
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 dark:text-zinc-400 font-normal">Show Benefit</span>
                <button
                  type="button"
                  onClick={() => setShowBenefit(!showBenefit)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-gray-300 dark:border-zinc-700 transition-colors duration-200 focus:outline-none ${
                    showBenefit ? "bg-gray-200 dark:bg-zinc-700" : "bg-gray-100 dark:bg-zinc-800"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 mt-[1px] transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ${
                      showBenefit ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* SVG Plot */}
            <div className="relative w-full pt-4">
              <div className={cn("flex items-stretch", isNarrow ? "h-36 sm:h-40" : "h-44 sm:h-48")}>
                {/* Y-Axis labels with Rotated 'Savings' Text */}
                <div className="flex flex-col justify-between text-[10px] sm:text-[11px] text-gray-400 dark:text-zinc-500 pr-2.5 sm:pr-3 pb-6 text-right shrink-0 select-none relative pl-2">
                  <span className="absolute -left-3 top-1/2 -rotate-90 -translate-y-1/2 text-[8.5px] sm:text-[9px] text-gray-400 dark:text-zinc-500 tracking-wider">
                    Savings
                  </span>
                  <span>$12B</span>
                  <span>$9B</span>
                  <span>$6B</span>
                  <span>$3B</span>
                  <span>$0B</span>
                </div>

                {/* Plot Canvas */}
                <div className="relative flex-1 h-full pb-6 min-w-0">
                  <div className="absolute inset-0 pb-6 flex flex-col justify-between pointer-events-none">
                    <div className="border-b border-dashed border-gray-200/80 dark:border-zinc-800 w-full" />
                    <div className="border-b border-dashed border-gray-200/80 dark:border-zinc-800 w-full" />
                    <div className="border-b border-dashed border-gray-200/80 dark:border-zinc-800 w-full" />
                    <div className="border-b border-dashed border-gray-200/80 dark:border-zinc-800 w-full" />
                    <div className="border-b border-gray-300 dark:border-zinc-700 w-full" />
                  </div>

                  {/* Red Dashed Break-even Line */}
                  <div
                    className="absolute left-0 right-0 z-10 flex items-center pointer-events-none"
                    style={{ top: "54.5%" }}
                  >
                    <span className="text-[9px] sm:text-[9.5px] font-semibold text-red-500 bg-white dark:bg-zinc-950 pr-1 sm:pr-1.5 -translate-y-1/2 shrink-0 flex items-center gap-0.5 sm:gap-1 select-none">
                      Break-even <span className="text-[7px] sm:text-[7.5px]">▶</span>
                    </span>
                    <div className="flex-1 border-b border-dashed border-red-500" />
                  </div>

                  {/* SVG Shading & Curve */}
                  <svg
                    viewBox="0 0 600 240"
                    preserveAspectRatio="none"
                    className="w-full h-full overflow-visible"
                  >
                    <defs>
                      <linearGradient id="benefitGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0077e6" stopOpacity="0.18" />
                        <stop offset="60%" stopColor="#0077e6" stopOpacity="0.06" />
                        <stop offset="100%" stopColor="#0077e6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {showBenefit && (
                      <path
                        d="M 0 240 C 180 230, 240 185, 360 130 C 440 90, 520 40, 600 12 L 600 240 L 0 240 Z"
                        fill="url(#benefitGradient)"
                      />
                    )}

                    <path
                      d="M 0 240 C 180 230, 240 185, 360 130 C 440 90, 520 40, 600 12"
                      fill="none"
                      stroke="#0077e6"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* X-Axis Percentage Ticks */}
              <div className="pl-8 sm:pl-12 flex justify-between text-[10px] sm:text-[11px] text-gray-400 dark:text-zinc-500 select-none">
                <span>0%</span>
                <span>2%</span>
                <span>4%</span>
                <span>6%</span>
                <span>8%</span>
                <span>10%</span>
              </div>

              <div className="text-center text-[10.5px] sm:text-[11px] text-gray-500 dark:text-zinc-400 mt-2">
                Turnover Rate Improvements
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export const DIFeasibilityDashboard = React.memo(DIFeasibilityDashboardComponent);
export default DIFeasibilityDashboard;