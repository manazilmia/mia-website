"use client";

import { useState } from "react";
import {
  ArrowDown01Icon,
  Image01Icon,
  Link04Icon,
  Settings02Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ObjectInputMember,
  type ObjectInputProps,
  type ObjectMember,
} from "sanity";

type ArticleFieldName =
  | "title"
  | "coverImage"
  | "slug"
  | "author"
  | "body";

function findFieldMember(
  members: ObjectMember[],
  name: ArticleFieldName,
) {
  return members.find(
    (member) => member.kind === "field" && member.name === name,
  );
}

function ArticleMember({
  member,
  props,
}: {
  member: ObjectMember | undefined;
  props: ObjectInputProps;
}) {
  if (!member) return null;

  return (
    <ObjectInputMember
      member={member}
      renderAnnotation={props.renderAnnotation}
      renderBlock={props.renderBlock}
      renderField={props.renderField}
      renderInlineBlock={props.renderInlineBlock}
      renderInput={props.renderInput}
      renderItem={props.renderItem}
      renderPreview={props.renderPreview}
    />
  );
}

const properties = [
  {
    name: "coverImage" as const,
    label: "Gambar sampul",
    icon: Image01Icon,
    className: "notion-property-row notion-property-row-cover",
  },
  {
    name: "slug" as const,
    label: "Alamat artikel",
    icon: Link04Icon,
    className: "notion-property-row",
  },
  {
    name: "author" as const,
    label: "Penulis",
    icon: UserIcon,
    className: "notion-property-row",
  },
];

export function ArticleDocumentInput(props: ObjectInputProps) {
  const [propertiesOpen, setPropertiesOpen] = useState(true);
  const title = findFieldMember(props.members, "title");
  const body = findFieldMember(props.members, "body");

  return (
    <div className="notion-document-shell">
      <div className="notion-document-canvas">
        <div className="notion-title-region">
          <ArticleMember member={title} props={props} />
        </div>

        <section className="notion-properties" aria-label="Properti artikel">
          <button
            type="button"
            className="notion-properties-toggle"
            aria-expanded={propertiesOpen}
            onClick={() => setPropertiesOpen((open) => !open)}
          >
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={17}
              strokeWidth={1.8}
              className={propertiesOpen ? "" : "is-collapsed"}
              aria-hidden
            />
            <HugeiconsIcon
              icon={Settings02Icon}
              size={17}
              strokeWidth={1.7}
              aria-hidden
            />
            {propertiesOpen ? "Sembunyikan properti" : "Tampilkan properti"}
          </button>

          {propertiesOpen ? (
            <div className="notion-properties-list">
              {properties.map((property) => (
                <div className={property.className} key={property.name}>
                  <div className="notion-property-label">
                    <HugeiconsIcon
                      icon={property.icon}
                      size={18}
                      strokeWidth={1.65}
                      aria-hidden
                    />
                    <span>{property.label}</span>
                  </div>
                  <div className="notion-property-input">
                    <ArticleMember
                      member={findFieldMember(props.members, property.name)}
                      props={props}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <div className="notion-editor-divider" />

        <div className="notion-body-region">
          <ArticleMember member={body} props={props} />
        </div>
      </div>
    </div>
  );
}
