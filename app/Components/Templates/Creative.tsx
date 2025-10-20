import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';

const Creative = () => {
    return (
<div className="w-full max-w-5xl mx-auto bg-white p-10 font-sans text-gray-800 leading-relaxed">
    {/* Header */}
    <div className="border-b border-gray-300 pb-4">
      <h1 className="text-4xl font-extrabold text-black tracking-wide">
        RICHARD <span className="font-light">SANCHEZ</span>
      </h1>
      <p className="text-gray-600 text-lg mt-1">MARKETING MANAGER</p>
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
              <Phone className="w-4 h-4 text-gray-700" /> +123-456-7890
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-700" /> hello@reallygreatsite.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-700" /> 123 Anywhere St., Any City
            </li>
            <li className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-700" /> www.reallygreatsite.com
            </li>
          </ul>
        </div>

        {/* Education */}
        <div>
          <h2 className="font-bold text-lg uppercase mb-2">Education</h2>

          <div className="mb-3">
            <p className="text-sm text-gray-700 font-medium">2029 - 2030</p>
            <p className="font-semibold">Wardiere University</p>
            <p className="text-sm text-gray-700">Master of Business Management</p>
          </div>

          <div>
            <p className="text-sm text-gray-700 font-medium">2025 - 2029</p>
            <p className="font-semibold">Wardiere University</p>
            <p className="text-sm text-gray-700">
              Bachelor of Business <br /> GPA: 3.8 / 4.0
            </p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="font-bold text-lg uppercase mb-2">Skills</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Project Management</li>
            <li>Public Relations</li>
            <li>Teamwork</li>
            <li>Time Management</li>
            <li>Leadership</li>
            <li>Effective Communication</li>
            <li>Critical Thinking</li>
          </ul>
        </div>

        {/* Languages */}
        <div>
          <h2 className="font-bold text-lg uppercase mb-2">Languages</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>English (Fluent)</li>
            <li>French (Fluent)</li>
            <li>German (Basics)</li>
            <li>Spanish (Intermediate)</li>
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Profile */}
        <div>
          <h2 className="font-bold text-lg uppercase border-b border-gray-400 pb-1 mb-3">
            Profile
          </h2>
          <p className="text-sm text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud
            exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud
            exercitation.
          </p>
        </div>

        {/* Work Experience */}
        <div>
          <h2 className="font-bold text-lg uppercase border-b border-gray-400 pb-1 mb-3">
            Work Experience
          </h2>

          <div className="relative border-l-2 border-gray-400 pl-4 space-y-6">
            {/* Job 1 */}
            <div>
              <div className="flex justify-between items-center">
                <p className="font-bold">Borcelle Studio</p>
                <span className="text-sm text-gray-700">2030 - Present</span>
              </div>
              <p className="text-sm text-gray-800 font-semibold">
                Marketing Manager & Specialist
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-1">
                <li>
                  Develop and execute comprehensive marketing strategies and campaigns that align
                  with the company’s goals and objectives.
                </li>
                <li>
                  Lead, mentor, and manage a high-performing marketing team fostering collaboration.
                </li>
                <li>Monitor brand consistency across marketing channels.</li>
              </ul>
            </div>

            {/* Job 2 */}
            <div>
              <div className="flex justify-between items-center">
                <p className="font-bold">Fauget Studio</p>
                <span className="text-sm text-gray-700">2025 - 2029</span>
              </div>
              <p className="text-sm text-gray-800 font-semibold">
                Marketing Manager & Specialist
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-1">
                <li>
                  Create and manage marketing budgets ensuring efficient resource allocation.
                </li>
                <li>Oversee market research to identify emerging trends and customer needs.</li>
                <li>Monitor brand consistency across marketing channels.</li>
              </ul>
            </div>

            {/* Job 3 */}
            <div>
              <div className="flex justify-between items-center">
                <p className="font-bold">Studio Showde</p>
                <span className="text-sm text-gray-700">2024 - 2025</span>
              </div>
              <p className="text-sm text-gray-800 font-semibold">
                Marketing Manager & Specialist
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-1 space-y-1">
                <li>
                  Develop and maintain strong relationships with partners and vendors to support
                  marketing initiatives.
                </li>
                <li>Monitor and maintain brand consistency across channels.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reference */}
        <div>
          <h2 className="font-bold text-lg uppercase border-b border-gray-400 pb-1 mb-3">
            Reference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <p className="font-bold">Estelle Darcy</p>
              <p>Wardiere Inc. / CTO</p>
              <p className="mt-1">
                <span className="font-semibold">Phone:</span> 123-456-7890
              </p>
              <p>
                <span className="font-semibold">Email:</span> hello@reallygreatsite.com
              </p>
            </div>

            <div>
              <p className="font-bold">Harper Richard</p>
              <p>Wardiere Inc. / CEO</p>
              <p className="mt-1">
                <span className="font-semibold">Phone:</span> 123-456-7890
              </p>
              <p>
                <span className="font-semibold">Email:</span> hello@reallygreatsite.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
};

export default Creative;