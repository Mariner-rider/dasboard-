import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, FileCheck, Scale, Globe } from "lucide-react";

const layers = [
  {
    id: "soc2",
    title: "SOC 2 Type II",
    icon: FileCheck,
    summary: "Targeting Q3 2026",
    detail: "Controls are documented and audits are underway. We expect attestation in the current cycle.",
    roadmap: true,
  },
  {
    id: "iso27001",
    title: "ISO 27001",
    icon: ShieldCheck,
    summary: "Targeting Q3 2026",
    detail: "Information security management system is being implemented with an external auditor engaged.",
    roadmap: true,
  },
  {
    id: "gdpr",
    title: "GDPR-ready",
    icon: Scale,
    summary: "Ready",
    detail: "Data processing agreements, right-to-erasure workflows, and breach-notification procedures are in place.",
  },
  {
    id: "dpdp",
    title: "India DPDP-ready",
    icon: Scale,
    summary: "Ready",
    detail: "Consent management, data-principal rights, and cross-border transfer safeguards aligned with the Digital Personal Data Protection Act.",
  },
  {
    id: "residency",
    title: "Data residency options",
    icon: Globe,
    summary: "Available",
    detail: "Choose to store and process data in India, the EU, or the US depending on your compliance needs.",
  },
];

export const SecurityArchitecture = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="glass-strong border border-glass rounded-3xl p-10 lg:p-14 shadow-float relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-70 bg-[radial-gradient(circle_at_center,hsl(var(--foreground)/0.08),transparent_70%)]" />
      <div className="relative grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="w-11 h-11 rounded-2xl glass border border-glass flex items-center justify-center mb-5">
            <ShieldCheck className="w-5 h-5 text-foreground/80" />
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/50 mb-3">
            Security
          </div>
          <h2 className="text-[32px] lg:text-[40px] font-semibold tracking-tight leading-[1.05] text-foreground">
            Built with security
            <br />
            as architecture.
          </h2>
          <p className="mt-4 text-[15px] text-foreground/65 max-w-md leading-relaxed">
            Every layer is designed to be verified, audited, and expanded. Hover to inspect the stack.
          </p>
        </div>

        <div className="space-y-2">
          {layers.map((layer) => {
            const Icon = layer.icon;
            const isOpen = active === layer.id;
            const isRoadmap = layer.roadmap;
            return (
              <motion.div
                key={layer.id}
                layout
                onMouseEnter={() => setActive(layer.id)}
                onMouseLeave={() => setActive(null)}
                className={`border rounded-2xl px-4 py-3 cursor-default transition-colors duration-300 ${
                  isRoadmap
                    ? "border-dashed border-foreground/10 bg-transparent hover:border-foreground/20"
                    : isOpen
                      ? "border-foreground/20 bg-foreground/[0.04]"
                      : "border-glass bg-glass hover:border-glass-hover"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isRoadmap ? "bg-foreground/[0.04] border border-dashed border-foreground/10" : "glass border border-glass"}`}>
                    <Icon className={`w-4 h-4 ${isRoadmap ? "text-foreground/40" : "text-foreground/70"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-[13.5px] font-medium ${isRoadmap ? "text-foreground/60" : "text-foreground/90"}`}>{layer.title}</span>
                      <span className={`text-[10px] uppercase tracking-wider ${isRoadmap ? "text-foreground/35" : "text-foreground/50"}`}>{layer.summary}</span>
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="mt-1.5 text-[12px] text-foreground/60 leading-relaxed">
                            {layer.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SecurityArchitecture;
