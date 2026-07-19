"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_SIZE_MB = 5;

  // Validate uploaded file
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

  // Handle file selection using the file picker
  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    validateFile(e.target.files?.[0]);
  }

  // Handle drag-and-drop
  function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();
    validateFile(e.dataTransfer.files?.[0]);
  }

  // Allow dropping by preventing default browser behavior
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
  setError(data.error);
  return;
}

console.log("API response:", data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        AI Resume Analyzer
      </h1>

      {/* Resume Upload */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Resume (PDF only, max {MAX_SIZE_MB}MB)
        </label>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center"
        >
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mb-3"
          />

          <p className="text-gray-600">
            Drag & Drop your PDF here
          </p>

          <p className="text-gray-500 text-sm">
            or click the button above to choose a file
          </p>

          {file && (
            <p className="text-green-600 mt-3 font-medium">
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
          className="w-full border rounded-lg p-3"
          rows={6}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
    </main>
  );
}