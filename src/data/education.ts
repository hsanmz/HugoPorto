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
    year: 'Jan 2026 — May 2026',
    location: 'Online',
    logo: '/images/logos/devscale.png',
    details: '10-week intensive program covering FastAPI, AI Integration, RAG Systems, and Production Deployment. Built Luminaprep as final project.',
  },
  {
    institution: 'SMK Informatika Bisnis',
    type: 'Formal',
    program: 'Teknik Komputer & Jaringan (TKJ)',
    year: 'Graduated',
    location: 'Bekasi',
    logo: '/images/logos/smk.jpg',
    details: 'Vocational program in Computer and Network Engineering covering network administration, system configuration, and IT infrastructure.',
  },
];
