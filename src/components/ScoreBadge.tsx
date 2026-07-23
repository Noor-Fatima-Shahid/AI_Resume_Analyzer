import { scoreColor } from "@/lib/types";

export default function ScoreBadge({
  score,
}: {
  score: number;
}) {
  return (
    <div
      className={`w-28 h-28 rounded-full border-4 flex items-center justify-center mx-auto ${scoreColor(
        score
      )}`}
    >
      <span className="text-3xl font-bold">
        {score}
      </span>
    </div>
  );
}