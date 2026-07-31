export interface AtsCheck {
  isAtsFriendly: boolean;
  issues: string[];
}

const ATS_SAFE_FONT_KEYWORDS = [
  "arial",
  "helvetica",
  "times",
  "calibri",
  "cambria",
  "georgia",
  "verdana",
  "garamond",
  "tahoma",
  "segoe",
];

export function checkAtsFormatting(
  pdfBuffer: Buffer,
  extractedText: string
): AtsCheck {
  const issues: string[] = [];
  const rawPdf = pdfBuffer.toString("latin1");

  // Embedded images
  const imageMatches = rawPdf.match(/\/Subtype\s*\/Image/g);
  if (imageMatches && imageMatches.length > 0) {
    issues.push(
      "Contains embedded images or graphics, which most ATS systems cannot read."
    );
  }

  // Non-standard fonts
  const fontMatches = [...rawPdf.matchAll(/\/BaseFont\s*\/([A-Za-z0-9+,\-]+)/g)]
    .map((m) => m[1]);
  const uniqueFonts = [...new Set(fontMatches)];
  const nonStandardFonts = uniqueFonts.filter(
    (font) =>
      !ATS_SAFE_FONT_KEYWORDS.some((safe) =>
        font.toLowerCase().includes(safe)
      )
  );
  if (uniqueFonts.length > 0 && nonStandardFonts.length > 0) {
    issues.push(
      "Uses fonts outside common ATS-safe choices, which may render inconsistently."
    );
  }

  // Possible multi-column layout (soft heuristic)
  const lines = extractedText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const shortLines = lines.filter((l) => l.length > 0 && l.length < 25);
  const shortLineRatio = lines.length > 0 ? shortLines.length / lines.length : 0;
  if (shortLineRatio > 0.55 && lines.length > 20) {
    issues.push(
      "Text structure suggests a possible multi-column layout, which can confuse ATS text extraction."
    );
  }

  // Possible table/grid structure (soft heuristic)
  const tableLikeLines = lines.filter((l) => /\s{3,}/.test(l) || /\t/.test(l));
  if (tableLikeLines.length > lines.length * 0.15 && lines.length > 15) {
    issues.push(
      "Detected grid-like spacing patterns that may indicate tables, which ATS parsers often handle poorly."
    );
  }

  return {
    isAtsFriendly: issues.length === 0,
    issues,
  };
}