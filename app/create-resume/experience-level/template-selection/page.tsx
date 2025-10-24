"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // App Router
import toast, { Toaster } from "react-hot-toast";

type Template = {
  id: string;
  name: string;
  image: string;
  description: string;
  isWithPhoto: boolean;
  isTwoColoumn: boolean;
};

const TemplateSelector: React.FC = () => {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    withPhoto: false,
    withoutPhoto: false,
    oneColumn: false,
    twoColumn: false,
  });

  useEffect(() => {
    fetch("/resume-templates.json")
      .then((res) => res.json())
      .then((data) => setTemplates(data || []))
      .catch((err) => console.error("Failed to load templates:", err));
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

  // Filter templates
  const filteredTemplates = templates.filter((t) => {
    const photoFilterActive = filters.withPhoto || filters.withoutPhoto;
    const photoMatch =
      !photoFilterActive ||
      (t.isWithPhoto && filters.withPhoto) ||
      (!t.isWithPhoto && filters.withoutPhoto);

    const columnFilterActive = filters.oneColumn || filters.twoColumn;
    const columnMatch =
      !columnFilterActive ||
      (!t.isTwoColoumn && filters.oneColumn) ||
      (t.isTwoColoumn && filters.twoColumn);

    return photoMatch && columnMatch;
  });

  // Determine grid columns based on layout filter
  const getGridCols = () => {
    if (filters.oneColumn && !filters.twoColumn) return "grid-cols-1";
    if (!filters.oneColumn && filters.twoColumn) return "grid-cols-2";
    if (filters.oneColumn && filters.twoColumn) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
  };

  const handleNext = () => {
    if (selectedTemplateId) {
      router.push(`/create-resume/experience-level/template-selection/${selectedTemplateId}`);
    } else {
      toast.error("Please select a template first!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Toaster />
      {/* Sidebar Filters */}
      <div className="w-64 p-4 bg-white shadow-md">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        <div className="mb-4">
          <h3 className="font-medium mb-2">Photo</h3>
          <label className="flex items-center mb-1">
            <input
              type="checkbox"
              name="withPhoto"
              checked={filters.withPhoto}
              onChange={handleFilterChange}
              className="mr-2"
            />
            With Photo
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="withoutPhoto"
              checked={filters.withoutPhoto}
              onChange={handleFilterChange}
              className="mr-2"
            />
            Without Photo
          </label>
        </div>

        <div>
          <h3 className="font-medium mb-2">Layout</h3>
          <label className="flex items-center mb-1">
            <input
              type="checkbox"
              name="oneColumn"
              checked={filters.oneColumn}
              onChange={handleFilterChange}
              className="mr-2"
            />
            1 Column
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="twoColumn"
              checked={filters.twoColumn}
              onChange={handleFilterChange}
              className="mr-2"
            />
            2 Column
          </label>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Select a Resume Template</h1>
        <div className={`grid gap-6 ${getGridCols()}`}>
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplateId(template.id)}
              className={`cursor-pointer border-4 rounded-lg overflow-hidden transition-transform hover:scale-105
                ${selectedTemplateId === template.id ? "border-blue-500" : "border-transparent"}`}
            >
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-64 object-contain"
              />
              <div className="p-2 text-center font-medium">{template.name}</div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedTemplateId}
          className={`mt-6 px-6 py-3 text-white font-semibold rounded-lg transition 
            ${selectedTemplateId ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TemplateSelector;
