"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUsers, FaBolt, FaDownload, FaCheckCircle, FaArrowRight, FaStar, } from "react-icons/fa";
import { MdDesignServices, MdSmartToy } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

interface Feature {
    id: number;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    gradient: string;
    bgColor: string;
    highlights: string[];
}

const features: Feature[] = [
    {
        id: 1,
        title: "ATS-Friendly Templates",
        description:
            "Pass through Applicant Tracking Systems effortlessly with our professionally designed, ATS-optimized resume templates. Each template is carefully structured to highlight your skills, experience, and achievements while ensuring maximum readability for automated systems. This increases your chances of getting noticed by recruiters and landing interviews faster.",
        buttonText: "Explore Templates",
        buttonLink:"/create-resume/experience-level/template-selection",
        image: "https://i.ibb.co.com/zHLfd8cz/Gray-Simple-Digital-Marketing-Resume.png",
        icon: FaShieldAlt,
        gradient: "from-emerald-500 to-emerald-600", // Updated
        bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100", // Updated
        highlights: ["98% ATS Pass Rate", "50+ Templates", "Industry Optimized"]
    },
    {
        id: 2,
        title: "Professional Templates",
        description:
            "Choose from hundreds of professionally designed resume templates created by career experts and graphic designers. Our templates are modern, elegant, and tailored for various industries. They help you make a strong first impression and effectively communicate your expertise to potential employers, ensuring your resume stands out from the competition.",
        buttonText: "Browse Designs",
        buttonLink:"/create-resume/experience-level/template-selection",
        image: "https://i.ibb.co.com/ZzXMx3Lj/Blue-and-Brown-Clean-Modern-High-School-Resume.png",
        icon: MdDesignServices,
        gradient: "from-emerald-600 to-teal-600", // Updated
        bgColor: "bg-gradient-to-br from-emerald-50 to-teal-100",
        highlights: ["200+ Designs", "Expert Created", "Modern Layouts"]
    },
    {
        id: 3,
        title: "Powerful AI Resume Builder",
        description:
            "Leverage advanced AI technology to create the perfect resume effortlessly. Our AI analyzes your target job description and suggests personalized content, keywords, and formatting to maximize your chances of getting noticed. It eliminates writer's block, saves time, and ensures your resume is optimized for each specific role.",
        buttonText: "Start Building",
        buttonLink:"/create-resume",
        image: "https://i.ibb.co.com/cS7vJYjX/Paster-Purple-and-Blue-Cute-Modern-Content-Writer-CV-Resume.png",
        icon: MdSmartToy,
        gradient: "from-emerald-500 to-teal-500", // Updated
        bgColor: "bg-gradient-to-br from-emerald-50 to-teal-100", // Updated
        highlights: ["AI Suggestions", "Keyword Optimization", "Real-time Feedback"]
    },
    {
        id: 4,
        title: "Expert Tips & Guidance",
        description:
            "Get actionable career advice from industry experts to enhance your resume, LinkedIn profile, and interview performance. Our tips include insights on structuring your experience, highlighting key achievements, and using the right language to impress recruiters. Stay ahead of the competition with personalized guidance tailored to your career goals.",
        buttonText: "Learn More",
        buttonLink:"/Career",
        image: "https://i.ibb.co.com/XfM9GxcD/Blue-and-White-Nurse-Resume.png",
        icon: FaUsers,
        gradient: "from-emerald-600 to-emerald-700", // Updated
        bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100", // Updated
        highlights: ["Resume Tips", "LinkedIn Guidance", "Interview Advice"]
    },
    {
        id: 5,
        title: "Mock Interview Simulator",
        description:
            "Prepare for real-world interviews with our AI-powered mock interview simulator. Practice answering industry-specific questions, receive instant feedback, and improve your communication and confidence. This tool allows you to identify strengths and weaknesses, ensuring you are fully prepared for any interview scenario.",
        buttonText: "Practice Now",
        buttonLink:"/mock-interview",
        image: "https://i.ibb.co.com/TMnJN5vW/White-Yellow-and-Black-Modern-Professional-Resume.png",
        icon: FaBolt,
        gradient: "from-emerald-500 to-teal-600", // Updated
        bgColor: "bg-gradient-to-br from-emerald-50 to-teal-100", // Updated
        highlights: ["AI Mock Interviews", "Instant Feedback", "Industry Questions"]
    },
    {
        id: 6,
        title: "Customizable & Downloadable",
        description:
            "Easily customize your resume with our intuitive tools, allowing you to adjust layouts, colors, fonts, and sections to reflect your unique personal brand. Once complete, download your resume in multiple formats like PDF, Word, or plain text. Every resume is optimized for online applications, ensuring maximum compatibility and ATS-readiness.",
        buttonText: "Download Options",
        buttonLink:"/",
        image: "https://i.ibb.co.com/50GtT0G/White-and-Black-Modern-New-Graduate-Professional-Resume-1.png",
        icon: FaDownload,
        gradient: "from-emerald-600 to-emerald-700", // Updated
        bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100", // Updated
        highlights: ["PDF & Word", "ATS-Compatible", "Instant Download"]
    },
    {
        id: 7,
        title: "24/7 AI Assistance",
        description:
            "Get round-the-clock AI assistance to answer your career questions, provide instant feedback, and guide you through resume building and interview preparation. No matter when you need support, our intelligent AI assistant is available 24/7 to ensure you always have the help you need to advance your career.",
        buttonText: "Get Help",
        buttonLink:"/",
        image: "https://i.ibb.co.com/50GtT0G/White-and-Black-Modern-New-Graduate-Professional-Resume-1.png",
        icon: IoMdHelpCircle,
        gradient: "from-emerald-500 to-teal-600",
        bgColor: "bg-gradient-to-br from-emerald-50 to-teal-100",
        highlights: ["Instant Support", "AI Guidance", "24/7 Availability"]
    }
];

