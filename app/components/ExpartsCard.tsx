"use client";
import Image from "next/image";
import React from "react";

// Define the type for a person
type Person = {
  name: string;
  position: string;
  image: string;
};

interface ExpartsCardProps {
  people: Person; // use the type here
}

const ExpartsCard: React.FC<ExpartsCardProps> = ({ people }) => {
  return (
    <div className="w-full p-3 shadow-xl hover:-translate-y-0.5 transition duration-300">
      {/* Relative container for Next/Image fill */}
      <div className="relative w-full h-96">
        <Image
          src={people.image}
          alt="Person_Image"
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-[#FC9667] text-xl font-medium mt-3">{people.name}</h3>
      <p className="text-sm text-indigo-600 font-medium mt-1">{people.position}</p>
    </div>
  );
};

export default ExpartsCard;
