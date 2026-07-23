"use client";

import { useState } from "react";
import ScoreBadge from "@/components/ScoreBadge";
import FeedbackSection from "@/components/FeedbackSection";
import SuggestionCards from "@/components/SuggestionCards";
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

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    validateFile(e.target.files?.[0]);
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();
    validateFile(e.dataTransfer.files?.[0]);
  }

  function handleDragOver(
    e: React.DragEvent<HTMLDivElement>
  ) {
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

      console.log("API response:", data);
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
      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Resume Analysis
        </h1>

        <div className="flex justify-center my-8">
          <ScoreBadge score={result.score} />
        </div>

        <div className="space-y-8">

          <FeedbackSection
            title="Strengths"
            items={result.strengths}
          />

          <FeedbackSection
            title="Weaknesses"
            items={result.weaknesses}
          />

          <FeedbackSection
            title="Missing Skills"
            items={result.missingSkills}
            emptyMessage="No job description provided, or no missing skills found."
          />

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Suggestions
            </h2>

            <SuggestionCards
              suggestions={result.suggestions}
            />
          </div>

          <div className="flex justify-center">

            <button
              onClick={resetAnalyzer}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
            >
              Analyze Another Resume
            </button>

          </div>

        </div>

      </main>
    );
  }

  // ==========================
  // UPLOAD SCREEN
  // ==========================

  return (
    <main className="max-w-xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

      <h1 className="text-3xl font-bold text-center mb-8">
        AI Resume Analyzer
      </h1>

      {/* Upload */}

      <div className="mb-6">

        <label className="block mb-2 font-medium">
          Resume (PDF only, max {MAX_SIZE_MB}MB)
        </label>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full border-2 border-dashed border-gray-400 rounded-lg p-6 text-center"
        >

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={loading}
            className="w-full mb-3"
          />

          <p className="text-gray-600">
            Drag & Drop your PDF here
          </p>

          <p className="text-gray-500 text-sm">
            or click above to choose a file
          </p>

          {file && (
            <p className="text-green-600 mt-3 font-medium break-all">
              ✅ Selected: {file.name}
            </p>
          )}

        </div>

      </div>

      {/* Job Description */}

      <div className="mb-6">

        <label className="block mb-2 font-medium">
          Job Description (Optional)
        </label>

        <textarea
          className="w-full border rounded-lg p-3 resize-y"
          rows={6}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          disabled={loading}
        />

      </div>

      {/* Error */}

      {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

      {/* Analyze Button */}

      <div className="flex justify-center">

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 transition"
        >

          {loading && (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}

          {loading ? "Analyzing..." : "Analyze Resume"}

        </button>

      </div>

    </main>
  );
}