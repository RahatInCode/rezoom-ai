import React from "react";
import ResumeOptions from "./ResumeOptions";
import ResumeExamplesButton from "../Elements/ResumeExamplesButton";

const TopResume = () => {
  return (
    <section className="w-full mt-10 py-10 px-5 rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md">
      <div className="max-w-5xl  mx-auto flex flex-col gap-6">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Top Resume Examples
        </h1>

        {/* Paragraph */}
        <p className="text-gray-700 text-lg dark:text-gray-300 leading-relaxed max-w-3xl">
          Choose from tailored resume examples for every profession and experience level. 
          Click on any category to explore resumes designed to showcase your skills and 
          land your dream job.
        </p>

        {/* Resume Options */}
        <div className="mt-5">
          <ResumeOptions />

          {/* Button */}
          <div className="mt-8 flex justify-center">
            <ResumeExamplesButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopResume;
