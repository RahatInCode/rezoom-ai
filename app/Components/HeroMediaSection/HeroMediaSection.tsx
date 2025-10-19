"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
    FaRocket,
    FaBrain,
    FaUsers,
    FaVideo,
    FaMicrophone,
    FaChartLine,
    FaShieldAlt,
    FaGlobe,
    FaClock,
    FaStar,
    FaPlay,
    FaHeadset,
    FaLightbulb,

    FaCertificate
} from 'react-icons/fa';
import { LuTarget } from "react-icons/lu";
import Image from "next/image";

const logos = [
    { name: "Wired", src: "https://i.ibb.co.com/Mk09sjXM/wired-logo-png-seeklogo-153317.png" },
    { name: "Forbes", src: "https://i.ibb.co.com/QFFCCjNG/forbes-logo-png-seeklogo-269983.png" },
    { name: "Business Insider", src: "https://i.ibb.co.com/sdgzytR2/business-insider-logo-png-seeklogo-477466.png" },
    { name: "Bloomberg", src: "https://i.ibb.co.com/RGzNCB8K/Bloomberg-idu-Vic-AUa-R-1.png" },
    { name: "MSN", src: "https://i.ibb.co.com/27Wx4PV2/msn-logo-png-seeklogo-95635.png" },
    { name: "The Daily Star", src: "https://i.ibb.co.com/qYDQ96SR/the-daily-star-logo-png-seeklogo-351053.png" },
    { name: "Prothom Alo", src: "https://i.ibb.co.com/Y6WVNRM/prothom-alo-logo-png-seeklogo-357794.png" },
    { name: "Bangladesh Post", src: "https://i.ibb.co.com/wZ6Sq0My/bangladesh-post-office-logo-png-seeklogo-329226.png" },
    { name: "Dhaka Tribune", src: "https://i.ibb.co.com/NdMPp0q2/Dhaka-Tribune-idvjl-v-Rx-X-0.png" },
    { name: "New Age", src: "https://i.ibb.co.com/q4dVg41/id4o-G0-X-c-Y-logos.png" },
    { name: "bdnews24.com", src: "https://i.ibb.co.com/kgXS75hd/id-Fca11l-e-1758467965555.png" },
    { name: "The Business Standard", src: "https://i.ibb.co.com/YTpMJTpD/The-Business-Standard-id8-Wxedp0q-0.png" },
    { name: "Daily Sun", src: "https://i.ibb.co.com/SDdkC4c1/idd5x-LOhmn-logos.png" },
    { name: "Channel i", src: "https://i.ibb.co.com/Ps6tmnmg/id-J7y5-Bfw5-logos.png" },
    { name: "Yahoo", src: "https://i.ibb.co.com/nsXG8F1Y/Logo.png" },
    { name: "NPR", src: "https://i.ibb.co.com/rKJyt8sp/id-Dc7-NFZcu-1758468146726.jpg" },
    { name: "Fortune", src: "https://i.ibb.co.com/7JkPD1yG/id8c0esg-S2-1758468174662.jpg" },
    { name: "Entrepreneur", src: "https://i.ibb.co.com/pBx0DZ4R/idlx-B-iv-Ee-1758468231997.png" },
];

const features = [
    {
        icon: <FaBrain className="text-purple-600" />,
        title: "AI-Powered Resume Builder",
        description: "Smart templates that adapt to your industry with AI optimization"
    },
    {
        icon: <FaVideo className="text-blue-600" />,
        title: "Mock Interview Practice",
        description: "Practice with AI interviewer and get real-time feedback"
    },
    {
        icon: <FaRocket className="text-green-600" />,
        title: "Career Acceleration",
        description: "Get personalized job search strategies and tips"
    }
];

const interviewFeatures = [
    {
        icon: <FaMicrophone className="text-red-500" />,
        title: "Voice Analysis",
        description: "AI analyzes your speech patterns, pace, and clarity"
    },
    {
        icon: <FaChartLine className="text-indigo-600" />,
        title: "Performance Tracking",
        description: "Track your improvement over multiple sessions"
    },
    {
        icon: <FaUsers className="text-orange-500" />,
        title: "Industry-Specific Questions",
        description: "Practice with questions tailored to your field"
    },
    {
        icon: <FaLightbulb className="text-yellow-500" />,
        title: "Smart Feedback",
        description: "Get detailed insights on your answers and body language"
    },
    {
        icon: <LuTarget className="text-pink-500" />,
        title: "Behavioral Questions",
        description: "Master STAR method with guided practice sessions"
    },
    {
        icon: <FaCertificate className="text-teal-600" />,
        title: "Interview Certification",
        description: "Earn certificates to showcase your interview readiness"
    }
];

const stats = [
    { number: "1M+", label: "Resumes Created", icon: <FaUsers /> },
    { number: "95%", label: "Interview Success Rate", icon: <FaChartLine /> },
    { number: "50K+", label: "Mock Interviews Conducted", icon: <FaVideo /> },
    { number: "24/7", label: "AI Support", icon: <FaHeadset /> }
];

