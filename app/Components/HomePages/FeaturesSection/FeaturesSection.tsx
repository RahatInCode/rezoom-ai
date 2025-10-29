'use client';
import React, { useEffect, useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Feature {
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        title: "ATS-Friendly Templates",
        description: "Build resumes that easily pass Applicant Tracking Systems with optimized formatting."
    },
    {
        title: "Professional Templates",
        description: "Modern, clean, and recruiter-approved designs that make a lasting impression."
    },
    {
        title: "Powerful AI Resume Builder",
        description: "Create tailored resumes in minutes with intelligent AI assistance and suggestions."
    },
    {
        title: "Expert Tips & Guidance",
        description: "Get professional advice and industry insights to improve your resume content."
    },
    {
        title: "Mock Interview Simulator",
        description: "Practice real interview scenarios with personalized AI feedback and coaching."
    },
    {
        title: "Customizable & Downloadable",
        description: "Export resumes in multiple formats (PDF, Word) or share online with ease."
    },
    {
        title: "Skill & Achievement Highlighting",
        description: "Ensure your key strengths and accomplishments stand out to potential employers."
    },
    {
        title: "Real-Time Suggestions",
        description: "AI provides instant improvements and optimization tips for maximum impact."
    },
    {
        title: "24/7 AI Assistance",
        description: "Get instant AI help anytime to improve your resume and master interview skills."
    },
];

const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature }) => {
    return (
        <div
            className="group flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-white border border-gray-100/50"
        >
            <div className="flex-shrink-0 mt-1">
                <div className="relative">
                    {/* Updated: emerald colors */}
                    <FaCheckCircle className="text-emerald-600 text-3xl group-hover:text-emerald-700 transition-colors duration-200" />
                    <div className="absolute inset-0 bg-emerald-600/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                </div>
            </div>
            <div className="flex-1">
                {/* Updated: emerald hover color and Inter font */}
                <h3 
                    className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors duration-200"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                >
                    {feature.title}
                </h3>
                <p 
                    className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                >
                    {feature.description}
                </p>
            </div>
        </div>
    );
};

const FeaturesSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate title
            if (titleRef.current) {
                gsap.fromTo(titleRef.current,
                    {
                        opacity: 0,
                        y: 30,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            }

            // Animate feature cards
            if (sectionRef.current) {
                const cards = sectionRef.current.children;
                gsap.fromTo(cards,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.95,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        stagger: {
                            amount: 0.6,
                            from: "start",
                        },
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            }
        });

        return () => ctx.revert(); // Cleanup
    }, []);

    return (
        // Updated: emerald background
        <section className="relative py-12 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>

                <div className="mb-6 lg:mb-8" ref={titleRef}>
                    {/* Updated: Inter font */}
                    <h2 
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        Why Choose Our
                        {/* Updated: emerald color */}
                        <span className="block text-emerald-600 dark:text-emerald-400">Platform</span>
                    </h2>
                    {/* Updated: emerald underline */}
                    <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-emerald-600 mx-auto lg:mx-0 rounded-full"></div>
                </div>

                <div
                    ref={sectionRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto"
                >
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>

                {/* Call-to-action section */}
                <div className="text-center mt-16">
                    {/* Updated: emerald gradient and Inter font */}
                    <div 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        <Link href="/Career">  Get Started Today</Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;