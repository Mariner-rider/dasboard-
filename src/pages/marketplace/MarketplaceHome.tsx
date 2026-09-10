"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Database,
  Brain,
  Bot,
  Wrench,
  TrendingUp,
  ArrowUpRight,
  ChevronRight,
  Cpu,
  Cloud,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import MarketplaceLayout from "@/components/marketplace/MarketplaceLayout";
import ItemCard from "@/components/marketplace/ItemCard";
import {
  CardGridSkeleton,
  CategoryTileSkeleton,
  ErrorState,
} from "@/components/marketplace/MarketplaceStates";
import { CATEGORIES } from "@/lib/marketplaceData";
import { useMarketplace } from "@/hooks/useMarketplace";

const CanvasModels = () => (
  <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
    <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent blur-2xl" />
    <div className="relative z-10 w-72 h-72 flex items-center justify-center">
      <div className="absolute bottom-6 w-60 h-28 rounded-2xl bg-gradient-to-tr from-indigo-200/40 via-sky-100/50 to-white/70 dark:from-indigo-950/40 dark:via-zinc-800/40 dark:to-zinc-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 shadow-lg transform -rotate-12 skew-x-12" />
      <div className="relative z-20 w-36 h-36 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 shadow-xl flex flex-col items-center justify-center transform -rotate-6">
        <div className="w-14 h-14 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md">
          <Brain className="w-8 h-8 text-white animate-pulse" />
        </div>
        <div className="w-full mt-3 space-y-1.5 px-2">
          <div className="h-1.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full" />
          <div className="h-1.5 w-3/4 bg-indigo-500 rounded-full" />
        </div>
      </div>
      <div className="absolute top-6 -left-2 z-30 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-md flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-zinc-100">
        <span className="w-2 h-2 rounded-full bg-indigo-500" />
        LLaMA-3 70B
      </div>
      <div className="absolute bottom-10 right-0 z-30 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-md flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-zinc-100">
        <Cpu className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
        DeepSeek v3
      </div>
    </div>
  </div>
);

const CanvasDatasets = () => (
  <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
    <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent blur-2xl" />
    <div className="relative z-10 w-72 h-72 flex items-center justify-center">
      <div className="absolute bottom-6 w-60 h-28 rounded-2xl bg-gradient-to-tr from-indigo-200/40 via-sky-100/50 to-white/70 dark:from-indigo-950/40 dark:via-zinc-800/40 dark:to-zinc-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 shadow-lg transform -rotate-12 skew-x-12" />
      <div className="relative z-20 w-44 h-36 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 shadow-xl flex flex-col justify-between transform -rotate-6">
        <div className="flex items-center justify-between">
          <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            Parquet / Vector
          </span>
        </div>
        <div className="flex items-end gap-2 h-16 bg-slate-50 dark:bg-zinc-800/60 rounded-lg p-2 border border-slate-100 dark:border-zinc-800">
          <div className="w-1/4 h-8 bg-indigo-300 dark:bg-indigo-900/60 rounded" />
          <div className="w-1/4 h-14 bg-indigo-500 rounded" />
          <div className="w-1/4 h-10 bg-indigo-400 dark:bg-indigo-700 rounded" />
          <div className="w-1/4 h-16 bg-indigo-600 rounded" />
        </div>
      </div>
      <div className="absolute top-4 right-2 z-30 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-md text-xs font-semibold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        2.4B Tokens Cleaned
      </div>
    </div>
  </div>
);

const CanvasBuild = () => (
  <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
    <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent blur-2xl" />
    <div className="relative z-10 w-72 h-72 flex items-center justify-center">
      <div className="absolute bottom-6 w-60 h-28 rounded-2xl bg-gradient-to-tr from-indigo-200/40 via-sky-100/50 to-white/70 dark:from-indigo-950/40 dark:via-zinc-800/40 dark:to-zinc-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 shadow-lg transform -rotate-12 skew-x-12" />
      <div className="relative z-20 w-44 h-40 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 shadow-xl flex flex-col justify-between">
        <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
          <Wrench className="w-4 h-4" />
        </div>
        <div className="space-y-1 font-mono text-[10px] text-slate-500 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-800/60 p-2.5 rounded-lg border border-slate-100 dark:border-zinc-800">
          <p className="text-indigo-600 dark:text-indigo-400 font-medium">
            $ npx rivinity@latest
          </p>
          <p className="text-slate-400 dark:text-zinc-500">
            ✓ Connected: Cluster-09
          </p>
        </div>
      </div>
      <div className="absolute bottom-6 -left-2 z-30 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-md text-xs font-semibold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
        <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
        Zero-Setup SDK
      </div>
    </div>
  </div>
);

