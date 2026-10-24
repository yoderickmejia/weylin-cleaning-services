import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, Phone } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Container, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { services, specialties } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cleaning Services in North Jersey",
  description:
    "Explore Weylin Cleaning Services: standard, deep, recurring, move-in/out, post-construction, Airbnb turnover, and commercial cleaning across North Jersey. See what's included and get a free quote.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        breadcrumb="Services"
        title="Thoughtful cleaning for every space"
        description="Residential and commercial cleaning tailored to your home, your schedule, and the details that matter most to you."
      />

      {/* Quick nav */}
      <Container className="-mt-6">
        <Reveal
          as="ul"
          stagger={0.05}
          className="flex flex-wrap gap-2 rounded-2xl border border-line bg-surface p-4 shadow-sm"
        >
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`#${s.slug}`}
                className="inline-flex rounded-full bg-surface-muted px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </Reveal>
      </Container>

      <div className="space-y-20 py-20 lg:space-y-28 lg:py-28">
        {services.map((s, i) => {
          const Icon = s.icon;
          const flip = i % 2 === 1;
          const hasImage = Boolean(s.image);
          return (
            <section key={s.slug} id={s.slug} className="scroll-mt-28">
              <Container>
                <div
                  className={cn(
                    "grid items-center gap-10 lg:gap-14",
                    hasImage ? "lg:grid-cols-2" : "lg:grid-cols-[0.9fr_1.1fr]",
                  )}
                >
                  {/* Text */}
                  <Reveal className={cn(flip && hasImage && "lg:order-2")}>
                    <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="size-6" />
                    </span>
                    <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">{s.name}</h2>
                    <p className="mt-2 font-display text-lg text-water-600">{s.tagline}</p>
                    <p className="mt-4 text-base leading-relaxed text-ink-soft">{s.description}</p>

                    <div className="mt-6 rounded-2xl border border-line bg-surface-soft p-5">
                      <p className="text-sm font-semibold text-ink">What&apos;s included</p>
                      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {s.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-2.5 text-sm text-ink">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                              <Check className="size-3" strokeWidth={3} />
                            </span>
                            {inc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="mt-5 text-sm text-ink-soft">
                      <span className="font-semibold text-ink">Best for:</span> {s.bestFor}
                    </p>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <Button asChild>
                        <Link href="/contact">
                          Get a free quote
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="ghost">
                        <a href={site.phone.href}>
                          <Phone className="size-4" />
                          {site.phone.display}
                        </a>
                      </Button>
                    </div>
                  </Reveal>

                  {/* Media or graphic */}
                  {hasImage ? (
                    <Reveal className={cn(flip && "lg:order-1")}>
                      <div className="relative overflow-hidden rounded-[2rem] shadow-md ring-1 ring-brand-100">
                        <Image
                          src={`${s.image!.src}.webp`}
                          alt={s.image!.alt}
                          width={1200}
                          height={1400}
                          sizes="(max-width: 1024px) 100vw, 46vw"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </Reveal>
                  ) : (
                    <Reveal>
                      <div className="relative grid min-h-[18rem] place-items-center overflow-hidden rounded-[2rem] bg-brand-wash p-10 text-center shadow-md">
                        <div className="pointer-events-none absolute -right-8 -top-8 size-44 rounded-full bg-water-400/20 blur-2xl" />
                        <div className="relative">
                          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-white/10 text-white backdrop-blur">
                            <Icon className="size-8" />
                          </span>
                          <p className="mt-5 font-display text-2xl text-white">{s.short}</p>
                          <p className="mt-2 text-sm text-brand-100">{s.tagline}</p>
                        </div>
                      </div>
                    </Reveal>
                  )}
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      {/* Specialty add-ons */}
      <section className="bg-surface-soft py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Specialty focus areas"
            title="Little details, big difference"
            description="Add any of these focus areas to your clean — or ask us about a fully custom checklist for your home."
            align="center"
          />
          <Reveal as="ul" stagger={0.08} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map((sp) => (
              <li key={sp.name} className="rounded-2xl border border-line bg-surface p-6 text-center">
                <p className="font-semibold text-ink">{sp.name}</p>
                <p className="mt-2 text-sm text-ink-soft">{sp.note}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
