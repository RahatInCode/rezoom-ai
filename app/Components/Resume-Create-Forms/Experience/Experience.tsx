"use client";
import { X } from "lucide-react";
import React, { useState } from "react";

interface ExperienceData {
  title: string;
  employer: string;
  location: string;
  remote: boolean;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
}

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceData[]>([
    { title: "", employer: "", location: "", remote: false, startDate: "", endDate: "", currentlyWorking: false },
  ]);

  const handleTextChange = (index: number, field: keyof Omit<ExperienceData, "remote" | "currentlyWorking">, value: string) => {
    setExperiences((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleCheckboxChange = (index: number, field: "remote" | "currentlyWorking", value: boolean) => {
    setExperiences((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      // if currentlyWorking checked, clear endDate
      if (field === "currentlyWorking" && value) updated[index].endDate = "";
      return updated;
    });
  };

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      { title: "", employer: "", location: "", remote: false, startDate: "", endDate: "", currentlyWorking: false },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      return updated.length ? updated : [
        { title: "", employer: "", location: "", remote: false, startDate: "", endDate: "", currentlyWorking: false },
      ];
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-3 text-start">
        <p className="sm:w-full font-bold text-5xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent md:w-3/4">
          Tell us about your most recent job
        </p>
        <p className="text-xl font-semibold text-gray-700">We will start there and work backward</p>
      </div>

      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative w-full p-5 border rounded-lg bg-white space-y-5">
            {/* Remove experience button */}
            {experiences.length > 1 && (
              <X
                size={20}
                className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-red-500"
                onClick={() => removeExperience(idx)}
              />
            )}

            <div className="w-full flex flex-col md:flex-row md:gap-5 space-y-5 md:space-y-0">
              <div className="w-full">
                <label className="text-sm">Title*</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) => handleTextChange(idx, "title", e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="text-sm">Employer*</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Employer"
                  value={exp.employer}
                  onChange={(e) => handleTextChange(idx, "employer", e.target.value)}
                />
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1">
                <label className="text-sm">Job Location*</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Job Location"
                  value={exp.location}
                  onChange={(e) => handleTextChange(idx, "location", e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={exp.remote}
                  onChange={(e) => handleCheckboxChange(idx, "remote", e.target.checked)}
                />
                <p>Remote</p>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row md:gap-5 space-y-5 md:space-y-0">
              <div className="w-full">
                <label className="text-sm">Start Date*</label>
                <input
                  type="date"
                  className="input w-full"
                  value={exp.startDate}
                  onChange={(e) => handleTextChange(idx, "startDate", e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="text-sm">End Date</label>
                <input
                  type="date"
                  className="input w-full"
                  value={exp.endDate}
                  onChange={(e) => handleTextChange(idx, "endDate", e.target.value)}
                  disabled={exp.currentlyWorking}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={exp.currentlyWorking}
                onChange={(e) => handleCheckboxChange(idx, "currentlyWorking", e.target.checked)}
              />
              <p>Currently Working</p>
            </div>
          </div>
        ))}
      </div>

      <button className="btn w-full border-dotted" onClick={addExperience}>
        + Add Another Experience
      </button>
    </div>
  );
};

export default Experience;
