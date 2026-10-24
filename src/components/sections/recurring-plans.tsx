import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const plans = [
  {
    name: "Weekly",
    cadence: "Every week",
    best: "Busy, high-traffic homes",
    blurb: "The ultimate hands-off clean. Your home never gets a chance to fall behind.",
    perks: ["Always guest-ready", "Best per-visit value", "Same trusted cleaners"],
    featured: false,
  },
  {
    name: "Bi-Weekly",
    cadence: "Every 2 weeks",
    best: "Most households",
    blurb: "Our most popular rhythm — the sweet spot between spotless and sensible.",
    perks: ["Most popular plan", "Great value", "Consistent freshness"],
    featured: true,
  },
  {
    name: "Monthly",
    cadence: "Once a month",
    best: "Lighter upkeep",
    blurb: "A dependable monthly reset to keep things in check without the commitment.",
    perks: ["Low commitment", "Deep-ish refresh", "Easy to schedule"],
    featured: false,
  },
];

export function RecurringPlans({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        {withHeading && (
          <SectionHeading
            eyebrow="Recurring cleaning"
            title="A home that stays clean, without the stress"
            description="Pick a rhythm that fits your life. Same careful standard every visit, priority booking, and friendly cleaners who learn your home."
            align="center"
          />
        )}

        <Reveal
          as="ul"
          stagger={0.1}
          className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch"
        >
          {plans.map((p) => (
            <li key={p.name}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-7 transition-transform hover:-translate-y-1",
                  p.featured
                    ? "border-transparent bg-brand-wash text-white shadow-lg lg:-mt-3 lg:pb-10"
                    : "border-line bg-surface",
                )}
              >
                {p.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-water-400 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-brand-950">
                    Most popular
                  </span>
                )}
                <h3
                  className={cn(
                    "font-display text-2xl font-semibold",
                    p.featured ? "text-white" : "text-ink",
                  )}
                >
                  {p.name}
                </h3>
                <p className={cn("mt-1 text-sm font-medium", p.featured ? "text-water-300" : "text-water-600")}>
                  {p.cadence}
                </p>
                <p className={cn("mt-4 text-sm leading-relaxed", p.featured ? "text-brand-100" : "text-ink-soft")}>
                  {p.blurb}
                </p>

                <ul className="mt-6 space-y-3">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-sm">
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full",
                          p.featured ? "bg-water-400 text-brand-950" : "bg-brand-50 text-brand-600",
                        )}
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className={p.featured ? "text-brand-50" : "text-ink"}>{perk}</span>
                    </li>
                  ))}
                </ul>

                <p className={cn("mt-6 text-xs", p.featured ? "text-brand-200" : "text-ink-soft")}>
                  Best for: {p.best}
                </p>

                <Button
                  asChild
                  className="mt-7"
                  variant={p.featured ? "accent" : "default"}
                >
                  <Link href="/contact">
                    Get my plan
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
