import { PhoneCall } from 'lucide-react';
import React from 'react';

const Classic = () => {
    return (
<div className="max-w-3xl mx-auto bg-white text-gray-800 p-6 sm:p-10 font-sans leading-relaxed shadow-sm">
  {/* Header */}
  <div className="text-center border-b pb-6">
    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide break-words">
      SEBASTIAN BENNETT
    </h1>
    <p className="text-base sm:text-lg text-gray-600 mt-1">
      Professional Accountant
    </p>

    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-sm text-gray-600 mt-4 flex-wrap">
      <div className="flex items-center gap-2">
        <span>📞</span>
        <span>+123-456-7890</span>
      </div>
      <div className="flex items-center gap-2">
        <span>✉️</span>
        <span>hello@reallygreatsite.com</span>
      </div>
      <div className="flex items-center gap-2">
        <span>📍</span>
        <span>123 Anywhere St., Any City</span>
      </div>
    </div>
  </div>

  {/* About Me */}
  <div className="mt-8">
    <h2 className="text-base sm:text-lg font-bold tracking-widest mb-2">
      ABOUT ME
    </h2>
    <p className="text-sm sm:text-base text-gray-700">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam...
    </p>
  </div>

  <hr className="my-6" />

  {/* Education */}
  <div>
    <h2 className="text-base sm:text-lg font-bold tracking-widest mb-4">
      EDUCATION
    </h2>

    <div className="mb-4">
      <p className="font-semibold text-sm sm:text-base">
        Borcelle University | 2026 - 2030
      </p>
      <p className="font-bold text-sm sm:text-base">Senior Accountant</p>
      <p className="text-sm text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>

    <div>
      <p className="font-semibold text-sm sm:text-base">
        Borcelle University | 2023 - 2026
      </p>
      <p className="font-bold text-sm sm:text-base">Senior Accountant</p>
      <p className="text-sm text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  </div>

  <hr className="my-6" />

  {/* Work Experience */}
  <div>
    <h2 className="text-base sm:text-lg font-bold tracking-widest mb-4">
      WORK EXPERIENCE
    </h2>

    <div className="mb-4">
      <p className="font-semibold text-sm sm:text-base">
        Salford & Co. | 2033 - 2035
      </p>
      <p className="font-bold text-sm sm:text-base">Senior Accountant</p>
      <p className="text-sm text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>

    <div>
      <p className="font-semibold text-sm sm:text-base">
        Salford & Co. | 2030 - 2033
      </p>
      <p className="font-bold text-sm sm:text-base">Financial Accountant</p>
      <p className="text-sm text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  </div>

  <hr className="my-6" />

  {/* Skills */}
  <div>
    <h2 className="text-base sm:text-lg font-bold tracking-widest mb-4">
      SKILLS
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 text-sm sm:text-base text-gray-700 gap-y-2">
      <p>• Auditing</p>
      <p>• Financial Accounting</p>
      <p>• Financial Reporting</p>
      <p>• Management Accounting</p>
      <p>• Taxation</p>
      <p>• Budget Analysis</p>
    </div>
  </div>
</div>


    );
};

export default Classic;