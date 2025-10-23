// components/ats/KeywordMatch.tsx
'use client';

import { motion } from 'framer-motion';
import { Check, X, Search } from 'lucide-react';

interface KeywordMatchProps {
  keywords: {
    found: string[];
    missing: string[];
    total: number;
  };
}

export function KeywordMatch({ keywords }: KeywordMatchProps) {
  const { found, missing } = keywords;

  return (
    <div className="space-y-5">
      {/* Updated: Summary Stats with emerald accents */}
      <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm">
        <span className="text-sm font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Match Rate</span>
        <div className="flex items-center space-x-3">
          <span className="text-xl font-extrabold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
            {found.length}/{keywords.total}
          </span>
          <span className="text-sm text-slate-600 font-semibold">
            ({Math.round((found.length / keywords.total) * 100)}%)
          </span>
        </div>
      </div>

      {/* Updated: Emerald Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
        <motion.div
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: `${(found.length / keywords.total) * 100}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

      {/* Keywords Lists */}
      <div className="space-y-5">
        {/* Updated: Found Keywords with emerald styling */}
        {found.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-emerald-700 mb-3 flex items-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              <Check className="w-5 h-5 mr-2" />
              Found Keywords ({found.length})
            </h4>
            <div className="flex flex-wrap gap-3">
              {found.map((keyword, index) => (
                <motion.span
                  key={keyword}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-full border border-emerald-300 shadow-sm hover:shadow-md transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Check className="w-4 h-4 mr-1.5" />
                  {keyword}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Updated: Missing Keywords */}
        {missing.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-red-700 mb-3 flex items-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              <X className="w-5 h-5 mr-2" />
              Missing Keywords ({missing.length})
            </h4>
            <div className="flex flex-wrap gap-3">
              {missing.map((keyword, index) => (
                <motion.span
                  key={keyword}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 text-sm font-semibold rounded-full border border-red-300 shadow-sm hover:shadow-md transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <X className="w-4 h-4 mr-1.5" />
                  {keyword}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {found.length === 0 && missing.length === keywords.total && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-sm text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
            No target keywords found in your resume
          </p>
        </div>
      )}
    </div>
  );
}