import { neon } from '@neondatabase/serverless';

export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
}

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const sql = neon(connectionString!);

export async function getProjects(type?: string | null): Promise<Project[]> {
  if (type) {
    const rows = await sql`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id
    `;
    return rows as Project[];
  }
  const rows = await sql`SELECT * FROM projects ORDER BY id`;
  return rows as Project[];
}

export async function getProjectById(id: number): Promise<Project | null> {
  const rows = await sql`
    SELECT * FROM projects WHERE id = ${id}
  `;
  return (rows[0] as Project) ?? null;
}



const ITEMS_PER_PAGE = 6;

export async function fetchFilteredProjects(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const searchPattern = `%${query}%`;

  const rows = await sql`
    SELECT * FROM projects
    WHERE title ILIKE ${searchPattern} 
       OR description ILIKE ${searchPattern}
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;
  return rows as Project[];
}

export async function fetchProjectsPages(query: string) {
  const searchPattern = `%${query}%`;

  const rows = await sql`
    SELECT COUNT(*)::int AS count FROM projects
    WHERE title ILIKE ${searchPattern} 
       OR description ILIKE ${searchPattern}
  `;
  
  const count = rows[0]?.count ?? 0;
  return Math.ceil(count / ITEMS_PER_PAGE);
}