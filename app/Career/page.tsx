"use client";
import React, { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import ExpertsCard from "../Components/ExpertsCard";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import DeveloperSection from "./developers/DevTeam";
interface Expert {
  name: string;
  position: string;
  image: string;
}

const Page = () => {
  const [peoples, setPeople] = useState<Expert[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    fetch("/exparts.json")
      .then((res) => res.json())
      .then((data) => setPeople(data || []));
  }, []);
const developers = [
  {
    name: "Ahmed Rahat",
    role: "Frontend Developer",
    img:"/assets/team/Gemini_Generated_Image_52hm9252hm9252hm.jpg",
    github: "https://github.com/RahatInCode",
    linkedin: "https://www.linkedin.com/in/ahmed-rahat-5a6145387",
  },
  {
    name: "Sarah Khan",
    role: "Backend Developer",
    img: "/team/sarah.jpg",
    github: "https://github.com/sarah",
    linkedin: "https://linkedin.com/in/sarah",
  },
  {
    name: "James Lee",
    role: "Full Stack Engineer",
    img: "/team/james.jpg",
    github: "https://github.com/james",
    linkedin: "https://linkedin.com/in/james",
  },
];
  const tocItems = [
    { id: "About", label: "About" },
    { id: "featured", label: "Featured Advice" },
    { id: "resume-templates", label: "Resume Templates" },
    { id: "interview-advice", label: "Interview Advice" },
    { id: "jobs", label: "Jobs" },
    { id: "careers", label: "Careers" },
    { id: "special-reports", label: "Special Reports" },
    { id: "experts", label: "Meet Our Career Experts" },
  ];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  // ✅ Gradient link component
  const GradientLink = ({ text, href }: { text: string; href: string }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-between items-center p-3 rounded-lg transition duration-300 shadow-md
                   bg-white group hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500"
      >
        <span className="font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent group-hover:text-white">
          {text}
        </span>
        <IoChevronForward className="opacity-70 group-hover:opacity-100 text-gray-500 group-hover:text-white" />
      </a>
    );
  };

  return (
    <div className="py-10 px-3 md:px-5 xl:px-16 text-black">
      {/* ===== Page Title ===== */}
      <div className="mt-8">
        <h1 className="font-bold text-5xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Career Center
        </h1>
      </div>

      {/* ===== TOC for Small Screens (Top Bar) ===== */}
      <div className="lg:hidden sticky top-16 z-20 bg-white shadow-md overflow-x-auto whitespace-nowrap flex gap-4 px-4 py-3 border-b">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleScrollTo(item.id)}
            className={`text-sm font-semibold px-3 py-1 rounded-full transition
              bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent
              ${activeId === item.id ? "underline underline-offset-4" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="mt-8 flex gap-6">
        {/* ===== Left TOC (Sidebar for Large Screens) ===== */}
        <aside className="hidden lg:block w-1/4 sticky top-24 h-fit bg-gray-100 p-5 rounded-lg shadow-md">
          <ul className="space-y-4 text-lg font-semibold">
            <li className="font-bold text-xl mb-3">Table of Contents</li>
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleScrollTo(item.id)}
                  className={`block w-full text-left transition duration-300
                    bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent
                    hover:opacity-80
                    ${activeId === item.id ? "underline underline-offset-4" : ""}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* ===== Content Section ===== */}
        <div className="w-full lg:w-3/4 text-sm lg:text-[19px] p-3 space-y-20 text-gray-600">
          {/* Intro */}
          <p id="About">
            Welcome to the Rezoom-AI Career Center, your one-stop shop for resume and cover letter writing, interview tips, and job search resources. Whether you’re looking for tools like a resume maker or resume editor, or seeking resume help from certified professionals, our Career Center has everything you need to create a standout resume.
            <br />
            Gain access to critical insights from our team of certified resume writers, career coaches, and recruiters to help you navigate all aspects of the job market landscape.
          </p>

          {/* Featured Section */}
          <div id="featured" className="space-y-4">
            <h1 className="text-[#A053CF] text-3xl font-semibold">Featured Advice</h1>
            <p>
              Get the information you need to impress the hiring manager and land your next big job opportunity. Our comprehensive guides cover everything from the basics of resume writing to job search strategies and interview preparation.
            </p>
            <div className="space-y-2 ">
              <GradientLink text="5 Resume Hacks You Must Know" href="https://example.com/resume-hacks" />
              <GradientLink text="How to Write a Cover Letter That Gets Noticed" href="https://example.com/cover-letter" />
            </div>
          </div>

          {/* Resume Templates */}
          <div id="resume-templates" className="space-y-4">
            <h1 className="text-[#A053CF] text-3xl font-semibold">Resume Templates</h1>
            <p>
              Building your resume doesn’t need to be a difficult or time-consuming process. We offer hundreds of free, high-quality resume templates you can use to catch the attention of hiring managers, make a good first impression, and generate more interview callbacks.
            </p>
            <div className="space-y-2">
              <GradientLink text="Modern Resume Template" href="https://example.com/modern-template" />
              <GradientLink text="Creative Resume Template" href="https://example.com/creative-template" />
            </div>
          </div>

          {/* Interview Advice */}
          <div id="interview-advice" className="space-y-4">
            <h1 className="text-[#A053CF] text-3xl font-semibold">Interview Advice</h1>
            <p>
              Prepare for your next interview with these guides featuring insights from industry experts and sample interview questions. Obtain valuable tips on what to ask during the interview and how to follow up after your meeting.
            </p>
            <div className="space-y-2">
              <GradientLink text="Top 10 Interview Questions" href="https://example.com/interview-questions" />
              <GradientLink text="What to Wear for an Interview" href="https://example.com/interview-attire" />
            </div>
          </div>

          {/* Jobs */}
          <div id="jobs" className="space-y-4">
            <h1 className="text-[#A053CF] text-3xl font-semibold">Jobs</h1>
            <p>
              Use these guides to learn more about organizing your job search and optimizing your application during the hiring process. Explore a wide range of expert insights, including job hunting strategies, formatting best practices, and career advice.
            </p>
            <GradientLink text="Explore Latest Jobs" href="https://example.com/jobs" />
          </div>

          {/* Careers */}
          <div id="careers" className="space-y-4">
            <h1 className="text-[#A053CF] text-3xl font-semibold">Careers</h1>
            <p>
              Find targeted advice to build your resume and land a great job, with state-specific career guides, specialized resources for diverse communities, and expert advice on resume writing and interviews to empower your job search and career development.
            </p>
            <GradientLink text="Career Growth Tips" href="https://example.com/career-growth" />
          </div>

          {/* Special Reports */}
          <div id="special-reports" className="space-y-4">
            <h1 className="text-[#A053CF] text-3xl font-semibold">Special Reports</h1>
            <p>
              Even with a well-honed resume and cover letter, there’s a lot of uncertainty when applying for jobs. The below surveys and studies can give you a clearer view of trends in the overall job market, and the hiring conditions you’re likely to find in your target sector.
            </p>
            <GradientLink text="2025 Job Market Report" href="https://example.com/reports" />
          </div>

          {/* Experts */}
          <div id="experts" className="space-y-4">
            <h1 className="text-[#A053CF] text-3xl font-semibold">Meet Our Career Experts</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {peoples.map((people, index) => (
                <ExpertsCard key={index} people={people} />
              ))}
            </div>
          </div>
        </div>

      </section>
