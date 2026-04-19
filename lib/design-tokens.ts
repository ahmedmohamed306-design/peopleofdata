/**
 * People of Data — Design Tokens
 * Single source of truth. Mirrored into Tailwind v4 @theme in app/globals.css.
 * Do not mutate at runtime. Do not introduce values not listed here.
 */

export const colors = {
  // Primary brand — used for primary CTAs, active nav, key highlights. ~15% visual weight.
  blue: {
    50: "#EFF4FE",
    100: "#DBE5FC",
    500: "#3B72E8",
    600: "#1A56DB", // PRIMARY. Buttons, links, active states.
    700: "#1444B0",
    900: "#0A2260",
  },

  // Heritage accent — Egyptian gold. ~5% visual weight.
  gold: {
    500: "#D4A843", // ACCENT. Never a primary CTA bg. Never on body text.
    600: "#B8912F",
    100: "#F7EDD3",
  },

  // Innovation accent — hover states, progress, data viz, "new" indicators. ~5%.
  teal: {
    500: "#0EA5E9",
    600: "#0284C7",
    100: "#DDF3FD",
  },

  // Surface hierarchy
  surface: {
    base: "#F8FAFC",
    raised: "#FFFFFF",
    sunken: "#F1F5F9",
    inverse: "#0B1120", // Deep Navy
    inverseRaised: "#111A2E",
  },

  // Text hierarchy
  text: {
    primary: "#0F172A",
    secondary: "#475569",
    tertiary: "#64748B",
    onDark: "#F8FAFC",
    onDarkMuted: "#94A3B8",
    onAccent: "#FFFFFF",
    onGold: "#0B1120", // MUST be dark navy. White on gold fails contrast.
  },

  // Border system
  border: {
    subtle: "#E2E8F0",
    default: "#CBD5E1",
    strong: "#94A3B8",
    onDark: "#1E293B",
  },

  // Semantic
  success: "#10B981",
  warning: "#F59E0B",
  error: "#E11D48",
} as const;

export const typography = {
  display: {
    fontFamily: "var(--font-jakarta)",
    h1: "text-[clamp(2.5rem,1.5rem+4.5vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.035em]",
    h2: "text-[clamp(2rem,1.25rem+3vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.025em]",
    h3: "text-[clamp(1.5rem,1.125rem+1.5vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.015em]",
    h4: "text-xl md:text-2xl font-semibold leading-[1.2] tracking-[-0.01em]",
    eyebrow: "text-xs font-semibold uppercase tracking-[0.18em]",
  },
  body: {
    fontFamily: "var(--font-inter)",
    lead: "text-lg md:text-xl leading-[1.55] font-normal",
    base: "text-base leading-[1.65] font-normal",
    small: "text-sm leading-[1.5] font-normal",
    micro: "text-xs leading-[1.4] font-medium tracking-wide",
  },
  cta: {
    primary: "text-base font-semibold tracking-[-0.005em]",
    secondary: "text-sm font-semibold tracking-[0.01em]",
  },
} as const;

export const spacing = {
  sectionY: "clamp(5rem, 8vw, 9rem)",
  containerX: "clamp(1.5rem, 5vw, 4rem)",
  gutter: "clamp(1rem, 2vw, 2rem)",
} as const;

export const radii = {
  none: "0",
  sm: "0.5rem", // 8px — inputs, tags
  md: "0.75rem", // 12px — DEFAULT interactive elements
  lg: "1rem", // 16px — large cards, feature panels
  xl: "1.5rem", // 24px — hero containers, marquee sections
  full: "9999px",
} as const;

export const shadows = {
  xs: "0 1px 2px 0 rgb(11 17 32 / 0.05)",
  sm: "0 2px 4px -1px rgb(11 17 32 / 0.06), 0 1px 2px -1px rgb(11 17 32 / 0.04)",
  md: "0 8px 16px -4px rgb(11 17 32 / 0.08), 0 4px 8px -2px rgb(11 17 32 / 0.04)",
  lg: "0 16px 32px -8px rgb(11 17 32 / 0.10), 0 8px 16px -4px rgb(11 17 32 / 0.06)",
  focus: "0 0 0 3px rgb(26 86 219 / 0.25)",
  focusGold: "0 0 0 3px rgb(212 168 67 / 0.3)",
} as const;

export const motion = {
  duration: {
    instant: 0.1,
    fast: 0.2,
    base: 0.4,
    slow: 0.7,
    verySlow: 1.2,
  },
  easing: {
    easeOut: [0.16, 1, 0.3, 1] as const,
    easeInOut: [0.4, 0, 0.2, 1] as const,
    spring: { type: "spring" as const, stiffness: 400, damping: 30 },
    bounce: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
  stagger: {
    tight: 0.05,
    base: 0.08,
    loose: 0.12,
  },
} as const;

export const breakpoints = {
  mobile: 0,
  tablet: 640,
  desktop: 1024,
  large: 1280,
} as const;

export type Colors = typeof colors;
export type Typography = typeof typography;
export type Radii = typeof radii;
export type Shadows = typeof shadows;
export type Motion = typeof motion;
