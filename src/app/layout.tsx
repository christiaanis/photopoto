import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chris Burger | Photographer",
  description:
    "Portrait, street, nature, and travel photography by Chris Burger (@chrispyphotos___).",
  openGraph: {
    title: "Chris Burger | Photographer",
    description: "Portrait, street, nature, and travel photography by Chris Burger.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-[#faf9f6] text-neutral-900 antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
