"use client";
import { X } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface EducationData {
  degree: string;
  institute: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  cgpa: string;
}

interface EducationProps {
  educations: EducationData[];
  setEducations: React.Dispatch<React.SetStateAction<EducationData[]>>;
}

const Education: React.FC<EducationProps> = ({ educations, setEducations }) => {
  const handleChange = (
    index: number,
    field: keyof EducationData,
    value: string | boolean
  ) => {
    const updated = [...educations];
    updated[index] = {
      ...updated[index],
      [field]: value as EducationData[typeof field],
    };
    setEducations(updated);
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        degree: "",
        institute: "",
        startDate: "",
        endDate: "",
        currentlyStudying: false,
        cgpa: "",
      },
    ]);
  };

  const removeEducation = (index: number) => {
    const updated = educations.filter((_, i) => i !== index);
    setEducations(
      updated.length
        ? updated
        : [
            {
              degree: "",
              institute: "",
              startDate: "",
              endDate: "",
              currentlyStudying: false,
              cgpa: "",
            },
          ]
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-3 text-start">
        <p className="font-bold text-5xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Tell us about your education
        </p>
        <p className="text-xl font-semibold text-gray-700">
          We’ll start with your latest education
        </p>
      </div>

      {/* Education Fields */}
      <AnimatePresence>
        {educations.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full p-5 border rounded-lg bg-white space-y-5 shadow-sm"
          >
            {educations.length > 1 && (
              <X
                size={20}
                className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-red-500 transition"
                onClick={() => removeEducation(idx)}
              />
            )}

            <div className="flex flex-col md:flex-row md:gap-5 space-y-5 md:space-y-0">
              <div className="w-full">
                <label className="text-sm">Degree Name*</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Degree Name"
                  value={edu.degree}
                  onChange={(e) =>
                    handleChange(idx, "degree", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-sm">Institute*</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Institute Name"
                  value={edu.institute}
                  onChange={(e) =>
                    handleChange(idx, "institute", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-5 space-y-5 md:space-y-0">
              <div className="w-full">
                <label className="text-sm">Start Date*</label>
                <input
                  type="date"
                  className="input w-full"
                  value={edu.startDate}
                  onChange={(e) =>
                    handleChange(idx, "startDate", e.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-sm">End Date</label>
                <input
                  type="date"
                  className="input w-full"
                  value={edu.endDate}
                  onChange={(e) =>
                    handleChange(idx, "endDate", e.target.value)
                  }
                  disabled={edu.currentlyStudying}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={edu.currentlyStudying}
                onChange={(e) =>
                  handleChange(idx, "currentlyStudying", e.target.checked)
                }
              />
              <p>Currently Studying</p>
            </div>

            <div className="w-full">
              <label className="text-sm">CGPA</label>
              <input
                type="text"
                className="input w-full"
                placeholder="CGPA"
                value={edu.cgpa}
                onChange={(e) => handleChange(idx, "cgpa", e.target.value)}
                disabled={edu.currentlyStudying}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.98 }}
        className="btn w-full border-dotted"
        onClick={addEducation}
      >
        + Add Another Education
      </motion.button>
    </div>
  );
};

export default Education;
