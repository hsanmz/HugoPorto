import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router';
import { ChevronRightIcon, GithubIcon, LinkedinIcon } from 'lucide-react';

import { ExperienceCard } from '@/components/experience-card';
import { SmoothScrollProvider } from '@/components/lenis';
import { BlurFade } from '@/components/magicui/blur-fade';
import BlurFadeText from '@/components/magicui/blur-fade-text';
import { PostCard } from '@/components/post-card';
import { ProjectCard } from '@/components/project-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EDUCATION } from '@/data/education';
import { EXPERIENCE } from '@/data/experience';
import { PROJECTS } from '@/data/project';
import { SKILLS } from '@/data/skills';
import { getAllPosts } from '@/lib/post';

export const Route = createFileRoute('/')({
  component: App,
  loader: async () => {
    const posts = await getAllPosts();
    return { posts };
  },
});

const BLUR_FADE_DELAY = 0.04;

function App() {
  const { posts } = useLoaderData({ from: '/' });

  return (
    <SmoothScrollProvider>
      <div className="flex flex-col space-y-10 pb-14">
        <section id="hero">
          <div className="mx-auto w-full space-y-8">
            <div className="gap-2 flex justify-between">
              <div className="flex-col flex flex-1 space-y-1.5">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent"
                  yOffset={8}
                  text={`Hi, I'm Ziyad`}
                />
                <BlurFadeText
                  className="text-sm font-medium"
                  delay={BLUR_FADE_DELAY}
                  text="(Muhammad Ziyad Hasan)"
                />
                <BlurFadeText
                  className="max-w-[580px] md:text-xl"
                  delay={BLUR_FADE_DELAY}
                  text="✦ Experienced Software Engineer focused on TypeScript and Python, with a growing passion for AI and Backend Engineering."
                />
              </div>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <Avatar className="size-28 border">
                  <AvatarImage
                    alt="Muhammad Ziyad Hasan"
                    src="https://avatars.githubusercontent.com/u/179559260?s=400&u=676831c7be288dd9f8f97ef9607d476f7ccb7194&v=4"
                  />
                  <AvatarFallback>Z</AvatarFallback>
                </Avatar>
              </BlurFade>
            </div>
          </div>

          <a
            href="https://cal.com/hugoedm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="mt-4" size="sm">
              Book a Call
            </Button>
          </a>
        </section>
        <section id="about">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="prose max-w-full text-pretty text-sm text-muted-foreground dark:prose-invert">
              Experienced Software Engineer focused on TypeScript and Python,
              with a growing passion for AI and Backend Engineering. I specialize
              in crafting robust backend systems, APIs, and infrastructure, while
              still being able to ship full-stack features when needed. Always
              exploring new tech, from cloud infrastructure to AI integration, to
              build solutions that actually matter.
            </div>
          </BlurFade>
        </section>
        <section id="experience">
          <BlurFade delay={BLUR_FADE_DELAY * 4} className="mb-4">
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <div className="flex min-h-0 flex-col gap-y-4">
            {EXPERIENCE.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 5 + id * 0.05}
              >
                <ExperienceCard
                  key={work.company}
                  logoUrl={work.logo ?? ''}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.companyUrl}
                  badges={work.technologies}
                  period={work.dates}
                  description={work.description}
                  location={work.location}
                />
              </BlurFade>
            ))}
          </div>
        </section>
        <section id="work" className="mt-4">
          <BlurFade
            delay={BLUR_FADE_DELAY * 6 + EXPERIENCE.length * 0.05}
            className="mb-4"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Work
                </div>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  My Projects and Contributions
                </h2>
                <p className="text-muted-foreground text-sm md:text-base/relaxed">
                  I&apos;ve delivered impactful enterprise solutions and
                  customer-facing applications that drive business value.
                </p>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 7 + EXPERIENCE.length * 0.05}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS.map((project) => (
                <ProjectCard
                  key={project.title}
                  dates={project.dates}
                  description={project.description}
                  tags={project.technologies}
                  title={project.title}
                  href={project.href}
                  links={project.links}
                  image={project.image}
                  video={project.video}
                  openSource={project.openSource}
                />
              ))}
            </div>
          </BlurFade>

          {/* <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <div className="flex justify-center mt-4">
            <Button size="sm" variant="link" className="text-muted-foreground">
              View More <ChevronRightIcon />
            </Button>
          </div>
        </BlurFade> */}
        </section>
        {posts.length > 0 && (
        <section id="posts" className="mt-4">
          <BlurFade
            delay={BLUR_FADE_DELAY * 12 + EXPERIENCE.length * 0.05}
            className="mb-4"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Blog Posts
                </div>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  Check out my latest blog posts
                </h2>
                <p className="text-muted-foreground text-sm md:text-base/relaxed">
                  I&apos;ve written a variety of blog posts, from technical
                  tutorials to personal stories.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 13 + EXPERIENCE.length * 0.05}>
            <div className="grid md:grid-cols-2 gap-4">
              {posts.map((post) => (
                <PostCard
                  key={post.slug}
                  title={post.metadata.title}
                  href={`/blog/${post.slug}`}
                  description={post.metadata.summary}
                  dates={post.metadata.publishedAt}
                  image={post.metadata.image}
                />
              ))}
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <div className="flex justify-center mt-4">
              <Link to="/blog">
                <Button
                  size="sm"
                  variant="link"
                  className="text-muted-foreground"
                >
                  View More <ChevronRightIcon />
                </Button>
              </Link>
            </div>
          </BlurFade>
        </section>
        )}
        <section id="skills" className="mt-4">
          <BlurFade delay={BLUR_FADE_DELAY * 15} className="mb-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Skills & Tools
                </div>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  Tech Stack
                </h2>
                <p className="text-muted-foreground text-sm md:text-base/relaxed">
                  Technologies and tools I work with.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-4">
              {(['Languages', 'Frameworks', 'Databases', 'DevOps & Tools', 'Other'] as const).map(
                (category) => {
                  const categorySkills = SKILLS.filter((s) => s.category === category);
                  if (categorySkills.length === 0) return null;
                  return (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <Badge key={skill.name} variant="secondary">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </BlurFade>
        </section>
        <section id="education" className="mt-4">
          <BlurFade delay={BLUR_FADE_DELAY * 17} className="mb-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Education
                </div>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  Education
                </h2>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 18}>
            <div className="flex min-h-0 flex-col gap-y-4">
              {EDUCATION.map((edu, id) => (
                <BlurFade key={edu.institution} delay={BLUR_FADE_DELAY * 19 + id * 0.05}>
                  <ExperienceCard
                    logoUrl={edu.logo ?? ''}
                    altText={edu.institution}
                    title={edu.institution}
                    subtitle={edu.program}
                    href=""
                    badges={[edu.type]}
                    period={edu.year}
                    description={edu.details || edu.location}
                    location={edu.location}
                  />
                </BlurFade>
              ))}
            </div>
          </BlurFade>
        </section>
        <section id="contact" className="mt-4">
          <BlurFade delay={BLUR_FADE_DELAY * 20} className="mb-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Contact
                </div>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground text-sm md:text-base/relaxed">
                  Feel free to reach out through any of these platforms.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 21}>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/HugoEdmoundo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <GithubIcon className="size-4 mr-2" />
                  GitHub
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-ziyad-hasan-95b1a1360/?locale=in"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <LinkedinIcon className="size-4 mr-2" />
                  LinkedIn
                </Button>
              </a>
            </div>
          </BlurFade>
        </section>
      </div>
    </SmoothScrollProvider>
  );
}
