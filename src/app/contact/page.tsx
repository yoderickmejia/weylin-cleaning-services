import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Zap, ShieldCheck, MessageSquareHeart } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { QuoteForm } from "@/components/forms/quote-form";
import { InstagramIcon } from "@/components/icons/instagram";
import { HowItWorks } from "@/components/sections/how-it-works";
import { site, serviceAreas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us & Get a Free Quote",
  description:
    "Get a free cleaning quote from Weylin Cleaning Services. Call (862) 900-9777, email us, or fill out the quick quote form. Serving 13 towns across North Jersey.",
  alternates: { canonical: "/contact" },
};

const contactCards = [
  {
    icon: Phone,
    label: "Call us",
    value: site.phone.display,
    sub: "We pick up — talk to a real person",
    href: site.phone.href,
  },
  {
    icon: Mail,
    label: "Email us",
    value: "Send a message",
    sub: site.email.address,
    href: site.email.href,
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: site.instagram.handle,
    sub: "See our latest work",
    href: site.instagram.url,
    external: true,
  },
];

const reasons = [
  { icon: Zap, title: "Fast, friendly replies", body: "No call centers. Reach a real local person who can actually help." },
  { icon: ShieldCheck, title: "Honest, upfront pricing", body: "Clear quotes with no hidden fees and no high-pressure sales." },
  { icon: MessageSquareHeart, title: "Flexible scheduling", body: "We work around your week, 7 days a week, with easy rescheduling." },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact / Get a quote"
        breadcrumb="Contact"
        title="Let's get your free quote started"
        description="Tell us a little about your space and we'll get back to you quickly with a clear, honest price. No pressure — ever."
      />

      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            {/* Left: contact info */}
            <div className="space-y-6">
              <Reveal as="ul" stagger={0.08} className="space-y-3">
                {contactCards.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        target={c.external ? "_blank" : undefined}
                        rel={c.external ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-sm"
                      >
                        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                          <Icon className="size-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{c.label}</p>
                          <p className="truncate font-semibold text-ink">{c.value}</p>
                          <p className="truncate text-sm text-ink-soft">{c.sub}</p>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </Reveal>

              <Reveal className="rounded-2xl border border-line bg-surface p-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Clock className="size-4 text-brand-600" />
                  Availability
                </p>
                <p className="mt-2 text-sm text-ink-soft">{site.hours.display}</p>
                <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-ink">
                  <MapPin className="size-4 text-brand-600" />
                  Areas we serve
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {serviceAreas.join(" · ")} — and nearby North Jersey towns.
                </p>
              </Reveal>

              <Reveal as="ul" stagger={0.08} className="space-y-3">
                {reasons.map((r) => {
                  const Icon = r.icon;
                  return (
                    <li key={r.title} className="flex gap-3.5 rounded-2xl bg-surface-soft p-5">
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface text-brand-600 ring-1 ring-brand-100">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-ink">{r.title}</p>
                        <p className="mt-1 text-sm text-ink-soft">{r.body}</p>
                      </div>
                    </li>
                  );
                })}
              </Reveal>
            </div>

            {/* Right: form */}
            <Reveal>
              <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-semibold text-ink">Get a free quote</h2>
                <p className="mt-1.5 text-sm text-ink-soft">
                  Fields marked <span className="text-destructive">*</span> are required. Takes about a minute.
                </p>
                <div className="mt-6">
                  <QuoteForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <HowItWorks />
    </>
  );
}
