import { NextResponse } from "next/server";
import { rateLimit, clientIp } from "./rate-limit";

const MAX_BODY_BYTES = 16_000;
const LIMIT = 5; // submissions...
const WINDOW_MS = 10 * 60_000; // ...per 10 minutes per IP

/**
 * Shared guard for the public form endpoints: caps the request body size and
 * rate-limits per IP so bots can't flood the inbox or trip the email provider's
 * sending limits. Returns a response to short-circuit with, or null to proceed.
 */
export function guardForm(request: Request, scope: string): NextResponse | null {
  const len = Number(request.headers.get("content-length") || "0");
  if (len > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  const { ok, retryAfter } = rateLimit(`${scope}:${clientIp(request)}`, LIMIT, WINDOW_MS);
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  return null;
}
