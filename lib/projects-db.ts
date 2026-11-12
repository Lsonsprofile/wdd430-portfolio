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