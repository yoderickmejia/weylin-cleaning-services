import type { Metadata } from "next";
import { HeartHandshake, CalendarClock, TrendingUp, Users, Sparkles, MapPin } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { JoinForm } from "@/components/forms/join-form";

export const metadata: Metadata = {
  title: "Join Our Team — Cleaning Jobs in North Jersey",
  description:
    "Weylin Cleaning Services is hiring friendly, detail-oriented cleaners across North Jersey. Flexible schedules, fair pay, and a supportive local team. Apply today.",
  alternates: { canonical: "/join-our-team" },
};

const perks = [
  { icon: CalendarClock, title: "Flexible schedules", body: "Full-time, part-time, weekdays, or weekends — we work with your life." },
  { icon: TrendingUp, title: "Fair, reliable pay", body: "Honest compensation and steady, consistent work close to home." },
  { icon: Users, title: "Supportive team", body: "A small, friendly crew that has each other's backs — no corporate grind." },
  { icon: HeartHandshake, title: "Respect & trust", body: "We treat our team the way we treat our clients: with genuine care." },
  { icon: MapPin, title: "Work near home", body: "Jobs across North Jersey, so you spend less time commuting." },
  { icon: Sparkles, title: "Take pride in it", body: "If you love a job well done, you'll feel right at home with us." },
];

export default function JoinPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join our team"
        breadcrumb="Join Our Team"
        title="Do great work with a team that values you"
        description="We're always looking for friendly, dependable, detail-loving people to join Weylin Cleaning Services. If that sounds like you, we'd love to meet."
      />

      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            {/* Perks */}
            <div>
              <Reveal>
                <h2 className="text-2xl font-semibold text-ink">Why work with Weylin</h2>
                <p className="mt-2 text-ink-soft">
                  We&apos;re a locally owned company that believes great service starts with a
                  well-treated team. Here&apos;s what you can expect.
                </p>
              </Reveal>
              <Reveal as="ul" stagger={0.07} className="mt-8 grid gap-4 sm:grid-cols-2">
                {perks.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li key={p.title} className="rounded-2xl border border-line bg-surface p-5">
                      <span className="grid size-10 place-items-center rounded-lg bg-brand-50 text-brand-600">
                        <Icon className="size-5" />
                      </span>
                      <h3 className="mt-4 font-semibold text-ink">{p.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                    </li>
                  );
                })}
              </Reveal>
            </div>

            {/* Form */}
            <Reveal>
              <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-semibold text-ink">Apply to join</h2>
                <p className="mt-1.5 text-sm text-ink-soft">
                  Tell us a bit about yourself. Fields marked <span className="text-destructive">*</span> are required.
                </p>
                <div className="mt-6">
                  <JoinForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
