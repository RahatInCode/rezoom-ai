"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PenLine, Upload } from "lucide-react";

// ✅ Type Definitions
interface ResumeTemplate {
  id: string;
  image: string;
  name: string;
  description: string;
  isWithPhoto: boolean;
  isTwoColoumn: boolean;
}

interface TemplateCardProps {
  resume: ResumeTemplate;
  setTemplateSelect?: (id: string) => void;
  templateSelect?: string | null;
}

// ✅ Main Page
const Page = () => {
  const [templates, setTemplates] = useState<ResumeTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/resume-templates.json")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setTemplates(data || []);
          setLoading(false);
        }
      });
  }, []);

  return (
    // Updated: Light background with emerald gradient
    <div className="p-6 md:p-10 w-full bg-gradient-to-br from-slate-50 via-emerald-50 to-white min-h-screen">
      {/* ---------- Header Section ---------- */}
      <section className="w-full py-16 md:py-24 text-center md:text-left max-w-7xl mx-auto">
        {/* Updated: Emerald gradient heading with Inter font */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold lg:text-6xl xl:text-7xl bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent text-center md:text-left leading-tight"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Resume Templates
        </motion.h1>

        <motion.div
          className="w-full flex flex-col md:flex-row mt-12 items-center gap-10 md:gap-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left Image with emerald glow */}
          <motion.div
            className="relative w-44 h-32 md:w-60 md:h-44"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {/* Updated: Emerald glow effect */}
            <div className="absolute -inset-4 bg-emerald-400/20 rounded-full blur-2xl animate-pulse"></div>
            <Image
              src="https://i.ibb.co.com/Rk7TVb2f/3d-employee-resume-rating-illustration-png.png"
              alt="Resume Illustration"
              fill
              className="object-contain relative z-10"
              unoptimized
            />
          </motion.div>

          {/* Right Text + Buttons */}
          <div className="flex-1 space-y-6">
            {/* Updated: Better typography with slate colors */}
            <p 
              className="text-lg md:text-xl leading-relaxed text-slate-700 text-center md:text-left font-medium"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Crafting a standout resume is key to landing your next dream job
              offer. With our customizable templates and expert content from
              Certified Professional Resume Writers (CPRW), you can easily
              create a polished resume. Whether you are an experienced
              professional or just starting your career, we have a design that
              fits your needs.
            </p>

            {/* Updated: Emerald buttons with rounded-full */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 sm:gap-6 mt-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={"/create-resume"}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full text-base font-bold shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Build Your Resume <PenLine className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button 
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 rounded-full text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Import Resume <Upload className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ---------- Templates Grid ---------- */}
      {/* Updated: White card with emerald border */}
      <section className="w-full mt-16 md:mt-20 bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-7xl mx-auto shadow-2xl border-2 border-emerald-100">
        {/* Updated: Emerald gradient heading */}
        <motion.h1
          className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent leading-tight"
          style={{ fontFamily: 'Inter, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Professional Resume Templates to Edit and Download
        </motion.h1>

        {/* Updated: Better subtitle */}
        <motion.p
          className="text-center text-slate-600 text-lg md:text-xl mt-6 max-w-3xl mx-auto font-medium"
          style={{ fontFamily: 'Inter, sans-serif' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Choose from our expertly designed templates and start building your professional resume today
        </motion.p>

        {loading ? (
          <div className="w-full min-h-96 flex flex-col items-center justify-center">
            {/* Updated: Emerald loader */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>
            <p className="mt-6 text-slate-600 font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
              Loading templates...
            </p>
          </div>
        ) : (
          <motion.div
            className="w-full mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-8 md:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {templates.map((resume, index) => (
              <motion.div
                key={resume.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="w-full"
              >
                <Card resume={resume} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* ---------- Extra CTA ---------- */}
      {/* Updated: Emerald gradient CTA section */}
      <motion.section
        className="w-full max-w-6xl mx-auto text-center mt-24 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-12 md:p-16 rounded-3xl shadow-2xl border-2 border-emerald-200"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Ready to Create Your Perfect Resume?
        </h2>
        <p 
          className="mt-6 text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Stand out with a professionally designed resume and land your dream
          job faster!
        </p>
        {/* Updated: Emerald CTA button */}
        <motion.div
          className="mt-10 flex justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <Link 
            href={"/create-resume"} 
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full text-xl font-bold shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Start Building Now <PenLine className="w-6 h-6" />
          </Link>
        </motion.div>
      </motion.section>

      {/* Updated: Bottom spacing */}
      <div className="h-16"></div>
    </div>
  );
};

export default Page;

// ✅ Card Component
const Card: React.FC<TemplateCardProps> = ({ resume }) => {
  return (
    // Updated: White card with emerald hover effects
    <article className="group relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white border-2 border-slate-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2">
      {/* Image container: preserve aspect ratio and avoid cropping */}
      <div className="relative w-full aspect-[3/4] bg-slate-50">
        <Image
          src={resume.image}
          alt={resume.name}
          fill
          quality={90}
          className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />
      </div>

      {/* Updated: Emerald gradient overlay on hover */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none flex justify-center">
        {/* gradient background that slides up */}
        <div
          className="
            w-full
            transform translate-y-full
            group-hover:translate-y-0
            opacity-0 group-hover:opacity-100
            transition-all duration-300 ease-out
          "
        >
          {/* Updated: Emerald gradient overlay */}
          <div className="w-full bg-gradient-to-t from-emerald-900/90 via-emerald-800/70 to-transparent px-6 py-6 flex items-end justify-center">
            <h3 
              className="text-white text-lg md:text-xl font-bold truncate"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {resume.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Updated: Emerald accent bar that appears on hover */}
      <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-emerald-500 to-emerald-700 group-hover:h-full transition-all duration-500 ease-out"></div>

      {/* Clickable area */}
      <Link
        href={`/create-resume/experience-level/template-selection/${resume.id}`}
        className="absolute inset-0"
        aria-label={`Select ${resume.name} template`}
      />
    </article>
  );
};