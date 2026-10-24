import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export function Logo({
  className,
  tone = "dark",
  withWordmark = true,
  badgeSize = 46,
}: {
  className?: string;
  tone?: "dark" | "light";
  withWordmark?: boolean;
  badgeSize?: number;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={badgeSize}
        height={badgeSize}
        priority
        className="shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
        style={{ height: badgeSize, width: "auto" }}
      />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.35rem] font-semibold tracking-tight",
              tone === "dark" ? "text-ink" : "text-white",
            )}
          >
            Weylin
          </span>
          <span
            className={cn(
              "text-[0.58rem] font-semibold uppercase tracking-[0.22em]",
              tone === "dark" ? "text-ink-soft" : "text-brand-200",
            )}
          >
            Cleaning Services
          </span>
        </span>
      )}
    </Link>
  );
}
