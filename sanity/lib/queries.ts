import { defineQuery } from "next-sanity";

const articleSummaryFields = `
  _id,
  title,
  "slug": slug.current,
  "excerpt": pt::text(body),
  author,
  "publishedAt": coalesce(publishedAt, _createdAt),
  coverImage {
    ...,
    asset->{_type, _id, url, metadata {lqip, dimensions}}
  }
`;

export const allArticlesQuery = defineQuery(`
  *[_type == "article" && defined(slug.current)]
  | order(coalesce(publishedAt, _createdAt) desc) {
    ${articleSummaryFields}
  }
`);

export const latestArticlesQuery = defineQuery(`
  *[_type == "article" && defined(slug.current)]
  | order(coalesce(publishedAt, _createdAt) desc) [0...3] {
    ${articleSummaryFields}
  }
`);

export const articleBySlugQuery = defineQuery(`
  *[_type == "article" && slug.current == $slug][0] {
    ${articleSummaryFields},
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->{_type, _id, url, metadata {lqip, dimensions}}
      }
    }
  }
`);

export const articleSlugsQuery = defineQuery(`
  *[_type == "article" && defined(slug.current)] {"slug": slug.current}
`);

export const kajianScheduleQuery = defineQuery(`
  *[_type == "kajian" && (defined(schedule) || defined(scheduleAt))]
  | order(_createdAt desc) [0...8] {
    _id,
    title,
    schedule,
    time,
    scheduleAt,
    location,
    speaker,
    poster {
      ...,
      asset->{_type, _id, url, metadata {lqip, dimensions}}
    }
  }
`);
