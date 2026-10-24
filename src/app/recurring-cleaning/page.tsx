import type { Metadata } from "next";
import { CalendarHeart, PiggyBank, Clock, Settings2, ShieldCheck, Repeat } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Container, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { RecurringPlans } from "@/components/sections/recurring-plans";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Recurring Cleaning — Weekly, Bi-Weekly & Monthly",
  description:
    "Keep your North Jersey home effortlessly clean with Weylin's recurring cleaning plans — weekly, bi-weekly, or monthly. Consistent results, priority scheduling, and friendly cleaners who know your home.",
  alternates: { canonical: "/recurring-cleaning" },
};

const benefits = [
  { icon: CalendarHeart, title: "Consistent cleanliness", body: "Your home stays fresh year-round — never a big catch-up clean again." },
  { icon: Clock, title: "More free time", body: "Reclaim hours every week for the people and things that actually matter." },
  { icon: PiggyBank, title: "Better value", body: "Recurring visits are priced better than one-off cleans, with no hidden fees." },
  { icon: Settings2, title: "Fully customized", body: "Tell us your priorities and we'll build a checklist around your home." },
  { icon: ShieldCheck, title: "Same trusted team", body: "Familiar, vetted cleaners who learn exactly how you like things done." },
  { icon: Repeat, title: "Effortless scheduling", body: "Set your rhythm once. Reschedule anytime — life stays flexible." },
];

export default function RecurringPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recurring cleaning"
        breadcrumb="Recurring Cleaning"
        title="A home that stays clean, all on its own"
        description="Pick a rhythm, and we'll take it from here. The same careful standard every visit — weekly, bi-weekly, or monthly."
      />

      <RecurringPlans withHeading={false} />

      <section className="bg-surface-soft py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Why go recurring"
            title="The easiest decision you'll make all week"
            description="Recurring cleaning isn't just about a tidy home — it's about never having to think about it again."
            align="center"
          />
          <Reveal as="ul" stagger={0.07} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <li key={b.title} className="rounded-2xl border border-line bg-surface p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{b.body}</p>
                </li>
              );
            })}
          </Reveal>
        </Container>
      </section>

      <HowItWorks />
      <CtaBand
        title="Ready to set it and forget it?"
        description="Tell us about your home and we'll recommend the perfect recurring rhythm — with a clear, honest price."
      />
    </>
  );
}
