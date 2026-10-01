import Image from "next/image";
import { Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSflJCm1lfWr8RsmqfOBHtMF8MRqtM8tm5BGZcrsoATMy-8E_w/viewform";
const locationUrl = "https://www.google.com/maps/place/Manazil+Ibnu+Abbas+(+MIA)/@-7.873949,112.5365052,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7881079d5e1c77:0x73e1025310090cd0!8m2!3d-7.873949!4d112.5365052!16s%2Fg%2F11vwyygt95?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D";

const registrationDetails = [
  {
    label: "Program Pendidikan",
    value: "Setara SMP & SMA",
    description: "Sekolah Tahfizh Putra, Angkatan IV SMP dan Angkatan I SMA.",
  },
  {
    label: "Periode Pendaftaran",
    value: "20 Sep–20 Des 2026",
    description: "Pendaftaran calon santri dilakukan secara online.",
  },
  {
    label: "Jadwal Tes",
    value: "Ahad, 27 Desember 2026",
    description: "Seleksi calon santri dan wawancara bersama wali santri.",
  },
];

export function RegistrationCta() {
  return (
    <section id="pendaftaran" className="bg-[#f1ece9]">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 border-x-0 border-[#dbd7d3] px-6 py-16 md:border-x md:px-10 md:py-20 lg:grid-cols-[minmax(300px,430px)_1fr] lg:gap-[72px] lg:px-[60px]">
        <div className="mx-auto w-full max-w-[430px]">
          <div className="overflow-hidden rounded-[20px] border border-[#d9d2cb] bg-white shadow-[0_20px_55px_rgba(45,31,19,0.14)]">
            <Image
              src="/figma/psb-2027-poster.png"
              alt="Poster Penerimaan Santri Baru Ma'had Manazil Ibnu Abbas Tahun Ajaran 2027/2028"
              width={1131}
              height={1600}
              sizes="(min-width: 1024px) 430px, (min-width: 640px) 60vw, calc(100vw - 48px)"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div>
          {/* <p className="text-sm font-medium uppercase leading-[22px] tracking-[0.7px] text-[#048f51]">
            Pendaftaran Santri Baru MIA
          </p> */}
          <h2 className="font-display mt-2 text-[32px] font-semibold leading-[1.25] text-[#1e150c] sm:text-[36px] lg:text-[40px]">
            Penerimaan Santri Baru TA 2027/2028
          </h2>
          <p className="mt-5 max-w-[570px] text-sm leading-[22px] text-[#4C4238]">
            Pendaftaran Sekolah Tahfizh
            Putra jenjang setara SMP dan SMA kini dibuka dengan kuota terbatas.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {registrationDetails.map((detail, index) => (
              <Card
                key={detail.label}
                className={`bg-white/75 p-5 ${index === 2 ? "sm:col-span-2" : ""}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.6px] text-[#855f38]">
                  {detail.label}
                </p>
                <h3 className="font-display mt-2 text-lg font-semibold leading-6 text-[#1e150c]">
                  {detail.value}
                </h3>
                <p className="mt-1.5 text-[13px] leading-5 text-[#4C4238]">
                  {detail.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
            <Button href={registrationUrl} target="_blank" rel="noopener noreferrer">
              Daftar Online
            </Button>
            <Button
              href={locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="gap-2"
            >
              <HugeiconsIcon
                icon={Location01Icon}
                size={17}
                color="currentColor"
                strokeWidth={1.8}
                aria-hidden
              />
              Lihat Lokasi
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
