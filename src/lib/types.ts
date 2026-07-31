export interface KeywordMatch {
  percentage: number;
  matchedCount: number;
  totalCount: number;
  matchedTerms: string[];
  missingTerms: string[];
}

export interface SubScores {
  formatting: number;
  keywordRelevance: number;
  impact: number;
  atsCompatibility: number;
}

export interface AtsCheck {
  isAtsFriendly: boolean;
  issues: string[];
}

export interface AIResponse {
  score: number;
  summary: string;
  subScores: SubScores;
  keywordMatch: KeywordMatch;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestions: string[];
}

export interface AnalysisResult extends AIResponse {
  atsCheck: AtsCheck;
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