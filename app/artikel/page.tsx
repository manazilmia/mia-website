import type { Metadata } from "next";

import { ArticleCard } from "@/components/article-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllArticles } from "@/sanity/lib/data";

export const metadata: Metadata = {
  title: "Artikel dan Kabar | Manazil Ibnu Abbas",
  description:
    "Kumpulan artikel, kabar kegiatan, pengumuman, dan wawasan pendidikan dari Ma’had Manazil Ibnu Abbas.",
};

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <main className="min-h-screen bg-[#faf8f6]">
      <SiteHeader />
      <section className="border-b border-[#e7e7e7] bg-[#f1ece9]">
        <div className="mx-auto w-full max-w-[1200px] border-x-0 border-[#dbd7d3] px-6 py-16 md:border-x md:px-10 md:py-20 lg:px-[60px] lg:py-24">
          <p className="text-sm font-medium uppercase leading-[22px] tracking-[0.7px] text-[#048f51]">
            Artikel dan Kabar
          </p>
          <h1 className="font-display mt-2 max-w-[760px] text-[36px] font-bold leading-[1.2] text-[#1e150c] sm:text-[36px] lg:text-[44px]">
Temukan Bacaan yang Bermanfaat
          </h1>
          <p className="mt-5 max-w-[650px] text-sm leading-6 text-[#4C4238] sm:text-base">
Artikel, cerita kegiatan, dan informasi terbaru seputar Ma’had Manazil Ibnu Abbas.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] border-x-0 border-[#e7e7e7] px-6 py-16 md:border-x md:px-10 md:py-20 lg:px-[60px]">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#dfd8d1] bg-white px-6 py-16 text-center">
            <h2 className="font-display text-2xl font-semibold text-[#1e150c]">
              Artikel segera hadir
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-sm leading-6 text-[#4C4238]">
              Tim Ma’had sedang menyiapkan artikel dan kabar terbaru untuk ditampilkan
              di halaman ini.
            </p>
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
