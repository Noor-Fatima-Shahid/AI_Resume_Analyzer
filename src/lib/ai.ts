import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "./prompt";

const apiKey = process.env.AI_API_KEY;

if (!apiKey) {
  throw new Error("AI_API_KEY is missing.");
}

const ai = new GoogleGenAI({
  apiKey,
});

export interface AnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestions: string[];
}

export async function analyzeResume(
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult> {
  const userMessage = jobDescription.trim()
    ? `Resume text:

${resumeText}

Job description:

${jobDescription}`
    : `Resume text:

${resumeText}

No job description was provided.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `${SYSTEM_PROMPT}\n\n${userMessage}`,
  });

  const rawText = response.text ?? "";

  const cleaned = rawText
    .replace(/```json\s*/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned) as AnalysisResult;
  } catch (err) {
    console.error("Gemini response:");
    console.error(rawText);
    throw new Error("AI_PARSE_ERROR");
  }
}