export default function Home() { 
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700 mb-8">
          I am a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
        <a 
          href="/projects" 
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          View My Projects
        </a>
      </section>
    </main>
  );
}