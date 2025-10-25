"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [selected, setSelected] = useState({
    NoExp: false,
    ThreeYearExp: false,
    FiveYearExp: false,
    SevenYearExp: false,
    MoreSevenExp: false,
  });

  const handleExperienceSelection = (index) => {
    const options = {
      0: { NoExp: true },
      1: { ThreeYearExp: true },
      2: { FiveYearExp: true },
      3: { SevenYearExp: true },
      4: { MoreSevenExp: true },
    };
    setSelected({
      NoExp: false,
      ThreeYearExp: false,
      FiveYearExp: false,
      SevenYearExp: false,
      MoreSevenExp: false,
      ...options[index],
    });
  };

  const bestDescribeYourself: string[] = [
    "Post Secondary Certificate or High School Diploma",
    "Technical or Vocational",
    "Related Course",
    "Certificates or Diplomas",
    "Associates",
    "Bachelors",
    "Masters or Specialized",
    "Doctoral or J.D",
  ];

  const [eduSelect, setEduSelect] = useState<number | null>(null);

  const anyExperienceSelected =
    selected.NoExp ||
    selected.ThreeYearExp ||
    selected.FiveYearExp ||
    selected.SevenYearExp ||
    selected.MoreSevenExp;

  return (
    // Updated: Added gradient background and generous vertical padding
    <div className="w-full flex flex-col justify-center items-center min-h-[calc(100vh-60px)] bg-gradient-to-b from-white to-[#f0fdf4] py-16 lg:py-20">
      <Toaster />

      <div className="container max-h-fit min-h-96 w-full lg:w-3/4 flex flex-col space-y-16 p-5">
        {/* Experience Section */}
        <div className="w-full text-center p-4">
          {/* Updated: Navy text, extrabold weight, improved spacing */}
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight">
            How long have you been working?
          </h1>
          {/* Updated: Medium gray text for secondary content */}
          <p className="mb-10 mt-4 text-lg lg:text-xl text-[#64748b] font-medium">
            We&apos;ll find the best templates for your experience level.
          </p>

          {/* Updated: Increased gap for better spacing */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-5">
            {[
              "No Experience",
              "0 to 3 Years",
              "3 to 5 Years",
              "5 to 7 Years",
              "More than 7 Years",
            ].map((label, idx) => (
              <button
                key={idx}
                onClick={() => handleExperienceSelection(idx)}
                // Updated: Emerald border, rounded-full, shadow on hover, scale effect, emerald selected state
                className={`
                  px-6 lg:px-8 py-3 lg:py-4 
                  text-base lg:text-lg font-semibold
                  rounded-full
                  border-2 
                  transition-all duration-300
                  hover:shadow-lg hover:scale-105
                  ${
                    Object.values(selected)[idx]
                      ? "bg-[#10b981] text-white border-[#10b981] shadow-md"
                      : "bg-white text-[#1e293b] border-[#e2e8f0] hover:border-[#10b981] hover:text-[#10b981]"
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Education Section */}
        {anyExperienceSelected && (
          <div className="w-full text-center p-4">
            {/* Updated: Navy text, extrabold weight */}
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight">
              Select the option that best describes your education level.
            </h1>
            {/* Updated: Medium gray text for secondary content */}
            <p className="mb-10 mt-4 text-lg lg:text-xl text-[#64748b] font-medium">
              Your education background can help us guide you through relevant
              sections for your resume.
            </p>

            <div className="flex flex-wrap justify-center gap-4 lg:gap-5">
              {bestDescribeYourself.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setEduSelect(idx + 1)}
                  // Updated: Same emerald styling as experience buttons
                  className={`
                    px-6 lg:px-8 py-3 lg:py-4 
                    text-base lg:text-lg font-semibold
                    rounded-full
                    border-2 
                    transition-all duration-300
                    hover:shadow-lg hover:scale-105
                    ${
                      eduSelect === idx + 1
                        ? "bg-[#10b981] text-white border-[#10b981] shadow-md"
                        : "bg-white text-[#1e293b] border-[#e2e8f0] hover:border-[#10b981] hover:text-[#10b981]"
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Updated: Increased padding for generous spacing */}
            <div className="w-full py-8 flex justify-end items-center">
              {eduSelect ? (
                <Link
                  href="/create-resume/experience-level/template-selection"
                  // Updated: Emerald bg, rounded-full, shadow-lg, hover:scale-105, group for arrow animation
                  className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 flex items-center gap-2 group"
                >
                  Next 
                  {/* Updated: Arrow animation on hover */}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              ) : (
                <button
                  onClick={() => toast.error("Select an option first!")}
                  // Updated: Same emerald styling
                  className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 flex items-center gap-2 group"
                >
                  Next 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}