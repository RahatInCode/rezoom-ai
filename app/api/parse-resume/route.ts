// app/api/parse-resume/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';

// Target keywords for ATS checking - can be made configurable later
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

/**
 * Analyzes resume formatting for ATS compatibility
 */
function analyzeFormatting(text: string): FormatAnalysis {
  
  // Check for common section headers
  const headerPatterns = [
    /\b(experience|work experience|professional experience|employment)\b/i,
    /\b(education|academic background|qualifications)\b/i,
    /\b(skills|technical skills|core competencies|expertise)\b/i,
    /\b(projects|portfolio|achievements)\b/i,
    /\b(summary|objective|profile|about)\b/i
  ];
  
  const hasHeaders = headerPatterns.some(pattern => pattern.test(text));
  
  // Check for bullet points (various formats)
  const bulletPatterns = [
    /^\s*[•·▪▫‣⁃]\s/gm,  // Unicode bullet points
    /^\s*[-*]\s/gm,       // Dashes and asterisks
    /^\s*\d+\.\s/gm       // Numbered lists
  ];
  
  const hasBulletPoints = bulletPatterns.some(pattern => pattern.test(text));
  
  // Check for contact information
  const contactPatterns = [
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,  // Email
    /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/,                          // Phone
    /\b(linkedin\.com|github\.com|portfolio)\b/i,             // Professional links
    /\b\d{5}\b/                                               // ZIP code
  ];
  
  const hasContactInfo = contactPatterns.some(pattern => pattern.test(text));
  
  return {
    hasHeaders,
    hasBulletPoints,
    hasContactInfo
  };
}

/**
 * Analyzes keyword presence in resume text
 */
function analyzeKeywords(text: string): KeywordAnalysis {
  const found: string[] = [];
  const missing: string[] = [];
  
  TARGET_KEYWORDS.forEach(keyword => {
    const keywordLower = keyword.toLowerCase();
    // More flexible matching - check for whole words and common variations
    const patterns = [
      new RegExp(`\\b${keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'),
      new RegExp(`\\b${keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}s\\b`, 'i'), // Plural
      new RegExp(`\\b${keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.js\\b`, 'i') // .js files
    ];
    
    const isFound = patterns.some(pattern => pattern.test(text));
    
    if (isFound) {
      found.push(keyword);
    } else {
      missing.push(keyword);
    }
  });
  
  return {
    found,
    missing,
    total: TARGET_KEYWORDS.length
  };
}

/**
 * Calculates overall ATS score based on formatting and keywords
 */
function calculateScore(formatting: FormatAnalysis, keywords: KeywordAnalysis): number {
  let score = 50; // Base score
  
  // Add points for formatting (10 points each)
  if (formatting.hasHeaders) score += 10;
  if (formatting.hasBulletPoints) score += 10;
  if (formatting.hasContactInfo) score += 10;
  
  // Add points for keywords (5 points each, max 50 points)
  const keywordPoints = Math.min(keywords.found.length * 5, 50);
  score += keywordPoints;
  
  return Math.min(score, 100); // Cap at 100
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }
    
    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Parse PDF and extract text
    const pdfData = await pdf(buffer);
    const rawText = pdfData.text;
    
    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Could not extract text from PDF. Please ensure the PDF contains selectable text.' },
        { status: 400 }
      );
    }
    
    // Perform ATS analysis
    const formatting = analyzeFormatting(rawText);
    const keywords = analyzeKeywords(rawText);
    const score = calculateScore(formatting, keywords);
    
    const result: ATSAnalysisResult = {
      score,
      formatting,
      keywords,
      rawText: rawText.substring(0, 1000) // Return first 1000 chars for debugging
    };
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error parsing resume:', error);
    
    // Handle specific PDF parsing errors
    if (error instanceof Error) {
      if (error.message.includes('Invalid PDF')) {
        return NextResponse.json(
          { error: 'Invalid PDF file. Please ensure the file is a valid PDF document.' },
          { status: 400 }
        );
      }
      
      if (error.message.includes('encrypted')) {
        return NextResponse.json(
          { error: 'Password-protected PDFs are not supported. Please upload an unprotected PDF.' },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to process resume. Please try again or contact support.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}