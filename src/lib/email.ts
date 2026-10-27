import nodemailer from "nodemailer";
import { site } from "@/lib/site";

type SendArgs = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/**
 * Sends an email via SMTP (Google Workspace / Gmail) when SMTP_USER and
 * SMTP_PASS are configured. Otherwise falls back to "log mode": the submission
 * is logged to the server console so nothing is lost while SMTP is set up.
 *
 * Env vars (see .env.example):
 *   SMTP_USER   — the Workspace mailbox that sends, e.g. "info@wylcleaning.com"
 *   SMTP_PASS   — a Google "App Password" (16 chars) for that mailbox
 *   SMTP_HOST   — SMTP server (defaults to smtp.gmail.com)
 *   SMTP_PORT   — SMTP port (defaults to 465, SSL)
 *   EMAIL_FROM  — display sender, e.g. "Wyl Cleaning <info@wylcleaning.com>"
 *                 (defaults to SMTP_USER). Must be the Workspace address/alias.
 *   EMAIL_TO    — destination inbox for leads (defaults to the business email)
 */
export async function sendLeadEmail({ subject, html, text, replyTo }: SendArgs) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.EMAIL_TO || site.email.address;
  const from = process.env.EMAIL_FROM || user || site.email.address;

  if (!user || !pass) {
    console.info(
      "\n[lead:log-mode] No SMTP_USER/SMTP_PASS set — logging submission instead of emailing.\n" +
        `  → To: ${to}\n  → Subject: ${subject}\n${text}\n`,
    );
    return { ok: true as const, mode: "log" as const };
  }

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
      auth: { user, pass },
    });

    await transport.sendMail({ from, to, replyTo, subject, html, text });
    return { ok: true as const, mode: "smtp" as const };
  } catch (err) {
    console.error("[lead:smtp-exception]", err);
    return { ok: false as const, mode: "smtp" as const, error: "send_failed" };
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
