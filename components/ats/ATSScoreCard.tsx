// components/ats/ATSScoreCard.tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCw, Award, FileText, Search } from 'lucide-react';
import { ATSAnalysis } from './ATSResumeChecker';
import { KeywordMatch } from './KeywordMatch';

interface ATSScoreCardProps {
  analysis: ATSAnalysis;
  onReset: () => void;
}

export function ATSScoreCard({ analysis, onReset }: ATSScoreCardProps) {
  const { score, formatting, keywords } = analysis;

  // Determine score color and message
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent! Your resume is ATS-friendly';
    if (score >= 60) return 'Good! Some improvements recommended';
    return 'Needs improvement for better ATS compatibility';
  };

  const formatChecks = [
    { key: 'hasHeaders', label: 'Section Headers', value: formatting.hasHeaders },
    { key: 'hasBulletPoints', label: 'Bullet Points', value: formatting.hasBulletPoints },
    { key: 'hasContactInfo', label: 'Contact Information', value: formatting.hasContactInfo },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Reset Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Resume Analysis Results</h2>
        <motion.button
          onClick={onReset}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Analyze Another</span>
        </motion.button>
      </div>

      {/* Main Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
      >
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Score Circle */}
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-200"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                className={getScoreColor(score)}
                strokeDasharray={314} // 2 * π * 50
                initial={{ strokeDashoffset: 314 }}
                animate={{ strokeDashoffset: 314 - (314 * score) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className={`text-3xl font-bold ${getScoreColor(score)}`}
                >
                  {score}
                </motion.div>
                <div className="text-sm text-gray-600">ATS Score</div>
              </div>
            </div>
          </div>

          {/* Score Details */}
          <div className="flex-1 text-center md:text-left md:ml-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {getScoreMessage(score)}
              </h3>
              <p className="text-gray-600 mb-4">
                Your resume scored {score} out of 100 points for ATS compatibility.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <div className="text-center">
                  <div className="font-semibold text-lg">{keywords.found.length}</div>
                  <div className="text-sm text-gray-600">Keywords Found</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-lg">
                    {formatChecks.filter(check => check.value).length}/3
                  </div>
                  <div className="text-sm text-gray-600">Format Checks</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Detailed Analysis Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Formatting Checks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Format Analysis</h3>
          </div>

          <div className="space-y-3">
            {formatChecks.map((check, index) => (
              <motion.div
                key={check.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/50 rounded-lg"
              >
                <span className="font-medium text-gray-700">{check.label}</span>
                {check.value ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> ATS systems scan for standard resume sections like 
              &quot;Experience&quot;, &quot;Education&quot;, and &quot;Skills&quot;. Use clear headers and bullet points 
              to improve readability.
            </p>
          </div>
        </motion.div>

        {/* Keywords Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Search className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Keyword Analysis</h3>
          </div>

          <KeywordMatch keywords={keywords} />

          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800">
              <strong>Tip:</strong> Include relevant keywords from the job description 
              naturally throughout your resume. Focus on technical skills and industry terms.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Recommendations</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {score < 80 && (
            <>
              {!formatting.hasHeaders && (
                <div className="p-4 bg-white/50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-1">Add Clear Section Headers</h4>
                  <p className="text-sm text-gray-600">
                    Use standard headers like &quot;Professional Experience&quot;, &quot;Education&quot;, and &quot;Skills&quot;
                  </p>
                </div>
              )}
              {!formatting.hasBulletPoints && (
                <div className="p-4 bg-white/50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-1">Use Bullet Points</h4>
                  <p className="text-sm text-gray-600">
                    Structure your experience with bullet points for better readability
                  </p>
                </div>
              )}
              {keywords.missing.length > 0 && (
                <div className="p-4 bg-white/50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-1">Include Missing Keywords</h4>
                  <p className="text-sm text-gray-600">
                    Add relevant skills: {keywords.missing.slice(0, 3).join(', ')}
                    {keywords.missing.length > 3 && '...'}
                  </p>
                </div>
              )}
            </>
          )}
          {score >= 80 && (
            <div className="md:col-span-2 p-4 bg-green-50 rounded-lg text-center">
              <h4 className="font-medium text-green-800 mb-1">Great Job! 🎉</h4>
              <p className="text-sm text-green-700">
                Your resume is well-optimized for ATS systems. Consider tailoring keywords 
                for specific job applications to maximize your chances.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}