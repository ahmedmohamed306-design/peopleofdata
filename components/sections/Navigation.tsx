"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";

export const navCopy = {
  brand: "People of Data",
  links: [
    { label: "Community", href: "/community" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Navigator", href: "/navigator" },
    { label: "Learn", href: "/learn" },
    { label: "Careers", href: "/careers" },
  ],
  cta: {
    secondary: "Log in",
    primary: "Join free",
  },
  menuOpen: "Open navigation",
  menuClose: "Close navigation",
} as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-state: once past 80px, nav becomes surface-base/70 + blur, text flips to navy.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close drawer on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkColor = scrolled ? "text-text-primary" : "text-text-onDark";
  const mutedLinkHover = scrolled
    ? "hover:text-blue-600"
    : "hover:text-gold-500";
  const wordmarkColor = scrolled ? "text-text-primary" : "text-text-onDark";
  const secondaryBtnColor = scrolled
    ? "text-text-primary hover:text-blue-600"
    : "text-text-onDark hover:text-gold-500";

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 " +
        (scrolled
          ? "border-b border-border-subtle bg-surface-base/70 backdrop-blur-lg"
          : "bg-transparent")
      }
      aria-label="Primary"
    >
      <div className="mx-auto flex h-16 max-w-[var(--container-page)] items-center justify-between px-container md:h-20">
        {/* Logo */}
        <Link
          href="/"
          aria-label="People of Data — home"
          className="inline-flex shrink-0 items-center"
        >
          <BrandMark wordmarkClassName={wordmarkColor} />
        </Link>

        {/* Desktop links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex lg:items-center lg:gap-8"
        >
          {navCopy.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                "text-sm font-medium transition-colors " +
                linkColor +
                " " +
                mutedLinkHover
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Link
            href="/login"
            className={
              "inline-flex h-11 items-center rounded-md px-4 text-sm font-semibold transition-colors " +
              secondaryBtnColor
            }
          >
            {navCopy.cta.secondary}
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-11 items-center rounded-md bg-blue-600 px-5 text-sm font-semibold text-text-onAccent transition-colors hover:bg-blue-700"
          >
            {navCopy.cta.primary}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={navCopy.menuOpen}
          aria-expanded={open}
          className={
            "inline-flex h-11 w-11 items-center justify-center rounded-md transition-colors lg:hidden " +
            linkColor
          }
        >
          <Menu size={24} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="drawer"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Primary navigation"
          >
            <motion.div
              initial={prefersReducedMotion ? { x: 0 } : { x: "100%" }}
              animate={{ x: 0 }}
              exit={prefersReducedMotion ? { x: 0 } : { x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="ms-auto flex h-full w-full max-w-md flex-col bg-surface-inverse px-6 py-6"
            >
              <div className="flex items-center justify-between">
                <BrandMark wordmarkClassName="text-text-onDark" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={navCopy.menuClose}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md text-text-onDark transition-colors hover:text-gold-500"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              <nav
                aria-label="Mobile navigation"
                className="mt-12 flex flex-col gap-2"
              >
                {navCopy.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="py-2 font-[var(--font-jakarta)] text-[2.5rem] font-bold leading-tight text-text-onDark transition-colors hover:text-gold-500"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 pt-8">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 w-full items-center justify-center rounded-md border border-border-onDark text-base font-semibold text-text-onDark transition-colors hover:border-gold-500 hover:text-gold-500"
                >
                  {navCopy.cta.secondary}
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 w-full items-center justify-center rounded-md bg-blue-600 text-base font-semibold text-text-onAccent transition-colors hover:bg-blue-700"
                >
                  {navCopy.cta.primary}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
