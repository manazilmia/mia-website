import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArticleActions } from "@/components/article-actions";
import { ArticleBody } from "@/components/article-body";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getTextLanguageAttributes } from "@/lib/text-direction";
import { siteUrl } from "@/sanity/env";
import {
  getArticleBySlug,
  getArticleSlugs,
} from "@/sanity/lib/data";
import { estimateReadingMinutes, formatArticleDate } from "@/sanity/lib/format";
import { urlFor } from "@/sanity/lib/image";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  return getArticleSlugs();
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return {};

  const image = article.coverImage
    ? urlFor(article.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: `${article.title} | Manazil Ibnu Abbas`,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      authors: [article.author],
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const coverUrl = article.coverImage
    ? urlFor(article.coverImage).width(1400).height(820).fit("crop").auto("format").url()
    : null;
  const articleUrl = `${siteUrl}/artikel/${article.slug}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${article.title}\n${articleUrl}`,
  )}`;
  const readingMinutes = estimateReadingMinutes(article.body || []);

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <article className="article-content bg-white">
        <header>
          <div className="mx-auto w-full max-w-[920px] px-6 pb-9 pt-10 md:px-10 md:pb-12 md:pt-14">
            {/* <Link
              href="/artikel"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6f6a65] transition-colors hover:text-[#855f38]"
            >
              <HugeiconsIcon
                icon={ArrowLeft02Icon}
                size={18}
                strokeWidth={1.7}
                aria-hidden
              />
              Semua artikel
            </Link> */}
            {/* <div className="mt-10 flex flex-wrap gap-2 md:mt-12">
              <span className="rounded-full border border-[#e6e2de] bg-white px-4 py-2 text-[13px] font-medium text-[#4C4238]">
                {formatCategory(article.category)}
              </span>
            </div> */}
            <h1
              {...getTextLanguageAttributes(article.title)}
              className="font-display mt-6 text-[40px] font-bold leading-[1.5] tracking-[-0.045em] text-[#1e150c] sm:text-[32px] lg:text-[40px]"
            >
              {article.title}
            </h1>
            {/* <p
              {...getTextLanguageAttributes(article.excerpt)}
              className="mt-5 text-[17px] leading-7 text-[#6f665e] sm:text-[18px] sm:leading-8"
            >
              {article.excerpt}
            </p> */}

            <div className="mt-9 flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#e3ddd7] bg-[#f6f2ef] sm:size-14">
                <Image
                  src="/figma/logo.png"
                  alt=""
                  width={40}
                  height={32}
                  className="h-8 w-10 object-contain sm:h-9 sm:w-11"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-medium text-[#1e150c] sm:text-base">
                  {article.author}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#77716c] sm:text-sm">
                  <time dateTime={article.publishedAt}>
                    {formatArticleDate(article.publishedAt)}
                  </time>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <HugeiconsIcon
                      icon={Clock01Icon}
                      size={15}
                      strokeWidth={1.6}
                      aria-hidden
                    />
                    {readingMinutes} menit baca
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* <div className="border-y border-[#ece9e6]">
          <div className="mx-auto flex h-[62px] w-full max-w-[1080px] items-center justify-between px-6 md:px-10">
            <span className="text-[13px] font-medium text-[#77716c]">
              Artikel Manazil
            </span>
            <ArticleActions
              articleUrl={articleUrl}
              title={article.title}
              whatsappUrl={whatsappUrl}
            />
          </div>
        </div> */}

        <div className="mx-auto w-full max-w-[920px] px-6 py-10 md:px-10 md:py-14">
          {coverUrl ? (
            <figure className="mb-12 md:mb-16">
              <Image
                src={coverUrl}
                alt={article.coverImage?.alt || article.title}
                width={1400}
                height={820}
                priority
                sizes="(min-width: 1200px) 1000px, calc(100vw - 48px)"
                className="h-auto w-full object-cover"
              />
            </figure>
          ) : null}

          <div>
            <ArticleBody body={article.body || []} />

            <div className="mt-14 flex items-center justify-between border-y border-[#ece9e6] py-3">
              <span className="text-[13px] text-[#77716c]">
                Bagikan artikel ini
              </span>
              <ArticleActions
                articleUrl={articleUrl}
                title={article.title}
                whatsappUrl={whatsappUrl}
              />
            </div>

            {/* <aside className="mt-12 flex gap-5 border-b border-[#ece9e6] pb-14 sm:items-center">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full border border-[#e3ddd7] bg-[#f6f2ef] sm:size-[76px]">
                <Image
                  src="/figma/logo.png"
                  alt="Logo Manazil Ibnu Abbas"
                  width={56}
                  height={46}
                  className="h-11 w-14 object-contain sm:h-12 sm:w-[60px]"
                />
              </div>
              <div>
                <p className="font-display text-[20px] font-bold tracking-[-0.025em] text-[#1e150c] sm:text-[23px]">
                  Ditulis oleh {article.author}
                </p>
                <p className="mt-2 max-w-[560px] text-sm leading-6 text-[#6f665e] sm:text-[15px]">
                  Tim Ma’had berbagi kegiatan, pengumuman, dan wawasan pendidikan
                  untuk santri, wali santri, dan masyarakat.
                </p>
                <Link
                  href="/artikel"
                  className="mt-4 inline-flex text-sm font-semibold text-[#855f38] transition-colors hover:text-[#6f4f2e]"
                >
                  Lihat artikel lainnya
                </Link>
              </div>
            </aside> */}
          </div>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
