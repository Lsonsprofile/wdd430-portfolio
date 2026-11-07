async function getSchoolProjects() {
  const res = await fetch('http://localhost:3000/api/projects?type=school', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export default async function SchoolProjects() {
  const projects = await getSchoolProjects();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">School Projects</h1>
      <ul className="space-y-4">
        {projects.map((project: any) => (
          <li key={project.id} className="p-4 border rounded bg-gray-50">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Technologies:</strong> {project.technologies.join(', ')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}