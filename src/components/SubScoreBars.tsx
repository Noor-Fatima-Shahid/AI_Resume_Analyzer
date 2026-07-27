import type { SubScores } from "@/lib/types";

const LABELS: Record<keyof SubScores, string> = {
  formatting: "Formatting",
  keywordRelevance: "Keyword Relevance",
  impact: "Quantified Impact",
  atsCompatibility: "ATS Compatibility",
};

function barColor(value: number) {
  if (value >= 70) return "bg-blue-600";
  if (value >= 40) return "bg-yellow-500";
  return "bg-red-500";
}

export default function SubScoreBars({ subScores }: { subScores: SubScores }) {
  const entries = Object.entries(subScores) as [keyof SubScores, number][];

  return (
    <div className="space-y-4">
      {entries.map(([key, value]) => (
        <div key={key}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-gray-700">
              {LABELS[key]}
            </span>
            <span className="text-sm font-semibold text-gray-900">{value}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`h-full rounded-full ${barColor(value)} transition-all duration-700`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}