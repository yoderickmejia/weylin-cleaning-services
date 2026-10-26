"use client";

import { useEffect } from "react";
import { getLenis } from "@/lib/lenis-store";

/**
 * Lands the visitor directly on the quote form when the page opens, on every
 * screen size — including client-side navigations (where Next resets scroll to
 * top) and when Lenis smooth-scroll is active on real devices. Skips if the URL
 * already targets a specific section (#hash).
 */
export function ScrollToForm({
  targetId,
  offset = 90,
}: {
  targetId: string;
  offset?: number;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;

    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      const el = document.getElementById(targetId);
      if (!el) return;
      const lenis = getLenis();
      if (lenis) {
        // Drive it through Lenis so it isn't overridden by the smooth-scroll loop.
        lenis.scrollTo(el, { offset: -offset, immediate: true, force: true });
      } else {
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "auto" });
      }
    };

    // Run after Next's post-navigation scroll reset, then again to absorb
    // late layout shifts (web fonts) and Lenis initialization timing.
    const raf = requestAnimationFrame(() => requestAnimationFrame(run));
    const timers = [
      window.setTimeout(run, 120),
      window.setTimeout(run, 400),
    ];

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [targetId, offset]);

  return null;
}
