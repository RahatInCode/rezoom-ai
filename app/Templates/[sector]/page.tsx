import { notFound } from "next/navigation";
import Image from "next/image";
import { FaArrowRight, FaUpload } from "react-icons/fa";
import { resumeOptions, ResumeOption } from "../../ResumeExamplesSection/ResumeOptions";

// ✅ Correct typing for Next.js dynamic routes
interface PageProps {
  params: {
    sector: string;
  };
}

export default function SectorPage({ params }: PageProps) {
  const sectorName = decodeURIComponent(params.sector);

  const option: ResumeOption | undefined = resumeOptions.find(
    (opt) => opt.sector.toLowerCase() === sectorName.toLowerCase()
  );

  if (!option) return notFound();

  return (
    <div className="max-w-6xl mx-auto py-16 px-5">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Resume Image */}
        <div className="flex-shrink-0 w-full lg:w-1/2">
          <Image
            src={option.resume}
            alt={`${option.sector} Resume`}
            width={500}
            height={650}
            className="rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-105"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Sector Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
            Resume for {option.sector}
          </h1>

          {/* Description */}
          <p className="text-gray-600 font-semibold dark:text-gray-200 text-lg leading-relaxed">
            {option.description}
          </p>

          {/* Why Choose This */}
          <div>
            <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 bg-clip-text text-transparent">
              Why Choose This Template?
            </h2>

            <ul className="list-disc text-xl font-semibold list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {option.whyChoose.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-6">
            {/* Build Button */}
            <button className="relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 text-white font-bold shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <span className="absolute inset-0 bg-white opacity-10 rounded-full blur-lg group-hover:opacity-20 transition-all duration-500"></span>
              <span className="flex items-center gap-3 relative z-10">
                Create My Resume Now <FaArrowRight />
              </span>
            </button>

            {/* Import Button */}
            <button className="relative inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-purple-600 font-bold text-purple-600 overflow-hidden group hover:text-white hover:border-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-2xl transition-all duration-300">
              <span className="absolute inset-0 bg-white opacity-0 rounded-full blur-lg group-hover:opacity-20 transition-all duration-500"></span>
              <span className="flex items-center gap-3 relative z-10">
                Import Resume <FaUpload />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}





