import { Suspense } from 'react';
import { headers } from 'next/headers'; // 1. Import headers
import type { Project } from '@/lib/projects-db';

async function getProjects() {
  const headersList = await headers(); // 2. Get the headers
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  
  // 3. Use the dynamic URL
  const res = await fetch(`${protocol}://${host}/api/projects`, { cache: 'no-store' });
  
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

async function ProjectList() {
  const projects = await getProjects();
  return (
    <ul className="space-y-4">
      {projects.map((project: Project) => (
        <li key={project.id} className="p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold">{project.title}</h2>
          <p className="text-gray-600">{project.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Technologies:</strong> {project.technologies.join(', ')}
          </p>
          <span className="text-sm text-blue-600 font-bold uppercase mt-2 block">{project.type}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectsOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects Overview</h1>
      <Suspense fallback={<p>Loading projects...</p>}>
        <ProjectList />
      </Suspense>
    </div>
  );
}