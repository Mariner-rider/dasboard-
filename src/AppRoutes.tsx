import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Route-level code splitting: each page ships as its own chunk, so the
// landing page no longer downloads the dashboard, marketplace, and labs.
const Landing = lazy(() => import("./pages/Landing.tsx"));
const Index = lazy(() => import("./pages/Index.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Analytics = lazy(() => import("./pages/Analytics.tsx"));
const Earnings = lazy(() => import("./pages/Earnings.tsx"));
const AppBuilder = lazy(() => import("./pages/AppBuilder.tsx"));
const AudioLab = lazy(() => import("./pages/AudioLab.tsx"));
const RivinityLM = lazy(() => import("./pages/RivinityLM.tsx"));
const ImageEnhancer = lazy(() => import("./pages/ImageEnhancer.tsx"));
const AgentPlayground = lazy(() => import("./pages/AgentPlayground.tsx"));
const PromptToVideo = lazy(() => import("./pages/PromptToVideo.tsx"));
const Research = lazy(() => import("./pages/Research.tsx"));
const TechNews = lazy(() => import("./pages/TechNews.tsx"));
const AITrends = lazy(() => import("./pages/AITrends.tsx"));
const Skills = lazy(() => import("./pages/Skills.tsx"));
const History = lazy(() => import("./pages/History.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const MarketplaceHome = lazy(() => import("./pages/marketplace/MarketplaceHome.tsx"));
const MarketplaceCategory = lazy(() => import("./pages/marketplace/MarketplaceCategory.tsx"));
const MarketplaceItem = lazy(() => import("./pages/marketplace/MarketplaceItem.tsx"));
const MarketplaceCart = lazy(() => import("./pages/marketplace/MarketplaceCart.tsx"));
const MarketplaceCheckout = lazy(() => import("./pages/marketplace/MarketplaceCheckout.tsx"));
const MarketplaceUpload = lazy(() => import("./pages/marketplace/MarketplaceUpload.tsx"));
const AgentAsAService = lazy(() => import("./pages/marketplace/AgentAsAService.tsx"));
const CloudServices = lazy(() => import("./pages/marketplace/CloudServices.tsx"));
const About = lazy(() => import("./pages/site/About.tsx"));
const Careers = lazy(() => import("./pages/site/Careers.tsx"));
const Contact = lazy(() => import("./pages/site/Contact.tsx"));
const Blog = lazy(() => import("./pages/site/Blog.tsx"));
const TrustCenter = lazy(() => import("./pages/site/TrustCenter.tsx"));
const Security = lazy(() => import("./pages/site/Security.tsx"));
const Privacy = lazy(() => import("./pages/site/Privacy.tsx"));
const Terms = lazy(() => import("./pages/site/Terms.tsx"));
const EULA = lazy(() => import("./pages/site/EULA.tsx"));
const Documentation = lazy(() => import("./pages/site/Documentation.tsx"));
const APIReference = lazy(() => import("./pages/site/APIReference.tsx"));
const Status = lazy(() => import("./pages/site/Status.tsx"));
const Roadmap = lazy(() => import("./pages/site/Roadmap.tsx"));
const Support = lazy(() => import("./pages/site/Support.tsx"));
const Academy = lazy(() => import("./pages/site/Academy.tsx"));
const Courses = lazy(() => import("./pages/site/Courses.tsx"));
const RivinityCloud = lazy(() => import("./pages/site/RivinityCloud.tsx"));
const Team = lazy(() => import("./pages/site/Team.tsx"));
const Roles = lazy(() => import("./pages/site/Roles.tsx"));
const ApiKeys = lazy(() => import("./pages/site/ApiKeys.tsx"));
const TeamMembersSettings = lazy(() => import("./pages/settings/TeamMembers.tsx"));
const RolesAccessSettings = lazy(() => import("./pages/settings/RolesAccess.tsx"));
const ApiKeysSettings = lazy(() => import("./pages/settings/ApiKeysSettings.tsx"));

// Declarative list of every registered route, so tests and the
// scripts/check-footer-links.mjs build-time check share one source of truth.
export const APP_ROUTES = [
  { path: "/", element: <Landing /> },
  { path: "/app", element: <Index /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/analytics", element: <Analytics /> },
  { path: "/earnings", element: <Earnings /> },
  { path: "/app-builder", element: <AppBuilder /> },
  { path: "/audio-lab", element: <AudioLab /> },
  { path: "/rivinity-lm", element: <RivinityLM /> },
  { path: "/image-enhancer", element: <ImageEnhancer /> },
  { path: "/agent-playground", element: <AgentPlayground /> },
  { path: "/prompt-to-video", element: <PromptToVideo /> },
  { path: "/research", element: <Research /> },
  { path: "/tech-news", element: <TechNews /> },
  { path: "/ai-trends", element: <AITrends /> },
  { path: "/skills", element: <Skills /> },
  { path: "/history", element: <History /> },
  { path: "/about", element: <About /> },
  { path: "/careers", element: <Careers /> },
  { path: "/team", element: <Team /> },
  { path: "/roles", element: <Roles /> },
  { path: "/academy", element: <Academy /> },
  { path: "/courses", element: <Courses /> },
  { path: "/rivinity-cloud", element: <RivinityCloud /> },
  { path: "/api-keys", element: <ApiKeys /> },
  { path: "/contact", element: <Contact /> },
  { path: "/blog", element: <Blog /> },
  { path: "/trust", element: <TrustCenter /> },
  { path: "/security", element: <Security /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/terms", element: <Terms /> },
  { path: "/eula", element: <EULA /> },
  { path: "/docs", element: <Documentation /> },
  { path: "/api", element: <APIReference /> },
  { path: "/status", element: <Status /> },
  { path: "/roadmap", element: <Roadmap /> },
  { path: "/support", element: <Support /> },
  { path: "/marketplace", element: <MarketplaceHome /> },
  { path: "/marketplace/c/:slug", element: <MarketplaceCategory /> },
  { path: "/marketplace/item/:id", element: <MarketplaceItem /> },
  { path: "/marketplace/cart", element: <MarketplaceCart /> },
  { path: "/marketplace/checkout", element: <MarketplaceCheckout /> },
  { path: "/marketplace/upload", element: <MarketplaceUpload /> },
  { path: "/marketplace/agent-as-a-service", element: <AgentAsAService /> },
  { path: "/marketplace/cloud", element: <CloudServices /> },
  { path: "/settings/team-members", element: <TeamMembersSettings /> },
  { path: "/settings/roles-access", element: <RolesAccessSettings /> },
  { path: "/settings/api-keys", element: <ApiKeysSettings /> },
] as const;

function RouteFallback() {
  return (
    <div className="min-h-[60vh] grid place-items-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <span className="text-sm">Loading…</span>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {APP_ROUTES.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
        {/* Catch-all — must stay last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
