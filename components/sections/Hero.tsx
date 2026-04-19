"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

// Dot grid is desktop decoration only — ship via dynamic import, no SSR.
const HeroDotGrid = dynamic(() => import("@/components/ui/HeroDotGrid"), {
  ssr: false,
});

export const heroCopy = {
  eyebrow: "EGYPT'S AI & DATA COMMUNITY",
  headline: "Where Egypt builds with AI.",
  subhead:
    "Learn, build, hire, and get hired — across Egypt's most ambitious community of AI engineers, data scientists, and founders.",
  primaryCta: "Join the community",
  secondaryCta: "Explore the Marketplace",
  liveLabel: "Live community, updated every minute",
  stats: [
    { value: "3,847", label: "Members" },
    { value: "256", label: "Open roles" },
    { value: "2,138", label: "Community posts" },
  ],
} as const;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-surface-inverse"
    >
      {/* Mouse-reactive dot grid (decorative, behind everything) */}
      <div className="absolute inset-0 -z-10">
        <HeroDotGrid />
      </div>

      {/* Subtle navy gradient wash at top-end for depth — not a gradient orb, a readability aid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(26,86,219,0.18),transparent_55%)]"
      />

      <div className="mx-auto grid min-h-[80vh] max-w-[var(--container-page)] grid-cols-1 items-center gap-12 px-container pb-20 pt-32 md:min-h-[92vh] md:pb-24 md:pt-36 lg:grid-cols-12 lg:gap-16">
        {/* Left column — 7/12 */}
        <div className="lg:col-span-7">
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500"
          >
            {heroCopy.eyebrow}
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="mt-6 max-w-[14ch] text-balance text-[clamp(3rem,1.5rem+5.5vw,6rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-text-onDark"
          >
            {heroCopy.headline}
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
            className="mt-6 max-w-[52ch] text-pretty text-lg leading-[1.55] text-text-onDarkMuted md:text-xl"
          >
            {heroCopy.subhead}
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-base font-semibold tracking-[-0.005em] text-text-onAccent shadow-sm transition-colors hover:bg-blue-700"
            >
              {heroCopy.primaryCta}
            </Link>
            <Link
              href="/marketplace"
              className="group inline-flex h-12 items-center justify-center rounded-md px-4 text-base font-semibold tracking-[-0.005em] text-text-onDark transition-colors hover:text-gold-500"
            >
              {heroCopy.secondaryCta}
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="ms-2 transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Right column — 5/12 stats card */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="lg:col-span-5"
        >
          {/* Live indicator */}
          <div className="mb-4 flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              {!prefersReducedMotion ? (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              ) : null}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-xs font-medium tracking-wide text-text-onDarkMuted">
              {heroCopy.liveLabel}
            </span>
          </div>

          <div className="rounded-xl border border-border-onDark/70 bg-surface-inverseRaised/40 p-8 backdrop-blur-sm md:p-10">
            <dl className="divide-y divide-border-onDark/70">
              {heroCopy.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={
                    "flex flex-col gap-1 " +
                    (i === 0 ? "pb-6" : i === heroCopy.stats.length - 1 ? "pt-6" : "py-6")
                  }
                >
                  <dt className="order-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-[var(--font-jakarta)] text-[clamp(2.5rem,1.5rem+3vw,3.5rem)] font-bold leading-none text-text-onDark">
                    <AnimatedCounter value={stat.value} delay={0.4 + i * 0.1} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>

      {/* Soft fade into next section so the boundary reads clean */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-surface-inverse"
      />
    </section>
  );
}
