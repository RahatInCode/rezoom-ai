import React from 'react';
import Image from 'next/image';

const TemplateExample = () => {
  return (
    <div className="max-w-full p-5 rounded-2xl bg-[linear-gradient(251deg,_#a8edea,_#b3eae9,_#bee7e8,_#c8e4e7,_#d3e2e7,_#dedfe6,_#e9dce5,_#f3d9e4,_#fed6e3)]  flex flex-col gap-5">
      <h1 className="font-bold text-2xl">Download resume templates</h1>
      <p className="text-gray-600 ">
        Get a head start on your next resume. Check out our resume templates and build a professional resume that reflects your career goals.
      </p>

      <div className="relative  w-full max-w-xl h-[400px] flex items-center justify-center">
        {/* Image 1 */}
        <Image
          src="/resumeTemp.webp"
          alt="Resume 1"
          width={220}
          height={300}
          className="absolute top-0 left-0 z-30 rounded shadow-lg rotate-[-4deg]"
        />
        {/* Image 2 */}
        <Image
          src="/resumeTemp2.jpg"
          alt="Resume 2"
          width={230}
          height={300}
          className="absolute top-0 left-10 z-20 rounded shadow-lg rotate-[2deg]"
        />
        {/* Image 3 */}
        <Image
          src="/resumeTemp3.jpg"
          alt="Resume 3"
        width={250}
          height={300}
          className="absolute top-0 left-20 z-10 rounded shadow-lg rotate-[5deg]"
        />
      </div>
    </div>
  );
};

export default TemplateExample;
