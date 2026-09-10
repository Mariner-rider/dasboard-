import {
  MessageSquare,
  Globe,
  Layout,
  Database,
  AudioWaveform,
  Film,
  SlidersHorizontal,
  Layers,
  Image as ImageIcon,
  Code2,
  type LucideIcon,
} from "lucide-react";

export const CATEGORIES = [
  "Marketing campaigns",
  "Movies & Shorts",
  "Social media",
  "Educational content",
  "Experimental art",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type ShowcaseCard = {
  id: number;
  category: Category;
  title: string;
  tag: string;
  image: string;
};

export const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: 1,
    category: "Marketing campaigns",
    title: "Make video ad for socials",
    tag: "High CTR",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    category: "Marketing campaigns",
    title: "Reshoot your product",
    tag: "Studio Lighting",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    category: "Marketing campaigns",
    title: "Build creative from brief",
    tag: "Gen-3 Speed",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    category: "Marketing campaigns",
    title: "Generate A/B variants",
    tag: "Multi-Model",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    category: "Marketing campaigns",
    title: "Create seasonal campaign",
    tag: "4K Render",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    category: "Movies & Shorts",
    title: "Sci-Fi Cyberpunk Alleyway",
    tag: "Cinematic 24fps",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    category: "Movies & Shorts",
    title: "Atmospheric Noir Sequence",
    tag: "Anamorphic Lens",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    category: "Movies & Shorts",
    title: "Dystopian Sand Cruiser",
    tag: "IMAX Depth",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    category: "Movies & Shorts",
    title: "Deep Space EVA Sequence",
    tag: "Zero-G Motion",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10,
    category: "Movies & Shorts",
    title: "Medieval Fortress Siege",
    tag: "Crowd Sim",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 11,
    category: "Social media",
    title: "Viral TikTok Transition Hook",
    tag: "9:16 Vertical",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 12,
    category: "Social media",
    title: "Gen-Z Streetwear Lookbook",
    tag: "Color Graded",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 13,
    category: "Social media",
    title: "Dynamic Podcast Soundwave Clip",
    tag: "Auto-Captions",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 14,
    category: "Social media",
    title: "Fast-Paced Recipe Teaser",
    tag: "Trending Audio",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 15,
    category: "Social media",
    title: "Interactive Fitness Challenge",
    tag: "Split Screen",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 16,
    category: "Educational content",
    title: "Animated Cellular Mitosis 3D",
    tag: "Microscopy",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 17,
    category: "Educational content",
    title: "Black Hole Gravitational Lens",
    tag: "Astrophysics",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 18,
    category: "Educational content",
    title: "Clean Energy Turbine Anatomy",
    tag: "Engineering",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 19,
    category: "Educational content",
    title: "Ancient Roman Forum Exploded View",
    tag: "Archaeology",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 20,
    category: "Educational content",
    title: "Neural Network Synapse Firing",
    tag: "Data Science",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 21,
    category: "Experimental art",
    title: "Bioluminescent Fluid Dynamics",
    tag: "Particle Sim",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 22,
    category: "Experimental art",
    title: "Generative Glitch Architecture",
    tag: "Parametric",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 23,
    category: "Experimental art",
    title: "Surrealist Infinite Escalator",
    tag: "Non-Euclidean",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 24,
    category: "Experimental art",
    title: "Metamorphic Glass Sculptures",
    tag: "Raytracing",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 25,
    category: "Experimental art",
    title: "Iridescent Organic Bloom",
    tag: "Procedural",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  },
];

export type FeaturedModel = {
  title: string;
  description: string;
  badge: string;
  actionText: string;
  image: string;
};

export const FEATURED_MODELS: FeaturedModel[] = [
  {
    title: "Seedance 2.5",
    description: "Generate cinematic videos with consistent multi-reference character locks.",
    badge: "New Release",
    actionText: "Try Seedance",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Aleph 2.0 Dynamic Keyframes",
    description: "Precision frame control with real-time text prompt temporal editing.",
    badge: "Updated",
    actionText: "Open Studio",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Conversational Avatars",
    description: "Build ultra-low latency interactive agents with synced speech & natural micro-gestures.",
    badge: "Agent Mode",
    actionText: "Deploy Agent",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "GPT Image 2 + Ultra Sharp",
    description: "Next-gen generation engine with native 4K upscaling and isolated layer depth.",
    badge: "Image Lab",
    actionText: "Create Visuals",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
  },
];

export type AppItem = {
  title: string;
  desc: string;
  icon: LucideIcon;
  gradient: string;
};

export const APP_GRID: AppItem[] = [
  {
    title: "Edit Studio",
    desc: "Edit timeline videos using natural language prompt controls.",
    icon: Film,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Keyframe Transitions",
    desc: "Smooth visual morphing and motion vector interpolation between key states.",
    icon: SlidersHorizontal,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "AI Pitch & Slide Deck",
    desc: "Turn raw briefs into brand-aligned visual presentation decks.",
    icon: Layers,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "Canvas Uncrop & Expand",
    desc: "Infinite generative canvas expansion powered by multi-pass diffusion.",
    icon: ImageIcon,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Audio & Voiceover Lab",
    desc: "Studio-grade neural speech synthesis, stem extraction, and dynamic music tracks.",
    icon: AudioWaveform,
    gradient: "from-rose-500 to-red-600",
  },
  {
    title: "Vector & App Prototyper",
    desc: "Instant responsive UI layouts with zero-shot exportable scaffold code.",
    icon: Code2,
    gradient: "from-cyan-500 to-blue-600",
  },
];

export type RecentItem = {
  id: number;
  icon: LucideIcon;
  color: string;
  bgLight: string;
  title: string;
  tag: string;
  desc: string;
  time: string;
};

export const RECENT_ACTIVITY: RecentItem[] = [
  {
    id: 1,
    icon: MessageSquare,
    color: "text-emerald-600 dark:text-emerald-400",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/40",
    title: "Research on Quantum Computing Advances",
    tag: "AI Chat",
    desc: "Breakthrough analysis on fault-tolerant logical qubits and cryogenic routing",
    time: "10:30 AM",
  },
  {
    id: 2,
    icon: Globe,
    color: "text-sky-600 dark:text-sky-400",
    bgLight: "bg-sky-50 dark:bg-sky-950/40",
    title: "Search: Sustainable energy trends 2026",
    tag: "Web Search",
    desc: "Global clean energy grid transformations, battery chemistries, and market outlook",
    time: "09:15 AM",
  },
  {
    id: 3,
    icon: Layout,
    color: "text-indigo-600 dark:text-indigo-400",
    bgLight: "bg-indigo-50 dark:bg-indigo-950/40",
    title: "AI SaaS Landing Page",
    tag: "App Builder",
    desc: "Modern landing page structure with responsive pricing tier components",
    time: "Yesterday",
  },
  {
    id: 4,
    icon: Database,
    color: "text-pink-600 dark:text-pink-400",
    bgLight: "bg-pink-50 dark:bg-pink-950/40",
    title: "Customer Data Analysis",
    tag: "Database",
    desc: "Quarterly churn prediction metrics and high-value customer cluster maps",
    time: "Yesterday",
  },
  {
    id: 5,
    icon: AudioWaveform,
    color: "text-purple-600 dark:text-purple-400",
    bgLight: "bg-purple-50 dark:bg-purple-950/40",
    title: "Voiceover: Product Demo Script",
    tag: "Audio Lab",
    desc: "Neural voiceover sync with custom cadence for interactive product trailer",
    time: "May 29",
  },
];