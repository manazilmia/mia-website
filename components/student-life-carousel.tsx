"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type StudentLifeSlide = {
  id: string;
  image: string;
  alt: string;
  position?: string;
};

type SlideDirection = "next" | "previous";

// Temporary images. Replace these entries with the final student-life photos.
export const studentLifeSlides: StudentLifeSlide[] = [
  {
    id: "lingkungan",
    image: "/figma/caro-1.png",
    alt: "Lingkungan hijau tempat santri belajar dan bertumbuh",
    position: "center 46%",
  },
  {
    id: "kelas-terbuka",
    image: "/figma/caro-2.jpg",
    alt: "Santri belajar bersama di ruang kelas terbuka",
    position: "center",
  },
  {
    id: "asrama",
    image: "/figma/caro-3.jpg",
    alt: "Bangunan asrama Manazil Ibnu Abbas",
    position: "center",
  },
  {
    id: "kebersamaan",
    image: "/figma/caro-4.jpg",
    alt: "Suasana keseharian santri di lingkungan Manazil Ibnu Abbas",
    position: "center 48%",
  },
];

export function StudentLifeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<SlideDirection>("next");
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = studentLifeSlides[activeIndex];
  const previousSlide =
    previousIndex === null ? null : studentLifeSlides[previousIndex];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isPaused || reducedMotion) return;

    const timer = window.setTimeout(() => {
      setPreviousIndex(activeIndex);
      setDirection("next");
      setActiveIndex((activeIndex + 1) % studentLifeSlides.length);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused]);

  useEffect(() => {
    if (previousIndex === null) return;

    const timer = window.setTimeout(() => setPreviousIndex(null), 900);
    return () => window.clearTimeout(timer);
  }, [activeIndex, previousIndex]);

  function showSlide(nextIndex: number, nextDirection: SlideDirection) {
    if (nextIndex === activeIndex) return;

    setPreviousIndex(activeIndex);
    setDirection(nextDirection);
    setActiveIndex(nextIndex);
  }

  function showPrevious() {
    showSlide(
      (activeIndex - 1 + studentLifeSlides.length) % studentLifeSlides.length,
      "previous",
    );
  }

  function showNext() {
    showSlide((activeIndex + 1) % studentLifeSlides.length, "next");
  }

  function selectSlide(index: number) {
    const forwardDistance =
      (index - activeIndex + studentLifeSlides.length) % studentLifeSlides.length;
    const backwardDistance =
      (activeIndex - index + studentLifeSlides.length) % studentLifeSlides.length;

    showSlide(index, forwardDistance <= backwardDistance ? "next" : "previous");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  }

  return (
    <div
      className="group relative mt-8 h-[280px] overflow-hidden rounded-2xl border border-[#f1ece9] bg-[#1e150c] [perspective:1800px] sm:h-[340px] md:mt-10 md:h-[380px] lg:mt-12 lg:h-[480px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Galeri kehidupan santri"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      {previousSlide ? (
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={previousSlide.image}
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) calc(100vw - 80px), 1080px"
            className="object-cover"
            style={{ objectPosition: previousSlide.position ?? "center" }}
          />
        </div>
      ) : null}

      <div
        key={activeSlide.id}
        className={`absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d] ${
          previousSlide
            ? direction === "next"
              ? "book-page-next"
              : "book-page-previous"
            : ""
        }`}
        role="group"
        aria-roledescription="slide"
        aria-label={`${activeIndex + 1} dari ${studentLifeSlides.length}`}
        aria-live="polite"
      >
        <Image
          src={activeSlide.image}
          alt={activeSlide.alt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) calc(100vw - 80px), 1080px"
          className="object-cover"
          style={{ objectPosition: activeSlide.position ?? "center" }}
        />
      </div>

      <button
        type="button"
        onClick={showPrevious}
        aria-label="Gambar sebelumnya"
        className="absolute left-3 top-1/2 z-20 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-black/30 text-3xl leading-none text-white opacity-100 backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-5 sm:size-10"
      >
        <span aria-hidden className="-translate-y-px">‹</span>
      </button>
      <button
        type="button"
        onClick={showNext}
        aria-label="Gambar berikutnya"
        className="absolute right-3 top-1/2 z-20 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-black/30 text-3xl leading-none text-white opacity-100 backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 sm:size-10"
      >
        <span aria-hidden className="-translate-y-px">›</span>
      </button>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-7 lg:bottom-[35px]">
        {studentLifeSlides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => selectSlide(index)}
              aria-label={`Tampilkan gambar ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30 ${
                isActive ? "w-9 bg-white" : "w-1.5 bg-white/60 hover:bg-white"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
