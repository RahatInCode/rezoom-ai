"use client"
import React, { useEffect, useState } from 'react';
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import ExpartsCard from '../Components/ExpartsCard';
import Image from 'next/image';

const page = () => {
    const [peoples, setPeople] = useState([])
     const [openToc, setOpenToc] = useState(false);

    useEffect(() => {
        fetch('/exparts.json').then(res => res.json()).then(data => setPeople(data))
    }, [])

      const tocItems = [
    { id: "featured", label: "Featured Advice" },
    { id: "resume-templates", label: "Resume Templates" },
    { id: "interview-advice", label: "Interview Advice" },
    { id: "jobs", label: "Jobs" },
    { id: "careers", label: "Careers" },
    { id: "special-reports", label: "Special Reports" },
    { id: "experts", label: "Meet Our Career Experts" },
  ];

const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpenToc(false);
  };

    return (
        <div  className='p-2 px-3 md:px-5  xl:px-16 '>
            {/* Page path address */}
            <div className='flex gap-2  text-xs'>
                <p>Home</p>
                /
                <p>Resources</p>
                /
                <p className='text-blue-400'>Career Center</p>
            </div>

            {/* Main Section */}

            <section className='mt-20'>

                {/* Heading part */}
                <div className='space-y-4'>
                    <h1 className='text-4xl xl:text-5xl mb-12 font-semibold text-base-content'>Career Center</h1>
                    <p className='text-xs text-base-content'>Last Update: <span className='font-bold '>January 25 2025</span></p>
                    <div className='flex gap-2 items-center '>
                        <div className="avatar">
                            <div className="w-14 rounded-full">
                                <Image alt='person' src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" className='rounded-full' />
                            </div>
                        </div>
                        <p className='text-sm font-normal  text-black'>By <span className='text-yellow-400 font-semibold'>Frank Hackett</span>, Certified Professional Resume Writer (CPRW)</p>
                    </div>
                </div>



                <div className='w-full pt-24  gap-4 flex '>
                    <div className=' w-1/4 min-h-fit hidden lg:block max-h-fit p-5 border-t-1 border-b-1 border-black  '>
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
                    </div>

                    <div className='w-full lg:w-3/4  text-sm lg:text-[19px] max-h-screen p-5 overflow-auto scroll-smooth'>
                        <p className='mb-12'>Welcome to the Resume Builder Career Center, your one-stop shop for resume and cover letter writing, interview tips, and job search resources. Whether you’re looking for tools like a resume maker or resume editor, or seeking resume help from certified professionals, our Career Center has everything you need to create a standout resume.</p>
                        <p className='mb-12'>Gain access to critical insights from our team of certified resume writers, career coaches, and recruiters to help you navigate all aspects of the job market landscape.</p>

                        {/* Featured Advice Box */}
                        <div id='featured' className='w-full space-y-10'>
                            <h1 className='text-[#A053CF] text-5xl font-semibold '>Featured Advice</h1>
                            <p>Get the information you need to impress the hiring manager and land your next big job opportunity. Our comprehensive guides cover everything from the basics of resume writing to job search strategies and interview preparation.</p>
                            <div className='w-full p-5  rounded-3xl shadow-xl shadow-base-300'>
                                <ul className='w-full text-[17px] px-3'>
                                    <li className='flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between '> How To Make a Resume With Example and Guide <span className='flex items-center'>Learn More <IoIosArrowRoundForward /> </span> </li>
                                    <li className='flex w-full flex-col md:flex-row hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white p-5 items-start justify-between '> Best Tresume Formats: Tips and Exmaples of 3 Common Resumes <span className='flex items-center'>Learn More <IoIosArrowRoundForward /> </span> </li>
                                    <li className='flex w-full flex-col md:flex-row hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white p-5 items-start justify-between '> How To Write a Professional Resume Summary With Examples <span className='flex items-center'>Learn More <IoIosArrowRoundForward /> </span> </li>
                                    <li className='flex w-full flex-col md:flex-row hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white p-5 items-start justify-between '>How To Choose Best Fonts For Your Resume <span className='flex items-center'>Learn More <IoIosArrowRoundForward /> </span></li>
                                    <li className='flex w-full flex-col md:flex-row hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white p-5 items-start justify-between '> How To References on a Resume With Examples <span className='flex items-center'>Learn More <IoIosArrowRoundForward /> </span> </li>
                                </ul>
                            </div>
                        </div>

                        <div id='resume-templates' className='w-full mt-36 space-y-10'>
                            <h1 className='text-[#A053CF] text-4xl lg:text-5xl font-semibold '>Resume Templates</h1>
                            <p>Building your resume doesn’t need to be a difficult or time-consuming process. We offer hundreds of free, high-quality resume templates you can use to catch the attention of hiring managers, make a good first impression, and generate more interview callbacks.</p>
                            <div className='w-full p-5  rounded-3xl shadow-xl '>
                                <ul className="w-full text-[17px] px-3">
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> Classic Resume Template <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> Modern Resume Template <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> Creative Resume Template <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                </ul>
                            </div>
                        </div>

                        <div id='interview-advice' className='w-full mt-36 space-y-10'>
                            <h1 className='text-[#A053CF] text-4xl lg:text-5xl font-semibold '>Interview Advice</h1>
                            <p>Prepare with confidence and make a lasting impression. Learn how to answer tough questions, present yourself professionally, and follow up effectively after interviews.</p>
                            <div className='w-full p-5  rounded-3xl shadow-xl '>
                                <ul className="w-full text-[17px] px-3">
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> Top 10 Common Interview Questions <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> Mastering Behavioral Interviews <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> How to Follow Up After an Interview <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                </ul>
                            </div>
                        </div>

                        <div id='jobs' className='w-full mt-36 space-y-10'>
                            <h1 className='text-[#A053CF] text-4xl lg:text-5xl font-semibold '>Jobs</h1>
                            <p>Explore strategies for finding job openings, networking effectively, and leveraging online tools to land your ideal position faster.</p>
                            <div className='w-full p-5  rounded-3xl shadow-xl '>
                                <ul className="w-full text-[17px] px-3">
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> Best Job Search Websites in 2025 <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> How to Network Like a Pro <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> Using Social Media to Find Jobs <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                </ul>
                            </div>
                        </div>

                        <div id='careers' className='w-full mt-36 space-y-10'>
                            <h1 className='text-[#A053CF] text-4xl lg:text-5xl font-semibold '>Careers</h1>
                            <p>Plan a career path that matches your skills and passions. Learn how to switch industries, advance in your current role, and stay competitive in a changing job market.</p>
                            <div className='w-full p-5  rounded-3xl shadow-xl '>
                                <ul className="w-full text-[17px] px-3">
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> Mapping Your Long-Term Career Goals <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> Tips for Changing Careers Successfully <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> Building Skills for Future Jobs <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                </ul>
                            </div>
                        </div>

                        <div id='special-reports' className='w-full mt-36 space-y-10'>
                            <h1 className='text-[#A053CF] text-4xl lg:text-5xl font-semibold '>Special Reports</h1>
                            <p>Access in-depth analyses of employment trends, industry insights, and salary data to stay ahead in the competitive job market.</p>
                            <div className='w-full p-5  rounded-3xl shadow-xl '>
                                <ul className="w-full text-[17px] px-3">
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> 2025 Tech Industry Hiring Trends <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> Salary Insights by Profession <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                    <li className="flex w-full flex-col md:flex-row p-5 hover:bg-linear-65 from-purple-500 to-pink-500 rounded-xl hover:text-white items-start justify-between"> Remote Work: The Future of Employment <span className="flex items-center">Learn More <IoIosArrowRoundForward /></span> </li>
                                </ul>
                            </div>
                        </div>

                        <div id='experts' className='w-full mt-36'>
                            <h1 className='text-[#A053CF] text-4xl lg:text-5xl font-semibold '>Meet Our Career Exparts</h1>
                        
                            <div className='w-full  mt-8 grid grid-cols-1 md:grid-cols-2 justify-items-center lg:grid-cols-3 gap-4'>
                                { peoples.map(( people , index) => <ExpartsCard key={index} people={people} ></ExpartsCard> ) }
                            </div>
                        
                        </div>

                    </div>
                </div>



            </section>

            {/* ===== Bottom Expandable TOC for small/medium screens ===== */}
      <div className="fixed bottom-5  p-10 rounded-2xl bg-base-100 left-0 right-0 z-50 lg:hidden">
        <div className=" rounded-xl p-3  shadow-xl">
          <button
            onClick={() => setOpenToc(!openToc)}
            className="w-full flex justify-between items-center p-3 text-sm font-semibold"
          >
            Table of Contents
            {openToc ? <IoChevronDown /> : <IoChevronUp />}
          </button>

          {/* Expandable list */}
          {openToc && (
            <ul className="max-h-64  overflow-y-auto  text-sm">
              {tocItems.map((item) => (
                <li
                  key={item.id}
                  className="px-4  py-2 "
                >
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

export default page;