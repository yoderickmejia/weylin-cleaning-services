import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Container, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { RecurringPlans } from "@/components/sections/recurring-plans";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ServiceAreasMarquee } from "@/components/sections/service-areas-marquee";
import { Testimonials } from "@/components/sections/testimonials";
import { InstagramSection } from "@/components/sections/instagram-section";
import { CtaBand } from "@/components/sections/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />

      {/* Services */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Our services"
              title={<>Cleaning built around your home &amp; lifestyle</>}
              description="From a quick weekly refresh to a full move-out reset, there's a Weylin clean for every space and season."
            />
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/services">
                View all services
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-12">
            <ServicesGrid limit={6} />
          </div>
        </Container>
      </section>

      <WhyChooseUs />
      <RecurringPlans />
      <HowItWorks />
      <ServiceAreasMarquee />
      <Testimonials />
      <InstagramSection />
      <CtaBand />
    </>
  );
}