const HeroMediaSection: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const logosRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Hero entrance animation
        tl.fromTo(titleRef.current,
            { opacity: 0, y: 50, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }
        )
            .fromTo(subtitleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                "-=0.5"
            )
            .fromTo(buttonRef.current,
                { opacity: 0, y: 30, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
                "-=0.3"
            );

        // Features animation
        gsap.fromTo(".feature-card",
            { opacity: 0, y: 50, rotationX: -15 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Stats animation
        gsap.fromTo(".stat-item",
            { opacity: 0, scale: 0.5 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Logo infinite scroll animation
        const logoContainer = logosRef.current;
        if (logoContainer) {
            gsap.fromTo(".logo-item",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: "power2.out",
                    delay: 1.5
                }
            );

            // Continuous floating animation for logos
            gsap.to(".logo-item", {
                y: -5,
                duration: 2,
                stagger: 0.1,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            });
        }

        // Button hover animation setup
        const button = buttonRef.current;
        if (button) {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(147, 51, 234, 0.4)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    boxShadow: "0 4px 15px rgba(147, 51, 234, 0.2)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        }

    }, []);

    return (
        <section ref={heroRef} className="relative min-h-screen bg-[linear-gradient(180deg,rgba(245,255,248,0.9)_0%,rgba(232,250,236,0.85)_40%,rgba(255,255,255,0.98)_100%)] dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                {/* Hero Content */}
                <div className="text-center mb-16 sm:mb-20 lg:mb-24">
                    {/* Main Heading */}
                    <h1
                        ref={titleRef}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight"
                    >
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                            Land Your Dream Job
                        </span>
                        <span className="block text-gray-900 dark:text-white">
                            With AI-Powered Tools
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        ref={subtitleRef}
                        className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-4"
                    >
                        Master your resume, ace your interviews, and boost your career with our comprehensive suite of AI-powered job search tools and mock interview practice.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <button
                            ref={buttonRef}
                            className="group relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                        >
                            <span className="flex items-center justify-center">
                                <FaRocket className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                Start Your Resume Now
                            </span>
                        </button>
                        <button className="group text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-gray-300 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500">
                            <span className="flex items-center justify-center">
                                <FaPlay className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                Try Mock Interview
                            </span>
                        </button>
                    </div>
                </div>

                {/* Features Section */}
                <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
                            <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Mock Interview Features Section */}
                <div className="mb-16 sm:mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
                                Master Your Interview Skills
                            </span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
                            Practice with our AI-powered mock interview system and get personalized feedback to boost your confidence
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {interviewFeatures.map((feature, index) => (
                            <div key={index} className="interview-feature-card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group hover:transform hover:scale-105">
                                <div className="flex items-center mb-4">
                                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors duration-300">
                                        {React.cloneElement(feature.icon, { className: "w-6 h-6" })}
                                    </div>
                                </div>
                                <h4 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h4>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Interview CTA */}
                    <div className="text-center mt-8">
                        <button className="group bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
                            <span className="flex items-center justify-center">
                                <FaVideo className="w-5 h-5 mr-2 group-hover:rotate-6 transition-transform duration-300" />
                                Start Free Mock Interview
                            </span>
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
                            <div className="flex justify-center mb-3">
                                {React.cloneElement(stat.icon, {
                                    className: "w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300"
                                })}
                            </div>
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{stat.number}</div>
                            <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Media Logos Section */}
                <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base font-medium">
                        🏆 Featured in top publications worldwide
                    </p>

                    <div
                        ref={logosRef}
                        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4 sm:gap-6 lg:gap-8 items-center justify-center max-w-6xl mx-auto"
                    >
                        {logos.map((logo) => (
                            // <div key={logo.name} className="logo-item group">
                            //     <img
                            //         src={logo.src}
                            //         alt={`${logo.name} logo`}
                            //         className="h-6 sm:h-8 lg:h-10 mx-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                            //         loading="lazy"
                            //     />
                            // </div>
                            <div key={logo.name} className="logo-item group relative h-6 sm:h-8 lg:h-10 w-full">
                                <Image
                                    src={logo.src}
                                    alt={`${logo.name} logo`}
                                    fill
                                    className="object-contain mx-auto filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                                    unoptimized
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-12 sm:mt-16 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center hover:text-green-500 transition-colors duration-300">
                        <FaShieldAlt className="w-4 h-4 mr-2" />
                        SSL Secured
                    </div>
                    <div className="flex items-center hover:text-blue-500 transition-colors duration-300">
                        <FaGlobe className="w-4 h-4 mr-2" />
                        GDPR Compliant
                    </div>
                    <div className="flex items-center hover:text-purple-500 transition-colors duration-300">
                        <FaClock className="w-4 h-4 mr-2" />
                        99.9% Uptime
                    </div>
                    <div className="flex items-center hover:text-yellow-500 transition-colors duration-300">
                        <FaStar className="w-4 h-4 mr-2" />
                        4.9/5 Rating
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroMediaSection;