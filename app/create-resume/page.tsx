"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Lottie from "lottie-react";
import ResumeAnimation from "../../public/ResumeSteps.json";
import Link from "next/link";

export default function ResumeBuild_Welcome() {
  return (
    // Updated: Added subtle gradient background (white to light sage) and generous vertical padding
    <div className="w-full flex flex-col justify-center items-center min-h-[calc(100vh-60px)] bg-gradient-to-b from-white to-[#f0fdf4] py-20 lg:py-24">
      <div className="container max-h-fit min-h-96 w-full lg:w-3/4 flex flex-col md:flex-row p-5 gap-8 lg:gap-12">
        
        {/* Left text section */}
        <div className="w-full flex flex-col items-start justify-center">
          {/* Updated: Applied navy text color (#0f172a), extrabold weight (800), improved spacing */}
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-[#0f172a] tracking-tight">
            Just three<br />easy steps
          </h1>

          {/* Updated: Increased top margin for better spacing */}
          <div className="w-fit mt-10 text-lg lg:text-xl flex flex-col space-y-6">
            {[
              "Select a template from our library of professional designs",
              "Build your resume with our industry-specific bullet points",
              "Customize the details and wrap it up. You're ready to send!",
            ].map((text, index) => (
              <div key={index} className="flex gap-5 items-start">
                {/* Updated: Emerald green background (#10b981), white text, added shadow, made slightly larger */}
                <div className="rounded-full bg-[#10b981] text-white text-base font-bold flex justify-center items-center w-10 h-10 shadow-md flex-shrink-0">
                  <p>{index + 1}</p>
                </div>
                {/* Updated: Applied dark navy text (#1e293b) with improved line height */}
                <p className="text-[#1e293b] leading-relaxed font-medium">
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Updated: Full design system button - emerald bg, white text, rounded-full, shadow-lg, hover:scale-105 */}
          <Link
            href="/create-resume/experience-level"
            className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full lg:w-3/4 mt-10 py-4 px-8 flex items-center justify-center gap-2 group"
          >
            Next 
            {/* Updated: Added group-hover animation to arrow icon */}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Right animation section */}
        {/* Updated: Added flex centering for better alignment */}
        <div className="w-full flex items-center justify-center">
          <Lottie
            animationData={ResumeAnimation}
            autoplay
            loop
          />
        </div>
      </div>
    </div>
  );
}