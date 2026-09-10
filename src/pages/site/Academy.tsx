import { ArrowRight, GraduationCap, BookOpen, Video, Award, Users, Sparkles, Compass, FlaskConical } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import Section from "@/components/marketing/Section";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import StatsRow from "@/components/marketing/StatsRow";
import CtaSection from "@/components/marketing/CtaSection";
import MagneticButton from "@/components/landing/MagneticButton";

const tracks = [
  { icon: Compass, title: "Foundations", body: "Prompting, retrieval, tool routing, and the mental model behind the Rivinity canvas." },
  { icon: FlaskConical, title: "Applied AI", body: "Ship real agents, evals, and RAG pipelines with the modules you already use." },
  { icon: Sparkles, title: "Creative studios", body: "Audio, image, and video workflows for content creators and agencies." },
  { icon: Users, title: "For teams", body: "Enablement paths for engineering, product, research, and go-to-market." },
];

const formats = [
  { icon: Video, title: "Live cohorts", body: "Six-week guided cohorts with office hours and a shipped final project." },
  { icon: BookOpen, title: "Self-paced tracks", body: "Structured lessons with embedded canvases you can fork and remix." },
  { icon: Award, title: "Certifications", body: "Earn a verifiable Rivinity Practitioner or Architect credential." },
];

export default function Academy() {
  return (
    <MarketingLayout
      title="Rivinity Academy — Learn to build with the Intelligence OS"
      description="Structured tracks, live cohorts, and hands-on labs that teach how to build, ship, and operate AI workflows on Rivinity."
    >
      <PageHero
        eyebrow="Rivinity Academy"
        title="Learn to build on the"
        gradientTail="Intelligence Operating System."
        subtitle="Free foundations, guided cohorts, and applied labs — designed with the researchers, engineers, and creators who use Rivinity every day."
        actions={
          <>
            <MagneticButton href="/app" className="cta-pill">
              Start learning <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>
            <MagneticButton
              href="/contact"
              className="inline-flex items-center h-11 px-5 rounded-full glass border border-glass text-[13px] font-medium hover:bg-accent/60 transition-colors"
            >
              Team enablement
            </MagneticButton>
          </>
        }
        meta={
          <StatsRow
            stats={[
              { value: "12", label: "Learning tracks", sub: "Foundations → Advanced" },
              { value: "48", label: "Hands-on labs", sub: "Fork any canvas" },
              { value: "6-wk", label: "Cohort length", sub: "Live + async" },
              { value: "4.9/5", label: "Learner rating", sub: "Across 2024 cohorts" },
            ]}
          />
        }
      />

      <Section eyebrow="Tracks" title={<>A curriculum for every <span className="gradient-accent-text">practitioner.</span></>}>
        <FeatureGrid items={tracks} cols={4} />
      </Section>

      <Section eyebrow="Formats" title={<>Learn the way that <span className="gradient-accent-text">fits your week.</span></>}>
        <FeatureGrid items={formats} cols={3} />
      </Section>

      <CtaSection
        eyebrow="Academy"
        title="Ready to build?"
        gradientTail="Start with Foundations — free, this week."
        primary={{ label: "Open Academy", href: "/app" }}
        secondary={{ label: "Talk to us", href: "/contact" }}
      />
    </MarketingLayout>
  );
}