"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

const Skill = () => {
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([""]);
  const [softSkills, setSoftSkills] = useState<string[]>([""]);

  const addTechnicalSkill = () => setTechnicalSkills([...technicalSkills, ""]);
  const addSoftSkill = () => setSoftSkills([...softSkills, ""]);

  const handleTechnicalChange = (index: number, value: string) => {
    const updated = [...technicalSkills];
    updated[index] = value;
    setTechnicalSkills(updated);
  };

  const handleSoftChange = (index: number, value: string) => {
    const updated = [...softSkills];
    updated[index] = value;
    setSoftSkills(updated);
  };

  const removeTechnicalSkill = (index: number) => {
    const updated = technicalSkills.filter((_, i) => i !== index);
    setTechnicalSkills(updated.length ? updated : [""]); // prevent empty array
  };

  const removeSoftSkill = (index: number) => {
    const updated = softSkills.filter((_, i) => i !== index);
    setSoftSkills(updated.length ? updated : [""]);
  };

  return (
    <div className="w-full space-y-6">
      {/* Technical Skills */}
      <div className="w-full p-5 space-y-3 border rounded-lg bg-white">
        <p className="font-bold text-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Technical Skills
        </p>
        {technicalSkills.map((skill, idx) => (
          <div key={idx} className="relative w-full">
            <input
              type="text"
              placeholder="Enter technical skill"
              className="input input-bordered w-full pr-10"
              value={skill}
              onChange={(e) => handleTechnicalChange(idx, e.target.value)}
            />
            {technicalSkills.length > 1 && (
              <X
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-red-500"
                size={20}
                onClick={() => removeTechnicalSkill(idx)}
              />
            )}
          </div>
        ))}
        <button className="btn w-full border-dotted mt-2" onClick={addTechnicalSkill}>
          + Add Another Technical Skill
        </button>
      </div>

      {/* Soft Skills */}
      <div className="w-full p-5 space-y-3 border rounded-lg bg-white">
        <p className="font-bold text-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Soft Skills
        </p>
        {softSkills.map((skill, idx) => (
          <div key={idx} className="relative w-full">
            <input
              type="text"
              placeholder="Enter soft skill"
              className="input input-bordered w-full pr-10"
              value={skill}
              onChange={(e) => handleSoftChange(idx, e.target.value)}
            />
            {softSkills.length > 1 && (
              <X
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-red-500"
                size={20}
                onClick={() => removeSoftSkill(idx)}
              />
            )}
          </div>
        ))}
        <button className="btn w-full border-dotted mt-2" onClick={addSoftSkill}>
          + Add Another Soft Skill
        </button>
      </div>
    </div>
  );
};

export default Skill;
