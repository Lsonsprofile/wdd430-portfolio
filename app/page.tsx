import ProjectList from '@/components/ProjectList';

const projects = [
  {
    title: 'React DOM Practice',
    description: 'A practice project comparing direct DOM manipulation with React components.',
    technologies: ['HTML', 'React', 'Babel'],
    link: 'https://github.com/Lsonsprofile/wdd430-portfolio',
  },
  {
    title: 'React Core Concepts',
    description: 'An interactive component demonstrating how React props and state work.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS'],
    link: 'https://github.com/Lsonsprofile/wdd430-portfolio',
  },
];

export default function Home() { 
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700">
          I am a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}