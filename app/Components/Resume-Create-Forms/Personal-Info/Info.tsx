"use client";
import Image from "next/image";
import React, { useState } from "react";
import NoPerson from "../../../../public/NoPerson.png";

type PersonalInfoData = {
  name: string;
  surname: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  photo?: string;
};

type PersonalInfoProps = {
  personalInfo: PersonalInfoData;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfoData>>;
};


const Info: React.FC<PersonalInfoProps> = ({ personalInfo, setPersonalInfo }) => {
  const [preview, setPreview] = useState<string>(personalInfo.photo || "");

const handleChange = (field: keyof PersonalInfoData, value: string) => {
  setPersonalInfo((prev: PersonalInfoData) => ({
    ...prev,
    [field]: value,
  }));
};

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    setPersonalInfo((prev: PersonalInfoData) => ({
      ...prev,
      photo: imageUrl,
    }));
  }
};

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="space-y-3 text-start">
        <p className="font-bold text-4xl md:text-5xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          What’s the best way for employers to contact you?
        </p>
        <p className="text-lg md:text-xl font-semibold text-gray-700">
          We suggest including an email and phone number.
        </p>
      </div>

      {/* Form */}
      <div className="w-full flex flex-col md:flex-row gap-5 mt-8">
        {/* Photo */}
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
            className="text-sm link font-semibold text-primary mt-3 cursor-pointer"
          >
            Upload Photo
          </label>
        </div>

        {/* Inputs */}
        <div className="flex-1 p-5 space-y-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <label className="text-sm">Name*</label>
              <input
                type="text"
                className="input w-full"
                value={personalInfo.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm">Surname*</label>
              <input
                type="text"
                className="input w-full"
                value={personalInfo.surname}
                onChange={(e) => handleChange("surname", e.target.value)}
                placeholder="Surname"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <label className="text-sm">City*</label>
              <input
                type="text"
                className="input w-full"
                value={personalInfo.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm">Country*</label>
              <input
                type="text"
                className="input w-full"
                value={personalInfo.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Country"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <label className="text-sm">Phone*</label>
              <input
                type="tel"
                className="input w-full"
                value={personalInfo.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Phone"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm">Email*</label>
              <input
                type="email"
                className="input w-full"
                value={personalInfo.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
