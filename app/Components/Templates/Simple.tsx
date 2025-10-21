import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Simple = () => {
    return (
             <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden font-sans">
    {/* Top Section */}
    <div className="flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <div className="bg-[#2c3a50] text-white md:w-1/3 w-full p-8 flex flex-col items-center md:items-start">
        {/* Profile Image */}
        <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-white">
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Contact Info */}
        <div className="space-y-3 text-sm">
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

        {/* Profile */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold border-b border-gray-500 pb-1 mb-3">
            PROFILE
          </h3>
          <p className="text-sm leading-relaxed text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.
          </p>
        </div>

        {/* Education */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold border-b border-gray-500 pb-1 mb-3">
            EDUCATION
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold">2029 - 2030</p>
              <p className="font-semibold">WARDIERE UNIVERSITY</p>
              <ul className="list-disc list-inside text-gray-300">
                <li>Master of Business Management</li>
              </ul>
            </div>
            <div>
              <p className="font-bold">2025 - 2029</p>
              <p className="font-semibold">WARDIERE UNIVERSITY</p>
              <ul className="list-disc list-inside text-gray-300">
                <li>Bachelor of Business</li>
                <li>GPA: 3.8 / 4.0</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold border-b border-gray-500 pb-1 mb-3">
            SKILLS
          </h3>
          <ul className="space-y-1 text-sm text-gray-300">
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

        {/* Languages */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold border-b border-gray-500 pb-1 mb-3">
            LANGUAGES
          </h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>English (Fluent)</li>
            <li>French (Fluent)</li>
            <li>German (Basics)</li>
            <li>Spanish (Intermediate)</li>
          </ul>
        </div>
      </div>

      {/* Right Content */}
      <div className="md:w-2/3 w-full p-8">
        {/* Name and Title */}
        <div className="border-b border-gray-300 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">RICHARD SANCHEZ</h1>
          <p className="text-lg text-gray-500 tracking-wide">MARKETING MANAGER</p>
        </div>

        {/* Work Experience */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-4">
            WORK EXPERIENCE
          </h3>

          <div className="space-y-6 text-sm">
            {/* Job 1 */}
            <div>
              <p className="font-bold">Borcelle Studio</p>
              <p className="italic text-gray-600 mb-1">
                Marketing Manager & Specialist <span className="float-right">2030 - Present</span>
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Develop and execute comprehensive marketing strategies.</li>
                <li>Lead and manage a high-performing team.</li>
                <li>Monitor brand consistency across channels.</li>
              </ul>
            </div>

            {/* Job 2 */}
            <div>
              <p className="font-bold">Fauget Studio</p>
              <p className="italic text-gray-600 mb-1">
                Marketing Manager & Specialist <span className="float-right">2025 - 2029</span>
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Create and manage the marketing budget efficiently.</li>
                <li>Oversee market research and analyze trends.</li>
                <li>Monitor brand consistency across materials.</li>
              </ul>
            </div>

            {/* Job 3 */}
            <div>
              <p className="font-bold">Studio Showde</p>
              <p className="italic text-gray-600 mb-1">
                Marketing Manager & Specialist <span className="float-right">2024 - 2025</span>
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Develop and maintain strong partnerships with agencies.</li>
                <li>Monitor brand consistency across all materials.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* References */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-4">
            REFERENCE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <p className="font-semibold">Estelle Darcy</p>
              <p>Wardiere Inc. / CTO</p>
              <p><span className="font-semibold">Phone:</span> 123-456-7890</p>
              <p><span className="font-semibold">Email:</span> hello@reallygreatsite.com</p>
            </div>
            <div>
              <p className="font-semibold">Harper Richard</p>
              <p>Wardiere Inc. / CEO</p>
              <p><span className="font-semibold">Phone:</span> 123-456-7890</p>
              <p><span className="font-semibold">Email:</span> hello@reallygreatsite.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
};

export default Simple;