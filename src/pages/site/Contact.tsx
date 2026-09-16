import { ArrowRight, Building2, Headphones, MailOpen, MapPin, MessageCircle, Phone, ShieldCheck, Timer, Users2 } from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import PageHero from "@/components/marketing/PageHero";
import Section from "@/components/marketing/Section";
import StatsRow from "@/components/marketing/StatsRow";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import FaqSection from "@/components/marketing/FaqSection";
import CtaSection from "@/components/marketing/CtaSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const offices = [
  { city: "San Francisco", tag: "Global HQ", addr: "548 Market St, San Francisco, CA 94104" },
  { city: "London", tag: "Research", addr: "One Kingdom St, Paddington, London W2 6BD" },
  { city: "Bengaluru", tag: "Engineering", addr: "Prestige Atlanta, Koramangala, Bengaluru 560095" },
  { city: "Berlin", tag: "Trust", addr: "Torstraße 138, 10119 Berlin, Germany" },
  { city: "Tokyo", tag: "Design", addr: "1-6-1 Roppongi, Minato City, Tokyo 106-0032" },
  { city: "Toronto", tag: "Agents", addr: "129 Spadina Ave, Toronto, ON M5V 2L3" },
  { city: "Singapore", tag: "APAC", addr: "1 Raffles Quay, Singapore 048583" },
  { city: "Dubai", tag: "Enterprise", addr: "Emirates Towers, Sheikh Zayed Rd, Dubai" },
];

