type Tone = "positive" | "negative" | "neutral";

type ToneStyle = {
  badgeBg: string;
  badgeText: string;
  icon: string;
  markerColor: string;
  markerIcon: string;
};

const config: Record<Tone, ToneStyle> = {
  positive: {
    badgeBg: "bg-green-100",
    badgeText: "text-green-600",
    icon: "✓",
    markerColor: "text-green-600",
    markerIcon: "✓",
  },
  negative: {
    badgeBg: "bg-red-100",
    badgeText: "text-red-600",
    icon: "!",
    markerColor: "text-red-500",
    markerIcon: "✕",
  },
  neutral: {
    badgeBg: "bg-gray-100",
    badgeText: "text-gray-500",
    icon: "•",
    markerColor: "text-gray-400",
    markerIcon: "·",
  },
};
export default function FeedbackSection({
  title,
  items,
  emptyMessage,
  tone = "neutral",
}: {
  title: string;
  items: string[];
  emptyMessage?: string;
  tone?: Tone;
}) {
  const c = config[tone];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`w-6 h-6 rounded-full ${c.badgeBg} ${c.badgeText} flex items-center justify-center text-sm font-bold`}
        >
          {c.icon}
        </span>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500 italic">
          {emptyMessage ?? "None found."}
        </p>
      ) : (
        <ul className="space-y-2.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700">
              <span className={`${c.markerColor} font-bold mt-0.5 text-xs`}>
                {c.markerIcon}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}