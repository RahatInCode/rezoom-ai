"use client";
import React, { useEffect, useRef } from "react";
import { FaShieldAlt,     FaUsers, FaBolt, FaDownload, FaCheckCircle, FaArrowRight, FaStar,  } from "react-icons/fa";
// import { IoSparkles } from "react-icons/io5";
// import { HiOutlineSparkles } from "react-icons/hi";
import { MdDesignServices, MdSmartToy } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";
 

interface Feature {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  gradient: string;
  bgColor: string;
  highlights: string[];
}

const features: Feature[] = [
 {
    id: 1,
    title: "ATS-Friendly Templates",
    description:
      "Pass through Applicant Tracking Systems effortlessly with our professionally designed, ATS-optimized resume templates. Each template is carefully structured to highlight your skills, experience, and achievements while ensuring maximum readability for automated systems. This increases your chances of getting noticed by recruiters and landing interviews faster.",
    buttonText: "Explore Templates",
    image: "https://i.ibb.co/zHLfd8cz/Gray-Simple-Digital-Marketing-Resume.png",
    icon: FaShieldAlt,
    gradient: "from-blue-500 to-indigo-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
    highlights: ["98% ATS Pass Rate", "50+ Templates", "Industry Optimized"]
  },
  {
    id: 2,
    title: "Professional Templates",
    description:
      "Choose from hundreds of professionally designed resume templates created by career experts and graphic designers. Our templates are modern, elegant, and tailored for various industries. They help you make a strong first impression and effectively communicate your expertise to potential employers, ensuring your resume stands out from the competition.",
    buttonText: "Browse Designs",
    image: "https://i.ibb.co/ZzXMx3Lj/Blue-and-Brown-Clean-Modern-High-School-Resume.png",
    icon: MdDesignServices,
    gradient: "from-emerald-500 to-teal-600",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-100",
    highlights: ["200+ Designs", "Expert Created", "Modern Layouts"]
  },
  {
    id: 3,
    title: "Powerful AI Resume Builder",
    description:
      "Leverage advanced AI technology to create the perfect resume effortlessly. Our AI analyzes your target job description and suggests personalized content, keywords, and formatting to maximize your chances of getting noticed. It eliminates writer's block, saves time, and ensures your resume is optimized for each specific role.",
    buttonText: "Start Building",
    image: "https://i.ibb.co/cS7vJYjX/Paster-Purple-and-Blue-Cute-Modern-Content-Writer-CV-Resume.png",
    icon: MdSmartToy,
    gradient: "from-purple-500 to-pink-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-100",
    highlights: ["AI Suggestions", "Keyword Optimization", "Real-time Feedback"]
  },
  {
    id: 4,
    title: "Expert Tips & Guidance",
    description:
      "Get actionable career advice from industry experts to enhance your resume, LinkedIn profile, and interview performance. Our tips include insights on structuring your experience, highlighting key achievements, and using the right language to impress recruiters. Stay ahead of the competition with personalized guidance tailored to your career goals.",
    buttonText: "Learn More",
    image: "https://i.ibb.co/XfM9GxcD/Blue-and-White-Nurse-Resume.png",
    icon: FaUsers,
    gradient: "from-cyan-500 to-blue-600",
    bgColor: "bg-gradient-to-br from-cyan-50 to-blue-100",
    highlights: ["Resume Tips", "LinkedIn Guidance", "Interview Advice"]
  },
  {
    id: 5,
    title: "Mock Interview Simulator",
    description:
      "Prepare for real-world interviews with our AI-powered mock interview simulator. Practice answering industry-specific questions, receive instant feedback, and improve your communication and confidence. This tool allows you to identify strengths and weaknesses, ensuring you are fully prepared for any interview scenario.",
    buttonText: "Practice Now",
    image: "https://i.ibb.co/TMnJN5vW/White-Yellow-and-Black-Modern-Professional-Resume.png",
    icon: FaBolt,
    gradient: "from-orange-500 to-red-600",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-100",
    highlights: ["AI Mock Interviews", "Instant Feedback", "Industry Questions"]
  },
  {
    id: 6,
    title: "Customizable & Downloadable",
    description:
      "Easily customize your resume with our intuitive tools, allowing you to adjust layouts, colors, fonts, and sections to reflect your unique personal brand. Once complete, download your resume in multiple formats like PDF, Word, or plain text. Every resume is optimized for online applications, ensuring maximum compatibility and ATS-readiness.",
    buttonText: "Download Options",
    image: "https://i.ibb.co/50GtT0G/White-and-Black-Modern-New-Graduate-Professional-Resume-1.png",
    icon: FaDownload,
    gradient: "from-indigo-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-indigo-50 to-purple-100",
    highlights: ["PDF & Word", "ATS-Compatible", "Instant Download"]
  },
  {
    id: 7,
    title: "24/7 AI Assistance",
    description:
      "Get round-the-clock AI assistance to answer your career questions, provide instant feedback, and guide you through resume building and interview preparation. No matter when you need support, our intelligent AI assistant is available 24/7 to ensure you always have the help you need to advance your career.",
    buttonText: "Get Help",
    image: "https://i.ibb.co/50GtT0G/White-and-Black-Modern-New-Graduate-Professional-Resume-1.png",
    icon: IoMdHelpCircle,
    gradient: "from-green-500 to-teal-600",
    bgColor: "bg-gradient-to-br from-green-50 to-teal-100",
    highlights: ["Instant Support", "AI Guidance", "24/7 Availability"]
  }
];

