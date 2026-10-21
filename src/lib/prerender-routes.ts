import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

function getMdxPaths(dir: string, prefix: string): string[] {
  try {
    const contentDir = resolve(process.cwd(), dir);

    return readdirSync(contentDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => `${prefix}/${file.replace(/\.mdx$/, '')}`);
  } catch {
    return [];
  }
}

export function getBlogPostPaths(): string[] {
  return getMdxPaths('src/content/posts', '/blog');
}

export function getProjectPaths(): string[] {
  return getMdxPaths('src/content/projects', '/projects');
}

export function getPrerenderPages() {
  const staticPages = ['/', '/blog', '/open-source'];

  return [
    ...staticPages.map((path) => ({ path })),
    ...getBlogPostPaths().map((path) => ({ path })),
    ...getProjectPaths().map((path) => ({ path })),
  ];
}
