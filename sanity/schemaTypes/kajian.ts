import { defineField, defineType } from "sanity";

export const kajianType = defineType({
  name: "kajian",
  title: "Jadwal Kajian",
  type: "document",
  orderings: [
    {
      title: "Waktu Terdekat",
      name: "scheduleAtAsc",
      by: [{ field: "scheduleAt", direction: "asc" }],
    },
    {
      title: "Waktu Terbaru",
      name: "scheduleAtDesc",
      by: [{ field: "scheduleAt", direction: "desc" }],
    },
  ],
  fields: [
    defineField({
      name: "poster",
      title: "Poster Kajian",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Deskripsi Poster",
          type: "string",
          description: "Jelaskan isi poster secara singkat untuk aksesibilitas.",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Judul Kajian",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "schedule",
      title: "Hari / Jadwal",
      description: "Bebas diisi, misalnya: Setiap Senin pekan ke-2.",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "time",
      title: "Waktu",
      description: "Bebas diisi, misalnya: Ba’da Magrib atau pukul 19.30 WIB.",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "scheduleAt",
      title: "Tanggal Lama",
      type: "datetime",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "location",
      title: "Tempat",
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "speaker",
      title: "Pemateri",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
  ],
  preview: {
    select: {
      title: "title",
      schedule: "schedule",
      time: "time",
      scheduleAt: "scheduleAt",
      location: "location",
      media: "poster",
    },
    prepare({ title, schedule, time, scheduleAt, location, media }) {
      const legacySchedule = scheduleAt
        ? new Intl.DateTimeFormat("id-ID", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "Asia/Jakarta",
          }).format(new Date(scheduleAt))
        : "Waktu belum diisi";
      const scheduleLabel = [schedule, time].filter(Boolean).join(" · ") || legacySchedule;

      return {
        title: title || "Kajian tanpa judul",
        subtitle: `${scheduleLabel} · ${location || "Tempat belum diisi"}`,
        media,
      };
    },
  },
});
