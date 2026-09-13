"use client";

import React, { useEffect, useState } from "react";
import SidebarShell from "@/components/canvas/SidebarShell";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  type Variants,
} from "framer-motion";
import {
  TrendingUp,
  Clock,
  LayoutGrid,
  Star,
  ArrowRight,
  Award,
  Trophy,
  BarChart3,
  Microscope,
  Crown,
  ChevronDown,
  Sparkles,
} from "lucide-react";

/* =========================================================
   Animation Configuration
========================================================= */

const springTransition = {
  type: "spring" as const,
  stiffness: 380,
  damping: 24,
};

const pageVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================================================
   Analytics Page
========================================================= */

const Analytics = () => {
  return (
    <SidebarShell>
      <AnalyticsContent />
    </SidebarShell>
  );
};

/* =========================================================
   Analytics Content
========================================================= */

const AnalyticsContent = () => {
  const [activeRange, setActiveRange] = useState("This Month");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const ranges = ["This Week", "This Month", "This Quarter"];

  return (
    <div className="w-full flex-1 min-h-0 overflow-y-auto bg-[#F6F8FC] dark:bg-slate-950 selection:bg-blue-500/15 transition-colors duration-300">
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-14 space-y-6"
      >
        {/* =====================================================
            Header
        ====================================================== */}

        <motion.div
          variants={itemVariants}
          className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[26px] font-bold tracking-tight text-slate-900 dark:text-white">
                Analytics
              </h1>

              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  repeatDelay: 2,
                }}
                className="inline-flex text-amber-500"
              >
                <Sparkles className="w-4 h-4" />
              </motion.span>
            </div>

            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">
              Insights across your workspace — activity, tools, and
              contributions.
            </p>
          </div>

          {/* Timeframe Dropdown */}

          <div className="relative">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-2.5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl px-4 py-2 shadow-xs dark:shadow-black/20 text-[12.5px] font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <span>{activeRange}</span>

              <motion.span
                animate={{
                  rotate: isDropdownOpen ? 180 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 4,
                    scale: 0.96,
                  }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-1.5 w-36 bg-white dark:bg-slate-900 rounded-xl shadow-lg dark:shadow-black/30 border border-slate-100 dark:border-slate-800 p-1 z-30"
                >
                  {ranges.map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => {
                        setActiveRange(option);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                        activeRange === option
                          ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* =====================================================
            KPI Cards
        ====================================================== */}

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={TrendingUp}
            label="Total Activities"
            numericTarget={247}
            delta="↑ 18% vs last week"
            iconBg="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-blue-500/10"
          />

          <StatCard
            icon={Clock}
            label="Time Saved"
            numericTarget={32.6}
            suffix=" hrs"
            delta="↑ 25% vs last week"
            iconBg="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/10"
          />

          <StatCard
            icon={LayoutGrid}
            label="Tools Used"
            value="7/8"
            delta="87% of tools explored"
            iconBg="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-indigo-500/10"
          />

          <StatCard
            icon={Star}
            label="Marketplace Points"
            numericTarget={1240}
            delta="↑ 120 this month"
            iconBg="bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/10"
          />
        </div>

        {/* =====================================================
            Main Analytics Section
        ====================================================== */}

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Activity Overview */}

          <motion.div
            variants={itemVariants}
            className="w-full lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs dark:shadow-black/20 flex flex-col justify-between transition-colors duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-[16px] font-bold text-slate-900 dark:text-white tracking-tight">
                  Activity Overview
                </h3>

                <span className="text-[12px] text-slate-400 dark:text-slate-500 font-medium">
                  Weekly interaction and hours saved breakdown
                </span>
              </div>

              <div className="flex items-center gap-4 text-[12px]">
                <span className="flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1CD0BB]" />
                  Activities
                </span>

                <span className="flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                  Time Saved
                </span>
              </div>
            </div>

            <InteractiveActivityChart />
          </motion.div>

          {/* Contributions */}

          <motion.div
            variants={itemVariants}
            className="w-full lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs dark:shadow-black/20 flex flex-col justify-between transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[16px] font-bold text-slate-900 dark:text-white tracking-tight">
                Contributions
              </h3>

              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-[12px] text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                View Marketplace
              </motion.button>
            </div>

            <div className="flex flex-col items-center justify-center py-4">
              <AnimatedDonut />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <LegendItem
                color="bg-[#1CD0BB]"
                label="Published"
                value={7}
              />

              <LegendItem
                color="bg-[#F59E0B]"
                label="In Review"
                value={3}
              />

              <LegendItem
                color="bg-[#3B82F6]"
                label="Drafts"
                value={2}
              />
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            Secondary Widgets
        ====================================================== */}

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Summary */}

          <motion.div
            variants={itemVariants}
            className="w-full lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs dark:shadow-black/20 transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-[15px] font-bold text-slate-900 dark:text-white">
                  This Week Summary
                </h3>

                <p className="text-[11.5px] text-slate-400 dark:text-slate-500">
                  Jun 23 - Jun 29, 2026
                </p>
              </div>

              <motion.button
                type="button"
                whileHover={{ x: 2 }}
                className="text-[12px] text-blue-600 dark:text-blue-400 font-semibold inline-flex items-center gap-1 group"
              >
                View detailed analytics

                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2">
              <SummaryRow label="Total Activities" value="47" />
              <SummaryRow label="Time Saved" value="12.5 hrs" />
              <SummaryRow label="Tools Used" value="6/8" />
              <SummaryRow label="AI Chats" value="23" />
            </div>
          </motion.div>

          {/* Badges */}

          <motion.div
            variants={itemVariants}
            className="w-full lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs dark:shadow-black/20 transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-slate-900 dark:text-white">
                Your Badges
              </h3>

              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-[12px] text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                View all
              </motion.button>
            </div>

            <div className="w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-3 pt-2">
              <Badge
                icon={Award}
                label="Early Explorer"
                color="text-indigo-600 dark:text-indigo-400"
                bg="bg-indigo-50 dark:bg-indigo-500/10 ring-indigo-500/10"
              />

              <Badge
                icon={Trophy}
                label="AI Creator"
                color="text-emerald-600 dark:text-emerald-400"
                bg="bg-emerald-50 dark:bg-emerald-500/10 ring-emerald-500/10"
              />

              <Badge
                icon={BarChart3}
                label="Data Analyst"
                color="text-amber-600 dark:text-amber-400"
                bg="bg-amber-50 dark:bg-amber-500/10 ring-amber-500/10"
              />

              <Badge
                icon={Microscope}
                label="Researcher"
                color="text-sky-600 dark:text-sky-400"
                bg="bg-sky-50 dark:bg-sky-500/10 ring-sky-500/10"
              />

              <Badge
                icon={Crown}
                label="Top Contributor"
                color="text-rose-600 dark:text-rose-400"
                bg="bg-rose-50 dark:bg-rose-500/10 ring-rose-500/10"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

