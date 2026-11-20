'use server';

import { z } from 'zod';
import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const sql = neon(connectionString!);

const ProjectFormSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  technologies: z.string().min(2),
});

export async function createProject(formData: FormData) {
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
  const type = 'school';

  try {
    await sql`
      INSERT INTO projects (title, description, type, technologies)
      VALUES (${title}, ${description}, ${type}, ${techArray})
    `;
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project. Please try again.');
  }

  revalidatePath('/projects');
  redirect('/projects');
}

export async function deleteProject(id: string) {
  try {
    await sql`DELETE FROM projects WHERE id = ${id}`;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project. Please try again later.');
  }
  
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

  try {
    await sql`
      UPDATE projects 
      SET title = ${title}, description = ${description}, technologies = ${techArray}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project. Please try again.');
  }

  revalidatePath('/projects');
  redirect('/projects');
}