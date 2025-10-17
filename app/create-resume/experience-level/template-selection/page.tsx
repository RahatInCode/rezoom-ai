"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// ✅ Type Definitions
interface ResumeTemplate {
  id: string;
  image: string;
  name: string;
  description: string;
  isWithPhoto: boolean;
  isTwoColoumn: boolean;
}

interface TemplateCardProps {
  resum: ResumeTemplate;
  setTemplateSelect: (id: string) => void;
  templateSelect: string | null;
}

const Page: React.FC = () => {
  const [allResumes, setAllResumes] = useState<ResumeTemplate[]>([]);
  const [resumes, setResumes] = useState<ResumeTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [templateSelect, setTemplateSelect] = useState<string | null>(null);
  const [isCheck, setChecked] = useState({
    WithPhoto: false,
    NoPhoto: false,
    OneCol: false,
    TwoCol: false,
  });

  // ✅ Fetch all templates
  const getAllResumes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/resume-templates.json");
      const data: ResumeTemplate[] = await res.json();
      setAllResumes(data || []);
      setResumes(data || []);
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllResumes();
  }, []);

  // ✅ Apply filters
  const applyFilter = (updated: typeof isCheck) => {
    let filtered = allResumes;

    if (updated.WithPhoto) filtered = filtered.filter((r) => r.isWithPhoto);
    if (updated.NoPhoto) filtered = filtered.filter((r) => !r.isWithPhoto);
    if (updated.OneCol) filtered = filtered.filter((r) => !r.isTwoColoumn);
    if (updated.TwoCol) filtered = filtered.filter((r) => r.isTwoColoumn);

    setResumes(filtered);
  };

  // ✅ Checkbox handler
  const handleCheckBoxOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const updated = { ...isCheck, [name]: checked };
    setChecked(updated);
    applyFilter(updated);
  };

  // ✅ Clear filter
  const handleClearFilter = () => {
    const reset = {
      WithPhoto: false,
      NoPhoto: false,
      OneCol: false,
      TwoCol: false,
    };
    setChecked(reset);
    setResumes(allResumes);
  };

  return (
    <div className="w-full p-7 lg:p-12 3xl:p-18 min-h-[calc(100vh-60px)]">
      <h1 className="text-center text-5xl">
        Here Is The Best Templates For You
      </h1>
      <p className="mb-8 mt-3 text-lg text-center">
        We'll find the best templates for your experience level.
      </p>

      <div className="flex flex-col gap-2 md:flex-row justify-center w-full">
        {/* Filter bar for small devices */}
        <div className="w-full h-fit p-2 flex md:hidden justify-end bg-base-200">
          <Menu />
          <X />
        </div>

        {/* Sidebar Filters */}
        <div className="w-1/4 space-y-5 hidden md:flex flex-col min-h-96 p-1">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Filters</p>
            <button onClick={handleClearFilter} className="link">
              clear filter
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            <h1 className="text-lg font-semibold">Headshot</h1>
            <label className="flex text-sm items-center gap-3">
              <input
                name="WithPhoto"
                type="checkbox"
                checked={isCheck.WithPhoto}
                onChange={handleCheckBoxOnChange}
                className="checkbox checkbox-sm"
              />
              <span>With Photo</span>
            </label>
            <label className="flex text-sm items-center gap-3">
              <input
                name="NoPhoto"
                type="checkbox"
                checked={isCheck.NoPhoto}
                onChange={handleCheckBoxOnChange}
                className="checkbox checkbox-sm"
              />
              <span>Without Photo</span>
            </label>
          </div>

          <div className="flex flex-col space-y-2">
            <h1 className="text-lg font-semibold">Columns</h1>
            <label className="flex text-sm items-center gap-3">
              <input
                name="OneCol"
                type="checkbox"
                checked={isCheck.OneCol}
                onChange={handleCheckBoxOnChange}
                className="checkbox checkbox-sm"
              />
              <span>One Column</span>
            </label>
            <label className="flex text-sm items-center gap-3">
              <input
                name="TwoCol"
                type="checkbox"
                checked={isCheck.TwoCol}
                onChange={handleCheckBoxOnChange}
                className="checkbox checkbox-sm"
              />
              <span>Two Column</span>
            </label>
          </div>
        </div>

        {/* Resume Templates */}
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <span className="loading loading-spinner"></span>
          </div>
        ) : (
          <div className="w-full md:w-3/4 min-h-96 justify-items-center space-y-5 md:space-y-0 gap-5 md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
            {resumes.map((resum) => (
              <TemplateCard
                key={resum.id}
                resum={resum}
                templateSelect={templateSelect}
                setTemplateSelect={setTemplateSelect}
              />
            ))}
          </div>
        )}
      </div>

      {/* Next button */}
      {templateSelect && (
        <div className="w-full mt-12 flex justify-center md:justify-end items-center">
          <Link
            href={`/create-resume/experience-level/template-selection/${templateSelect}`}
            className="btn btn-primary btn-outline px-12"
          >
            Next <ArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;

// ✅ Template Card Component
const TemplateCard: React.FC<TemplateCardProps> = ({
  resum,
  setTemplateSelect,
  templateSelect,
}) => {
  return (
    <div
      onClick={() => setTemplateSelect(resum.id)}
      className={`w-3/4 md:w-full min-h-96 border-2 ${
        templateSelect === resum.id ? "border-blue-500" : "border-gray-600"
      }`}
    >
      <Image
        alt={resum.name}
        width={500}
        height={700}
        quality={100}
        className="w-full h-full hover:cursor-pointer object-cover"
        src={resum.image}
      />
    </div>
  );
};