const HighlightFeature: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadGSAP = async () => {
            const gsap = (await import("gsap")).default;
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            // ✅ FIXED: Define updateActiveFeature BEFORE using it
            const updateActiveFeature = (index: number) => {
                imageRefs.current.forEach((img, i) => {
                    if (!img) return;
                    if (i === index) {
                        gsap.to(img, { autoAlpha: 1, scale: 1, duration: 0.8 });
                    } else {
                        gsap.to(img, { autoAlpha: 0, scale: 0.9, duration: 0.6 });
                    }
                });
            };

            // initial states
            imageRefs.current.forEach((img, i) => {
                if (img) gsap.set(img, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.9 });
            });
            contentRefs.current.forEach((c) => {
                if (c) gsap.set(c, { autoAlpha: 0, y: 50 });
            });

            // scroll animation - Now updateActiveFeature is accessible
            contentRefs.current.forEach((c, i) => {
                if (!c) return;
                gsap.to(c, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: c,
                        start: "top 60%",
                        end: "bottom 40%",
                        toggleActions: "play reverse play reverse",
                        onEnter: () => updateActiveFeature(i),
                        onEnterBack: () => updateActiveFeature(i),
                    },
                });
            });

            if (progressRef.current) {
                gsap.to(progressRef.current, {
                    scaleY: 1,
                    transformOrigin: "top",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                    },
                });
            }

            return () => ScrollTrigger.getAll().forEach((t) => t.kill());
        };

        loadGSAP();
    }, []);

    return (
        <section className="min-h-screen bg-[linear-gradient(180deg,rgba(245,255,248,0.9)_0%,rgba(232,250,236,0.85)_40%,rgba(255,255,255,0.98)_100%)]">
            {/* Header */}
            <div className="text-center py-20 px-4">
                <div className="container mx-auto">
                    {/* Header content if needed */}
                </div>
            </div>

            <div ref={containerRef} className="container mx-auto px-4 pb-20">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left - Images */}
                    <div className="lg:w-1/2 lg:sticky lg:top-20 h-[80vh] flex items-center justify-center">
                        <div className="relative w-full h-full max-w-lg">
                            {/* Updated: Emerald progress bar */}
                            <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    ref={progressRef}
                                    className="w-full bg-gradient-to-b from-emerald-500 to-emerald-600 transform scale-y-0"
                                ></div>
                            </div>

                            {features.map((feature, i) => (
                                <div
                                    key={feature.id}
                                    ref={(el) => {
                                        imageRefs.current[i] = el;
                                    }}
                                    className="absolute inset-0 opacity-0"
                                >
                                    <div
                                        className={`relative h-full rounded-2xl overflow-hidden shadow-2xl ${feature.bgColor} border border-white/50`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            className="object-cover rounded-2xl"
                                            unoptimized
                                        />
                                        <div className="absolute bottom-6 left-6 right-6 z-20">
                                            <div
                                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${feature.gradient} text-white font-semibold text-sm mb-3`}
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            >
                                                <feature.icon size={16} />
                                                Feature #{i + 1}
                                            </div>
                                            <h3 
                                                className="text-white text-2xl font-bold mb-2"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            >
                                                {feature.title}
                                            </h3>
                                            <div className="flex gap-2">
                                                {feature.highlights.map((h, j) => (
                                                    <span
                                                        key={j}
                                                        className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full hover:bg-gradient-to-b from-white/30 to-white/10 transition-colors duration-300 cursor-pointer hover:scale-105 transform inline-block"
                                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                                    >
                                                        {h}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className="lg:w-1/2 space-y-24">
                        {features.map((feature, i) => (
                            <div
                                key={feature.id}
                                ref={(el) => {
                                    contentRefs.current[i] = el;
                                }}
                                className="opacity-0 group"
                            >
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <feature.icon size={32} className="text-white" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span 
                                                    className="text-sm font-medium text-gray-500"
                                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                                >
                                                    Feature {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <div className="h-px bg-gradient-to-r from-gray-300 to-transparent flex-1"></div>
                                            </div>
                                            {/* Updated: Emerald hover gradient */}
                                            <h2 
                                                className="text-3xl md:text-4xl font-bold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-emerald-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            >
                                                {feature.title}
                                            </h2>
                                        </div>
                                    </div>
                                    <p 
                                        className="text-lg text-gray-600 leading-relaxed pl-20"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        {feature.description}
                                    </p>
                                    <div className="pl-20 space-y-2">
                                        {feature.highlights.map((h, j) => (
                                            <div key={j} className="flex items-center gap-3">
                                                {/* Updated: Emerald checkmark */}
                                                <FaCheckCircle size={20} className="text-emerald-500 flex-shrink-0" />
                                                <span 
                                                    className="text-gray-700 font-medium"
                                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                                >
                                                    {h}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pl-20 pt-4">
                                        <Link href={feature.buttonLink}
                                            className={`group/btn inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${feature.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
                                            style={{ fontFamily: 'Inter, sans-serif' }}
                                        >
                                            {feature.buttonText}
                                            <FaArrowRight
                                                size={20}
                                                className="group-hover/btn:translate-x-1 transition-transform duration-300"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section (keeping your updated version) */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-white via-emerald-50 to-slate-50">
                {/* ... (rest of your CTA section remains the same) ... */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

                <div className="absolute top-10 left-10 w-20 h-20 border-4 border-emerald-200/30 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 border-4 border-emerald-200/30 rounded-lg rotate-45 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/3 right-20 w-12 h-12 bg-emerald-100/50 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 left-20 w-8 h-8 bg-emerald-100/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center mb-8"
                    >
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-100 to-emerald-200 border-2 border-emerald-300 rounded-full text-emerald-800 font-bold text-sm shadow-lg">
                            <FaBolt className="text-emerald-600" size={20} />
                            LIMITED TIME OFFER
                            <FaStar className="text-emerald-600" size={20} />
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-6"
                    >
                        <h2 
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-4 leading-tight"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            Ready to Land Your
                            <span className="block bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-600 bg-clip-text text-transparent">
                                Dream Job?
                            </span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-slate-600 mb-12 text-center max-w-3xl mx-auto font-medium leading-relaxed"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        Join over <span className="font-bold text-emerald-700">10,000+ professionals</span> who have transformed their careers with our AI-powered platform
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
                    >
                        {[
                            { icon: "🎯", stat: "95%", label: "Success Rate" },
                            { icon: "⚡", stat: "5 Min", label: "Setup Time" },
                            { icon: "🏆", stat: "10K+", label: "Happy Users" }
                        ].map((item, idx) => (
                            <div 
                                key={idx}
                                className="bg-white border-2 border-emerald-100 rounded-2xl p-6 text-center hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
                            >
                                <div className="text-4xl mb-2">{item.icon}</div>
                                <div className="text-3xl font-bold text-emerald-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{item.stat}</div>
                                <div className="text-slate-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{item.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            <Link href="/ai">Start Building Today</Link>
                            <FaArrowRight 
                                size={24} 
                                className="group-hover:translate-x-2 transition-transform duration-300" 
                            />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 font-bold text-xl rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            Watch Demo
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </motion.button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-slate-500 text-sm mb-4 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                            No credit card required • Free to start • Cancel anytime
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                "🔒 Secure & Private",
                                "⚡ Instant Access",
                                "💎 Premium Templates",
                                "🎓 Expert Guidance"
                            ].map((badge, idx) => (
                                <span 
                                    key={idx}
                                    className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-sm font-semibold hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-300"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                        className="mt-16 flex justify-center items-center gap-3"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div 
                                    key={i}
                                    className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-4 border-white flex items-center justify-center text-white font-bold shadow-lg"
                                >
                                    {i === 3 ? '😊' : '👤'}
                                </div>
                            ))}
                        </div>
                        <div className="text-left">
                            <div className="flex items-center gap-1 mb-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <FaStar key={i} className="text-emerald-600" size={16} />
                                ))}
                            </div>
                            <p className="text-slate-700 text-sm font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                                Loved by 10,000+ users worldwide
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </section>
    );
};

export default HighlightFeature;