import Image from 'next/image';
import React from 'react';

const ModernBlock = ({ personalInfo, educations, skills, experiences, others }) => {
  return (
    <div className="max-w-5xl mx-auto bg-white p-8 font-sans text-gray-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b-4 border-[#1E3A8A] pb-6 mb-6">
        {/* Left: Photo */}
        <div className="w-40 h-40 rounded-md overflow-hidden mb-6 md:mb-0">
          <Image
            src={personalInfo.photo || "/profile.jpg"}
            alt="Profile Photo"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right: Name and Contact */}
        <div className="flex-1 md:ml-8 text-center md:text-right">
          <h1 className="text-3xl font-bold text-[#1E3A8A] tracking-wide">
            {personalInfo.name} {personalInfo.surname}
          </h1>
          <ul className="mt-4 space-y-2 text-sm">
            {personalInfo.phone && <li>{personalInfo.phone}</li>}
            {personalInfo.email && <li>{personalInfo.email}</li>}
            {(personalInfo.city || personalInfo.country) && (
              <li>{personalInfo.city}, {personalInfo.country}</li>
            )}
            {personalInfo.website && (
              <li className="flex items-center justify-center md:justify-end gap-2">
                <Image src="/linkedin.png" alt="LinkedIn" width={14} height={14} />
                {personalInfo.website}
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Body Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Profile */}
          {personalInfo.objective && (
            <div>
              <p className="text-sm leading-relaxed">{personalInfo.objective}</p>
            </div>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <div>
              <h2 className="text-[#1E3A8A] font-semibold text-lg mb-2 uppercase">Education</h2>
              <div className="space-y-4 text-sm">
                {educations.map((edu, i) => (
                  <div key={i}>
                    <p className="font-bold">{edu.degree}</p>
                    <p>{edu.institute} – {edu.startDate.split("-")[0]}</p>
                    {edu.cgpa && <p>GPA: {edu.cgpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.technicalSkills.length > 0 && (
            <div>
              <h2 className="text-[#1E3A8A] font-semibold text-lg mb-2 uppercase">Technical Skills</h2>
              <ul className="list-disc list-inside text-sm">
                {skills.technicalSkills.map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
            </div>
          )}

          {skills.softSkills.length > 0 && (
            <div>
              <h2 className="text-[#1E3A8A] font-semibold text-lg mb-2 uppercase">Soft Skills</h2>
              <ul className="list-disc list-inside text-sm">
                {skills.softSkills.map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
            </div>
          )}

          {/* Certifications / Achievements */}
          {others.achievements.length > 0 && (
            <div>
              <h2 className="text-[#1E3A8A] font-semibold text-lg mb-2 uppercase">Certifications / Achievements</h2>
              <ul className="list-disc list-inside text-sm">
                {others.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
              </ul>
            </div>
          )}

          {/* Languages */}
          {others.languages.length > 0 && (
            <div>
              <h2 className="text-[#1E3A8A] font-semibold text-lg mb-2 uppercase">Languages</h2>
              <ul className="list-disc list-inside text-sm">
                {others.languages.map((lang, i) => <li key={i}>{lang}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Work Experience */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-[#1E3A8A] font-semibold text-lg mb-2 uppercase">Work Experience</h2>
              <div className="text-sm space-y-5">
                {experiences.map((exp, i) => (
                  <div key={i}>
                    <p className="font-bold">{exp.employer} {exp.location && `– ${exp.location}`}</p>
                    <p className="italic">{exp.title}</p>
                    <p>{exp.currentlyWorking ? `${exp.startDate.split("-")[0]} – Present` : `${exp.startDate.split("-")[0]} – ${exp.endDate.split("-")[0]}`}</p>
                    {exp.description && (
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {exp.description.map((desc, j) => <li key={j}>{desc}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References / Volunteer */}
          {others.references.length > 0 && (
            <div>
              <h2 className="text-[#1E3A8A] font-semibold text-lg mb-2 uppercase">References / Volunteer Work</h2>
              <ul className="list-disc list-inside text-sm">
                {others.references.map((ref, i) => <li key={i}>{ref}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernBlock;
