"use client";
import React, { useEffect, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import ExpartsCard from "../Components/ExpartsCard";
import Image from "next/image";

// Type for each expert
interface Expert {
  name: string;
  position: string;
  image: string;
}

const Page = () => {
  const [peoples, setPeople] = useState<Expert[]>([]);
  const [openToc, setOpenToc] = useState(false);

  useEffect(() => {
    fetch("/exparts.json")
      .then((res) => res.json())
      .then((data) => setPeople(data || []));
  }, []);

  const tocItems = [
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
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpenToc(false);
  };

  return (
    <div className="p-2 px-3 md:px-5 xl:px-16">
      {/* Breadcrumb */}
      <div className="flex gap-2 text-xs">
        <p>Home</p>/<p>Resources</p>/
        <p className="text-blue-400">Career Center</p>
      </div>

      <section className="mt-20">
        {/* ===== Heading ===== */}
        <div className="space-y-4">
          <h1 className="text-4xl xl:text-5xl mb-12 font-semibold text-base-content">
            Career Center
          </h1>
          <p className="text-xs text-base-content">
            Last Update: <span className="font-bold">January 25 2025</span>
          </p>
          <div className="flex gap-2 items-center">
            <div className="avatar">
              <div className="relative w-14 h-14 rounded-full">
                <Image
                  alt="person"
                  src="https://i.ibb.co/HDPL9jq/vutka-beda.jpg"
                  fill
                  className="rounded-full object-cover"
                  unoptimized
                />
              </div>
            </div>
            <p className="text-sm font-normal text-black">
              By{" "}
              <span className="text-yellow-400 font-semibold">Frank Hackett</span>, Certified
              Professional Resume Writer (CPRW)
            </p>
          </div>
        </div>

        {/* ===== Main layout ===== */}
        <div className="w-full pt-24 gap-4 flex">
          {/* Left TOC for large screens */}
          <aside className="w-1/4 hidden lg:block p-5 border-t border-b border-black">
            <ul className="space-y-3 text-sm font-normal">
              <li className="font-semibold">Table of Contents</li>
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollTo(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* ===== Scrollable Content ===== */}
          <div className="w-full lg:w-3/4 text-sm lg:text-[19px] p-5 overflow-auto scroll-smooth">
            {/* Intro */}
            <p className="mb-12">
              Welcome to the Resume Builder Career Center, your one-stop shop for
              resume and cover letter writing, interview tips, and job search
              resources...
            </p>

            {/* ===== Example Section ===== */}
            <div id="featured" className="w-full space-y-10">
              <h1 className="text-[#A053CF] text-5xl font-semibold">Featured Advice</h1>
              <p>
                Get the information you need to impress the hiring manager and
                land your next big job opportunity...
              </p>
              {/* … keep your other sections exactly as you had them … */}
            </div>

            {/* Experts Section */}
            <div id="experts" className="w-full mt-36">
              <h1 className="text-[#A053CF] text-4xl lg:text-5xl font-semibold">
                Meet Our Career Experts
              </h1>

              <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {peoples.map((people, index) => (
                  <ExpartsCard key={index} people={people} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bottom TOC for small screens ===== */}
      <div className="fixed bottom-5 p-5 rounded-2xl bg-base-100 left-0 right-0 z-50 lg:hidden">
        <div className="rounded-xl p-3 shadow-xl">
          <button
            onClick={() => setOpenToc(!openToc)}
            className="w-full flex justify-between items-center p-3 text-sm font-semibold"
          >
            Table of Contents
            {openToc ? <IoChevronDown /> : <IoChevronUp />}
          </button>
          {openToc && (
            <ul className="max-h-64 overflow-y-auto text-sm">
              {tocItems.map((item) => (
                <li key={item.id} className="px-4 py-2">
                  <button
                    className="w-full text-left"
                    onClick={() => handleScrollTo(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
