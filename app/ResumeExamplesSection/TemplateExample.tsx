'use client'
import React from 'react';

import Lottie from 'lottie-react';
import resumeExamplesLottie from '../../public/lotties/resumeExampleLottie.json'
const TemplateExample = () => {
  return (
    <div className="max-w-full  p-8 rounded-2xl bg-gradient-to-br from-[#a8edea] via-[#f3d9e4] to-[#fed6e3] dark:from-[#1e293b] dark:via-[#334155] dark:to-[#475569] flex flex-col gap-6 items-center text-center shadow-lg">
      


      {/* Gradient Heading */}
      <h1 className="font-extrabold text-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
        Download Resume Templates
      </h1>

      {/* Paragraph with light/dark mode */}
      <p className="max-w-2xl text-lg text-gray-700 dark:text-gray-300">
        Get a head start on your next resume. Check out our resume templates and build a professional resume that reflects your career goals.
      </p>

    {/* lottie */}
      <div className="relative w-full max-w-xl h-[400px] flex items-center justify-center">
        <div >
            <Lottie animationData={resumeExamplesLottie}  loop={true} />

        </div>
      </div>
    </div>
  );
};

export default TemplateExample;
