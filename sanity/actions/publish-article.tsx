"use client";

import { useEffect, useState } from "react";
import type { DocumentActionComponent } from "sanity";
import { useDocumentOperation } from "sanity";

export const PublishArticleAction: DocumentActionComponent = (props) => {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (isPublishing && !props.draft) {
      setIsPublishing(false);
    }
  }, [isPublishing, props.draft]);

  return {
    disabled: Boolean(publish.disabled),
    label: isPublishing ? "Menerbitkan…" : "Terbitkan",
    onHandle: () => {
      setIsPublishing(true);
      patch.execute([
        {
          set: {
            publishedAt: new Date().toISOString(),
          },
        },
      ]);
      publish.execute();
      props.onComplete();
    },
  };
};
