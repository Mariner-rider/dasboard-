import { motion } from "framer-motion";

import { Search, Lock, MessageSquare, Code, Film, Headphones, Wand2, Image as ImageIcon } from "lucide-react";

interface PillarDemoProps {
  title: string;
  body: string;
  type: "routing" | "privacy" | "canvas";
  index: number;
}

const demoTitle: Record<PillarDemoProps["type"], string> = {
  routing: "Auto-routed intelligence",
  privacy: "Private by default",
  canvas: "One canvas, every surface",
};

const routingIcons = [Search, Wand2, ImageIcon, Film];
const canvasNodes = [
  { x: 10, y: 20, label: "Chat", icon: MessageSquare },
  { x: 120, y: 10, label: "Video", icon: Film },
  { x: 60, y: 80, label: "Code", icon: Code },
  { x: 150, y: 70, label: "Audio", icon: Headphones },
];

export const PillarDemo = ({ title, body, type, index }: PillarDemoProps) => {
  const isRouting = type === "routing";
  const isPrivacy = type === "privacy";
  const isCanvas = type === "canvas";


  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group surface-interactive-hover p-6 flex flex-col"
    >


      {/* Animated demo */}
      <div className="relative h-[140px] mb-5 rounded-xl bg-accent/30 border border-glass overflow-hidden">
        {isRouting && (
          <div className="absolute inset-0 p-4 flex items-center justify-center">
            <div className="relative w-full max-w-[240px] h-full">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-8 rounded-full glass border border-glass flex items-center justify-center text-[10px] font-medium bg-background/40">
                Prompt
              </div>
              {[
                { icon: Search, x: 0, y: 0, label: "Research" },
                { icon: Wand2, x: 100, y: 0, label: "Build" },
                { icon: ImageIcon, x: 0, y: 80, label: "Image" },
                { icon: Film, x: 100, y: 80, label: "Video" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: [0.35, 1, 0.35], scale: 1 }}
                    transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.35 }}
                    className="absolute w-9 h-9 rounded-lg glass border border-glass flex flex-col items-center justify-center text-foreground/70 gap-0.5"
                    style={{ left: item.x, top: item.y }}
                  >

                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[7px] leading-none">{item.label}</span>
                  </motion.div>
                );
              })}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                {[0, 1, 2, 3].map((i) => {
                  const targets = [
                    { x1: 18, y1: 18, x2: 109, y2: 18 },
                    { x1: 109, y1: 18, x2: 18, y2: 98 },
                    { x1: 18, y1: 98, x2: 109, y2: 98 },
                    { x1: 109, y1: 98, x2: 60, y2: 58 },
                  ][i];
                  return (
                    <motion.line
                      key={i}
                      x1={targets.x1}
                      y1={targets.y1}
                      x2={targets.x2}
                      y2={targets.y2}
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      animate={{ strokeDashoffset: [0, -16] }}
                      transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.2 }}
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {isPrivacy && (
          <div className="absolute inset-0 p-4 flex items-center justify-center">
            <div className="relative w-24 h-24">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-glass"
                  animate={{ scale: [1 + i * 0.25, 1 + i * 0.4, 1 + i * 0.25] }}
                  transition={{ repeat: Infinity, duration: 3.5, delay: i * 0.4 }}
                  style={{ opacity: 0.55 - i * 0.12 }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
                  <Lock className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        )}
        {isCanvas && (
          <div className="absolute inset-0 p-4 flex items-center justify-center">
            <div className="relative w-full max-w-[200px] h-full">
              {canvasNodes.map((node, i) => {
                const Icon = node.icon;
                return (
                  <motion.div
                    key={i}
                    className="absolute w-10 h-10 rounded-xl glass border border-glass flex flex-col items-center justify-center text-[9px] font-medium gap-0.5"
                    style={{ left: node.x, top: node.y }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.3 }}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{node.label}</span>
                  </motion.div>
                );
              })}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                <motion.line
                  x1="30" y1="40" x2="140" y2="30"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -16] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                <motion.line
                  x1="80" y1="100" x2="140" y2="90"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -16] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                />
                <motion.line
                  x1="30" y1="40" x2="80" y2="100"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -16] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      <h3 className="text-[16px] font-semibold tracking-tight">{demoTitle[type] || title}</h3>
      <p className="mt-2 text-[13px] text-foreground/60 leading-relaxed">{body}</p>
    </motion.div>
  );
};

export default PillarDemo;

