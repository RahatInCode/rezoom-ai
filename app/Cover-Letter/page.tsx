'use client'
import React from 'react';
import CoverLetterGenerator from './ai-cover-letter/page';
import LinkedInSummaryGenerator from './linkedIn-generator/page';
import Lottie from 'lottie-react';
import coverLetter from '../../public/lotties/cvLetter.json'
import linkedInAi from '../../public/lotties/linkedInAi.json'
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Page = () => {
  return (
    // Updated: Light background with emerald accents
    <div className="bg-gradient-to-br from-white via-emerald-50 to-slate-50">
      
      {/* Section 1 - Cover Letter */}
      <section className="pt-24 pb-16 px-4 md:px-10">
        {/* Updated: Emerald gradient heading */}
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center mb-6 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent leading-tight"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          AI Cover Letter Generator
        </motion.h1>
        
        {/* Updated: Better subtitle */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="text-center text-slate-600 text-xl md:text-2xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Create professional, personalized cover letters in seconds with our AI-powered tool
        </motion.p>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <CoverLetterGenerator />
          </motion.div>
          
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            className="hidden md:flex justify-center"
          >
            <div className="relative">
              {/* Updated: Emerald glow effect */}
              <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
              <Lottie animationData={coverLetter} loop={true} className="max-w-lg w-full relative z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Updated: Emerald divider */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent rounded-full" />

      {/* Section 2 - LinkedIn Summary */}
      <section className="pt-24 pb-16 px-4 md:px-10 bg-white">
        {/* Updated: Emerald gradient heading */}
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center mb-6 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent leading-tight"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          AI LinkedIn Summary Generator
        </motion.h1>
        
        {/* Updated: Better subtitle */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="text-center text-slate-600 text-xl md:text-2xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Craft compelling LinkedIn summaries that showcase your professional brand
        </motion.p>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            className="hidden md:flex justify-center"
          >
            <div className="relative">
              {/* Updated: Emerald glow effect */}
              <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <Lottie animationData={linkedInAi} loop={true} className="max-w-lg w-full relative z-10" />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <LinkedInSummaryGenerator />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Page;