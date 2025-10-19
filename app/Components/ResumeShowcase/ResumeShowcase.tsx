"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const resumeData = [
    { id: 1, sector: "Nursing", resume: "https://i.ibb.co.com/8nTbfBFL/Black-and-White-Simple-Bordered-Nurse-Resume.png" },
    { id: 2, sector: "Web Developer", resume: "https://i.ibb.co.com/sBf1yTN/Blue-Neutral-Simple-Minimalist-Professional-Web-Developer-Resume.png" },
    { id: 3, sector: "Engineering", resume: "https://i.ibb.co.com/Fq7KLs8w/Design.png" },
    { id: 4, sector: "High School", resume: "https://i.ibb.co.com/ZzXMx3Lj/Blue-and-Brown-Clean-Modern-High-School-Resume.png" },
    { id: 5, sector: "Teacher", resume: "https://i.ibb.co.com/QzQSprV/English-Teacher-Entry-Level-Resume-in-White-Olive-Green-Simple-and-Minimal-Style.png" },
    { id: 6, sector: "Medical Assistant", resume: "https://i.ibb.co.com/Kc5SWjfv/Green-Grey-Minimalist-Medical-Assistant-Letter-of-Recommendation.png" },
    { id: 7, sector: "Customer Service", resume: "https://i.ibb.co.com/kgJY3CR4/Minimal-Customer-Service-Resume.png" },
    { id: 8, sector: "Internship", resume: "https://i.ibb.co.com/Fqg9MGwb/Accountant-Intern-Resume-Example-Homepage-pdf.png" },
    { id: 9, sector: "Information Technology", resume: "https://i.ibb.co.com/zhbtWjWX/Senior-Cybersecurity-Specialist-Resume-Example-Homepage-pdf.png" },
    { id: 10, sector: "New Grad Nursing", resume: "https://i.ibb.co.com/XfM9GxcD/Blue-and-White-Nurse-Resume.png" },
    { id: 11, sector: "Healthcare", resume: "https://i.ibb.co.com/HRpFv1g/White-and-Blue-Modern-Doctor-Resume.png" },
    { id: 12, sector: "Executive", resume: "https://i.ibb.co.com/xS8p209H/Blue-Black-Sleek-Management-Corporate-Resume.png" },
    { id: 13, sector: "Accounting", resume: "https://i.ibb.co.com/pB8QnMnt/Black-and-White-Corporate-Accountant-Resume.png" },
    { id: 14, sector: "Graphic Design", resume: "https://i.ibb.co.com/5hdWN41N/Black-and-White-Color-Blocks-Graphic-Designer-Resume.png" },
    { id: 15, sector: "Marketing", resume: "https://i.ibb.co.com/zHLfd8cz/Gray-Simple-Digital-Marketing-Resume.png" },
    { id: 16, sector: "Data Analyst", resume: "https://i.ibb.co.com/vx2yyhvz/White-Gold-Elegant-Minimalist-Data-Analyst-Resume-CV-A4-Printable.png" },
    { id: 17, sector: "Human Resources", resume: "https://i.ibb.co.com/7TqZv8d/Human-Resources-Resume-in-Beige-Black-Warm-Classic-Style.png" },
    { id: 18, sector: "Project Manager", resume: "https://i.ibb.co.com/VWHwn3Rw/Blue-Modern-Professional-Resume-Project-Manager.png" },
    { id: 19, sector: "Sales", resume: "https://i.ibb.co.com/HfP0m8WY/Tan-and-Black-Minimalist-Sales-Manager-Resume.png" },
    { id: 20, sector: "Content Writer", resume: "https://i.ibb.co.com/cS7vJYjX/Paster-Purple-and-Blue-Cute-Modern-Content-Writer-CV-Resume.png" },
];

