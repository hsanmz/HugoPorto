export interface Experience {
  company: string;
  companyUrl: string;
  dates: string;
  description: string;
  location: string;
  logo?: string;
  technologies: string[];
  title: string;
}

export const EXPERIENCE: Experience[] = [
  {
    company: 'PT Pangestu Suryaning Famili',
    companyUrl: 'https://pangestu-sf.com/',
    dates: 'Mar 2026 — Present',
    description:
      'Built a web-based Corporate Payroll Management System using Laravel 11. Automated employee data management, tracked attendance, and processed monthly salary distributions efficiently.',
    location: 'Bekasi - Sentra Kota Jati Bening',
    logo: 'https://asset.loker.id/img/2025/05/IMG-20250522-WA0025-150x150.jpg',
    technologies: ['PHP', 'JavaScript', 'Laravel', 'Tailwind', 'WebSocket', 'MySQL'],
    title: 'FullStack Developer',
  },
  {
    company: 'Crossing Hurdles',
    companyUrl: 'https://www.linkedin.com/company/crossing-hurdles/',
    dates: 'Jan 2026 — Mar 2026',
    description:
      'SwarmBench Task Engineer SWE. Built multi-agent benchmark tasks based on real-world open-source code changes such as bug fixes, migrations, and refactors. Designed and implemented Python-based verification scripts to validate correctness of agent-generated code changes.',
    location: 'Remote',
    logo: 'https://crossinghurdles.com/logo.svg',
    technologies: ['Python', 'Docker', 'AI/ML', 'CI/CD'],
    title: 'Backend Engineer',
  },
];
