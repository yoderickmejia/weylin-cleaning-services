"use client";

import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

/**
 * On phones, land the visitor directly on the quote form when the page opens
 * (skips the intro + contact cards). Desktop is untouched. Skips if the URL
 * already targets a specific section (#hash) or if reduced motion is preferred
 * and the user hasn't explicitly navigated here.
 */
export function ScrollToFormOnMobile({
  targetId,
  maxWidth = 1023,
  offset = 72,
}: {
  targetId: string;
  maxWidth?: number;
  offset?: number;
}) {
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    if (!window.matchMedia(`(max-width: ${maxWidth}px)`).matches) return;

    const el = document.getElementById(targetId);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    // Instant (no animation) so the page simply opens at the form.
    window.scrollTo({ top: y, behavior: "auto" });
  }, [targetId, maxWidth, offset]);

  return null;
}
