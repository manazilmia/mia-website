"use client";

import type {
  BaseFieldProps,
  BaseInputProps,
  BlockStyleProps,
  PortableTextInputProps,
  PreviewProps,
  StringInputProps,
} from "sanity";
import {
  ArrowDown01Icon,
  Idea01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { isArabicText } from "../../lib/text-direction";

function getBlockText(block?: BlockStyleProps["block"]) {
  if (!block || !Array.isArray(block.children)) return "";

  return block.children
    .map((child) =>
      child && typeof child === "object" && "text" in child
        ? String(child.text ?? "")
        : "",
    )
    .join(" ");
}

function getWritingDirection(block?: BlockStyleProps["block"]) {
  const arabic = isArabicText(getBlockText(block));

  return {
    arabic,
    dir: arabic ? ("rtl" as const) : ("ltr" as const),
    lang: arabic ? "ar" : "id",
  };
}

export function ArticleTitleInput(props: StringInputProps) {
  const titleProps = {
    ...props,
    elementProps: {
      ...props.elementProps,
      placeholder: "Judul artikel",
    },
  };

  return (
    <div className="notion-title-input">{props.renderDefault(titleProps)}</div>
  );
}

export function ArticleBareField(props: BaseFieldProps) {
  return <>{props.children}</>;
}

export function ArticleBodyInput(props: BaseInputProps) {
  const portableTextProps = props as PortableTextInputProps;
  const blocks = portableTextProps.value as
    | Array<{ _type?: string; children?: Array<{ text?: string }> }>
    | undefined;
  const hasContent = blocks?.some((item) => {
    if (item._type !== "block") return true;

    return item.children?.some(
      (child) => typeof child.text === "string" && child.text.trim().length > 0,
    );
  });

  return (
    <div className="notion-portable-editor">
      {!hasContent ? (
        <div className="notion-editor-placeholder" aria-hidden="true">
          Mulai menulis artikel…
        </div>
      ) : null}
      {portableTextProps.renderDefault(portableTextProps)}
    </div>
  );
}

export function ArticleCalloutPreview(props: PreviewProps) {
  const title =
    typeof props.title === "string"
      ? props.title
      : "Tulis pesan yang ingin disorot…";

  return (
    <div className="notion-block-preview notion-callout-preview">
      <HugeiconsIcon icon={Idea01Icon} size={22} strokeWidth={1.7} aria-hidden />
      <span>{title}</span>
    </div>
  );
}

export function ArticleAccordionPreview(props: PreviewProps) {
  const title =
    typeof props.title === "string" ? props.title : "Judul bagian lipat…";

  return (
    <div className="notion-block-preview notion-accordion-preview">
      <HugeiconsIcon
        icon={ArrowDown01Icon}
        size={18}
        strokeWidth={1.8}
        aria-hidden
      />
      <span>{title}</span>
    </div>
  );
}

export function MediumParagraphStyle(props: BlockStyleProps) {
  const writing = getWritingDirection(props.block);

  return (
    <span
      dir={writing.dir}
      lang={writing.lang}
      style={{
        display: "block",
        paddingBlock: "0.42em",
        fontFamily: writing.arabic
          ? "var(--font-thmanyah-serif), serif"
          : "var(--font-editorial), serif",
        fontSize: "14px",
        lineHeight: 1.75,
        textAlign: writing.arabic ? "right" : "left",
      }}
    >
      {props.children}
    </span>
  );
}

export function MediumHeadingStyle(props: BlockStyleProps) {
  const writing = getWritingDirection(props.block);

  return (
    <span
      dir={writing.dir}
      lang={writing.lang}
      style={{
        display: "block",
        paddingBlock: "0.5em 0.18em",
        fontFamily: writing.arabic
          ? "var(--font-thmanyah-serif), serif"
          : "var(--font-manrope), sans-serif",
        fontSize: "24px",
        fontWeight: 700,
        lineHeight: 1.25,
        letterSpacing: writing.arabic ? "normal" : "-0.025em",
        textAlign: writing.arabic ? "right" : "left",
      }}
    >
      {props.children}
    </span>
  );
}

export function MediumSubheadingStyle(props: BlockStyleProps) {
  const writing = getWritingDirection(props.block);

  return (
    <span
      dir={writing.dir}
      lang={writing.lang}
      style={{
        display: "block",
        paddingBlock: "0.45em 0.12em",
        fontFamily: writing.arabic
          ? "var(--font-thmanyah-serif), serif"
          : "var(--font-manrope), sans-serif",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: 1.35,
        letterSpacing: writing.arabic ? "normal" : "-0.02em",
        textAlign: writing.arabic ? "right" : "left",
      }}
    >
      {props.children}
    </span>
  );
}

export function MediumQuoteStyle(props: BlockStyleProps) {
  const writing = getWritingDirection(props.block);

  return (
    <span
      dir={writing.dir}
      lang={writing.lang}
      style={{
        display: "block",
        marginBlock: "0.7em",
        borderInlineStart: "3px solid #855f38",
        paddingBlock: "0.2em",
        paddingInlineStart: "1.1em",
        fontFamily: writing.arabic
          ? "var(--font-thmanyah-serif), serif"
          : "var(--font-editorial), serif",
        fontSize: "18px",
        fontStyle: "italic",
        lineHeight: 1.65,
        textAlign: writing.arabic ? "right" : "left",
      }}
    >
      {props.children}
    </span>
  );
}