export default function Contact() {
  return (
    <MarketingLayout
      title="Contact — Rivinity"
      description="Reach the Rivinity team. Sales, support, enterprise, and eight global offices."
    >
      <PageHero
        eyebrow="Contact"
        title="Talk to a"
        gradientTail="human at Rivinity."
        subtitle="We answer within one business day. Whether you're evaluating Rivinity for your team or trying to reach a specific office, this page is the fastest way to the right person."
        meta={
          <StatsRow
            stats={[
              { value: "< 4h", label: "Median first reply", sub: "Global business hours" },
              { value: "24/7", label: "Enterprise support", sub: "Included with all plans" },
              { value: "8", label: "Global offices", sub: "Across four continents" },
              { value: "98%", label: "CSAT", sub: "Trailing quarter" },
            ]}
          />
        }
      />

      <Section
        eyebrow="How can we help"
        title={<>Pick the right door.</>}
        kicker="Four dedicated queues so your question reaches someone who can actually answer it."
      >
        <FeatureGrid
          cols={4}
          items={[
            { icon: MessageCircle, title: "Sales", body: "For evaluation calls, custom demos and quotes. Reach a human in under an hour." },
            { icon: Building2, title: "Enterprise", body: "Private deployments, DPAs, sovereign inference and procurement." },
            { icon: Headphones, title: "Support", body: "Product, billing and account issues. 24/7 on Business and Enterprise." },
            { icon: ShieldCheck, title: "Trust & Security", body: "Vulnerability reports, security reviews and compliance requests." },
          ]}
        />
      </Section>

      <Section eyebrow="Send a message" title={<>Tell us about your project.</>}>
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <form className="glass border border-glass rounded-3xl p-6 md:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fn" className="text-[12px]">First name</Label>
                <Input id="fn" className="mt-1.5" placeholder="Ada" />
              </div>
              <div>
                <Label htmlFor="ln" className="text-[12px]">Last name</Label>
                <Input id="ln" className="mt-1.5" placeholder="Lovelace" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="em" className="text-[12px]">Work email</Label>
                <Input id="em" type="email" className="mt-1.5" placeholder="ada@company.com" />
              </div>
              <div>
                <Label htmlFor="co" className="text-[12px]">Company</Label>
                <Input id="co" className="mt-1.5" placeholder="Company" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-[12px]">Team size</Label>
                <Select>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {["1-10","11-50","51-200","201-1000","1000+"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[12px]">Interest</Label>
                <Select>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {["Sales","Enterprise","Support","Partnerships","Press","Other"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="msg" className="text-[12px]">Message</Label>
              <Textarea id="msg" className="mt-1.5 min-h-[140px]" placeholder="Tell us what you're trying to build…" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-[11.5px] text-foreground/50 max-w-xs">
                By submitting, you agree to our <a className="underline underline-offset-4" href="/privacy">Privacy Policy</a>.
              </p>
              <Button className="cta-pill h-11">Send message <ArrowRight className="w-3.5 h-3.5 ml-1" /></Button>
            </div>
          </form>
          <aside className="space-y-4">
            <div className="glass border border-glass rounded-2xl p-6">
              <MailOpen className="w-5 h-5 text-foreground/70" />
              <div className="mt-3 text-[15px] font-semibold">Direct lines</div>
              <ul className="mt-3 space-y-2 text-[13px] text-foreground/70">
                <li>sales@rivinity.ai</li>
                <li>enterprise@rivinity.ai</li>
                <li>support@rivinity.ai</li>
                <li>security@rivinity.ai</li>
                <li>press@rivinity.ai</li>
              </ul>
            </div>
            <div className="glass border border-glass rounded-2xl p-6">
              <Phone className="w-5 h-5 text-foreground/70" />
              <div className="mt-3 text-[15px] font-semibold">Talk to us</div>
              <p className="mt-2 text-[12.5px] text-foreground/60">
                +1 (415) 555-0198 · Mon–Fri, 8am–6pm PT<br />
                Enterprise pager available 24/7.
              </p>
            </div>
            <div className="glass border border-glass rounded-2xl p-6">
              <Users2 className="w-5 h-5 text-foreground/70" />
              <div className="mt-3 text-[15px] font-semibold">Community</div>
              <p className="mt-2 text-[12.5px] text-foreground/60">
                Join 12,000 builders in the Rivinity Discord and follow @rivinityai on X for daily research notes.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section eyebrow="Global offices" title={<>Eight offices. One canvas.</>} divider>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {offices.map((o) => (
            <div key={o.city} className="glass border border-glass rounded-2xl p-5">
              <MapPin className="w-4 h-4 text-foreground/50" />
              <div className="mt-3 text-[15px] font-semibold">{o.city}</div>
              <div className="text-[11.5px] text-foreground/50 uppercase tracking-[0.15em] mt-0.5">{o.tag}</div>
              <p className="mt-3 text-[12.5px] text-foreground/60 leading-relaxed">{o.addr}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Response times" title={<>What to expect after you hit send.</>}>
        <div className="glass border border-glass rounded-3xl overflow-hidden">
          <div className="grid grid-cols-3 md:grid-cols-5 px-6 py-3 text-[11px] uppercase tracking-[0.14em] text-foreground/50 border-b border-glass">
            <div className="col-span-2 md:col-span-1">Queue</div>
            <div className="hidden md:block">First response</div>
            <div className="hidden md:block">Full response</div>
            <div>Coverage</div>
            <div className="text-right">Priority</div>
          </div>
          {[
            { q: "Sales", first: "< 1h", full: "< 24h", cov: "Global BH", p: "Standard" },
            { q: "Enterprise", first: "< 30m", full: "< 12h", cov: "24/7", p: "P1" },
            { q: "Support (Business+)", first: "< 4h", full: "< 24h", cov: "24/7", p: "Standard" },
            { q: "Support (Free/Pro)", first: "< 24h", full: "< 3d", cov: "Business hours", p: "Standard" },
            { q: "Trust & Security", first: "< 8h", full: "Case dep.", cov: "24/7", p: "P1" },
          ].map((r) => (
            <div key={r.q} className="grid grid-cols-3 md:grid-cols-5 px-6 py-4 border-b border-glass last:border-0 text-[13px]">
              <div className="col-span-2 md:col-span-1 font-medium">{r.q}</div>
              <div className="hidden md:block text-foreground/70">{r.first}</div>
              <div className="hidden md:block text-foreground/70">{r.full}</div>
              <div className="text-foreground/70 flex items-center gap-1.5"><Timer className="w-3.5 h-3.5" />{r.cov}</div>
              <div className="text-right text-foreground/70">{r.p}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title={<>Common questions before you write.</>}>
        <FaqSection faqs={[
          { q: "How quickly will I hear back?", a: "Sales replies within one hour during global business hours. Support and enterprise queues have dedicated SLAs listed above." },
          { q: "Do you offer live demos?", a: "Yes. Book a 30-minute walkthrough with a solutions engineer via the sales queue." },
          { q: "Can I request a private deployment?", a: "Enterprise customers can request VPC or sovereign inference regions. Send a note to enterprise@rivinity.ai." },
          { q: "How do I report a vulnerability?", a: "Email security@rivinity.ai with a PGP-signed disclosure. Our public key is available in the Trust Center." },
          { q: "Can I visit an office?", a: "Yes, by appointment. Reach us at least a week in advance and we will match you with the right team." },
        ]} />
      </Section>

      <CtaSection
        eyebrow="Ready to try Rivinity?"
        title="Open the canvas"
        gradientTail="and start building."
        primary={{ label: "Open Rivinity", href: "/app" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </MarketingLayout>
  );
}
