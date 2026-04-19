export default function HomePage() {
  // Placeholder during token/theme setup. Sections land here one at a time
  // per Section 4 of the build prompt, starting with nav + hero.
  return (
    <main className="min-h-screen px-container py-section">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
        People of Data
      </p>
      <h1 className="mt-6 max-w-[18ch] text-balance text-[clamp(2.5rem,1.5rem+4.5vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-text-primary">
        Design tokens ready.
      </h1>
      <p className="mt-6 max-w-[65ch] text-pretty text-lg leading-[1.55] text-text-secondary">
        Tailwind v4 theme and <code>/lib/design-tokens.ts</code> are in place.
        Nav and hero land next, per Section 4.
      </p>
    </main>
  );
}
