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
      ? "bg-green-500"
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
      <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-700`}
          style={{ width: `${keywordMatch.percentage}%` }}
        />
      </div>
    </div>
  );
}