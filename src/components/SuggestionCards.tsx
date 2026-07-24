export default function SuggestionCards({ suggestions }: { suggestions: string[] }) {
  if (suggestions.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic">
        No suggestions available yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed"
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
}