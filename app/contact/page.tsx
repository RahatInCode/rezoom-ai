"use client";
import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MapPin, Clock, Users, Github, Linkedin, Twitter, Phone, Headphones, X, Award, Code, Briefcase, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // New: Modal state for team member details
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  // Enhanced: Team members with full professional details
  const teamMembers = [
    {
      name: 'Ahmed Rahat',
      role: 'Team Leader',
      image: "https://i.ibb.co.com/XxMTQDtD/557454921-1196579695839906-8771704890222554294-n.jpg",
      color: 'from-emerald-400 to-emerald-600',
      bio: 'Visionary leader with 8+ years of experience in building scalable AI-powered solutions. Passionate about transforming career development through technology.',
      skills: ['Leadership', 'AI/ML', 'Product Strategy', 'Team Building', 'Agile Development'],
      experience: '8+ Years',
      projects: '50+ Projects',
      achievements: [
        'Led development of Rezoom.AI from concept to launch',
        'Managed cross-functional teams of 15+ developers',
        'Increased user engagement by 300%'
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/ahmedrahat',
        github: 'https://github.com/ahmedrahat',
        twitter: 'https://twitter.com/ahmedrahat'
      }
    },
    {
      name: 'Suprotik Chowdhury',
      role: 'Backend Developer',
      image: '👨‍💼',
      color: 'from-teal-400 to-teal-600',
      bio: 'Backend wizard specializing in microservices architecture and database optimization. Building robust systems that power thousands of resumes daily.',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
      experience: '6+ Years',
      projects: '40+ APIs Built',
      achievements: [
        'Architected scalable backend handling 100K+ requests/day',
        'Reduced API response time by 60%',
        'Implemented secure authentication system'
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/suprotik',
        github: 'https://github.com/suprotik',
        twitter: 'https://twitter.com/suprotik'
      }
    },
    {
      name: 'Fouzia Rahman',
      role: 'UI/UX Designer',
      image: "https://i.ibb.co.com/MDpgRT1P/532218142-2205663219948056-9166397322869593699-n.jpg",
      color: 'from-green-400 to-green-600',
      bio: 'Creative designer with an eye for detail and user-centric approach. Crafting beautiful, intuitive interfaces that users love.',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
      experience: '5+ Years',
      projects: '60+ Designs',
      achievements: [
        'Designed award-winning resume templates',
        'Improved user satisfaction score to 4.8/5',
        'Created comprehensive design system'
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/fouziarahman',
        github: 'https://github.com/fouziarahman',
        twitter: 'https://twitter.com/fouziarahman'
      }
    },
    {
      name: 'Ibrahim',
      role: 'Frontend Developer',
      image: "https://i.ibb.co.com/rRZGQN66/472221860-952996390079219-3885647675502620921-n.jpg",
      color: 'from-emerald-500 to-green-600',
      bio: 'Frontend enthusiast who brings designs to life with pixel-perfect precision. Expert in modern web technologies and performance optimization.',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      experience: '5+ Years',
      projects: '45+ Interfaces',
      achievements: [
        'Built lightning-fast resume builder interface',
        'Achieved 98+ PageSpeed score',
        'Implemented smooth animations across platform'
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/ibrahim',
        github: 'https://github.com/ibrahim',
        twitter: 'https://twitter.com/ibrahim'
      }
    },
    {
      name: 'Abir Hasan',
      role: 'Full Stack Developer',
      image: "https://i.ibb.co.com/5gqtnBpr/1674161393535.jpg",
      color: 'from-teal-500 to-emerald-600',
      bio: 'Versatile full-stack developer bridging frontend and backend seamlessly. Solving complex problems with elegant, maintainable code.',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'GraphQL', 'CI/CD'],
      experience: '7+ Years',
      projects: '55+ Full Stack Apps',
      achievements: [
        'Developed end-to-end resume export system',
        'Integrated 10+ third-party APIs',
        'Maintained 99.9% uptime for critical services'
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/abirhasan',
        github: 'https://github.com/abirhasan',
        twitter: 'https://twitter.com/abirhasan'
      }
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] via-white to-[#f8fafc]">
      {/* Hero Section - Ultra Modern with Light Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-slate-50">
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-green-300/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal-300/10 to-emerald-300/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[10%] w-2 h-2 bg-emerald-400 rounded-full animate-float-particle opacity-60"></div>
          <div className="absolute top-40 right-[15%] w-3 h-3 bg-teal-400 rounded-full animate-float-particle animation-delay-1000 opacity-40"></div>
          <div className="absolute bottom-32 left-[20%] w-2 h-2 bg-green-400 rounded-full animate-float-particle animation-delay-2000 opacity-50"></div>
          <div className="absolute top-60 right-[30%] w-2 h-2 bg-emerald-500 rounded-full animate-float-particle animation-delay-3000 opacity-60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="text-center">
            {/* Glassmorphic Badge with Pulse Effect */}
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-emerald-200/50 shadow-lg shadow-emerald-100/50 px-6 py-3 rounded-full mb-10 font-bold text-sm animate-fade-in group hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping absolute"></div>
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
              </div>
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">24/7 Support Available</span>
            </div>
            
            {/* Ultra Modern Heading with Mixed Typography */}
            <div className="mb-8 animate-slide-down">
              <h1 className="text-6xl md:text-8xl font-extrabold text-[#0f172a] tracking-tight mb-4 relative inline-block">
                Let&apos;s{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                    Connect
                  </span>
                  {/* Animated Underline */}
                  <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M2 7 Q50 2, 100 7 T198 7" 
                      fill="none" 
                      stroke="url(#gradient)" 
                      strokeWidth="3" 
                      strokeLinecap="round"
                      className="animate-draw-line"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#14b8a6', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
              
              {/* Rotating Words Effect */}
              <div className="text-2xl md:text-3xl font-bold text-emerald-600 mt-6 h-10 relative overflow-hidden">
                <div className="animate-word-slide">
                  <span className="block">Build Your Future</span>
                  <span className="block">Get Expert Help</span>
                  <span className="block">Transform Your Career</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Subheading */}
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed mb-12 animate-slide-up">
              Have questions about building your perfect resume? Our <span className="text-emerald-600 font-bold">Head Hunters</span> team is ready to guide you every step of the way.
            </p>
            
            {/* Interactive Stats Cards */}
            <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              {[
                { icon: '⚡', stat: '24/7', label: 'Support Available', color: 'from-emerald-500 to-teal-500' },
                { icon: '🚀', stat: '<24h', label: 'Response Time', color: 'from-teal-500 to-cyan-500' },
                { icon: '🎯', stat: '10K+', label: 'Happy Users', color: 'from-emerald-500 to-green-500' },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="group relative bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-2 min-w-[160px]"
                  style={{animationDelay: `${0.4 + idx * 0.1}s`}}
                >
                  {/* Gradient Border on Hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}></div>
                  
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <div className={`text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.stat}
                  </div>
                  <div className="text-slate-600 text-sm font-semibold">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Decorative Floating Elements */}
            <div className="absolute top-1/4 left-10 hidden lg:block">
              <div className="relative w-20 h-20 animate-spin-slow">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl opacity-20 rotate-12"></div>
                <div className="absolute inset-2 bg-white rounded-xl"></div>
              </div>
            </div>
            
            <div className="absolute bottom-1/4 right-10 hidden lg:block">
              <div className="relative w-16 h-16 animate-bounce-slow">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full opacity-20"></div>
                <div className="absolute inset-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.5"/>
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 -mt-24 relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-[#10b981] hover:shadow-emerald-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl mb-5 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-[#0f172a] mb-3 text-xl">Email Us</h3>
            <p className="text-[#1e293b] text-base mb-2 font-medium">support@headhunters.com</p>
            <p className="text-[#64748b] text-sm">We reply within 24 hours</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-[#10b981] hover:shadow-emerald-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#14b8a6] to-[#10b981] rounded-2xl mb-5 shadow-lg">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-[#0f172a] mb-3 text-xl">Call Us</h3>
            <p className="text-[#1e293b] text-base mb-2 font-medium">(+88)01639-448792</p>
            <p className="text-[#64748b] text-sm">Mon-Fri, 9AM-6PM EST</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-[#10b981] hover:shadow-emerald-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#059669] to-[#047857] rounded-2xl mb-5 shadow-lg">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-[#0f172a] mb-3 text-xl">Live Chat</h3>
            <p className="text-[#1e293b] text-base mb-2 font-medium">Instant Support</p>
            <p className="text-[#64748b] text-sm">Available 24/7</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-[#10b981] hover:shadow-emerald-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#10b981] to-[#047857] rounded-2xl mb-5 shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-[#0f172a] mb-3 text-xl">Visit Us</h3>
            <p className="text-[#1e293b] text-base mb-2 font-medium">Dhaka, Bangladesh</p>
            <p className="text-[#64748b] text-sm">Uttara sector-18</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <div className="animate-fade-in-left">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 hover:shadow-emerald-50 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-4xl font-extrabold text-[#0f172a] mb-3 tracking-tight">Send us a Message</h2>
              <p className="text-[#64748b] text-lg mb-10 leading-relaxed">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>

              {submitted ? (
                <div className="text-center py-16 animate-scale-in">
                  <div className="flex items-center justify-center w-24 h-24 bg-emerald-50 border-4 border-emerald-200 rounded-full mx-auto mb-6 animate-bounce">
                    <CheckCircle2 className="w-12 h-12 text-[#10b981]" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#0f172a] mb-4">Message Sent Successfully!</h3>
                  <p className="text-[#64748b] text-lg">Thank you for reaching out. Our team will respond within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-[#0f172a] mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 border-2 ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-[#10b981] outline-none transition-all text-[#1e293b] font-medium`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="mt-2 text-sm text-red-600 font-medium">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-[#0f172a] mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-[#10b981] outline-none transition-all text-[#1e293b] font-medium`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="mt-2 text-sm text-red-600 font-medium">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-bold text-[#0f172a] mb-3">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-[#10b981] outline-none transition-all bg-white text-[#1e293b] font-medium"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="feature">Feature Request</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-[#0f172a] mb-3">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 border-2 ${errors.subject ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-[#10b981] outline-none transition-all text-[#1e293b] font-medium`}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && <p className="mt-2 text-sm text-red-600 font-medium">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-[#0f172a] mb-3">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-5 py-4 border-2 ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-[#10b981] outline-none transition-all resize-none text-[#1e293b] font-medium leading-relaxed`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && <p className="mt-2 text-sm text-red-600 font-medium">{errors.message}</p>}
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-bold text-lg py-5 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 group"
                  >
                    <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    Send Message
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8 animate-fade-in-right">
            {/* Why Contact Us */}
            <div className="bg-gradient-to-br from-[#10b981] to-[#059669] rounded-3xl shadow-2xl p-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-extrabold mb-8">Why Contact Us?</h2>
                <div className="space-y-6">
                  {[
                    { title: 'Expert Guidance', desc: 'Get personalized advice on creating the perfect resume' },
                    { title: 'Quick Response', desc: 'We respond to all inquiries within 24 hours' },
                    { title: 'Technical Support', desc: 'Get help with any technical issues or questions' },
                    { title: 'Feature Requests', desc: 'Share your ideas to help us improve' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-emerald-50 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 hover:shadow-emerald-50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-[#0f172a]">Office Hours</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b-2 border-gray-100">
                  <span className="text-[#1e293b] font-bold">Monday - Friday</span>
                  <span className="text-[#64748b] font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b-2 border-gray-100">
                  <span className="text-[#1e293b] font-bold">Saturday</span>
                  <span className="text-[#64748b] font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-[#1e293b] font-bold">Sunday</span>
                  <span className="text-[#64748b] font-medium">Closed</span>
                </div>
              </div>
              <div className="mt-8 p-5 bg-emerald-50 border-l-4 border-[#10b981] rounded-xl">
                <p className="text-sm text-[#047857] leading-relaxed">
                  <strong className="font-bold">Note:</strong> Live chat support is available 24/7 for urgent inquiries.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 hover:shadow-emerald-50 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-extrabold text-[#0f172a] mb-8">Follow Us</h2>
              <div className="flex gap-4">
                <Link href="https://www.twitter.com" className="flex-1 bg-gradient-to-br from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white p-5 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-2xl">
                  <Twitter className="w-7 h-7 mx-auto" />
                </Link>
                <Link href="https://www.linkedin.com/feed/" className="flex-1 bg-gradient-to-br from-[#0891b2] to-[#0e7490] hover:from-[#0e7490] hover:to-[#155e75] text-white p-5 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-2xl">
                  <Linkedin className="w-7 h-7 mx-auto" />
                </Link>
                <Link href="https://www.github.com" className="flex-1 bg-gradient-to-br from-[#1e293b] to-[#0f172a] hover:from-[#0f172a] hover:to-black text-white p-5 rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-2xl">
                  <Github className="w-7 h-7 mx-auto" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section - Enhanced with Click to View Details */}
        <div className="animate-fade-in-up mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-emerald-50 border-2 border-emerald-200 text-[#047857] px-8 py-3 rounded-full mb-6 font-bold text-base shadow-md">
              <Users className="w-6 h-6" />
              Our Team
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#0f172a] mb-6 tracking-tight">Meet the Head Hunters</h2>
            <p className="text-xl text-[#64748b] max-w-2xl mx-auto leading-relaxed font-medium">
              A passionate team of developers and designers dedicated to helping you build the perfect resume.
            </p>
            {/* New: Click instruction */}
            <p className="text-base text-emerald-600 mt-4 font-semibold animate-pulse">
              👇 Click on any card to learn more about our team members
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                // New: Added onClick handler and cursor-pointer
                onClick={() => setSelectedMember(index)}
                className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100 hover:border-emerald-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 animate-fade-in-up group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {typeof member.image === 'string' && member.image.startsWith('http') ? (
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-20"></div>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={100}
                      height={100}
                      className="w-24 h-24 rounded-3xl object-cover mx-auto shadow-2xl relative z-10 ring-4 ring-white"
                    />
                  </div>
                ) : (
                  <div className={`w-24 h-24 bg-gradient-to-br ${member.color} rounded-3xl flex items-center justify-center text-5xl mx-auto mb-6 shadow-2xl ring-4 ring-white`}>
                    {member.image}
                  </div>
                )}
                <h3 className="font-bold text-[#0f172a] text-center mb-2 text-xl">{member.name}</h3>
                <p className="text-[#64748b] text-center mb-6 font-medium">{member.role}</p>
                {/* New: View Profile button */}
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm group-hover:gap-3 transition-all">
                    View Profile 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-gray-100 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { q: 'How quickly will I receive a response?', a: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please use our live chat feature.' },
              { q: 'Can I request a custom feature?', a: 'Absolutely! We love hearing from our users. Select "Feature Request" in the category dropdown and tell us your ideas.' },
              { q: 'Do you offer phone consultations?', a: 'Yes! Schedule a call with our team by mentioning it in your message, and we\'ll arrange a convenient time.' },
              { q: 'Is technical support free?', a: 'Yes, all our support services are completely free for all users, regardless of your subscription plan.' }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border-l-4 border-[#10b981] hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-[#0f172a] mb-3 text-xl">{faq.q}</h3>
                <p className="text-[#64748b] leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New: Team Member Detail Modal */}
      {selectedMember !== null && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Gradient Background */}
            <div className={`relative bg-gradient-to-br ${teamMembers[selectedMember].color} p-8 md:p-12 text-white rounded-t-3xl`}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Profile Section */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                {typeof teamMembers[selectedMember].image === 'string' && teamMembers[selectedMember].image.startsWith('http') ? (
                  <Image
                    src={teamMembers[selectedMember].image}
                    alt={teamMembers[selectedMember].name}
                    width={150}
                    height={150}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover shadow-2xl ring-8 ring-white/30"
                  />
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-7xl shadow-2xl ring-8 ring-white/30">
                    {teamMembers[selectedMember].image}
                  </div>
                )}

                <div className="text-center md:text-left flex-1">
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-3">{teamMembers[selectedMember].name}</h2>
                  <p className="text-2xl text-white/90 font-semibold mb-4">{teamMembers[selectedMember].role}</p>
                  
                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        <span className="font-bold">{teamMembers[selectedMember].experience}</span>
                      </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        <span className="font-bold">{teamMembers[selectedMember].projects}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 md:p-12 space-y-8">
              {/* Bio */}
              <div>
                <h3 className="text-2xl font-extrabold text-[#0f172a] mb-4 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  About
                </h3>
                <p className="text-[#64748b] text-lg leading-relaxed">{teamMembers[selectedMember].bio}</p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-2xl font-extrabold text-[#0f172a] mb-4 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  <Code className="w-6 h-6 text-emerald-600" />
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {teamMembers[selectedMember].skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 text-emerald-700 rounded-full font-bold text-sm hover:scale-105 transition-transform duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-2xl font-extrabold text-[#0f172a] mb-4 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  <Award className="w-6 h-6 text-emerald-600" />
                  Key Achievements
                </h3>
                <div className="space-y-4">
                  {teamMembers[selectedMember].achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-white rounded-xl border-l-4 border-emerald-500 hover:shadow-md transition-all duration-300">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <p className="text-[#1e293b] font-medium leading-relaxed">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-extrabold text-[#0f172a] mb-4 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  Connect
                </h3>
                <div className="flex gap-4">
                  <Link 
                    href={teamMembers[selectedMember].social.linkedin}
                    className="flex-1 bg-gradient-to-br from-[#0891b2] to-[#0e7490] hover:from-[#0e7490] hover:to-[#155e75] text-white p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 font-bold"
                  >
                    <Linkedin className="w-6 h-6" />
                    LinkedIn
                  </Link>
                  <Link 
                    href={teamMembers[selectedMember].social.github}
                    className="flex-1 bg-gradient-to-br from-[#1e293b] to-[#0f172a] hover:from-[#0f172a] hover:to-black text-white p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 font-bold"
                  >
                    <Github className="w-6 h-6" />
                    GitHub
                  </Link>
                  <Link 
                    href={teamMembers[selectedMember].social.twitter}
                    className="flex-1 bg-gradient-to-br from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 font-bold"
                  >
                    <Twitter className="w-6 h-6" />
                    Twitter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes draw-line {
          0% { stroke-dasharray: 0 200; }
          100% { stroke-dasharray: 200 0; }
        }
        
        @keyframes word-slide {
          0%, 33% { transform: translateY(0); }
          34%, 66% { transform: translateY(-100%); }
          67%, 100% { transform: translateY(-200%); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 6s infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-draw-line {
          stroke-dasharray: 200;
          animation: draw-line 2s ease-out forwards;
        }
        
        .animate-word-slide {
          animation: word-slide 6s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.2s both;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
          animation-fill-mode: both;
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}