/* =========================================================
   Animated KPI Card
========================================================= */

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value?: string;
  numericTarget?: number;
  suffix?: string;
  delta: string;
  iconBg: string;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  numericTarget,
  suffix = "",
  delta,
  iconBg,
}: StatCardProps) => {
  const count = useMotionValue(0);

  const rounded = useTransform(count, (latest) => {
    if (numericTarget === undefined) {
      return "0";
    }

    if (Number.isInteger(numericTarget)) {
      return Math.round(latest).toLocaleString();
    }

    return latest.toFixed(1);
  });

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (numericTarget === undefined) {
      return;
    }

    const controls = animate(count, numericTarget, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    });

    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded, numericTarget]);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -4,
        transition: springTransition,
      }}
      className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs dark:shadow-black/20 hover:shadow-md dark:hover:shadow-black/30 transition-all duration-300 cursor-default"
    >
      <div className="flex items-center justify-between">
        <span className="text-[12.5px] font-medium text-slate-500 dark:text-slate-400">
          {label}
        </span>

        <motion.div
          whileHover={{
            rotate: 12,
            scale: 1.1,
          }}
          transition={springTransition}
          className={`w-9 h-9 rounded-xl flex items-center justify-center ring-1 ${iconBg}`}
        >
          <Icon className="w-4 h-4" />
        </motion.div>
      </div>

      <div className="mt-2.5">
        <div className="text-[25px] font-bold text-slate-900 dark:text-white tracking-tight">
          {numericTarget !== undefined
            ? `${displayValue}${suffix}`
            : value}
        </div>

        <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
          {delta}
        </p>
      </div>
    </motion.div>
  );
};

/* =========================================================
   Summary Row
========================================================= */

interface SummaryRowProps {
  label: string;
  value: string;
}

const SummaryRow = ({ label, value }: SummaryRowProps) => (
  <motion.div
    whileHover={{ x: 3 }}
    transition={{ duration: 0.15 }}
    className="w-full flex items-center justify-between py-2.5 text-[13px] group cursor-default"
  >
    <span className="text-slate-500 dark:text-slate-400 font-medium group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
      {label}
    </span>

    <span className="font-semibold text-slate-800 dark:text-slate-200">
      {value}
    </span>
  </motion.div>
);

/* =========================================================
   Interactive Activity Chart
========================================================= */

interface ActivityData {
  day: string;
  h1: number;
  h2: number;
  val1: string;
  val2: string;
}

