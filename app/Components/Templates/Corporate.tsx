import { Globe, Mail, Phone } from 'lucide-react';
import React from 'react';

const Corporate = () => {
    return (
  <div className="w-full max-w-5xl mx-auto bg-white p-10 font-sans text-gray-800 leading-relaxed">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-300 pb-6">
      {/* Profile Image */}
      <img
        src="/profile.jpg"
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 mb-4 md:mb-0"
      />

      {/* Name and Role */}
      <div className="flex-1 md:ml-8">
        <h1 className="text-4xl font-bold tracking-wide">
          SHARYA <span className="font-light">SINGH</span>
        </h1>
        <p className="text-lg text-gray-600 mt-1">Web Designer</p>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center text-sm text-gray-700 mt-3 gap-5 border-t border-gray-300 pt-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> +123-456-7890
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> hello@reallygreatsite.com
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" /> www.reallygreatsite.com
          </div>
        </div>
      </div>
    </div>

    {/* About Me */}
    <section className="mt-8">
      <h2 className="text-lg font-bold uppercase border-b border-gray-400 pb-1 mb-3">
        About Me
      </h2>
      <p className="text-sm text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </section>

    {/* Education */}
    <section className="mt-8">
      <h2 className="text-lg font-bold uppercase border-b border-gray-400 pb-1 mb-3">
        Education
      </h2>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold">2020 - 2023</p>
            <p className="text-sm font-semibold">Master of IT Management</p>
          </div>
          <p className="font-medium">Wardiere University</p>
          <p className="text-sm text-gray-700 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus
            egestas accumsan.
          </p>
        </div>

        <div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold">2016 - 2020</p>
            <p className="text-sm font-semibold">Bachelor of Art and Design</p>
          </div>
          <p className="font-medium">Borcellle University</p>
          <p className="text-sm text-gray-700 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus
            egestas accumsan.
          </p>
        </div>

        <div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold">2012 - 2016</p>
            <p className="text-sm font-semibold">Major Of Art And Design</p>
          </div>
          <p className="font-medium">Wardiere High School</p>
          <p className="text-sm text-gray-700 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus
            egestas accumsan.
          </p>
        </div>
      </div>
    </section>

    {/* Experience */}
    <section className="mt-8">
      <h2 className="text-lg font-bold uppercase border-b border-gray-400 pb-1 mb-3">
        Experience
      </h2>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold">2020 - 2023</p>
            <p className="text-sm font-semibold">Web Designer</p>
          </div>
          <p className="font-medium">Wardiere Company</p>
          <p className="text-sm text-gray-700 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus
            egestas accumsan.
          </p>
        </div>

        <div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold">2016 - 2020</p>
            <p className="text-sm font-semibold">Web Designer</p>
          </div>
          <p className="font-medium">Borcellle Studio</p>
          <p className="text-sm text-gray-700 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sem nec risus
            egestas accumsan.
          </p>
        </div>
      </div>
    </section>

    {/* Skills */}
    <section className="mt-8">
      <h2 className="text-lg font-bold uppercase border-b border-gray-400 pb-1 mb-3">Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm text-gray-700">
        <p>Web Design Tools</p>
        <p>Web Accessibility</p>
        <p>Color Theory</p>
        <p>Front-End</p>
        <p>Version Control</p>
        <p>SEO Fundamentals</p>
        <p>UI/UX Design</p>
        <p>Typography</p>
      </div>
    </section>

    {/* References */}
    <section className="mt-8">
      <h2 className="text-lg font-bold uppercase border-b border-gray-400 pb-1 mb-3">
        References
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
        <div>
          <p className="font-bold">Niranjan Devi</p>
          <p>CEO of Wardiere Company</p>
          <p className="mt-2">
            <span className="font-semibold">Phone:</span> 123-456-7890
          </p>
          <p>
            <span className="font-semibold">Social:</span> @reallygreatsite
          </p>
        </div>

        <div>
          <p className="font-bold">Aarya Agarwal</p>
          <p>HRD of Wardiere Company</p>
          <p className="mt-2">
            <span className="font-semibold">Phone:</span> 123-456-7890
          </p>
          <p>
            <span className="font-semibold">Social:</span> @reallygreatsite
          </p>
        </div>
      </div>
    </section>
  </div>
    );
};

export default Corporate;