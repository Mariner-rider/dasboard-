// Shared source of truth for footer link data.
// Every `to` MUST resolve to a route registered in src/AppRoutes.tsx.
// Verified at build time by scripts/check-footer-links.mjs and by the
// footer-links.test.tsx suite.

export type FooterItem = { label: string; to?: string; href?: string };
export type FooterColumn = { title: string; items: FooterItem[] };

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "About",
    items: [
      { label: "Our Story", to: "/about" },
      { label: "Team", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Research", to: "/research" },
      { label: "Blog", to: "/blog" },
      { label: "Courses", to: "/courses" },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "Web Search", to: "/app" },
      { label: "App Builder", to: "/app-builder" },
      { label: "Database", to: "/docs" },
      { label: "Security", to: "/security" },
      { label: "Audio Lab", to: "/audio-lab" },
      { label: "RivinityLM", to: "/rivinity-lm" },
      { label: "Image Enhancer", to: "/image-enhancer" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "Security", to: "/security" },
      { label: "CLOS-AI", to: "/trust" },
      { label: "Governance", to: "/trust" },
      { label: "Deepfake Detection", to: "/security" },
      { label: "Compliance", to: "/trust" },
      { label: "Post Your Ad", to: "/contact" },
      { label: "Agent as a Platform", to: "/agent-playground" },
    ],
  },
  {
    title: "Other Links",
    items: [
      { label: "Documentation", to: "/docs" },
      { label: "API Status", to: "/status" },
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy" },
    ],
  },
];