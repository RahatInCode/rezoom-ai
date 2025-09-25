"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        rotate: 1,
        boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
      }}
      whileTap={{ scale: 0.97 }}
      className="w-full p-4 rounded-xl bg-white shadow-md cursor-pointer"
    >
      {/* Relative container for Next/Image fill */}
      <div className="relative w-full h-50 overflow-hidden rounded-lg">
        <Image
          src={people.image}
          alt={people.name}
          fill
          className="object-cover transform transition-transform duration-500 hover:scale-105"
        />
      </div>

      <h3 className="text-[#FC9667] text-xl font-semibold mt-4">
        {people.name}
      </h3>
      <p className="text-sm text-indigo-600 font-medium mt-1">
        {people.position}
      </p>
    </motion.div>
  );
};

export default ExpartsCard;
