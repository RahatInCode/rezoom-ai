"use client"
import React, { useEffect, useState } from 'react';
import TemplateCard from '../Components/ResumeTemplateCard/TemplateCard';
import Image from 'next/image';

type ResumeTemplate = {
  id: number;
  title: string;
  sector: string;
  image: string;
};

const Page: React.FC = () => {
  const [templates, setTemplates] = useState<ResumeTemplate[]>([]);

  useEffect(() => {
    fetch('./resume-templates.json')
      .then(res => res.json())
      .then((data: ResumeTemplate[]) => setTemplates(data || []));
  }, []);

  return (
    <div className='p-5 w-full'>
      <p>Home / <span className='text-warning-content'>Resume Templates</span></p>

      <div className='w-full py-24'>
        <h1 className='text-3xl font-bold lg:text-5xl '>Resume Templates</h1>

        <div className='w-full flex mt-5'>
          <div className='max-w-32'>
            <Image src="https://i.ibb.co/WWg9tYY3/resume-template-page-top-mini-image.png" alt="" width={100} height={100}/>
          </div>
          <div className='w-full flex flex-col items-start justify-center space-y-3'>
            <p className='text-sm md:text-md lg:text-[18px]'>Crafting a standout resume is key ...</p>
            <div className='w-full flex flex-col md:flex-row gap-2 md:gap-8'>
              <button className='btn lg:btn-lg btn-primary '>Build Your Resume Now</button>
              <button className='btn lg:btn-lg btn-primary btn-outline '>Import Resume</button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full min-h-96 bg-[#F6F8FC] mt-12 p-12'>
        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl text-accent font-extrabold'>Professional Resume Templates to Edit and Download</h1>

        <div className='w-full mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-3'>
          {templates.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
