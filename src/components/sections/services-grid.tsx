import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function ServicesGrid({
  limit,
  className,
}: {
  limit?: number;
  className?: string;
}) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <Reveal
      as="ul"
      stagger={0.08}
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {list.map((s) => {
        const Icon = s.icon;
        return (
          <li key={s.slug}>
            <Link
              href={`/services#${s.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
            >
              <span className="pointer-events-none absolute right-0 top-0 size-24 translate-x-8 -translate-y-8 rounded-full bg-brand-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                <Icon className="size-6" />
              </span>
              <h3 className="relative mt-5 text-lg font-semibold text-ink">{s.name}</h3>
              <p className="relative mt-1.5 text-sm font-medium text-water-600">{s.tagline}</p>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                {s.description.split(". ")[0]}.
              </p>
              <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                Learn more
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        );
      })}
    </Reveal>
  );
}
