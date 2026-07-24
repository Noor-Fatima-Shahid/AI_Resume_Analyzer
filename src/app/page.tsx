"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import ScoreBadge from "@/components/ScoreBadge";
import FeedbackSection from "@/components/FeedbackSection";
import SuggestionCards from "@/components/SuggestionCards";
import MissingSkillTags from "@/components/MissingSkillTags";

import type { AnalysisResult } from "@/lib/types";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const MAX_SIZE_MB = 5;

  function validateFile(selected: File | undefined) {
    setError(null);
    setFile(null);

    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      return;
    }

    if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File must be under ${MAX_SIZE_MB}MB.`);
      return;
    }

    setFile(selected);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    validateFile(e.target.files?.[0]);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    validateFile(e.dataTransfer.files?.[0]);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function handleAnalyze() {
    if (!file) {
      setError("Please select a PDF resume first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function resetAnalyzer() {
    setResult(null);
    setFile(null);
    setJobDescription("");
    setError(null);
  }

  // ==========================
  // RESULTS SCREEN
  // ==========================

  if (result) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen py-10 px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Row 1: Score + Insight Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="flex flex-col items-center justify-center text-center">
                <h2 className="font-semibold text-gray-900 mb-6">Resume Score</h2>
                <ScoreBadge score={result.score} />
              </Card>

              <Card className="flex flex-col">
                <h2 className="font-semibold text-gray-900 mb-1">Insight Summary</h2>
                <p className="text-sm text-gray-500 mb-5">
                  AI-powered breakdown of your current professional profile.
                </p>

                <div className="space-y-3 flex-1">
                  {result.strengths.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="text-blue-500 mt-0.5">✦</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-xl text-sm font-semibold"
                  >
                    Download Report
                  </button>
                  <button
                    onClick={resetAnalyzer}
                    className="flex-1 border border-dashed border-gray-300 text-gray-500 hover:bg-gray-50 transition py-2.5 rounded-xl text-sm font-semibold"
                  >
                    Analyze Another Resume
                  </button>
                </div>
              </Card>
            </div>

            {/* Row 2: Strengths + Weaknesses */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <FeedbackSection title="Key Strengths" items={result.strengths} tone="positive" />
              </Card>

              <Card>
                <FeedbackSection
                  title="Areas for Improvement"
                  items={result.weaknesses}
                  tone="negative"
                />
              </Card>
            </div>

            {/* Row 3: Missing Skills */}
            <Card>
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold text-gray-900">Missing Top-Tier Skills</h2>
                {result.missingSkills.length > 0 && (
                  <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                    Recommended Additions
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-5">
                Keywords found in the job description but missing from your resume.
              </p>

              <MissingSkillTags skills={result.missingSkills} />
            </Card>

            {/* Row 4: Suggestions + Next Steps */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <h2 className="font-semibold text-gray-900 mb-1">AI Strategic Suggestions</h2>
                <p className="text-sm text-gray-500 mb-5">
                  Actionable edits to strengthen this resume.
                </p>
                <SuggestionCards suggestions={result.suggestions} />
              </Card>

              <div className="flex flex-col gap-6">
                <div className="rounded-2xl p-6 sm:p-7 shadow-sm bg-gray-900">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
                    Next Steps
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Review the flagged sections above",
                      "Apply the suggested edits",
                      "Re-run the analysis",
                    ].map((step, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-300 text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl p-6 sm:p-7 shadow-sm bg-blue-600 text-center">
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">ATS-Friendly Format</p>
                  <p className="text-blue-100 text-xs leading-relaxed">
                    Structure was checked against common applicant-tracking parsing rules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // ==========================
  // UPLOAD SCREEN
  // ==========================

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Level Up Your Application</h1>
            <p className="text-gray-500">
              Upload your resume and paste the job description. Our AI will analyze the match
              and provide actionable optimization insights.
            </p>
          </div>

          <Card>
            {loading ? (
              <div className="py-20 text-center">
                <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="mt-6 text-gray-500">Analyzing your resume...</p>
              </div>
            ) : (
              <>
                <label className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                  📄 Upload Your Resume
                </label>

                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center transition hover:border-blue-300 hover:bg-blue-50/40"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto mb-4 text-xl">
                    ⬆
                  </div>

                  <p className="text-gray-700 font-medium">Drag and drop your file here</p>
                  <p className="text-gray-400 text-sm mt-1 mb-5">
                    PDF files supported (Max {MAX_SIZE_MB}MB)
                  </p>

                  <label className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer">
                    Choose PDF
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  {file && (
                    <p className="mt-5 text-green-600 font-semibold text-sm break-all">
                      ✓ {file.name}
                    </p>
                  )}
                </div>

                <div className="mt-8">
                  <label className="block font-semibold text-gray-900 mb-3">
                    Job Description
                  </label>

                  <textarea
                    rows={6}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the target job description here..."
                    className="w-full rounded-xl border border-gray-300 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {error && (
                  <div className="mt-6 rounded-xl bg-red-50 border border-red-200 text-red-600 p-4 text-sm font-medium">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleAnalyze}
                  className="mt-8 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3.5 rounded-xl text-base font-semibold flex items-center justify-center gap-2"
                >
                  Analyze Resume →
                </button>
              </>
            )}
          </Card>
        </div>
      </main>
    </>
  );
}