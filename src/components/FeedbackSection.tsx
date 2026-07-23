export default function FeedbackSection({
  title,
  items,
  emptyMessage,
}: {
  title: string;
  items: string[];
  emptyMessage?: string;
}) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">
        {title}
      </h3>

      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">
          {emptyMessage ?? "None found."}
        </p>
      ) : (
        <ul className="list-disc list-inside space-y-1">
          {items.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}