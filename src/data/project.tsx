import { GlobeIcon } from 'lucide-react';

export const PROJECTS = [
  {
    slug: 'ppdb-ptdarrahman',
    title: 'PPDB PTDARRAHMAN',
    href: '',
    dates: 'Aug 2026 - Present',
    active: true,
    openSource: true,
    description:
      "PPDB and company profile for Pesantren Tahfidz Qur'an Ar-Rahman. The system runs as a pnpm and Turborepo workspace: separate React frontends for registration and the superadmin panel, a Next.js public site, a FastAPI core API on MySQL and Redis, and a Node WhatsApp gateway. A candidate moves through seven registration steps, a health questionnaire, document checks, a TIU exam in Safe Exam Browser, Tahfidz and interview bookings, QRIS payment, and digital LoA and SKD documents. Staff verify each stage in an RBAC panel, while a BullMQ queue sends WhatsApp updates. Receipts and LoA carry HMAC tokens so the public can verify them without an account. An AI chatbot for the public site is planned.",
    technologies: [
      'React 19',
      'Next.js 16',
      'FastAPI',
      'MySQL',
      'Redis',
      'Docker',
      'Turborepo',
    ],
    links: [],
    image: '',
    video: '',
  },

  {
    slug: 'payroll-pt-psf',
    title: 'Payroll PT PSF',
    href: 'https://payroll-app-ptpsf.vercel.app/',
    dates: 'May 2026',
    active: true,
    openSource: false,
    description:
      "Payroll system for PT Pangestu Suryaning Famili. A Laravel 11 app keeps employee records and attendance in MySQL, then turns the month's attendance into salary runs. Staff manage employees, review attendance, and process monthly distributions from one admin panel. Tailwind CSS handles the interface.",
    technologies: ['Laravel 11', 'MySQL', 'Tailwind CSS'],
    links: [
      {
        type: 'Website',
        href: 'https://payroll-app-ptpsf.vercel.app/',
        icon: <GlobeIcon className="size-3" />,
      },
    ],
    image: '',
    video: '',
  },

  {
    slug: 'luminaprep',
    title: 'LuminaPrep',
    href: '',
    dates: '2026',
    active: true,
    openSource: true,
    description:
      'AI learning platform built as a monorepo. The React 19 frontend talks to a FastAPI backend through an Express BFF proxy. MySQL stores application data, Redis and Celery run background jobs, and ChromaDB handles vector storage. Langfuse records LLM traces and latency probes so the team can inspect AI features after deployment. Docker Compose starts the frontend, API, Celery worker, Redis, MySQL, and phpMyAdmin together.',
    technologies: [
      'React 19',
      'FastAPI',
      'MySQL',
      'Redis',
      'Celery',
      'ChromaDB',
      'Docker',
    ],
    links: [],
    image: '',
    video: '',
  },

  {
    slug: 'queue-flow',
    title: 'Queue Flow',
    href: 'https://queue-flow-rouge.vercel.app/',
    dates: 'Apr 2026',
    active: true,
    openSource: true,
    description:
      'Queue management app built with Vite, React, and Supabase. Supabase provides the database and API, so the frontend runs without a separate server. The app organizes queues by period.',
    technologies: ['Supabase', 'Vite + React'],
    links: [
      {
        type: 'Website',
        href: 'https://queue-flow-rouge.vercel.app/',
        icon: <GlobeIcon className="size-3" />,
      },
    ],
    image: '',
    video: '',
  },
];
