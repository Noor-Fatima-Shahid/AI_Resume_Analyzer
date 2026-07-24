import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}