import { Clock, HeartHandshake, ShieldCheck, Sparkles, Leaf, MessageCircle } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Trusted & local",
    body: "A small, vetted North Jersey team that treats your home with the same care we'd give our own.",
  },
  {
    icon: Clock,
    title: "Reliable scheduling",
    body: "We show up when we say we will. On time, every time — with easy rescheduling when life happens.",
  },
  {
    icon: Sparkles,
    title: "Detail-obsessed",
    body: "The baseboards, the corners, the little things others skip. We finish the job completely.",
  },
  {
    icon: HeartHandshake,
    title: "Respectful care",
    body: "Friendly, careful, and discreet. Your space, your rules — we work around what matters to you.",
  },
  {
    icon: Leaf,
    title: "Family & pet safe",
    body: "Gentle, effective products that leave your home fresh and safe for the people and pets in it.",
  },
  {
    icon: MessageCircle,
    title: "Clear communication",
    body: "Honest quotes, no surprises, and quick replies whenever you reach out. Just straightforward service.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Weylin"
          title="Cleaning you can actually count on"
          description="We built Weylin on the things people wish every cleaning service had: reliability, real care, and a finish you can feel the moment you walk in."
        />
        <Reveal
          as="ul"
          stagger={0.07}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <li
                key={r.title}
                className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand-200"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_8px_20px_-10px_var(--brand-700)]">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.body}</p>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
