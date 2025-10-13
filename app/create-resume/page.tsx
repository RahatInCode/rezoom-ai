"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MoveRight, Link as LinkIcon, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import htmlDocx from "html-docx-js/dist/html-docx";
import OurFeature from "../Components/WhyChooseUS/OurFeature";
import { AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import ResumeAnimtaion from "../../public/ResumeSteps.json"
import Link from "next/link";


export default function ResumeBuild_Welcome() {
  return (

    <div className="w-full flex flex-col justify-center items-center min-h-[calc(100vh-60px)] ">
      <div className="container max-h-fit min-h-96 w-full lg:w-3/4 flex flex-col md:flex-row p-5 ">

        {/* text div it is */}
        <div className="w-full flex flex-col items-start justify-center">
          <h1 className="text-5xl lg:text-7xl font-bold">Just three<br></br>easy steps</h1>
          <div className="w-fit mt-5 text-xl  flex flex-col space-y-5 ">
            <div className="flex gap-5  items-center ">
              <div className="rounded-full bg-[#EFF2F9] text-sm font-semibold flex justify-center items-center w-8 h-8"><p>1</p></div>
              <p>Select a template from our<br></br>library of professional designs</p>
            </div>
            <div className="flex  gap-5 items-center ">
              <div className="rounded-full bg-[#EFF2F9] text-sm font-semibold flex justify-center items-center w-8 h-8"><p>2</p></div>
              <p>Build your resume with our<br></br>industry-specific bullet points</p>
            </div>
            <div className="flex gap-5  items-center ">
              <div className="rounded-full bg-[#EFF2F9] text-sm font-semibold flex justify-center items-center w-8 h-8"><p>3</p></div>
              <p>Customize the details and<br></br>wrap it up. You’re ready to send!</p>
            </div>
          </div>
          <Link href="/create-resume/experience-level" className="w-full font-extrabold lg:w-3/4 mt-5 btn btn-primary">Next <ArrowRight /></Link>
        </div>


        <div className="w-full">
          <Lottie
            animationData={ResumeAnimtaion}
            autoPlay={true}
            loop={true}
          />
        </div>

      </div>
    </div>
  )
}