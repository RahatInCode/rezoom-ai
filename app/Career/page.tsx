"use client";
import React, { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import ExpertsCard from "../Components/ExpertsCard";
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

  // Updated: Emerald gradient link component
  const GradientLink = ({ text, href }: { text: string; href: string }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-between items-center px-6 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.02]
                   bg-white border-2 border-emerald-100 group hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-700 hover:border-emerald-600"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <span className="font-semibold text-emerald-700 group-hover:text-white transition-colors duration-300">
          {text}
        </span>
        <IoChevronForward className="text-emerald-600 group-hover:text-white transition-all duration-300 group-hover:translate-x-1" size={20} />
      </a>
    );
  };

  return (
    // Updated: Light background with emerald accents
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-16 px-4 md:px-8 xl:px-20">
      {/* Updated: Page Title with emerald gradient */}
      <div className="mt-8 mb-12">
        <h1 
          className="font-extrabold text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent leading-tight"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Career Center
        </h1>
        <p className="mt-4 text-lg text-slate-600 font-medium max-w-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>
          Your complete resource for career advancement and professional development
        </p>
      </div>

      {/* Updated: TOC for Small Screens with emerald styling */}
      <div className="lg:hidden sticky top-16 z-20 bg-white/95 backdrop-blur-sm shadow-lg overflow-x-auto whitespace-nowrap flex gap-3 px-5 py-4 border-b-2 border-emerald-200 rounded-xl mb-8">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleScrollTo(item.id)}
            className={`text-sm font-bold px-5 py-2 rounded-full transition-all duration-300 ${
              activeId === item.id
                ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg scale-105"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="mt-8 flex gap-8">
        {/* Updated: Left TOC Sidebar with emerald theme */}
        <aside className="hidden lg:block w-1/4 sticky top-24 h-fit bg-white p-8 rounded-2xl shadow-xl border-2 border-emerald-100">
          <ul className="space-y-3 text-base">
            <li className="font-bold text-2xl mb-6 text-slate-900 pb-4 border-b-2 border-emerald-200" style={{ fontFamily: 'Inter, sans-serif' }}>
              Table of Contents
            </li>
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleScrollTo(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-semibold ${
                    activeId === item.id
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg scale-105"
                      : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border border-transparent hover:border-emerald-200"
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Updated: Content Section with better typography and spacing */}
        <div className="w-full lg:w-3/4 space-y-24">
          {/* Updated: Intro section */}
          <div id="About" className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border-l-4 border-emerald-500">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Welcome to the <span className="font-bold text-emerald-700">Rezoom-AI Career Center</span>, your one-stop shop for resume and cover letter writing, interview tips, and job search resources. Whether you are looking for tools like a resume maker or resume editor, or seeking resume help from certified professionals, our Career Center has everything you need to create a standout resume.
              <br /><br />
              Gain access to critical insights from our team of certified resume writers, career coaches, and recruiters to help you navigate all aspects of the job market landscape.
            </p>
          </div>

          {/* Updated: Featured Section */}
          <div id="featured" className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-1.5 bg-gradient-to-b from-emerald-600 to-emerald-700 rounded-full"></div>
              <h2 
                className="text-4xl md:text-5xl font-bold text-slate-900"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Featured Advice
              </h2>
            </div>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Get the information you need to impress the hiring manager and land your next big job opportunity. Our comprehensive guides cover everything from the basics of resume writing to job search strategies and interview preparation.
            </p>
            <div className="space-y-4">
              <GradientLink text="5 Resume Hacks You Must Know" href="https://example.com/resume-hacks" />
              <GradientLink text="How to Write a Cover Letter That Gets Noticed" href="https://example.com/cover-letter" />
            </div>
          </div>

          {/* Updated: Resume Templates */}
          <div id="resume-templates" className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-1.5 bg-gradient-to-b from-emerald-600 to-emerald-700 rounded-full"></div>
              <h2 
                className="text-4xl md:text-5xl font-bold text-slate-900"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Resume Templates
              </h2>
            </div>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Building your resume does not need to be a difficult or time-consuming process. We offer hundreds of free, high-quality resume templates you can use to catch the attention of hiring managers, make a good first impression, and generate more interview callbacks.
            </p>
            <div className="space-y-4">
              <GradientLink text="Modern Resume Template" href="https://example.com/modern-template" />
              <GradientLink text="Creative Resume Template" href="https://example.com/creative-template" />
              <GradientLink text="Professional Resume Template" href="https://example.com/professional-template" />
            </div>
          </div>

          {/* Updated: Interview Advice */}
          <div id="interview-advice" className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-1.5 bg-gradient-to-b from-emerald-600 to-emerald-700 rounded-full"></div>
              <h2 
                className="text-4xl md:text-5xl font-bold text-slate-900"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Interview Advice
              </h2>
            </div>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Prepare for your next interview with these guides featuring insights from industry experts and sample interview questions. Obtain valuable tips on what to ask during the interview and how to follow up after your meeting.
            </p>
            <div className="space-y-4">
              <GradientLink text="Top 10 Interview Questions" href="https://example.com/interview-questions" />
              <GradientLink text="What to Wear for an Interview" href="https://example.com/interview-attire" />
              <GradientLink text="How to Follow Up After an Interview" href="https://example.com/interview-followup" />
            </div>
          </div>

          {/* Updated: Jobs */}
          <div id="jobs" className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-1.5 bg-gradient-to-b from-emerald-600 to-emerald-700 rounded-full"></div>
              <h2 
                className="text-4xl md:text-5xl font-bold text-slate-900"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Jobs
              </h2>
            </div>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Use these guides to learn more about organizing your job search and optimizing your application during the hiring process. Explore a wide range of expert insights, including job hunting strategies, formatting best practices, and career advice.
            </p>
            <div className="space-y-4">
              <GradientLink text="Explore Latest Jobs" href="https://example.com/jobs" />
              <GradientLink text="Job Search Strategies" href="https://example.com/job-strategies" />
            </div>
          </div>

          {/* Updated: Careers */}
          <div id="careers" className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-1.5 bg-gradient-to-b from-emerald-600 to-emerald-700 rounded-full"></div>
              <h2 
                className="text-4xl md:text-5xl font-bold text-slate-900"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Careers
              </h2>
            </div>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Find targeted advice to build your resume and land a great job, with state-specific career guides, specialized resources for diverse communities, and expert advice on resume writing and interviews to empower your job search and career development.
            </p>
            <div className="space-y-4">
              <GradientLink text="Career Growth Tips" href="https://example.com/career-growth" />
              <GradientLink text="Career Development Resources" href="https://example.com/career-dev" />
            </div>
          </div>

          {/* Updated: Special Reports */}
          <div id="special-reports" className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-1.5 bg-gradient-to-b from-emerald-600 to-emerald-700 rounded-full"></div>
              <h2 
                className="text-4xl md:text-5xl font-bold text-slate-900"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Special Reports
              </h2>
            </div>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Even with a well-honed resume and cover letter, there is a lot of uncertainty when applying for jobs. The below surveys and studies can give you a clearer view of trends in the overall job market, and the hiring conditions you are likely to find in your target sector.
            </p>
            <div className="space-y-4">
              <GradientLink text="2025 Job Market Report" href="https://example.com/reports" />
              <GradientLink text="Industry Trends & Analysis" href="https://example.com/trends" />
            </div>
          </div>

          {/* Updated: Experts Section */}
          <div id="experts" className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-1.5 bg-gradient-to-b from-emerald-600 to-emerald-700 rounded-full"></div>
              <h2 
                className="text-4xl md:text-5xl font-bold text-slate-900"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Meet Our Career Experts
              </h2>
            </div>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-10" style={{ fontFamily: 'Inter, sans-serif' }}>
              Connect with our team of certified career professionals who are here to guide you on your journey to success.
            </p>
            {/* Updated: Grid with better spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {peoples.map((people, index) => (
                <ExpertsCard key={index} people={people} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <DeveloperSection />
    </div>
  );
};

export default Page;