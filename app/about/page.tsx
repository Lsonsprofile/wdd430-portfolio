import SkillCard from '@/components/SkillCard';

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="text-lg text-gray-700">
        This about page shares more information about my background and work. I am currently studying Web Full-Stack Development and learning how to build modern applications with Next.js.
      </p>
      
      <SkillCard 
        title="My Technical Skills" 
        skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js']} 
      />
    </main>
  );
}