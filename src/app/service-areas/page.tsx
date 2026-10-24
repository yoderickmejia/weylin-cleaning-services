import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { areas } from "@/lib/areas";
import { counties } from "@/lib/site";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas — House Cleaning Across North Jersey",
  description:
    "Weylin Cleaning Services serves 13 North Jersey towns including Hoboken, Jersey City, Edgewater, Fort Lee, Montclair, Clifton and more across Hudson, Bergen, Passaic & Essex County.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  const byCounty = counties.map((c) => ({
    county: c,
    cities: areas.filter((a) => a.county === c),
  }));

  return (
    <>
      <PageHeader
        eyebrow="Service areas"
        breadcrumb="Service Areas"
        title="House cleaning across North Jersey"
        description="We proudly serve 13 towns throughout Hudson, Bergen, Passaic, and Essex County — with the same careful standard in every one."
      />

      {/* County index */}
      <Container className="-mt-6">
        <Reveal className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <p className="text-sm font-semibold text-ink">Browse by county</p>
          <div className="mt-3 flex flex-wrap gap-4">
            {byCounty.map((group) => (
              <div key={group.county} className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                  {group.county} County:
                </span>
                {group.cities.map((a) => (
                  <Link
                    key={a.slug}
                    href={`#${a.slug}`}
                    className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {a.city}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* City grid */}
      <section className="py-16 lg:py-20">
        <Container>
          <Reveal as="ul" stagger={0.05} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <li
                key={a.slug}
                id={a.slug}
                className="group flex scroll-mt-28 flex-col rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <MapPin className="size-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    {a.county} County
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-ink">
                  House Cleaning in {a.city}, NJ
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{a.blurb}</p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700"
                >
                  Get a quote in {a.city}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Not sure */}
      <section className="pb-8">
        <Container>
          <Reveal className="flex flex-col items-center gap-5 rounded-2xl border border-brand-100 bg-aurora p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="text-xl font-semibold text-ink">Don&apos;t see your town?</h2>
              <p className="mt-1.5 text-sm text-ink-soft">
                We often serve nearby areas too. Give us a call and we&apos;ll let you know right away.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Button asChild variant="outline">
                <a href={site.phone.href}>
                  <Phone className="size-4" />
                  Call us
                </a>
              </Button>
              <Button asChild>
                <Link href="/contact">
                  Check availability
                  <Check className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
