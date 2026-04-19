"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type Props = {
  /** Final value. Commas and non-digits in the display value are preserved on output. */
  value: string;
  /** Duration in seconds. Default 1.6. */
  duration?: number;
  className?: string;
  /** Delay before the count-up starts. */
  delay?: number;
};

/**
 * Parses a display string like "3,847" or "114M", animates only the numeric part
 * from 0 → target, and re-formats with the original separators/suffix preserved.
 * Respects prefers-reduced-motion: snaps to final value.
 */
export function AnimatedCounter({
  value,
  duration = 1.6,
  className,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion ? value : formatFromTarget(value, 0)
  );

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const target = parseTarget(value);
    if (target === null) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(formatFromTarget(value, latest)),
    });

    return () => controls.stop();
  }, [inView, value, duration, delay, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

function parseTarget(value: string): number | null {
  const digits = value.replace(/[^0-9.]/g, "");
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) ? n : null;
}

function formatFromTarget(original: string, current: number): string {
  // Keep any non-digit suffix/prefix (e.g. "M", "%", "+").
  const match = original.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
  if (!match) return original;
  const [, prefix, numberPart, suffix] = match;

  // Detect decimals in the original to match their precision.
  const decimals = (numberPart.split(".")[1] || "").length;
  const hasCommas = numberPart.includes(",");
  const rounded = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();

  const formatted = hasCommas
    ? addThousands(rounded)
    : rounded;

  return `${prefix}${formatted}${suffix}`;
}

function addThousands(n: string): string {
  const [whole, frac] = n.split(".");
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return frac ? `${withCommas}.${frac}` : withCommas;
}
