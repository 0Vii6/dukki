import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FIZZORA — Electric Craft Soda & Botanical Spark",
  description: "Experience the next evolution of craft soda. Zero artificial sweeteners, organic botanical infusions, and electric effervescence.",
  keywords: ["craft soda", "botanical soda", "fizzy drinks", "organic soda", "fizzora"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <head>
        <meta name="theme-color" content="#060812" />
      </head>
      <body>{children}</body>
    </html>
  );
}
