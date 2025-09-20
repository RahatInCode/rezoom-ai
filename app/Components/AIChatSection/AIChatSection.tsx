// components/AIChatSection.tsx
'use client';
import React from 'react';
import { FaRobot, FaComments, FaLightbulb } from 'react-icons/fa';
import Lottie from 'lottie-react';
import chatAnimation from "../../../public/Messages AI animation.json";

const features = [
    { icon: FaRobot, title: "Real-time Feedback", description: "AI analyzes your answers instantly and gives helpful suggestions." },
    { icon: FaLightbulb, title: "Personalized Tips", description: "Receive tailored advice to improve your interview performance." },
    { icon: FaComments, title: "Ask Any Question", description: "Get instant AI answers to your career or resume-related queries." },
];

const AIChatSection: React.FC = () => {
    return (
        <section className="relative py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">

                {/* Left Side - Text & Features */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                    <div className="mb-6 lg:mb-8 text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Practice, Learn & Improve 
                            <span className="block text-blue-600 dark:text-blue-400">with AI Chat</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto lg:mx-0 rounded-full"></div>
                    </div>

                    <p className="text-white text-lg sm:text-xl">
                        Get instant feedback, personalized tips, and guidance from your AI-powered chat assistant. Improve your resume, mock interview answers, and career knowledge anytime, anywhere.
                    </p>

                    <ul className="mt-6 space-y-4">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="text-purple-600 text-3xl mt-1"><Icon /></div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                                        <p className="text-gray-300">{feature.description}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center gap-2">
                            Start Chatting Now <FaComments />
                        </button>
                        <button className="px-6 py-3 border border-purple-600 hover:bg-purple-600 hover:text-white rounded-full font-semibold transition-all duration-300">
                            Learn How It Works
                        </button>
                    </div>
                </div>

                {/* Right Side - Lottie Animation */}
                <div className="flex-1 flex justify-center lg:justify-end">
                    <div className="w-full max-w-lg">
                        <Lottie animationData={chatAnimation} loop={true} />
                    </div>
                </div>
            </div>

            {/* Background Circles */}
            {/* <div className="absolute top-0 left-0 w-72 h-72 bg-purple-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div> */}
        </section>
    );
};

export default AIChatSection;
