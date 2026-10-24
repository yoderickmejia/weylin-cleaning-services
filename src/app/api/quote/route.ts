import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/schemas";
import { sendLeadEmail, row } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const d = parsed.data;

  // Honeypot: silently accept bots without sending.
  if (d.company) {
    return NextResponse.json({ ok: true });
  }

  const name = [d.firstName, d.lastName].filter(Boolean).join(" ");
  const subject = `New quote request — ${name} (${d.city})`;

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
    <h2 style="color:#5a3896">New Quote Request</h2>
    <table style="border-collapse:collapse;width:100%;background:#faf8fe;border-radius:12px;overflow:hidden">
      ${row("Name", name)}
      ${row("Phone", d.phone)}
      ${row("Email", d.email)}
      ${row("ZIP", d.zip)}
      ${row("City", d.city)}
      ${row("Cleaning type", d.cleaningType)}
      ${row("Bedrooms", d.bedrooms)}
      ${row("Bathrooms", d.bathrooms)}
      ${row("Square feet", d.squareFeet)}
      ${row("Frequency", d.frequency)}
      ${row("Preferred date", d.preferredDate)}
      ${row("Notes", d.notes)}
      ${row("SMS — transactional consent", d.smsTransactional)}
      ${row("SMS — promotional consent", d.smsPromotional)}
    </table>
    <h3 style="color:#5a3896;font-size:13px;margin-top:20px">Attribution</h3>
    <table style="border-collapse:collapse;width:100%">
      ${row("Source", d.utm_source)}
      ${row("Medium", d.utm_medium)}
      ${row("Campaign", d.utm_campaign)}
      ${row("Content", d.utm_content)}
      ${row("Term", d.utm_term)}
      ${row("Referrer", d.referrer)}
      ${row("Page", d.page)}
    </table>
  </div>`;

  const text = [
    `Name: ${name}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    `ZIP: ${d.zip}`,
    `City: ${d.city}`,
    `Cleaning type: ${d.cleaningType}`,
    `Bedrooms: ${d.bedrooms}  Bathrooms: ${d.bathrooms}  SqFt: ${d.squareFeet}`,
    `Frequency: ${d.frequency ?? ""}`,
    `Preferred date: ${d.preferredDate}`,
    `Notes: ${d.notes}`,
    `SMS transactional consent: ${d.smsTransactional ? "Yes" : "No"}`,
    `SMS promotional consent: ${d.smsPromotional ? "Yes" : "No"}`,
    `UTM: ${d.utm_source}/${d.utm_medium}/${d.utm_campaign} ref=${d.referrer}`,
  ].join("\n");

  const result = await sendLeadEmail({ subject, html, text, replyTo: d.email });
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
