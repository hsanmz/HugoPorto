# AGENTS.md

## Cursor Cloud specific instructions

This is a static frontend site built with Vite + React 19 + TanStack Start (file-based routing in `src/routes`) + Tailwind CSS v4. There is no backend; blog posts are bundled content. The package manager is **pnpm** (see `pnpm-lock.yaml`).

Standard scripts live in `package.json`; run them with pnpm (e.g. `pnpm dev`). Notes:

- `pnpm dev` serves on port `2718` (`pnpm start` runs the Nitro server on port `22825`).
- Production Docker runs `node .output/server/index.mjs` directly on port `22825` (`HOST=0.0.0.0`).
- `vite.config.ts` only allows the extra host `local.iyansr.id`; use `localhost` (or add `--host`) when testing locally.
- `pnpm lint` (Biome) currently reports pre-existing warnings and one `noExplicitAny` error in `src/lib/post.ts` / `src/routes/blog/$slug.tsx`. This is unrelated to environment setup — do not "fix" it as part of setup.
- `pnpm test` (Vitest) exits non-zero with "No test files found" because the template has no tests yet; this is expected, not a setup failure.
- `pnpm build` runs `vite build && tsc --noEmit` and succeeds (only a chunk-size warning).

## Content routes

- Home (`/`) lists projects from `src/data/project.tsx` in a two-column masonry. Each card links to an internal detail page at `/projects/$slug`.
- Project detail pages are prerendered from the `.mdx` files in `src/content/projects/`. The file name is the slug and must match the `slug` field in `src/data/project.tsx`. Add new paths to `getPrerenderPages` via `getProjectPaths` in `src/lib/prerender-routes.ts` (it scans the folder, so new files are picked up automatically).
- Project loaders return plain data only. Card data carries JSX icons in `links`, so `src/lib/project.ts` maps each project to a serializable `ProjectDoc` before it crosses the loader boundary.
- Blog posts live in `src/content/posts/` and use the same MDX glob pattern.
- Repository links are intentionally not rendered on project cards or detail pages. Documentation lives in the project copy and the MDX notes.

## Copy rules (antislop)

Site copy follows the antislop rules: no em dashes, no invented metrics or testimonials, no generic AI phrasing. Project notes describe real architecture and real decisions. The `antislop` and `antislop-copywriting` skills are installed globally for OpenCode at `~/.config/opencode/skills/` and as an Antigravity plugin at `~/.gemini/config/plugins/antislop`.
