# AI Resume Analyzer

**Live App:** [ai-resume-analyzer-drab-pi.vercel.app](https://ai-resume-analyzer-drab-pi.vercel.app)

## What It Does & The Problem It Solves

Job seekers — especially students and early-career applicants — often have no idea whether their resume will actually pass an Applicant Tracking System (ATS) or match a specific job posting before they hit "Apply." Most resume advice online is generic and doesn't reference the applicant's actual content or the specific job they're targeting.

**AI Resume Analyzer** solves this by letting a user upload their resume (PDF) and paste a real job description. The app then uses AI to score the resume, compare it directly against the job requirements, and return specific, actionable feedback — not generic tips, but suggestions that reference the user's actual resume content and the actual job posting.

**Who it's for:** Students and job seekers (like myself, applying for ML/AI internships) who want to optimize their resume for a specific role before submitting it, without paying for a career coach or guessing what recruiters are looking for.

## Features

- **PDF Resume Upload** — drag-and-drop or file picker, supports PDF up to 5MB
- **Job Description Matching** — paste any job description to get a tailored, JD-specific analysis
- **Resume Score (0–100)** — an overall quality/match score with a visual score ring
- **Key Strengths** — concrete strengths pulled directly from the resume content
- **Areas for Improvement** — specific weaknesses flagged for the candidate to fix
- **Missing Top-Tier Skills** — keywords/skills present in the job description but absent from the resume
- **AI Strategic Suggestions** — actionable, resume-specific edits (e.g. "quantify the results of Project X")
- **Next Steps Panel** — a simple 3-step action plan (review flags → apply edits → re-run analysis)
- **ATS-Friendly Format Check** — flags whether the resume structure is likely to parse correctly in standard ATS software
- **Download Report** — export the analysis
- **Analyze Another Resume** — re-run the flow without reloading the app

## The AI Feature

The core AI feature is a **resume-to-job-description matching and scoring engine** powered by the Gemini API. When a user submits their resume text (extracted from the uploaded PDF) and, optionally, a job description, the AI:

1. Evaluates overall resume quality
2. Scores how well the resume matches the specific job description (if provided)
3. Extracts concrete strengths and weaknesses from the actual resume content
4. Identifies missing skills/keywords relevant to the job description
5. Generates specific, actionable suggestions referencing the resume's real content

The AI is instructed to return **strictly structured JSON** (no markdown, no extra commentary) so the frontend can render it directly into the score ring, strengths/weaknesses lists, and suggestion cards. It also follows a fixed scoring rubric and consistency rules so the same resume doesn't get wildly different scores on repeated runs.

**System Prompt (full, written by me):**

```
You are an expert ATS resume reviewer, recruiter, and career coach.

You will receive:
1. The text extracted from a candidate's resume.
2. Optionally, a job description.

Your responsibilities:

1. Evaluate the overall quality of the resume.
2. If a job description is provided, evaluate how well the resume matches it.
3. Identify concrete strengths.
4. Identify concrete weaknesses.
5. If a job description exists, identify missing skills or keywords.
6. Give specific, actionable suggestions that reference the resume content whenever possible.

SCORING RUBRIC

90-100
Outstanding resume. Excellent structure, strong technical content, measurable achievements, highly relevant skills, and very few improvements needed.

80-89
Strong resume with only minor weaknesses. Suitable for many applications with small improvements.

70-79
Good resume but several improvements are recommended to improve clarity, impact, or ATS compatibility.

60-69
Average resume with noticeable weaknesses such as vague descriptions, missing achievements, weak formatting, or limited technical evidence.

40-59
Weak resume with significant issues affecting readability or competitiveness.

0-39
Poor resume requiring major rewriting.

SCORING RULES

- Use the scoring rubric above.
- Evaluate the same resume consistently.
- If the resume has not changed, keep the score within approximately 3-5 points between evaluations.
- Do NOT randomly increase or decrease the score.
- Determine strengths and weaknesses BEFORE assigning the score.
- Base the score only on the actual resume content.
- Do not invent information.
- Be objective and consistent.

JOB DESCRIPTION RULES

- If a job description is provided, adjust the score based on how well the resume matches it.
- If no job description is provided, evaluate only the resume quality.
- If no job description exists, "missingSkills" MUST be an empty array.

Return ONLY valid JSON.

Do not include markdown.
Do not include explanation text.
Do not include code fences.

The JSON must have EXACTLY this structure:

{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}

Rules:

- score must be an integer between 0 and 100.
- strengths must contain 3 to 6 items.
- weaknesses must contain 3 to 6 items.
- suggestions must contain 3 to 6 items.
- missingSkills must contain 0 to 6 items.
- Do not add extra fields.
```

## Tools, Services & AI Models Used

- **Frontend/Framework:** Next.js (React)
- **AI Model:** Google Gemini API
- **Deployment/Hosting:** Vercel
- **Version Control:** Git & GitHub

## Screenshots

**1. Landing / Upload screen — empty state**

![Upload screen](./screenshots/1-upload-screen.png)

**2. Resume uploaded + job description filled in**

![Filled in form](./screenshots/2-filled-form.png)

**3. Analysis results — score, strengths, and areas for improvement**

![Analysis results](./screenshots/3-results.png)

**4. Missing skills & AI strategic suggestions**

![Suggestions panel](./screenshots/4-suggestions.png)

## How to Run the Project Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Noor-Fatima-Shahid/AI_Resume_Analyzer.git
   cd AI_Resume_Analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the project root and add:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Live Deployment

The app is deployed on Vercel and publicly accessible at:

**[https://ai-resume-analyzer-drab-pi.vercel.app](https://ai-resume-analyzer-drab-pi.vercel.app)**

---

Built by Noor Fatima Shahid
