"use client";
import React, { useEffect, useState } from "react";
import TemplateCard from "../Components/ResumeTemplateCard/TemplateCard";
import Image from "next/image";

type Template = {
  id: number;
  image: string;
  [key: string]: unknown; 
};

const Page = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    fetch("/resume-templates.json") // keep it absolute for Next.js public folder
      .then((res) => res.json())
      .then((data) => setTemplates(data || []));
  }, []); // <-- run once

  return (
    <div className="p-5 w-full">
      <p>
        Home / <span className="text-warning-content">Resume Templates</span>
      </p>

      <div className="w-full py-24">
        <h1 className="text-3xl font-bold lg:text-5xl">Resume Templates</h1>

        <div className="w-full flex mt-5 items-center gap-5">
          <div className="relative max-w-36 h-24"> {/* relative + fixed height */}
            <Image
              src="https://i.ibb.co.com/WWg9tYY/resume-template-page-top-mini-image.png"
              alt="mini_image"
              fill
              className="object-contain"
            />
          </div>

          <div className="w-full flex flex-col items-start justify-center space-y-3">
            <p className="text-sm md:text-md lg:text-[18px]">
              Crafting a standout resume is key to landing your next dream job
              offer. With our customizable resume templates and expert content
              from Certified Professional Resume Writers (CPRW), you can easily
              create a polished resume and download it in your preferred format.
              Whether you’re an experienced professional or just starting your
              career, we have a template that suits your needs and helps you
              catch the attention of employers for better results.
            </p>
            <div className="w-full flex flex-col md:flex-row gap-2 md:gap-8">
              <button className="btn lg:btn-lg btn-primary">
                Build Your Resume Now
              </button>
              <button className="btn lg:btn-lg btn-primary btn-outline">
                Import Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-96 bg-[#F6F8FC] mt-12 p-12">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl text-accent font-extrabold">
          Professional Resume Templates to Edit and Download
        </h1>

        <div className="w-full mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-3">
          {templates.map((resume) => (
            <TemplateCard key={resume.id} template={resume} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
