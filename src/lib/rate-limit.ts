/**
 * Tiny in-memory fixed-window rate limiter for the public form endpoints.
 *
 * Goal: stop a bot/script from flooding the forms (which would spam the inbox
 * and could trip the email provider's sending limits). It is per-process — fine
 * for a single-container deployment. For multi-instance, back it with Redis.
 */
type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();
let lastSweep = 0;

function sweep(now: number) {
  // Prune expired entries occasionally so the map can't grow unbounded.
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, entry] of buckets) {
    if (now > entry.resetAt) buckets.delete(key);
  }
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  sweep(now);

  const entry = buckets.get(key);
  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  if (entry.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true, retryAfter: 0 };
}

/** Best-effort client IP from the proxy headers (Caddy sets X-Forwarded-For). */
export function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
