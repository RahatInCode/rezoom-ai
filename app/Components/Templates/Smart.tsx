import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Smart = ({ personalInfo, educations, skills, experiences, others , contentRef}) => {
  return (
    <div ref={contentRef} className="w-full max-w-5xl mx-auto bg-white shadow-md font-sans">
      {/* Header Section */}
      <div className="bg-[#f3f6fa] p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Image */}
        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-md">
          <Image
            src={personalInfo.photo || "/profile.jpg"}
            alt="Profile"
            width={150}
            height={150}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Name and Role */}
        <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
          <h1 className="text-3xl font-bold text-[#1a202c]">
            {personalInfo.name} {personalInfo.surname}
          </h1>
          {personalInfo.role && (
            <p className="uppercase text-gray-500 tracking-wider font-medium mt-1">
              — {personalInfo.role}
            </p>
          )}
        </div>
      </div>

      {/* Dark Blue Bar Section */}
      <div className="bg-[#2B3A4A] text-white flex flex-col md:flex-row px-8 py-6 gap-8">
        {/* Contact Info */}
        <div className="flex flex-col gap-3 text-sm md:w-1/3">
          {personalInfo.phone && (
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {(personalInfo.city || personalInfo.country) && (
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.city}, {personalInfo.country}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>

        {/* Objective/Profile */}
        {personalInfo.objective && (
          <div className="md:w-2/3">
            <h3 className="uppercase font-semibold text-white mb-2">Profile</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {personalInfo.objective}
            </p>
          </div>
        )}
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-8">
        {/* Left Column */}
        <div>
          {/* Education */}
          {educations.length > 0 && (
            <div className="mb-8">
              <h3 className="uppercase font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                Education
              </h3>
              <div className="space-y-4 text-sm text-gray-700">
                {educations.map((edu, i) => (
                  <div key={i}>
                    <p className="font-bold text-gray-800">
                      {edu.startDate.split("-")[0]} – {edu.currentlyStudying ? "Present" : edu.endDate.split("-")[0]}
                    </p>
                    <p className="font-semibold text-gray-800">{edu.institute}</p>
                    <p>{edu.degree}</p>
                    {edu.cgpa && <p>GPA: {edu.cgpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {(skills.technicalSkills.length > 0 || skills.softSkills.length > 0) && (
            <div>
              <h3 className="uppercase font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                Skills
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {skills.technicalSkills.map((skill, i) => <li key={`tech-${i}`}>{skill}</li>)}
                {skills.softSkills.map((skill, i) => <li key={`soft-${i}`}>{skill}</li>)}
              </ul>
            </div>
          )}

          {/* Languages */}
          {others.languages.length > 0 && (
            <div className="mt-6">
              <h3 className="uppercase font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                Languages
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {others.languages.map((lang, i) => <li key={i}>{lang}</li>)}
              </ul>
            </div>
          )}

          {/* Achievements */}
          {others.achievements.length > 0 && (
            <div className="mt-6">
              <h3 className="uppercase font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                Achievements
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {others.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Work Experience */}
          {experiences.length > 0 && (
            <div className="mb-8">
              <h3 className="uppercase font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                Work Experience
              </h3>
              <div className="space-y-6 text-sm text-gray-700">
                {experiences.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-gray-800">
                        {exp.employer} {exp.location && `– ${exp.location}`}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {exp.currentlyWorking
                          ? `${exp.startDate.split("-")[0]} – Present`
                          : `${exp.startDate.split("-")[0]} – ${exp.endDate.split("-")[0]}`}
                      </p>
                    </div>
                    <p className="italic mb-2 text-gray-600">{exp.title}</p>
                    {exp.location && (
                      <p>{exp.location}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {others.references.length > 0 && (
            <div>
              <h3 className="uppercase font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
                References
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                {others.references.map((ref, i) => (
                  <div key={i}>
                    <p className="font-semibold text-gray-800">{ref}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Smart;