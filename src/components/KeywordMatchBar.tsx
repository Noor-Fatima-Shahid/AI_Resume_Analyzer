import type { KeywordMatch } from "@/lib/types";

export default function KeywordMatchBar({
  keywordMatch,
}: {
  keywordMatch: KeywordMatch;
}) {
  if (keywordMatch.totalCount === 0) {
    return null;
  }

  const barColor =
    keywordMatch.percentage >= 70
      ? "bg-blue-600"
      : keywordMatch.percentage >= 40
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-gray-900">Job Description Match</h2>
        <span className="text-sm font-semibold text-gray-700">
          {keywordMatch.percentage}%
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        {keywordMatch.matchedCount} of {keywordMatch.totalCount} key terms from
        the job description were found in your resume.
      </p>
      <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden mb-5">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-700`}
          style={{ width: `${keywordMatch.percentage}%` }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {keywordMatch.matchedTerms.map((term) => (
          <span
            key={term}
            className="inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 text-green-700 text-sm px-3 py-1.5"
          >
            <span className="font-bold">✓</span>
            {term}
          </span>
        ))}
        {keywordMatch.missingTerms.map((term) => (
          <span
            key={term}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-1.5"
          >
            <span className="font-bold">✗</span>
            {term}
          </span>
        ))}
      </div>
    </div>
  );
}