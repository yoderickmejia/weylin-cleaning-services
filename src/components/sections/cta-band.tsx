import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function CtaBand({
  title = "Ready for a cleaner, happier home?",
  description = "Get your free, no-pressure quote today — and let us take cleaning off your list for good.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2rem] px-6 py-14 text-center shadow-lg sm:px-12 lg:py-20">
          <Image
            src="/images/living-wide.webp"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-wash opacity-[0.94]" />
          <div className="pointer-events-none absolute -right-10 -top-10 size-60 rounded-full bg-water-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-100">{description}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <Link href="/contact">
                  Get a Free Quote
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50"
              >
                <a href={site.phone.href}>
                  <Phone className="size-4" />
                  {site.phone.display}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
