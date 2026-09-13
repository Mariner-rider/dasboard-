import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import App from "./App.tsx";
import "./index.css";
import { initScrollReveal } from "./lib/scroll-reveal";
import { initHoverLift } from "./lib/hover-lift";

gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById("root")!).render(<App />);

window.requestAnimationFrame(() => {
  initScrollReveal();
  initHoverLift();
});

