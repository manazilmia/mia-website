import Image from "next/image";

import { ActivityPill, type ActivityIconName } from "@/components/activity-pill";
import { CurriculumShowcase } from "@/components/curriculum-showcase";
import { RegistrationCta } from "@/components/registration-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StudentLifeCarousel } from "@/components/student-life-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const tahfizhFeatures = [
  { icon: "/figma/target.svg", title: "Target", body: "Minimal 10 juz mutqin" },
  {
    icon: "/figma/halaqah.svg",
    title: "Halaqah",
    body: "Disesuaikan dengan tingkat kemampuan santri",
  },
  {
    icon: "/figma/quran.svg",
    title: "Tajwid",
    body: "Penguatan kualitas bacaan Al-Qur’an",
  },
  {
    icon: "/figma/evaluation.svg",
    title: "Evaluasi",
    body: "Berkala hingga Tasmi’ Akbar",
  },
];

const arabicFeatures = [
  {
    icon: "/figma/thinking.svg",
    title: "Keterampilan",
    body: "Mendengar, berbicara, membaca, dan menulis",
  },
  { icon: "/figma/access.svg", title: "Kaidah", body: "Nahwu dan Shorf" },
  { icon: "/figma/material.svg", title: "Kosakata", body: "Mufradat dan hiwar" },
  {
    icon: "/figma/daily.svg",
    title: "Pembiasaan",
    body: "Digunakan dalam aktivitas sehari-hari",
  },
];

const facilities = [
  { icon: "/figma/mosque.svg", label: "Masjid untuk ibadah dan kajian" },
  { icon: "/figma/school.svg", label: "Ruang kelas indoor & outdoor" },
  { icon: "/figma/building.svg", label: "Asrama, 1 lumbung untuk 15 santri" },
  { icon: "/figma/field.svg", label: "Lapangan olahraga" },
];

const activities = [
  { label: "Sepak Bola", icon: "football" },
  { label: "Berenang", icon: "swimming" },
  { label: "Panahan", icon: "archery" },
  { label: "Joging", icon: "running" },
  { label: "Rihlah/Camping", icon: "camping" },
  { label: "Masak Bersama", icon: "cooking" },
  { label: "Pertukangan", icon: "carpentry" },
  { label: "Pertanian", icon: "farming" },
  { label: "Keterampilan", icon: "skills" },
] satisfies { label: string; icon: ActivityIconName }[];

