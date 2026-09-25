import type { Metadata } from "next";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  title: "Manazil Ibnu Abbas",
  description:
    "Ma’had Tahfizh Al-Qur’an setingkat SMP putra di Kota Batu dengan pendidikan Qurani, Bahasa Arab, dan ilmu syar’i.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
