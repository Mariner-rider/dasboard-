import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import LegalDoc from "@/components/marketing/LegalDoc";

export default function EULA() {
  return (
    <MarketingLayout title="End User License Agreement — Rivinity" description="License terms for Rivinity desktop and installed software.">
      <PageHero compact eyebrow="Legal · EULA" title="End User" gradientTail="License Agreement." subtitle="This EULA governs installation and use of Rivinity desktop and mobile applications." />
      <LegalDoc
        updated="July 1, 2026"
        version="2.0"
        contact="legal@rivinity.ai"
        history={[
          { version: "2.0", date: "Jul 1, 2026", note: "Added agent execution scope and telemetry consent." },
          { version: "1.4", date: "Feb 2, 2026", note: "Clarified export controls." },
        ]}
        sections={[
          { id: "grant", title: "1. License grant", body: <p>Subject to compliance with this EULA and the Terms of Service, Rivinity grants you a limited, non-exclusive, non-transferable, revocable license to install and use the Rivinity applications solely for your internal purposes.</p> },
          { id: "restrictions", title: "2. Restrictions", body: <p>You will not (a) copy or modify the software, (b) reverse engineer or derive source code, (c) rent, resell, or sublicense the software, or (d) remove any proprietary notices.</p> },
          { id: "updates", title: "3. Updates", body: <p>The software may automatically download and install updates. These updates may add, change or remove features. Continued use after an update constitutes acceptance of the updated software.</p> },
          { id: "telemetry", title: "4. Telemetry", body: <p>The software collects limited, de-identified operational telemetry to improve stability and performance. You can disable non-essential telemetry from application settings.</p> },
          { id: "third-party", title: "5. Third-party components", body: <p>The software includes third-party open source components licensed under their own terms. A full attribution list is available at rivinity.ai/oss.</p> },
          { id: "export", title: "6. Export controls", body: <p>You will comply with all applicable export control laws and will not export or re-export the software to any restricted jurisdiction or person.</p> },
          { id: "termination", title: "7. Termination", body: <p>This EULA remains in effect until terminated. On termination you must uninstall the software. Sections that by their nature survive termination will remain in effect.</p> },
          { id: "warranty", title: "8. Warranty disclaimer", body: <p>The software is provided "as is" without warranty of any kind. Rivinity disclaims all implied warranties to the fullest extent permitted by law.</p> },
          { id: "liability", title: "9. Limitation of liability", body: <p>Rivinity's total liability under this EULA is limited as set out in the Terms of Service.</p> },
          { id: "governing", title: "10. Governing law", body: <p>This EULA is governed by the laws of the State of California, without regard to conflict-of-law principles.</p> },
        ]}
      />
    </MarketingLayout>
  );
}
