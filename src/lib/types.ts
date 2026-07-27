export interface KeywordMatch {
  percentage: number;
  matchedCount: number;
  totalCount: number;
}

export interface SubScores {
  formatting: number;
  keywordRelevance: number;
  impact: number;
  atsCompatibility: number;
}

export interface AIResponse {
  score: number;
  subScores: SubScores;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestions: string[];
}

export interface AnalysisResult extends AIResponse {
  keywordMatch: KeywordMatch;
}

export function scoreColor(score: number): string {
  if (score >= 80) {
    return "border-green-500 text-green-600";
  }

  if (score >= 60) {
    return "border-yellow-500 text-yellow-600";
  }

  return "border-red-500 text-red-600";
}