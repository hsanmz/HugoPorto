import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import Markdown from 'react-markdown';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getProjectPreviewSources } from '@/lib/project-preview';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  slug: string;
  href?: string;
  openSource?: boolean;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  slug,
  href,
  description,
  dates,
  tags,
  link,
  openSource = false,
  image,
  video,
  links,
  className,
}: Props) {
  const previewSources = getProjectPreviewSources(href, image);
  const [previewIndex, setPreviewIndex] = useState(0);
  const previewSrc = previewSources[previewIndex];

  const media = (
    <>
      {video && (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none mx-auto h-40 w-full object-cover object-top" // needed because random black line at bottom of video
        />
      )}
      {previewSrc && (
        <img
          src={previewSrc}
          alt={`${title} preview`}
          width={500}
          height={300}
          loading="lazy"
          decoding="async"
          onError={() => setPreviewIndex((index) => index + 1)}
          className="h-40 w-full overflow-hidden object-cover object-top rounded-t-lg"
        />
      )}
      {!video && !previewSrc && (
        <div className="flex h-40 w-full items-center justify-center rounded-t-lg border-b border-muted/50 bg-muted/15 px-6">
          <span className="text-center text-lg font-semibold tracking-tight text-muted-foreground/70">
            {title}
          </span>
        </div>
      )}
    </>
  );

  return (
    <Card
      className={
        'flex flex-col overflow-hidden bg-background/30 backdrop-blur-xl border border-muted/75 gap-2 p-1 hover:shadow-lg transition-all duration-300 ease-out rounded-lg'
      }
    >
      <Link
        to="/projects/$slug"
        params={{ slug }}
        className={cn('block cursor-pointer', className)}
        aria-label={`Read the ${title} project notes`}
      >
        {media}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <div className="flex">
            <div className="flex-1">
              <CardTitle className="text-base">
                <Link
                  to="/projects/$slug"
                  params={{ slug }}
                  className="hover:underline"
                >
                  {title}
                </Link>
              </CardTitle>
            </div>
            <div>
              {openSource && (
                <Badge className="px-1 py-0 text-[10px]" variant="lime">
                  Open Source
                </Badge>
              )}
            </div>
          </div>

          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace('https://', '').replace('www.', '').replace('/', '')}
          </div>
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            <Markdown>{description}</Markdown>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <a
                href={link?.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </a>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
