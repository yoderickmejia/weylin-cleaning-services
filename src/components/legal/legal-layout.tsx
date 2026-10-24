import { AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/section";

export function LegalLayout({
  title,
  breadcrumb,
  updated,
  children,
}: {
  title: string;
  breadcrumb: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" breadcrumb={breadcrumb} title={title} />
      <section className="py-14 lg:py-20">
        <Container className="max-w-3xl">
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-amber-300/60 bg-amber-50 p-4 text-sm text-amber-900">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <p>
              <strong>Template for review.</strong> This document is a starting point for{" "}
              Weylin Cleaning Services LLC and should be reviewed by a qualified attorney before
              publication to ensure it meets all applicable New Jersey and federal requirements.
            </p>
          </div>
          <p className="text-sm text-ink-soft">Last updated: {updated}</p>
          <div className="legal-prose mt-6">{children}</div>
        </Container>
      </section>
    </>
  );
}
