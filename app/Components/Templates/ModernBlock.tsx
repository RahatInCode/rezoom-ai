import Image from 'next/image';
import React from 'react';

const ModernBlock = () => {
    return (
<div className="max-w-5xl mx-auto bg-white p-8 font-sans text-gray-800">
    {/* Header */}
    <div className="flex flex-col md:flex-row items-center justify-between border-b-4 border-[#1E3A8A] pb-6 mb-6">
      {/* Left: Photo */}
      <div className="w-40 h-40 rounded-md overflow-hidden mb-6 md:mb-0">
        <Image
          src="/profile.jpg"
          alt="Profile Photo"
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right: Name and Contact */}
      <div className="flex-1 md:ml-8 text-center md:text-right">
        <h1 className="text-3xl font-bold text-[#1E3A8A] tracking-wide">
          KATHRYN SORIANO, RN
        </h1>
        <ul className="mt-4 space-y-2 text-sm">
          <li>0123 456 7890</li>
          <li>hello@reallygreatsite.com</li>
          <li>123 Malasakit St., Kababayan City 1234</li>
          <li className="flex items-center justify-center md:justify-end gap-2">
            <Image src="/linkedin.png" alt="LinkedIn" width={14} height={14} />
            linkedin.com/in/name
          </li>
        </ul>
      </div>
    </div>

    {/* Body Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Column */}
      <div className="space-y-8">
        {/* Profile */}
        <div>
          <p className="text-sm leading-relaxed">
            A nurse with 5+ years of experience in various healthcare settings,
            including hospitals and clinics. Proficient in patient assessment,
            medication administration, and care plan implementation. Skilled in
            communication and teamwork, dedicated to providing compassionate
            care to patients.
          </p>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-[#1E3A8A] font-semibold text-lg mb-2 uppercase">
            Education
          </h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold">Master of Science in Nursing</p>
              <p>Narra National University – College of Nursing, 2017</p>
            </div>
            <div>
              <p className="font-bold">Bachelor of Science in Nursing</p>
              <p>Narra National University – College of Nursing, 2015</p>
            </div>
            <div>
              <p className="font-bold">Secondary Education</p>
              <p>Narra National Highschool, 2011</p>
            </div>
            <div>
              <p className="font-bold">Primary Education</p>
              <p>Narra National Elementary School, 2007</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-[#1E3A8A] font-semibold text-lg mb-2 uppercase">
            Certifications
          </h2>
          <p className="text-sm leading-relaxed">
            <span className="font-bold">Nurse Licensure Exam (NLE)</span> <br />
            Passed 2015 <br />
            Professional Regulations Commission
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        {/* Work Experience */}
        <div>
          <h2 className="text-[#1E3A8A] font-semibold text-lg mb-2 uppercase">
            Work Experience
          </h2>
          <div className="text-sm space-y-5">
            <div>
              <p className="font-bold">Clinical Nurse Educator</p>
              <p className="italic">Narra National University – College of Nursing</p>
              <p>January 2023 – Present</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Taught and mentored nursing students</li>
                <li>Developed and implemented the program’s nursing curriculum</li>
                <li>
                  Stayed up-to-date with the latest healthcare practices and technologies
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold">Charge Nurse</p>
              <p className="italic">Las Felipinas General Hospital</p>
              <p>January 2021 – Present</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Supervised a team of nurses and nursing assistants</li>
                <li>Ensured high-quality patient care</li>
                <li>Maintained accurate patient records</li>
              </ul>
            </div>

            <div>
              <p className="font-bold">Staff Nurse</p>
              <p className="italic">Las Felipinas General Hospital</p>
              <p>January 2018 – December 2020</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Provided direct patient care</li>
                <li>Administered medications</li>
                <li>
                  Coordinated with other healthcare professionals
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Volunteer Work */}
        <div>
          <h2 className="text-[#1E3A8A] font-semibold text-lg mb-2 uppercase">
            Volunteer Work
          </h2>
          <p className="text-sm font-bold">Volunteer Nurse</p>
          <p className="italic">Sagip Dalisay Foundation</p>
          <p>2015 – Present</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>Participated in disaster relief efforts</li>
            <li>
              Provided healthcare and first-aid services at community events
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
    );
};

export default ModernBlock;