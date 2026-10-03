"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type StudentLifeSlide =
  | {
      id: string;
      kind: "image";
      image: string;
      alt: string;
      position?: string;
    }
  | {
      id: string;
      kind: "video";
      embedUrl: string;
      title: string;
    };

type SlideDirection = "next" | "previous";

export function StudentLifeCarousel({ slides }: { slides: StudentLifeSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<SlideDirection>("next");
  const [isPaused, setIsPaused] = useState(false);
  const currentIndex = slides[activeIndex] ? activeIndex : 0;
  const activeSlide = slides[currentIndex];
  const previousSlide = previousIndex === null ? null : slides[previousIndex];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isPaused || reducedMotion || activeSlide.kind === "video" || slides.length < 2) return;

    const timer = window.setTimeout(() => {
      setPreviousIndex(currentIndex);
      setDirection("next");
      setActiveIndex((currentIndex + 1) % slides.length);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [activeSlide.kind, currentIndex, isPaused, slides.length]);

  useEffect(() => {
    if (previousIndex === null) return;

    const timer = window.setTimeout(() => setPreviousIndex(null), 900);
    return () => window.clearTimeout(timer);
  }, [activeIndex, previousIndex]);

  function showSlide(nextIndex: number, nextDirection: SlideDirection) {
    if (nextIndex === currentIndex) return;

    setPreviousIndex(currentIndex);
    setDirection(nextDirection);
    setActiveIndex(nextIndex);
  }

  function showPrevious() {
    showSlide((currentIndex - 1 + slides.length) % slides.length, "previous");
  }

  function showNext() {
    showSlide((currentIndex + 1) % slides.length, "next");
  }

  function selectSlide(index: number) {
    const forwardDistance = (index - currentIndex + slides.length) % slides.length;
    const backwardDistance = (currentIndex - index + slides.length) % slides.length;

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
      {previousSlide?.kind === "image" ? (
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
        aria-label={`${currentIndex + 1} dari ${slides.length}`}
        aria-live="polite"
      >
        {activeSlide.kind === "image" ? (
          <Image
            src={activeSlide.image}
            alt={activeSlide.alt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) calc(100vw - 80px), 1080px"
            className="object-cover"
            style={{ objectPosition: activeSlide.position ?? "center" }}
          />
        ) : (
          <iframe
            src={activeSlide.embedUrl}
            title={activeSlide.title}
            className="h-full w-full border-0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Slide sebelumnya"
            className="absolute left-3 top-1/2 z-20 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-black/30 text-3xl leading-none text-white opacity-100 backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-5 sm:size-10"
          >
            <span aria-hidden className="-translate-y-px">‹</span>
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Slide berikutnya"
            className="absolute right-3 top-1/2 z-20 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-black/30 text-3xl leading-none text-white opacity-100 backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 sm:size-10"
          >
            <span aria-hidden className="-translate-y-px">›</span>
          </button>
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-7 lg:bottom-[35px]">
            {slides.map((slide, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => selectSlide(index)}
                  aria-label={`Tampilkan slide ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`h-1.5 cursor-pointer rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30 ${
                    isActive ? "w-9 bg-white" : "w-1.5 bg-white/60 hover:bg-white"
                  }`}
                />
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}
