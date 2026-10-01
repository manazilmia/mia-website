import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  KajianCarousel,
  type KajianCarouselItem,
} from "@/components/kajian-carousel";
import { getKajianSchedule } from "@/sanity/lib/data";
import { formatKajianDate, formatKajianTime } from "@/sanity/lib/format";
import { urlFor } from "@/sanity/lib/image";

export async function KajianSchedule() {
  const kajian = await getKajianSchedule();
  const carouselItems: KajianCarouselItem[] = kajian.map((item) => {
    const legacyDate = item.scheduleAt
      ? formatKajianDate(item.scheduleAt)
      : "Jadwal akan diumumkan";
    const legacyTime = item.scheduleAt ? formatKajianTime(item.scheduleAt) : "";

    return {
      id: item._id,
      title: item.title,
      scheduleAt: item.scheduleAt,
      dateLabel: item.schedule?.trim() || legacyDate,
      timeLabel: item.time?.trim() || legacyTime,
      location: item.location,
      speaker: item.speaker,
      posterUrl: urlFor(item.poster)
        .width(600)
        .height(800)
        .fit("crop")
        .auto("format")
        .url(),
      posterAlt: item.poster.alt || `Poster kajian ${item.title}`,
      blurDataUrl: item.poster.asset.metadata?.lqip,
    };
  });
  const sectionIntro = (
    <div className="max-w-[620px]">
      <p className="text-sm font-medium uppercase leading-[22px] tracking-[0.7px] text-[#048f51]">
        Majelis Taklim
      </p>
      <h2 className="font-display mt-1 text-[28px] font-bold leading-[1.3] text-[#1e150c] sm:text-[32px]">
        Bertemu dan Belajar di Majelis Taklim
      </h2>
      <p className="mt-3 text-sm leading-[22px] text-[#4C4238]">
Temukan jadwal majelis taklim rutin, lengkap dengan waktu, lokasi, dan pemateri setiap pertemuan.      </p>
    </div>
  );

  return (
    <section id="kajian" className="border-b border-[#e7e7e7] bg-white">
      <div className="mx-auto w-full max-w-[1200px] border-x-0 border-[#e7e7e7] px-6 py-12 md:border-x md:px-10 md:py-14 lg:px-[60px] lg:py-16">
        {carouselItems.length > 0 ? (
          <KajianCarousel items={carouselItems}>{sectionIntro}</KajianCarousel>
        ) : (
          <>
            {sectionIntro}
            <div className="mt-8 flex min-h-[220px] items-center justify-center border-y border-[#e4ded8] bg-white px-6 py-12 text-center">
              <div className="max-w-[430px]">
                <span className="mx-auto inline-flex items-center justify-center text-[#048f51]">
                  <HugeiconsIcon icon={Calendar03Icon} size={24} strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="font-display mt-4 text-xl font-semibold text-[#1e150c]">
                  Jadwal kajian akan diumumkan
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#4C4238]">
                  Silakan kembali lagi untuk melihat informasi kajian berikutnya.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
