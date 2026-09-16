import React, { useId, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";
import SidebarShell from "@/components/canvas/SidebarShell";
import {
  Wallet,
  TrendingUp,
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  Crown,
  Rocket,
  Download,
  Calendar,
  Bell,
  X,
  FileText,
  Search,
  Building2,
  ShieldCheck,
  RefreshCcw,
  type LucideIcon,
} from "lucide-react";
import {
  cashflowHistory,
  plans,
  initialTransactions,
  type Transaction,
  type Plan,
} from "@/components/earnings/earningsData";

const springBounce: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

const springSmooth: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};

const smoothEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: smoothEase },
  },
};

const Earnings = () => {
  return (
    <SidebarShell>
      <EarningsContent />
    </SidebarShell>
  );
};

const EarningsContent = () => {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "in" | "out">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState<"form" | "confirm" | "done">("form");

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = searchQuery.toLowerCase().trim();
    return initialTransactions.filter((tx) => {
      const matchesSearch =
        tx.source.toLowerCase().includes(normalizedSearch) ||
        tx.id.toLowerCase().includes(normalizedSearch);

      if (!matchesSearch) return false;
      if (activeTab === "in") return tx.type === "in";
      if (activeTab === "out") return tx.type === "out";
      return true;
    });
  }, [searchQuery, activeTab]);

  const closeWithdrawModal = () => {
    setIsWithdrawOpen(false);
    setWithdrawStep("form");
  };

  return (
    <div className="w-full flex-1 min-h-screen overflow-y-auto bg-background text-foreground selection:bg-primary/20 antialiased">
      {/* HEADER BAR */}
      <header className="sticky top-0 z-20 w-full flex items-center justify-between border-b border-border/60 bg-background/80 px-4 sm:px-6 lg:px-8 py-3.5 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-sm" />
          </span>
          Payout Gateway:
          <strong className="font-semibold text-foreground">Active (Stripe Connect)</strong>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="press relative flex h-9 w-9 items-center justify-center rounded-xl surface-interactive text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-background" />
          </motion.button>

          <div className="h-4 w-px bg-border" />

          <div className="flex items-center gap-2.5 pl-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-accent text-[11px] font-bold text-white shadow-sm ring-2 ring-primary/20">
              AC
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold leading-tight text-foreground">Abhay C.</p>
              <p className="text-[10px] font-medium text-muted-foreground">Pro Developer</p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">
        {/* TITLE & ACTIONS */}
        <div className="w-full flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground flex items-center gap-2.5">
              Financial Overview
              <span className="rounded-md border border-border/60 surface-interactive px-2 py-0.5 font-mono text-[11px] font-medium text-primary">
                v2.6.4
              </span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Real-time settlement history, resource credits pool, and automated disbursement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="press flex h-8 items-center gap-2 rounded-lg surface-interactive-hover px-3 text-xs font-medium text-foreground"
            >
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              Trailing 30 Days
            </motion.button>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="press flex h-8 items-center gap-2 rounded-lg surface-interactive-hover px-3 text-xs font-medium text-foreground"
            >
              <Download className="h-3.5 w-3.5 text-muted-foreground" />
              Tax Statement (.CSV)
            </motion.button>
          </div>
        </div>

        {/* KPI CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <SpotlightKPICard icon={Wallet} label="Withdrawable Balance" value="$284.50" subtext="Ready for instant transfer" delta="+$80.50 vs last month" deltaUp />
          <SpotlightKPICard icon={TrendingUp} label="Total Gross Inflow" value="$1,847.20" subtext="Net fee-deducted" delta="+14.8% YoY" deltaUp />
          <SpotlightKPICard icon={DollarSign} label="Incentive Pools" value="$62.80" subtext="Calculated every 24h" delta="+3.2% this cycle" deltaUp />
          <SpotlightKPICard icon={Eye} label="App Marketplace Traffic" value="12,490" subtext="Impression to install: 4.8%" delta="+1,210" deltaUp />
        </motion.div>

        {/* CASHFLOW + RESOURCE METER */}
        <div className="w-full grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* CASH FLOW */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col justify-between rounded-2xl surface-interactive p-5 sm:p-6 shadow-float lg:col-span-7"
          >
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold text-foreground">Cash Flow Velocity</h3>
                <p className="text-xs text-muted-foreground">Net revenue growth over the billing cycle</p>
              </div>

              <div className="flex items-center gap-1 rounded-lg surface-interactive p-1 text-[11px] font-medium text-muted-foreground w-fit">
                <button type="button" className="press rounded bg-background px-2 py-0.5 font-semibold text-foreground shadow-xs">7D</button>
                <button type="button" className="press px-2 py-0.5 transition-colors hover:text-foreground">30D</button>
                <button type="button" className="press px-2 py-0.5 transition-colors hover:text-foreground">90D</button>
              </div>
            </div>

            <div className="flex h-44 w-full items-end pt-4">
              <InteractiveAreaChart data={cashflowHistory} />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Aggregated daily volume
              </span>
              <span className="font-mono font-medium text-foreground">Peak Velocity: $284.00 (Jun 28)</span>
            </div>
          </motion.div>

          {/* RESOURCE METER */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full relative flex flex-col justify-between overflow-hidden rounded-2xl surface-interactive p-5 sm:p-6 shadow-float lg:col-span-5"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                    <Crown className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-foreground">Current Tier: Pro</span>
                    <span className="text-xs text-muted-foreground">Renews on Jul 28, 2026</span>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Auto-Renew Active
                </span>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-muted-foreground">Monthly AI Compute Credits</span>
                  <span className="font-mono font-semibold text-foreground">312 / 500 Used (62.4%)</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "62.4%" }}
                    transition={{ duration: 0.9, ease: smoothEase }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                <p className="pt-1 text-xs text-muted-foreground">
                  188 credits remaining. Unused credits rollover automatically to the next cycle.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-border/40 pt-6">
              <button
                type="button"
                onClick={() => setIsWithdrawOpen(true)}
                className="cta-pill flex-1 min-w-[140px] text-xs justify-center"
              >
                <Rocket className="h-3.5 w-3.5 mr-1" />
                Disburse Payout
              </button>
              <button
                type="button"
                className="press h-9 rounded-xl surface-interactive-hover px-4 text-xs font-semibold text-foreground"
              >
                Modify Quota
              </button>
            </div>
          </motion.div>
        </div>

        {/* PRICING MATRIX */}
        <section className="w-full space-y-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Tier Specifications</h2>
              <p className="text-xs text-muted-foreground">Scale compute capacity without contract locks.</p>
            </div>

            <div className="flex items-center rounded-xl surface-interactive p-1 w-fit">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`relative rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                  !isAnnual ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {!isAnnual && (
                  <motion.div
                    layoutId="billingCycleToggle"
                    className="absolute inset-0 rounded-lg surface-interactive shadow-xs"
                    transition={springBounce}
                  />
                )}
                <span className="relative z-10">Monthly Billing</span>
              </button>

              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                  isAnnual ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isAnnual && (
                  <motion.div
                    layoutId="billingCycleToggle"
                    className="absolute inset-0 rounded-lg surface-interactive shadow-xs"
                    transition={springBounce}
                  />
                )}
                <span className="relative z-10">Yearly</span>
                <span className="relative z-10 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} isAnnual={isAnnual} />
            ))}
          </motion.div>
        </section>

        {/* LEDGER */}
        <section className="w-full grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
          <div className="w-full rounded-2xl surface-interactive p-5 shadow-float lg:col-span-2">
            <div className="flex flex-col justify-between gap-3 border-b border-border/40 pb-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-foreground">Settlement Ledger</span>
                <span className="rounded-full surface-interactive px-2 py-0.5 font-mono text-xs font-medium text-muted-foreground">
                  {filteredTransactions.length} records
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search by ID or description..."
                    className="h-8 w-44 sm:w-56 rounded-lg border border-input bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>

                <div className="flex items-center rounded-lg surface-interactive p-0.5 text-xs">
                  {(["all", "in", "out"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`rounded px-2 py-1 capitalize transition-all ${
                        activeTab === tab
                          ? "bg-background font-semibold text-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab === "all" ? "All" : tab === "in" ? "Inflow" : "Outflow"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-1 divide-y divide-border/40">
              {filteredTransactions.length === 0 ? (
                <div className="py-12 text-center text-xs text-muted-foreground">No matching transactions located.</div>
              ) : (
                filteredTransactions.map((tx) => {
                  const isSelected = selectedTx?.id === tx.id;
                  return (
                    <motion.div
                      key={tx.id}
                      onClick={() => setSelectedTx(isSelected ? null : tx)}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.15 }}
                      className={`mt-1 flex cursor-pointer items-center gap-3.5 rounded-xl border px-3 py-3 transition-all ${
                        isSelected
                          ? "border-primary/40 bg-primary/5"
                          : "border-transparent hover:bg-muted/40"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                          tx.type === "in"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {tx.type === "in" ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-foreground">{tx.source}</p>
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
                          <span className="font-mono">{tx.id}</span>
                          <span>•</span>
                          <span>{tx.date} at {tx.time}</span>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className={`font-mono text-xs font-bold ${tx.type === "in" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                          {tx.type === "in" ? "+" : "-"}${tx.amount.toFixed(2)}
                        </p>
                        <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          tx.status === "Settled"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : tx.status === "Processing"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "surface-interactive text-muted-foreground"
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>

          {/* AUDIT PANEL */}
          <div className="w-full sticky top-20 lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedTx ? (
                <motion.div
                  key="audit-detail"
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  transition={springSmooth}
                  className="w-full rounded-2xl surface-interactive p-5 shadow-float"
                >
                  <div className="flex items-center justify-between border-b border-border/40 pb-3">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                      <FileText className="h-3.5 w-3.5" /> Audited Receipt
                    </span>
                    <button type="button" onClick={() => setSelectedTx(null)} className="press rounded-md p-1 text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="my-5 text-center">
                    <span className={`font-mono text-3xl font-bold tracking-tight ${selectedTx.type === "in" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                      {selectedTx.type === "in" ? "+" : "-"}${selectedTx.amount.toFixed(2)}
                    </span>
                    <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                      Verified on settlement ledger
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-border/40 pt-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reference Hash</span>
                      <span className="rounded surface-interactive px-1.5 py-0.5 font-mono">{selectedTx.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Event Type</span>
                      <span className="font-semibold capitalize text-foreground">{selectedTx.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform Retainer</span>
                      <span className="font-mono font-semibold text-foreground">${selectedTx.fee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timestamp</span>
                      <span className="font-mono text-muted-foreground">{selectedTx.date} · {selectedTx.time}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2 border-t border-border/40 pt-4">
                    <button type="button" className="press flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg surface-interactive-hover text-xs font-semibold">
                      <Download className="h-3.5 w-3.5" /> PDF Proof
                    </button>
                    <button type="button" onClick={() => setSelectedTx(null)} className="press h-8 flex-1 rounded-lg bg-primary text-xs font-semibold text-primary-foreground shadow-xs">
                      Dismiss
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="w-full space-y-4">
                  <div className="w-full rounded-2xl surface-interactive p-5 shadow-float">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-xs font-semibold text-foreground">Disbursement Route</h3>
                      <button type="button" className="press text-xs font-semibold text-primary hover:underline">Change</button>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl surface-interactive p-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-foreground">Chase Bank Checking</p>
                        <p className="font-mono text-xs text-muted-foreground">•••• 4421 · Default ACH</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full rounded-2xl surface-interactive p-5 shadow-float">
                    <h3 className="text-xs font-semibold text-foreground">Quick Disbursement</h3>
                    <p className="mb-4 mt-1 text-xs text-muted-foreground">Transfers initiated now arrive within 30 minutes via RTP/FedNow.</p>
                    <button
                      type="button"
                      onClick={() => setIsWithdrawOpen(true)}
                      className="cta-pill w-full justify-center text-xs"
                    >
                      <Rocket className="h-3.5 w-3.5 mr-1" /> Withdraw $284.50
                    </button>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* WITHDRAWAL MODAL */}
      <AnimatePresence>
        {isWithdrawOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeWithdrawModal();
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={springSmooth}
              className="w-full max-w-md space-y-4 rounded-2xl surface-interactive p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <h3 className="text-sm font-semibold text-foreground">Disburse Payout</h3>
                <button type="button" onClick={closeWithdrawModal} className="press rounded p-1 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {withdrawStep === "form" && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="mb-1 block font-medium text-muted-foreground">Amount (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-semibold text-muted-foreground">$</span>
                      <input
                        type="number"
                        defaultValue="284.50"
                        min="0"
                        max="284.50"
                        step="0.01"
                        className="h-10 w-full rounded-xl border border-input bg-background pl-7 pr-3 font-mono font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                    <span className="mt-1 block text-xs text-muted-foreground">Max available: $284.50 (No withdrawal fee)</span>
                  </div>

                  <div className="space-y-1.5 rounded-xl surface-interactive p-3 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Destination</span>
                      <span className="font-semibold text-foreground">Chase Bank •••• 4421</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Network</span>
                      <span className="font-semibold text-foreground">RTP / Instant Clearing</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setWithdrawStep("confirm")}
                    className="cta-pill w-full justify-center text-xs"
                  >
                    Review Disbursement
                  </button>
                </div>
              )}

              {withdrawStep === "confirm" && (
                <div className="space-y-4 py-3 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <RefreshCcw className="h-6 w-6 animate-spin" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Authorize Payout?</p>
                    <p className="mt-1 text-xs text-muted-foreground">$284.50 will be deposited to Chase Bank (•••• 4421).</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setWithdrawStep("form")} className="press h-9 flex-1 rounded-xl surface-interactive-hover text-xs font-semibold">
                      Back
                    </button>
                    <button type="button" onClick={() => setWithdrawStep("done")} className="press h-9 flex-1 rounded-xl bg-emerald-600 text-xs font-semibold text-white shadow-xs">
                      Confirm & Send
                    </button>
                  </div>
                </div>
              )}

              {withdrawStep === "done" && (
                <div className="space-y-4 py-4 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={springBounce}
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600"
                  >
                    <Check className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Disbursement Dispatched</p>
                    <p className="mt-1 text-xs text-muted-foreground">Transaction reference: #TX-9934208</p>
                  </div>
                  <button type="button" onClick={closeWithdrawModal} className="cta-pill w-full justify-center text-xs">
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

type SpotlightKPICardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  subtext: string;
  delta: string;
  deltaUp?: boolean;
};

const SpotlightKPICard = ({
  icon: Icon,
  label,
  value,
  subtext,
  delta,
  deltaUp,
}: SpotlightKPICardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${event.clientX - left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${event.clientY - top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className="group relative overflow-hidden rounded-2xl surface-interactive-hover p-4 shadow-float"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(160px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(253, 136, 31, 0.12), transparent 80%)",
        }}
      />
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl surface-interactive">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
        <span className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-bold ${
          deltaUp
            ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400"
        }`}>
          {delta}
        </span>
      </div>
      <p className="relative z-10 mt-3 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="relative z-10 mt-0.5 font-mono text-2xl font-bold tracking-tight text-foreground">{value}</p>
      <p className="relative z-10 mt-1 truncate text-xs text-muted-foreground">{subtext}</p>
    </motion.div>
  );
};

const InteractiveAreaChart = ({ data }: { data: { day: string; amount: number }[] }) => {
  const chartId = useId();
  const maxVal = Math.max(...data.map((item) => item.amount), 1);

  const points = data
    .map((item, index) => {
      const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 100;
      const y = 100 - (item.amount / maxVal) * 80;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className="group relative h-full w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id={`gradient-${chartId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon fill={`url(#gradient-${chartId})`} points={areaPoints} />
        <motion.polyline
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          vectorEffect="non-scaling-stroke"
        />
        {data.map((item, index) => {
          const cx = data.length === 1 ? 50 : (index / (data.length - 1)) * 100;
          const cy = 100 - (item.amount / maxVal) * 80;
          return (
            <motion.circle
              key={`${item.day}-${index}`}
              cx={cx}
              cy={cy}
              r="3.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * index + 0.3, ...springBounce }}
              whileHover={{ scale: 1.8 }}
              className="cursor-pointer fill-background stroke-primary stroke-[2] drop-shadow-sm"
            />
          );
        })}
      </svg>
    </div>
  );
};

const PlanCard = ({ plan, isAnnual }: { plan: Plan; isAnnual: boolean }) => {
  const price = plan.customPrice
    ? plan.customPrice
    : `$${isAnnual ? plan.yearlyPrice : plan.monthlyPrice}`;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, transition: { duration: 0.15 } }}
      className={`relative flex flex-col justify-between rounded-2xl surface-interactive p-5 shadow-float ${
        plan.current ? "ring-2 ring-primary/40 border-primary" : ""
      }`}
    >
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">{plan.name}</p>
          {plan.badge && (
            <span className="rounded-full surface-interactive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              {plan.badge}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-baseline gap-1">
          <span className="font-mono text-2xl font-bold tracking-tight text-foreground">{price}</span>
          <span className="text-xs font-medium text-muted-foreground">{plan.period}</span>
        </div>

        <ul className="mt-4 space-y-2.5 border-t border-border/40 pt-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-xs font-medium text-foreground/80">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full surface-interactive">
                <Check className="h-2.5 w-2.5 stroke-[3] text-primary" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        disabled={plan.current}
        className={`mt-5 h-8 w-full rounded-xl text-xs font-semibold transition-all ${
          plan.current
            ? "cursor-default surface-interactive text-muted-foreground"
            : "cta-pill justify-center"
        }`}
      >
        {plan.cta}
      </button>
    </motion.div>
  );
};

export default Earnings;