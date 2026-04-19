import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        {/* Remaining sections (trust bar → footer) land per Section 4 of the build prompt. */}
      </main>
    </>
  );
}
