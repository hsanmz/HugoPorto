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
    dates: 'Mar 2026 - Present',
    description:
      'Built the payroll system for PT Pangestu Suryaning Famili in Laravel 11 and MySQL. Staff manage employee records, record attendance, and run monthly salary distributions from one admin panel.',
    location: 'Bekasi - Sentra Kota Jati Bening',
    logo: '/images/logos/pangestu.jpg',
    technologies: [
      'PHP',
      'JavaScript',
      'Laravel',
      'Tailwind',
      'WebSocket',
      'MySQL',
    ],
    title: 'Full Stack Developer',
  },
  {
    company: 'Crossing Hurdles',
    companyUrl: 'https://www.linkedin.com/company/crossing-hurdles/',
    dates: 'Jan 2026 - Mar 2026',
    description:
      "Built multi-agent benchmark tasks for SwarmBench from real open-source changes such as bug fixes, migrations, and refactors. Wrote Python verification scripts that check whether an agent's code change is correct.",
    location: 'Remote',
    logo: 'https://crossinghurdles.com/logo.svg',
    technologies: ['Python', 'Docker', 'AI/ML', 'CI/CD'],
    title: 'Backend Engineer',
  },
];
