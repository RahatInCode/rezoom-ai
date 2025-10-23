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
    <div className="p-5 w-full bg-gradient-to-br from-[#FFF8F8] via-[#FDF3FA] to-[#F6F8FC] min-h-screen">
      {/* ---------- Header Section ---------- */}
      <section className="w-full py-16 md:py-20 text-center md:text-left max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold lg:text-5xl text-gray-800 text-center md:text-left"
        >
          Resume Templates
        </motion.h1>

        <motion.div
          className="w-full flex flex-col md:flex-row mt-10 items-center gap-8 md:gap-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left Image */}
          <motion.div
            className="relative w-40 h-28 md:w-52 md:h-36"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Image
              src="https://i.ibb.co.com/Rk7TVb2f/3d-employee-resume-rating-illustration-png.png"
              alt="Resume Illustration"
              fill
              className="object-contain"
              unoptimized
            />
          </motion.div>

          {/* Right Text + Buttons */}
          <div className="flex-1 space-y-4 text-gray-700">
            <p className="text-base md:text-lg leading-relaxed text-center md:text-left">
              Crafting a standout resume is key to landing your next dream job
              offer. With our customizable templates and expert content from
              Certified Professional Resume Writers (CPRW), you can easily
              create a polished resume. Whether you’re an experienced
              professional or just starting your career, we have a design that
              fits your needs.
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-6 mt-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href={"/create-resume"}
                  className="btn btn-primary flex items-center gap-2 px-6 py-3 text-base"
                >
                  Build Your Resume <PenLine />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <button className="btn btn-outline btn-primary flex items-center gap-2 px-6 py-3 text-base">
                  Import Resume <Upload />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ---------- Templates Grid ---------- */}
      <section className="w-full mt-12 md:mt-16 bg-[#F6F8FC]/60 backdrop-blur-md rounded-2xl p-6 md:p-10 max-w-7xl mx-auto shadow-sm">
        <motion.h1
          className="text-center text-2xl md:text-3xl lg:text-4xl text-accent font-extrabold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Professional Resume Templates to Edit and Download
        </motion.h1>

        {loading ? (
          <div className="w-full min-h-80 flex flex-col items-center justify-center">
            <span className="loading loading-spinner text-2xl text-primary"></span>
          </div>
        ) : (
          <motion.div
            className="w-full mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-6 md:gap-8"
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
      <motion.section
        className="w-full max-w-6xl mx-auto text-center mt-20 bg-gradient-to-r from-pink-100 to-blue-100 p-10 rounded-2xl shadow-inner"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Ready to Create Your Perfect Resume?
        </h2>
        <p className="mt-3 text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Stand out with a professionally designed resume and land your dream
          job faster!
        </p>
        <motion.div
          className="mt-6 flex justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <Link href={"/create-resume"} className="btn btn-primary btn-lg">
            Start Building Now <PenLine className="ml-2" />
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Page;

// ✅ Card Component
const Card: React.FC<TemplateCardProps> = ({ resume }) => {
  return (
    <article className="group relative w-full max-w-sm rounded-xl overflow-hidden shadow-md bg-white">
      {/* Image container: preserve aspect ratio and avoid cropping */}
      <div className="relative w-full aspect-[3/4] bg-gray-100">
        <Image
          src={resume.image}
          alt={resume.name}
          fill
          quality={90}
          className="object-contain object-center"
          priority={false}
        />
      </div>

      {/* Hover overlay (hidden by default). placed absolutely so it floats over the bottom of the image */}
      <div
        className="
          absolute inset-x-0 bottom-0 
          flex justify-center
          "
      >
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
          <div className="w-full bg-gradient-to-t from-black/65 to-transparent px-4 py-4 flex flex-col items-center justify-center">
            <h3 className="text-white text-base md:text-lg font-semibold truncate">
              {resume.name}
            </h3>
            <Link href={`/create-resume/experience-level/template-selection/${resume.id}`} className="btn btn-xs btn-primary text-xs">Use this template</Link>
          </div>
        </div>
      </div>
    </article>
  );
};