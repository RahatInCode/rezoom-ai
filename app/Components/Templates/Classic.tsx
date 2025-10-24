import React from 'react';
import { PhoneCall } from 'lucide-react';

const Classic = ({ personalInfo, educations, skills, experiences, others , contentRef}) => {
  return (
    <div ref={contentRef} className="max-w-3xl mx-auto bg-white text-gray-800 p-6 sm:p-10 font-sans leading-relaxed shadow-sm">
      {/* Header */}
      <div className="text-center border-b pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide break-words">
          {personalInfo?.name} {personalInfo?.surname}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mt-1">
          {personalInfo?.role}
        </p>

        <div className="flex w-full flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-sm text-gray-600 mt-4 flex-wrap">
          {personalInfo?.phone && (
            <div className="flex items-center gap-2">
              <PhoneCall size={16} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.email && (
            <div className="flex items-center gap-2">
              <span>✉️</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {(personalInfo?.city || personalInfo?.country) && (
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>
                {personalInfo.city}, {personalInfo.country}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* About Me */}
      {personalInfo?.objective && (
        <div className="mt-8">
          <h2 className="text-base sm:text-lg font-bold tracking-widest mb-2">
            ABOUT ME
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            {personalInfo.objective}
          </p>
        </div>
      )}

      {/* Education */}
      {educations?.length > 0 && (
        <>
          <hr className="my-6" />
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-widest mb-4">
              EDUCATION
            </h2>

            {educations.map((education, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold text-sm sm:text-base">
                  {education.institute} |{' '}
                  {education.startDate?.split('-')[0]} -{' '}
                  {education.currentlyStudying
                    ? 'Running'
                    : education.endDate?.split('-')[0]}
                </p>
                <p className="font-bold text-sm sm:text-base">
                  {education.degree}
                </p>
                <p className="text-sm text-gray-700">
                  {education.cgpa ? `CGPA: ${education.cgpa}` : 'N/A'}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Experience */}
      {experiences?.length > 0 && (
        <>
          <hr className="my-6" />
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-widest mb-4">
              WORK EXPERIENCE
            </h2>

            {experiences.map((experience, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-semibold text-sm sm:text-base">
                  {experience.title} | {experience.startDate?.split('-')[0]} -{' '}
                  {experience.currentlyWorking
                    ? 'Working'
                    : experience.endDate?.split('-')[0]}
                </p>
                <p className="font-bold text-sm sm:text-base">
                  {experience.employer}
                </p>
                <p className="text-sm text-gray-700">
                  {experience.remote ? 'Remote' : experience.location}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Skills */}
      {skills && (skills.technicalSkills?.length > 0 || skills.softSkills?.length > 0) && (
        <>
          <hr className="my-6" />
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-widest mb-4">
              SKILLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 text-sm sm:text-base text-gray-700 gap-y-2">
              {skills.technicalSkills?.map((tech, idx) => (
                <p key={idx}>• {tech}</p>
              ))}
              {skills.softSkills?.map((soft, idx) => (
                <p key={idx}>• {soft}</p>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Others (Achievements, Languages, References, etc.) */}
      {others && (
        <>
          <hr className="my-6" />
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-widest mb-4">
              OTHERS
            </h2>
            {others.languages?.length > 0 && (
              <div className="mb-3">
                <p className="font-semibold text-gray-800">Languages:</p>
                <p className="text-sm text-gray-700">
                  {others.languages.join(', ')}
                </p>
              </div>
            )}
            {others.achievements?.length > 0 && (
              <div className="mb-3">
                <p className="font-semibold text-gray-800">Achievements:</p>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {others.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            )}
            {others.references?.length > 0 && (
              <div>
                <p className="font-semibold text-gray-800">References:</p>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {others.references.map((ref, idx) => (
                    <li key={idx}>{ref}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Classic;