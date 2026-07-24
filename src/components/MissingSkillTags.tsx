export default function MissingSkillTags({ skills }: { skills: string[] }) {
  if (skills.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic">
        No missing skills detected — nice work.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-sm px-3 py-1.5"
        >
          <span className="font-bold text-blue-500">+</span>
          {skill}
        </span>
      ))}
    </div>
  );
}