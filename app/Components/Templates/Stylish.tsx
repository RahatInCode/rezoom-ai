import React from 'react';

const Stylish = ({ personalInfo, educations, skills, experiences, others }) => {
  return (
    <div className="max-w-5xl mx-auto bg-white text-gray-800 font-sans">
      {/* Header */}
      <div className="bg-gray-100 p-8 text-start">
        <h1 className="text-4xl font-semibold tracking-wide">
          {personalInfo.name} {personalInfo.surname}
        </h1>
        {personalInfo.role && (
          <p className="text-gray-500 mt-1 text-lg">{personalInfo.role}</p>
        )}
      </div>

      {/* Contact Bar */}
      <div className="flex flex-col md:flex-row items-center justify-start gap-6 md:gap-12 py-4 border-b border-gray-300 text-sm">
        {personalInfo.phone && (
          <div className="flex items-center gap-2">
            <i className="lucide lucide-phone text-gray-500"></i>
            <span>{personalInfo.phone}</span>
          </div>
        )}
        {personalInfo.email && (
          <div className="flex items-center gap-2">
            <i className="lucide lucide-mail text-gray-500"></i>
            <span>{personalInfo.email}</span>
          </div>
        )}
        {(personalInfo.city || personalInfo.country) && (
          <div className="flex items-center gap-2">
            <i className="lucide lucide-map-pin text-gray-500"></i>
            <span>{personalInfo.city}, {personalInfo.country}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-10">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Education */}
          {educations.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 uppercase mb-2">
                Education
              </h2>
              <div className="space-y-3 text-sm">
                {educations.map((edu, i) => (
                  <div key={i}>
                    <p className="font-bold">{edu.degree}</p>
                    <p>{edu.institute}</p>
                    <p className="text-gray-500 text-xs">({edu.startDate.split("-")[0]} – {edu.endDate?.split("-")[0] || "Present"})</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.technicalSkills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 uppercase mb-2">
                Skills
              </h2>
              <h2 className="text font-semibold text-gray-500 uppercase mb-2">
                Technical Skill
              </h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                {skills.technicalSkills.map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
              <h2 className="text font-semibold text-gray-500 uppercase mb-2">
                Soft Skill
              </h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                {skills.softSkills.map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
            </div>
          )}

          {/* Languages */}
          {others.languages.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 uppercase mb-2">
                Languages
              </h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                {others.languages.map((lang, i) => <li key={i}>{lang}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Profile */}
          {personalInfo.objective && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 uppercase mb-2">
                Profile
              </h2>
              <p className="text-sm leading-relaxed text-gray-600">{personalInfo.objective}</p>
            </div>
          )}

          {/* Work Experience */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 uppercase mb-2">
                Work Experience
              </h2>
              <div className="text-sm space-y-5">
                {experiences.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center">
                      <p className="font-bold">{exp.employer} {exp.location && `– ${exp.location}`}</p>
                      <p className="text-gray-500">{exp.currentlyWorking ? `${exp.startDate.split("-")[0]} – Present` : `${exp.startDate.split("-")[0]} – ${exp.endDate.split("-")[0]}`}</p>
                    </div>
                    <p className="italic text-gray-600">{exp.title}</p>
                    {exp.description && (
                      <p className="mt-1 text-gray-600">{exp.description.join(" ")}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}


            {others.achievements.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 uppercase mb-2">
                References
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                {others.achievements.map((ref, i) => (
                  <div key={i}>
                    <p className="font-bold">{ref}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {others.references.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 uppercase mb-2">
                References
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                {others.references.map((ref, i) => (
                  <div key={i}>
                    <p className="font-bold">{ref}</p>
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

export default Stylish;