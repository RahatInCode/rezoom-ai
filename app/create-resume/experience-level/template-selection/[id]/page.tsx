"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Info from "../../../../Components/Resume-Create-Forms/Personal-Info/Info";
import Education, { EducationData } from "../../../../Components/Resume-Create-Forms/Education/Education";
import Skill, { SkillData } from "../../../../Components/Resume-Create-Forms/Skills/Skill";
import Experience, { ExperienceData } from "../../../../Components/Resume-Create-Forms/Experience/Experience";
import Others, { OthersData } from "../../../../Components/Resume-Create-Forms/Others/Others";
import { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";
import Classic from "../../../../Components/Templates/Classic";
import Modern from "../../../../Components/Templates/Modern";
import Elegant from "../../../../Components/Templates/Elegant";
import Creative from "../../../../Components/Templates/Creative";
import Corporate from "../../../../Components/Templates/Corporate";
import Simple from "../../../../Components/Templates/Simple";
import ModernBlock from "../../../../Components/Templates/ModernBlock";
import Stylish from "../../../../Components/Templates/Stylish";
import Smart from "../../../../Components/Templates/Smart";
import { Save } from "lucide-react";
import domtoimage from "dom-to-image-more";
import { jsPDF } from "jspdf";

// Type for Resume Template
type ResumeTemplateType = {
  id: string;
  name: string;
  description: string;
  category?: string;
};

// Type for Personal Info
type PersonalInfoType = {
  name: string;
  role: string;
  surname: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  photo?: string;
  objective: string;
};

const Page = () => {
  const { id } = useParams();

  // States
  const [ResumeData, setResumeData] = useState<ResumeTemplateType[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplateType | null>(null);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>({
    name: "",
    role: "",
    surname: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    photo: "",
    objective: "",
  });

  const [educations, setEducations] = useState<EducationData[]>([
    { degree: "", institute: "", startDate: "", endDate: "", currentlyStudying: false, cgpa: "" },
  ]);

  const [skills, setSkills] = useState<SkillData>({
    technicalSkills: [""],
    softSkills: [""],
  });

  const [experiences, setExperiences] = useState<ExperienceData[]>([
    { title: "", employer: "", location: "", remote: false, startDate: "", endDate: "", currentlyWorking: false },
  ]);

  const [others, setOthers] = useState<OthersData>({
    references: [""],
    languages: [""],
    achievements: [""],
  });

  // Fetch resume templates
  useEffect(() => {
    fetch("/resume-templates.json")
      .then((res) => res.json())
      .then((data: ResumeTemplateType[]) => setResumeData(data || []));
  }, []);

  // Select template based on ID
  useEffect(() => {
    if (ResumeData.length > 0 && id) {
      const selected = ResumeData.find((resume) => resume.id === id) || null;
      setSelectedTemplate(selected);
    }
  }, [ResumeData, id]);

  // Steps & components
  const steps = ["Basic Info", "Education", "Skills", "Experience", "Others"];
  const components = [
    <Info key="info" personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />,
    <Education key="education" educations={educations} setEducations={setEducations} />,
    <Skill key="skill" skills={skills} setSkills={setSkills} />,
    <Experience key="experience" experiences={experiences} setExperiences={setExperiences} />,
    <Others key="others" others={others} setOthers={setOthers} />,
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const animationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const contentRef = useRef<HTMLDivElement>(null);

  const ShowResumePreview = () => {
    const modal = document.getElementById("modal") as HTMLDialogElement | null;
    if (modal) modal.show();
  };

  const saveAsPDF = async () => {
    if (!contentRef.current) return;

    try {
      const dataUrl = await domtoimage.toPng(contentRef.current, { bgcolor: "#ffffff" });
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (contentRef.current.offsetHeight * pdfWidth) / contentRef.current.offsetWidth;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  return (
    <div className="w-full h-fit overflow-hidden md:min-h-screen flex flex-col md:flex-row">
      <Toaster />
      <div className="w-full md:w-1/5 bg-gradient-to-r from-pink-500 to-blue-600 text-white flex flex-col justify-start items-center md:items-start p-5 md:h-screen sticky top-0">
        <ul className="steps md:steps-vertical w-full max-w-full md:max-w-xl">
          {steps.map((step, idx) => (
            <li key={idx} className={`step text-sm md:text-md text-start ${idx <= currentStep ? "step-primary" : ""}`}>
              {step}
            </li>
          ))}
        </ul>
      </div>

      <dialog id="modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div ref={contentRef} className="w-full">
            {selectedTemplate?.name.includes("Classic") && <Classic contentRef={contentRef} personalInfo={personalInfo} educations={educations} skills={skills} experiences={experiences} others={others} />}
            {selectedTemplate?.name.includes("Modern") && <Modern contentRef={contentRef} personalInfo={personalInfo} educations={educations} skills={skills} experiences={experiences} others={others} />}
            {selectedTemplate?.name.includes("Elegant") && <Elegant contentRef={contentRef} personalInfo={personalInfo} educations={educations} skills={skills} experiences={experiences} others={others} />}
            {selectedTemplate?.name.includes("Creative") && <Creative contentRef={contentRef} personalInfo={personalInfo} educations={educations} skills={skills} experiences={experiences} others={others} />}
            {selectedTemplate?.name.includes("Blocks") && <ModernBlock contentRef={contentRef} personalInfo={personalInfo} educations={educations} skills={skills} experiences={experiences} others={others} />}
            {selectedTemplate?.name.includes("Stylish") && <Stylish contentRef={contentRef} personalInfo={personalInfo} educations={educations} skills={skills} experiences={experiences} others={others} />}
            {selectedTemplate?.name.includes("Simple") && <Simple contentRef={contentRef} personalInfo={personalInfo} educations={educations} skills={skills} experiences={experiences} others={others} />}
            {selectedTemplate?.name.includes("Corporate") && <Corporate contentRef={contentRef} personalInfo={personalInfo} educations={educations} skills={skills} experiences={experiences} others={others} />}
            {selectedTemplate?.name.includes("Smart") && <Smart contentRef={contentRef} personalInfo={personalInfo} educations={educations} skills={skills} experiences={experiences} others={others} />}
          </div>

          <div className="modal-action flex justify-between">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <button onClick={saveAsPDF} className="btn btn-primary">
              Save as PDF <Save size={15} />
            </button>
          </div>
        </div>
      </dialog>

      <div className="w-full md:w-4/5 bg-white p-5 md:p-8 xl:p-12 flex flex-col gap-5 overflow-y-auto max-h-screen">
        {currentStep > 0 && (
          <p className="cursor-pointer text-blue-600 hover:underline font-semibold mb-3" onClick={prevStep}>
            &larr; Go Back
          </p>
        )}

        <AnimatePresence mode="wait">
          <motion.div key={currentStep} variants={animationVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            {components[currentStep]}
          </motion.div>
        </AnimatePresence>

        <div className="w-full flex justify-end gap-3 mt-5">
          {currentStep >= 0 && (
            <button onClick={ShowResumePreview} className="btn btn-primary btn-outline">
              Preview
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button onClick={nextStep} className="btn bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-12">
              Next
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button onClick={saveAsPDF} className="btn btn-primary px-12">
              Save as PDF <Save size={15} />
            </button>
          )}
        </div>

        <div className="text-sm text-center mt-3">
          <p>
            The results are based on a study with over 1000 participants, among whom 287 used resume tools provided on our family sites.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