const HighlightFeature: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // initial states
      imageRefs.current.forEach((img, i) => {
        if (img) gsap.set(img, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.9 });
      });
      contentRefs.current.forEach((c) => {
        if (c) gsap.set(c, { autoAlpha: 0, y: 50 });
      });

      // scroll animation
      contentRefs.current.forEach((c, i) => {
        if (!c) return;
        gsap.to(c, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: c,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play reverse play reverse",
            onEnter: () => updateActiveFeature(i),
            onEnterBack: () => updateActiveFeature(i),
          },
        });
      });

      const updateActiveFeature = (index: number) => {
        imageRefs.current.forEach((img, i) => {
          if (!img) return;
          if (i === index) {
            gsap.to(img, { autoAlpha: 1, scale: 1, duration: 0.8 });
          } else {
            gsap.to(img, { autoAlpha: 0, scale: 0.9, duration: 0.6 });
          }
        });
      };

      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleY: 1,
          transformOrigin: "top",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    };

    loadGSAP();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="text-center py-20 px-4">
        <div className="container mx-auto">
          {/* <div className="flex items-center justify-start gap-3 mb-6">
            <HiOutlineSparkles className="text-4xl text-blue-600" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Powerful Features
            </h1>
            <IoSparkles className="text-4xl text-purple-600" />
          </div> */}
          {/* <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Everything you need to create the perfect resume and land your dream job
          </p> */}
        </div>
      </div>
      

      <div ref={containerRef} className="container mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left - Images */}
          <div className="lg:w-1/2 lg:sticky lg:top-20 h-[80vh] flex items-center justify-center">
            <div className="relative w-full h-full max-w-lg">
              {/* Progress */}
              <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="w-full bg-gradient-to-b from-blue-500 to-purple-600 transform scale-y-0"
                ></div>
              </div>

              {features.map((feature, i) => (
                <div
                  key={feature.id}
                  ref={(el) => (imageRefs.current[i] = el)}
                  className="absolute inset-0 opacity-0"
                >
                  <div
                    className={`relative h-full rounded-2xl overflow-hidden shadow-2xl ${feature.bgColor} border border-white/50`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${feature.gradient} text-white font-semibold text-sm mb-3`}
                      >
                        <feature.icon size={16} />
                        Feature #{i + 1}
                      </div>
                      <h3 className="text-white text-2xl font-bold mb-2">{feature.title}</h3>
                      <div className="flex gap-2">
                        {feature.highlights.map((h, j) => (
                          <span
                            key={j}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full  hover:bg-gradient-to-b from-white/30 to-white/10 transition-colors duration-300 cursor-pointer hover:scale-105 transform inline-block"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:w-1/2 space-y-24">
            {features.map((feature, i) => (
              <div
                key={feature.id}
                ref={(el) => (contentRefs.current[i] = el)}
                className="opacity-0 group"
              >
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon size={32} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-gray-500">
                          Feature {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="h-px bg-gradient-to-r from-gray-300 to-transparent flex-1"></div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {feature.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed pl-20">{feature.description}</p>
                  <div className="pl-20 space-y-2">
                    {feature.highlights.map((h, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <FaCheckCircle size={20} className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pl-20 pt-4">
                    <button
                      className={`group/btn inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${feature.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
                    >
                      {feature.buttonText}
                      <FaArrowRight
                        size={20}
                        className="group-hover/btn:translate-x-1 transition-transform duration-300"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <FaBolt size={32} className="text-yellow-300" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to Get Started?</h2>
            <FaStar size={32} className="text-yellow-300" />
          </div>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have transformed their careers
          </p>
          <button className="inline-flex items-center gap-3 px-10 py-4 bg-white text-blue-600 font-bold text-xl rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            Start Building Today
            <FaArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HighlightFeature;
