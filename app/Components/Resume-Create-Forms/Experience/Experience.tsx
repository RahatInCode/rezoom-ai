"use client";
import React from "react";
import { X } from "lucide-react";

export interface ExperienceData {
  title: string;
  employer: string;
  location: string;
  remote: boolean;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
}

interface ExperienceProps {
  experiences: ExperienceData[];
  setExperiences: React.Dispatch<React.SetStateAction<ExperienceData[]>>;
}

const Experience: React.FC<ExperienceProps> = ({ experiences, setExperiences }) => {
  // --- Handle Input Change ---
const handleTextChange = <K extends keyof ExperienceData>(
  index: number,
  field: K,
  value: ExperienceData[K]
) => {
  const updated = [...experiences];
  updated[index][field] = value; // now fully type-safe
  setExperiences(updated);
};


  // --- Add Experience ---
  const addExperience = () => {
    setExperiences([
      ...experiences,
      { title: "", employer: "", location: "", remote: false, startDate: "", endDate: "", currentlyWorking: false },
    ]);
  };

  // --- Remove Experience ---
  const removeExperience = (index: number) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated.length ? updated : [
      { title: "", employer: "", location: "", remote: false, startDate: "", endDate: "", currentlyWorking: false },
    ]);
  };

  return (
    <div className="w-full space-y-6">
      <div className="w-full p-5 space-y-3 border rounded-lg bg-white">
        <p className="font-bold text-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Experience
        </p>

        {experiences.map((exp, idx) => (
          <div key={idx} className="relative space-y-4 border p-4 rounded-lg">
            {/* Remove Button */}
            {experiences.length > 1 && (
              <X
                size={22}
                className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-red-500"
                onClick={() => removeExperience(idx)}
              />
            )}

            {/* Title */}
            <div>
              <label className="font-semibold">Job Title</label>
              <input
                type="text"
                placeholder="Enter job title"
                className="input input-bordered w-full"
                value={exp.title}
                onChange={(e) => handleTextChange(idx, "title", e.target.value)}
              />
            </div>

            {/* Employer */}
            <div>
              <label className="font-semibold">Employer / Company</label>
              <input
                type="text"
                placeholder="Enter employer or company"
                className="input input-bordered w-full"
                value={exp.employer}
                onChange={(e) => handleTextChange(idx, "employer", e.target.value)}
              />
            </div>

            {/* Location */}
            <div>
              <label className="font-semibold">Location</label>
              <input
                type="text"
                placeholder="Enter job location"
                className="input input-bordered w-full"
                value={exp.location}
                onChange={(e) => handleTextChange(idx, "location", e.target.value)}
              />
            </div>

            {/* Remote Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exp.remote}
                onChange={(e) => handleTextChange(idx, "remote", e.target.checked)}
              />
              <span>Remote Position</span>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">Start Date</label>
                <input
                  type="month"
                  className="input input-bordered w-full"
                  value={exp.startDate}
                  onChange={(e) => handleTextChange(idx, "startDate", e.target.value)}
                />
              </div>

              <div>
                <label className="font-semibold">End Date</label>
                <input
                  type="month"
                  className="input input-bordered w-full"
                  value={exp.endDate}
                  disabled={exp.currentlyWorking}
                  onChange={(e) => handleTextChange(idx, "endDate", e.target.value)}
                />
              </div>
            </div>

            {/* Currently Working Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exp.currentlyWorking}
                onChange={(e) => handleTextChange(idx, "currentlyWorking", e.target.checked)}
              />
              <span>Currently Working Here</span>
            </div>
          </div>
        ))}

        <button className="btn w-full border-dotted mt-2" onClick={addExperience}>
          + Add Another Experience
        </button>
      </div>
    </div>
  );
};

export default Experience;
