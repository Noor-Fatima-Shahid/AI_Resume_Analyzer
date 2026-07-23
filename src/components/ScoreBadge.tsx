import { scoreColor } from "@/lib/types";

export default function ScoreBadge({
  score,
}: {
  score: number;
}) {
  return (
    <div
      className={`w-36 h-36 rounded-full border-4 flex items-center justify-center mx-auto ${scoreColor(
        score
      )}`}
    >
      <span className="text-5xl font-bold">
        {score}
      </span>
    </div>
  );
}