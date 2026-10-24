import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumb?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-aurora pt-12 pb-16 lg:pt-16 lg:pb-20">
      <div className="pointer-events-none absolute right-[-8%] top-[-20%] size-[32rem] rounded-full bg-water-200/25 blur-3xl" />
      <Container className="relative">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-ink-soft">
            <Link href="/" className="flex items-center gap-1 transition-colors hover:text-brand-700">
              <Home className="size-3.5" />
              Home
            </Link>
            {breadcrumb && (
              <>
                <ChevronRight className="size-3.5 opacity-50" />
                <span className="font-medium text-ink">{breadcrumb}</span>
              </>
            )}
          </nav>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-4 max-w-3xl text-pretty text-4xl font-semibold leading-[1.05] sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{description}</p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
