import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircleQuestion } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { faqs } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Weylin Cleaning Services — service areas, what's included, supplies, scheduling, pricing, and more.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader
        eyebrow="FAQ"
        breadcrumb="FAQ"
        title="Questions, answered"
        description="Everything you might want to know before your first clean. Still curious? We're always happy to chat."
      />

      <section className="py-16 lg:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <Accordion type="single" collapsible className="space-y-3" defaultValue="item-0">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          <Reveal className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-brand-100 bg-surface-soft p-8 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-brand-50 text-brand-600">
              <MessageCircleQuestion className="size-6" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-ink">Still have a question?</h2>
              <p className="mt-1 text-sm text-ink-soft">
                We&apos;re a quick call or message away — no pressure, ever.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/contact">Get a free quote</Link>
              </Button>
              <Button asChild variant="outline">
                <a href={site.phone.href}>
                  <Phone className="size-4" />
                  {site.phone.display}
                </a>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
