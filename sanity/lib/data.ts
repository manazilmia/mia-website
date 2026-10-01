import type { QueryParams } from "next-sanity";

import { client } from "./client";
import {
  allArticlesQuery,
  articleBySlugQuery,
  articleSlugsQuery,
  latestArticlesQuery,
  kajianScheduleQuery,
} from "./queries";
import type { Article, ArticleSummary, Kajian } from "./types";

const fetchOptions = { next: { revalidate: 60 } };

async function safeFetch<T>(
  query: string,
  params: QueryParams = {},
  fallback: T,
): Promise<T> {
  try {
    return await client.fetch<T>(query, params, fetchOptions);
  } catch {
    return fallback;
  }
}

export function getAllArticles() {
  return safeFetch<ArticleSummary[]>(allArticlesQuery, {}, []);
}

export function getLatestArticles() {
  return safeFetch<ArticleSummary[]>(latestArticlesQuery, {}, []);
}

export function getArticleBySlug(slug: string) {
  return safeFetch<Article | null>(articleBySlugQuery, { slug }, null);
}

export function getArticleSlugs() {
  return safeFetch<Array<{ slug: string }>>(articleSlugsQuery, {}, []);
}

export function getKajianSchedule() {
  return safeFetch<Kajian[]>(kajianScheduleQuery, {}, []);
}
