"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

// Define the type for a template
type Template = {
  id: number | string;
  image: string;
  name: string;
  description: string;
};

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <div className="group w-full max-w-sm h-96 mx-auto [perspective:1000px] cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Front Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center rounded-2xl bg-pink-100/60 backdrop-blur-md border border-pink-200/40 shadow-md p-4">
          <div className="relative w-full h-60 flex items-center justify-center">
            <Image
              src={template.image}
              alt={template.name}
              width={400}
              height={500}
              quality={100}
              className="object-contain w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
          <h1 className="mt-2 text-lg md:text-xl font-semibold text-gray-800 drop-shadow-sm text-center">
            {template.name}
          </h1>
          <p className="text-gray-700 text-sm md:text-[15px] mt-1 text-center">
            {template.description}
          </p>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center rounded-2xl bg-pink-200/50 backdrop-blur-md border border-pink-300/50 [transform:rotateY(180deg)]">
          <Link
            href={`/create-resume/${template.id}`}
            className="btn btn-primary btn-sm lg:btn"
          >
            Use this template
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;


    // <div className="group w-full h-96 mx-auto [perspective:1000px] cursor-pointer">
    //   <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
    //     {/* Front Side */}
    //     <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center rounded-md bg-white border border-gray-200">
    //       <Image alt="Resume image" src={template.image} fill className="w-full h-full" />
    //     </div>

    //     {/* Back Side */}
    //     <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center bg-white justify-center rounded-md [transform:rotateY(180deg)]">
    //       <Link href={"/create-resume"} className="btn btn-primary btn-sm lg:btn">Use this template</Link>
    //     </div>
    //   </div>
    // </div>