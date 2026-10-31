interface SkillCardProps {
  title: string;
  skills: string[];
}

export default function SkillCard({ title, skills }: SkillCardProps) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm mt-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}