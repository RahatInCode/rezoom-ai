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
    <div className="bg-gray-50">
      {/* Section 1 - Cover Letter */}
      <section className="pt-16 px-4 md:px-10">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="text-3xl md:text-5xl font-bold text-center mb-12
          bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
        >
          AI Cover Letter Generator
        </motion.h1>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
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
            <Lottie animationData={coverLetter} loop={true} className="max-w-md w-full" />
          </motion.div>
        </div>
      </section>

     
      <div className="w-full h-px bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300" />

      {/* Section 2 - LinkedIn Summary */}
      <section className="pt-16 px-4 md:px-10 bg-white">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="text-3xl md:text-5xl font-bold text-center mb-12
          bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 bg-clip-text text-transparent"
        >
          AI LinkedIn Summary Generator
        </motion.h1>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            className="hidden md:flex justify-center"
          >
            <Lottie animationData={linkedInAi} loop={true} className="max-w-md w-full" />
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
