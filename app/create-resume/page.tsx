"use client";

import React, { useState } from "react";
import { MoveRight, Link as LinkIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import htmlDocx from "html-docx-js/dist/html-docx";

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
      console.error("PDF Save Error:", err);
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

{/* Resume saving type modal code */}
      <dialog id="modal" className="modal ">
        <div className="modal-box bg-gray-100">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className='w-full flex flex-col space-y-2'>
              {/* options are here */}
              <h1 className='font-bold text-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent'>Save as</h1>
              <div className='w-full text-sm font-semibold p-2 bg-white py-4 rounded-lg flex justify-between items-center'>
                  <p>Save as PDF</p>
                  <input onChange={()=> setSelection('pdf')}  type="radio" name="radio-5" className="radio radio-secondary" />
              </div>
               <div className='w-full text-sm font-semibold flex p-2 py-4 bg-white rounded-lg justify-between items-center'>
                  <p>Save as Document</p>
                  <input onChange={()=>setSelection('doc')} type="radio" name="radio-5" className="radio radio-secondary" />
              </div>
              <div className='w-full flex justify-end items-center'>
                  <button onClick={()=> handleSaveResume()} className='btn btn-sm bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-12'>
                    Save
                  </button>
              </div>
          </div>
        </div>
      </dialog>

      <Toaster />
      <div className='space-y-3 w-full text-center'>
        <h1 className="font-bold text-5xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Craft Your Dream Resume
        </h1>
        <p>Showcase your skills, experience, and achievements in a way that opens doors to your future career.</p>
      </div>

      <div className='w-full flex flex-col mt-24 border-2 space-y-4 lg:gap-5 border-gray-200 bg-gray-100 lg:flex-row p-5 rounded-lg shadow-xl shadow-gray-400 '>
        <div className='w-full p-5  min-h-96 bg-white rounded-md border-1 border-gray-300 '>
          <ul className="steps w-full mx-auto">
            <li className={`step ${currentStep >= 0 ? "step-info" : "" } `}>Personal Information</li>
            <li className={`step ${currentStep >= 1  ? "step-info" : "" }`}>Education</li>
            <li className={`step ${currentStep >= 2 ? "step-info" : "" }`}>Skills</li>
            <li className={`step ${currentStep >= 3 ? "step-info" : "" }`} data-content="4">Experience</li>
          </ul>

          <div className='w-full h-full flex flex-col items-start mt-8 '>
            {currentStep === 0 && <PersonalInformation resumeData={resumeData} setResumeData={setResumeData} />}
            {currentStep === 1 && <EducationInfo resumeData={resumeData} setResumeData={setResumeData} />}
            {currentStep === 2 && <SkillsInfo resumeData={resumeData} setResumeData={setResumeData} />}
            {currentStep === 3 && <ExperienceInfo resumeData={resumeData} setResumeData={setResumeData} />}
  
            <div className={`w-full ${currentStep >=1 ? 'justify-between' : 'justify-end '}  flex mt-18 `}>
              {
                currentStep >= 1 && <button className='btn btn-sm lg:btn-md btn-outline' onClick={()=> setCurrentStep(currentStep -1)}>Previous</button>
              }
                {
                  currentStep < 3 &&
                  <button
                onClick={()=>setCurrentStep(currentStep+1)}
                className='btn btn-primary px-12 btn-sm xl:btn-md '>Next <MoveRight size={16} strokeWidth={0.75} /></button>
                }
                {
                  currentStep === 3 &&
                  <button
                onClick={()=> handleModalOpen()}
                className='btn px-12 btn-sm btn-primary  lg:btn-md'>Save</button>
                }
            </div>
          </div>
        </div>
        {/* ajke kaj holo jokhon onek gula text hoye jay seta jate new line e jay seta ensure kora and div er w jate na bare */}
          {/* Preview Box to show resume live preview to user */}
        <div id='ResumePreview'  className='w-full min-h-96 whitespace-normal break-words rounded-md border-1  border-gray-300 p-5'>

          {/* Showing Personal Information */}
              <h1 className='font-semibold text-xl text-center'>{resumeData.PersonalInfo.FullName}</h1>
              <p className='text-md text-center text-gray-700'>{resumeData.PersonalInfo.Designation}</p>

              <div className='w-full text-center  justify-center text-sm font-thin  flex flex-wrap break-words whitespace-normal gap-5 '>
                  <p>{resumeData.PersonalInfo.Email}</p>
                  <p>{resumeData.PersonalInfo.PhoneNumber}</p>
                  <p>{resumeData.PersonalInfo.Location}</p>
              </div>

              <div className='w-full flex justify-center items-center gap-3 text-center text-sm text-blue-400 font-semibold'>
                {
                  resumeData.PersonalInfo.Links.map((link , idx)=> <a key={idx} href={link.Link} target='_blank' >{link.Platform}</a> )
                }
              </div>

              {
                resumeData.PersonalInfo.Links.length > 0  ? <hr className='w-full mt-3 text-gray-500' /> : ""
              }

              {
                resumeData.PersonalInfo.Objective && <p className='w-full p-1 bg-gray-200 border-0 border-none text-start'>Career Objective</p>
              }
              <p className='text-sm whitespace-normal break-words '>{resumeData.PersonalInfo.Objective}</p>


              {/* Showing Education Information */}
              {
                currentStep >= 1 && <p className='w-full p-1 mt-3 bg-gray-200 border-0 border-none text-start'>Education</p>
              }
              {resumeData.Education.map((edu, idx) => (
                <div key={idx} className="mt-2">
                  <p className="font-bold">{edu.Degree}</p>
                  <p className="text-sm text-gray-700">
                    {edu.Institute} | CGPA: {edu.CGPA}
                  </p>
                  <p className="text-sm text-gray-500">
                    {edu.StartYear} - {edu.EndYear}, {edu.Location}
                  </p>
                </div>
              ))}


              {/* SHowing Experience Information */}
                {
                  currentStep >=3 && <p className='w-full p-1 mt-3 bg-gray-200 border-0 border-none text-start'>Experience</p>
                }
                {resumeData.Experience.map((exp, idx) => (
                  <div key={idx} className="mt-2">
                    <p className="font-bold">{exp.JobTitle} | {exp.Company}</p>
                    <p className="text-sm text-gray-700">
                      {exp.Position} | {exp.StartDate} - {exp.EndDate}
                    </p>
                  </div>
                ))}
              


                {/* Showing Skills Information */}
              {
               currentStep >=2 && <p className='w-full p-1 mt-3 bg-gray-200 border-0 border-none text-start'>Skills</p>
              }
              {/* Technical skills */}
              {
                resumeData?.Skills.TechnicalSkills[0] &&  <h1 className='font-semibold'>Technical Skills</h1>
              }
              <ul className=''>
                  {
                resumeData?.Skills.TechnicalSkills.map((techSkill , index)=> 
                <li className='text-xs' key={index}>
                  {techSkill}
                </li>
                )
              }
              </ul>

              {/* Soft Skills */}
              {
                resumeData?.Skills.SoftSkills[0] &&  <h1 className='font-semibold'>Soft Skills</h1>
              }
              <ul className=''>
                  {
                resumeData?.Skills.SoftSkills.map((softSkill , index)=> 
                <li className='text-xs' key={index}>
                  {softSkill}
                </li>
                )
              }
              </ul>

              {/* Tools and others Information */}
               {
                resumeData?.Skills.Tools[0] &&  <h1 className='font-semibold'>Tools & Others</h1>
              }
              <ul className=''>
                  {
                resumeData?.Skills.Tools.map((tool , index)=> 
                <li className='text-xs' key={index}>
                  {tool}
                </li>
                )
              }
              </ul>
              
        </div>


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
