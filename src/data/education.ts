export interface Education {
  institution: string;
  type: string;
  program: string;
  year: string;
  location: string;
  logo?: string;
  details?: string;
}

export const EDUCATION: Education[] = [
  {
    institution: 'Devscale Indonesia',
    type: 'Non-Formal',
    program: 'AI-Enabled Python Web Dev',
    year: 'Jan 2026 - May 2026',
    location: 'Online',
    logo: '/images/logos/devscale.png',
    details:
      '10-week program on FastAPI, AI integration, RAG systems, and production deployment. Built LuminaPrep as the final project.',
  },
  {
    institution: 'SMK Informatika Bisnis',
    type: 'Formal',
    program: 'Teknik Komputer & Jaringan (TKJ)',
    year: 'Graduated',
    location: 'Bekasi',
    logo: '/images/logos/smk.jpg',
    details:
      'Studied network administration, system configuration, and IT infrastructure.',
  },
];
