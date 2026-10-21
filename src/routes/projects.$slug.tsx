import {
  createFileRoute,
  Link,
  notFound,
  useLoaderData,
} from '@tanstack/react-router';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { BlurFade } from '@/components/magicui/blur-fade';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getProjectBySlug } from '@/lib/project';

export const Route = createFileRoute('/projects/$slug')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const project = await getProjectBySlug(params.slug);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        name: 'description',
        content: loaderData?.project?.description,
      },
      {
        title: `${loaderData?.project?.title} | Muhammad Ziyad Hasan`,
      },
      {
        name: 'og:title',
        content: loaderData?.project?.title,
      },
      {
        name: 'og:description',
        content: loaderData?.project?.description,
      },
      {
        name: 'twitter:title',
        content: loaderData?.project?.title,
      },
    ],
  }),
});

const DELAY = 0.04;

function RouteComponent() {
  const { project } = useLoaderData({ from: '/projects/$slug' });

  return (
    <div>
      <BlurFade delay={DELAY}>
        <Link to="/" hash="work" className="mb-4 inline-block">
          <Button
            variant="link"
            className="text-muted-foreground hover:underline"
          >
            <ChevronLeft /> Back to projects
          </Button>
        </Link>
      </BlurFade>

      <div className="bg-background/40 backdrop-blur-3xl border border-muted/75 p-4 rounded-lg">
        <BlurFade delay={DELAY * 2}>
          <header className="mb-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {project.title}
              </h1>
              {project.openSource && (
                <Badge variant="lime" className="text-[10px]">
                  Open Source
                </Badge>
              )}
            </div>

            <time className="block font-sans text-sm text-muted-foreground">
              {project.dates}
            </time>

            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tag) => (
                <Badge
                  className="px-1 py-0 text-[10px]"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-pretty text-sm text-muted-foreground md:text-base/relaxed">
              {project.description}
            </p>

            {project.href && (
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  Visit live site
                  <ExternalLink />
                </Button>
              </a>
            )}
          </header>
        </BlurFade>

        <BlurFade delay={DELAY * 3}>
          <article className="prose text-pretty dark:prose-invert">
            <Markdown remarkPlugins={[remarkGfm]}>{project.content}</Markdown>
          </article>
        </BlurFade>
      </div>
    </div>
  );
}
