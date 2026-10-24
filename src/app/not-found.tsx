import Link from "next/link";
import { Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-aurora py-24 lg:py-32">
      <Container className="max-w-xl text-center">
        <p className="font-display text-7xl font-semibold text-brand-600">404</p>
        <h1 className="mt-4 text-3xl font-semibold">This page got a little too clean</h1>
        <p className="mt-3 text-ink-soft">
          We couldn&apos;t find the page you were looking for. Let&apos;s get you back to a
          spotless start.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="size-4" />
              Back home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={site.phone.href}>
              <Phone className="size-4" />
              {site.phone.display}
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
