import React from 'react';
import Image from 'next/image';

const TemplateExample = () => {
  return (
    <div className="max-w-full p-8 rounded-2xl bg-gradient-to-br from-[#a8edea] via-[#f3d9e4] to-[#fed6e3] dark:from-[#1e293b] dark:via-[#334155] dark:to-[#475569] flex flex-col gap-6 items-center text-center shadow-lg">
      
      {/* Gradient Heading */}
      <h1 className="font-extrabold text-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
        Download Resume Templates
      </h1>

      {/* Paragraph with light/dark mode */}
      <p className="max-w-2xl text-gray-700 dark:text-gray-300">
        Get a head start on your next resume. Check out our resume templates and build a professional resume that reflects your career goals.
      </p>

      {/* Image Stack */}
      <div className="relative w-full max-w-xl h-[400px] flex items-center justify-center">
        {/* Image 1 */}
        <Image
          src="/resumeTemp.webp"
          alt="Resume 1"
          width={220}
          height={300}
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-[60%] z-30 rounded-xl shadow-xl rotate-[-6deg]"
        />
        {/* Image 2 */}
        <Image
          src="/resumeTemp2.jpg"
          alt="Resume 2"
          width={230}
          height={300}
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 rounded-xl shadow-xl rotate-[2deg]"
        />
        {/* Image 3 */}
        <Image
          src="/resumeTemp3.jpg"
          alt="Resume 3"
          width={240}
          height={300}
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-[40%] z-10 rounded-xl shadow-xl rotate-[6deg]"
        />
      </div>
    </div>
  );
};

export default TemplateExample;
