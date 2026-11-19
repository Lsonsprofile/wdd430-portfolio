import Link from 'next/link';
import { deleteProject } from '@/lib/actions';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({ id, title, description, technologies, link }: ProjectCardProps) {
  return (
    <article className="p-5 border border-gray-200 bg-white rounded-lg shadow-sm flex flex-col justify-between hover:shadow-md transition">
      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span key={tech} className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md">
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Button Container */}
      <div className="flex flex-wrap gap-2 items-center mt-auto pt-4 border-t border-gray-100">
        
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition"
          >
            View Project
          </a>
        )}
        
        <Link 
          href={`/projects/${id}/edit`} 
          className="px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-100 transition"
        >
          Edit
        </Link>

        <form action={async () => {
          'use server';
          await deleteProject(String(id));
        }}>
          <button 
            type="submit" 
            className="px-3 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-md hover:bg-red-100 transition"
          >
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}