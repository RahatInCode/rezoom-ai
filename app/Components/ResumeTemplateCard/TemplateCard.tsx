"use client";
import Image from "next/image";
import React from "react";

// ✅ Describe the template object
interface Template {
  image: string; // URL of the template image
  // add other fields if needed, e.g. title?: string;
}

// ✅ Type the props
interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <div className="group w-full h-96 mx-auto [perspective:1000px] cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center rounded-md bg-white border border-gray-200">
          <Image
            alt="Resume image"
            src={template.image}
            width={100}
            height={100}
            className="w-full h-full"
          />
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center bg-white justify-center rounded-md [transform:rotateY(180deg)]">
          <button className="btn text-white btn-primary btn-sm lg:btn">
            Use this template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
