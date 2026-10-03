# Sanity Article Experience — Design QA

final result: passed

## Source Truth

- Notion editor reference: `/var/folders/_l/lyz80jpj57s7zsgl102k25lw0000gp/T/codex-clipboard-e166fdf5-1874-42e5-a13e-b5289711f4a4.png`
- Medium article references:
  - `/var/folders/_l/lyz80jpj57s7zsgl102k25lw0000gp/T/codex-clipboard-ad669b33-5e44-4674-bbb7-85718cfa2213.png`
  - `/var/folders/_l/lyz80jpj57s7zsgl102k25lw0000gp/T/codex-clipboard-66589554-22e8-423a-8633-613e05cdf102.png`
  - `/var/folders/_l/lyz80jpj57s7zsgl102k25lw0000gp/T/codex-clipboard-ea37067e-0890-4d10-b28c-56688849c54c.png`

## Implementation Evidence

- Studio screenshot: `/Users/mochamad.arifin/manazil/output/notion-editor-implementation.png`
- Public article screenshot: `/Users/mochamad.arifin/manazil/article-detail-desktop-viewport.png`
- Studio route: `http://localhost:3000/studio/structure/article;7e7d967f-7cf3-4958-a705-d933057f2e78%2Ctemplate%3Darticle`
- State: populated article, Sanity dark theme, focus mode, desktop.
- Studio capture: 2142 × 1344 CSS pixels at device scale 1.
- Reference capture: 2142 × 1528 pixels. The width is identical; height differs because the in-app browser's available page area is shorter.

## Full-view Comparison

The Studio editor follows the reference's visual model: a wide, centered writing canvas; an oversized page title; compact document properties directly beneath it; a divider; and a long-form block editor that occupies the rest of the page. Sanity's application chrome and the user's active dark theme remain intact instead of being imitated or hidden.

The public article keeps the previously approved Medium-inspired reading experience and its consistent horizontal guide for the heading, cover image, and article body.

## Focused-region Evidence

- Title: large borderless input, aligned to the same canvas as properties and body.
- Properties: cover, generated slug, and author are compact rows; the entire group can be collapsed.
- Body: borderless Portable Text surface with a restrained toolbar and generous writing area.
- Block insertion: Image, Sorotan, and Bagian Lipat controls are exposed in the toolbar.
- Public rendering: Sorotan uses a subtle highlighted panel; Bagian Lipat renders as an accessible native disclosure.

The full-view screenshots are sufficiently high resolution to inspect all focused regions without separate crops.

## Required Fidelity Surfaces

- Typography: passed. The Studio uses Sanity's UI tokens for controls and a strong editorial title/body hierarchy.
- Spacing and layout rhythm: passed. Title, properties, divider, and body share one 1100px focus-mode canvas.
- Theme and colors: passed. The layout adapts to Sanity's active light/dark theme.
- Images: passed. Cover input is compact in Studio, while article images remain full-width inside the public content guide.
- Content controls: passed. Existing title, slug, author, cover, and Portable Text content continue to load.
- RTL and Arabic: passed. Arabic blocks retain RTL direction and the bundled Thmanyah font on the public article.

## Interaction and Runtime Checks

- Property collapse/expand: passed.
- Existing article loading: passed.
- Image, Sorotan, and Bagian Lipat insertion controls: present and keyboard-addressable.
- Site callout and accordion renderers: implemented.
- Browser console errors: none.
- TypeScript: passed (`npx tsc --noEmit`).
- Lint: passed (`npm run lint`).
- Production build: passed with Next.js webpack. The sandbox logged an expected Sanity CDN DNS lookup failure during data collection, then completed route generation successfully.

## Comparison History

### Pass 1

- Finding: Sanity's Card selectors made the editor surface bright white in dark mode, and the cover input dominated the page.
- Fix: narrowed toolbar selectors, made editor surfaces theme-transparent, and constrained the cover editor to 190px.

### Pass 2

- Finding: the default Sanity document column was too narrow to feel like Notion or Google Docs.
- Fix: focus mode now breaks the custom document canvas out to 1100px while preserving the normal Studio navigation state.

### Pass 3

- Finding: the user needed custom rich blocks to match the Notion reference.
- Fix: added Sorotan and Bagian Lipat schemas, Studio previews, toolbar entries, and public renderers.

## Findings

No actionable P0, P1, or P2 findings remain.

## Follow-up Polish

- P3: Sanity's native Portable Text toolbar is used instead of an exact Notion-style `/` command palette. The core authoring workflow is complete and remains compatible with Sanity's publishing model.
