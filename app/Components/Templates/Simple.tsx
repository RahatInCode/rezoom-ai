import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Simple = ({ personalInfo, educations, skills, experiences, others, contentRef }) => {
  return (
    <div ref={contentRef} className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden font-sans">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <div className="bg-[#2c3a50] text-white md:w-1/3 w-full p-8 flex flex-col items-center md:items-start">
          {/* Profile Image */}
          <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-white">
            <Image
              src={personalInfo.photo || "/profile.jpg"}
              alt="Profile"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-3 text-sm">
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
            {personalInfo.city && personalInfo.country && (
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

          {/* Profile */}
          {personalInfo.objective && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold border-b border-gray-500 pb-1 mb-3">
                PROFILE
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">{personalInfo.objective}</p>
            </div>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold border-b border-gray-500 pb-1 mb-3">
                EDUCATION
              </h3>
              <div className="space-y-4 text-sm">
                {educations.map((edu, i) => (
                  <div key={i}>
                    <p className="font-bold">{edu.startDate.split("-")[0]} - {edu.endDate.split("-")[0]}</p>
                    <p className="font-semibold">{edu.institute}</p>
                    <ul className="list-disc list-inside text-gray-300">
                      <li>{edu.degree}</li>
                      {edu.cgpa && <li>GPA: {edu.cgpa}</li>}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold border-b border-gray-500 pb-1 mb-3">
                SKILLS
              </h3>
              <ul className="space-y-1 text-sm text-gray-300">
                {skills.technicalSkills.map((skill, i) => <li key={i}>{skill}</li>)}
                {skills.softSkills.map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
            </div>
          )}

          {/* Languages */}
          {others.languages.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold border-b border-gray-500 pb-1 mb-3">
                LANGUAGES
              </h3>
              <ul className="space-y-1 text-sm text-gray-300">
                {others.languages.map((lang, i) => <li key={i}>{lang}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="md:w-2/3 w-full p-8">
          {/* Name and Title */}
          <div className="border-b border-gray-300 pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{personalInfo.name} {personalInfo.surname}</h1>
            <p className="text-lg text-gray-500 tracking-wide">{personalInfo.role}</p>
          </div>

          {/* Work Experience */}
          {experiences.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-4">
                WORK EXPERIENCE
              </h3>
              <div className="space-y-6 text-sm">
                {experiences.map((exp, i) => (
                  <div key={i}>
                    <p className="font-bold">{exp.employer}</p>
                    <p className="italic text-gray-600 mb-1">
                      {exp.title} <span className="float-right">{exp.currentlyWorking ? "Present" : exp.startDate.split("-")[0] + " - " + exp.endDate.split("-")[0]}</span>
                    </p>
                    {exp.description && (
                      <ul className="list-disc list-inside text-gray-600">
                        {exp.description.map((desc, j) => <li key={j}>{desc}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {others.references.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-4">
                REFERENCES
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                {others.references.map((ref, i) => (
                  <p key={i}>{ref}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simple;