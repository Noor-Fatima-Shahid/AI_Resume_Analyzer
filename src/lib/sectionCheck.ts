export interface ResumeSections {
  detectedSections: string[];
  missingSections: string[];
}

const SECTION_PATTERNS: Record<string, RegExp[]> = {
  Education: [
    /^education$/i,
    /^academic background$/i,
    /^educational background$/i,
    /^academic qualifications$/i,
  ],
  Experience: [
    /^(work |professional |relevant )?experience$/i,
    /^employment history$/i,
    /^internships?( experience)?$/i,
    /^work history$/i,
  ],
  Skills: [
    /^(technical |core |key )?skills$/i,
    /^skills( (&|and) (tools|technologies))?$/i,
    /^technical (skills|proficiencies)$/i,
    /^tools (&|and) technologies$/i,
  ],
  Projects: [
    /^(personal |academic |key |notable )?projects$/i,
    /^project experience$/i,
  ],
};

const CANONICAL_ORDER = ["Education", "Experience", "Skills", "Projects"];

export function checkResumeSections(extractedText: string): ResumeSections {
  const lines = extractedText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && line.length <= 40);

  const detected: string[] = [];

  for (const sectionName of CANONICAL_ORDER) {
    const patterns = SECTION_PATTERNS[sectionName];
    const found = lines.some((line) =>
      patterns.some((pattern) => pattern.test(line))
    );

    if (found) {
      detected.push(sectionName);
    }
  }

  const missing = CANONICAL_ORDER.filter(
    (section) => !detected.includes(section)
  );

  return {
    detectedSections: detected,
    missingSections: missing,
  };
}