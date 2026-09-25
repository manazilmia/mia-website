"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Tentang kami", href: "#tentang" },
  { label: "Program", href: "#program" },
  { label: "Kurikulum", href: "#kurikulum" },
  { label: "Fasilitas", href: "#fasilitas" },
  { label: "Kehidupan Santri", href: "#kehidupan" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#dbd7d3] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[64px] w-full max-w-[1200px] items-center justify-between px-6 md:px-10 lg:h-[57px] lg:px-10">
        <a
          href="#tentang"
          className="flex min-w-0 items-center gap-3 sm:gap-4"
          aria-label="Manazil Ibnu Abbas"
          onClick={closeMenu}
        >
          <Image
            src="/figma/logo.png"
            alt="Logo Manazil Ibnu Abbas"
            width={50}
            height={40}
            priority
            className="h-9 w-[45px] shrink-0 object-contain lg:h-10 lg:w-[50px]"
          />
          <span className="truncate text-sm font-semibold">Manazil Ibnu Abbas</span>
        </a>

        <nav className="hidden items-center gap-[22px] text-xs lg:flex" aria-label="Navigasi utama">
          {navigation.map((item) => (
            <a
              key={item.label}
              className="transition-colors hover:text-[#855f38]"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
          <Button href="#pendaftaran" size="sm">
            Info pendaftaran
          </Button>
        </nav>

        <button
          type="button"
          className="flex size-10 shrink-0 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-lg border border-[#dbd7d3] text-[#1e150c] transition-colors hover:bg-[#f1ece9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#855f38]/40 lg:hidden"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span
            aria-hidden
            className={`h-0.5 w-5 rounded-full bg-current transition-transform ${
              isOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            aria-hidden
            className={`h-0.5 w-5 rounded-full bg-current transition-opacity ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            aria-hidden
            className={`h-0.5 w-5 rounded-full bg-current transition-transform ${
              isOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`absolute left-0 right-0 top-full border-b border-[#dbd7d3] bg-white shadow-[0_12px_30px_rgba(30,21,12,.08)] transition-all duration-200 lg:hidden ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav
          className="mx-auto flex w-full max-w-[1200px] flex-col px-6 py-4 md:px-10"
          aria-label="Navigasi seluler"
        >
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="border-b border-[#eeeae6] py-3 text-sm text-[#4C4238] transition-colors last:border-b-0 hover:text-[#855f38]"
            >
              {item.label}
            </a>
          ))}
          <Button href="#pendaftaran" className="mt-4 w-full" onClick={closeMenu}>
            Info pendaftaran
          </Button>
        </nav>
      </div>
    </header>
  );
}
