import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("resume") as File | null;
  const jobDescription = formData.get("jobDescription") as string;

  if (!file) {
    return NextResponse.json(
      { error: "No file received" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Echo: file received",
    fileName: file.name,
    fileSize: file.size,
    jobDescriptionLength: jobDescription?.length ?? 0,
  });
}