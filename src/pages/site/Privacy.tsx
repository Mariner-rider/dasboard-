import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import LegalDoc from "@/components/marketing/LegalDoc";

export default function Privacy() {
  return (
    <MarketingLayout title="Privacy Policy — Rivinity" description="How Rivinity collects, uses and protects your data.">
      <PageHero
        compact
        eyebrow="Legal · Privacy"
        title="Privacy"
        gradientTail="Policy."
        subtitle="This policy explains what data Rivinity Labs collects, why we collect it, and how you can control it. It applies to rivinity.ai and the Rivinity product."
      />
      <LegalDoc
        updated="July 1, 2026"
        version="4.2"
        contact="privacy@rivinity.ai"
        history={[
          { version: "4.2", date: "Jul 1, 2026", note: "Clarified regional residency and added zero-retention mode." },
          { version: "4.1", date: "Mar 12, 2026", note: "Added SCIM data flow and updated subprocessor list." },
          { version: "4.0", date: "Nov 8, 2025", note: "Refactor to align with GDPR and CPRA." },
          { version: "3.4", date: "Jun 30, 2025", note: "Added Studio outputs and Marketplace data flows." },
        ]}
        sections={[
          { id: "overview", title: "1. Overview", body: (
            <>
              <p>Rivinity Labs, Inc. ("Rivinity", "we", "us") provides the Rivinity Intelligence Operating System. This Privacy Policy describes how we handle information across our website, product and APIs. We designed the product so that most personal data never leaves your workspace.</p>
              <p>We do not sell personal data. We do not train shared models on customer content. Where a section applies to only one region — the EU, UK or California — it is called out explicitly.</p>
            </>
          ) },
          { id: "what-we-collect", title: "2. What we collect", body: (
            <>
              <p><strong>Account data.</strong> Name, email, workspace, billing details.</p>
              <p><strong>Content.</strong> Prompts, outputs, files, and connected data sources you provide.</p>
              <p><strong>Product telemetry.</strong> De-identified events used to improve reliability and performance.</p>
              <p><strong>Device data.</strong> Browser type, operating system, and coarse IP-derived geography.</p>
            </>
          ) },
          { id: "how-we-use", title: "3. How we use data", body: (
            <>
              <p>We use collected data to run the service, prevent abuse, meet legal obligations, and communicate about product updates you have opted into.</p>
              <p>We never use workspace content to train shared models. Enterprise workspaces can enable zero-retention mode to further restrict handling.</p>
            </>
          ) },
          { id: "sharing", title: "4. Sharing", body: (
            <p>We share data only with a small set of vetted subprocessors that operate under written data processing agreements. The current subprocessor list lives in the Trust Center and is updated 30 days before any addition.</p>
          ) },
          { id: "retention", title: "5. Retention", body: (
            <p>Prompts and outputs are retained for the period you configure (default 30 days). Account data is retained for the life of your workspace plus 90 days. Backups roll off after 35 days.</p>
          ) },
          { id: "your-rights", title: "6. Your rights", body: (
            <>
              <p>You may access, correct, export or delete your personal data at any time from workspace settings, or by writing to privacy@rivinity.ai.</p>
              <p>EU/UK residents may object to processing or lodge a complaint with a supervisory authority. California residents have the right to know, delete, correct, and opt out of sharing.</p>
            </>
          ) },
          { id: "security", title: "7. Security", body: (
            <p>We encrypt data in transit with TLS 1.3 and at rest with AES-256. Access is enforced by SSO, role-based controls, and short-lived credentials. See the Trust Center for the full control set.</p>
          ) },
          { id: "international", title: "8. International transfers", body: (
            <p>You choose US, EU or UK residency at workspace creation. Data does not leave your chosen region. Where onward transfers are required, we rely on Standard Contractual Clauses and additional safeguards.</p>
          ) },
          { id: "cookies", title: "9. Cookies", body: (
            <p>We use a minimal set of first-party cookies for authentication and preferences. Analytics is limited to aggregated, privacy-preserving product telemetry. There are no third-party advertising cookies.</p>
          ) },
          { id: "children", title: "10. Children", body: (
            <p>Rivinity is not directed to children under 16 and we do not knowingly collect personal data from them.</p>
          ) },
          { id: "changes", title: "11. Changes", body: (
            <p>Material changes will be communicated at least 30 days in advance via email and in-product banner. The full version history is available at the bottom of this page.</p>
          ) },
          { id: "contact", title: "12. Contact", body: (
            <p>Reach our privacy team at privacy@rivinity.ai. Our EU representative is Rivinity Ireland Ltd, 70 Sir John Rogerson's Quay, Dublin 2.</p>
          ) },
        ]}
      />
    </MarketingLayout>
  );
}
