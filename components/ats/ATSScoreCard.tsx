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

  // Updated: Determine score color with emerald
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
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
    <div className="space-y-8">
      {/* Updated: Header with Reset Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
          Resume Analysis Results
        </h2>
        {/* Updated: Emerald reset button */}
        <motion.button
          onClick={onReset}
          className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 rounded-full transition-all shadow-lg hover:shadow-xl font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <RefreshCw className="w-5 h-5" />
          <span>Analyze Another</span>
        </motion.button>
      </div>

      {/* Updated: Main Score Card with white background and emerald accents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-10 shadow-2xl border-2 border-emerald-100"
      >
        <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
          {/* Updated: Score Circle with emerald colors */}
          <div className="relative">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-200"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
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
                  className={`text-4xl font-extrabold ${getScoreColor(score)}`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {score}
                </motion.div>
                <div className="text-sm text-slate-600 font-semibold mt-1">ATS Score</div>
              </div>
            </div>
          </div>

          {/* Score Details */}
          <div className="flex-1 text-center md:text-left md:ml-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                {getScoreMessage(score)}
              </h3>
              <p className="text-slate-600 mb-6 text-lg font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your resume scored {score} out of 100 points for ATS compatibility.
              </p>
              <div className="flex justify-center md:justify-start space-x-8">
                <div className="text-center">
                  <div className="font-extrabold text-2xl text-emerald-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {keywords.found.length}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Keywords Found</div>
                </div>
                <div className="text-center">
                  <div className="font-extrabold text-2xl text-emerald-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {formatChecks.filter(check => check.value).length}/3
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Format Checks</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Updated: Detailed Analysis Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Updated: Formatting Checks with emerald accents */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-emerald-500"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shadow-md">
              <FileText className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
              Format Analysis
            </h3>
          </div>

          <div className="space-y-4">
            {formatChecks.map((check, index) => (
              <motion.div
                key={check.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-all"
              >
                <span className="font-semibold text-slate-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {check.label}
                </span>
                {check.value ? (
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Updated: Tip box with emerald */}
          <div className="mt-6 p-5 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
            <p className="text-sm text-emerald-900 font-medium leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              <strong className="font-bold">Tip:</strong> ATS systems scan for standard resume sections like 
              &quot;Experience&quot;, &quot;Education&quot;, and &quot;Skills&quot;. Use clear headers and bullet points 
              to improve readability.
            </p>
          </div>
        </motion.div>

        {/* Updated: Keywords Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-emerald-500"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shadow-md">
              <Search className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
              Keyword Analysis
            </h3>
          </div>

          <KeywordMatch keywords={keywords} />

          {/* Updated: Tip box */}
          <div className="mt-6 p-5 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
            <p className="text-sm text-emerald-900 font-medium leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              <strong className="font-bold">Tip:</strong> Include relevant keywords from the job description 
              naturally throughout your resume. Focus on technical skills and industry terms.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Updated: Recommendations with emerald gradient */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-emerald-50 to-white rounded-2xl p-8 border-2 border-emerald-200 shadow-xl"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shadow-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
            Recommendations
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {score < 80 && (
            <>
              {!formatting.hasHeaders && (
                <div className="p-5 bg-white rounded-xl shadow-md border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Add Clear Section Headers
                  </h4>
                  <p className="text-sm text-slate-600 font-medium">
                    Use standard headers like &quot;Professional Experience&quot;, &quot;Education&quot;, and &quot;Skills&quot;
                  </p>
                </div>
              )}
              {!formatting.hasBulletPoints && (
                <div className="p-5 bg-white rounded-xl shadow-md border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Use Bullet Points
                  </h4>
                  <p className="text-sm text-slate-600 font-medium">
                    Structure your experience with bullet points for better readability
                  </p>
                </div>
              )}
              {keywords.missing.length > 0 && (
                <div className="p-5 bg-white rounded-xl shadow-md border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Include Missing Keywords
                  </h4>
                  <p className="text-sm text-slate-600 font-medium">
                    Add relevant skills: {keywords.missing.slice(0, 3).join(', ')}
                    {keywords.missing.length > 3 && '...'}
                  </p>
                </div>
              )}
            </>
          )}
          {score >= 80 && (
            <div className="md:col-span-2 p-6 bg-emerald-50 rounded-xl text-center border-2 border-emerald-300 shadow-md">
              <h4 className="font-bold text-emerald-800 mb-2 text-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                Great Job! 🎉
              </h4>
              <p className="text-sm text-emerald-700 font-medium leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
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