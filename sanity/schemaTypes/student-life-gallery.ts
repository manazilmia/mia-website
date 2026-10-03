import { defineArrayMember, defineField, defineType } from "sanity";

import { getYouTubeVideoId } from "../lib/youtube";

export const studentLifeGalleryType = defineType({
  name: "studentLifeGallery",
  title: "Galeri Kehidupan Santri",
  type: "document",
  description: "Buat satu galeri untuk slider pada bagian Kehidupan Santri di halaman utama.",
  fields: [
    defineField({
      name: "slides",
      title: "Slide",
      description: "Urutkan gambar dan video dengan menyeret item. Urutan ini tampil di website.",
      type: "array",
      of: [
        defineArrayMember({
          name: "slide",
          title: "Gambar atau video",
          type: "object",
          fields: [
            defineField({
              name: "mediaType",
              title: "Jenis media",
              type: "string",
              initialValue: "image",
              options: {
                list: [
                  { title: "Gambar", value: "image" },
                  { title: "Video YouTube", value: "video" },
                ],
                layout: "radio",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "image",
              title: "Gambar",
              type: "image",
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.mediaType !== "image",
              validation: (rule) =>
                rule.custom((value, context) =>
                  (context.parent as { mediaType?: string } | undefined)?.mediaType !== "image" ||
                  value?.asset
                    ? true
                    : "Unggah gambar untuk slide ini.",
                ),
            }),
            defineField({
              name: "imageAlt",
              title: "Deskripsi gambar",
              type: "string",
              description: "Jelaskan gambar secara singkat untuk pembaca layar.",
              hidden: ({ parent }) => parent?.mediaType !== "image",
              validation: (rule) =>
                rule.custom((value, context) =>
                  (context.parent as { mediaType?: string } | undefined)?.mediaType !== "image" ||
                  value?.trim()
                    ? true
                    : "Isi deskripsi gambar.",
                ),
            }),
            defineField({
              name: "youtubeUrl",
              title: "URL video YouTube",
              type: "url",
              description: "Tempel tautan video YouTube, youtu.be, Shorts, atau Live.",
              hidden: ({ parent }) => parent?.mediaType !== "video",
              validation: (rule) =>
                rule.custom((value, context) => {
                  if ((context.parent as { mediaType?: string } | undefined)?.mediaType !== "video") {
                    return true;
                  }
                  return value && getYouTubeVideoId(value)
                    ? true
                    : "Masukkan URL video YouTube yang valid.";
                }),
            }),
            defineField({
              name: "videoTitle",
              title: "Judul video",
              type: "string",
              description: "Judul ini membantu pengunjung mengenali video.",
              hidden: ({ parent }) => parent?.mediaType !== "video",
              validation: (rule) =>
                rule.custom((value, context) =>
                  (context.parent as { mediaType?: string } | undefined)?.mediaType !== "video" ||
                  value?.trim()
                    ? true
                    : "Isi judul video.",
                ),
            }),
          ],
          preview: {
            select: {
              mediaType: "mediaType",
              image: "image",
              imageAlt: "imageAlt",
              videoTitle: "videoTitle",
            },
            prepare({ mediaType, image, imageAlt, videoTitle }) {
              return {
                title: mediaType === "video" ? videoTitle || "Video YouTube" : imageAlt || "Gambar",
                subtitle: mediaType === "video" ? "Video YouTube" : "Gambar",
                media: mediaType === "image" ? image : undefined,
              };
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Galeri Kehidupan Santri" };
    },
  },
});
