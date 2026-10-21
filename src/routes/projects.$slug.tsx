import {
  createFileRoute,
  Link,
  notFound,
  useLoaderData,
} from '@tanstack/react-router';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';

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

function MermaidDiagram({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load mermaid from CDN via script tag
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    script.type = 'module';
    script.onload = async () => {
      try {
        const mermaidLib = (window as any).mermaid;
        mermaidLib.initialize({ startOnLoad: false, securityLevel: 'loose' });
        if (ref.current) {
          ref.current.innerHTML = code;
          await mermaidLib.run({ nodes: [ref.current] });
        }
      } catch {
        // silently fail
      }
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [code]);

  return <div ref={ref} className="mermaid" />;
}

function CodeBlock({ children, className, ...props }: { children?: React.ReactNode; className?: string; [key: string]: any }) {
  const classStr = className || '';
  if (classStr.includes('language-mermaid')) {
    return <MermaidDiagram code={String(children)} />;
  }
  return (
    <pre {...props} className={classStr}>
      <code className={classStr}>{children}</code>
    </pre>
  );
}

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
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: CodeBlock,
              }}
            >
              {project.content}
            </Markdown>
          </article>
        </BlurFade>
      </div>
    </div>
  );
}