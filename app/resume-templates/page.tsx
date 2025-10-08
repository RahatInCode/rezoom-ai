"use client";
import React, { useEffect, useState } from "react";
import TemplateCard from "../Components/ResumeTemplateCard/TemplateCard";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PenLine, Upload } from "lucide-react";

type Template = {
  id: number;
  image: string;
  name: string;
  description: string;
};

const Page = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading , setLoading] = useState(true)
  
  useEffect(() => {
    fetch("/resume-templates.json") // keep it absolute for Next.js public folder
      .then((res) => res.json())
      .then((data) => { 
        if(data){
          setTemplates(data || [])
          setLoading(false)
        }
      }
      );
      
  }, []); // <-- run once

  return (
    <div className="p-5 w-full bg-gradient-to-br from-[#FFF8F8] via-[#FDF3FA] to-[#F6F8FC]">
      {/* ---------- Header Section ---------- */}
      <section className="w-full py-20 text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold lg:text-5xl text-gray-800"
        >
          Resume Templates
        </motion.h1>

        <motion.div
          className="w-full flex flex-col md:flex-row mt-10 items-center gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Image */}
          <motion.div
            className="relative max-w-36 h-24 md:h-28 lg:h-32"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Image
              src="https://i.ibb.co.com/WWg9tYY/resume-template-page-top-mini-image.png"
              alt="mini_image"
              fill
              className="object-contain"
              unoptimized
            />
          </motion.div>

          {/* Text and Buttons */}
          <div className="w-full flex flex-col items-start justify-center space-y-4">
            <p className="text-sm md:text-md lg:text-[18px] leading-relaxed text-gray-700">
              Crafting a standout resume is key to landing your next dream job offer. 
              With our customizable resume templates and expert content from Certified 
              Professional Resume Writers (CPRW), you can easily create a polished 
              resume and download it in your preferred format. Whether you are an 
              experienced professional or just starting your career, we have a template 
              that suits your needs and helps you catch the attention of employers for 
              better results.
            </p>

            <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-6">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href={"/create-resume"} className="btn lg:btn-lg btn-primary flex items-center gap-2">
                  Build Your Resume Now <PenLine />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <button className="btn lg:btn-lg btn-primary btn-outline flex items-center gap-2">
                  Import Resume <Upload />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ---------- Template Section ---------- */}
      <section className="w-full mt-16 bg-[#F6F8FC]/60 backdrop-blur-md rounded-2xl p-10">
        <motion.h1
          className="text-center text-2xl md:text-3xl lg:text-4xl text-accent font-extrabold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Professional Resume Templates to Edit and Download
        </motion.h1>

        {loading ? (
          <div className="w-full min-h-96 flex flex-col items-center justify-center">
            <span className="loading loading-spinner text-2xl text-primary"></span>
          </div>
        ) : (
          <motion.div
            className="w-full mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-8"
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
              >
                {/* TemplateCard */}
                <TemplateCard template={resume} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* ---------- Extra CTA Section ---------- */}
      <motion.section
        className="w-full text-center mt-20 bg-gradient-to-r from-pink-100 to-blue-100 p-10 rounded-2xl shadow-inner"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Ready to Create Your Perfect Resume?
        </h2>
        <p className="mt-3 text-gray-600">
          Stand out with a professionally designed resume and land your dream job faster!
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
