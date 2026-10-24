import { Resend } from "resend";
import { site } from "@/lib/site";

type SendArgs = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/**
 * Sends an email via Resend when RESEND_API_KEY is configured.
 * Otherwise falls back to "log mode": the submission is logged to the server
 * console so nothing is lost while an email provider is being set up.
 *
 * Env vars (see .env.example):
 *   RESEND_API_KEY   — Resend API key (enables real sending)
 *   EMAIL_FROM       — verified sender, e.g. "Weylin <quotes@weylincleaningservices.com>"
 *   EMAIL_TO         — destination inbox (defaults to the business Gmail)
 */
export async function sendLeadEmail({ subject, html, text, replyTo }: SendArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.EMAIL_TO || site.email.address;
  const from = process.env.EMAIL_FROM || "Weylin Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.info(
      "\n[lead:log-mode] No RESEND_API_KEY set — logging submission instead of emailing.\n" +
        `  → To: ${to}\n  → Subject: ${subject}\n${text}\n`,
    );
    return { ok: true as const, mode: "log" as const };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo,
      subject,
      html,
      text,
    });
    if (error) {
      console.error("[lead:resend-error]", error);
      return { ok: false as const, mode: "resend" as const, error: error.message };
    }
    return { ok: true as const, mode: "resend" as const };
  } catch (err) {
    console.error("[lead:resend-exception]", err);
    return { ok: false as const, mode: "resend" as const, error: "send_failed" };
  }
}

export function row(label: string, value?: string | boolean) {
  const v =
    typeof value === "boolean" ? (value ? "Yes" : "No") : (value ?? "").toString().trim();
  if (!v) return "";
  return `<tr><td style="padding:6px 14px;color:#5e566e;font-size:13px">${label}</td><td style="padding:6px 14px;color:#221b33;font-size:14px;font-weight:600">${escapeHtml(
    v,
  )}</td></tr>`;
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
