import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${site.name}.`,
  alternates: { canonical: "/terms-of-service" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" breadcrumb="Terms of Service" updated="October 23, 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the website and services of{" "}
        {site.name} (&ldquo;Weylin,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
        By requesting a quote, booking a service, or using our website, you agree to these Terms.
      </p>

      <h2>Our services</h2>
      <p>
        We provide residential and commercial cleaning services in New Jersey. The specific scope of
        any clean is agreed upon before service and may be customized to your needs.
      </p>

      <h2>Quotes and pricing</h2>
      <p>
        Quotes are estimates based on the information you provide (such as home size and service
        type). Final pricing may be adjusted if actual conditions differ materially from what was
        described. We will communicate any changes before performing additional work.
      </p>

      <h2>Scheduling, rescheduling, and cancellations</h2>
      <ul>
        <li>We ask for reasonable advance notice to schedule or reschedule a cleaning.</li>
        <li>Please provide as much notice as possible for cancellations so we can adjust our schedule.</li>
        <li>Repeated last-minute cancellations or lockouts may be subject to a fee, which will be communicated in advance.</li>
      </ul>

      <h2>Access and home preparation</h2>
      <p>
        You are responsible for providing safe access to the property at the scheduled time and for
        securing valuables, fragile items, and pets. Please let us know of any hazards, special
        instructions, or areas to avoid.
      </p>

      <h2>Payment</h2>
      <p>
        Payment is due as agreed at the time of service unless otherwise arranged. Accepted payment
        methods will be communicated when you book.
      </p>

      <h2>Satisfaction</h2>
      <p>
        Your satisfaction matters to us. If something isn&apos;t right, let us know within a
        reasonable time and we&apos;ll work to make it right.
      </p>

      <h2>Text messaging</h2>
      <p>
        If you opt in to text messages, our SMS practices are described in our{" "}
        <a href="/privacy-policy">Privacy Policy</a>. You can reply <strong>STOP</strong> to opt out
        or <strong>HELP</strong> for help at any time. Consent to receive texts is not a condition
        of purchase.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Weylin&apos;s liability arising out of or relating to
        our services is limited to the amount paid for the specific service at issue. We are not
        liable for pre-existing damage, normal wear, or items not disclosed as fragile or valuable.
      </p>

      <h2>Insurance</h2>
      <p>
        {site.name} is a licensed New Jersey business. Current insurance and coverage details are
        available on request.
      </p>

      <h2>Governing law</h2>
      <p>These Terms are governed by the laws of the State of New Jersey, without regard to its conflict-of-laws rules.</p>

      <h2>Changes to these Terms</h2>
      <p>We may update these Terms from time to time. Continued use of our services after changes constitutes acceptance of the updated Terms.</p>

      <h2>Contact us</h2>
      <p>
        Questions about these Terms? Contact {site.name} at{" "}
        <a href={site.email.href}>{site.email.address}</a> or{" "}
        <a href={site.phone.href}>{site.phone.display}</a>.
      </p>
    </LegalLayout>
  );
}
