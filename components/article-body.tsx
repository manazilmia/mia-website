import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import {
  ArrowDown01Icon,
  Idea01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { getTextLanguageAttributes } from "@/lib/text-direction";
import { urlFor } from "@/sanity/lib/image";
import type {
  Article,
  ArticleAccordion,
  ArticleCallout,
  SanityImage,
} from "@/sanity/lib/types";

function getBlockText(value: unknown) {
  if (!value || typeof value !== "object" || !("children" in value)) return "";

  const { children } = value as { children?: unknown };
  if (!Array.isArray(children)) return "";

  return children
    .map((child) => {
      if (!child || typeof child !== "object" || !("text" in child)) return "";
      return typeof child.text === "string" ? child.text : "";
    })
    .join(" ");
}

function getBlockLanguageAttributes(value: unknown) {
  return getTextLanguageAttributes(getBlockText(value));
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children, value }) => (
      <p {...getBlockLanguageAttributes(value)}>{children}</p>
    ),
    h2: ({ children, value }) => (
      <h2 {...getBlockLanguageAttributes(value)}>{children}</h2>
    ),
    h3: ({ children, value }) => (
      <h3 {...getBlockLanguageAttributes(value)}>{children}</h3>
    ),
    blockquote: ({ children, value }) => (
      <blockquote {...getBlockLanguageAttributes(value)}>
        {children}
      </blockquote>
    ),
  },
  listItem: {
    bullet: ({ children, value }) => (
      <li {...getBlockLanguageAttributes(value)}>{children}</li>
    ),
    number: ({ children, value }) => (
      <li {...getBlockLanguageAttributes(value)}>{children}</li>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = href.startsWith("http");

      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as SanityImage;
      if (!image?.asset) return null;

      const width = image.asset.metadata?.dimensions?.width || 1200;
      const height = image.asset.metadata?.dimensions?.height || 800;

      return (
        <figure className="not-prose my-12 w-full">
          <Image
            src={urlFor(image).width(1400).fit("max").auto("format").url()}
            alt={image.alt || "Dokumentasi Ma’had"}
            width={width}
            height={height}
            sizes="(min-width: 1200px) 1000px, calc(100vw - 48px)"
            className="h-auto w-full object-cover"
          />
          {image.caption ? (
            <figcaption className="mt-3 px-4 text-center text-[13px] leading-5 text-[#766a5f]">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    callout: ({ value }) => {
      const callout = value as ArticleCallout;

      return (
        <aside className="not-prose my-9 flex gap-4 rounded-xl bg-[#f7f5f2] px-5 py-5 text-[#342d27] sm:px-6">
          <HugeiconsIcon
            icon={Idea01Icon}
            size={23}
            strokeWidth={1.7}
            className="mt-0.5 shrink-0 text-[#855f38]"
            aria-hidden
          />
          <p className="m-0 font-serif text-[18px] leading-8 sm:text-[19px]">
            {callout.text}
          </p>
        </aside>
      );
    },
    accordion: ({ value }) => {
      const accordion = value as ArticleAccordion;

      return (
        <details className="not-prose group my-8 border-y border-[#e7e1db] py-1 text-[#2d2925]">
          <summary className="flex cursor-pointer list-none items-center gap-3 py-4 text-[17px] font-semibold marker:content-none sm:text-[18px]">
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={18}
              strokeWidth={1.8}
              className="shrink-0 -rotate-90 transition-transform duration-200 group-open:rotate-0"
              aria-hidden
            />
            {accordion.title}
          </summary>
          <div className="article-prose prose prose-stone max-w-none pb-5 pl-8 prose-p:my-3 prose-p:font-serif prose-p:text-[17px] prose-p:leading-8 prose-p:text-[#4c433b] sm:prose-p:text-[18px]">
            <PortableText
              value={accordion.content || []}
              components={components}
            />
          </div>
        </details>
      );
    },
  },
};

export function ArticleBody({ body }: { body: Article["body"] }) {
  return (
    <div className="article-prose prose prose-stone max-w-none prose-headings:font-display prose-headings:text-[#1e150c] prose-h2:mb-5 prose-h2:mt-14 prose-h2:text-[27px] prose-h2:font-bold prose-h2:leading-[1.25] prose-h2:tracking-[-0.025em] prose-h3:mb-4 prose-h3:mt-11 prose-h3:text-[22px] prose-h3:font-bold prose-h3:leading-[1.35] prose-h3:tracking-[-0.02em] prose-p:font-serif prose-p:text-[19px] prose-p:leading-[1.78] prose-p:text-[#2d2925] prose-a:text-[#2d2925] prose-a:decoration-[#855f38]/45 prose-a:decoration-1 prose-a:underline-offset-[5px] prose-a:transition-colors hover:prose-a:text-[#855f38] prose-blockquote:my-10 prose-blockquote:border-[#855f38] prose-blockquote:font-serif prose-blockquote:text-[21px] prose-blockquote:leading-[1.7] prose-blockquote:text-[#4C4238] prose-ul:my-8 prose-ul:font-serif prose-ul:text-[19px] prose-ul:leading-[1.7] prose-ul:text-[#2d2925] prose-ol:my-8 prose-ol:font-serif prose-ol:text-[19px] prose-ol:leading-[1.7] prose-ol:text-[#2d2925] prose-li:my-3 prose-li:marker:text-[#855f38] prose-figcaption:text-center prose-figcaption:text-[13px] prose-figcaption:leading-5 prose-figcaption:text-[#766a5f] sm:prose-h2:text-[32px] sm:prose-h3:text-[25px] sm:prose-p:text-[21px] sm:prose-blockquote:text-[23px] sm:prose-ul:text-[21px] sm:prose-ol:text-[21px]">
      <PortableText value={body} components={components} />
    </div>
  );
}
