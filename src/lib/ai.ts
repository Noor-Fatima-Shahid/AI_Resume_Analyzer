import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "./prompt";
import type { AIResponse } from "./types";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("AI_API_KEY is missing.");
}

const ai = new GoogleGenAI({
  apiKey,
});

export async function analyzeResume(
  resumeText: string,
  jobDescription: string
): Promise<AIResponse> {
  const userMessage = jobDescription.trim()
    ? `Resume text:

${resumeText}

Job description:

${jobDescription}`
    : `Resume text:

${resumeText}

No job description was provided.`;

  const response = await ai.models.generateContent({
    model: "models/gemini-3-flash-preview",
    contents: `${SYSTEM_PROMPT}\n\n${userMessage}`,
  });

  const rawText = response.text ?? "";

  const cleaned = rawText
    .replace(/```json\s*/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned) as AIResponse;
  } catch (err) {
    console.error("Gemini response:");
    console.error(rawText);
    throw new Error("AI_PARSE_ERROR");
  }
}