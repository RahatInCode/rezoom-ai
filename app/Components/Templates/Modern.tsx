import React from 'react';

const Modern = ({ personalInfo, educations, skills, experiences, others , contentRef}) => {
  return (
    <div ref={contentRef} className="max-w-3xl mx-auto bg-white text-gray-800 p-6 sm:p-10 font-sans leading-relaxed">
      {/* Header */}
      <div className="border-b pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between text-center sm:text-left">
        <div>
          {personalInfo.name ? (
            <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-600 tracking-wide">
              {personalInfo.name} {personalInfo.surname}
            </h1>
          ) : (
            <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-600 tracking-wide">
              Your Name
            </h1>
          )}
          <p className="text-gray-700 text-base sm:text-lg tracking-wider">
            {personalInfo.role || 'Your Designation'}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-2 sm:gap-6 text-sm text-gray-600 mt-3 border-b pb-4 text-center sm:text-left">
        <span>{personalInfo.email || 'your@mail.com'}</span>
        <span>|</span>
        <span>{personalInfo.phone || 'Contact Number'}</span>
        <span>|</span>
        <span>
          {personalInfo.city || 'Your Address'}, {personalInfo.country}
        </span>
      </div>

      {/* Profile Summary */}
      <div className="mt-8">
        <h2 className="text-teal-600 font-semibold text-base sm:text-lg tracking-wider border-b border-teal-600 inline-block pb-1 mb-3">
          Profile Summary
        </h2>
        <p className="text-sm sm:text-base text-gray-700">
          {personalInfo.objective || 'Write down your summery here'}
        </p>
      </div>

      {/* Skills */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-teal-600 font-semibold text-base sm:text-lg tracking-wider border-b border-teal-600 inline-block pb-1 mb-3">
            Professional Skill
          </h3>
          <ul className="list-disc ml-5 text-sm sm:text-base text-gray-700 space-y-1">
            {skills.technicalSkills.map((tech, idx) => (
              <li key={idx}>{tech}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-teal-600 font-semibold text-base sm:text-lg tracking-wider border-b border-teal-600 inline-block pb-1 mb-3">
            Relevant Skill
          </h3>
          <ul className="list-disc ml-5 text-sm sm:text-base text-gray-700 space-y-1">
            {skills.softSkills.map((soft, idx) => (
              <li key={idx}>{soft}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Education */}
      <div className="mt-8">
        <h2 className="text-teal-600 font-semibold text-base sm:text-lg tracking-wider border-b border-teal-600 inline-block pb-1 mb-3">
          Education
        </h2>
        {educations.map((edu, idx) => (
          <div key={idx}>
            <p className="font-semibold text-gray-800 text-sm sm:text-base">
              {edu.institute}{' '}
              <span className="text-gray-500 float-right italic">
                {edu.startDate ? edu.startDate.split('-')[0] : ''} -{' '}
                {edu.currentlyStudying
                  ? 'Running'
                  : edu.endDate
                  ? edu.endDate.split('-')[0]
                  : ''}
              </span>
            </p>
            <p className="text-sm sm:text-base text-gray-700">{edu.degree}</p>
            <p className="text-sm sm:text-base text-gray-700">
              {edu.degree} | CGPA: {edu.cgpa ? edu.cgpa : 'N/A'}
            </p>
          </div>
        ))}
      </div>

      {/* Work Experience */}
      <div className="mt-8">
        <h2 className="text-teal-600 font-semibold text-base sm:text-lg tracking-wider border-b border-teal-600 inline-block pb-1 mb-3">
          Work Experience
        </h2>

        {experiences.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-bold text-sm sm:text-base text-gray-800">
              {exp.title}{' '}
              <span className="text-gray-500 float-right italic">
                {exp.startDate ? exp.startDate.split('-')[0] : ''} -{' '}
                {exp.currentlyWorking
                  ? 'Working'
                  : exp.endDate
                  ? exp.endDate.split('-')[0]
                  : ''}
              </span>
            </p>
            <ul className="list-disc ml-5 text-sm sm:text-base text-gray-700 space-y-1">
              <li>{exp.employer}</li>
              <li>Location: {exp.remote ? 'Remote' : exp.location}</li>
            </ul>
          </div>
        ))}
      </div>

      {/* Interests */}
      <div className="mt-8">
        <h2 className="text-teal-600 font-semibold text-base sm:text-lg tracking-wider border-b border-teal-600 inline-block pb-1 mb-3">
          Others
        </h2>
        <ul className="list-disc ml-5 text-sm sm:text-base text-gray-700 space-y-1">
          {others.languages.map((lang, idx) => (
            <li key={idx}>{lang}</li>
          ))}
          {others.achievements.map((achiv, idx) => (
            <li key={idx}>{achiv}</li>
          ))}
          {others.references.map((refer, idx) => (
            <li key={idx}>{refer}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modern;