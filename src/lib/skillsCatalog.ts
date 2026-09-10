// Seed skill catalog. In production this is fed from a backend index of
// SKILL.md files. Swap the export below for a fetch() call to switch sources.

export const SKILL_CATEGORIES = [
  "Writing",
  "Code",
  "Research",
  "Data",
  "Design",
  "Ops",
  "Marketing",
  "Finance",
  "Support",
  "Legal",
] as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  summary: string;
  tags: string[];
  usage: number;
  updated: string;
  body: string;
};

const seed: Omit<Skill, "id" | "body">[] = [
  { name: "Long-form article writer", category: "Writing", summary: "Drafts publication-quality long-form articles with a defined outline and citations.", tags: ["Blog", "SEO", "Outline"], usage: 12480, updated: "2026-07-01" },
  { name: "Email polish", category: "Writing", summary: "Rewrites drafts into concise, professional emails in your voice.", tags: ["Email", "Tone"], usage: 9820, updated: "2026-06-22" },
  { name: "Cold outreach", category: "Marketing", summary: "Generates short, personalized cold outreach with a clear single ask.", tags: ["Sales", "Outreach"], usage: 6410, updated: "2026-06-18" },
  { name: "PR pull-request review", category: "Code", summary: "Reviews diffs for correctness, style, and security. Comments per hunk.", tags: ["GitHub", "Review"], usage: 8930, updated: "2026-07-03" },
  { name: "TypeScript to Python port", category: "Code", summary: "Ports idiomatic TypeScript to idiomatic Python 3.12 with typed signatures.", tags: ["Port", "Python", "TS"], usage: 4210, updated: "2026-06-11" },
  { name: "SQL to natural language", category: "Data", summary: "Explains complex SQL queries in plain English for stakeholders.", tags: ["SQL", "Explain"], usage: 5340, updated: "2026-06-15" },
  { name: "Data cleaning plan", category: "Data", summary: "Inspects a dataset sample and proposes a step-by-step cleaning plan.", tags: ["Pandas", "ETL"], usage: 3120, updated: "2026-05-30" },
  { name: "Deep research brief", category: "Research", summary: "Runs multi-source web research and returns a cited brief with confidence scores.", tags: ["Citations", "Research"], usage: 15230, updated: "2026-07-05" },
  { name: "Competitor teardown", category: "Research", summary: "Analyzes a competitor's product, pricing, and positioning against your brief.", tags: ["Analysis", "Positioning"], usage: 2870, updated: "2026-06-02" },
  { name: "Wireframe from brief", category: "Design", summary: "Turns a product brief into an annotated low-fi wireframe outline.", tags: ["Wireframe", "UX"], usage: 3980, updated: "2026-06-20" },
  { name: "Brand voice guide", category: "Design", summary: "Extracts and codifies a brand voice from sample copy into a reusable guide.", tags: ["Brand", "Voice"], usage: 2140, updated: "2026-05-14" },
  { name: "Incident postmortem", category: "Ops", summary: "Generates a blameless postmortem from an incident log and Slack transcript.", tags: ["SRE", "Postmortem"], usage: 1930, updated: "2026-06-08" },
  { name: "Runbook builder", category: "Ops", summary: "Composes a step-by-step runbook for a described operational procedure.", tags: ["SRE", "Runbook"], usage: 1520, updated: "2026-05-22" },
  { name: "Ad copy variations", category: "Marketing", summary: "Generates 10 ad copy variants for a single value prop with rationale.", tags: ["Ads", "Copy"], usage: 7620, updated: "2026-07-04" },
  { name: "Landing page hero", category: "Marketing", summary: "Writes a taut hero (H1 + subhead + CTA) tailored to a target ICP.", tags: ["Landing", "Copy"], usage: 5820, updated: "2026-06-27" },
  { name: "Invoice reader", category: "Finance", summary: "Extracts structured line items and totals from PDF invoices.", tags: ["OCR", "Invoice"], usage: 3410, updated: "2026-06-04" },
  { name: "Forecast narrative", category: "Finance", summary: "Turns a forecast spreadsheet into an executive-ready narrative.", tags: ["Forecast", "FP&A"], usage: 1870, updated: "2026-05-19" },
  { name: "Support macro drafter", category: "Support", summary: "Drafts, tunes, and versions support macros grounded in your KB.", tags: ["Zendesk", "Macros"], usage: 2760, updated: "2026-06-14" },
  { name: "Ticket triage", category: "Support", summary: "Classifies, prioritizes, and routes inbound tickets with reasoning.", tags: ["Triage", "Routing"], usage: 4210, updated: "2026-06-25" },
  { name: "Contract redline", category: "Legal", summary: "Compares a contract against your playbook and proposes redlines.", tags: ["Contracts", "Redline"], usage: 1620, updated: "2026-05-28" },
  { name: "Policy summarizer", category: "Legal", summary: "Summarizes long policies into a decision-oriented one-pager.", tags: ["Policy", "Summary"], usage: 2010, updated: "2026-06-10" },
  { name: "Meeting note refiner", category: "Ops", summary: "Restructures raw meeting notes into decisions, actions, and open questions.", tags: ["Meetings", "Actions"], usage: 6820, updated: "2026-07-02" },
  { name: "Test plan generator", category: "Code", summary: "Produces a black-box test plan from a spec or PR description.", tags: ["QA", "Testing"], usage: 2340, updated: "2026-06-13" },
  { name: "Changelog writer", category: "Code", summary: "Turns merged PRs into a user-facing changelog entry.", tags: ["Release", "Notes"], usage: 3120, updated: "2026-06-30" },
  { name: "Persona builder", category: "Design", summary: "Constructs 3 user personas from interview transcripts.", tags: ["Persona", "Research"], usage: 1740, updated: "2026-05-11" },
  { name: "SEO keyword map", category: "Marketing", summary: "Builds a keyword map for a site with intent and difficulty scores.", tags: ["SEO", "Keywords"], usage: 4530, updated: "2026-06-28" },
  { name: "OKR drafter", category: "Ops", summary: "Turns a fuzzy quarterly ambition into concrete, measurable OKRs.", tags: ["OKR", "Strategy"], usage: 2620, updated: "2026-06-06" },
  { name: "Executive brief", category: "Writing", summary: "Compresses a long report into a 1-page exec brief with a clear ask.", tags: ["Brief", "Exec"], usage: 3980, updated: "2026-06-24" },
  { name: "Prompt refiner", category: "Writing", summary: "Rewrites vague prompts into structured, high-yield prompts.", tags: ["Prompt", "Meta"], usage: 11240, updated: "2026-07-06" },
  { name: "Regex explainer", category: "Code", summary: "Explains a regex step by step and offers safer alternatives.", tags: ["Regex", "Explain"], usage: 2140, updated: "2026-05-24" },
];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const SKILLS: Skill[] = seed.map((s) => ({
  ...s,
  id: slugify(s.name),
  body: [
    "---",
    `name: ${slugify(s.name)}`,
    `description: ${s.summary}`,
    `category: ${s.category}`,
    "---",
    "",
    "## Overview",
    "",
    s.summary,
    "",
    "## When to use",
    "",
    `Use this skill when the task calls for **${s.category.toLowerCase()}** work with a clear input and a defined output.`,
    "",
    "## Inputs",
    "",
    "- A short brief describing the goal",
    "- Any reference material (links, files, or context)",
    "",
    "## Outputs",
    "",
    `- A structured artifact ready to hand off, aligned with the tags: ${s.tags.join(", ")}.`,
    "",
    `> Installed by ${s.usage.toLocaleString()} teams · last updated ${s.updated}.`,
  ].join("\n"),
}));

export const TOTAL_SKILLS_AVAILABLE = 91_000;
