import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { analyzeResume } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("resume") as File | null;
  const jobDescription =
    (formData.get("jobDescription") as string) ?? "";

  if (!file) {
    return NextResponse.json(
      { error: "No file received" },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Empty PDF
  if (buffer.length === 0) {
    return NextResponse.json(
      {
        error:
          "The uploaded file is empty. Please choose a valid PDF.",
      },
      { status: 400 }
    );
  }

  let extractedText: string;

  try {
    const data = await pdfParse(buffer);
    extractedText = data.text.trim();
  } catch (err) {
    console.error("PDF parse error:", err);

    return NextResponse.json(
      {
        error:
          "Couldn't read this PDF. It may be corrupted or password-protected.",
      },
      { status: 400 }
    );
  }

  // Scanned/image-only PDF
  if (extractedText.length < 30) {
    return NextResponse.json(
      {
        error:
          "We couldn't find readable text in this PDF. It may be a scanned image.",
      },
      { status: 422 }
    );
  }

  try {
    const result = await analyzeResume(
      extractedText,
      jobDescription
    );

    console.log("AI Result:", result);

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("AI analysis error:", err);

    if (err.message === "AI_PARSE_ERROR") {
      return NextResponse.json(
        {
          error:
            "The AI response couldn't be processed. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        error:
          "AI analysis failed. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}