"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Info from "../../../../Components/Resume-Create-Forms/Personal-Info/Info";
import Education from "../../../../Components/Resume-Create-Forms/Education/Education";
import Skill from "../../../../Components/Resume-Create-Forms/Skills/Skill";
import Experience from "../../../../Components/Resume-Create-Forms/Experience/Experience";

const steps = ["Personal Information", "Education", "Skills", "Experience"];
const components = [
  <Info key="info" />,
  <Education key="education" />,
  <Skill key="skill" />,
  <Experience key="experience" />,
];


const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const animationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="w-full h-fit overflow-hidden md:min-h-screen flex flex-col md:flex-row">
      
      {/* Sidebar / Steps */}
      <div className="w-full md:w-1/5 bg-gradient-to-r from-pink-500 to-blue-600 text-white flex justify-center items-center md:items-start p-5 md:h-screen sticky top-0">
        <ul className="steps md:steps-vertical w-full max-w-xs">
          {steps.map((step, idx) => (
            <li key={idx}  className={`step ${idx <= currentStep ? "step-primary" : ""}`}>
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* Scrollable Form Area */}
      <div className="w-full md:w-4/5 bg-white p-5 md:p-8 xl:p-12 flex flex-col gap-5 overflow-y-auto max-h-screen">
        
        {/* Top Go Back */}
        {currentStep > 0 && (
          <p
            className="cursor-pointer text-blue-600 hover:underline font-semibold mb-3"
            onClick={prevStep}
          >
            &larr; Go Back
          </p>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            {components[currentStep]}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Buttons (Preview / Next / Submit) */}
        <div className="w-full flex justify-end gap-3 mt-5">
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              className="btn btn-primary btn-outline"
            >
              Preview
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button
              onClick={nextStep}
              className="btn bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-12"
            >
              Next
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button className="btn btn-success px-12">Submit</button>
          )}
        </div>

        <div className="text-sm text-center mt-3">
          <p>
            The results are based on a study with over 1000 participants, among whom 287 used resume tools provided on our family sites.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
