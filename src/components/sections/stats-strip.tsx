import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";

const stats = [
  { value: "13+", label: "North Jersey towns served" },
  { value: "7", label: "Cleaning services offered" },
  { value: "100%", label: "Satisfaction-first promise" },
  { value: "7 days", label: "Flexible weekly availability" },
];

export function StatsStrip() {
  return (
    <section className="border-y border-line bg-surface">
      <Container>
        <Reveal
          as="ul"
          stagger={0.08}
          className="grid grid-cols-2 divide-x divide-y divide-line sm:grid-cols-4 sm:divide-y-0"
        >
          {stats.map((s) => (
            <li key={s.label} className="px-4 py-8 text-center sm:py-10">
              <p className="font-display text-3xl font-semibold text-brand-700 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-ink-soft">{s.label}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
