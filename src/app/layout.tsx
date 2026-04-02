import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PlanetVM \u2014 Engineered Clarity",
  description: "Premium mechanical keyboards, precision-engineered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full overflow-x-hidden bg-[#0b0b0b] font-sans text-white">
        {children}
      </body>
    </html>
  );
}
