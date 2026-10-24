import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram";
import { site, serviceAreas, nav } from "@/lib/site";
import { services } from "@/lib/services";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden bg-brand-wash text-brand-100">
      <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-water-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.name} home`}>
              <Image src="/images/logo.png" alt="" width={56} height={56} style={{ height: 56, width: "auto" }} />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold text-white">Weylin</span>
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-brand-200">
                  Cleaning Services LLC
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-200">
              Reliable residential &amp; commercial cleaning across North Jersey.
              Detail-obsessed, locally owned, and here to give you back your time.
            </p>
            <p className="mt-4 font-display text-lg text-water-300">{site.tagline}</p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-400/40 px-4 py-2 text-sm font-medium text-brand-100 transition-colors hover:border-water-400 hover:text-white"
            >
              <InstagramIcon className="size-4" />
              Follow our work
            </a>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-brand-200 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/join-our-team" className="text-brand-200 transition-colors hover:text-white">
                  Join Our Team
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-brand-200 transition-colors hover:text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Get in touch</h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a href={site.phone.href} className="flex items-start gap-3 text-brand-100 hover:text-white">
                  <Phone className="mt-0.5 size-4 shrink-0 text-water-300" />
                  <span>{site.phone.display}</span>
                </a>
              </li>
              <li>
                <a href={site.email.href} className="flex items-start gap-3 break-all text-brand-100 hover:text-white">
                  <Mail className="mt-0.5 size-4 shrink-0 text-water-300" />
                  <span>{site.email.address}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-brand-200">
                <MapPin className="mt-0.5 size-4 shrink-0 text-water-300" />
                <span>Serving North Jersey — Hudson, Bergen, Passaic &amp; Essex County</span>
              </li>
              <li className="flex items-start gap-3 text-brand-200">
                <Clock className="mt-0.5 size-4 shrink-0 text-water-300" />
                <span>{site.hours.display}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Service areas strip */}
        <div className="mt-12 border-t border-brand-400/20 pt-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-200">Service areas</h3>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-brand-200">
            {serviceAreas.map((city) => (
              <li key={city}>
                <Link
                  href={`/service-areas#${city.toLowerCase().replace(/\s+/g, "-")}`}
                  className="transition-colors hover:text-white"
                >
                  {city}, NJ
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="mt-10 flex flex-col gap-4 border-t border-brand-400/20 pt-6 text-xs text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
