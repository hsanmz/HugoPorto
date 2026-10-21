import {
  createFileRoute,
  Link,
  notFound,
  useLoaderData,
} from '@tanstack/react-router';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { useEffect, useRef } from 'react';
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

interface MermaidAPI {
  initialize: (config: {
    startOnLoad: boolean;
    securityLevel: string;
    theme: string;
  }) => void;
  run: (options: { nodes: HTMLElement[] }) => Promise<void>;
}

// React-Markdown calls `pre` for fenced blocks and passes the <code> element
// as children. We intercept `pre` so we can handle mermaid diagrams while
// letting the default <code> child render normally for everything else.
function CodeBlock({
  children,
  className,
  style,
}: React.ComponentPropsWithoutRef<'pre'> & { children?: React.ReactNode }) {
  // Check if the direct child code element has a mermaid language class
  const childEl =
    children as React.ReactElement<
      React.ComponentPropsWithoutRef<'code'>
    > | null;
  const codeClassName = childEl?.props?.className ?? className ?? '';

  if (String(codeClassName).includes('language-mermaid')) {
    const codeContent = String(childEl?.props?.children ?? '');
    return (
      <div
        className="my-4 rounded-lg border border-muted/50 bg-muted/10 p-4"
        data-mermaid-code={codeContent}
        style={style as React.CSSProperties}
      />
    );
  }

  // For all other languages, render the pre tag and let children (the <code>
  // element produced by react-markdown) render untouched.
  return (
    <pre className={className} style={style as React.CSSProperties}>
      {children}
    </pre>
  );
}

function RouteComponent() {
  const { project } = useLoaderData({ from: '/projects/$slug' });
  const articleRef = useRef<HTMLDivElement>(null);

  // Initialize mermaid diagrams after render.
  // Uses dynamic import() — mermaid is an ES module and does not expose itself
  // on window, so the previous script-tag + window.mermaid approach never ran.
  useEffect(() => {
    if (typeof window === 'undefined' || !articleRef.current) return;

    const mermaidElements = Array.from(
      articleRef.current.querySelectorAll<HTMLElement>('[data-mermaid-code]')
    );
    if (mermaidElements.length === 0) return;

    // Detect current color scheme so diagrams match the site theme.
    const isDark = document.documentElement.classList.contains('dark');
    const mermaidTheme = isDark ? 'dark' : 'default';

    let cancelled = false;

    (async () => {
      try {
        const { default: mermaid } = (await import(
          /* @vite-ignore */
          'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs'
        )) as { default: MermaidAPI };

        if (cancelled) return;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: mermaidTheme,
        });

        for (const el of mermaidElements) {
          const code = el.getAttribute('data-mermaid-code');
          if (!code) continue;
          el.innerHTML = code;
          el.classList.add('mermaid');
          await mermaid.run({ nodes: [el] });

          // Force the generated SVG to fit its container — never overflow.
          const svg = el.querySelector('svg');
          if (svg) {
            svg.style.maxWidth = '100%';
            svg.style.height = 'auto';
            svg.removeAttribute('width');
          }
        }
      } catch {
        // Non-fatal — diagram containers remain visible but empty.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);
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
          <article
            ref={articleRef}
            className="prose text-pretty dark:prose-invert"
          >
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                pre: CodeBlock,
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
