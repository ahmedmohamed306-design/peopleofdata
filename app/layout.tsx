import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

// Display — headings and large typographic moments
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  preload: true,
});

// Body — paragraphs and UI
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "People of Data — Egypt's AI & Data Community",
  description:
    "Learn, build, hire, and get hired — across Egypt's most ambitious community of AI engineers, data scientists, and founders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Arabic font variable slot reserved for v2. Do not load yet — keeps bundle lean.
  // When ready, swap to next/font/google's Noto_Sans_Arabic and set `--font-arabic`.
  const arabicVariable = "";

  return (
    <html lang="en" dir="ltr">
      <body
        className={`${jakarta.variable} ${inter.variable} ${arabicVariable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
