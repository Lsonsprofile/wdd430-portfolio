import { Suspense } from 'react';
import { headers } from 'next/headers';
import type { Project } from '@/lib/projects-db';

// Skeleton for the component fallback
function ProjectSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-32 rounded-xl bg-slate-200" />
      <div className="h-32 rounded-xl bg-slate-200" />
    </div>
  );
}

async function getSchoolProjects() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  
  const res = await fetch(`${protocol}://${host}/api/projects?type=school`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

async function SchoolList() {
  const projects = await getSchoolProjects();
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

export default function SchoolProjects() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">School Projects</h1>
      <Suspense fallback={<ProjectSkeleton />}>
        <SchoolList />
      </Suspense>
    </div>
  );
}