"use client";

import { useRef } from "react";
import { ClipboardCheck, CalendarClock, Sparkles, Smile } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Request a quote",
    body: "Tell us about your home and the clean you need. Get a clear, honest price — no pressure.",
  },
  {
    icon: CalendarClock,
    title: "We confirm the details",
    body: "We lock in a time that fits your schedule and tailor the visit to your space and priorities.",
  },
  {
    icon: Sparkles,
    title: "We clean, you relax",
    body: "Our careful team arrives on time and gets to work — top to bottom, detail by detail.",
  },
  {
    icon: Smile,
    title: "Enjoy your fresh space",
    body: "Come home to a spotless place that simply feels good. Rebook anytime in a tap.",
  },
];

export function HowItWorks() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-step]", {
        y: 26,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.18,
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
      gsap.from("[data-progress]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        ease: "power2.inOut",
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-surface-soft py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="A cleaner home in four simple steps"
          description="No complicated booking, no runaround. Just a smooth process from first hello to fresh finish."
          align="center"
        />

        <div ref={root} className="relative mt-14">
          {/* connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-brand-100 lg:block">
            <div data-progress className="h-full w-full bg-gradient-to-r from-brand-400 to-water-400" />
          </div>

          <ol className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title} data-step className="relative text-center lg:text-left">
                  <div className="relative z-10 mx-auto flex size-14 items-center justify-center rounded-2xl border border-brand-100 bg-surface text-brand-600 shadow-sm lg:mx-0">
                    <Icon className="size-6" />
                    <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-brand-600 text-[0.7rem] font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
