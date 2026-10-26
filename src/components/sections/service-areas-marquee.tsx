import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { serviceAreas } from "@/lib/site";

export function ServiceAreasMarquee() {
  const row = [...serviceAreas, ...serviceAreas];
  return (
    <section className="overflow-hidden py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Service areas"
            title="Proudly serving North Jersey"
            description="From the Hudson waterfront to the heart of Essex County — if you're nearby, we've got you covered."
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/service-areas">
              All service areas
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>

      {/* marquee */}
      <div
        className="group relative mt-12 flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <ul className="flex shrink-0 animate-marquee items-center gap-4 pr-4 group-hover:[animation-play-state:paused]">
          {row.map((city, i) => (
            <li key={`${city}-${i}`}>
              <Link
                href={`/service-areas#${city.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                <MapPin className="size-4 text-water-500" />
                {city}, NJ
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
