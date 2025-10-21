import { Globe, Mail, Phone } from 'lucide-react';
import React from 'react';

const Corporate = ({ personalInfo, educations, skills, experiences, others }) => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-10 font-sans text-gray-800 leading-relaxed">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-300 pb-6">
        {/* Profile Image */}
        <img
          src={personalInfo.photo || "/profile.jpg"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 mb-4 md:mb-0"
        />

        {/* Name and Role */}
        <div className="flex-1 md:ml-8">
          <h1 className="text-4xl font-bold tracking-wide">
            {personalInfo.name.toUpperCase()} <span className="font-light">{personalInfo.surname.toUpperCase()}</span>
          </h1>
          <p className="text-lg text-gray-600 mt-1">{personalInfo.role}</p>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center text-sm text-gray-700 mt-3 gap-5 border-t border-gray-300 pt-3">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> {personalInfo.phone}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> {personalInfo.email}
            </div>
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" /> {personalInfo.website}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About Me */}
      <section className="mt-8">
        <h2 className="text-lg font-bold uppercase border-b border-gray-400 pb-1 mb-3">About Me</h2>
        <p className="text-sm text-gray-700">{personalInfo.objective}</p>
      </section>

      {/* Education */}
      <section className="mt-8">
        <h2 className="text-lg font-bold uppercase border-b border-gray-400 pb-1 mb-3">Education</h2>
        <div className="space-y-5">
          {educations.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <p className="text-sm font-semibold">{edu.startDate.split("-")[0]} - {edu.endDate.split("-")[0]}</p>
                <p className="text-sm font-semibold">{edu.degree}</p>
              </div>
              <p className="font-medium">{edu.institute}</p>
              {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mt-8">
        <h2 className="text-lg font-bold uppercase border-b border-gray-400 pb-1 mb-3">Experience</h2>
        <div className="space-y-5">
          {experiences.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <p className="text-sm font-semibold">{exp.startDate.split("-")[0]} - {exp.currentlyWorking ? "Present" : exp.endDate.split("-")[0]}</p>
                <p className="text-sm font-semibold">{exp.title}</p>
              </div>
              <p className="font-medium">{exp.employer}</p>
              {exp.description && <p className="text-sm text-gray-700 mt-1">{exp.description}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-8">
        <h2 className="text-lg font-bold uppercase border-b border-gray-400 pb-1 mb-3">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm text-gray-700">
          {skills.technicalSkills.map((skill, i) => <p key={i}>{skill}</p>)}
          {skills.softSkills.map((skill, i) => <p key={i}>{skill}</p>)}
        </div>
      </section>

      {/* References */}
      <section className="mt-8">
        <h2 className="text-lg font-bold uppercase border-b border-gray-400 pb-1 mb-3">References</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          {others.references.map((ref, index) => (
            <p key={index}>{ref}</p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Corporate;
