import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Smart = () => {
    return (
              <div className="w-full max-w-5xl mx-auto bg-white shadow-md font-sans">
    {/* Header Section */}
    <div className="bg-[#f3f6fa] p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
      {/* Profile Image */}
      <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-md">
        <Image
          src="/profile.jpg"
          alt="Profile"
          width={150}
          height={150}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Name and Title */}
      <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
        <h1 className="text-3xl font-bold text-[#1a202c]">RICHARD SANCHEZ</h1>
        <p className="uppercase text-gray-500 tracking-wider font-medium mt-1">
          — Marketing Manager
        </p>
      </div>
    </div>

    {/* Dark Blue Bar Section */}
    <div className="bg-[#2B3A4A] text-white flex flex-col md:flex-row px-8 py-6 gap-8">
      {/* Contact Info */}
      <div className="flex flex-col gap-3 text-sm md:w-1/3">
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4" />
          <span>+123-456-7890</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4" />
          <span>hello@reallygreatsite.com</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4" />
          <span>123 Anywhere St., Any City</span>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="w-4 h-4" />
          <span>www.reallygreatsite.com</span>
        </div>
      </div>

      {/* Profile Text */}
      <div className="md:w-2/3">
        <h3 className="uppercase font-semibold text-white mb-2">Profile</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam quis nostrud exercitation. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
      </div>
    </div>

    {/* Main Content Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-8">
      {/* Left Column */}
      <div>
        {/* Education */}
        <div className="mb-8">
          <h3 className="uppercase font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Education
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <p className="font-bold text-gray-800">2029 - 2030</p>
              <p className="font-semibold text-gray-800">
                Wardiere University
              </p>
              <p>Master of Business Management</p>
            </div>
            <div>
              <p className="font-bold text-gray-800">2025 - 2029</p>
              <p className="font-semibold text-gray-800">
                Wardiere University
              </p>
              <p>Bachelor of Business</p>
              <p>GPA: 3.8 / 4.0</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="uppercase font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Skills
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Project Management</li>
            <li>Public Relations</li>
            <li>Teamwork</li>
            <li>Time Management</li>
            <li>Leadership</li>
            <li>Effective Communication</li>
            <li>Critical Thinking</li>
            <li>Coaching</li>
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div>
        {/* Work Experience */}
        <div className="mb-8">
          <h3 className="uppercase font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Work Experience
          </h3>
          <div className="space-y-6 text-sm text-gray-700">
            <div>
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800">Borcelle Studio</p>
                <p className="text-gray-600 text-sm">2030 - Present</p>
              </div>
              <p className="italic mb-2 text-gray-600">
                Marketing Manager & Specialist
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Develop and execute comprehensive marketing strategies.
                </li>
                <li>Lead and manage a high-performing marketing team.</li>
                <li>Monitor brand consistency across materials.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800">Fauget Studio</p>
                <p className="text-gray-600 text-sm">2025 - 2029</p>
              </div>
              <p className="italic mb-2 text-gray-600">
                Marketing Manager & Specialist
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Create and manage the marketing budget efficiently.
                </li>
                <li>Oversee market research and analyze trends.</li>
                <li>Monitor brand consistency across channels.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* References */}
        <div>
          <h3 className="uppercase font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Reference
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-gray-800">Estelle Darcy</p>
              <p>Wardiere Inc. / CTO</p>
              <p>Phone: 123-456-7890</p>
              <p>Email: hello@reallygreatsite.com</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Harper Richard</p>
              <p>Wardiere Inc. / CEO</p>
              <p>Phone: 123-456-7890</p>
              <p>Email: hello@reallygreatsite.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
};

export default Smart;