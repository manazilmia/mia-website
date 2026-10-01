"use client";

import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Calendar03Icon,
  Location01Icon,
  Mic01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export type KajianCarouselItem = {
  id: string;
  title: string;
  scheduleAt?: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  speaker: string;
  posterUrl: string;
  posterAlt: string;
  blurDataUrl?: string;
};

export function KajianCarousel({
  items,
  children,
}: {
  items: KajianCarouselItem[];
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(items.length > 1);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    setCanGoBack(track.scrollLeft > 4);
    setCanGoForward(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollLeft = 0;
    const animationFrame = requestAnimationFrame(updateControls);
    const delayedCheck = window.setTimeout(updateControls, 250);
    const resizeObserver = new ResizeObserver(updateControls);
    resizeObserver.observe(track);
    track.querySelectorAll("article").forEach((card) => resizeObserver.observe(card));
    window.addEventListener("resize", updateControls);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(delayedCheck);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateControls);
    };
  }, [items.length, updateControls]);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    const firstCard = track?.querySelector<HTMLElement>("article");
    if (!track || !firstCard) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 16;
    track.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        {children}
        <div className="flex shrink-0 justify-end gap-2">
          <button
            type="button"
            aria-label="Kajian sebelumnya"
            onClick={() => move(-1)}
            disabled={!canGoBack}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-[#d9d1ca] bg-white text-[#4C4238] transition-colors hover:border-[#855f38] hover:text-[#855f38] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} size={18} strokeWidth={1.8} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Kajian berikutnya"
            onClick={() => move(1)}
            disabled={!canGoForward}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-[#d9d1ca] bg-white text-[#4C4238] transition-colors hover:border-[#855f38] hover:text-[#855f38] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <HugeiconsIcon icon={ArrowRight02Icon} size={18} strokeWidth={1.8} aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={updateControls}
        className="kajian-carousel-track -mx-6 mt-6 flex snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto px-6 pb-2 md:-mx-10 md:scroll-pl-10 md:px-10 lg:-mx-[60px] lg:scroll-pl-[60px] lg:px-[60px]"
        role="region"
        aria-label="Daftar jadwal kajian"
      >
        {items.map((item, index) => (
          <article
            key={item.id}
            className="flex h-[520px] w-[248px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-[#e4ded8] bg-white shadow-[0_8px_24px_rgba(30,21,12,.045)] sm:h-[530px] sm:w-[260px] lg:h-[540px] lg:w-[270px]"
            aria-label={`${index + 1} dari ${items.length}: ${item.title}`}
          >
            <div className="h-[300px] shrink-0 overflow-hidden bg-[#e8e0d8] sm:h-[310px] lg:h-[320px]">
              <Image
                src={item.posterUrl}
                alt={item.posterAlt}
                width={600}
                height={800}
                sizes="(min-width: 1024px) 270px, (min-width: 640px) 260px, 248px"
                className="h-full w-full object-cover"
                placeholder={item.blurDataUrl ? "blur" : "empty"}
                blurDataURL={item.blurDataUrl}
              />
            </div>

            <div className="p-4">
              <h3 className="font-display line-clamp-2 text-lg font-semibold leading-6 text-[#1e150c]">
                {item.title}
              </h3>

              <dl className="mt-4 space-y-3">
                <div className="flex items-start gap-2.5">
                  <HugeiconsIcon
                    icon={Calendar03Icon}
                    size={17}
                    strokeWidth={1.8}
                    className="mt-0.5 shrink-0 text-[#855f38]"
                    aria-hidden
                  />
                  <div>
                    <dt className="sr-only">Waktu</dt>
                    <dd className="text-[13px] leading-[19px] text-[#4C4238]">
                      <time dateTime={item.scheduleAt}>
                        {item.dateLabel}
                        {item.timeLabel ? (
                          <>
                            <br />
                            {item.timeLabel}
                          </>
                        ) : null}
                      </time>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <HugeiconsIcon
                    icon={Location01Icon}
                    size={17}
                    strokeWidth={1.8}
                    className="mt-0.5 shrink-0 text-[#048f51]"
                    aria-hidden
                  />
                  <div>
                    <dt className="sr-only">Tempat</dt>
                    <dd className="text-[13px] leading-[19px] text-[#4C4238]">
                      {item.location}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <HugeiconsIcon
                    icon={Mic01Icon}
                    size={17}
                    strokeWidth={1.8}
                    className="mt-0.5 shrink-0 text-[#855f38]"
                    aria-hidden
                  />
                  <div>
                    <dt className="sr-only">Pemateri</dt>
                    <dd className="text-[13px] font-medium leading-[19px] text-[#1e150c]">
                      {item.speaker}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
