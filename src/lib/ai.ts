import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "./prompt";

const apiKey = process.env.AI_API_KEY;

if (!apiKey) {
  throw new Error("AI_API_KEY is missing.");
}

const client = new Anthropic({
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

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const rawText = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");

  // Remove markdown fences if Claude adds them
  const cleaned = rawText
    .replace(/```json\s*/g, "")
    .replace(/```/g, "")
    .trim();

  let parsed: AnalysisResult;

  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse AI response:");
    console.error(cleaned);

    throw new Error("AI_PARSE_ERROR");
  }

  return parsed;
}