import { useState } from "react";
import SidebarShell from "@/components/canvas/SidebarShell";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Search,
  Image as ImageIcon,
  FileText,
  BarChart3,
  MessageSquare,
  Globe,
  Layout,
  Database,
  AudioWaveform,
  GraduationCap,
  Plus,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  MoreHorizontal,
  Film,
  Flame,
  Play,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  CATEGORIES,
  SHOWCASE_CARDS,
  FEATURED_MODELS,
  APP_GRID,
  RECENT_ACTIVITY,
  type Category,
} from "@/components/dashboard/dashboardData";

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 28,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const galleryVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.2 } },
};

const Dashboard = () => {
  return (
    <SidebarShell>
      <DashboardContent />
    </SidebarShell>
  );
};

const DashboardContent = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>("Marketing campaigns");
  const [promptInput, setPromptInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const filteredShowcaseCards = SHOWCASE_CARDS.filter(
    (card) => card.category === activeCategory
  );

  return (
    /* 
      FIX: Added "h-screen max-h-screen" to lock the container height to the viewport.
      This enables "overflow-y-auto" to scroll all cards and sections without getting cut in half.
    */
    <div className="w-full h-screen max-h-screen flex-1 min-h-0 overflow-y-auto bg-background text-foreground selection:bg-primary/20 antialiased">
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-12 sm:space-y-16 pb-24"
      >
        {/* HERO / PROMPT BAR */}
        <motion.section variants={itemVariants} className="w-full max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4 sm:mb-6 leading-tight">
            What will you craft today?
          </h1>

          <div
            className={`relative rounded-2xl sm:rounded-3xl surface-interactive transition-all duration-300 ${
              isInputFocused ? "ring-2 ring-primary/30 shadow-float" : ""
            }`}
          >
            <div className="p-3.5 sm:p-5">
              <textarea
                rows={2}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder="Start with an idea. Type @ for assets or / for agent actions..."
                className="w-full resize-none bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm md:text-[15px] leading-relaxed"
              />

              <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="press flex items-center gap-1.5 px-3 py-1.5 rounded-xl surface-interactive-hover text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Reference</span>
                  </button>

                  <span className="hidden md:inline-flex items-center gap-1 text-xs text-muted-foreground font-medium px-2 py-0.5 rounded-md surface-interactive">
                    <Flame className="w-3 h-3 text-amber-500" />
                    Ultra 4K Quality
                  </span>
                </div>

                <button
                  type="button"
                  className="press w-9 h-9 sm:w-10 sm:h-10 rounded-xl gradient-accent text-white flex items-center justify-center shadow-float"
                >
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4">
            {[
              { label: "Deep Research", icon: Search },
              { label: "Create Image", icon: ImageIcon },
              { label: "Summarize", icon: FileText },
              { label: "Analyze Data", icon: BarChart3 },
              { label: "Timeline Mode", icon: Film },
            ].map((chip) => {
              const Icon = chip.icon;
              return (
                <button
                  type="button"
                  key={chip.label}
                  className="press surface-interactive-hover px-3 py-1.5 rounded-xl text-xs font-medium text-foreground/80 flex items-center gap-1.5"
                >
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                  {chip.label}
                </button>
              );
            })}
          </div>
        </motion.section>

        {/* QUICK ACCESS TOOLS */}
        <motion.section variants={itemVariants} className="w-full space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground flex items-center gap-2">
              <span>Quick Access Tools</span>
            </h2>
            <button type="button" className="press text-xs font-semibold text-primary flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" />
              Customize
            </button>
          </div>

          <div className="w-full grid grid-cols-2 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2.5 sm:gap-3">
            <QuickTool icon={MessageSquare} label="AI Chat" color="text-emerald-500" onClick={() => navigate("/app")} />
            <QuickTool icon={Globe} label="Web Search" color="text-sky-500" />
            <QuickTool icon={Layout} label="App Builder" color="text-indigo-500" onClick={() => navigate("/app-builder")} />
            <QuickTool icon={Database} label="Database" color="text-pink-500" />
            <QuickTool icon={AudioWaveform} label="Audio Lab" color="text-purple-500" onClick={() => navigate("/audio-lab")} />
            <QuickTool icon={GraduationCap} label="RivinityLM" color="text-amber-500" onClick={() => navigate("/rivinity-lm")} />
            <QuickTool icon={ImageIcon} label="Image Enhancer" color="text-rose-500" onClick={() => navigate("/image-enhancer")} />
            <QuickTool icon={Plus} label="Add Tool" color="text-muted-foreground" muted />
          </div>
        </motion.section>

        {/* SHOWCASE GALLERY */}
        <motion.section variants={itemVariants} className="w-full space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 -mb-px">
              {CATEGORIES.map((tab) => {
                const isActive = activeCategory === tab;
                return (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => setActiveCategory(tab)}
                    className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary rounded-full"
                        transition={springTransition}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <span className="hidden sm:block text-xs text-muted-foreground pb-2">
              Showing {filteredShowcaseCards.length} templates
            </span>
          </div>

          <div className="w-full min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={galleryVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4"
              >
                {filteredShowcaseCards.map((card) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ y: -6, transition: springTransition }}
                    className="group relative rounded-2xl overflow-hidden surface-interactive-hover aspect-[3/4] cursor-pointer"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                    <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3">
                      <span className="px-2 py-0.5 rounded-md glass border border-glass text-white text-[10px] font-semibold">
                        {card.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 sm:left-3 right-2.5 sm:right-3 text-white">
                      <h4 className="text-xs sm:text-sm font-bold leading-snug line-clamp-2">
                        {card.title}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-white/80 mt-1 font-medium group-hover:translate-x-1 transition-transform">
                        <span>Generate</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        {/* FEATURED MODELS */}
        <motion.section variants={itemVariants} className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                Foundational Models
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Explore production engines ready for zero-shot deployment
              </p>
            </div>
            <button type="button" className="press text-xs font-semibold text-primary flex items-center gap-1">
              Explore catalog <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {FEATURED_MODELS.map((model) => (
              <motion.div
                key={model.title}
                whileHover={{ y: -5, transition: springTransition }}
                className="surface-interactive-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-md surface-interactive text-[10.5px] font-bold uppercase">
                      {model.badge}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {model.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {model.description}
                  </p>
                </div>
                <div className="relative mt-4 rounded-2xl overflow-hidden aspect-[16/10] bg-muted">
                  <img
                    src={model.image}
                    alt={model.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <button type="button" className="cta-pill text-xs flex items-center gap-1.5">
                      <Play className="w-3 h-3 fill-current" />
                      {model.actionText}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CREATIVE SUITE */}
        <motion.section variants={itemVariants} className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                Creative Suite & Apps
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Specialized studio tools engineered for precision generative workflows
              </p>
            </div>
            <button type="button" className="press text-xs font-semibold text-primary flex items-center gap-1">
              View all apps <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {APP_GRID.map((app) => {
              const Icon = app.icon;
              return (
                <motion.div
                  key={app.title}
                  whileHover={{ y: -4, transition: springTransition }}
                  className="surface-interactive-hover p-5 rounded-2xl sm:rounded-3xl flex flex-col justify-between group"
                >
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white shadow-xs shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                        {app.title}
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                        {app.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium">Studio Engine</span>
                    <span className="flex items-center gap-1 text-primary font-semibold">
                      Launch <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* RECENT ACTIVITY */}
        <motion.section variants={itemVariants} className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                Recent Activity
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Pick up right where you left off across sessions
              </p>
            </div>
            <button type="button" className="press text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1">
              View history <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-full surface-interactive rounded-2xl sm:rounded-3xl divide-y border-border/40 overflow-hidden">
            {RECENT_ACTIVITY.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-muted/40 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-9 h-9 rounded-xl ${item.bgLight} ${item.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {item.title}
                        </h4>
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded-md surface-interactive text-[10.5px] font-medium shrink-0">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-muted-foreground font-medium">
                      {item.time}
                    </span>
                    <button
                      type="button"
                      aria-label="More options"
                      className="press w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground surface-interactive-hover"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
};

type QuickToolProps = {
  icon: LucideIcon;
  label: string;
  color: string;
  muted?: boolean;
  onClick?: () => void;
};

const QuickTool = ({ icon: Icon, label, color, muted = false, onClick }: QuickToolProps) => {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`w-full group flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl border transition-all ${
        muted
          ? "surface-interactive border-dashed"
          : "surface-interactive-hover shadow-xs"
      }`}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center surface-interactive mb-2">
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <span className="text-[11px] sm:text-xs font-semibold text-center truncate max-w-full text-foreground/85">
        {label}
      </span>
    </motion.button>
  );
};

export default Dashboard;