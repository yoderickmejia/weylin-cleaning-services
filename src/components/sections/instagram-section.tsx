import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { InstagramIcon } from "@/components/icons/instagram";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

const gallery = [
  { src: "/images/living-room-bright.webp", alt: "Freshly cleaned bright living room" },
  { src: "/images/bathroom.webp", alt: "Spotless, sanitized bathroom" },
  { src: "/images/hero-bedroom.webp", alt: "Serene, freshly made bedroom" },
  { src: "/images/living-room-fireplace.webp", alt: "Cozy living room cleaned to detail" },
];

export function InstagramSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="See our work"
            title="Real homes, really clean"
            description="We let the results speak. Follow along on Instagram for before-and-afters and the little details we love."
          />
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_var(--brand-700)] transition-transform hover:-translate-y-0.5"
          >
            <InstagramIcon className="size-4" />
            {site.instagram.handle}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <Reveal
          as="ul"
          stagger={0.08}
          className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {gallery.map((g) => (
            <li key={g.src}>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-2xl ring-1 ring-brand-100"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 24vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-brand-900/0 text-white opacity-0 transition-all duration-300 group-hover:bg-brand-900/35 group-hover:opacity-100">
                  <InstagramIcon className="size-7" />
                </span>
              </a>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