const ResumeShowcase: React.FC = () => {
    const [activeId, setActiveId] = useState<number>(1);
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // GSAP animations
    useEffect(() => {
        if (imgRef.current) {
            setImageLoading(true);

            // Fade out current image
            gsap.to(imgRef.current, {
                opacity: 0,
                scale: 0.9,
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => {
                    // After fade out, fade in new image
                    gsap.fromTo(imgRef.current,
                        {
                            opacity: 0,
                            scale: 0.9,
                            y: 20
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "back.out(1.7)",
                            onComplete: () => setImageLoading(false)
                        }
                    );
                }
            });
        }
    }, [activeId]);

    // Title animation on mount
    useEffect(() => {
        const titleElements = document.querySelectorAll('.title-animate');
        gsap.fromTo(titleElements,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
        );
    }, []);

    const activeResume = resumeData.find((item) => item.id === activeId);

    const handleSectorClick = (id: number) => {
        if (id !== activeId) {
            setActiveId(id);
        }
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    return (
        // Updated: emerald background
        <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center lg:text-left mb-8 lg:mb-12">
                    <h2 className="title-animate text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                        Find the Right Resume for
                        {/* Updated: emerald gradient */}
                        <span className="title-animate block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-400 dark:to-emerald-500">Your Career</span>
                    </h2>
                    {/* Updated: emerald underline */}
                    <div className="title-animate w-16 sm:w-20 h-1 bg-gradient-to-r from-emerald-600 to-emerald-600 mx-auto lg:mx-0 rounded-full"></div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">

                    {/* Mobile Dropdown for sectors */}
                    <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700">
                        <label htmlFor="sector-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select Sector:
                        </label>
                        <select
                            id="sector-select"
                            value={activeId}
                            onChange={(e) => handleSectorClick(Number(e.target.value))}
                            // Updated: emerald focus ring
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                            {resumeData.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.sector}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block lg:w-1/4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-r border-gray-200 dark:border-gray-600">
                        <div className="p-4 sm:p-6 h-full">
                            {/* Updated: emerald heading */}
                            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-emerald-600 dark:text-emerald-400 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Sectors
                            </h3>
                            {/* Updated: emerald scrollbar */}
                            <div className="h-80 sm:h-96 lg:h-[500px] xl:h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-300 scrollbar-track-gray-100">
                                <ul className="space-y-2">
                                    {resumeData.map((item) => (
                                        <li
                                            key={item.id}
                                            onClick={() => handleSectorClick(item.id)}
                                            // Updated: emerald active gradient
                                            className={`cursor-pointer px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${activeId === item.id
                                                    ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold shadow-lg"
                                                    : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500 hover:shadow-md"
                                                }`}
                                        >
                                            <span className="text-sm sm:text-base">{item.sector}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Resume Display */}
                    <div className="flex-1 lg:w-3/4 p-4 sm:p-6 lg:p-8">
                        <div className="relative h-96 sm:h-[500px] lg:h-[600px] xl:h-[700px] flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden group">
                            {activeResume ? (
                                <>
                                    {/* Loading Spinner */}
                                    {imageLoading && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-700 z-10">
                                            {/* Updated: emerald spinner */}
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                                        </div>
                                    )}

                                    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
                                        <Image
                                            ref={imgRef}
                                            src={activeResume.resume}
                                            alt={`${activeResume.sector} resume template - Professional resume design`}
                                            fill
                                            className="object-contain rounded-lg shadow-lg"
                                            onLoad={handleImageLoad}
                                            onError={() => setImageLoading(false)}
                                            priority
                                            unoptimized
                                        />

                                        {/* Overlay Button */}
                                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                            <button
                                                // Updated: emerald gradient button
                                                className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300
                                                         bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 
                                                         text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg 
                                                         text-sm sm:text-lg font-semibold hover:shadow-xl transform hover:scale-105"
                                                aria-label={`Use ${activeResume.sector} resume template`}
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Use this template
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center">
                                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-gray-500 dark:text-gray-400 text-lg">Select a sector to view resume</p>
                                </div>
                            )}
                        </div>

                        {/* Active Resume Info */}
                        {activeResume && (
                            <div className="mt-4 sm:mt-6 text-center">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                                    {activeResume.sector} Resume Template
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                    Professional template designed for {activeResume.sector.toLowerCase()} professionals
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="flex justify-center mt-6 sm:mt-8">
                    {/* Updated: emerald CTA button */}
                    <button className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white text-emerald-600 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                        <svg className="w-5 h-5 mr-2 inline-block group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View All Resume Templates
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ResumeShowcase;