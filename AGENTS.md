# rustcode_website

Marketing site for RustCode (Next.js 16, Tailwind 4 entry, plain CSS in `src/app/globals.css`).

- No UI component library. Controls are plain HTML styled from the tokens at the top of `globals.css`; see DESIGN.md.
- The brand mark is `src/app/brand-mark.tsx`, the logo's blocks as SVG.
- `bun run lint` (Biome) and `bunx tsc --noEmit` must pass.

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
