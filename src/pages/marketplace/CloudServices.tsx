import { Link } from "react-router-dom";
import { ArrowRight, Server, HardDrive, Network, Database, KeyRound, Layers, ShieldCheck, Gauge, Globe2, Cpu, Cloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MarketplaceLayout from "@/components/marketplace/MarketplaceLayout";

type Service = { icon: LucideIcon; name: string; tagline: string; body: string; bullets: string[]; from: string };

const services: Service[] = [
  { icon: Server, name: "Compute", tagline: "Instances that boot in seconds", body: "General-purpose and GPU instances with per-second billing, autoscaling, and observability.", bullets: ["CPU, memory & GPU shapes", "Snapshots & live migration", "Per-second billing"], from: "$0.006/hr" },
  { icon: HardDrive, name: "Block Storage", tagline: "Durable volumes for stateful workloads", body: "NVMe-backed volumes with encryption, snapshots, and cross-zone replication.", bullets: ["Up to 64 TB per volume", "Encrypted by default", "One-click snapshots"], from: "$0.08/GB·mo" },
  { icon: Network, name: "Networking", tagline: "Load balancing & private VPC", body: "L4/L7 load balancers, VPCs, and a global anycast edge terminating TLS close to users.", bullets: ["HTTP/2 & gRPC LBs", "VPC peering", "Anycast edge in 34 regions"], from: "$12/mo per LB" },
  { icon: Database, name: "Managed Postgres", tagline: "Postgres without the pager", body: "Fully managed Postgres 16 with automated backups, read replicas, and pooling.", bullets: ["HA standby", "PITR restore", "PgBouncer pooling"], from: "$18/mo" },
  { icon: KeyRound, name: "Identity & Access", tagline: "IAM, SSO, and audit trails", body: "Fine-grained roles, SSO, service accounts, and immutable audit logs.", bullets: ["SCIM provisioning", "Least-privilege policies", "Tamper-evident audit log"], from: "Included" },
  { icon: Layers, name: "Object Storage", tagline: "S3-compatible, no egress fees", body: "Petabyte-scale object storage with a compatible API and free intra-region egress.", bullets: ["S3-compatible API", "Free intra-region egress", "Lifecycle & versioning"], from: "$0.015/GB·mo" },
];

const pillars = [
  { icon: Gauge, title: "Simple by default", body: "One console, one API, predictable pricing. No 200-service maze." },
  { icon: ShieldCheck, title: "Secure at the primitive", body: "Encryption, IAM, and audit logs are on by default — not a paid add-on." },
  { icon: Globe2, title: "Global, close to users", body: "34 regions across 6 continents with a private backbone between them." },
  { icon: Cpu, title: "Built for AI", body: "GPU shapes, fast object storage, and low-latency networking for training and inference." },
];

const CloudServices = () => {
  return (
    <MarketplaceLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        {/* Hero */}
        <section data-hero className="relative overflow-hidden rounded-3xl glass border border-glass p-8 lg:p-10 mb-8">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-sky-300/30 via-indigo-300/25 to-purple-400/25 blur-3xl" />
          <div className="absolute -bottom-24 -left-12 w-72 h-72 rounded-full bg-gradient-to-tr from-orange-300/30 via-pink-300/25 to-fuchsia-300/25 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/60 mb-3">
              <Cloud className="w-3 h-3" /> Cloud Services
            </span>
            <h1 className="text-[34px] lg:text-[44px] leading-[1.05] font-semibold tracking-tight">
              The essential cloud,{" "}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">without the sprawl.</span>
            </h1>
            <p className="text-[14px] text-foreground/65 mt-4 max-w-lg leading-relaxed">
              Compute, storage, networking, databases, and identity — every primitive you need to ship, on one predictable bill. Deploy from the marketplace in minutes.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/rivinity-cloud" className="h-10 px-5 rounded-full bg-foreground text-background text-[13px] font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/contact" className="h-10 px-5 rounded-full glass border border-glass text-[13px] font-medium hover:bg-accent/60 transition-colors flex items-center">
                Talk to sales
              </Link>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-[18px] font-semibold tracking-tight">Why Rivinity Cloud</h2>
            <p className="text-[12px] text-muted-foreground/70 mt-0.5">Cloud primitives without the enterprise cruft.</p>
          </div>
          <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((p) => (
              <div key={p.title} data-hover-lift className="rounded-2xl glass border border-glass p-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-300/30 via-indigo-300/20 to-purple-300/25 flex items-center justify-center mb-3">
                  <p.icon className="w-4 h-4 text-foreground/80" strokeWidth={1.75} />
                </div>
                <h3 className="text-[14.5px] font-semibold">{p.title}</h3>
                <p className="text-[12.5px] text-muted-foreground/75 leading-snug mt-1.5">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mb-10">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-[18px] font-semibold tracking-tight">Available services</h2>
              <p className="text-[12px] text-muted-foreground/70 mt-0.5">Provision from the marketplace, wire up in minutes.</p>
            </div>
            <Link to="/rivinity-cloud" className="text-[12px] font-medium hover:underline flex items-center gap-1">
              Full docs <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.name} data-hover-lift className="rounded-2xl glass border border-glass p-5 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-300/30 via-indigo-300/20 to-purple-300/25 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-foreground/80" strokeWidth={1.75} />
                    </div>
                    <span className="text-[11.5px] font-medium text-foreground/70">from {s.from}</span>
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{s.name}</h3>
                  <p className="text-[11.5px] uppercase tracking-widest text-muted-foreground/70 mt-1">{s.tagline}</p>
                  <p className="mt-3 text-[12.5px] text-muted-foreground/80 leading-snug">{s.body}</p>
                  <ul className="mt-3 space-y-1.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="text-[12px] text-foreground/75 flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-foreground/40 mt-2 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-glass/60 flex items-center justify-between">
                    <Link to="/contact" className="text-[12px] font-medium hover:underline flex items-center gap-1">
                      Deploy <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-10">
          <div className="relative overflow-hidden rounded-3xl glass border border-glass p-8 lg:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-gradient-to-br from-sky-300/25 via-indigo-300/20 to-purple-300/25 blur-3xl" />
            <div className="relative max-w-xl">
              <h2 className="text-[22px] lg:text-[26px] font-semibold tracking-tight">Bring your workloads to Rivinity Cloud.</h2>
              <p className="text-[13px] text-foreground/65 mt-2 leading-relaxed">
                Migration credits, SLAs, and hands-on onboarding for teams moving from AWS, GCP, or Azure.
              </p>
            </div>
            <div className="relative flex flex-wrap gap-2">
              <Link to="/contact" className="h-10 px-5 rounded-full bg-foreground text-background text-[13px] font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                Contact sales <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/rivinity-cloud" className="h-10 px-5 rounded-full glass border border-glass text-[13px] font-medium hover:bg-accent/60 transition-colors flex items-center">
                Read the docs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MarketplaceLayout>
  );
};

export default CloudServices;
