import React from 'react';

const Modern = () => {
    return (
<div className="max-w-3xl mx-auto bg-white text-gray-800 p-6 sm:p-10 font-sans leading-relaxed">
  {/* Header */}
  <div className="border-b pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between text-center sm:text-left">
    <div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-600 tracking-wide">DREW FEIG</h1>
      <p className="text-gray-700 text-base sm:text-lg tracking-wider">MARKETING SPECIALIST</p>
    </div>
  </div>

  {/* Contact Info */}
  <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-2 sm:gap-6 text-sm text-gray-600 mt-3 border-b pb-4 text-center sm:text-left">
    <span>hello@reallygreatsite.com</span>
    <span>|</span>
    <span>+123-456-7890</span>
    <span>|</span>
    <span>123 Anywhere St., Any City, ST 12345</span>
  </div>

  {/* Profile Summary */}
  <div className="mt-8">
    <h2 className="text-teal-600 font-semibold text-base sm:text-lg tracking-wider border-b border-teal-600 inline-block pb-1 mb-3">
      Profile Summary
    </h2>
    <p className="text-sm sm:text-base text-gray-700">
      Highly qualified digital marketing strategist with 7+ years of experience in multiple marketing disciplines,
      search engine marketing (SEM), and event marketing. Proven ability to drive sales and increase brand awareness
      for small business clients.
    </p>
  </div>

  {/* Skills */}
  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div>
      <h3 className="text-teal-600 font-semibold text-base sm:text-lg tracking-wider border-b border-teal-600 inline-block pb-1 mb-3">
        Professional Skill
      </h3>
      <ul className="list-disc ml-5 text-sm sm:text-base text-gray-700 space-y-1">
        <li>Media relation</li>
        <li>Advertising</li>
        <li>Brand management</li>
        <li>Direct Marketing</li>
      </ul>
    </div>

    <div>
      <h3 className="text-teal-600 font-semibold text-base sm:text-lg tracking-wider border-b border-teal-600 inline-block pb-1 mb-3">
        Relevant Skill
      </h3>
      <ul className="list-disc ml-5 text-sm sm:text-base text-gray-700 space-y-1">
        <li>Supervising</li>
        <li>Event planning</li>
        <li>Newsletter</li>
        <li>Fluent in Spanish</li>
      </ul>
    </div>
  </div>

  {/* Education */}
  <div className="mt-8">
    <h2 className="text-teal-600 font-semibold text-base sm:text-lg tracking-wider border-b border-teal-600 inline-block pb-1 mb-3">
      Education
    </h2>
    <p className="font-semibold text-gray-800 text-sm sm:text-base">
      Bachelor of Science University <span className="text-gray-500 float-right italic">2009 - 2013</span>
    </p>
    <p className="text-sm sm:text-base text-gray-700">
      Computer Graphics Technology focuses on interactive Multimedia Development
    </p>
  </div>

  {/* Work Experience */}
  <div className="mt-8">
    <h2 className="text-teal-600 font-semibold text-base sm:text-lg tracking-wider border-b border-teal-600 inline-block pb-1 mb-3">
      Work Experience
    </h2>

    <div className="mb-4">
      <p className="font-bold text-sm sm:text-base text-gray-800">
        Marketing Strategist <span className="text-gray-500 float-right italic">2021 - 2022</span>
      </p>
      <ul className="list-disc ml-5 text-sm sm:text-base text-gray-700 space-y-1">
        <li>Propel marketing and design</li>
        <li>Propel works with clients to create effective and unique marketing strategies to help raise their online profile and support their business objective.</li>
      </ul>
    </div>

    <div className="mb-4">
      <p className="font-bold text-sm sm:text-base text-gray-800">
        Marketing Manager <span className="text-gray-500 float-right italic">2020 - 2021</span>
      </p>
      <ul className="list-disc ml-5 text-sm sm:text-base text-gray-700 space-y-1">
        <li>Championed marketing efforts for St. Thynk Unlimited</li>
        <li>Developed and implemented strategic marketing initiatives targeted to both internal and external markets, while using marketing and public relation techniques.</li>
      </ul>
    </div>

    <div className="mb-4">
      <p className="font-bold text-sm sm:text-base text-gray-800">
        Lead Program Support Assistant <span className="text-gray-500 float-right italic">2018 - 2022</span>
      </p>
      <ul className="list-disc ml-5 text-sm sm:text-base text-gray-700 space-y-1">
        <li>Managed and trained 5 employees while supervising daily tasks and performing project management.</li>
        <li>Ensured accuracy and authenticity of all recorded information.</li>
      </ul>
    </div>

    <div>
      <p className="font-bold text-sm sm:text-base text-gray-800">
        Marketing Assistant <span className="text-gray-500 float-right italic">2016 - 2018</span>
      </p>
      <ul className="list-disc ml-5 text-sm sm:text-base text-gray-700 space-y-1">
        <li>Developed and distributed marketing materials for internal and external initiatives for Hannover and Tyke.</li>
        <li>Lead a team of marketing professionals while planning events such as campaigns, brochures, and press releases.</li>
      </ul>
    </div>
  </div>

  {/* Interests */}
  <div className="mt-8">
    <h2 className="text-teal-600 font-semibold text-base sm:text-lg tracking-wider border-b border-teal-600 inline-block pb-1 mb-3">
      Interest
    </h2>
    <ul className="list-disc ml-5 text-sm sm:text-base text-gray-700 space-y-1">
      <li>Monitoring stock market</li>
      <li>Managing social media presence</li>
      <li>Creating graphic design</li>
    </ul>
  </div>
</div>

    );
};

export default Modern;