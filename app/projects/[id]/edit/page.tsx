import { updateProject } from '@/lib/actions';
import { getProjectById } from '@/lib/projects-db';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
export const instant = false; // This page is statically generated at build time.

// Separate component so we can wrap the dynamic part in Suspense
async function EditForm({ id }: { id: string }) {
  const project = await getProjectById(Number(id));

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProject.bind(null, id);

  return (
    <form action={updateProjectWithId} className="space-y-6 bg-white p-6 rounded-lg shadow border border-gray-200">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          defaultValue={project.title}
          required 
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea 
          id="description" 
          name="description" 
          defaultValue={project.description}
          required 
          rows={4}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
        <input 
          type="text" 
          id="technologies" 
          name="technologies" 
          defaultValue={project.technologies.join(', ')}
          required 
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Update Project
      </button>
    </form>
  );
}

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      
      <Suspense fallback={<p>Loading project data...</p>}>
        <EditForm id={id} />
      </Suspense>
    </div>
  );
}