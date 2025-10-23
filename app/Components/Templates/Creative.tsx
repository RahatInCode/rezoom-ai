import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';

const Creative = ({ personalInfo, educations, skills, experiences, others }) => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-10 font-sans text-gray-800 leading-relaxed">
      {/* Header */}
      <div className="border-b border-gray-300 pb-4">
        <h1 className="text-4xl font-extrabold text-black tracking-wide">
          {personalInfo.name.toUpperCase()} <span className="font-light">{personalInfo.surname.toUpperCase()}</span>
        </h1>
        <p className="text-gray-600 text-lg mt-1">{personalInfo.role}</p>
      </div>

      {/* Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Contact */}
          <div>
            <h2 className="font-bold text-lg uppercase mb-2">Contact</h2>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-700" /> {personalInfo.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-700" /> {personalInfo.email}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-700" /> {personalInfo.city}, {personalInfo.country}
              </li>
              {personalInfo.website && (
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-700" /> {personalInfo.website}
                </li>
              )}
            </ul>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-bold text-lg uppercase mb-2">Education</h2>
            {educations.map((edu, index) => (
              <div key={index} className="mb-3">
                <p className="text-sm text-gray-700 font-medium">
                  {edu.startDate.split("-")[0]} - {edu.endDate.split("-")[0]}
                </p>
                <p className="font-semibold">{edu.institute}</p>
                <p className="text-sm text-gray-700">{edu.degree}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h2 className="font-bold text-lg uppercase mb-2">Skills</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {skills.technicalSkills.map((skill, i) => <li key={i}>{skill}</li>)}
              {skills.softSkills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h2 className="font-bold text-lg uppercase mb-2">Languages</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {others.languages.map((lang, i) => <li key={i}>{lang}</li>)}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Profile */}
          <div>
            <h2 className="font-bold text-lg uppercase border-b border-gray-400 pb-1 mb-3">Profile</h2>
            <p className="text-sm text-gray-700">{personalInfo.objective}</p>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="font-bold text-lg uppercase border-b border-gray-400 pb-1 mb-3">Work Experience</h2>
            <div className="relative border-l-2 border-gray-400 pl-4 space-y-6">
              {experiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">{exp.employer}</p>
                    <span className="text-sm text-gray-700">
                      {exp.startDate.split("-")[0]} - {exp.currentlyWorking ? "Present" : exp.endDate.split("-")[0]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 font-semibold">{exp.title}</p>
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-1">
                      {exp.responsibilities.map((res, i) => <li key={i}>{res}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reference */}
          <div>
            <h2 className="font-bold text-lg uppercase border-b border-gray-400 pb-1 mb-3">Reference</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              {others.references.map((ref, index) => (
                <div key={index}>
                  <p className="font-bold">{ref}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creative;