import { Star, Quote } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import {
  testimonials,
  TESTIMONIALS_ENABLED,
} from "@/lib/testimonials";

function initials(location: string) {
  // Monogram from the city name (placeholder — no fabricated personal identities).
  return location
    .split(",")[0]
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const avatarTones = ["from-brand-500 to-brand-700", "from-water-500 to-water-700", "from-brand-600 to-brand-800"];

export function Testimonials() {
  if (!TESTIMONIALS_ENABLED || testimonials.length === 0) return null;

  return (
    <section className="bg-surface-soft py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Kind words"
          title="What a great clean feels like"
          description="The difference is in the details — and in how a freshly cleaned home makes the rest of your week easier."
          align="center"
        />

        <Reveal
          as="ul"
          stagger={0.1}
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <li
              key={i}
              className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 shadow-sm"
            >
              <Quote className="size-7 text-brand-200" />
              <div className="mt-3 flex items-center gap-0.5">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="size-4 fill-water-400 text-water-400" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span
                  className={`grid size-11 place-items-center rounded-full bg-gradient-to-br ${avatarTones[i % avatarTones.length]} text-sm font-bold text-white`}
                >
                  {initials(t.location)}
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-soft">
                    {t.location} · {t.service}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
