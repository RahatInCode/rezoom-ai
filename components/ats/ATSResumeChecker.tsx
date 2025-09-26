// components/ats/ATSResumeChecker.tsx
'use client';

import { useState } from 'react';
import { ResumeUpload } from './ResumeUpload';
import { ATSScoreCard } from './ATSScoreCard';
import { motion } from 'framer-motion';

export interface ATSAnalysis {
  score: number;
  formatting: {
    hasHeaders: boolean;
    hasBulletPoints: boolean;
    hasContactInfo: boolean;
  };
  keywords: {
    found: string[];
    missing: string[];
    total: number;
  };
  rawText: string;
}

export default function ATSResumeChecker() {
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to analyze resume: ${response.statusText}`);
      }

      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ATS Resume Checker
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Upload your resume to get instant feedback on ATS compatibility, formatting, and keyword optimization
          </p>
        </motion.div>

        {/* Upload Section */}
        {!analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ResumeUpload
              onFileUpload={handleFileUpload}
              isUploading={isAnalyzing}
              error={error}
            />
          </motion.div>
        )}

        {/* Results Section */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ATSScoreCard analysis={analysis} onReset={resetAnalysis} />
          </motion.div>
        )}
      </div>
    </div>
  );
}