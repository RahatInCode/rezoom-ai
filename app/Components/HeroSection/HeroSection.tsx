
'use client';
import React from 'react';
import { FaArrowRight, FaUpload } from 'react-icons/fa';
import Lottie from 'lottie-react';
import resumeAnimation from "../../../public/hero.json";

const HeroSection: React.FC = () => {
    return (
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="  container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">

                {/* Left Side */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                        Build Your Perfect Resume <br /> & Ace Your <span className="block text-blue-600 dark:text-blue-400">Interviews</span>
                    </h1>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto lg:mx-0 rounded-full"></div>
                    <p className="text-lg sm:text-xl text-gray-700">
                        Create professional resumes in minutes with AI-powered tools, expert guidance, and customizable templates.
                    </p>

                    {/* Benefits Points */}
                    <ul className="space-y-2 text-gray-700">
                        <li>• ATS-Friendly Templates to get noticed by recruiters</li>
                        <li>• Professional designs & expert tips included</li>
                        <li>• Mock Interview Simulator for real-time practice</li>
                        <li>• Instant AI suggestions to improve impact</li>
                    </ul>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
                        <button className="flex items-center gap-2   bg-purple-600 hover:bg-purple-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                            Create My Resume Now <FaArrowRight />
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 font-semibold">
                            Import Resume <FaUpload />
                        </button>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex-1 flex justify-center lg:justify-end">
                    <div className="w-full max-w-lg">
                        <Lottie animationData={resumeAnimation} loop={true} />
                    </div>
                </div>
            </div>

            
        </section>
    );
};

export default HeroSection;
