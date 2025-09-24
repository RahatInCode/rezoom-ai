"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    q: "What is a Resume Builder?",
    a: "A Resume Builder helps you create professional resumes quickly using ready-made templates and easy customization options.",
  },
  {
    q: "Are the resumes ATS-friendly?",
    a: "Yes, all our templates are ATS-compatible, so your resume passes through Applicant Tracking Systems without issues.",
  },
  {
    q: "Can I download my resume for free?",
    a: "Yes, you can download your resume in PDF format for free. Premium users get access to multiple formats.",
  },
  {
    q: "What is a Mock Interview?",
    a: "Mock Interview is a practice interview session that helps you prepare for real job interviews with instant feedback.",
  },
  {
    q: "How does the Mock Interview work?",
    a: "You answer interview questions online, and the system provides feedback on your answers, tone, and confidence.",
  },
];

const FAQ: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Left Side - Title + Image */}
          <div
            className={`text-center lg:text-left transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mb-6 lg:mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked
                <span className="block text-blue-600 dark:text-blue-400">
                  Questions
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto lg:mx-0 rounded-full"></div>
            </div>

            <div className="relative group w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0 rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative w-full h-64 sm:h-80 lg:h-96">
                <Image
                  src="https://i.ibb.co/2Qd5Tg4/Whats-App-Image-2025-09-16-at-17-39-29-0d759561.jpg"
                  alt="FAQ Illustration"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                   unoptimized
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl pointer-events-none"></div>
            </div>
          </div>

          {/* Right Side - Description + Questions */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mb-6 lg:mb-8">
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Here are some of the most common questions about our Resume
                Builder and Mock Interview features. Cant find what you are
                looking for?{" "}
                <span className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
                  Contact us
                </span>
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${400 + idx * 100}ms` }}
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white pr-4">
                        {item.q}
                      </h3>
                      <FaChevronDown
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 transition-transform duration-300 flex-shrink-0 ${
                          openIndex === idx ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Smooth expand/collapse */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === idx
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Still have questions?
              </h3>
              <p className="text-blue-100 text-sm sm:text-base mb-4">
                Our support team is here to help you 24/7
              </p>
              <button className="bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
