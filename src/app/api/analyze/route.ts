import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("resume") as File | null;
  const jobDescription = (formData.get("jobDescription") as string) ?? "";

  if (!file) {
    return NextResponse.json(
      { error: "No file received." },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Empty PDF
  if (buffer.length === 0) {
    return NextResponse.json(
      {
        error: "The uploaded file is empty. Please choose a valid PDF.",
      },
      { status: 400 }
    );
  }

  let extractedText: string;

  try {
    const data = await pdfParse(buffer);
    extractedText = data.text.trim();

    // Temporary log for Day 3 testing
    console.log({
      filename: file.name,
      length: extractedText.length,
      preview: extractedText.slice(0, 300),
    });

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

  // Scanned or image-only PDF
  if (extractedText.length < 30) {
    return NextResponse.json(
      {
        error:
          "We couldn't find readable text in this PDF. It may be a scanned image. Please upload a text-based PDF.",
      },
      { status: 422 }
    );
  }

  return NextResponse.json({
    message: "Text extracted successfully",
    textLength: extractedText.length,
    preview: extractedText.slice(0, 500),
    jobDescriptionProvided: jobDescription.length > 0,
  });
}