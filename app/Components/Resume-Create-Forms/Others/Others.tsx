"use client";
import React from "react";
import { X } from "lucide-react";

export interface OthersData {
  references: string[];
  languages: string[];
  achievements: string[];
}

interface OthersProps {
  others: OthersData;
  setOthers: React.Dispatch<React.SetStateAction<OthersData>>;
}

const Others: React.FC<OthersProps> = ({ others, setOthers }) => {
  // --- Handle text change for each category ---
  const handleChange = (
    field: keyof OthersData,
    index: number,
    value: string
  ) => {
    const updated = [...others[field]];
    updated[index] = value;
    setOthers((prev) => ({ ...prev, [field]: updated }));
  };

  // --- Add new item ---
  const addItem = (field: keyof OthersData) => {
    setOthers((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  // --- Remove item ---
  const removeItem = (field: keyof OthersData, index: number) => {
    const updated = others[field].filter((_, i) => i !== index);
    setOthers((prev) => ({ ...prev, [field]: updated.length ? updated : [""] }));
  };

  return (
    <div className="w-full space-y-8">
      <p className="font-bold text-4xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
        Additional Information
      </p>

      {/* Languages */}
      <div className="p-5 border rounded-lg bg-white space-y-5">
        <p className="font-semibold text-lg text-gray-700">Languages</p>
        {others.languages.map((lang, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Enter language"
              className="input input-bordered w-full"
              value={lang}
              onChange={(e) => handleChange("languages", idx, e.target.value)}
            />
            {others.languages.length > 1 && (
              <X
                size={20}
                className="cursor-pointer text-gray-500 hover:text-red-500"
                onClick={() => removeItem("languages", idx)}
              />
            )}
          </div>
        ))}
        <button
          className="btn w-full border-dotted"
          onClick={() => addItem("languages")}
        >
          + Add Another Language
        </button>
      </div>

      {/* Achievements */}
      <div className="p-5 border rounded-lg bg-white space-y-5">
        <p className="font-semibold text-lg text-gray-700">Achievements</p>
        {others.achievements.map((ach, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Enter achievement"
              className="input input-bordered w-full"
              value={ach}
              onChange={(e) => handleChange("achievements", idx, e.target.value)}
            />
            {others.achievements.length > 1 && (
              <X
                size={20}
                className="cursor-pointer text-gray-500 hover:text-red-500"
                onClick={() => removeItem("achievements", idx)}
              />
            )}
          </div>
        ))}
        <button
          className="btn w-full border-dotted"
          onClick={() => addItem("achievements")}
        >
          + Add Another Achievement
        </button>
      </div>

      {/* References */}
      <div className="p-5 border rounded-lg bg-white space-y-5">
        <p className="font-semibold text-lg text-gray-700">References</p>
        {others.references.map((ref, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Enter reference (e.g., John Doe, CEO at XYZ)"
              className="input input-bordered w-full"
              value={ref}
              onChange={(e) => handleChange("references", idx, e.target.value)}
            />
            {others.references.length > 1 && (
              <X
                size={20}
                className="cursor-pointer text-gray-500 hover:text-red-500"
                onClick={() => removeItem("references", idx)}
              />
            )}
          </div>
        ))}
        <button
          className="btn w-full border-dotted"
          onClick={() => addItem("references")}
        >
          + Add Another Reference
        </button>
      </div>
    </div>
  );
};

export default Others;