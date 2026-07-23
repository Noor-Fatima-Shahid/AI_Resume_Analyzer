export default function SuggestionCards({
  suggestions,
}: {
  suggestions: string[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 bg-blue-50"
        >
          <p className="text-sm">
            {suggestion}
          </p>
        </div>
      ))}
    </div>
  );
}