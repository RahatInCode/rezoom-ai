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
    <div className="w-full flex flex-col justify-center items-center min-h-[calc(100vh-60px)]">
      <Toaster />

      <div className="container max-h-fit min-h-96 w-full lg:w-3/4 flex flex-col space-y-8 p-5">
        {/* Experience Section */}
        <div className="w-full text-center p-4">
          <h1 className="text-5xl font-bold">How long have you been working?</h1>
          <p className="mb-8 mt-3 text-lg">
            We'll find the best templates for your experience level.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
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
                className={`btn btn-lg btn-outline px-8 p-2 font-normal ${
                  Object.values(selected)[idx] ? "border-2 border-primary" : ""
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Education Section */}
        {anyExperienceSelected && (
          <div className="w-full text-center p-4">
            <h1 className="text-5xl font-bold">
              Select the option that best describes your education level.
            </h1>
            <p className="mb-8 mt-3 text-lg">
              Your education background can help us guide you through relevant
              sections for your resume.
            </p>

            <div className="flex flex-wrap justify-center gap-5">
              {bestDescribeYourself.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setEduSelect(idx + 1)}
                  className={`btn btn-lg btn-outline px-8 p-2 font-normal ${
                    eduSelect === idx + 1 ? "border-2 border-primary" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="w-full py-5 flex justify-end items-center">
              {eduSelect ? (
                <Link
                  href="/create-resume/experience-level/template-selection"
                  className="btn px-8 btn-primary flex items-center gap-2"
                >
                  Next <ArrowRight />
                </Link>
              ) : (
                <button
                  onClick={() => toast.error("Select an option first!")}
                  className="btn px-8 btn-primary flex items-center gap-2"
                >
                  Next <ArrowRight />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
