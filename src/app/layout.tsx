import type { Metadata, Viewport } from "next";
import { Titillium_Web, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-titillium",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#E10600",
};

export const metadata: Metadata = {
  title: "F1 GRIDLE – The Ultimate Formula 1 Wordle & Guessing Game",
  description:
    "Test your Formula 1 racing knowledge! Guess mystery F1 drivers, constructors, and Grand Prix circuits with 7 attempts, 6 progressive telemetry hints, and Wordle-style feedback.",
  keywords: [
    "F1 Wordle",
    "Formula 1 game",
    "F1 trivia",
    "Guess the driver",
    "F1 circuit quiz",
    "Motorsport Wordle",
    "F1 constructor",
  ],
  authors: [{ name: "F1 Gridle Team" }],
  openGraph: {
    title: "F1 GRIDLE – The Ultimate Formula 1 Wordle",
    description: "Can you guess today's mystery F1 driver, constructor, and circuit in 7 attempts?",
    type: "website",
    siteName: "F1 GRIDLE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${titillium.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-[#050608] text-zinc-100 antialiased font-sans selection:bg-[#E10600] selection:text-white">
        {children}
      </body>
    </html>
  );
}
