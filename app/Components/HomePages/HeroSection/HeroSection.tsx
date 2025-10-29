"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const easeBezier = [0.45, 0.05, 0.55, 0.95] as const;

const floatVariants = (delay = 0): Variants => ({
  initial: { y: 0 },
  animate: {
    y: [-8, 6, -8],
    transition: {
      duration: 4.8,
      ease: easeBezier,
      repeat: Infinity,
      repeatType: "mirror",
      delay,
    },
  },
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.15 * Number(i) },
  }),
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-[700px] sm:min-h-[760px] overflow-hidden bg-[linear-gradient(180deg,rgba(245,255,248,0.9)_0%,rgba(232,250,236,0.85)_40%,rgba(255,255,255,0.98)_100%)]">
      {/* Background grid */}
      <div className="absolute inset-0">
        <Image
          src="/grid-pattern.svg"
          alt="background grid"
          fill
          className="object-cover opacity-10 pointer-events-none select-none"
          priority
        />
      </div>

      {/* Soft center glow */}
      <div className="absolute top-1/2 left-1/2 w-[320px] h-[240px] sm:w-[420px] sm:h-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] bg-[rgba(36,190,110,0.08)]" />

      <div className="relative z-10 flex flex-col items-center justify-center px-5 sm:px-6 text-center pt-24 sm:pt-28">
        {/* Large faint background word */}
        <span className="absolute top-[18%] sm:top-[20%] text-[18vw] sm:text-[10rem] font-extrabold text-emerald-100 opacity-10 select-none pointer-events-none leading-none">
          AI-Powered
        </span>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-extrabold text-slate-900 leading-[0.95] max-w-4xl"
        >
          <span className="block text-[9vw] sm:text-[3.25rem] lg:text-[4.5rem]">
            Build Your
          </span>
          <span className="block text-[10vw] sm:text-[4rem] lg:text-[4.5rem] text-emerald-700">
            Career-Ready Resume
          </span>
          <span className="block text-[8vw] sm:text-[3rem] lg:text-[3.5rem]">
            & Master Interviews Today
          </span>
        </motion.h1>

        {/* Subtext + Floating Cards */}
        <div className="relative mt-6 sm:mt-8 w-full max-w-3xl mx-auto min-h-[220px] sm:min-h-[240px] md:min-h-[260px]">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="relative z-0 text-base sm:text-lg text-gray-600 px-3 sm:px-0"
          >
            Empower your career with AI tools that craft winning resumes, analyze job
            descriptions, and simulate real interview scenarios — all in one platform.
          </motion.p>

          {/* Floating Cards Cluster */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <div className="relative w-full h-full scale-95 sm:scale-100">
              
              {/* Center Card */}
              <motion.div
                variants={floatVariants(0)}
                initial="initial"
                animate="animate"
                className="absolute left-1/2 top-1/2 w-[220px] sm:w-[260px] h-[180px] sm:h-[200px] 
                -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl 
                shadow-[0_14px_35px_rgba(15,23,42,0.15)] p-4 border border-[rgba(11,16,12,0.04)] rotate-[-2deg]"
              >
                <div className="text-[11px] sm:text-[12px] uppercase font-semibold text-emerald-700 mb-1">
                  AI Resume Optimization Report
                </div>
                <div className="text-[14px] sm:text-[15px] font-semibold text-slate-900">
                  Frontend Developer · Tailored Insights
                </div>
                <div className="mt-3 inline-flex items-center gap-2 bg-slate-900 text-white text-[11px] sm:text-[12px] font-medium px-3 py-1 rounded-full shadow-md">
                  <span>98% Match Rate</span>
                </div>
                <div className="mt-4 text-[12px] sm:text-[13px] text-emerald-600 underline">
                  View Insights
                </div>
              </motion.div>

              {/* Top-left Card */}
              <motion.div
                variants={floatVariants(0.3)}
                initial="initial"
                animate="animate"
                className="absolute left-[18%] top-[18%] sm:left-[24%] sm:top-[22%] 
                w-[160px] sm:w-[170px] h-[74px] sm:h-[80px] 
                bg-white/95 backdrop-blur-sm border border-[rgba(11,16,12,0.05)] 
                rounded-xl shadow-[0_10px_25px_rgba(15,23,42,0.1)] flex items-center px-3 gap-3 rotate-[-3deg]"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs sm:text-sm">
                  S
                </div>
                <div className="text-left">
                  <p className="text-[12px] sm:text-[13px] font-semibold text-slate-900">
                    Sophia Turner
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500">UX Designer Resume</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400">Oct 2025</p>
                </div>
              </motion.div>

              {/* Top-right Card */}
              <motion.div
                variants={floatVariants(0.6)}
                initial="initial"
                animate="animate"
                className="absolute right-[18%] top-[16%] sm:right-[24%] sm:top-[20%] 
                w-[160px] sm:w-[170px] h-[74px] sm:h-[80px] 
                bg-emerald-50/95 backdrop-blur-sm border border-[rgba(11,16,12,0.05)] 
                rounded-xl shadow-[0_10px_25px_rgba(15,23,42,0.1)] flex items-center px-3 gap-3 rotate-[3deg]"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                  D
                </div>
                <div className="text-left">
                  <p className="text-[12px] sm:text-[13px] font-semibold text-slate-900">
                    David Chen
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500">Interview Score +32%</p>
                </div>
              </motion.div>

              {/* Bottom-left Pill */}
              <motion.div
                variants={floatVariants(0.9)}
                initial="initial"
                animate="animate"
                className="absolute left-[20%] bottom-[14%] sm:left-[24%] sm:bottom-[18%] 
                w-[150px] sm:w-[160px] h-[46px] sm:h-[50px] 
                bg-[#062022] text-white rounded-full flex flex-col items-center justify-center 
                text-[11px] sm:text-[12px] font-medium shadow-[0_10px_30px_rgba(34,165,91,0.1)] rotate-[-4deg]"
              >
                Recruiter Assistant AI
                <span className="text-[9px] sm:text-[10px] text-emerald-300">Auto-scoring</span>
              </motion.div>

              {/* Bottom-right Pill */}
              <motion.div
                variants={floatVariants(1.2)}
                initial="initial"
                animate="animate"
                className="absolute right-[20%] bottom-[12%] sm:right-[24%] sm:bottom-[16%] 
                w-[150px] sm:w-[160px] h-[46px] sm:h-[50px] 
                bg-emerald-600 text-white rounded-full flex flex-col items-center justify-center 
                text-[11px] sm:text-[12px] font-medium shadow-[0_10px_30px_rgba(34,165,91,0.12)] rotate-[4deg]"
              >
                Virtual Interview Bot
                <span className="text-[9px] sm:text-[10px] text-emerald-100">
                  Simulates HR interviews
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-0 sm:mt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 z-30 relative"
        >
          <Link href="/create-resume" className="rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold px-7 sm:px-8 py-2 shadow-[0_8px_20px_rgba(34,165,91,0.18)] transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-emerald-400">
            Get Started
          </Link>
          <button className="rounded-xl bg-slate-900 text-white font-medium px-6 py-3 flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105">
            ▶ Try Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}