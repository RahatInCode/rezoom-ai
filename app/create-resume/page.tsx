"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MoveRight, Link as LinkIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import htmlDocx from "html-docx-js/dist/html-docx";
import OurFeature from "../Components/WhyChooseUS/OurFeature";
import { AnimatePresence } from "framer-motion";

// ---------- Types ----------
interface PersonalInfo {
  FullName: string;
  Objective: string;
  Designation: string;
  Email: string;
  PhoneNumber: string;
  Location: string;
  Links: { Platform: string; Link: string }[];
}

interface EducationEntry {
  Degree: string;
  Institute: string;
  CGPA: string;
  Location: string;
  StartYear: string;
  EndYear: string;
}

interface Skills {
  TechnicalSkills: string[];
  SoftSkills: string[];
  Tools: string[];
}

interface ExperienceEntry {
  JobTitle: string;
  Company: string;
  Position: string;
  StartDate: string;
  EndDate: string;
}

interface ResumeData {
  PersonalInfo: PersonalInfo;
  Education: EducationEntry[];
  Skills: Skills;
  Experience: ExperienceEntry[];
}

// ---------- Component ----------
export default function ResumeBuild() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selection, setSelection] = useState("");
  const [resumeData, setResumeData] = useState<ResumeData>({
    PersonalInfo: {
      FullName: "",
      Objective: "",
      Designation: "",
      Email: "",
      PhoneNumber: "",
      Location: "",
      Links: [],
    },
    Education: [],
    Skills: {
      TechnicalSkills: [],
      SoftSkills: [],
      Tools: [],
    },
    Experience: [],
  });

  // ---------- Handlers ----------
  const handleModalOpen = (): void => {
    const modalBox = document.getElementById("modal") as HTMLDialogElement | null;
    if (modalBox) modalBox.showModal();
  };

  const saveAsPdf = async (resumePaper: HTMLDivElement): Promise<void> => {
    try {
      const dataUrl = await htmlToImage.toPng(resumePaper);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();

      const image = new Image();
      image.src = dataUrl;

      image.onload = () => {
        const pdfHeight = (image.height * pdfWidth) / image.width;
        pdf.addImage(image, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Resume.pdf`);
        toast.success("PDF Saved!");
        const modalBox = document.getElementById("modal") as HTMLDialogElement | null;
        if (modalBox) modalBox.close();
      };
    } catch (err) {
      toast.error("Failed to save PDF!");
    }
  };

  const saveAsDoc = async (): Promise<void> => {
    const modalBox = document.getElementById("modal") as HTMLDialogElement | null;
    const resumePaper = document.getElementById("ResumePreview") as HTMLDivElement | null;
    if (!resumePaper) {
      toast.error("Resume preview not found!");
      return;
    }

    const contentBox = `
      <html>
        <head><meta charset="utf-8"></head>
        <body>${resumePaper.innerHTML}</body>
      </html>
    `;

    const docs = htmlDocx.asBlob(contentBox);
    saveAs(docs, "Resume.docx");
    toast.success("DOC Saved!");
    if (modalBox) modalBox.close();
  };

  const handleSaveResume = (): void => {
    const resumePaper = document.getElementById("ResumePreview") as HTMLDivElement | null;
    if (!resumePaper) {
      toast.error("Something went wrong!");
      return;
    }

    if (!selection) {
      toast.error("Select an option first.");
      return;
    }

    if (selection === "pdf") {
      saveAsPdf(resumePaper);
    } else if (selection === "doc") {
      saveAsDoc();
    }
  };

  return (


<div className='w-full p-5'>

  {/* Resume saving type modal */}
  <dialog id="modal" className="modal">
    <div className="modal-box bg-white/60 backdrop-blur-lg border border-gray-200 shadow-xl rounded-xl">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div className='w-full flex flex-col space-y-4'>
        <h1 className='font-bold text-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent'>Save as</h1>

        <div className='w-full text-sm font-semibold p-3 bg-white/70 backdrop-blur-sm rounded-lg flex justify-between items-center hover:bg-white/90 transition'>
          <p>Save as PDF</p>
          <input onChange={()=> setSelection('pdf')} type="radio" name="radio-5" className="radio radio-secondary" />
        </div>

        <div className='w-full text-sm font-semibold p-3 bg-white/70 backdrop-blur-sm rounded-lg flex justify-between items-center hover:bg-white/90 transition'>
          <p>Save as Document</p>
          <input onChange={()=>setSelection('doc')} type="radio" name="radio-5" className="radio radio-secondary" />
        </div>

        <div className='w-full flex justify-end'>
          <button onClick={()=> handleSaveResume()} className='btn bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-12 hover:scale-105 transition-transform'>
            Save
          </button>
        </div>
      </div>
    </div>
  </dialog>

  <Toaster />

  {/* Header Section */}
  <div className='space-y-3 w-full text-center'>
    <motion.h1
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="font-bold text-5xl lg:text-6xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
    >
      Craft Your Dream Resume
    </motion.h1>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className='text-gray-700 text-md lg:text-lg max-w-3xl mx-auto'
    >
      Showcase your skills, experience, and achievements in a way that opens doors to your future career.
    </motion.p>
  </div>

  {/* Steps & Preview */}
  <div className='w-full flex flex-col mt-24 border-2 border-gray-200 bg-gray-50 lg:flex-row p-5 rounded-xl gap-5'>

    {/* Left Panel - Form */}
    <div className='w-full p-5 min-h-96 bg-white/70 backdrop-blur-md rounded-xl border border-gray-200 shadow-lg'>
      <ul className="steps w-full">
        <li className={`step ${currentStep >= 0 ? "step-primary text-white" : ""}`}>Personal Information</li>
        <li className={`step ${currentStep >= 1 ? "step-primary text-white" : ""}`}>Education</li>
        <li className={`step ${currentStep >= 2 ? "step-primary text-white" : ""}`}>Skills</li>
        <li className={`step ${currentStep >= 3 ? "step-primary text-white" : ""}`} data-content="4">Experience</li>
      </ul>

      <div className='w-full h-full flex flex-col items-start mt-8'>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className='w-full'
          >
            {currentStep === 0 && <PersonalInformation resumeData={resumeData} setResumeData={setResumeData} />}
            {currentStep === 1 && <EducationInfo resumeData={resumeData} setResumeData={setResumeData} />}
            {currentStep === 2 && <SkillsInfo resumeData={resumeData} setResumeData={setResumeData} />}
            {currentStep === 3 && <ExperienceInfo resumeData={resumeData} setResumeData={setResumeData} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className={`w-full mt-8 flex ${currentStep >= 1 ? 'justify-between' : 'justify-end'}`}>
          {currentStep >= 1 && <button className='btn btn-sm lg:btn-md btn-outline hover:scale-105 transition-transform' onClick={()=> setCurrentStep(currentStep -1)}>Previous</button>}
          {currentStep < 3 && <button onClick={()=>setCurrentStep(currentStep+1)} className='btn btn-primary px-12 btn-sm lg:btn-md hover:scale-105 transition-transform'>Next <MoveRight size={16} strokeWidth={0.75} /></button>}
          {currentStep === 3 && <button onClick={()=> handleModalOpen()} className='btn px-12 btn-sm btn-primary lg:btn-md hover:scale-105 transition-transform'>Save</button>}
        </div>
      </div>
    </div>

    {/* Right Panel - Live Preview */}
    <div id='ResumePreview' className='w-full min-h-96 whitespace-normal break-words rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md shadow-lg p-5 hover:scale-[1.01] transition-transform'>
      <h1 className='font-semibold text-xl text-center'>{resumeData.PersonalInfo.FullName}</h1>
      <p className='text-md text-center text-gray-700'>{resumeData.PersonalInfo.Designation}</p>

      <div className='w-full flex flex-wrap justify-center gap-5 text-sm font-thin text-center'>
        <p>{resumeData.PersonalInfo.Email}</p>
        <p>{resumeData.PersonalInfo.PhoneNumber}</p>
        <p>{resumeData.PersonalInfo.Location}</p>
      </div>

      <div className='w-full flex flex-wrap justify-center gap-3 text-sm text-blue-500 font-thin'>
        {resumeData.PersonalInfo.Links.map((link, idx) => <a key={idx} className="link" href={link.Link} target='_blank'>{link.Platform}</a>)}
      </div>

      {resumeData.PersonalInfo.Links.length > 0 && <hr className='w-full mt-3 text-gray-500' />}

      {resumeData.PersonalInfo.Objective && <p className='w-full p-1 mt-2 bg-gray-200 text-start font-medium'>Career Objective</p>}
      <p className='text-sm whitespace-normal break-words'>{resumeData.PersonalInfo.Objective}</p>

      {currentStep >= 1 && <p className='w-full p-1 mt-3 bg-gray-200 text-start'>Education</p>}
      {resumeData.Education.map((edu, idx) => (
        <div key={idx} className="mt-2">
          <p className="font-bold">{edu.Degree}</p>
          <p className="text-sm text-gray-700">{edu.Institute} | CGPA: {edu.CGPA}</p>
          <p className="text-sm text-gray-500">{edu.StartYear} - {edu.EndYear}, {edu.Location}</p>
        </div>
      ))}

      {currentStep >= 3 && <p className='w-full p-1 mt-3 bg-gray-200 text-start'>Experience</p>}
      {resumeData.Experience.map((exp, idx) => (
        <div key={idx} className="mt-2">
          <p className="font-bold">{exp.JobTitle} | {exp.Company}</p>
          <p className="text-sm text-gray-700">{exp.Position} | {exp.StartDate} - {exp.EndDate}</p>
        </div>
      ))}

      {currentStep >= 2 && <p className='w-full p-1 mt-3 bg-gray-200 text-start'>Skills</p>}
      {resumeData.Skills.TechnicalSkills.length > 0 && <h1 className='font-semibold'>Technical Skills</h1>}
      <ul>{resumeData.Skills.TechnicalSkills.map((techSkill, index) => <li key={index} className='text-xs'>{techSkill}</li>)}</ul>

      {resumeData.Skills.SoftSkills.length > 0 && <h1 className='font-semibold mt-2'>Soft Skills</h1>}
      <ul>{resumeData.Skills.SoftSkills.map((softSkill, index) => <li key={index} className='text-xs'>{softSkill}</li>)}</ul>

      {resumeData.Skills.Tools.length > 0 && <h1 className='font-semibold mt-2'>Tools & Others</h1>}
      <ul>{resumeData.Skills.Tools.map((tool, index) => <li key={index} className='text-xs'>{tool}</li>)}</ul>
    </div>
  </div>

  <div className="w-full mt-24">
    <OurFeature />
  </div>
</div>
  )
}

// ---------------- PERSONAL INFORMATION ----------------
const PersonalInformation = ({ resumeData, setResumeData }) => {
  const [inputBoxes, setInputBoxes] = useState([{ Platform: "", Link: "" }])
  return (
    <div className='w-full space-y-3'>
      <div className='w-full flex flex-col'>
        <label>Full Name</label>
        <input type="text" className='input w-full'
          placeholder='Your Name'
          value={resumeData.PersonalInfo.FullName}
          onChange={(e) =>
            setResumeData(prev => ({
              ...prev,
              PersonalInfo: { ...prev.PersonalInfo, FullName: e.target.value }
            }))
          } />
      </div>

      <div className='w-full flex flex-col'>
        <label>Email</label>
        <input type="email" className='input w-full'
          placeholder='Email'
          value={resumeData.PersonalInfo.Email}
          onChange={(e) =>
            setResumeData(prev => ({
              ...prev,
              PersonalInfo: { ...prev.PersonalInfo, Email: e.target.value }
            }))
          } />
      </div>

      <div className='w-full flex flex-col'>
        <label>Designation</label>
        <input type="text" className='input w-full'
          placeholder='Designation'
          value={resumeData.PersonalInfo.Designation}
          onChange={(e) =>
            setResumeData(prev => ({
              ...prev,
              PersonalInfo: { ...prev.PersonalInfo, Designation: e.target.value }
            }))
          } />
      </div>


      <div className='w-full flex flex-col'>
        <label>Career Objective</label>
        <input type="text" className='textarea w-full'
          placeholder='Objective (max 100 characters)'
          value={resumeData.PersonalInfo.Objective}
          onChange={(e) =>
            setResumeData(prev => ({
              ...prev,
              PersonalInfo: { ...prev.PersonalInfo, Objective: e.target.value }
            }))
          } />
      </div>

      <div className='w-full flex flex-col md:flex-row gap-3'>
        <input type="text" className='input w-full' placeholder='Phone Number'
          value={resumeData.PersonalInfo.PhoneNumber}
          onChange={e => setResumeData(prev => ({
            ...prev,
            PersonalInfo: { ...prev.PersonalInfo, PhoneNumber: e.target.value }
          }))} />
        <input type="text" className='input w-full' placeholder='Location'
          value={resumeData.PersonalInfo.Location}
          onChange={e => setResumeData(prev => ({
            ...prev,
            PersonalInfo: { ...prev.PersonalInfo, Location: e.target.value }
          }))} />
      </div>

      <div className='space-y-3'>
        {inputBoxes.map((box, idx) => (
          <div key={idx} className='flex flex-col md:flex-row gap-3'>
            <input type="text" placeholder='Platform (e.g., GitHub)' className='input w-full'
              value={resumeData.PersonalInfo.Links[idx]?.Platform || ""}
              onChange={e => {
                const newLinks = [...resumeData.PersonalInfo.Links];
                newLinks[idx] = { ...newLinks[idx], Platform: e.target.value };
                setResumeData(prev => ({
                  ...prev,
                  PersonalInfo: { ...prev.PersonalInfo, Links: newLinks }
                }));
              }} />
            <input type="text" placeholder='Link' className='input w-full'
              value={resumeData.PersonalInfo.Links[idx]?.Link || ""}
              onChange={e => {
                const newLinks = [...resumeData.PersonalInfo.Links];
                newLinks[idx] = { ...newLinks[idx], Link: e.target.value };
                setResumeData(prev => ({
                  ...prev,
                  PersonalInfo: { ...prev.PersonalInfo, Links: newLinks }
                }));
              }} />
          </div>
        ))}
        <button className='btn btn-dash w-full mt-2'
          onClick={() => {
            setInputBoxes([...inputBoxes, { Platform: "", Link: "" }])
            setResumeData(prev => ({
              ...prev,
              PersonalInfo: { ...prev.PersonalInfo, Links: [...prev.PersonalInfo.Links, { Platform: "", Link: "" }] }
            }))
          }}
        ><LinkIcon size={15} /> Add Another Link</button>
      </div>
    </div>
  )
}

// ---------------- EDUCATION ----------------
const EducationInfo = ({ resumeData, setResumeData }) => {
  const [entries, setEntries] = useState([{
    Degree: "", Institute: "", CGPA: "", Location: "", StartYear: "", EndYear: ""
  }])

  return (
    <div className='w-full space-y-3 mt-5'>
      {entries.map((edu, idx) => (
        <div key={idx} className='flex flex-col space-y-3'>
          <h2 className='font-bold'>Education {idx}</h2>
          <input type="text" placeholder='Degree' className='input w-full'
            value={resumeData.Education[idx]?.Degree || ""}
            onChange={e => {
              const newEdu = [...resumeData.Education];
              newEdu[idx] = { ...newEdu[idx], Degree: e.target.value, Institute: newEdu[idx]?.Institute || "", CGPA: newEdu[idx]?.CGPA || "", Location: newEdu[idx]?.Location || "", StartYear: newEdu[idx]?.StartYear || "", EndYear: newEdu[idx]?.EndYear || "" };
              setResumeData(prev => ({ ...prev, Education: newEdu }));
            }} />
          <input type="text" placeholder='Institute' className='input w-full'
            value={resumeData.Education[idx]?.Institute || ""}
            onChange={e => {
              const newEdu = [...resumeData.Education];
              newEdu[idx] = { ...newEdu[idx], Institute: e.target.value, Degree: newEdu[idx]?.Degree || "", CGPA: newEdu[idx]?.CGPA || "", Location: newEdu[idx]?.Location || "", StartYear: newEdu[idx]?.StartYear || "", EndYear: newEdu[idx]?.EndYear || "" };
              setResumeData(prev => ({ ...prev, Education: newEdu }));
            }} />
          <input type="number" placeholder='CGPA' className='input w-full'
            value={resumeData.Education[idx]?.CGPA || ""}
            onChange={e => {
              const newEdu = [...resumeData.Education];
              newEdu[idx] = { ...newEdu[idx], CGPA: e.target.value, Degree: newEdu[idx]?.Degree || "", Institute: newEdu[idx]?.Institute || "", Location: newEdu[idx]?.Location || "", StartYear: newEdu[idx]?.StartYear || "", EndYear: newEdu[idx]?.EndYear || "" };
              setResumeData(prev => ({ ...prev, Education: newEdu }));
            }} />
          <input type="text" placeholder='Location' className='input w-full'
            value={resumeData.Education[idx]?.Location || ""}
            onChange={e => {
              const newEdu = [...resumeData.Education];
              newEdu[idx] = { ...newEdu[idx], Location: e.target.value, Degree: newEdu[idx]?.Degree || "", Institute: newEdu[idx]?.Institute || "", CGPA: newEdu[idx]?.CGPA || "", StartYear: newEdu[idx]?.StartYear || "", EndYear: newEdu[idx]?.EndYear || "" };
              setResumeData(prev => ({ ...prev, Education: newEdu }));
            }} />
            <div className='w-full flex flex-col md:flex-row space-y-3 md:gap-3'>
            <input type="date" placeholder='Start Year' className='input w-full'
            value={resumeData.Education[idx]?.StartYear || ""}
            onChange={e => {
              const newEdu = [...resumeData.Education];
              newEdu[idx] = { ...newEdu[idx], StartYear: e.target.value, Degree: newEdu[idx]?.Degree || "", Institute: newEdu[idx]?.Institute || "", CGPA: newEdu[idx]?.CGPA || "", Location: newEdu[idx]?.Location || "", EndYear: newEdu[idx]?.EndYear || "" };
              setResumeData(prev => ({ ...prev, Education: newEdu }));
            }} />
          <input type="date" placeholder='End Year' className='input w-full'
            value={resumeData.Education[idx]?.EndYear || ""}
            onChange={e => {
              const newEdu = [...resumeData.Education];
              newEdu[idx] = { ...newEdu[idx], EndYear: e.target.value, Degree: newEdu[idx]?.Degree || "", Institute: newEdu[idx]?.Institute || "", CGPA: newEdu[idx]?.CGPA || "", Location: newEdu[idx]?.Location || "", StartYear: newEdu[idx]?.StartYear || "" };
              setResumeData(prev => ({ ...prev, Education: newEdu }));
            }} />
            </div>
        </div>
      ))}
      <button className='btn btn-dash w-full mt-2' onClick={() => {
        setEntries([...entries, { Degree: "", Institute: "", CGPA: "", Location: "", StartYear: "", EndYear: "" }])
        setResumeData(prev => ({ ...prev, Education: [...prev.Education, { Degree: "", Institute: "", CGPA: "", Location: "", StartYear: "", EndYear: "" }] }))
      }}>Add Education</button>
    </div>
  )
}

// ---------------- SKILLS ----------------
const SkillsInfo = ({ resumeData, setResumeData }) => {
  const [techSkills, setTechSkills] = useState([""]);
  const [softSkills, setSoftSkills] = useState([""]);
  const [tools, setTools] = useState([""]);

const handleArrayChange = (arrName, idx, value) => {
  setResumeData(prev => {
    const newArr = [...prev.Skills[arrName]];
    newArr[idx] = value; // update the value at the correct index
    return {
      ...prev,
      Skills: {
        ...prev.Skills,
        [arrName]: newArr
      }
    }
  })
};


  return (
    <div className='w-full space-y-3 mt-5'>
      <div>
        <label>Technical Skills</label>
        {techSkills.map((_, idx) => (
          <div className='w-full ' key={idx}>
          <input
            key={idx}
            type="text"
            className='input w-full mb-2'
            placeholder={`Skill ${idx + 1}`}
            value={resumeData.Skills.TechnicalSkills[idx] || ""}
            onChange={e => handleArrayChange("TechnicalSkills", idx, e.target.value)}
          />
          {/* <p onClick={()=> setTechSkills( prev =>  prev.filter( (_, index)=> index!=idx ) ) } className='text-end link link-hover text-sm flex justify-end'>Clear <X size={16} strokeWidth={0.75} absoluteStrokeWidth /> </p> */}
          </div>
        ))}
        <button
          className='btn btn-dash w-full'
          onClick={() => {
            setTechSkills([...techSkills, ""]);
            setResumeData(prev => ({
              ...prev,
              Skills: { ...prev.Skills, TechnicalSkills: [...prev.Skills.TechnicalSkills, ""] }
            }));
          }}
        >Add Technical Skill</button>
      </div>

      <div>
        <label>Soft Skills</label>
        {softSkills.map((_, idx) => (
          <input
            key={idx}
            type="text"
            className='input w-full mb-2'
            placeholder={`Soft Skill ${idx + 1}`}
            value={resumeData.Skills.SoftSkills[idx] || ""}
            onChange={e => handleArrayChange("SoftSkills", idx, e.target.value)}
          />
        ))}
        <button
          className='btn btn-dash w-full'
          onClick={() => {
            setSoftSkills([...softSkills, ""]);
            setResumeData(prev => ({
              ...prev,
              Skills: { ...prev.Skills, SoftSkills: [...prev.Skills.SoftSkills, ""] }
            }));
          }}
        >Add Soft Skill</button>
      </div>

      <div>
        <label>Tools</label>
        {tools.map((_, idx) => (
          <input
            key={idx}
            type="text"
            className='input w-full mb-2'
            placeholder={`Tool ${idx + 1}`}
            value={resumeData.Skills.Tools[idx] || ""}
            onChange={e => handleArrayChange("Tools", idx, e.target.value)}
          />
        ))}
        <button
          className='btn btn-dash w-full'
          onClick={() => {
            setTools([...tools, ""]);
            setResumeData(prev => ({
              ...prev,
              Skills: { ...prev.Skills, Tools: [...prev.Skills.Tools, ""] }
            }));
          }}
        >Add Tool</button>
      </div>
    </div>
  );
};

// ---------------- EXPERIENCE ----------------
const ExperienceInfo = ({ resumeData, setResumeData }) => {
  const [entries, setEntries] = useState([{
    JobTitle: "", Company: "", Position: "", StartDate: "", EndDate: ""
  }])

  return (
    <div className='w-full space-y-3 mt-5'>
      <h2 className='font-bold'>Experience</h2>
      {entries.map((exp, idx) => (
        <div key={idx} className='flex flex-col space-y-3'>
          <input type="text" placeholder='Job Title' className='input w-full'
            value={resumeData.Experience[idx]?.JobTitle || ""}
            onChange={e => {
              const newExp = [...resumeData.Experience];
              newExp[idx] = { ...newExp[idx], JobTitle: e.target.value, Company: newExp[idx]?.Company || "", Position: newExp[idx]?.Position || "", StartDate: newExp[idx]?.StartDate || "", EndDate: newExp[idx]?.EndDate || "" };
              setResumeData(prev => ({ ...prev, Experience: newExp }))
            }} />
          <input type="text" placeholder='Company' className='input w-full'
            value={resumeData.Experience[idx]?.Company || ""}
            onChange={e => {
              const newExp = [...resumeData.Experience];
              newExp[idx] = { ...newExp[idx], Company: e.target.value, JobTitle: newExp[idx]?.JobTitle || "", Position: newExp[idx]?.Position || "", StartDate: newExp[idx]?.StartDate || "", EndDate: newExp[idx]?.EndDate || "" };
              setResumeData(prev => ({ ...prev, Experience: newExp }))
            }} />
          <input type="text" placeholder='Position' className='input w-full'
            value={resumeData.Experience[idx]?.Position || ""}
            onChange={e => {
              const newExp = [...resumeData.Experience];
              newExp[idx] = { ...newExp[idx], Position: e.target.value, JobTitle: newExp[idx]?.JobTitle || "", Company: newExp[idx]?.Company || "", StartDate: newExp[idx]?.StartDate || "", EndDate: newExp[idx]?.EndDate || "" };
              setResumeData(prev => ({ ...prev, Experience: newExp }))
            }} />
          <div className='w-full flex flex-col md:flex-row space-y-3 md:gap-3'>
            <input type="date" placeholder='Start Date' className='input w-full'
            value={resumeData.Experience[idx]?.StartDate || ""}
            onChange={e => {
              const newExp = [...resumeData.Experience];
              newExp[idx] = { ...newExp[idx], StartDate: e.target.value, JobTitle: newExp[idx]?.JobTitle || "", Company: newExp[idx]?.Company || "", Position: newExp[idx]?.Position || "", EndDate: newExp[idx]?.EndDate || "" };
              setResumeData(prev => ({ ...prev, Experience: newExp }))
            }} />
          <input type="date" placeholder='End Date' className='input w-full'
            value={resumeData.Experience[idx]?.EndDate || ""}
            onChange={e => {
              const newExp = [...resumeData.Experience];
              newExp[idx] = { ...newExp[idx], EndDate: e.target.value, JobTitle: newExp[idx]?.JobTitle || "", Company: newExp[idx]?.Company || "", Position: newExp[idx]?.Position || "", StartDate: newExp[idx]?.StartDate || "" };
              setResumeData(prev => ({ ...prev, Experience: newExp }))
            }} />
          </div>
        </div>
      ))}
      <button className='btn btn-dash w-full mt-2' onClick={() => {
        setEntries([...entries, { JobTitle: "", Company: "", Position: "", StartDate: "", EndDate: "" }])
        setResumeData(prev => ({ ...prev, Experience: [...prev.Experience, { JobTitle: "", Company: "", Position: "", StartDate: "", EndDate: "" }] }))
      }}>Add Experience</button>
    </div>
  )
}
