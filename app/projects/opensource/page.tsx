import { Suspense } from 'react';
import { connection } from 'next/server';
import type { Project } from '@/lib/projects-db';

async function getOpenSourceProjects() {
  await connection();
  const res = await fetch('http://localhost:3000/api/projects?type=opensource', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

async function OpenSourceList() {
  const projects = await getOpenSourceProjects();
  return (
    <ul className="space-y-4">
      {projects.map((project: Project) => (
        <li key={project.id} className="p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold">{project.title}</h2>
          <p className="text-gray-600">{project.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Technologies:</strong> {project.technologies.join(', ')}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function OpenSourceProjects() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Open Source Projects</h1>
      <Suspense fallback={<p>Loading open source projects...</p>}>
        <OpenSourceList />
      </Suspense>
    </div>
  );
}