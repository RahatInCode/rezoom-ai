"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  FaRocket,
  FaBrain,
  FaUsers,
  FaVideo,
  FaMicrophone,
  FaChartLine,
  FaHeadset,
  FaLightbulb,
  FaCertificate,
} from "react-icons/fa";
import { LuTarget } from "react-icons/lu";

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { name: "Wired", src: "/logos/wired.png" },
  { name: "Forbes", src: "/logos/forbes.png" },
  { name: "Business Insider", src: "/logos/business-insider.png" },
  { name: "Bloomberg", src: "/logos/bloomberg.png" },
];

const features = [
  {
    icon: <FaBrain className="text-purple-600" />,
    title: "AI Resume Builder",
    description: "Create smart, optimized resumes quickly.",
  },
  {
    icon: <FaVideo className="text-blue-600" />,
    title: "Mock Interviews",
    description: "Practice interviews with AI feedback.",
  },
  {
    icon: <FaRocket className="text-green-600" />,
    title: "Career Acceleration",
    description: "Boost your career opportunities with AI insights.",
  },
];

const stats = [
  { number: "1M+", label: "Resumes Created", icon: <FaUsers /> },
  { number: "95%", label: "Interview Success", icon: <FaChartLine /> },
  { number: "50K+", label: "Mock Interviews", icon: <FaVideo /> },
  { number: "24/7", label: "Support", icon: <FaHeadset /> },
];

const HeroMediaSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)" }
    ).fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    ).fromTo(
      buttonRef.current,
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 },
      "-=0.3"
    );

    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".stat-item",
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden py-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          >
            Land Your Dream Job
          </h1>
          <p
            ref={subtitleRef}
            className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-6"
          >
            Master resumes, ace interviews, and boost your career with AI tools.
          </p>
          <button
            ref={buttonRef}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105"
          >
            Get Started
          </button>
        </div>

        {/* Logos */}
        <div
          ref={logosRef}
          className="flex flex-wrap justify-center items-center gap-6 mb-16"
        >
          {logos.map((logo) => (
            <div key={logo.name} className="h-12 w-32 relative">
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Features */}
        <div
          ref={featuresRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="feature-card p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
              <div className="text-3xl mb-2 text-purple-600">{stat.icon}</div>
              <h4 className="font-bold text-xl">{stat.number}</h4>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroMediaSection;
