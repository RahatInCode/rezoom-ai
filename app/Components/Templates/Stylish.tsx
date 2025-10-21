import React from 'react';

const Stylish = () => {
    return (
         <div className="max-w-5xl mx-auto bg-white text-gray-800 font-sans">
    {/* Header */}
    <div className="bg-gray-100 p-8 text-start">
      <h1 className="text-4xl font-semibold tracking-wide">Lorna Alvarado</h1>
      <p className="text-gray-500 mt-1 text-lg">Marketing Manager</p>
    </div>

    {/* Contact Bar */}
    <div className="flex flex-col md:flex-row items-center justify-start gap-6 md:gap-12 py-4 border-b border-gray-300 text-sm">
      <div className="flex items-center gap-2">
        <i className="lucide lucide-phone text-gray-500"></i>
        <span>+123-456-7890</span>
      </div>
      <div className="flex items-center gap-2">
        <i className="lucide lucide-mail text-gray-500"></i>
        <span>hello@reallygreatsite.com</span>
      </div>
      <div className="flex items-center gap-2">
        <i className="lucide lucide-map-pin text-gray-500"></i>
        <span>123 Anywhere St., Any City</span>
      </div>
    </div>

    {/* Body */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-10">
      {/* Left Column */}
      <div className="space-y-8">
        {/* Education */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 uppercase mb-2">
            Education
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-bold">BA Sales and Commerce</p>
              <p>Borcelle University</p>
              <p className="text-gray-500 text-xs">(2016 – 2020)</p>
            </div>
            <div>
              <p className="font-bold">Bachelor of Design</p>
              <p>Wardiere University</p>
              <p className="text-gray-500 text-xs">(2011 – 2015)</p>
            </div>
            <div>
              <p className="font-bold">BA Sales and Commerce</p>
              <p>Borcelle University</p>
              <p className="text-gray-500 text-xs">(2020 – 2023)</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 uppercase mb-2">
            Skills
          </h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Management Skills</li>
            <li>Digital Marketing</li>
            <li>Negotiation</li>
            <li>Critical Thinking</li>
            <li>Communication Skills</li>
            <li>Digital Marketing</li>
            <li>Negotiation</li>
          </ul>
        </div>

        {/* Language */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 uppercase mb-2">
            Language
          </h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>English</li>
            <li>Spanish</li>
            <li>French</li>
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        {/* Profile */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 uppercase mb-2">
            Profile
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit
            amet sem nec risus egestas accumsan. In enim nunc, tincidunt ut quam
            eget, luctus sollicitudin neque. Sed leo nisl, semper ac hendrerit
            a, sollicitudin in arcu.
          </p>
        </div>

        {/* Work Experience */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 uppercase mb-2">
            Work Experience
          </h2>
          <div className="text-sm space-y-5">
            <div>
              <div className="flex justify-between items-center">
                <p className="font-bold">Ginyard International Co.</p>
                <p className="text-gray-500">2020 – 2023</p>
              </div>
              <p className="italic text-gray-600">Product Design Manager</p>
              <p className="mt-1 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                sit amet sem nec risus egestas accumsan. In enim nunc, tincidunt
                ut quam eget, luctus sollicitudin neque.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <p className="font-bold">Liceria & Co.</p>
                <p className="text-gray-500">2019 – 2020</p>
              </div>
              <p className="italic text-gray-600">Product Design Manager</p>
              <p className="mt-1 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                sit amet sem nec risus egestas accumsan. In enim nunc, tincidunt
                ut quam eget, luctus sollicitudin neque.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <p className="font-bold">Ginyard International Co.</p>
                <p className="text-gray-500">2017 – 2019</p>
              </div>
              <p className="italic text-gray-600">Product Design Manager</p>
              <p className="mt-1 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                sit amet sem nec risus egestas accumsan. In enim nunc, tincidunt
                ut quam eget, luctus sollicitudin neque.
              </p>
            </div>
          </div>
        </div>

        {/* References */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 uppercase mb-2">
            References
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-bold">Bailey Dupont</p>
              <p>Wardiere Inc. / CEO</p>
              <p className="mt-1 text-gray-600">
                <span className="font-semibold">Phone:</span> 123-456-7890
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Email:</span>{" "}
                hello@reallygreatsite.com
              </p>
            </div>
            <div>
              <p className="font-bold">Harumi Kobayashi</p>
              <p>Wardiere Inc. / CEO</p>
              <p className="mt-1 text-gray-600">
                <span className="font-semibold">Phone:</span> 123-456-7890
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Email:</span>{" "}
                hello@reallygreatsite.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
};

export default Stylish;