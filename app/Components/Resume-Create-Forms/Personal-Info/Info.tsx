"use client";
import Image from "next/image";
import React, { useState } from "react";
import NoPerson from "../../../../public/NoPerson.png";

const Info = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="space-y-3 text-start">
        <p className="sm:w-full font-bold text-4xl md:text-5xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent md:w-3/4">
          Whats the best way for employers to contact you?
        </p>
        <p className="text-lg md:text-xl font-semibold text-gray-700">
          We suggest including an email and phone number.
        </p>
      </div>

      {/* Form Area */}
      <div className="w-full flex flex-col md:flex-row gap-5 mt-8">
        {/* Photo Upload */}
        <div className="flex flex-col items-center md:items-start p-5 text-center md:w-1/4">
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border border-gray-300">
            <Image
              src={preview ? preview : NoPerson}
              alt="User Photo"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            id="photoUpload"
            className="hidden"
            onChange={handleImageChange}
          />
          <label
            htmlFor="photoUpload"
            className="text-sm font-semibold text-primary text-center link mt-3 cursor-pointer"
          >
            Upload Photo
          </label>
        </div>

        {/* Input Fields */}
        <div className="flex-1 p-5 space-y-5">
          {/* Name & Surname */}
          <div className="flex flex-col md:flex-row md:gap-5 space-y-5 md:space-y-0">
            <div className="flex-1">
              <label className="text-sm">Name*</label>
              <input type="text" className="input w-full" placeholder="Name" />
            </div>
            <div className="flex-1">
              <label className="text-sm">Surname*</label>
              <input type="text" className="input w-full" placeholder="Surname" />
            </div>
          </div>

          {/* City & Country */}
          <div className="flex flex-col md:flex-row md:gap-5 space-y-5 md:space-y-0">
            <div className="flex-1">
              <label className="text-sm">City*</label>
              <input type="text" className="input w-full" placeholder="City" />
            </div>
            <div className="flex-1">
              <label className="text-sm">Country*</label>
              <input type="text" className="input w-full" placeholder="Country" />
            </div>
          </div>

          {/* Phone & Email */}
          <div className="flex flex-col md:flex-row md:gap-5 space-y-5 md:space-y-0">
            <div className="flex-1">
              <label className="text-sm">Phone*</label>
              <input type="tel" className="input w-full" placeholder="Number" />
            </div>
            <div className="flex-1">
              <label className="text-sm">Email*</label>
              <input type="email" className="input w-full" placeholder="Email Address" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
