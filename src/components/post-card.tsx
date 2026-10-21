import Markdown from 'react-markdown';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
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

export function PostCard({
  title,
  href,
  description,
  dates,
  link,
  image,
  video,
  className,
}: Props) {
  // Blog post hrefs are internal paths like /blog/my-slug. Use a plain <a> so
  // we don't have to cast the string to a TanStack Router typed path.
  const CardLink = ({
    children,
    className: linkClassName,
  }: {
    children: React.ReactNode;
    className?: string;
  }) =>
    href ? (
      <a href={href} className={linkClassName}>
        {children}
      </a>
    ) : (
      <div className={linkClassName}>{children}</div>
    );

  return (
    <Card
      className={
        'flex flex-col gap-0 p-0 overflow-hidden bg-background/30 backdrop-blur-xl border border-muted/75 hover:shadow-lg transition-all duration-300 ease-out h-full'
      }
    >
      <CardLink className={cn('block cursor-pointer', className)}>
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
        {image && (
          <img
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
      </CardLink>
      <CardHeader className="px-3 py-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">
            {new Date(dates).toLocaleDateString('en-ID', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace('https://', '').replace('www.', '').replace('/', '')}
          </div>
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            <Markdown>{description}</Markdown>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