function SectionFrame({
  id,
  height,
  children,
  className = "",
}: {
  id?: string;
  height: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-b border-[#e7e7e7] bg-white ${className}`}>
      <div
        className={`mx-auto ${height} w-full max-w-[1200px] border-x-0 border-[#e7e7e7] md:border-x`}
      >
        {children}
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  large = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  large?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : "text-left"}>
      <p className="mb-1 text-sm font-medium uppercase leading-[22px] tracking-[0.7px] text-[#048f51]">
        {eyebrow}
      </p>
      <h2
        className={`font-display font-bold text-[#1e150c] ${
          large
            ? "text-[30px] leading-[1.3] sm:text-[36px] lg:text-[40px] lg:leading-[1.38]"
            : "text-[28px] leading-[1.3] sm:text-[30px] lg:text-[32px] lg:leading-[1.38]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 text-sm leading-[22px] text-[#4C4238] ${
            centered ? "mx-auto" : "max-w-[515px]"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ProgramFeature({
  icon,
  title,
  body,
  accent,
}: {
  icon: string;
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <Card className="min-h-[142px] rounded-xl sm:min-h-[154px]">
      <CardContent className="p-4">
        <Image src={icon} alt="" width={24} height={24} aria-hidden />
        <p className={`mt-2 text-[13px] font-semibold leading-5 ${accent}`}>{title}</p>
        <p className="mt-2 text-xs leading-[15px] text-[#4C4238]">{body}</p>
      </CardContent>
    </Card>
  );
}

function ProgramColumn({
  title,
  description,
  illustration,
  features,
  green = false,
}: {
  title: string;
  description: string;
  illustration: string;
  features: typeof tahfizhFeatures;
  green?: boolean;
}) {
  const accent = green ? "text-[#048f51]" : "text-[#855f38]";

  return (
    <div className="w-full">
      <Card className="relative h-[240px] overflow-hidden sm:h-[227px]">
        <CardContent className="absolute left-6 top-7 z-10 w-[58%] p-0 sm:left-8 sm:top-8 sm:w-[226px]">
          <h3 className={`font-display text-xl font-bold leading-[27px] ${accent}`}>{title}</h3>
          <p className="mt-6 text-sm leading-5 text-[#4C4238]">{description}</p>
        </CardContent>
        {green ? (
          <div className="absolute -right-3 top-0 h-[227px] w-[227px] origin-right scale-75 opacity-75 sm:right-0 sm:scale-100 sm:opacity-100" aria-hidden>
            <Image
              src={illustration}
              alt=""
              width={217}
              height={227}
              className="absolute left-0 top-0 h-[227px] w-[217px]"
            />
            <Image
              src="/figma/arabic-decoration.svg"
              alt=""
              width={227}
              height={217}
              className="absolute left-0 top-0 h-[217px] w-[227px]"
            />
            <Image
              src="/figma/language.svg"
              alt=""
              width={105}
              height={96}
              className="absolute left-[61px] top-[65px] h-24 w-[105px]"
            />
          </div>
        ) : (
          <Image
            src={illustration}
            alt=""
            width={227}
            height={227}
            className="absolute -right-3 top-0 h-[227px] w-[227px] origin-right scale-75 opacity-75 sm:right-0 sm:scale-100 sm:opacity-100"
            aria-hidden
          />
        )}
      </Card>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {features.map((feature) => (
          <ProgramFeature key={feature.title} {...feature} accent={accent} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-w-0 overflow-x-clip bg-white text-[#1e150c]">
      <SiteHeader />

      <section id="tentang" className="relative flex flex-col overflow-hidden bg-[#f1ece9] lg:block lg:h-[700px]">
        <div className="relative order-2 h-[280px] w-full sm:h-[360px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[886px]">
          <Image
            src="/figma/mia-hero-tall.jpg"
            alt="Kompleks asrama Manazil Ibnu Abbas"
            fill
            priority
            loading="eager"
            sizes="(max-width: 1023px) 100vw, 886px"
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f1ece9_0%,rgba(241,236,233,.55)_18%,transparent_46%)] lg:bg-[linear-gradient(90deg,#f1ece9_0%,rgba(241,236,233,.93)_5%,rgba(241,236,233,.5)_20%,transparent_50%)]" />
        </div>
        <div className="relative order-1 mx-auto w-full max-w-[1200px] px-6 py-14 md:border-x md:border-[#dbd7d3] md:px-10 md:py-16 lg:h-full lg:px-0 lg:py-0">
          <div className="flex w-full flex-col justify-center lg:h-full lg:w-[536px] lg:pl-[60px]">
            <h1 className="font-display w-full text-[34px] font-semibold leading-[1.25] text-[#1e150c] sm:text-[38px] lg:w-[476px] lg:text-[40px] lg:leading-[1.38]">
              Membentuk Generasi Qurani, Berilmu, dan Berkarakter Islami
            </h1>
            <p className="mt-6 w-full max-w-[540px] text-sm font-medium leading-[22px] text-[#4C4238] lg:w-[476px]">
              Ma’had Tahfizh Al-Qur’an setingkat SMP putra di Kota Batu dengan program
              Tahfizh Al-Qur’an, Bahasa Arab, Ilmu Syar’i, serta pendidikan formal.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
              <Button href="#pendaftaran">Info pendaftaran</Button>
              <Button href="#program" variant="outline">
                Lihat Program Pendidikan
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SectionFrame id="program" height="lg:h-[748px]">
        <div className="px-6 py-16 md:px-10 md:py-20 lg:px-[60px] lg:pb-0 lg:pt-[104px]">
          <SectionHeading
            eyebrow="Program Unggulan"
            title="Dua Program Utama"
            description="Dirancang untuk membekali santri dengan hafalan Al-Qur’an yang mutqin dan kemampuan dasar Bahasa Arab."
          />
          <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-6 lg:grid-cols-2 lg:gap-8">
            <ProgramColumn
              title="Tahfizh Al-Qur’an"
              description="Program tahfizh selama 3 tahun dengan pembinaan bacaan, hafalan, dan muraja’ah secara terstruktur."
              illustration="/figma/tahfizh-illustration.svg"
              features={tahfizhFeatures}
            />
            <ProgramColumn
              title="Bahasa Arab"
              description="Pembelajaran untuk membekali santri agar mampu memahami dan menggunakan Bahasa Arab secara bertahap."
              illustration="/figma/arabic-illustration.svg"
              features={arabicFeatures}
              green
            />
          </div>
        </div>
      </SectionFrame>

      <SectionFrame id="kurikulum" height="lg:h-[748px]">
        <div className="px-6 py-16 md:px-10 md:py-20 lg:px-[60px] lg:pb-0 lg:pt-[114px]">
          <SectionHeading
            eyebrow="Kurikulum"
            title="Kurikulum yang Seimbang dan Terarah"
            description="Kurikulum MIA memadukan pendidikan Al-Qur’an, ilmu syar’i, Bahasa Arab, dan ilmu umum untuk membangun bekal keilmuan santri secara menyeluruh dan bertahap."
          />
          <CurriculumShowcase />
        </div>
      </SectionFrame>

      <SectionFrame id="fasilitas" height="lg:h-[748px]">
        <div className="flex flex-col gap-10 px-6 py-16 md:px-10 md:py-20 lg:flex-row lg:items-center lg:gap-[58px] lg:px-[60px] lg:pb-0 lg:pt-[113px]">
          <div className="order-2 grid w-full grid-cols-2 gap-3 lg:order-1 lg:w-[565px]">
            <div className="relative col-span-2 h-[220px] overflow-hidden rounded-2xl border border-[#f1ece9] bg-[#f9f9f9] sm:h-[300px] lg:h-[255px]">
              <Image
                src="/figma/mia-2.png"
                alt="Pemandangan pegunungan dan lingkungan Kota Batu"
                fill
                sizes="(max-width: 1023px) 100vw, 565px"
                className="object-cover object-[50%_45%]"
              />
            </div>
            <div className="relative h-[180px] overflow-hidden rounded-2xl border border-[#f1ece9] bg-[#f9f9f9] sm:h-[240px] lg:h-[255px]">
              <Image
                src="/figma/student-life.png"
                alt="Ruang belajar terbuka"
                fill
                sizes="(max-width: 1023px) 50vw, 277px"
                className="object-cover"
              />
            </div>
            <div className="relative h-[180px] overflow-hidden rounded-2xl border border-[#f1ece9] bg-[#f9f9f9] sm:h-[240px] lg:h-[255px]">
              <Image
                src="/figma/mia-3.png"
                alt="Asrama Manazil Ibnu Abbas"
                fill
                sizes="(max-width: 1023px) 50vw, 277px"
                className="object-cover object-right"
              />
            </div>
          </div>
          <div className="order-1 w-full lg:order-2 lg:w-[457px]">
            <SectionHeading
              eyebrow="Fasilitas"
              title="Belajar dan Bertumbuh di Lingkungan Kota Batu"
              description="MIA menyediakan lingkungan Ma’had yang asri dan alami di tengah Kota Batu, dilengkapi dengan:"
            />
            <ul className="mt-6 space-y-3">
              {facilities.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm leading-[22px] text-[#4C4238]">
                  <Image src={item.icon} alt="" width={20} height={20} aria-hidden />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame height="lg:h-[645px]">
        <div className="flex flex-col gap-10 px-6 py-16 md:px-10 md:py-20 lg:flex-row lg:items-center lg:gap-12 lg:px-[60px] lg:pb-0 lg:pt-[165px]">
          <div className="w-full lg:w-[521px]">
            <SectionHeading
              eyebrow="Pengajar"
              title="Dibimbing oleh Tenaga Pengajar dengan Latar Pendidikan Syar’i"
              description="Pengajar MIA memiliki latar pendidikan antara lain dari LIPIA Jakarta, STAIN Kediri, Ma’had Ar Rosyad Kediri, Darul Hadits Yaman, dan STDI Imam Syafi’i Jember."
            />
          </div>
          <div className="w-full lg:w-[511px]">
            <Card className="relative min-h-[146px] overflow-hidden p-6">
              <Image
                src="/figma/teacher-decoration.svg"
                alt=""
                width={262}
                height={262}
                className="absolute -right-[121px] -top-[124px]"
                aria-hidden
              />
              <Image src="/figma/teacher.svg" alt="" width={24} height={24} aria-hidden />
              <p className="mt-2 text-sm font-bold leading-[22px] text-[#4C4238]">7 Tenaga Pengajar</p>
              <p className="mt-2 text-[13px] leading-4 text-[#4C4238]">
                Membimbing proses pembelajaran ilmu syar’i dan Bahasa Arab sesuai bidang keahlian.
              </p>
            </Card>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Card className="relative min-h-[160px] overflow-hidden p-6">
                <Image
                  src="/figma/teacher-decoration.svg"
                  alt=""
                  width={262}
                  height={262}
                  className="absolute -right-[113px] -top-[176px]"
                  aria-hidden
                />
                <Image src="/figma/mentor.svg" alt="" width={24} height={24} aria-hidden />
                <p className="mt-2 text-sm font-bold leading-[22px] text-[#4C4238]">3 Musyrif</p>
                <p className="mt-2 text-[13px] leading-4 text-[#4C4238]">
                  Mendampingi keseharian santri serta pembinaan adab, ibadah, dan kedisiplinan.
                </p>
              </Card>
              <Card className="relative min-h-[160px] overflow-hidden p-6">
                <Image
                  src="/figma/teacher-decoration.svg"
                  alt=""
                  width={262}
                  height={262}
                  className="absolute -right-[113px] -top-[176px]"
                  aria-hidden
                />
                <Image src="/figma/mentor.svg" alt="" width={24} height={24} aria-hidden />
                <p className="mt-2 text-sm font-bold leading-[22px] text-[#4C4238]">2 Muhaffizh</p>
                <p className="mt-2 text-[13px] leading-4 text-[#4C4238]">
                  Membimbing hafalan, muraja’ah, serta menjaga kualitas bacaan Al-Qur’an.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame id="kehidupan" height="lg:h-[932px]">
        <div className="px-6 py-16 md:px-10 md:py-20 lg:px-[60px] lg:pb-0 lg:pt-[100px]">
          <SectionHeading
            eyebrow="Kehidupan Santri"
            title="Belajar, Beribadah, dan Bertumbuh Bersama"
            description="Keseharian santri dibangun melalui shalat berjamaah, halaqah Al-Qur’an, KBM, muraja’ah, monitoring ibadah, kegiatan fisik, dan waktu istirahat yang terjadwal."
            centered
            large
          />
          <div className="mt-4 text-center">
            <p className="text-sm leading-[22px] text-[#4C4238]">
              Pembinaan juga dilengkapi berbagai kegiatan:
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {activities.map((activity) => (
                <ActivityPill
                  key={activity.label}
                  label={activity.label}
                  icon={activity.icon}
                />
              ))}
            </div>
          </div>
          <StudentLifeCarousel />
        </div>
      </SectionFrame>

      <RegistrationCta />
      <SiteFooter />
    </main>
  );
}
