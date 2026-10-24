"use client";

import * as React from "react";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** vertical offset in px */
  y?: number;
  delay?: number;
  duration?: number;
  /** stagger direct children instead of the wrapper itself */
  stagger?: number;
  as?: "div" | "section" | "ul" | "ol" | "span";
  once?: boolean;
};

export function Reveal({
  children,
  className,
  y = 18,
  delay = 0,
  duration = 0.7,
  stagger,
  as = "div",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      const targets = stagger
        ? (gsap.utils.toArray(el.children) as HTMLElement[])
        : [el];

      gsap.set(targets, { opacity: 0, y });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power2.out",
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [y, delay, duration, stagger, once]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
