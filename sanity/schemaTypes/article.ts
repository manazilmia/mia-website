import { defineArrayMember, defineField, defineType } from "sanity";

import {
  ArticleAccordionPreview,
  ArticleBareField,
  ArticleBodyInput,
  ArticleCalloutPreview,
  ArticleTitleInput,
  MediumHeadingStyle,
  MediumParagraphStyle,
  MediumQuoteStyle,
  MediumSubheadingStyle,
} from "../components/article-editor";
import { ArticleDocumentInput } from "../components/article-document-input";

export const articleType = defineType({
  name: "article",
  title: "Artikel",
  type: "document",
  __experimental_formPreviewTitle: false,
  components: { input: ArticleDocumentInput },
  orderings: [
    {
      title: "Terbaru",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Judul",
      type: "string",
      components: { field: ArticleBareField, input: ArticleTitleInput },
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "coverImage",
      title: "Gambar Sampul",
      type: "image",
      components: { field: ArticleBareField },
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Deskripsi Gambar",
          type: "string",
          hidden: true,
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Alamat Artikel",
      description: "Klik Generate untuk membuat alamat otomatis dari judul.",
      type: "slug",
      components: { field: ArticleBareField },
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Penulis",
      type: "string",
      components: { field: ArticleBareField },
      initialValue: "Ma’had Manazil Ibnu Abbas",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Tanggal Publikasi",
      type: "datetime",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "excerpt",
      title: "Ringkasan Lama",
      type: "text",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "category",
      title: "Kategori Lama",
      type: "string",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "featured",
      title: "Unggulan Lama",
      type: "boolean",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "body",
      title: "Isi Artikel",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            {
              title: "Paragraf",
              value: "normal",
              component: MediumParagraphStyle,
            },
            {
              title: "Judul Bagian",
              value: "h2",
              component: MediumHeadingStyle,
            },
            {
              title: "Subjudul",
              value: "h3",
              component: MediumSubheadingStyle,
            },
            {
              title: "Kutipan",
              value: "blockquote",
              component: MediumQuoteStyle,
            },
          ],
          lists: [
            { title: "Poin", value: "bullet" },
            { title: "Nomor", value: "number" },
          ],
          marks: {
            annotations: [
              {
                name: "link",
                title: "Tautan",
                type: "object",
                fields: [
                  {
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Deskripsi Gambar",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "caption",
              title: "Keterangan",
              type: "string",
            },
          ],
        }),
        defineArrayMember({
          name: "callout",
          title: "Sorotan",
          type: "object",
          components: { preview: ArticleCalloutPreview },
          fields: [
            defineField({
              name: "text",
              title: "Isi sorotan",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { text: "text" },
            prepare({ text }) {
              return { title: text };
            },
          },
        }),
        defineArrayMember({
          name: "accordion",
          title: "Bagian Lipat",
          type: "object",
          components: { preview: ArticleAccordionPreview },
          fields: [
            defineField({
              name: "title",
              title: "Judul",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "content",
              title: "Isi",
              type: "array",
              of: [defineArrayMember({ type: "block" })],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return { title };
            },
          },
        }),
      ],
      options: {
        insertMenu: {
          filter: false,
          showIcons: false,
          groups: [
            {
              name: "media",
              title: "Media",
              of: ["image"],
            },
            {
              name: "content",
              title: "Blok konten",
              of: ["callout", "accordion"],
            },
          ],
        },
      },
      components: { field: ArticleBareField, input: ArticleBodyInput },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "coverImage",
      date: "publishedAt",
    },
    prepare({ title, author, media, date }) {
      const formattedDate = date
        ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
            new Date(date),
          )
        : "Tanpa tanggal";

      return {
        title,
        subtitle: `${author || "Tanpa penulis"} · ${formattedDate}`,
        media,
      };
    },
  },
});
