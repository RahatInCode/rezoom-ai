"use client";
import React, { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import ExpertsCard from "../Components/expertsCard/page";
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
      <div className="lg:hidden  top-16 z-20 bg-white shadow-md overflow-x-auto whitespace-nowrap flex gap-4 px-4 py-3 border-b">
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
              Even with a well-honed resume and cover letter, theres a lot of uncertainty when applying for jobs. The below surveys and studies can give you a clearer view of trends in the overall job market, and the hiring conditions you’re likely to find in your target sector.
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
    </div>
  );
};

export default Page;
