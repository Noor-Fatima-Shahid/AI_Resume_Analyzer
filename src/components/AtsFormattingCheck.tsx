import type { AtsCheck } from "@/lib/types";

export default function AtsFormattingCheck({ atsCheck }: { atsCheck: AtsCheck }) {
  return (
    <div>
      <h2 className="font-semibold text-gray-900 mb-1">ATS Formatting Check</h2>
      <p className="text-sm text-gray-500 mb-5">
        Structural checks for elements that commonly break Applicant Tracking System parsing.
      </p>

      {atsCheck.isAtsFriendly ? (
        <div className="flex items-center gap-2.5 rounded-xl border border-green-200 bg-green-50 text-green-700 px-4 py-3 text-sm font-medium">
          <span className="font-bold">✓</span>
          No formatting issues detected in this scan.
        </div>
      ) : (
        <div className="space-y-2.5">
          {atsCheck.issues.map((issue, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 rounded-xl border border-yellow-200 bg-yellow-50 text-yellow-800 px-4 py-3 text-sm"
            >
              <span className="font-bold mt-0.5">⚠</span>
              <span>{issue}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}