const CanvasMarket = () => (
  <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
    <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent blur-2xl" />
    <div className="relative z-10 w-72 h-72 flex items-center justify-center">
      <div className="absolute bottom-6 w-60 h-28 rounded-2xl bg-gradient-to-tr from-indigo-200/40 via-sky-100/50 to-white/70 dark:from-indigo-950/40 dark:via-zinc-800/40 dark:to-zinc-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 shadow-lg transform -rotate-12 skew-x-12" />
      <div className="relative z-20 w-40 h-40 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 shadow-xl flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md">
          <Layers className="w-7 h-7 text-white" />
        </div>
        <span className="mt-3 text-xs font-semibold text-slate-900 dark:text-zinc-100">
          Peer-to-Peer
        </span>
        <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
          Smart Contracts
        </span>
      </div>
      <div className="absolute -top-2 right-4 z-30 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-md text-xs font-semibold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        Verifiable Escrow
      </div>
    </div>
  </div>
);

const HERO_SLIDES = [
  {
    id: 0,
    title: "Explore the AI Marketplace",
    subtitle: "Buy and sell AI datasets, models, and autonomous agents peer-to-peer.",
    headline: "Explore Verified AI Artifacts",
    subheadline: "Direct peer-to-peer licensing with cryptographic origin verification.",
    bannerBackground: "from-slate-50 via-white to-white",
    link: "/marketplace/c/datasets",
    icon: Layers,
    Canvas: CanvasMarket,
    badge: "Open Protocol",
  },
  {
    id: 1,
    title: "Featured Models",
    subtitle: "High-throughput LLM APIs and distilled task-specific open weights.",
    headline: "Featured Models & Foundation Weights",
    subheadline: "Production checkpoints engineered for lower latency and scalable inference.",
    bannerBackground: "from-slate-50 via-white to-white",
    link: "/marketplace/c/models",
    icon: Brain,
    Canvas: CanvasModels,
    badge: "Foundation Weights",
  },
  {
    id: 2,
    title: "Featured Datasets",
    subtitle: "Fueling model finetunes with decentralized, verifiable data streams.",
    headline: "Curated Datasets for AI Alignment",
    subheadline: "Cleaned synthetic data streams, multimodal collections, and RLHF pairs.",
    bannerBackground: "from-slate-50 via-white to-white",
    link: "/marketplace/c/datasets",
    icon: Database,
    Canvas: CanvasDatasets,
    badge: "Verified Streams",
  },
  {
    id: 3,
    title: "Build with Rivinity",
    subtitle: "End-to-end toolsets, vector bridges, and cognitive orchestrators.",
    headline: "Build with Autonomous Infrastructure",
    subheadline: "Ship multi-agent cognitive swarms and low-overhead pipelines in minutes.",
    bannerBackground: "from-slate-50 via-white to-white",
    link: "/marketplace/upload",
    icon: Wrench,
    Canvas: CanvasBuild,
    badge: "Developer Engine",
  },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 350, damping: 30 },
      opacity: { duration: 0.25 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 350, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

const categoryIcons = {
  dataset: Database,
  model: Brain,
  agent: Bot,
  tool: Wrench,
  service: Cpu,
  cloud: Cloud,
};

const categoryAccents: Record<
  string,
  { badge: string; iconBg: string; hoverBorder: string; image: string }
> = {
  dataset: {
    badge: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700",
    iconBg: "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300",
    hoverBorder: "hover:border-indigo-500/40 dark:hover:border-indigo-500/40",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80",
  },
  model: {
    badge: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700",
    iconBg: "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300",
    hoverBorder: "hover:border-indigo-500/40 dark:hover:border-indigo-500/40",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=700&q=80",
  },
  agent: {
    badge: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700",
    iconBg: "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300",
    hoverBorder: "hover:border-indigo-500/40 dark:hover:border-indigo-500/40",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80",
  },
  tool: {
    badge: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700",
    iconBg: "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300",
    hoverBorder: "hover:border-indigo-500/40 dark:hover:border-indigo-500/40",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=700&q=80",
  },
  service: {
    badge: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700",
    iconBg: "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300",
    hoverBorder: "hover:border-indigo-500/40 dark:hover:border-indigo-500/40",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=700&q=80",
  },
  cloud: {
    badge: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700",
    iconBg: "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300",
    hoverBorder: "hover:border-indigo-500/40 dark:hover:border-indigo-500/40",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80",
  },
};

const FOUR_FEATURED_CATEGORIES = CATEGORIES.slice(0, 4);

export default function MarketplaceHome() {
  const { items, loading, error, refetch } = useMarketplace();

  const [[currentSlide, direction], setSlide] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide(([prev]) => [(prev + 1) % HERO_SLIDES.length, 1]);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const selectSlide = (index: number) => {
    const dir = index > currentSlide ? 1 : -1;
    setSlide([index, dir]);
  };

  const active = HERO_SLIDES[currentSlide];
  const CurrentCanvas = active.Canvas;

  const trending = [...items]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 4);

  const itemsByType = (t: (typeof CATEGORIES)[number]["type"]) =>
    items.filter((i) => i.type === t).slice(0, 4);

  return (
    <MarketplaceLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 bg-[#fafafa] dark:bg-[#0a0a0a] text-[#0f172a] dark:text-[#f8fafc] font-sans antialiased min-h-screen">
        <div className="w-full max-w-[1280px] mx-auto space-y-12">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 relative overflow-hidden rounded-xl bg-white dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800 shadow-sm min-h-[440px] flex items-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={active.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`absolute inset-0 bg-gradient-to-br ${active.bannerBackground} dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 p-6 sm:p-10 flex flex-col justify-between overflow-hidden`}
                >
                  <div
                    className="absolute inset-0 opacity-[0.25] dark:opacity-[0.08] pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />

                  <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 flex items-center justify-center">
                    <CurrentCanvas />
                  </div>

                  <div className="relative z-10 max-w-md my-auto">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm text-xs font-medium text-slate-700 dark:text-zinc-300 mb-6">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      {active.badge}
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                      {active.headline}
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-3 leading-relaxed">
                      {active.subheadline}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <Link
                        to={active.link}
                        className="h-9 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                      >
                        Browse {active.badge} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        to="/marketplace/upload"
                        className="h-9 px-4 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-medium shadow-sm transition-colors cursor-pointer"
                      >
                        Publish
                      </Link>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center gap-2 pt-4">
                    {HERO_SLIDES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectSlide(i)}
                        aria-label={`Slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                          currentSlide === i
                            ? "w-6 bg-slate-900 dark:bg-white"
                            : "w-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-between">
              {HERO_SLIDES.map((slide, idx) => {
                const Icon = slide.icon;
                const isActive = currentSlide === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => selectSlide(idx)}
                    onMouseEnter={() => selectSlide(idx)}
                    className="cursor-pointer flex-1"
                  >
                    <div
                      className={`relative h-full flex items-center gap-3.5 p-4 rounded-xl border transition-all duration-150 select-none ${
                        isActive
                          ? "bg-white dark:bg-zinc-900/90 border-slate-300 dark:border-zinc-700 shadow-sm"
                          : "bg-white/70 dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 hover:border-slate-300 dark:hover:border-zinc-700"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeSlideIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 dark:bg-indigo-400 rounded-r"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}

                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                          isActive
                            ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/60"
                            : "bg-slate-50 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-700"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`text-xs font-semibold transition-colors ${
                              isActive
                                ? "text-slate-900 dark:text-white"
                                : "text-slate-700 dark:text-zinc-300"
                            }`}
                          >
                            {slide.title}
                          </h3>

                          <ArrowUpRight
                            className={`w-3.5 h-3.5 transition-transform ${
                              isActive
                                ? "text-slate-900 dark:text-white translate-x-0.5 -translate-y-0.5"
                                : "text-slate-400 dark:text-zinc-500"
                            }`}
                          />
                        </div>

                        <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-normal mt-0.5 line-clamp-1">
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : (
            <>
              <section className="space-y-4">
                <SectionHeader
                  title="Browse by Infrastructure Layer"
                  subtitle="Select an architectural block to filter verified community artifacts."
                />

                <div className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading
                      ? Array.from({ length: 4 }).map((_, i) => (
                          <CategoryTileSkeleton key={i} />
                        ))
                      : FOUR_FEATURED_CATEGORIES.map((c, idx) => {
                          const Icon =
                            categoryIcons[
                              c.type as keyof typeof categoryIcons
                            ] || Layers;

                          const accent = categoryAccents[c.type] || {
                            badge: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700",
                            iconBg: "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300",
                            hoverBorder: "hover:border-slate-300 dark:hover:border-zinc-700",
                            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80",
                          };

                          const count = items.filter((i) => i.type === c.type).length;

                          return (
                            <motion.div
                              key={c.slug}
                              initial={{ opacity: 0, y: 12 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.3,
                                delay: idx * 0.05,
                                ease: "easeOut",
                              }}
                              whileHover={{ y: -2 }}
                              className="h-full"
                            >
                              <Link
                                to={`/marketplace/c/${c.slug}`}
                                className={`group flex flex-col justify-between h-full rounded-xl bg-white dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800 shadow-sm transition-all overflow-hidden hover:border-slate-300 dark:hover:border-zinc-700 ${accent.hoverBorder}`}
                              >
                                <div className="relative w-full h-36 overflow-hidden bg-slate-100 dark:bg-zinc-800 shrink-0">
                                  <img
                                    src={accent.image}
                                    alt={c.label}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                                    <div
                                      className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm backdrop-blur-md ${accent.iconBg}`}
                                    >
                                      <Icon className="w-4 h-4" />
                                    </div>

                                    <span
                                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border shadow-xs backdrop-blur-md ${accent.badge}`}
                                    >
                                      {count} Assets
                                    </span>
                                  </div>
                                </div>

                                <div className="p-5 flex flex-col justify-between flex-1">
                                  <div>
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                      {c.label}
                                    </h3>

                                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
                                      {c.blurb}
                                    </p>
                                  </div>

                                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-zinc-100">
                                    <span>Open Category</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          );
                        })}
                  </div>
                </div>
              </section>

              <Row
                icon={<TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                title="Trending Assets This Week"
                subtitle="The most downloaded datasets and models across the ecosystem."
                link="/marketplace/c/datasets"
                items={trending}
                loading={loading}
              />

              {CATEGORIES.map((c) => (
                <Row
                  key={c.slug}
                  title={c.label}
                  subtitle={c.blurb}
                  link={`/marketplace/c/${c.slug}`}
                  items={itemsByType(c.type)}
                  loading={loading}
                />
              ))}
            </>
          )}

          <footer className="pt-8 pb-4 border-t border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              All systems operational. Rivinity Protocol Layer.
            </div>
            <p>© 2026 Rivinity Intelligence. Powered by builders globally.</p>
          </footer>
        </div>
      </div>
    </MarketplaceLayout>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-1">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs text-slate-500 dark:text-zinc-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Row({
  title,
  subtitle,
  icon,
  link,
  items,
  loading,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  link: string;
  items: ReturnType<typeof useMarketplace>["items"];
  loading?: boolean;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            {icon}
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <Link
          to={link}
          className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <CardGridSkeleton
          count={4}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        />
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-10 text-center flex flex-col items-center justify-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-400 dark:text-zinc-500">
            <Layers className="w-4 h-4" />
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
            No listings available yet in this category. Check back shortly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, idx) => (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.25,
                delay: idx * 0.04,
                ease: "easeOut",
              }}
              whileHover={{ y: -2 }}
              className="h-full"
            >
              <ItemCard item={it} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}