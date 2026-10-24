"use client";

import Link from "next/link";
import { Phone, CalendarCheck } from "lucide-react";
import { site } from "@/lib/site";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="mx-auto max-w-md px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface/95 p-2 shadow-lg backdrop-blur">
          <a
            href={site.phone.href}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-50 py-3 text-sm font-semibold text-brand-700 active:scale-[0.98]"
          >
            <Phone className="size-4" />
            Call
          </a>
          <Link
            href="/contact"
            className="flex flex-[1.3] items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_-10px_var(--brand-700)] active:scale-[0.98]"
          >
            <CalendarCheck className="size-4" />
            Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
