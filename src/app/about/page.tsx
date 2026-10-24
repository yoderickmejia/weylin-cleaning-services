import type { Metadata } from "next";
import Image from "next/image";
import { Heart, ShieldCheck, Sparkles, MapPin, Users, Leaf } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Container, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { counties } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — Locally Owned in North Jersey",
  description:
    "Weylin Cleaning Services LLC is a locally owned cleaning company serving North Jersey. Learn about our story, our values, and our commitment to the communities we clean for.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: ShieldCheck, title: "Trust first", body: "We're careful, honest, and discreet. Inviting someone into your home is a big deal — we never take it for granted." },
  { icon: Sparkles, title: "Finish the details", body: "A clean isn't done until the small things are done. We sweat the corners, edges, and the spots others skip." },
  { icon: Heart, title: "Treat it like ours", body: "We clean every home as if it were our own — with genuine pride in the result and respect for your space." },
  { icon: Leaf, title: "Safe & considerate", body: "Products that are tough on grime but gentle on the people and pets who live there. Cleaner, safer, fresher." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        breadcrumb="About"
        title="A local team that genuinely cares how your home feels"
        description="Weylin Cleaning Services was built on a simple idea: cleaning should give you time back, not another thing to worry about."
      />

      {/* Story */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] shadow-md ring-1 ring-brand-100">
                <Image
                  src="/images/living-room-fireplace.webp"
                  alt="A warm, freshly cleaned living room in a North Jersey home"
                  width={1200}
                  height={1500}
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal>
              <SectionHeading
                eyebrow="Our story"
                title="Proudly rooted in North Jersey"
                as="h2"
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
                <p>
                  Weylin Cleaning Services LLC started with a belief that the best cleaning
                  companies feel personal — like a neighbor you can count on, not a faceless
                  service. We&apos;re locally owned and operated, and the people who clean your
                  home are part of a small, dependable team that takes real pride in the work.
                </p>
                <p>
                  From the high-rises of the Hudson waterfront to the family homes of Essex and
                  Bergen County, we bring the same careful standard to every space: show up on
                  time, do it right, and leave a home that feels genuinely good to come back to.
                </p>
                <p>
                  Our promise is simple — a clean you can feel the moment you walk in, delivered
                  by people you&apos;re glad to have in your home.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-surface-soft py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we stand for"
            title="The values behind every clean"
            align="center"
          />
          <Reveal as="ul" stagger={0.08} className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <li key={v.title} className="flex gap-4 rounded-2xl border border-line bg-surface p-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{v.body}</p>
                  </div>
                </li>
              );
            })}
          </Reveal>
        </Container>
      </section>

      {/* Local commitment */}
      <section className="py-20 lg:py-24">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-brand-100 bg-aurora p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                  <MapPin className="size-4 text-water-500" />
                  Our community
                </span>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                  Committed to the communities we clean
                </h2>
                <p className="mt-4 max-w-xl text-ink-soft">
                  We&apos;re not a franchise dropping in from out of state. We live and work here,
                  and we care about keeping North Jersey homes and businesses looking their best —
                  across {counties.join(", ")} County and beyond.
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, stat: "Local", label: "Owned & operated" },
                  { icon: MapPin, stat: "13+", label: "Towns served" },
                  { icon: ShieldCheck, stat: "NJ", label: "Licensed business" },
                  { icon: Sparkles, stat: "100%", label: "Satisfaction-first" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="rounded-2xl border border-brand-100 bg-surface p-5">
                      <Icon className="size-5 text-brand-600" />
                      <p className="mt-3 font-display text-2xl font-semibold text-brand-700">{item.stat}</p>
                      <p className="text-xs text-ink-soft">{item.label}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
