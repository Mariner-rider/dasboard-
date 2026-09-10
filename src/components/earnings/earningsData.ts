export const cashflowHistory = [
  { day: "Jun 1", amount: 48 },
  { day: "Jun 5", amount: 112 },
  { day: "Jun 10", amount: 84 },
  { day: "Jun 15", amount: 195 },
  { day: "Jun 20", amount: 140 },
  { day: "Jun 24", amount: 260 },
  { day: "Jun 28", amount: 284 },
];

export const plans = [
  {
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    period: "/mo",
    features: [
      "5 daily compute credits",
      "Standard models",
      "Community support",
    ],
    cta: "Downgrade",
    current: false,
    badge: null,
  },
  {
    name: "Pro",
    monthlyPrice: 20,
    yearlyPrice: 16,
    period: "/mo",
    features: [
      "500 compute credits/mo",
      "Priority inference queue",
      "Dedicated API token",
      "Marketplace monetization",
    ],
    cta: "Active Plan",
    current: true,
    badge: "Current",
  },
  {
    name: "Scale",
    monthlyPrice: 49,
    yearlyPrice: 39,
    period: "/mo",
    features: [
      "2,500 compute credits/mo",
      "Fine-tuned model hosting",
      "Sub-second latency SLA",
      "3 Team collaborator seats",
    ],
    cta: "Upgrade Tier",
    current: false,
    badge: "Popular",
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    customPrice: "Custom",
    period: "",
    features: [
      "Custom quota limits",
      "SSO, SAML & SOC-2 reports",
      "Custom SLA & uptime guarantee",
      "Dedicated technical manager",
    ],
    cta: "Contact Sales",
    current: false,
    badge: null,
  },
];

export type Plan = (typeof plans)[number];

export type Transaction = {
  id: string;
  source: string;
  category: "marketplace" | "ads" | "payout";
  date: string;
  time: string;
  amount: number;
  type: "in" | "out";
  fee: number;
  status: "Settled" | "Processing" | "Pending";
};

export const initialTransactions: Transaction[] = [
  {
    id: "TX-9934201",
    source: "Marketplace Sale · DeepSearch Agent v2",
    category: "marketplace",
    date: "Jun 28, 2026",
    time: "14:22 UTC",
    amount: 42.0,
    type: "in",
    fee: 1.26,
    status: "Settled",
  },
  {
    id: "TX-9934202",
    source: "Incentive Reward · June Cohort Share",
    category: "ads",
    date: "Jun 27, 2026",
    time: "09:15 UTC",
    amount: 18.5,
    type: "in",
    fee: 0.55,
    status: "Settled",
  },
  {
    id: "TX-9934203",
    source: "API Subscriptions · Embeddings Pool",
    category: "marketplace",
    date: "Jun 25, 2026",
    time: "19:04 UTC",
    amount: 34.0,
    type: "in",
    fee: 1.02,
    status: "Settled",
  },
  {
    id: "TX-9934204",
    source: "ACH Transfer · Chase Bank (•••• 4421)",
    category: "payout",
    date: "Jun 20, 2026",
    time: "04:11 UTC",
    amount: 120.0,
    type: "out",
    fee: 0.0,
    status: "Settled",
  },
  {
    id: "TX-9934205",
    source: "Marketplace Sale · LangGraph Enterprise Pack",
    category: "marketplace",
    date: "Jun 18, 2026",
    time: "11:47 UTC",
    amount: 8.0,
    type: "in",
    fee: 0.24,
    status: "Processing",
  },
];