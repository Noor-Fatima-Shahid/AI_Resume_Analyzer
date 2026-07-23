export interface AnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestions: string[];
}

export function scoreColor(score: number): string {
  if (score >= 80) return "text-green-600 border-green-600";
  if (score >= 60) return "text-yellow-600 border-yellow-600";
  return "text-red-600 border-red-600";
}