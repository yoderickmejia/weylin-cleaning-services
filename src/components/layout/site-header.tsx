"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/icons/instagram";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="hidden bg-brand-900 text-brand-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-[0.8rem] lg:px-8">
          <p className="flex items-center gap-2 text-brand-200">
            <span className="inline-block size-1.5 rounded-full bg-water-400" />
            Serving North Jersey · {site.hours.display}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={site.phone.href}
              className="flex items-center gap-1.5 font-medium transition-colors hover:text-white"
            >
              <Phone className="size-3.5" />
              {site.phone.display}
            </a>
            <a
              href={site.email.href}
              className="flex items-center gap-1.5 font-medium transition-colors hover:text-white"
            >
              <Mail className="size-3.5" />
              {site.email.address}
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Weylin Cleaning Services on Instagram"
              className="transition-colors hover:text-white"
            >
              <InstagramIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-line bg-surface/85 backdrop-blur-md shadow-sm"
            : "border-transparent bg-surface/60 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-brand-700"
                    : "text-ink-soft hover:text-ink",
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-water-400" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/contact">Get a Free Quote</Link>
            </Button>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-surface-muted lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent className="p-0">
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                  <Logo badgeSize={40} />
                </div>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation and contact options
                </SheetDescription>

                <nav
                  className="flex flex-col gap-1 px-4 py-5"
                  aria-label="Mobile"
                >
                  {nav.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          isActive(item.href)
                            ? "bg-brand-50 text-brand-700"
                            : "text-ink hover:bg-surface-muted",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto space-y-3 border-t border-line px-5 py-5">
                  <SheetClose asChild>
                    <Button asChild size="lg" className="w-full">
                      <Link href="/contact">Get a Free Quote</Link>
                    </Button>
                  </SheetClose>
                  <a
                    href={site.phone.href}
                    className="flex items-center justify-center gap-2 rounded-full border border-line py-3 text-sm font-semibold text-ink"
                  >
                    <Phone className="size-4 text-brand-600" />
                    {site.phone.display}
                  </a>
                  <div className="flex items-center justify-center gap-5 pt-1 text-ink-soft">
                    <a
                      href={site.email.href}
                      className="flex items-center gap-1.5 text-sm hover:text-ink"
                    >
                      <Mail className="size-4" /> Email us
                    </a>
                    <a
                      href={site.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm hover:text-ink"
                    >
                      <InstagramIcon className="size-4" /> Instagram
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
