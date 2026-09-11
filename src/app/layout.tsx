import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nilex Fashion House — Modern Menswear, Crafted for the Modern Man",
  description:
    "Nilex Fashion House — a modern menswear atelier crafting elevated footwear, knitwear, outerwear and accessories. Discover the new collection.",
  keywords: [
    "Nilex",
    "Nilex Fashion House",
    "menswear",
    "men's clothing",
    "footwear",
    "knitwear",
    "outerwear",
    "sneakers",
    "fashion house",
    "modern menswear",
  ],
  authors: [{ name: "Nilex Fashion House" }],
  icons: {
    icon: "/images/nilex-logo.jpg",
  },
  openGraph: {
    title: "Nilex Fashion House",
    description: "Modern menswear, crafted for the modern man.",
    siteName: "Nilex Fashion House",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nilex Fashion House",
    description: "Modern menswear, crafted for the modern man.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden max-w-full">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground overflow-x-hidden max-w-full w-full relative`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
