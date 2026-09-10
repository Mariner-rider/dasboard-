import {
  MessageSquare,
  Search,
  GraduationCap,
  Image as ImageIcon,
  Video,
  LayoutTemplate,
  FileText,
  Lightbulb,
  Wand2,
  ClipboardList,
  Pencil,
  Brain,
  BookOpen,
  Beaker,
  Globe,
  Layout,
  Smartphone,
  Code2,
  Rocket,
} from "lucide-react";

export type SceneId = "chat" | "lm" | "builder";
export type Phase = "idle" | "click" | "typing" | "sending" | "thinking" | "executing" | "done";

export interface SceneMeta {
  id: SceneId;
  surface: string;
  accent: string;
  prompt: string;
}

export const SCENES: SceneMeta[] = [
  {
    id: "chat",
    surface: "AI Chat",
    accent: "#FD881F",
    prompt: "Summarize our Q3 user research into three clear takeaways.",
  },
  {
    id: "lm",
    surface: "RivinityLM",
    accent: "#F5A9D0",
    prompt: "Teach me how transformers work — build me a 3-lesson plan.",
  },
  {
    id: "builder",
    surface: "App Builder",
    accent: "#BFA7F8",
    prompt: "Build a pricing page for a coffee subscription SaaS.",
  },
];

export const TYPING_MS = 22;
export const THINKING_MS = 700;
export const DONE_HOLD_MS = 1600;
export const MEMORY_HOLD_MS = 4200;

export const CHAT_STREAM = [
  "Here are the three main takeaways from Q3 research:\n\n",
  "1. Onboarding friction is the biggest drop-off — users who didn't finish setup in session one were 4× less likely to return.\n\n",
  "2. Power users want deeper customization — custom agents, API access, and workspace memory topped every interview.\n\n",
  "3. Collaboration is going mainstream — shared canvases were mentioned in over 60% of calls.",
].join("");

export const LM_LESSONS = [
  { n: 1, title: "Attention, intuitively", mins: "8 min", tag: "Concept" },
  { n: 2, title: "Building a tiny transformer", mins: "14 min", tag: "Hands-on" },
  { n: 3, title: "Scaling laws & why they work", mins: "11 min", tag: "Deep dive" },
];

export const BUILDER_CODE = [
  '<section className="pricing">',
  '  <h2>Choose your roast</h2>',
  '  <PricingCard tier="Light"  price="$14" />',
  '  <PricingCard tier="Medium" price="$18" popular />',
  '  <PricingCard tier="Dark"   price="$22" />',
  "</section>",
];

export const MEMORY_NODES = [
  { id: "chat", label: "AI Chat", icon: MessageSquare, x: 50, y: 22 },
  { id: "search", label: "Deep Search", icon: Search, x: 15, y: 42 },
  { id: "lm", label: "RivinityLM", icon: GraduationCap, x: 85, y: 42 },
  { id: "image", label: "Image Enhancer", icon: ImageIcon, x: 20, y: 76 },
  { id: "video", label: "Prompt → Video", icon: Video, x: 80, y: 76 },
  { id: "builder", label: "App Builder", icon: LayoutTemplate, x: 50, y: 90 },
] as const;

export const CENTER = { x: 50, y: 55 };

export const CHAT_TABS = [
  { icon: Search, label: "Smart Paper Search" },
  { icon: FileText, label: "Smart Summarization" },
  { icon: Lightbulb, label: "Citation Generator" },
  { icon: Wand2, label: "Write Anything" },
];

export const CHAT_SUGGESTIONS = [
  { icon: ImageIcon, label: "Create image" },
  { icon: ClipboardList, label: "Make a plan" },
  { icon: FileText, label: "Summarize text" },
  { icon: Pencil, label: "Help me write" },
  { icon: Brain, label: "Brainstorm" },
];

export const LM_TABS = [
  { icon: BookOpen, label: "Study Session" },
  { icon: Beaker, label: "Research Lab" },
  { icon: Globe, label: "Explore Topics" },
];

export const LM_TOPICS = [
  { title: "Mathematics", desc: "Algebra, Calculus, Stats" },
  { title: "Science", desc: "Physics, Chem, Biology" },
  { title: "English", desc: "Lit, Grammar, Writing" },
  { title: "History", desc: "World, Civilizations" },
];

export const BUILDER_TABS = [
  { icon: Layout, label: "App Generator" },
  { icon: Smartphone, label: "UI Builder" },
  { icon: Globe, label: "Website Creator" },
];

export const BUILDER_CARDS = [
  { icon: Code2, title: "Build a landing page", desc: "Hero, features, CTA" },
  { icon: Layout, title: "Design a dashboard", desc: "Charts, tables, analytics" },
  { icon: Rocket, title: "Launch a SaaS", desc: "Auth, billing, API" },
];