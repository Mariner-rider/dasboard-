import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import LegalDoc from "@/components/marketing/LegalDoc";

export default function Terms() {
  return (
    <MarketingLayout title="Terms of Service — Rivinity" description="The terms that govern use of the Rivinity platform.">
      <PageHero compact eyebrow="Legal · Terms" title="Terms of" gradientTail="Service." subtitle="These terms govern access to and use of the Rivinity Intelligence Operating System. Please read them carefully." />
      <LegalDoc
        updated="July 1, 2026"
        version="3.1"
        contact="legal@rivinity.ai"
        history={[
          { version: "3.1", date: "Jul 1, 2026", note: "Clarified acceptable use and added agent execution terms." },
          { version: "3.0", date: "Jan 15, 2026", note: "Restructured around workspace-based subscriptions." },
          { version: "2.4", date: "Aug 20, 2025", note: "Added Marketplace commercial terms." },
        ]}
        sections={[
          { id: "acceptance", title: "1. Acceptance", body: <p>By creating an account, accessing the Rivinity service, or clicking "I agree", you accept these Terms on behalf of yourself and any organization you represent.</p> },
          { id: "accounts", title: "2. Accounts", body: <p>You are responsible for keeping account credentials confidential and for all activity that occurs under your account. Workspace administrators are responsible for their members.</p> },
          { id: "subscriptions", title: "3. Subscriptions & billing", body: <p>Paid plans renew automatically at the end of each term. You may cancel at any time. Refunds are provided in accordance with the refund policy referenced in your order form.</p> },
          { id: "acceptable-use", title: "4. Acceptable use", body: (
            <>
              <p>You agree not to use Rivinity to generate content that is illegal, that infringes rights of third parties, or that violates the Acceptable Use Policy incorporated by reference.</p>
              <p>You will not attempt to reverse-engineer, extract model weights, or circumvent rate limits or safety systems.</p>
            </>
          ) },
          { id: "customer-content", title: "5. Customer content", body: <p>You retain all rights in the content you provide. You grant Rivinity a limited license to process that content solely to provide the service. We do not train shared models on your content.</p> },
          { id: "outputs", title: "6. Outputs", body: <p>Outputs generated on your behalf are yours. You are responsible for evaluating outputs before relying on them for material decisions.</p> },
          { id: "third-party", title: "7. Third-party services", body: <p>The platform integrates with optional third-party services. Your use of those services is governed by their own terms and privacy policies.</p> },
          { id: "warranties", title: "8. Warranties & disclaimers", body: <p>The service is provided on an "as is" basis. To the maximum extent permitted by law, Rivinity disclaims all implied warranties, including merchantability and fitness for a particular purpose.</p> },
          { id: "liability", title: "9. Limitation of liability", body: <p>To the maximum extent permitted by law, Rivinity's aggregate liability under these Terms is limited to fees paid to Rivinity in the twelve months preceding the claim.</p> },
          { id: "indemnity", title: "10. Indemnity", body: <p>You will indemnify Rivinity against third-party claims arising from your breach of these Terms, your customer content, or your unauthorized use of the service.</p> },
          { id: "termination", title: "11. Termination", body: <p>Either party may terminate for material breach after a 30-day cure period. On termination you may export your content for 30 days, after which it will be deleted.</p> },
          { id: "law", title: "12. Governing law", body: <p>These Terms are governed by the laws of the State of California. Disputes will be resolved in the state or federal courts located in San Francisco County.</p> },
          { id: "changes", title: "13. Changes", body: <p>We may update these Terms from time to time. Material changes will be communicated at least 30 days in advance.</p> },
        ]}
      />
    </MarketingLayout>
  );
}
