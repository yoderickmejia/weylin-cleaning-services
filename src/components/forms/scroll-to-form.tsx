"use client";

import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

/**
 * Lands the visitor directly on the quote form when the page opens, on every
 * screen size. Skips if the URL already targets a specific section (#hash).
 */
export function ScrollToForm({
  targetId,
  offset = 90,
}: {
  targetId: string;
  offset?: number;
}) {
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;

    const el = document.getElementById(targetId);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    // Instant (no animation) so the page simply opens at the form.
    window.scrollTo({ top: y, behavior: "auto" });
  }, [targetId, offset]);

  return null;
}
