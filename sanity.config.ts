"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { PublishArticleAction } from "./sanity/actions/publish-article";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Manazil Ibnu Abbas — CMS",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  document: {
    actions: (previousActions, context) =>
      context.schemaType === "article"
        ? previousActions.map((action) =>
            action.action === "publish" ? PublishArticleAction : action,
          )
        : previousActions,
  },
  form: {
    components: {
      portableText: {
        plugins: (props) =>
          props.renderDefault({
            ...props,
            plugins: {
              ...props.plugins,
              typography: { preset: "all" },
            },
          }),
      },
    },
  },
  schema: { types: schemaTypes },
});
