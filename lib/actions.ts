'use server';

import { z } from 'zod';
import { neon } from '@neondatabase/serverless'; // Import neon, not sql
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Initialize the connection
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const sql = neon(connectionString!); // Create the sql instance here

const ProjectFormSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  technologies: z.string().min(2),
});

export async function createProject(formData: FormData) {
  // 1. Extract raw data from the form
  const raw = {
    title: formData.get('title'),
    description: formData.get('description'),
    technologies: formData.get('technologies'),
  };

  // 2. Validate using Zod
  const parsed = ProjectFormSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error('Invalid project input.');
  }

  const { title, description, technologies } = parsed.data;

  // 3. Split the comma-separated string into an array for Postgres
  const techArray = technologies.split(',').map(t => t.trim());
  const type = 'school'; // Defaulting to school for this assignment

  // 4. Insert into database
  await sql`
    INSERT INTO projects (title, description, type, technologies)
    VALUES (${title}, ${description}, ${type}, ${techArray})
  `;

  // 5. Refresh cache and redirect
  revalidatePath('/projects');
  redirect('/projects');
}

export async function deleteProject(id: string) {
  await sql`DELETE FROM projects WHERE id = ${id}`;
  revalidatePath('/projects');
}

export async function updateProject(id: string, formData: FormData) {
  const raw = {
    title: formData.get('title'),
    description: formData.get('description'),
    technologies: formData.get('technologies'),
  };

  const parsed = ProjectFormSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error('Invalid project input.');
  }

  const { title, description, technologies } = parsed.data;
  const techArray = technologies.split(',').map(t => t.trim());

  await sql`
    UPDATE projects 
    SET title = ${title}, description = ${description}, technologies = ${techArray}
    WHERE id = ${id}
  `;

  revalidatePath('/projects');
  redirect('/projects');
}