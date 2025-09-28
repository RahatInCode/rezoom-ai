"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, User, GraduationCap, Briefcase, Award } from 'lucide-react';

// Mock framer-motion for smooth transitions
const motion = {
  div: ({ children, className, ...props }) => (
    <div className={`${className} transition-all duration-300`} {...props}>
      {children}
    </div>
  )
};

export default function ResumeBuild(){
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    education: {
      degree: '',
      school: '',
      graduationYear: '',
      gpa: ''
    },
    experience: [
      {
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    skills: {
      technical: [],
      soft: []
    }
  });

  const steps = [
    { id: 'personal', title: 'Personal Info', icon: User },
    { id: 'education', title: 'Education', icon: GraduationCap },
    { id: 'experience', title: 'Experience', icon: Briefcase },
    { id: 'skills', title: 'Skills', icon: Award }
  ];

  const updateResumeData = (section, field, value, index = null) => {
    setResumeData(prev => {
      if (index !== null && Array.isArray(prev[section])) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      } else if (section === 'skills' && Array.isArray(value)) {
        return { ...prev, [section]: { ...prev[section], [field]: value } };
      } else {
        return { ...prev, [section]: { ...prev[section], [field]: value } };
      }
    });
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const addSkill = (category, skill) => {
    if (skill.trim()) {
      updateResumeData('skills', category, [...resumeData.skills[category], skill.trim()]);
    }
  };

  const removeSkill = (category, index) => {
    const newSkills = resumeData.skills[category].filter((_, i) => i !== index);
    updateResumeData('skills', category, newSkills);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const PersonalInfoForm = () => (
    <motion.div className="space-y-6" initial="" animate="" exit="" transition={{}}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={resumeData.personal.fullName}
            onChange={(e) => updateResumeData('personal', 'fullName', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={resumeData.personal.email}
            onChange={(e) => updateResumeData('personal', 'email', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={resumeData.personal.phone}
            onChange={(e) => updateResumeData('personal', 'phone', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={resumeData.personal.location}
            onChange={(e) => updateResumeData('personal', 'location', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="New York, NY"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
        <textarea
          value={resumeData.personal.summary}
          onChange={(e) => updateResumeData('personal', 'summary', e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors h-32 resize-none"
          placeholder="Write a brief professional summary..."
        />
      </div>
    </motion.div>
  );

  const EducationForm = () => (
    <motion.div className="space-y-6" initial="" animate="" exit="" transition={{}}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
          <input
            type="text"
            value={resumeData.education.degree}
            onChange={(e) => updateResumeData('education', 'degree', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Bachelor of Science in Computer Science"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
          <input
            type="text"
            value={resumeData.education.school}
            onChange={(e) => updateResumeData('education', 'school', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="University of Technology"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
          <input
            type="text"
            value={resumeData.education.graduationYear}
            onChange={(e) => updateResumeData('education', 'graduationYear', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="2024"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
          <input
            type="text"
            value={resumeData.education.gpa}
            onChange={(e) => updateResumeData('education', 'gpa', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="3.8"
          />
        </div>
      </div>
    </motion.div>
  );

  const ExperienceForm = () => (
    <motion.div className="space-y-6" initial="" animate="" exit="" transition={{}}>
      {resumeData.experience.map((exp, index) => (
        <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) => updateResumeData('experience', 'jobTitle', e.target.value, index)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateResumeData('experience', 'company', e.target.value, index)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Tech Corp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateResumeData('experience', 'startDate', e.target.value, index)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateResumeData('experience', 'endDate', e.target.value, index)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Leave empty if current"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => updateResumeData('experience', 'description', e.target.value, index)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors h-24 resize-none"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
        </div>
      ))}
      <button
        onClick={addExperience}
        className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
      >
        + Add Another Experience
      </button>
    </motion.div>
  );

  const SkillsForm = () => {
    const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
    const [newSoftSkill, setNewSoftSkill] = useState('');

    return (
      <motion.div className="space-y-8">
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">Technical Skills</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {resumeData.skills.technical.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
              >
                {skill}
                <button
                  onClick={() => removeSkill('technical', index)}
                  className="ml-2 text-indigo-600 hover:text-indigo-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addSkill('technical', newTechnicalSkill);
                  setNewTechnicalSkill('');
                }
              }}
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="JavaScript, React, Node.js..."
            />
            <button
              onClick={() => {
                addSkill('technical', newTechnicalSkill);
                setNewTechnicalSkill('');
              }}
              className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">Soft Skills</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {resumeData.skills.soft.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-800"
              >
                {skill}
                <button
                  onClick={() => removeSkill('soft', index)}
                  className="ml-2 text-teal-600 hover:text-teal-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addSkill('soft', newSoftSkill);
                  setNewSoftSkill('');
                }
              }}
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Leadership, Communication, Problem Solving..."
            />
            <button
              onClick={() => {
                addSkill('soft', newSoftSkill);
                setNewSoftSkill('');
              }}
              className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const ResumePreview = () => (
    <div className="bg-white p-8 shadow-lg rounded-lg h-full overflow-y-auto">
      <div className="max-w-none">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {resumeData.personal.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
            {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
            {resumeData.personal.location && <span>{resumeData.personal.location}</span>}
          </div>
        </div>

        {/* Summary */}
        {resumeData.personal.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{resumeData.personal.summary}</p>
          </div>
        )}

        {/* Education */}
        {(resumeData.education.degree || resumeData.education.school) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Education
            </h2>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {resumeData.education.degree || 'Your Degree'}
              </h3>
              <p className="text-gray-700">{resumeData.education.school}</p>
              <div className="flex gap-4 text-sm text-gray-600">
                {resumeData.education.graduationYear && <span>Graduated: {resumeData.education.graduationYear}</span>}
                {resumeData.education.gpa && <span>GPA: {resumeData.education.gpa}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.some(exp => exp.jobTitle || exp.company) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Work Experience
            </h2>
            {resumeData.experience.map((exp, index) => (
              (exp.jobTitle || exp.company) && (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {exp.jobTitle || 'Job Title'}
                  </h3>
                  <p className="text-gray-700 font-medium">{exp.company}</p>
                  {(exp.startDate || exp.endDate) && (
                    <p className="text-sm text-gray-600 mb-2">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {/* Skills */}
        {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Skills
            </h2>
            {resumeData.skills.technical.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Technical</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.technical.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {resumeData.skills.soft.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.soft.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderCurrentForm = () => {
    switch (currentStep) {
      case 0: return <PersonalInfoForm />;
      case 1: return <EducationForm />;
      case 2: return <ExperienceForm />;
      case 3: return <SkillsForm />;
      default: return <PersonalInfoForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Resume</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Build a professional resume with our step-by-step builder. Watch your resume come to life as you type.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center">
            <nav className="flex space-x-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      index === currentStep
                        ? 'bg-indigo-100 text-indigo-700'
                        : index < currentStep
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    <span className="font-medium">{step.title}</span>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Panel */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {steps[currentStep].title}
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              {renderCurrentForm()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </button>

              <div className="flex gap-3">
                <button className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Save className="w-5 h-5 mr-2" />
                  Save
                </button>
                
                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Complete Resume
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
            </div>
            <div className="h-[800px] overflow-hidden">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

