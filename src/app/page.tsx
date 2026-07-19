"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_SIZE_MB = 5;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];

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

      console.log("API response:", data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">
        Resume Analyzer
      </h1>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Resume (PDF only, max {MAX_SIZE_MB}MB)
        </label>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />

        {file && (
          <p className="text-sm text-green-600 mt-1">
            Selected: {file.name}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Job Description (optional)
        </label>

        <textarea
          className="w-full border rounded p-2"
          rows={6}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
        />
      </div>

      {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </main>
  );
}