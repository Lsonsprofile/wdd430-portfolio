import { Suspense } from 'react';
import ProjectSearch from '@/components/ProjectSearch';
import Pagination from '@/components/Pagination';
import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';
import type { Project } from '@/lib/projects-db';

// 1. This component fetches the data
async function ProjectListWithPagination({ query, currentPage }: { query: string; currentPage: number }) {
  const projects = await fetchFilteredProjects(query, currentPage);
  const totalPages = await fetchProjectsPages(query);

  return (
    <div>
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
        {projects.length === 0 && <p className="text-gray-500">No projects found.</p>}
      </ul>
      <Pagination totalPages={totalPages} />
    </div>
  );
}

// 2. This component reads the search parameters safely inside Suspense
async function ProjectsData({ searchParams }: { searchParams: Promise<{ query?: string; page?: string }> }) {
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;

  return (
    <Suspense fallback={
      <div className="animate-pulse space-y-4">
        <div className="h-32 rounded-xl bg-slate-300" />
        <div className="h-32 rounded-xl bg-slate-300" />
      </div>
    }>
      <ProjectListWithPagination query={query} currentPage={currentPage} />
    </Suspense>
  );
}

// 3. The main page just renders the Search and the Data component
export default function ProjectsOverview(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects Overview</h1>
      
      {/* We wrapped the search in Suspense so Next.js 16 stops complaining */}
      <Suspense fallback={<div className="h-10 mb-6" />}>
        <ProjectSearch />
      </Suspense>

      <Suspense fallback={<p>Loading search...</p>}>
        <ProjectsData searchParams={props.searchParams || Promise.resolve({})} />
      </Suspense>
    </div>
  );
}