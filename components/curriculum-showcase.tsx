"use client";

import {
  AlphabetArabicIcon,
  Books01Icon,
  Mosque01Icon,
  Quran01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import Image from "next/image";
import { useState } from "react";

type CurriculumItem = {
  id: string;
  label: string;
  icon: IconSvgElement;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

// Temporary showcase data. Replace these entries when the final curriculum
// copy and photography are ready; the interaction can stay unchanged.
export const curriculumItems: CurriculumItem[] = [
  {
    id: "tahfizh",
    label: "Tahfizh Al-Qur’an",
    icon: Quran01Icon,
    description:
      "Hafalan minimal 10 juz mutqin disertai pembelajaran dan penguatan tajwid.",
    image: "/figma/campus.png",
    imageAlt: "Santri belajar bersama di ruang kelas terbuka",
  },
  {
    id: "bahasa-arab",
    label: "Bahasa Arab",
    icon: AlphabetArabicIcon,
    description:
      "Mendengar, berbicara, membaca, menulis, Nahwu, dan Shorf.",
    image: "/figma/kur-2.jpg",
    imageAlt: "Lingkungan asrama yang mendukung pembiasaan Bahasa Arab",
    imagePosition: "center 46%",
  },
  {
    id: "ilmu-diniyah",
    label: "Ilmu Diniyah",
    icon: Mosque01Icon,
    description:
      "Aqidah, Akhlak, Fiqih, Hadits, Tafsir, dan Sirah melalui kitab-kitab ringan berbahasa Arab.",
    image: "/figma/kur-3.jpg",
    imageAlt: "Lingkungan belajar yang mendukung pendidikan diniyah",
    imagePosition: "center 43%",
  },
  {
    id: "ilmu-umum",
    label: "Ilmu Umum",
    icon: Books01Icon,
    description:
      "Bahasa Indonesia, Bahasa Inggris, Matematika, IPA, IPS, Pendidikan Pancasila, dan Informatika.",
    image: "/figma/kur-4.jpg",
    imageAlt: "Kegiatan belajar ilmu umum para santri",
    imagePosition: "right center",
  },
];

export function CurriculumShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = curriculumItems[activeIndex];

  function selectItem(index: number) {
    setActiveIndex(index);
  }

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex =
      (activeIndex + direction + curriculumItems.length) % curriculumItems.length;

    selectItem(nextIndex);
    document.getElementById(`curriculum-tab-${curriculumItems[nextIndex].id}`)?.focus();
  }

  return (
    <div>
      <div
        className="mt-5 flex flex-wrap gap-2 sm:gap-3"
        role="tablist"
        aria-label="Kategori kurikulum"
        onKeyDown={handleTabKeyDown}
      >
        {curriculumItems.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.id}
              id={`curriculum-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="curriculum-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectItem(index)}
              className={`inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm leading-[22px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#855f38]/40 focus-visible:ring-offset-2 ${
                isActive
                  ? "border-[#855f38] bg-[#f1ece9] font-medium text-[#855f38]"
                  : "border-[#e7e7e7] bg-white text-[#4C4238] hover:border-[#c7b8aa] hover:bg-[#faf8f6] hover:text-[#855f38]"
              }`}
            >
              <HugeiconsIcon
                icon={item.icon}
                size={18}
                color="currentColor"
                strokeWidth={1.7}
                className="shrink-0"
                aria-hidden
              />
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id="curriculum-panel"
        role="tabpanel"
        aria-labelledby={`curriculum-tab-${activeItem.id}`}
        aria-live="polite"
        className="relative mt-4 h-[460px] overflow-hidden rounded-2xl border border-[#f1ece9] bg-[#f9f9f9] sm:h-[420px] md:h-[330px] lg:h-[291px]"
      >
        <div key={activeItem.id} className="curriculum-panel-enter absolute inset-0">
          <p className="font-display absolute left-6 top-8 z-20 w-[calc(100%-3rem)] text-xl leading-[1.38] text-[#4C4238] sm:left-8 sm:w-[calc(100%-4rem)] sm:text-2xl md:left-10 md:top-10 md:w-[40%] lg:left-[68px] lg:top-[48px] lg:w-[341px]">
            {activeItem.description}
          </p>
          <div className="absolute bottom-0 right-0 h-[57%] w-full md:top-0 md:h-full md:w-[55%] lg:w-[518px]">
            <Image
              src={activeItem.image}
              alt={activeItem.imageAlt}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 55vw, 518px"
              className="object-cover"
              style={{ objectPosition: activeItem.imagePosition ?? "center" }}
            />
          </div>
          <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,#f9f9f9_0%,#f9f9f9_39%,rgba(249,249,249,.72)_50%,transparent_68%)] md:hidden" />
          <div className="absolute right-0 top-0 z-10 hidden h-full w-[70%] bg-[linear-gradient(90deg,#f9f9f9_0%,#f9f9f9_28%,rgba(249,249,249,.96)_42%,rgba(249,249,249,.72)_58%,rgba(249,249,249,.32)_78%,transparent_100%)] md:block lg:w-[700px]" />
        </div>

        <div className="absolute bottom-6 left-6 z-30 flex items-center gap-2 sm:left-8 md:bottom-8 md:left-10 lg:bottom-[49px] lg:left-[68px]">
          {curriculumItems.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectItem(index)}
                aria-label={`Tampilkan ${item.label}`}
                aria-current={isActive ? "true" : undefined}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#855f38]/50 focus-visible:ring-offset-2 ${
                  isActive
                    ? "w-9 bg-[#855f38]"
                    : "w-1.5 bg-[#c7c1bb] hover:bg-[#855f38]"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
