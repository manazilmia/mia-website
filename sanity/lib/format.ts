const categories: Record<string, string> = {
  kegiatan: "Kegiatan Ma’had",
  pengumuman: "Pengumuman",
  pendidikan: "Tahfizh dan Pendidikan",
  prestasi: "Prestasi Santri",
  nasihat: "Nasihat",
  pendaftaran: "Penerimaan Santri Baru",
};

export function formatCategory(category: string) {
  return categories[category] || category;
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatKajianDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(date));
}

export function formatKajianTime(date: string) {
  const time = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(new Date(date));

  return `${time.replace(".", ":")} WIB`;
}

export function estimateReadingMinutes(body: unknown[]) {
  let text = "";

  for (const block of body) {
    if (!block || typeof block !== "object" || !("children" in block)) continue;

    const children = (block as { children?: unknown }).children;
    if (!Array.isArray(children)) continue;

    for (const child of children) {
      if (!child || typeof child !== "object" || !("text" in child)) continue;

      const childText = (child as { text?: unknown }).text;
      if (typeof childText === "string") text += ` ${childText}`;
    }
  }

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}
