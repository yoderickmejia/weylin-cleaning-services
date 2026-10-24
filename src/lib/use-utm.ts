"use client";

import { useEffect, useState } from "react";

export type UtmData = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  referrer: string;
  page: string;
};

const EMPTY: UtmData = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  referrer: "",
  page: "",
};

/** Reads UTM params + referrer from the URL on mount for hidden form fields. */
export function useUtm(): UtmData {
  const [utm, setUtm] = useState<UtmData>(EMPTY);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      // Reading window/document after mount is a one-time client-only sync.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUtm({
        utm_source: params.get("utm_source") ?? "",
        utm_medium: params.get("utm_medium") ?? "",
        utm_campaign: params.get("utm_campaign") ?? "",
        utm_content: params.get("utm_content") ?? "",
        utm_term: params.get("utm_term") ?? "",
        referrer: document.referrer ?? "",
        page: window.location.pathname,
      });
    } catch {
      // no-op
    }
  }, []);

  return utm;
}
