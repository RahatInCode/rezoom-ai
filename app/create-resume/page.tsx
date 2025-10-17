"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Lottie from "lottie-react";
import ResumeAnimation from "../../public/ResumeSteps.json";
import Link from "next/link";

export default function ResumeBuild_Welcome() {
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-[calc(100vh-60px)]">
      <div className="container max-h-fit min-h-96 w-full lg:w-3/4 flex flex-col md:flex-row p-5">
        
        {/* Left text section */}
        <div className="w-full flex flex-col items-start justify-center">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            Just three<br />easy steps
          </h1>

          <div className="w-fit mt-5 text-xl flex flex-col space-y-5">
            {[
              "Select a template from our library of professional designs",
              "Build your resume with our industry-specific bullet points",
              "Customize the details and wrap it up. You’re ready to send!",
            ].map((text, index) => (
              <div key={index} className="flex gap-5 items-center">
                <div className="rounded-full bg-[#EFF2F9] text-sm font-semibold flex justify-center items-center w-8 h-8">
                  <p>{index + 1}</p>
                </div>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <Link
            href="/create-resume/experience-level"
            className="btn btn-primary w-full lg:w-3/4 mt-5 font-extrabold flex items-center justify-center gap-2"
          >
            Next <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Right animation section */}
        <div className="w-full">
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
