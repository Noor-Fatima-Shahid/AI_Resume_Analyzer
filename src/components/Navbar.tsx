export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-blue-600">
            <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 7h6v6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-bold text-lg text-blue-600">AI Resume Analyzer</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <span className="px-3 py-1.5 rounded-lg border border-dashed border-gray-300 text-gray-400">
            Dashboard
          </span>
          <span className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
            Resume Analysis
          </span>
          <span className="text-gray-400">Optimization</span>
          <span className="text-gray-400">Pricing</span>
        </div>

        <div className="flex items-center gap-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
            <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
            AI
          </div>
        </div>
      </div>
    </nav>
  );
}