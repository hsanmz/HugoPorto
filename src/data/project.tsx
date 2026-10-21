import { GithubIcon, GlobeIcon } from 'lucide-react';

export const PROJECTS = [
  {
    title: 'PPDB PTDARRAHMAN',
    href: 'https://github.com/hsanmz/project-ppdb',
    dates: 'Aug 2026 — Present',
    active: true,
    openSource: true,
    description:
      "Integrated school admission (PPDB) and company profile platform for Pesantren Tahfidz Qur'an Ar-Rahman. A Turborepo monorepo covering a 7-step registration flow, document verification, TIU exams via Safe Exam Browser, 1:1 Tahfidz & interview booking, QRIS payments, digital LoA/SKD documents, an RBAC superadmin panel, a FastAPI core API with HTTP-only cookie JWT auth, and a WhatsApp notification gateway. An AI chatbot for the public site is planned.",
    technologies: [
      'React 19',
      'Next.js 16',
      'FastAPI',
      'MySQL',
      'Redis',
      'Docker',
      'Turborepo',
    ],
    links: [
      {
        type: 'Repository',
        href: 'https://github.com/hsanmz/project-ppdb',
        icon: <GithubIcon className="size-3" />,
      },
    ],
    image: '',
    video: '',
  },

  {
    title: 'Payroll PT PSF',
    href: 'https://payroll-app-ptpsf.hugoedmoundo.fun/',
    dates: 'May 2026',
    active: true,
    openSource: false,
    description:
      'Web-based Corporate Payroll Management System for PT Pangestu Suryaning Family. Automates employee data management, tracks attendance, and processes monthly salary distributions.',
    technologies: ['Laravel 11', 'MySQL', 'Tailwind CSS'],
    links: [
      {
        type: 'Website',
    href: 'https://payroll-app-ptpsf.vercel.app/',
        icon: <GlobeIcon className="size-3" />,
      },
    ],
    image: 'https://kikobzzqdpfbmwppfiem.supabase.co/storage/v1/object/public/media/projects/1780036933079-Screenshot%202026-05-29%20134157.png',
    video: '',
  },

  {
    title: 'LuminaPrep',
    href: 'https://github.com/iwansusanto/luminaprep',
    dates: '2026',
    active: true,
    openSource: true,
    description:
      'AI-powered educational and preparation platform delivering personalized, adaptive learning experiences. Built as a monorepo with a React + Vite frontend and a FastAPI backend (MySQL, Redis, Celery, ChromaDB) orchestrated via Docker Compose.',
    technologies: ['React 19', 'FastAPI', 'MySQL', 'Redis', 'Celery', 'ChromaDB', 'Docker'],
    links: [
      {
        type: 'Repository',
        href: 'https://github.com/iwansusanto/luminaprep',
        icon: <GithubIcon className="size-3" />,
      },
    ],
    image: '',
    video: '',
  },

  {
    title: 'Queue Flow',
    href: 'https://queue-flow-rouge.vercel.app/',
    dates: 'Apr 2026',
    active: true,
    openSource: true,
    description:
      'Task queue management application built with Supabase and React.',
    technologies: ['Supabase', 'Vite + React'],
    links: [
      {
        type: 'Website',
        href: 'https://queue-flow-rouge.vercel.app/',
        icon: <GlobeIcon className="size-3" />,
      },
      {
        type: 'Repository',
        href: 'https://github.com/HugoEdmoundo/queue-.app',
        icon: <GithubIcon className="size-3" />,
      },
    ],
    image: 'https://kikobzzqdpfbmwppfiem.supabase.co/storage/v1/object/public/media/projects/1775642153396-Screenshot%202026-04-08%20165534.png',
    video: '',
  },

];
