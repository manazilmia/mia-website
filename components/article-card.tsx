import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { ArticleSummary } from "@/sanity/lib/types";

export function ArticleCard({ article }: { article: ArticleSummary }) {
  const imageUrl = article.coverImage
    ? urlFor(article.coverImage).width(900).height(560).fit("crop").auto("format").url()
    : null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e4ded8] bg-white shadow-[0_10px_30px_rgba(30,21,12,.05)] transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/artikel/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#e8e0d8]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={article.coverImage?.alt || article.title}
              fill
              sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, calc(100vw - 48px)"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(4,143,81,.14),transparent_45%),linear-gradient(135deg,#efe8e1,#e2d5c8)]" />
          )}
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="font-display text-xl font-semibold leading-7 text-[#1e150c] transition-colors group-hover:text-[#855f38]">
            {article.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#4C4238]">
            {article.excerpt}
          </p>
          <span className="mt-4 inline-flex text-sm font-semibold text-[#048f51]">
            Baca artikel
          </span>
        </div>
      </Link>
    </article>
  );
}
