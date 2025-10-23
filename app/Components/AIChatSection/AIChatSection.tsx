// components/MockInterviewCTA.tsx
'use client';
import React from 'react';
import { Mic, Video, Brain, Target, TrendingUp, Sparkles, Play, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const features = [
    { 
        icon: Mic, 
        title: "Voice-Powered Interviews", 
        description: "Practice with real-time speech recognition and natural conversation flow.",
        color: "from-emerald-500 to-emerald-600"
    },
    { 
        icon: Brain, 
        title: "AI-Driven Feedback", 
        description: "Get instant analysis on your answers with actionable improvement tips.",
        color: "from-emerald-600 to-teal-600"
    },
    { 
        icon: Target, 
        title: "Industry-Specific Questions", 
        description: "Tailored questions for your role, from software engineering to business analysis.",
        color: "from-teal-600 to-cyan-600"
    },
    { 
        icon: TrendingUp, 
        title: "Track Your Progress", 
        description: "Monitor improvement over time with detailed performance analytics.",
        color: "from-cyan-600 to-emerald-600"
    },
];

const stats = [
    { number: "10K+", label: "Interviews Completed" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Available Anytime" },
];

const MockInterviewCTA: React.FC = () => {
    return (
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-50 via-emerald-50 to-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header Section */}
                <motion.div 
                    className="text-center mb-16 md:mb-20"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="inline-block mb-6"
                    >
                        <span className="px-6 py-3 bg-gradient-to-r from-emerald-100 to-emerald-200 border-2 border-emerald-300 rounded-full text-sm font-bold text-emerald-800 backdrop-blur-sm shadow-lg inline-flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            AI-Powered Mock Interviews
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <h2 
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        <span className="bg-gradient-to-r from-slate-900 via-emerald-800 to-emerald-900 bg-clip-text text-transparent">
                            Practice Interviews Like
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Never Before
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p 
                        className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        Master your interview skills with our AI interviewer powered by Google Gemini. 
                        Get real-time feedback, practice unlimited times, and land your dream job with confidence.
                    </p>

                    {/* Stats Bar */}
                    <motion.div 
                        className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div 
                                    className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    {stat.number}
                                </div>
                                <div className="text-slate-600 font-semibold mt-2">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
                    
                    {/* Left Side - Visual/Interactive Element */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        {/* Main Card - Mock Interview Simulator Preview */}
                        <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 overflow-hidden p-8 md:p-10">
                            {/* Floating Mic Icon with Animation */}
                            <div className="flex justify-center mb-8">
                                <motion.div
                                    animate={{ 
                                        scale: [1, 1.1, 1],
                                        boxShadow: [
                                            '0 0 0 0 rgba(16, 185, 129, 0.4)',
                                            '0 0 0 20px rgba(16, 185, 129, 0)',
                                            '0 0 0 0 rgba(16, 185, 129, 0)'
                                        ]
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="relative"
                                >
                                    <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center shadow-2xl">
                                        <Mic className="w-16 h-16 text-white" />
                                    </div>
                                    {/* Pulsing Ring */}
                                    <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-xl animate-pulse"></div>
                                </motion.div>
                            </div>

                            {/* Sample Question */}
                            <div className="bg-emerald-50 rounded-2xl p-6 border-l-4 border-emerald-500 mb-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold">AI</span>
                                    </div>
                                    <div className="flex-1">
                                            <p className="text-sm text-emerald-700 font-bold mb-1">Question 1 of 10</p>
                                            <p 
                                                className="text-slate-800 font-semibold text-lg leading-relaxed"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            >
                                                &quot;Tell me about a challenging project you have worked on and how you overcame obstacles.&quot;
                                            </p>
                                        </div>
                                </div>
                            </div>

                            {/* Response Indicator */}
                            <div className="flex items-center gap-3 text-slate-600">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="w-3 h-3 bg-emerald-500 rounded-full"
                                ></motion.div>
                                <span className="text-sm font-medium">Click the mic to start speaking...</span>
                            </div>

                            {/* Features Checklist */}
                            <div className="mt-8 space-y-3">
                                {[
                                    "Real-time speech recognition",
                                    "AI-powered response analysis",
                                    "Instant feedback & suggestions"
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                                        <span className="text-slate-700 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-teal-400/20 to-emerald-400/20 rounded-full blur-2xl"></div>
                    </motion.div>

                    {/* Right Side - Features List */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-6"
                    >
                        <div className="mb-8">
                            <h3 
                                className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                Why Choose Our Mock Interviews?
                            </h3>
                            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                        </div>

                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                                >
                                    {/* Icon */}
                                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h4 
                                        className="text-xl font-bold text-slate-900 mb-2"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        {feature.title}
                                    </h4>
                                    <p 
                                        className="text-slate-600 leading-relaxed font-medium"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        {feature.description}
                                    </p>

                                    {/* Hover Accent */}
                                    <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-emerald-500 to-teal-500 group-hover:h-full transition-all duration-500 rounded-l-2xl"></div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Link href="/mock-interview">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 flex items-center gap-3"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            Start Your First Interview
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </motion.button>
                    </Link>

                    <Link href="/mock-interview#how-it-works">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            <Video className="w-6 h-6" />
                            Watch Demo
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-slate-500 text-sm mb-4 font-medium">Trusted by job seekers worldwide</p>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        {['🎯 Real Interview Questions', '🚀 Instant Feedback', '💡 Expert Tips', '🏆 Proven Results'].map((badge, idx) => (
                            <span 
                                key={idx} 
                                className="px-5 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-200"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MockInterviewCTA;