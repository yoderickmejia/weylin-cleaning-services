import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${site.name}.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" breadcrumb="Privacy Policy" updated="October 23, 2026">
      <p>
        {site.name} (&ldquo;Weylin,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
        respects your privacy. This Privacy Policy explains what information we collect, how we use
        it, and the choices you have. It applies to our website and the services we provide in New
        Jersey.
      </p>

      <h2>Information we collect</h2>
      <p>We collect information you provide directly to us, including:</p>
      <ul>
        <li>Contact details such as your name, phone number, email address, and ZIP code or city.</li>
        <li>Details about your cleaning request (home size, service type, frequency, preferred date, and notes).</li>
        <li>Employment application details if you apply to join our team.</li>
        <li>Your communications with us by phone, email, text, or form.</li>
      </ul>
      <p>
        We also automatically collect limited technical and marketing attribution data, such as
        your referring website and campaign parameters (UTM source, medium, campaign, content, and
        term), to understand how people find us.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your quote requests and provide our cleaning services.</li>
        <li>To schedule, confirm, and manage appointments.</li>
        <li>To communicate with you about your service, including by text message where you have consented.</li>
        <li>To review employment applications.</li>
        <li>To improve our website, services, and marketing.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>SMS / text messaging</h2>
      <p>
        If you opt in, we may send you text messages. We offer two separate, optional consents:
        transactional messages (such as quote replies, scheduling, and appointment confirmations)
        and promotional messages (such as offers and reminders). Consent to receive text messages
        is <strong>not a condition of purchase</strong>.
      </p>
      <p>
        Message frequency varies. Message and data rates may apply. You can opt out at any time by
        replying <strong>STOP</strong>, and you can get help by replying <strong>HELP</strong>.
        Your mobile information will not be shared with third parties or affiliates for their own
        marketing or promotional purposes. For A2P 10DLC compliance, carriers may receive message
        delivery information as needed to deliver your messages.
      </p>

      <h2>How we share information</h2>
      <p>
        We do not sell your personal information. We may share it with trusted service providers who
        help us operate our business — for example, our email delivery provider — strictly to
        perform services on our behalf. We may also disclose information when required by law.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        Our website may use cookies or similar technologies to operate the site and understand how
        visitors use it. You can control cookies through your browser settings.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep your information for as long as needed to provide our services and for legitimate
        business or legal purposes, after which we securely delete or de-identify it.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information by
        contacting us using the details below. You may also opt out of marketing communications at
        any time.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>Our services are not directed to children under 13, and we do not knowingly collect their information.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date above reflects the latest version.</p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy? Reach out to {site.name} at{" "}
        <a href={site.email.href}>{site.email.address}</a> or{" "}
        <a href={site.phone.href}>{site.phone.display}</a>.
      </p>
    </LegalLayout>
  );
}
