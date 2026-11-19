import Link from 'next/link';
import Image from 'next/image';
import { Code, Database, Layout } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white pb-12">
      {/* Hero Section */}
      <section className="relative bg-blue-50 py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-extrabold text-[#1e3a5f] leading-tight mb-4">
              Emmanuel Ndogo - Full-Stack Developer
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              I am a full-stack developer learning Next.js and React. Here are some of my recent projects built with TypeScript, Tailwind CSS, and PostgreSQL.
            </p>
            <Link 
              href="/projects" 
              className="inline-block bg-[#2563eb] text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              View Projects &rarr;
            </Link>
          </div>
          <div className="md:w-1/2 relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-2xl">
            <Image 
              src="/Emmanuel.jpeg" 
              alt="Emmanuel Ndogo" 
              fill 
              className="object-cover object-[center_20%]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center">
            <Layout className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Frontend</h3>
            <p className="text-sm text-gray-500">Building responsive UIs with React and Tailwind CSS.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center">
            <Code className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Backend</h3>
            <p className="text-sm text-gray-500">Creating API routes and Server Actions.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center">
            <Database className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Database</h3>
            <p className="text-sm text-gray-500">Connecting to PostgreSQL for persistent data.</p>
          </div>
        </div>
      </section>
    </div>
  );
}