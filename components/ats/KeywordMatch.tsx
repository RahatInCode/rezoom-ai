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
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
        <span className="text-sm font-medium text-gray-700">Match Rate</span>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-800">
            {found.length}/{keywords.total}
          </span>
          <span className="text-sm text-gray-600">
            ({Math.round((found.length / keywords.total) * 100)}%)
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(found.length / keywords.total) * 100}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

      {/* Keywords Lists */}
      <div className="space-y-4">
        {/* Found Keywords */}
        {found.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center">
              <Check className="w-4 h-4 mr-1" />
              Found Keywords ({found.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {found.map((keyword, index) => (
                <motion.span
                  key={keyword}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                >
                  <Check className="w-3 h-3 mr-1" />
                  {keyword}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Missing Keywords */}
        {missing.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center">
              <X className="w-4 h-4 mr-1" />
              Missing Keywords ({missing.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {missing.map((keyword, index) => (
                <motion.span
                  key={keyword}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full"
                >
                  <X className="w-3 h-3 mr-1" />
                  {keyword}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {found.length === 0 && missing.length === keywords.total && (
        <div className="text-center py-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600">
            No target keywords found in your resume
          </p>
        </div>
      )}
    </div>
  );
}