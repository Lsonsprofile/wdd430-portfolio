import { Suspense } from 'react';
import ProjectSearch from '@/components/ProjectSearch';
import Pagination from '@/components/Pagination';
import ProjectCard from '@/components/ProjectCard'; // Import the card!
import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';

async function ProjectListWithPagination({ query, currentPage }: { query: string; currentPage: number }) {
  const projects = await fetchFilteredProjects(query, currentPage);
  const totalPages = await fetchProjectsPages(query);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 my-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
      {projects.length === 0 && <p className="text-gray-500">No projects found.</p>}
      
      <Pagination totalPages={totalPages} />
    </div>
  );
}

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

export default function ProjectsOverview(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects Overview</h1>
        {/* Link to the create page */}
        <a href="/projects/create" className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition">
          + Add Project
        </a>
      </div>
      
      <Suspense fallback={<div className="h-10 mb-6" />}>
        <ProjectSearch />
      </Suspense>

      <Suspense fallback={<p>Loading search...</p>}>
        <ProjectsData searchParams={props.searchParams || Promise.resolve({})} />
      </Suspense>
    </div>
  );
}