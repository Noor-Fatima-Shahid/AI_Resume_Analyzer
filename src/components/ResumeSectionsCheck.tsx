import type { ResumeSections } from "@/lib/types";

export default function ResumeSectionsCheck({
  resumeSections,
}: {
  resumeSections: ResumeSections;
}) {
  const allSections = [
    ...resumeSections.detectedSections.map((name) => ({ name, found: true })),
    ...resumeSections.missingSections.map((name) => ({ name, found: false })),
  ];

  return (
    <div>
      <h2 className="font-semibold text-gray-900 mb-1">Resume Sections</h2>
      <p className="text-sm text-gray-500 mb-5">
        Standard resume sections detected in your document.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {allSections.map(({ name, found }) => (
          <div
            key={name}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium ${
              found
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <span className="font-bold">{found ? "✓" : "✗"}</span>
            {name}
          </div>
        ))}
      </div>

      {resumeSections.missingSections.length > 0 && (
        <p className="text-xs text-gray-400 mt-4">
          Missing sections may still exist under a different heading name —
          this check looks for standard section titles.
        </p>
      )}
    </div>
  );
}