export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'My First Open Source Contribution',
    description: 'A bug fix contributed to a popular library.',
    type: 'opensource',
    technologies: ['TypeScript', 'React'],
    link: 'https://github.com/example/repo'
  },
  {
    id: 2,
    title: 'Database Design Final Project',
    description: 'An ER diagram and normalized schema for a library system.',
    type: 'school',
    technologies: ['PostgreSQL', 'SQL']
  },
  {
    id: 3,
    title: 'Tailwind Profile Card',
    description: 'A styled profile card built with Tailwind utility classes.',
    type: 'school',
    technologies: ['Next.js', 'Tailwind CSS']
  }
];

export function getProjects(type?: string | null): Project[] {
  if (type) return projects.filter(p => p.type === type);
  return projects;
}

export function getProjectById(id: number): Project | null {
  return projects.find(p => p.id === id) ?? null;
}