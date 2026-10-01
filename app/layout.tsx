import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteUrl } from "@/sanity/env";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
});

const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  weight: "200 800",
});

const thmanyahSerif = localFont({
  src: [
    {
      path: "./fonts/thmanyah-serif-text-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/thmanyah-serif-text-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/thmanyah-serif-text-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/thmanyah-serif-text-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/thmanyah-serif-text-black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-thmanyah-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Manazil Ibnu Abbas",
  description:
    "Ma’had Tahfizh Al-Qur’an setingkat SMP putra di Kota Batu dengan pendidikan Qurani, Bahasa Arab, dan ilmu syar’i.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${manrope.variable} ${thmanyahSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
