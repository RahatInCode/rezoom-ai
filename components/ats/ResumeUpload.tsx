// components/ats/ResumeUpload.tsx
'use client';

import { useCallback, useState } from 'react';

import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface ResumeUploadProps {
  onFileUpload: (file: File) => void;
  isUploading: boolean;
  error: string | null;
}

export function ResumeUpload({ onFileUpload, isUploading, error }: ResumeUploadProps) {
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90; // Stop at 90%, will complete when analysis is done
          }
          return prev + 10;
        });
      }, 100);

      onFileUpload(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: isUploading
  });

  // Complete progress when upload is done
  if (isUploading && uploadProgress < 100) {
    setTimeout(() => setUploadProgress(100), 500);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
          transition-all duration-300 backdrop-blur-sm
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50/50 scale-105' 
            : 'border-gray-300 bg-white/50 hover:border-blue-400 hover:bg-blue-50/30'
          }
          ${isUploading ? 'pointer-events-none opacity-75' : ''}
        `}
        whileHover={{ scale: isUploading ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...getRootProps({ refKey: undefined })}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          {isUploading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Upload className="w-8 h-8 text-blue-600" />
                </motion.div>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-700">Analyzing Resume...</p>
                <p className="text-sm text-gray-500">
                  {acceptedFiles[0]?.name}
                </p>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-gray-500">{uploadProgress}% Complete</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {isDragActive ? 'Drop your resume here' : 'Upload Your Resume'}
                </h3>
                <p className="text-gray-600">
                  Drag and drop your PDF resume, or{' '}
                  <span className="text-blue-600 font-medium">click to browse</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Only PDF files are supported • Max file size: 10MB
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Upload overlay effect */}
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-blue-500/10 rounded-2xl border-2 border-blue-500 flex items-center justify-center"
          >
            <div className="text-center">
              <Upload className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <p className="text-blue-700 font-semibold">Drop to analyze</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Upload Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center"
      >
        <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-green-600 font-bold">✓</span>
          </div>
          <p className="text-sm font-medium text-gray-700">ATS Scoring</p>
          <p className="text-xs text-gray-500 mt-1">Get instant compatibility score</p>
        </div>
        
        <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-blue-600 font-bold">📝</span>
          </div>
          <p className="text-sm font-medium text-gray-700">Format Check</p>
          <p className="text-xs text-gray-500 mt-1">Analyze structure & formatting</p>
        </div>
        
        <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-purple-600 font-bold">🔍</span>
          </div>
          <p className="text-sm font-medium text-gray-700">Keyword Match</p>
          <p className="text-xs text-gray-500 mt-1">Find missing key terms</p>
        </div>
      </motion.div>
    </div>
  );
}