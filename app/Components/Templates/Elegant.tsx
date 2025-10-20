import { Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';

const Elegant = () => {
    return (
 <div className="w-full max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md font-sans">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-gray-300 pb-6">
      <div className="flex-shrink-0">
        <img
          src="/resume-photo.jpg"
          alt="Profile"
          className="w-40 h-40 object-cover rounded-full border-[5px] border-blue-600"
        />
      </div>
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-blue-700 uppercase tracking-wide">
          Richard Sanchez
        </h1>
        <p className="text-gray-600 text-lg mt-1">Marketing Manager</p>
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-3 text-gray-700">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            <span>hello@reallygreatsite.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-600" />
            <span>+123-456-7890</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>123 Anywhere St., Any City</span>
          </div>
        </div>
      </div>
    </div>

    {/* Profile Summary */}
    <div className="mt-6">
      <h2 className="text-blue-700 font-bold uppercase text-sm tracking-wider border-b-2 border-blue-700 inline-block pb-1">
        Profile Summary
      </h2>
      <p className="text-gray-700 mt-3 leading-relaxed">
        Highly qualified digital marketing strategist with 7+ years of experience in multiple
        marketing disciplines, search engine marketing (SEM), and event marketing. Proven ability to
        drive sales and increase brand awareness for small business clients.
      </p>
    </div>

    {/* Education */}
    <div className="mt-6">
      <h2 className="text-blue-700 font-bold uppercase text-sm tracking-wider border-b-2 border-blue-700 inline-block pb-1">
        Education
      </h2>

      <div className="mt-4 space-y-4">
        <div>
          <div className="flex justify-between text-gray-800 font-semibold">
            <p>Wardiere University</p>
            <span className="text-blue-700">2029 - 2030</span>
          </div>
          <p className="text-gray-700 mt-1 text-sm">
            • Master of Computer Graphics Technology focuses on interactive Multimedia.
          </p>
        </div>

        <div>
          <div className="flex justify-between text-gray-800 font-semibold">
            <p>Wardiere University</p>
            <span className="text-blue-700">2025 - 2029</span>
          </div>
          <p className="text-gray-700 mt-1 text-sm">
            • Bachelor of Computer Graphics Technology focuses on interactive Multimedia.
          </p>
        </div>
      </div>
    </div>

    {/* Work Experience */}
    <div className="mt-6">
      <h2 className="text-blue-700 font-bold uppercase text-sm tracking-wider border-b-2 border-blue-700 inline-block pb-1">
        Work Experience
      </h2>

      <div className="mt-4 space-y-4">
        <div>
          <div className="flex justify-between text-gray-800 font-semibold">
            <p>
              Marketing Manager | <span className="font-medium">Borcelle Studio</span>
            </p>
            <span className="text-blue-700">2030 - Present</span>
          </div>
          <ul className="list-disc list-inside text-gray-700 mt-1 text-sm space-y-1">
            <li>
              Develop and execute comprehensive marketing strategies and campaigns that align with
              the company’s goals and objectives.
            </li>
            <li>Monitor brand consistency across marketing channels and materials.</li>
          </ul>
        </div>

        <div>
          <div className="flex justify-between text-gray-800 font-semibold">
            <p>
              Marketing Manager | <span className="font-medium">Fauget Studio</span>
            </p>
            <span className="text-blue-700">2025 - 2029</span>
          </div>
          <ul className="list-disc list-inside text-gray-700 mt-1 text-sm space-y-1">
            <li>
              Create and manage the marketing budget, ensuring efficient allocation of resources and
              optimizing ROI.
            </li>
            <li>Monitor brand consistency across marketing channels and materials.</li>
          </ul>
        </div>

        <div>
          <div className="flex justify-between text-gray-800 font-semibold">
            <p>
              Marketing Specialist | <span className="font-medium">Studio Showde</span>
            </p>
            <span className="text-blue-700">2024 - 2025</span>
          </div>
          <ul className="list-disc list-inside text-gray-700 mt-1 text-sm space-y-1">
            <li>
              Develop and maintain strong relationships with partners, agencies, and vendors to
              support marketing initiatives.
            </li>
            <li>Monitor and maintain brand consistency across all marketing channels.</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Skills and Languages */}
    <div className="mt-8 grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-blue-700 font-bold uppercase text-sm tracking-wider border-b-2 border-blue-700 inline-block pb-1">
          Professional Skill
        </h2>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 mt-3 text-gray-700 text-sm">
          <li>• Media relation</li>
          <li>• Brand management</li>
          <li>• Advertising</li>
          <li>• Direct Marketing</li>
        </ul>
      </div>

      <div>
        <h2 className="text-blue-700 font-bold uppercase text-sm tracking-wider border-b-2 border-blue-700 inline-block pb-1">
          Languages
        </h2>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 mt-3 text-gray-700 text-sm">
          <li>• English (Fluent)</li>
          <li>• German (Basics)</li>
          <li>• French (Fluent)</li>
          <li>• Spanish (Basics)</li>
        </ul>
      </div>
    </div>
  </div>
    );
};

export default Elegant;