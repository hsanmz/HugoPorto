# HugoPorto

Personal portfolio for Muhammad Ziyad Hasan. It is a static site built with TanStack Start, React 19, Vite, and Tailwind CSS v4. There is no application backend. Project content is stored in the repository and blog posts are bundled at build time.

## Run locally

```bash
pnpm install
pnpm dev
```

The dev server runs on [http://localhost:2718](http://localhost:2718).

To run the production build:

```bash
pnpm build
pnpm start
```

`pnpm build` runs `vite build` and `tsc --noEmit`. `pnpm start` serves the Nitro output on port 22825.

## Architecture

TanStack Start renders the routes on the server and prerenders them at build time. Vite handles the client bundle. Nitro writes the production output to `.output`.

```
src/
  routes/          File-based routes
  data/            Projects, experience, education, and skills
  components/      Page sections and UI primitives
  lib/             Content loading, previews, and route helpers
  content/posts/   MDX blog posts
```

The home route reads its content from `src/data`. Blog routes read MDX files through `import.meta.glob`, so posts ship with the build instead of coming from an API.

### Project cards

Each project lives in `src/data/project.tsx`. A card shows a screenshot of the live project when `href` points to a website. An explicit `image` takes priority. Projects without a live URL render a plain cover with the project name.

Repository links are not shown. The card copy carries the architecture instead: how the parts connect, what runs in the background, and which decisions shaped the system. To add a project, add an entry with its description, stack, dates, and live URL if one exists.

### Blog posts

Add an `.mdx` file to `src/content/posts`. The file name becomes the slug. Frontmatter supports `title`, `publishedAt`, `summary`, and `image`.

```mdx
---
title: Writing a queue worker that can be restarted
publishedAt: 2026-10-21
summary: What the job table has to store before a worker can recover.
---

Post body.
```

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the dev server on port 2718 |
| `pnpm build` | Build for production and type-check |
| `pnpm start` | Serve the Nitro output on port 22825 |
| `pnpm lint` | Run Biome lint |
| `pnpm format` | Run Biome format |
| `pnpm check` | Run Biome check |
| `pnpm test` | Run Vitest |

`pnpm test` exits with "No test files found" until the first test is added.

## Deployment

Vercel builds the project on every push to `main`. The Docker image in `Dockerfile` runs `node .output/server/index.mjs` on port 22825 with `HOST=0.0.0.0`.

## Copy

Site copy follows the antislop rules: no em dashes, no invented metrics or testimonials, and no claims that the project cannot support. Project notes describe real architecture and real decisions.
