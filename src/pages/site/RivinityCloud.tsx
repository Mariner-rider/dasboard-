import {
  ArrowRight,
  Server,
  HardDrive,
  Network,
  Database,
  KeyRound,
  ShieldCheck,
  Gauge,
  Globe2,
  Cpu,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import Section from "@/components/marketing/Section";
import CtaSection from "@/components/marketing/CtaSection";
import MagneticButton from "@/components/landing/MagneticButton";

type Service = {
  icon: LucideIcon;
  name: string;
  tagline: string;
  body: string;
  bullets: string[];
  from: string;
};

const services: Service[] = [
  {
    icon: Server,
    name: "Compute",
    tagline: "Instances that boot in seconds",
    body: "General-purpose and GPU instances with per-second billing, autoscaling groups, and zero-config observability.",
    bullets: ["CPU, memory, and GPU shapes", "Snapshots & live migration", "Per-second billing"],
    from: "$0.006/hr",
  },
  {
    icon: HardDrive,
    name: "Block Storage",
    tagline: "Durable volumes for stateful workloads",
    body: "NVMe-backed block volumes with encryption at rest, point-in-time snapshots, and cross-zone replication.",
    bullets: ["Up to 64 TB per volume", "Encrypted by default", "One-click snapshots"],
    from: "$0.08/GB · mo",
  },
  {
    icon: Network,
    name: "Networking",
    tagline: "Load balancing & private VPC",
    body: "L4/L7 load balancers, private subnets, and a global anycast edge that terminates TLS close to your users.",
    bullets: ["HTTP/2 & gRPC load balancing", "VPC peering & private DNS", "Anycast edge in 34 regions"],
    from: "$12/mo per LB",
  },
  {
    icon: Database,
    name: "Managed Postgres",
    tagline: "Postgres without the pager",
    body: "Fully managed Postgres 16 with automated backups, read replicas, and connection pooling built in.",
    bullets: ["High-availability standby", "Point-in-time restore", "PgBouncer pooling"],
    from: "$18/mo",
  },
  {
    icon: KeyRound,
    name: "Identity & Access",
    tagline: "IAM, SSO, and audit trails",
    body: "Fine-grained roles, SSO with Okta/Azure AD, service accounts, and immutable audit logs across every resource.",
    bullets: ["SCIM provisioning", "Least-privilege policies", "Tamper-evident audit log"],
    from: "Included",
  },
  {
    icon: Layers,
    name: "Object Storage",
    tagline: "S3-compatible, no egress fees",
    body: "Petabyte-scale object storage with a compatible API, lifecycle rules, and free egress to Rivinity Compute.",
    bullets: ["S3-compatible API", "Free intra-region egress", "Lifecycle & versioning"],
    from: "$0.015/GB · mo",
  },
];

const pillars = [
  {
    icon: Gauge,
    title: "Simple by default",
    body: "One console, one API, predictable pricing. No 200-service maze.",
  },
  {
    icon: ShieldCheck,
    title: "Secure at the primitive",
    body: "Encryption, IAM, and audit logs are on by default — not a paid add-on.",
  },
  {
    icon: Globe2,
    title: "Global, close to users",
    body: "34 regions across 6 continents with a private backbone between them.",
  },
  {
    icon: Cpu,
    title: "Built for AI",
    body: "GPU shapes, fast object storage, and low-latency networking for training and inference.",
  },
];

export default function RivinityCloud() {
  return (
    <MarketingLayout
      title="Rivinity Cloud — A lightweight cloud for modern teams"
      description="Compute, block storage, networking, managed Postgres, and IAM — the essential cloud primitives, without the sprawl."
    >
      <PageHero
        eyebrow="Rivinity Cloud"
        title="The essential cloud,"
        gradientTail="without the sprawl."
        subtitle="Compute, storage, networking, databases, and identity — every primitive you need to ship, on one predictable bill."
        actions={
          <>
            <MagneticButton href="/contact" className="cta-pill">
              Contact sales <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>
            <MagneticButton
              href="/docs"
              className="inline-flex items-center h-11 px-5 rounded-full glass border border-glass text-[13px] font-medium hover:bg-accent/60 transition-colors"
            >
              Read the docs
            </MagneticButton>
          </>
        }
      />

      {/* Pillars */}
      <Section
        eyebrow="Why Rivinity Cloud"
        title={<>A cloud that <span className="gradient-accent-text">stays out of your way.</span></>}
        kicker="The five services most teams actually use — done properly."
      >
        <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl glass border border-glass p-5 hover:shadow-float transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-300/30 via-pink-300/25 to-purple-300/25 flex items-center justify-center mb-3">
                <p.icon className="w-4 h-4 text-foreground/80" strokeWidth={1.75} />
              </div>
              <h3 className="text-[14.5px] font-semibold">{p.title}</h3>
              <p className="text-[12.5px] text-muted-foreground/75 leading-snug mt-1.5">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services grid */}
      <Section
        eyebrow="Services"
        title={<>The building blocks, <span className="gradient-accent-text">production-ready.</span></>}
        kicker="Every service ships with encryption, IAM, observability, and per-second billing."
      >
        <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.name}
                href="/contact"
                className="group flex flex-col glass border border-glass rounded-2xl p-6 md:p-7 hover:border-[hsl(var(--glass-border-hover))] transition-colors min-h-[300px]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl glass border border-glass">
                    <Icon className="w-4 h-4 text-foreground/85" strokeWidth={1.75} />
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-foreground/55">
                    From {s.from}
                  </span>
                </div>
                <h3 className="mt-5 text-[19px] md:text-[20px] font-semibold leading-snug tracking-tight text-foreground/90">
                  {s.name}
                </h3>
                <p className="mt-1 text-[12.5px] uppercase tracking-widest text-foreground/55">
                  {s.tagline}
                </p>
                <p className="mt-3 text-[13.5px] text-foreground/65 leading-relaxed">{s.body}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="text-[12.5px] text-foreground/70 flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-foreground/50 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-foreground/85 group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </span>
              </a>
            );
          })}
        </div>
      </Section>

      <CtaSection
        eyebrow="Rivinity Cloud"
        title="Ready to move?"
        gradientTail="Talk to us about your workload."
        primary={{ label: "Contact sales", href: "/contact" }}
        secondary={{ label: "See pricing", href: "/#pricing" }}
      />
    </MarketingLayout>
  );
}