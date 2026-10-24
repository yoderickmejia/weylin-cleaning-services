import { NextResponse } from "next/server";
import { joinSchema } from "@/lib/schemas";
import { sendLeadEmail, row } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = joinSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const d = parsed.data;
  if (d.company) {
    return NextResponse.json({ ok: true });
  }

  const name = [d.firstName, d.lastName].filter(Boolean).join(" ");
  const subject = `New team application — ${name} (${d.city})`;

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
    <h2 style="color:#5a3896">New Team Application</h2>
    <table style="border-collapse:collapse;width:100%;background:#faf8fe;border-radius:12px;overflow:hidden">
      ${row("Name", name)}
      ${row("Phone", d.phone)}
      ${row("Email", d.email)}
      ${row("City", d.city)}
      ${row("Experience", d.experience)}
      ${row("Availability", d.availability)}
      ${row("Message", d.message)}
      ${row("SMS — transactional consent", d.smsTransactional)}
    </table>
    <h3 style="color:#5a3896;font-size:13px;margin-top:20px">Attribution</h3>
    <table style="border-collapse:collapse;width:100%">
      ${row("Source", d.utm_source)}
      ${row("Medium", d.utm_medium)}
      ${row("Campaign", d.utm_campaign)}
      ${row("Referrer", d.referrer)}
      ${row("Page", d.page)}
    </table>
  </div>`;

  const text = [
    `Name: ${name}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    `City: ${d.city}`,
    `Experience: ${d.experience}`,
    `Availability: ${d.availability}`,
    `Message: ${d.message}`,
    `SMS transactional consent: ${d.smsTransactional ? "Yes" : "No"}`,
  ].join("\n");

  const result = await sendLeadEmail({ subject, html, text, replyTo: d.email });
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
