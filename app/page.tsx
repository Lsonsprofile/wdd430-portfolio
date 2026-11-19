import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white pb-12">
      {/* Hero Section */}
      <section className="relative bg-blue-50 py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-extrabold text-[#1e3a5f] leading-tight mb-4">
              Plan. Serve.<br />Strengthen.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              A simple way to organize and share sacrament meeting programs for your ward.
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
              src="/temple.webp" 
              alt="Temple" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center">
            <Calendar className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Organize</h3>
            <p className="text-sm text-gray-500">Plan meeting agendas with ease.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center">
            <Users className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Serve</h3>
            <p className="text-sm text-gray-500">Support leaders and speakers.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center">
            <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Share</h3>
            <p className="text-sm text-gray-500">View and print current and past programs.</p>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="text-center mt-16 italic text-gray-500 text-sm">
        <p>"For where two or three are gathered together in my name,</p>
        <p>there am I in the midst of them."</p>
        <p className="mt-2 font-semibold">Matthew 18:20</p>
      </section>
    </div>
  );
}