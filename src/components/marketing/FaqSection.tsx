import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Faq {
  q: string;
  a: string;
}

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="glass border border-glass rounded-3xl p-2 md:p-4">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border-b border-glass last:border-b-0 px-4"
          >
            <AccordionTrigger className="text-left text-[15px] font-medium hover:no-underline py-5">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-[14px] text-foreground/70 leading-relaxed pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
