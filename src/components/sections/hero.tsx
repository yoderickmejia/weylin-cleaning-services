"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Star, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import { site } from "@/lib/site";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(headline.current, {
        type: "lines,words",
        linesClass: "split-line",
      });

      // LCP-safe: keep words fully opaque (they paint at first frame) and
      // only animate a small transform, so the H1 doesn't delay Largest
      // Contentful Paint while still revealing as a wave.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(split.words, {
        yPercent: 60,
        duration: 0.7,
        stagger: 0.03,
      })
        .from(
          "[data-hero-fade]",
          { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 },
          "-=0.5",
        )
        .from(
          "[data-hero-media]",
          { y: 30, opacity: 0, scale: 0.98, duration: 1 },
          "-=0.9",
        )
        .from(
          "[data-hero-float]",
          { y: 16, opacity: 0, duration: 0.6, stagger: 0.15 },
          "-=0.4",
        );

      return () => split.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-aurora">
      <div className="pointer-events-none absolute right-[-10%] top-[-10%] size-[40rem] rounded-full bg-water-200/30 blur-3xl" />
      <Container className="relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
        {/* Copy */}
        <div className="max-w-xl">
          <div
            data-hero-fade
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-surface/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 backdrop-blur"
          >
            <Sparkles className="size-3.5 text-water-500" />
            North Jersey&apos;s trusted cleaning team
          </div>

          <h1
            ref={headline}
            className="mt-5 text-pretty text-[2.6rem] font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.7rem]"
          >
            A spotless home, <span className="text-brand-600">without lifting a finger.</span>
          </h1>

          <p
            data-hero-fade
            className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft"
          >
            Weylin Cleaning Services brings a careful, detail-obsessed clean to homes
            and businesses across North Jersey — so you get your weekends, and your
            peace of mind, back.
          </p>

          <div data-hero-fade className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={site.phone.href}>
                <Phone className="size-4" />
                {site.phone.display}
              </a>
            </Button>
          </div>

          <ul
            data-hero-fade
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-soft"
          >
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-brand-600" />
              Licensed NJ business
            </li>
            <li className="flex items-center gap-2">
              <Star className="size-4 fill-water-400 text-water-400" />
              Satisfaction-first care
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="size-4 text-brand-600" />
              Locally owned &amp; operated
            </li>
          </ul>
        </div>

        {/* Media */}
        <div className="relative lg:pl-6">
          <div
            data-hero-media
            className="relative overflow-hidden rounded-[2rem] shadow-lg ring-1 ring-brand-100"
          >
            <Image
              src="/images/hero-bedroom.webp"
              alt="A bright, freshly cleaned bedroom by Weylin Cleaning Services in North Jersey"
              width={1100}
              height={1340}
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/30 via-transparent to-transparent" />
          </div>

          {/* Floating cards */}
          <div
            data-hero-float
            className="absolute -left-3 top-8 flex items-center gap-3 rounded-2xl border border-brand-100 bg-surface/95 px-4 py-3 shadow-md backdrop-blur sm:-left-6"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Sparkles className="size-5" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold text-ink">Clean Spaces,</p>
              <p className="text-xs text-ink-soft">Happier Lives.</p>
            </div>
          </div>

          <div
            data-hero-float
            className="absolute -bottom-4 right-2 flex items-center gap-2 rounded-2xl border border-brand-100 bg-surface/95 px-4 py-3 shadow-md backdrop-blur sm:right-6"
          >
            <div className="flex -space-x-1.5">
              {["bg-brand-500", "bg-water-500", "bg-brand-700"].map((c, i) => (
                <span
                  key={i}
                  className={`grid size-7 place-items-center rounded-full ${c} text-[0.6rem] font-bold text-white ring-2 ring-surface`}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">Homes refreshed</p>
              <p className="text-xs text-ink-soft">across 13+ NJ towns</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