<section className="relative py-24 px-6 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
              Our Team
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Meet Our Developers
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The creative minds and technical wizards powering our Career Center platform
          </p>
        </motion.div>

        {/* Developer Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {developers.map((dev, index) => (
            <motion.div
              key={dev.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
              
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10"
              >
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                
                <div className="relative p-8 flex flex-col items-center">
                  {/* Image container with animated border */}
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-6"
                  >
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                    <Image 
                      src={dev.img}
                      alt={dev.name}
                      width={120}
                      height={120}
                      className="relative w-30 h-30 rounded-full border-4 border-slate-900 object-cover"
                    />
                    
                    {/* Status indicator */}
                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 rounded-full border-4 border-slate-900 shadow-lg"></div>
                  </motion.div>

                  {/* Name and role */}
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {dev.name}
                  </h3>
                  <p className="text-purple-300 text-sm font-medium mb-6 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
                    {dev.role}
                  </p>

                  {/* Social links */}
                  <div className="flex gap-4 mt-auto">
                    <motion.a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                    >
                      <FaGithub className="text-xl" />
                    </motion.a>
                    <motion.a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-300 hover:text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm"
                    >
                      <FaLinkedin className="text-xl" />
                    </motion.a>
                  </div>

                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition duration-500"></div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        ></motion.div>
      </div>
    </section>
    <DeveloperSection />
    </div>
  );
};

export default Page;
