import { createProject } from '@/lib/actions';

export default function CreateProjectPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Add New Project</h1>
      
      <form action={createProject} className="space-y-6 bg-white p-6 rounded-lg shadow border border-gray-200">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            required 
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            id="description" 
            name="description" 
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
            required 
            placeholder="React, Next.js, Tailwind"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Save Project
        </button>
      </form>
    </div>
  );
}