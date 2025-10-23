import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

// Extract text from PDF using pdf2json
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const PDFParser = (await import('pdf2json')).default;
  
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on('pdfParser_dataError', (errData: unknown) => {
      if (typeof errData === 'object' && errData !== null && 'parserError' in errData) {
        console.error('PDF Parser Error:', (errData as { parserError?: unknown }).parserError);
      } else {
        console.error('PDF Parser Error:', errData);
      }
      reject(new Error('Failed to parse PDF'));
    });

    pdfParser.on('pdfParser_dataReady', (pdfData: unknown) => {
      try {
        let text = '';
        
        if (typeof pdfData === 'object' && pdfData !== null && 'Pages' in pdfData) {
          type PDFTextR = { T?: string };
          type PDFTextItem = { R?: PDFTextR[] };
          type PDFPage = { Texts?: PDFTextItem[] };

          const pdf = pdfData as { Pages?: PDFPage[] };
          if (pdf.Pages) {
            pdf.Pages.forEach((page) => {
              if (page.Texts) {
                page.Texts.forEach((textItem) => {
                  if (textItem.R) {
                    textItem.R.forEach((r) => {
                      if (r.T) {
                        text += decodeURIComponent(r.T) + ' ';
                      }
                    });
                  }
                });
                text += '\n';
              }
            });
          }
        }
        
        resolve(text);
      } catch (error) {
        reject(error);
      }
    });

    pdfParser.parseBuffer(buffer);
  });
}

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

function analyzeKeywords(text: string): KeywordAnalysis {
  const found: string[] = [];
  const missing: string[] = [];
  const textLower = text.toLowerCase();

  TARGET_KEYWORDS.forEach(keyword => {
    const keywordLower = keyword.toLowerCase();
    
    if (textLower.includes(keywordLower)) {
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

function calculateScore(formatting: FormatAnalysis, keywords: KeywordAnalysis): number {
  let score = 50;
  
  if (formatting.hasHeaders) score += 10;
  if (formatting.hasBulletPoints) score += 10;
  if (formatting.hasContactInfo) score += 10;
  
  const keywordScore = Math.min(keywords.found.length * 5, 50);
  score += keywordScore;
  
  return Math.min(score, 100);
}

export async function POST(request: NextRequest) {
  try {
    console.log('📄 Parsing resume request received...');

    const formData = await request.formData();
    const file = formData.get('resume') as File;

    if (!file) {
      console.error('❌ No file provided');
      return NextResponse.json(
        { error: 'No file provided' }, 
        { status: 400 }
      );
    }

    if (file.type !== 'application/pdf') {
      console.error('❌ Invalid file type:', file.type);
      return NextResponse.json(
        { error: 'Only PDF files are supported' }, 
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error('❌ File too large:', file.size);
      return NextResponse.json(
        { error: 'File size must be less than 10MB' }, 
        { status: 400 }
      );
    }

    console.log('✅ File validation passed:', file.name, `(${file.size} bytes)`);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('🔍 Extracting text from PDF...');
    const rawText = await extractTextFromPDF(buffer);

    console.log('📝 Text extracted, length:', rawText?.length || 0);

    if (!rawText || rawText.trim().length === 0) {
      console.error('❌ No text extracted from PDF');
      return NextResponse.json(
        { error: 'Could not extract text from PDF. The file might be scanned or image-based.' }, 
        { status: 400 }
      );
    }

    console.log('🔍 Analyzing formatting and keywords...');

    const formatting = analyzeFormatting(rawText);
    const keywords = analyzeKeywords(rawText);
    const score = calculateScore(formatting, keywords);

    console.log('✅ Analysis complete:', {
      score,
      foundKeywords: keywords.found.length,
      missingKeywords: keywords.missing.length
    });

    const result: ATSAnalysisResult = {
      score,
      formatting,
      keywords,
      rawText: rawText.substring(0, 1000)
    };

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('❌ Error parsing resume:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Failed to process resume. Please ensure the PDF is valid and not password-protected.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to upload a resume.' }, 
    { status: 405 }
  );
}