const InteractiveActivityChart = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(2);

  const data: ActivityData[] = [
    {
      day: "Mon",
      h1: 42,
      h2: 30,
      val1: "18 acts",
      val2: "4.2 hrs",
    },
    {
      day: "Tue",
      h1: 72,
      h2: 60,
      val1: "34 acts",
      val2: "7.1 hrs",
    },
    {
      day: "Wed",
      h1: 96,
      h2: 74,
      val1: "48 acts",
      val2: "9.5 hrs",
    },
    {
      day: "Thu",
      h1: 64,
      h2: 82,
      val1: "29 acts",
      val2: "8.0 hrs",
    },
    {
      day: "Fri",
      h1: 86,
      h2: 44,
      val1: "41 acts",
      val2: "5.4 hrs",
    },
    {
      day: "Sat",
      h1: 34,
      h2: 48,
      val1: "12 acts",
      val2: "3.2 hrs",
    },
    {
      day: "Sun",
      h1: 52,
      h2: 66,
      val1: "22 acts",
      val2: "6.0 hrs",
    },
  ];

  return (
    <div className="w-full pt-6">
      <div className="h-44 flex items-end justify-between gap-1.5 sm:gap-3 px-1 sm:px-2 border-b border-slate-100 dark:border-slate-800 pb-2 relative">
        {data.map((item, idx) => {
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={item.day}
              onMouseEnter={() => setHoveredIdx(idx)}
              className="flex-1 flex flex-col items-center h-full justify-end relative cursor-pointer"
            >
              {/* Tooltip */}

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 6,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      y: -10,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 4,
                      scale: 0.9,
                    }}
                    transition={{ duration: 0.18 }}
                    className="absolute -top-10 z-20 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10.5px] font-semibold py-1.5 px-3 rounded-lg shadow-xl pointer-events-none flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span className="text-[#1CD0BB]">
                      {item.val1}
                    </span>

                    <span className="text-slate-500">•</span>

                    <span className="text-[#60A5FA]">
                      {item.val2}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bars */}

              <div className="flex items-end gap-1 sm:gap-1.5 h-full w-full justify-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: `${item.h1}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`w-2.5 sm:w-3.5 rounded-t-sm transition-all duration-200 ${
                    isHovered
                      ? "bg-[#1CD0BB] shadow-[0_0_12px_rgba(28,208,187,0.5)]"
                      : "bg-[#1CD0BB]/85 hover:bg-[#1CD0BB]"
                  }`}
                />

                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: `${item.h2}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.04 + 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`w-2.5 sm:w-3.5 rounded-t-sm transition-all duration-200 ${
                    isHovered
                      ? "bg-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                      : "bg-[#3B82F6]/85 hover:bg-[#3B82F6]"
                  }`}
                />
              </div>

              <span
                className={`text-[11.5px] font-medium mt-2 transition-colors ${
                  isHovered
                    ? "text-slate-900 dark:text-white font-bold"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* =========================================================
   Animated Donut
========================================================= */

const AnimatedDonut = () => {
  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg
        viewBox="0 0 36 36"
        className="w-full h-full -rotate-90"
      >
        {/* Background */}

        <circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke="currentColor"
          className="text-slate-100 dark:text-slate-800"
          strokeWidth="4"
        />

        {/* Published */}

        <motion.circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke="#1CD0BB"
          strokeWidth="4"
          strokeDasharray="58 100"
          initial={{
            strokeDashoffset: 100,
          }}
          animate={{
            strokeDashoffset: 0,
          }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* In Review */}

        <motion.circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="4"
          strokeDasharray="25 100"
          initial={{
            strokeDashoffset: 100,
          }}
          animate={{
            strokeDashoffset: -58,
          }}
          transition={{
            duration: 1.1,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Drafts */}

        <motion.circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="4"
          strokeDasharray="17 100"
          initial={{
            strokeDashoffset: 100,
          }}
          animate={{
            strokeDashoffset: -83,
          }}
          transition={{
            duration: 1.1,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.span
          initial={{
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 260,
          }}
          className="text-[24px] font-bold text-slate-800 dark:text-white leading-none"
        >
          12
        </motion.span>

        <span className="text-[9.5px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold mt-1">
          Total
        </span>
      </div>
    </div>
  );
};

/* =========================================================
   Legend Item
========================================================= */

interface LegendItemProps {
  color: string;
  label: string;
  value: number;
}

const LegendItem = ({
  color,
  label,
  value,
}: LegendItemProps) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="flex flex-col items-center"
  >
    <div className="flex items-center gap-1.5">
      <span
        className={`w-2 h-2 rounded-full ${color}`}
      />

      <span className="text-[11.5px] text-slate-500 dark:text-slate-400 font-medium">
        {label}
      </span>
    </div>

    <span className="text-[13.5px] font-bold text-slate-800 dark:text-slate-200 mt-0.5">
      {value}
    </span>
  </motion.div>
);

/* =========================================================
   Badge
========================================================= */

interface BadgeProps {
  icon: React.ElementType;
  label: string;
  color: string;
  bg: string;
}

const Badge = ({
  icon: Icon,
  label,
  color,
  bg,
}: BadgeProps) => (
  <div className="flex flex-col items-center text-center gap-1.5 group cursor-pointer">
    <motion.div
      whileHover={{
        scale: 1.12,
        rotate: 6,
      }}
      whileTap={{
        scale: 0.92,
      }}
      transition={springTransition}
      className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center ring-1 shadow-xs group-hover:shadow-md transition-shadow`}
    >
      <Icon className="w-5 h-5" />
    </motion.div>

    <span className="text-[10.5px] font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-tight">
      {label}
    </span>
  </div>
);

export default Analytics;