// components/ats/ResumeUpload.tsx
'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle } from 'lucide-react';

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
    <div className="w-full max-w-3xl mx-auto">
      {/* Updated: Emerald dropzone */}
      <motion.div
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-300 backdrop-blur-sm
          ${isDragActive 
            ? 'border-emerald-500 bg-emerald-50/80 scale-[1.02] shadow-2xl' 
            : 'border-slate-300 bg-white hover:border-emerald-400 hover:bg-emerald-50/30 shadow-lg'
          }
          ${isUploading ? 'pointer-events-none opacity-75' : ''}
        `}
        whileHover={{ scale: isUploading ? 1 : 1.01 }}
        whileTap={{ scale: 0.99 }}
        {...getRootProps({ refKey: undefined })}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-6">
          {isUploading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              {/* Updated: Emerald loading icon */}
              <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center shadow-lg">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Upload className="w-10 h-10 text-emerald-600" />
                </motion.div>
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Analyzing Resume...
                </p>
                <p className="text-sm text-slate-600 mt-2 font-medium">
                  {acceptedFiles[0]?.name}
                </p>
              </div>
              
              {/* Updated: Emerald Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
                <motion.div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-emerald-700 font-bold">{uploadProgress}% Complete</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              {/* Updated: Emerald file icon */}
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center shadow-lg">
                <FileText className="w-10 h-10 text-emerald-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {isDragActive ? 'Drop your resume here' : 'Upload Your Resume'}
                </h3>
                <p className="text-slate-600 text-lg font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Drag and drop your PDF resume, or{' '}
                  <span className="text-emerald-600 font-bold">click to browse</span>
                </p>
                <p className="text-sm text-slate-500 mt-3 font-medium">
                  Only PDF files are supported • Max file size: 10MB
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Updated: Emerald upload overlay */}
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-emerald-500/10 rounded-2xl border-2 border-emerald-500 flex items-center justify-center"
          >
            <div className="text-center">
              <Upload className="w-14 h-14 text-emerald-600 mx-auto mb-3" />
              <p className="text-emerald-700 font-bold text-lg">Drop to analyze</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Updated: Error Display with better styling */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-5 bg-red-50 border-2 border-red-200 rounded-xl flex items-center space-x-4 shadow-lg"
        >
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <p className="text-red-700 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{error}</p>
        </motion.div>
      )}

      {/* Updated: Upload Tips with emerald accents */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
      >
        <div className="p-6 bg-white rounded-2xl shadow-lg border-2 border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl hover:scale-105 duration-300">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <span className="text-2xl text-emerald-600 font-bold">✓</span>
          </div>
          <p className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>ATS Scoring</p>
          <p className="text-sm text-slate-600 font-medium">Get instant compatibility score</p>
        </div>
        
        <div className="p-6 bg-white rounded-2xl shadow-lg border-2 border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl hover:scale-105 duration-300">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <span className="text-2xl text-emerald-600 font-bold">📝</span>
          </div>
          <p className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Format Check</p>
          <p className="text-sm text-slate-600 font-medium">Analyze structure & formatting</p>
        </div>
        
        <div className="p-6 bg-white rounded-2xl shadow-lg border-2 border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl hover:scale-105 duration-300">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <span className="text-2xl text-emerald-600 font-bold">🔍</span>
          </div>
          <p className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Keyword Match</p>
          <p className="text-sm text-slate-600 font-medium">Find missing key terms</p>
        </div>
      </motion.div>
    </div>
  );
}