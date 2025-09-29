"use client"
import React, { useState } from 'react';
import { Link as LinkIcon, MoveRight } from 'lucide-react';
import toast from 'react-hot-toast';

type PersonalInfo = {
  FullName: string,
  Designation: string,
  Email: string,
  PhoneNumber: string,
  Location: string,
  Links: { Platform: string, Link: string }[]
}

type EducationEntry = {
  Degree: string,
  Institute: string,
  CGPA: string,
  Location: string,
  StartYear: string,
  EndYear: string
}

type Skills = {
  TechnicalSkills: string[],
  SoftSkills: string[],
  Tools: string[],
}

type ExperienceEntry = {
  JobTitle: string,
  Company: string,
  Position: string,
  StartDate: string,
  EndDate: string
}

type ResumeData = {
  PersonalInfo: PersonalInfo,
  Education: EducationEntry[],
  Skills: Skills,
  Experience: ExperienceEntry[]
}

export default function ResumeBuild() {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData>({
    PersonalInfo: {
      FullName: "",
      Designation: "",
      Email: "",
      PhoneNumber: "",
      Location: "",
      Links: []
    },
    Education: [],
    Skills: {
      TechnicalSkills: [],
      SoftSkills: [],
      Tools: [],
    },
    Experience: []
  })

  return (
    <div className='w-full p-5'>
      <div className='space-y-3 w-full text-center md:text-start'>
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
            {/* <EducationInfo resumeData={resumeData} setResumeData={setResumeData} />
            <SkillsInfo resumeData={resumeData} setResumeData={setResumeData} />
            <ExperienceInfo resumeData={resumeData} setResumeData={setResumeData} /> */}

            <div className='w-full justify-end  flex mt-18 '>
                {
                  currentStep < 3 &&
                  <button
                onClick={()=>setCurrentStep(currentStep+1)}
                className='btn px-12 btn-sm btn-primary text-white lg:btn flex items-center justify-center gap-2'>Next <MoveRight size={16} strokeWidth={0.75} /></button>
                }
                {
                  currentStep === 3 &&
                  <button
                onClick={()=> setCurrentStep(0)}
                className='btn px-12 btn-sm btn-primary  lg:btn flex items-center justify-center gap-2'>Submit</button>
                }
            </div>
          </div>
        </div>

        <div className='w-full min-h-96 bg-white rounded-md border-1  border-gray-300 p-4'>
              <h1 className='font-semibold text-xl text-center'>{resumeData.PersonalInfo.FullName}</h1>
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
        ><LinkIcon size={15} /> Add Link</button>
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
      <h2 className='font-bold'>Education</h2>
      {entries.map((edu, idx) => (
        <div key={idx} className='flex flex-col md:flex-row gap-3'>
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
          <input type="text" placeholder='CGPA' className='input w-full'
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
          <input type="text" placeholder='Start Year' className='input w-full'
            value={resumeData.Education[idx]?.StartYear || ""}
            onChange={e => {
              const newEdu = [...resumeData.Education];
              newEdu[idx] = { ...newEdu[idx], StartYear: e.target.value, Degree: newEdu[idx]?.Degree || "", Institute: newEdu[idx]?.Institute || "", CGPA: newEdu[idx]?.CGPA || "", Location: newEdu[idx]?.Location || "", EndYear: newEdu[idx]?.EndYear || "" };
              setResumeData(prev => ({ ...prev, Education: newEdu }));
            }} />
          <input type="text" placeholder='End Year' className='input w-full'
            value={resumeData.Education[idx]?.EndYear || ""}
            onChange={e => {
              const newEdu = [...resumeData.Education];
              newEdu[idx] = { ...newEdu[idx], EndYear: e.target.value, Degree: newEdu[idx]?.Degree || "", Institute: newEdu[idx]?.Institute || "", CGPA: newEdu[idx]?.CGPA || "", Location: newEdu[idx]?.Location || "", StartYear: newEdu[idx]?.StartYear || "" };
              setResumeData(prev => ({ ...prev, Education: newEdu }));
            }} />
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
          <input
            key={idx}
            type="text"
            className='input w-full mb-2'
            placeholder={`Skill ${idx + 1}`}
            value={resumeData.Skills.TechnicalSkills[idx] || ""}
            onChange={e => handleArrayChange("TechnicalSkills", idx, e.target.value)}
          />
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
        <div key={idx} className='flex flex-col md:flex-row gap-3'>
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
          <input type="text" placeholder='Start Date' className='input w-full'
            value={resumeData.Experience[idx]?.StartDate || ""}
            onChange={e => {
              const newExp = [...resumeData.Experience];
              newExp[idx] = { ...newExp[idx], StartDate: e.target.value, JobTitle: newExp[idx]?.JobTitle || "", Company: newExp[idx]?.Company || "", Position: newExp[idx]?.Position || "", EndDate: newExp[idx]?.EndDate || "" };
              setResumeData(prev => ({ ...prev, Experience: newExp }))
            }} />
          <input type="text" placeholder='End Date' className='input w-full'
            value={resumeData.Experience[idx]?.EndDate || ""}
            onChange={e => {
              const newExp = [...resumeData.Experience];
              newExp[idx] = { ...newExp[idx], EndDate: e.target.value, JobTitle: newExp[idx]?.JobTitle || "", Company: newExp[idx]?.Company || "", Position: newExp[idx]?.Position || "", StartDate: newExp[idx]?.StartDate || "" };
              setResumeData(prev => ({ ...prev, Experience: newExp }))
            }} />
        </div>
      ))}
      <button className='btn btn-dash w-full mt-2' onClick={() => {
        setEntries([...entries, { JobTitle: "", Company: "", Position: "", StartDate: "", EndDate: "" }])
        setResumeData(prev => ({ ...prev, Experience: [...prev.Experience, { JobTitle: "", Company: "", Position: "", StartDate: "", EndDate: "" }] }))
      }}>Add Experience</button>
    </div>
  )
}
