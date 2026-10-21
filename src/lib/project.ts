import { PROJECTS } from '@/data/project';

export type Project = (typeof PROJECTS)[number];

export type ProjectDoc = {
  slug: string;
  title: string;
  href: string;
  dates: string;
  active: boolean;
  openSource: boolean;
  description: string;
  technologies: readonly string[];
  content: string;
};

// Long-form project docs live next to the blog posts so they can be written in
// markdown and bundled at build time. The card data in src/data/project.tsx
// stays the source of truth for title, stack, dates, and links.
const projectDocs = import.meta.glob('/src/content/projects/*.mdx', {
  query: '?raw',
  import: 'default',
});

export function getProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug);
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectDoc | null> {
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) return null;

  const resolver = projectDocs[`/src/content/projects/${slug}.mdx`];
  const content = resolver ? ((await resolver()) as string) : '';

  // Only return plain data. The card data carries JSX icons in `links`, which
  // cannot cross the loader boundary.
  return {
    slug: project.slug,
    title: project.title,
    href: project.href,
    dates: project.dates,
    active: project.active,
    openSource: project.openSource,
    description: project.description,
    technologies: project.technologies,
    content,
  };
}
