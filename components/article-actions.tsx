"use client";

import {
  Link01Icon,
  Share07Icon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

type ArticleActionsProps = {
  articleUrl: string;
  title: string;
  whatsappUrl: string;
};

export function ArticleActions({
  articleUrl,
  title,
  whatsappUrl,
}: ArticleActionsProps) {
  const [copyLabel, setCopyLabel] = useState("Salin tautan");

  async function shareArticle() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: articleUrl });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    await copyArticleLink();
  }

  async function copyArticleLink() {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopyLabel("Tautan disalin");
      window.setTimeout(() => setCopyLabel("Salin tautan"), 2200);
    } catch {
      setCopyLabel("Gagal menyalin");
      window.setTimeout(() => setCopyLabel("Salin tautan"), 2200);
    }
  }

  const actionClass =
    "inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-[#6f6a65] transition-colors hover:bg-[#f1ece9] hover:text-[#1e150c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#855f38]/35";

  return (
    <div className="flex items-center gap-1" aria-label="Bagikan artikel">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={actionClass}
        aria-label="Bagikan melalui WhatsApp"
        title="Bagikan melalui WhatsApp"
      >
        <HugeiconsIcon
          icon={WhatsappIcon}
          size={21}
          strokeWidth={1.6}
          aria-hidden
        />
      </a>
      <button
        type="button"
        className={actionClass}
        onClick={shareArticle}
        aria-label="Bagikan artikel"
        title="Bagikan artikel"
      >
        <HugeiconsIcon
          icon={Share07Icon}
          size={21}
          strokeWidth={1.6}
          aria-hidden
        />
      </button>
      <button
        type="button"
        className={actionClass}
        onClick={copyArticleLink}
        aria-label={copyLabel}
        title={copyLabel}
      >
        <HugeiconsIcon
          icon={Link01Icon}
          size={21}
          strokeWidth={1.6}
          aria-hidden
        />
      </button>
      <span className="sr-only" aria-live="polite">
        {copyLabel === "Tautan disalin" ? copyLabel : ""}
      </span>
    </div>
  );
}
