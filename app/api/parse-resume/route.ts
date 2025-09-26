import { NextRequest, NextResponse } from 'next/server';

// Target keywords for ATS checking
const TARGET_KEYWORDS = [
  'JavaScript', 'React', 'TypeScript', 'Next.js', 'Tailwind',
  'Node.js', 'Python', 'HTML', 'CSS', 'Git', 'API', 'Database',
  'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes',
  'Frontend', 'Backend', 'Full Stack', 'Agile', 'Scrum'
];

interface FormatAnalysis {
  hasHeaders: boolean;
  hasBulletPoints: boolean;
  hasContactInfo: boolean;
}

interface KeywordAnalysis {
  found: string[];
  missing: string[];
  total: number;
}

interface ATSAnalysisResult {
  score: number;
  formatting: FormatAnalysis;
  keywords: KeywordAnalysis;
  rawText: string;
}

// Formatting analysis
function analyzeFormatting(text: string): FormatAnalysis {
  const headerPatterns = [
    /\b(experience|work experience|professional experience|employment)\b/i,
    /\b(education|academic background|qualifications)\b/i,
    /\b(skills|technical skills|core competencies|expertise)\b/i,
    /\b(projects|portfolio|achievements)\b/i,
    /\b(summary|objective|profile|about)\b/i
  ];
  const bulletPatterns = [
    /^\s*[•·▪▫‣⁃]\s/gm,
    /^\s*[-*]\s/gm,
    /^\s*\d+\.\s/gm
  ];
  const contactPatterns = [
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
    /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/,
    /\b(linkedin\.com|github\.com|portfolio)\b/i,
    /\b\d{5}\b/
  ];

  return {
    hasHeaders: headerPatterns.some(p => p.test(text)),
    hasBulletPoints: bulletPatterns.some(p => p.test(text)),
    hasContactInfo: contactPatterns.some(p => p.test(text))
  };
}

// Keyword analysis
function analyzeKeywords(text: string): KeywordAnalysis {
  const found: string[] = [];
  const missing: string[] = [];

  TARGET_KEYWORDS.forEach(keyword => {
    const keywordLower = keyword.toLowerCase();
    const patterns = [
      new RegExp(`\\b${keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'),
      new RegExp(`\\b${keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}s\\b`, 'i'),
      new RegExp(`\\b${keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.js\\b`, 'i')
    ];
    const isFound = patterns.some(p => p.test(text));
    if (isFound) {
      found.push(keyword);
    } else {
      missing.push(keyword);
    }
  });

  return { found, missing, total: TARGET_KEYWORDS.length };
}

// ATS score calculation
function calculateScore(formatting: FormatAnalysis, keywords: KeywordAnalysis): number {
  let score = 50;
  if (formatting.hasHeaders) score += 10;
  if (formatting.hasBulletPoints) score += 10;
  if (formatting.hasContactInfo) score += 10;
  score += Math.min(keywords.found.length * 5, 50);
  return Math.min(score, 100);
}

// POST handler
export async function POST(request: NextRequest) {
  try {
    // Dynamically import pdf-parse inside the handler
    const pdf = (await import('pdf-parse')).default;

    const formData = await request.formData();
    const file = formData.get('resume') as File;

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    if (file.type !== 'application/pdf') return NextResponse.json({ error: 'Only PDF supported' }, { status: 400 });
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'File too large' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const pdfData = await pdf(buffer);
    const rawText = pdfData.text;

    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json({ error: 'Could not extract text from PDF' }, { status: 400 });
    }

    const formatting = analyzeFormatting(rawText);
    const keywords = analyzeKeywords(rawText);
    const score = calculateScore(formatting, keywords);

    const result: ATSAnalysisResult = {
      score,
      formatting,
      keywords,
      rawText: rawText.substring(0, 1000)
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error parsing resume:', error);
    return NextResponse.json({ error: 'Failed to process resume' }, { status: 500 });
  }
}

// GET handler
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
