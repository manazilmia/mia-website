import { getLatestArticles } from "@/sanity/lib/data";

import { ArticleCard } from "./article-card";
import { Button } from "./ui/button";

export async function LatestArticles() {
  const articles = await getLatestArticles();

  if (articles.length === 0) return null;

  return (
    <section className="border-b border-[#e7e7e7] bg-[#faf8f6]">
      <div className="mx-auto w-full max-w-[1200px] border-x-0 border-[#e7e7e7] px-6 py-16 md:border-x md:px-10 md:py-20 lg:px-[60px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase leading-[22px] tracking-[0.7px] text-[#048f51]">
              Artikel Terbaru
            </p>
            <h2 className="font-display mt-1 text-[28px] font-bold leading-[1.3] text-[#1e150c] sm:text-[32px]">
              Temukan Bacaan yang Bermanfaat
            </h2>
            <p className="mt-3 text-sm leading-[22px] text-[#4C4238]">
              Artikel, cerita kegiatan, dan informasi terbaru seputar Ma’had.
            </p>
          </div>
          <Button href="/artikel" variant="outline" className="w-fit">
            Lihat semua artikel
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
