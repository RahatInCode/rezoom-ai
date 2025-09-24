// ResumeExamplesSection/ResumeOptions.tsx
import React from "react";
import Link from "next/link";
// import SectorPage from "../Templates/[sector]/page";

export interface ResumeOption {
  id: number;
  sector: string;
  resume: string;
  description: string;
  experienceLevel: string; // Entry, Mid, Senior, Any
  whyChoose: string[]; // Pros/advantages
}

export const resumeOptions: ResumeOption[] = [
  {
    id: 1,
    sector: "Nursing",
    resume: "https://i.ibb.co.com/8nTbfBFL/Black-and-White-Simple-Bordered-Nurse-Resume.png",
    description: "Tailored for nurses, highlighting clinical experience, certifications, and patient care skills.",
    experienceLevel: "Entry to Mid-Level",
    whyChoose: [
      "Highlights clinical experience effectively",
      "Professional layout for healthcare recruiters",
      "Easy to customize certifications and skills"
    ]
  },
  {
    id: 2,
    sector: "Web Developer",
    resume: "https://i.ibb.co.com/sBf1yTN/Blue-Neutral-Simple-Minimalist-Professional-Web-Developer-Resume.png",
    description: "Showcases programming skills, frameworks, portfolio projects, and professional experience.",
    experienceLevel: "Entry to Senior",
    whyChoose: [
      "Focuses on technical skills and projects",
      "Clean modern design that impresses recruiters",
      "Highlights relevant web development experience"
    ]
  },
  {
    id: 3,
    sector: "Engineering",
    resume: "https://i.ibb.co.com/Fq7KLs8w/Design.png",
    description: "Covers engineering projects, technical skills, and academic achievements.",
    experienceLevel: "Entry to Mid-Level",
    whyChoose: [
      "Emphasizes technical projects and achievements",
      "Professional and structured layout",
      "Easy to include certifications and software skills"
    ]
  },
  {
    id: 4,
    sector: "High School",
    resume: "https://i.ibb.co.com/ZzXMx3Lj/Blue-and-Brown-Clean-Modern-High-School-Resume.png",
    description: "Ideal for high school students or recent graduates; focuses on education and extracurriculars.",
    experienceLevel: "Student/Entry-Level",
    whyChoose: [
      "Highlights academic achievements clearly",
      "Great for internships or college applications",
      "Clean, student-friendly layout"
    ]
  },
  {
    id: 5,
    sector: "Teacher",
    resume: "https://i.ibb.co.com/QzQSprV/English-Teacher-Entry-Level-Resume-in-White-Olive-Green-Simple-and-Minimal-Style.png",
    description: "Focuses on teaching experience, certifications, and educational skills.",
    experienceLevel: "Entry to Mid-Level",
    whyChoose: [
      "Showcases classroom management and teaching experience",
      "Professional yet approachable design",
      "Easy to customize for subjects and certifications"
    ]
  },
  {
    id: 6,
    sector: "Medical Assistant",
    resume: "https://i.ibb.co.com/Kc5SWjfv/Green-Grey-Minimalist-Medical-Assistant-Letter-of-Recommendation.png",
    description: "Highlights clinical skills, patient care, administrative experience, and certifications.",
    experienceLevel: "Entry to Mid-Level",
    whyChoose: [
      "Emphasizes patient care and technical skills",
      "Modern healthcare-friendly design",
      "Easy to showcase certifications"
    ]
  },
  {
    id: 7,
    sector: "Customer Service",
    resume: "https://i.ibb.co.com/kgJY3CR4/Minimal-Customer-Service-Resume.png",
    description: "Focuses on communication skills, problem-solving, and customer support experience.",
    experienceLevel: "Entry to Mid-Level",
    whyChoose: [
      "Highlights customer handling experience",
      "Clean, readable layout",
      "Showcases problem-solving and communication skills"
    ]
  },
  {
    id: 8,
    sector: "Internship",
    resume: "https://i.ibb.co.com/Fqg9MGwb/Accountant-Intern-Resume-Example-Homepage-pdf.png",
    description: "Perfect for students or recent grads; highlights academic achievements, internships, and projects.",
    experienceLevel: "Student/Entry-Level",
    whyChoose: [
      "Great for showcasing internships and projects",
      "Simple and clean design for recruiters",
      "Highlights education effectively"
    ]
  },
  {
    id: 9,
    sector: "IT",
    resume: "https://i.ibb.co.com/zhbtWjWX/Senior-Cybersecurity-Specialist-Resume-Example-Homepage-pdf.png",
    description: "Covers IT skills, certifications, technical experience, and projects.",
    experienceLevel: "Entry to Senior",
    whyChoose: [
      "Highlights technical skills and certifications",
      "Professional layout tailored for IT roles",
      "Showcases career achievements clearly"
    ]
  },
  {
    id: 10,
    sector: "New Grad Nursing",
    resume: "https://i.ibb.co.com/XfM9GxcD/Blue-and-White-Nurse-Resume.png",
    description: "Designed for newly graduated nurses; highlights education, clinical rotations, and certifications.",
    experienceLevel: "Entry-Level",
    whyChoose: [
      "Highlights clinical rotations effectively",
      "Professional healthcare-friendly design",
      "Easy to showcase education and certifications"
    ]
  },
  {
    id: 11,
    sector: "Healthcare",
    resume: "https://i.ibb.co.com/HRpFv1g/White-and-Blue-Modern-Doctor-Resume.png",
    description: "Tailored for doctors and healthcare professionals; includes experience, research, and certifications.",
    experienceLevel: "Mid to Senior",
    whyChoose: [
      "Professional layout suitable for medical recruiters",
      "Highlights experience and research",
      "Clear presentation of certifications"
    ]
  },
  {
    id: 12,
    sector: "Executive",
    resume: "https://i.ibb.co.com/xS8p209H/Blue-Black-Sleek-Management-Corporate-Resume.png",
    description: "Ideal for corporate executives; highlights leadership, achievements, and management experience.",
    experienceLevel: "Senior",
    whyChoose: [
      "Shows leadership and strategic skills",
      "Sleek, professional design",
      "Focus on high-impact achievements"
    ]
  },
  {
    id: 13,
    sector: "Accounting",
    resume: "https://i.ibb.co.com/pB8QnMnt/Black-and-White-Corporate-Accountant-Resume.png",
    description: "Highlights accounting experience, financial skills, and certifications.",
    experienceLevel: "Entry to Senior",
    whyChoose: [
      "Focus on finance and accounting expertise",
      "Professional structured layout",
      "Easy to highlight certifications like CPA"
    ]
  },
  {
    id: 14,
    sector: "Graphic Design",
    resume: "https://i.ibb.co.com/5hdWN41N/Black-and-White-Color-Blocks-Graphic-Designer-Resume.png",
    description: "Showcases creativity, design skills, portfolios, and technical knowledge.",
    experienceLevel: "Entry to Senior",
    whyChoose: [
      "Emphasizes creativity and portfolio",
      "Visually appealing layout",
      "Perfect for design-focused roles"
    ]
  },
  {
    id: 15,
    sector: "Marketing",
    resume: "https://i.ibb.co.com/zHLfd8cz/Gray-Simple-Digital-Marketing-Resume.png",
    description: "Highlights marketing skills, campaigns, analytics, and communication.",
    experienceLevel: "Entry to Senior",
    whyChoose: [
      "Focuses on marketing achievements",
      "Professional and clean design",
      "Shows digital marketing experience effectively"
    ]
  },
  {
    id: 16,
    sector: "Data Analyst",
    resume: "https://i.ibb.co.com/vx2yyhvz/White-Gold-Elegant-Minimalist-Data-Analyst-Resume-CV-A4-Printable.png",
    description: "Showcases data analysis skills, projects, tools, and visualizations.",
    experienceLevel: "Entry to Mid-Level",
    whyChoose: [
      "Highlights data and analytical skills",
      "Clean, structured layout",
      "Emphasizes projects and tools experience"
    ]
  },
  {
    id: 17,
    sector: "Human Resources",
    resume: "https://i.ibb.co.com/7TqZv8d/Human-Resources-Resume-in-Beige-Black-Warm-Classic-Style.png",
    description: "Focuses on HR experience, recruitment, employee relations, and certifications.",
    experienceLevel: "Entry to Senior",
    whyChoose: [
      "Highlights recruitment and HR achievements",
      "Professional layout for HR recruiters",
      "Easy to customize for certifications"
    ]
  },
  {
    id: 18,
    sector: "Project Manager",
    resume: "https://i.ibb.co.com/VWHwn3Rw/Blue-Modern-Professional-Resume-Project-Manager.png",
    description: "Tailored for project managers; emphasizes leadership, projects, and achievements.",
    experienceLevel: "Mid to Senior",
    whyChoose: [
      "Highlights project management skills",
      "Professional layout emphasizing achievements",
      "Focus on leadership and project experience"
    ]
  },
  {
    id: 19,
    sector: "Sales",
    resume: "https://i.ibb.co.com/HfP0m8WY/Tan-and-Black-Minimalist-Sales-Manager-Resume.png",
    description: "Focuses on sales achievements, targets, and client relationships.",
    experienceLevel: "Entry to Senior",
    whyChoose: [
      "Highlights sales achievements and metrics",
      "Professional and clean layout",
      "Showcases client management experience"
    ]
  },
  {
    id: 20,
    sector: "Content Writer",
    resume: "https://i.ibb.co.com/cS7vJYjX/Paster-Purple-and-Blue-Cute-Modern-Content-Writer-CV-Resume.png",
    description: "Emphasizes writing skills, published content, and portfolio experience.",
    experienceLevel: "Entry to Senior",
    whyChoose: [
      "Showcases writing portfolio effectively",
      "Clean, visually appealing layout",
      "Highlights content creation and SEO skills"
    ]
  }
];



const ResumeOptions: React.FC = () => {
  return (
    <div className="w-full py-1">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {resumeOptions.map((option) => (
          <li key={option.id}>
            <Link href={`/Templates/${encodeURIComponent(option.sector)}`}
              
              className="block p-2 text-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:border-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 group"
            >
              <span className=" font-semibold text-gray-800 dark:text-gray-200 group-hover:text-white transition-colors">
                {option.sector}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeOptions;
