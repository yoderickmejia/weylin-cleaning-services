import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { site } from "@/lib/site";

export function ConsentCheckbox({
  id,
  checked,
  onCheckedChange,
  children,
}: {
  id: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-surface p-3.5 text-xs leading-relaxed text-ink-soft transition-colors hover:border-brand-200"
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
        className="mt-0.5"
      />
      <span>{children}</span>
    </label>
  );
}

export function transactionalConsentText() {
  return (
    <>
      <span className="font-semibold text-ink">Appointment &amp; service texts (optional).</span>{" "}
      I agree to receive transactional SMS text messages (such as quote replies, scheduling,
      and appointment confirmations) from {site.name} at the number I provided, including
      messages sent by automated means. Message frequency varies. Msg &amp; data rates may
      apply. Reply <strong>STOP</strong> to opt out or <strong>HELP</strong> for help. Consent
      is not a condition of purchase.
    </>
  );
}

export function promotionalConsentText() {
  return (
    <>
      <span className="font-semibold text-ink">Promotions &amp; offers (optional).</span> I agree
      to receive marketing SMS text messages (such as promotions, discounts, and reminders) from{" "}
      {site.name} at the number I provided, including messages sent by automated means. Message
      frequency varies. Msg &amp; data rates may apply. Reply <strong>STOP</strong> to opt out or{" "}
      <strong>HELP</strong> for help. Consent is not a condition of purchase.
    </>
  );
}

export function PrivacyNotice() {
  return (
    <p className="text-xs leading-relaxed text-ink-soft">
      By submitting this form, you agree to our{" "}
      <Link href="/privacy-policy" className="font-medium text-brand-700 underline underline-offset-2">
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link href="/terms-of-service" className="font-medium text-brand-700 underline underline-offset-2">
        Terms of Service
      </Link>
      . We&apos;ll only use your information to respond to your request.
    </p>
  );
}
