import Link from 'next/link';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-4xl mx-auto p-8">
      <nav className="flex gap-4 mb-8 border-b pb-4">
        <Link href="/projects" className="text-blue-600 hover:underline">Overview</Link>
        <Link href="/projects/opensource" className="text-blue-600 hover:underline">Open Source</Link>
        <Link href="/projects/school" className="text-blue-600 hover:underline">School</Link>
      </nav>
      {children}
    </section>
  );
}