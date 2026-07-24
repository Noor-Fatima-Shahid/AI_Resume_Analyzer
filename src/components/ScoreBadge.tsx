function scoreTier(score: number) {
  if (score >= 85) return "Excellent — this resume is ready to send.";
  if (score >= 70) return "Strong resume, with room to polish.";
  if (score >= 50) return "Solid start — a few key improvements needed.";
  return "Needs significant revision before applying.";
}

export default function ScoreBadge({ score }: { score: number }) {
  const radius = 76;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[184px] h-[184px]">
        <svg height="184" width="184" className="-rotate-90">
          <circle
            stroke="#E5E7EB"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="92"
            cy="92"
          />
          <circle
            className="transition-all duration-1000"
            stroke="#2563EB"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={progress}
            r={normalizedRadius}
            cx="92"
            cy="92"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-blue-600">{score}</span>
          <span className="text-gray-400 text-sm mt-1">of 100</span>
        </div>
      </div>

      <p className="mt-5 text-sm text-gray-600 text-center max-w-[220px]">
        {scoreTier(score)}
      </p>
    </div>
  );
}