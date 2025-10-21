"use client"
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Elegant = ({ personalInfo, educations, skills, experiences, others }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-gray-300 pb-6">
        {personalInfo.photo && (
          <div className="flex-shrink-0">
            <Image
              src={personalInfo.photo}
              alt="Profile"
              quality={100}
              width={100}
              height={100}
              className="w-40 h-40 object-cover rounded-full border-[5px] border-blue-600"
            />
          </div>
        )}

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-blue-700 uppercase tracking-wide">
            {personalInfo.name || "Your Name"}{" "}
            {personalInfo.surname && personalInfo.surname}
          </h1>
          <p className="text-gray-600 text-lg mt-1">
            {personalInfo.role || "Your Designation"}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-3 text-gray-700">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {(personalInfo.city || personalInfo.country) && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>
                  {personalInfo.city}, {personalInfo.country}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="mt-6">
        <h2 className="text-blue-700 font-bold uppercase text-sm tracking-wider border-b-2 border-blue-700 inline-block pb-1">
          Profile Summary
        </h2>
        <p className="text-gray-700 mt-3 leading-relaxed">
          {personalInfo.objective || "Write your summary here..."}
        </p>
      </div>

      {/* Education */}
      <div className="mt-6">
        <h2 className="text-blue-700 font-bold uppercase text-sm tracking-wider border-b-2 border-blue-700 inline-block pb-1">
          Education
        </h2>

        <div className="mt-4 space-y-4">
          {educations.map((edu, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-gray-800 font-semibold">
                <p>{edu.institute}</p>
                <span className="text-blue-700">
                  {edu.startDate
                    ? edu.startDate.split("-")[0]
                    : "----"}{" "}
                  -{" "}
                  {edu.currentlyStudying
                    ? "Running"
                    : edu.endDate
                    ? edu.endDate.split("-")[0]
                    : "----"}
                </span>
              </div>
              <p className="text-gray-700 mt-1 text-sm">
                • {edu.degree}{" "}
                {edu.cgpa && (
                  <span className="ml-2">| CGPA: {edu.cgpa}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <div className="mt-6">
        <h2 className="text-blue-700 font-bold uppercase text-sm tracking-wider border-b-2 border-blue-700 inline-block pb-1">
          Work Experience
        </h2>

        <div className="mt-4 space-y-4">
          {experiences.map((exp, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-gray-800 font-semibold">
                <p>
                  {exp.title}{" "}
                  <span className="font-medium">| {exp.employer}</span>
                </p>
                <span className="text-blue-700">
                  {exp.startDate
                    ? exp.startDate.split("-")[0]
                    : "----"}{" "}
                  -{" "}
                  {exp.currentlyWorking
                    ? "Working"
                    : exp.endDate
                    ? exp.endDate.split("-")[0]
                    : "----"}
                </span>
              </div>
              <p className="text-gray-700 text-sm mt-1">
                {exp.remote ? "Remote" : exp.location}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills and Languages */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-blue-700 font-bold uppercase text-sm tracking-wider border-b-2 border-blue-700 inline-block pb-1">
            Professional Skills
          </h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 mt-3 text-gray-700 text-sm">
            {skills.technicalSkills.map((skill, idx) => (
              <li key={idx}>• {skill}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-blue-700 font-bold uppercase text-sm tracking-wider border-b-2 border-blue-700 inline-block pb-1">
            Languages
          </h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 mt-3 text-gray-700 text-sm">
            {others.languages.map((lang, idx) => (
              <li key={idx}>• {lang}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Elegant;
