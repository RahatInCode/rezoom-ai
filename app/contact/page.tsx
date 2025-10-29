"use client";
import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MapPin, Clock, Users, Github, Linkedin, Twitter, Phone, Headphones } from 'lucide-react';
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

  const teamMembers = [
    { name: 'Ahmed Rahat', role: 'Team Leader', image: "https://i.ibb.co.com/XxMTQDtD/557454921-1196579695839906-8771704890222554294-n.jpg", color: 'from-emerald-400 to-emerald-600' },
    { name: 'Suprotik Chowdhury', role: 'Backend Developer', image: '👨‍💼', color: 'from-teal-400 to-teal-600' },
    { name: 'Fouzia Rahman', role: 'UI/UX Designer', image: "https://i.ibb.co.com/MDpgRT1P/532218142-2205663219948056-9166397322869593699-n.jpg", color: 'from-green-400 to-green-600' },
    { name: 'Ibrahim', role: 'Frontend Developer', image:  "https://i.ibb.co.com/rRZGQN66/472221860-952996390079219-3885647675502620921-n.jpg", color: 'from-emerald-500 to-green-600' },
    { name: 'Abir Hasan', role: 'Full Stack Developer', image: "https://i.ibb.co.com/5gqtnBpr/1674161393535.jpg", color: 'from-teal-500 to-emerald-600' },
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
    // Updated: Light sage to white gradient background
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] via-white to-[#f8fafc]">
{/* Hero Section - Enhanced with Modern Effects */}
<div className="relative overflow-hidden bg-gradient-to-br from-[#10b981] via-[#059669] to-[#047857]">
  {/* Animated Background Pattern */}
  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 animate-pulse"></div>
  
  {/* Floating Shapes */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl animate-float"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 opacity-10 rounded-full blur-3xl animate-float-delayed"></div>
    <div className="absolute top-40 right-1/4 w-64 h-64 bg-teal-300 opacity-5 rounded-full blur-2xl animate-float-slow"></div>
  </div>
  
  <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
    <div className="text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 text-white px-6 py-2 rounded-full mb-8 font-semibold text-sm shadow-xl animate-fade-in">
        <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
        Available 24/7
      </div>
      
      {/* Main Heading with Gradient Text Effect */}
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-tight animate-slide-down">
        Let&apos;s <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-100 to-white">Connect</span>
      </h1>
      
      {/* Subheading */}
      <p className="text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto font-medium leading-relaxed mb-12 animate-slide-up">
        Have questions about building your perfect resume? Our Head Hunters team is here to help you succeed.
      </p>
      
      {/* Stats Row */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">24/7</div>
          <div className="text-emerald-100 text-sm md:text-base font-medium">Support Available</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">&lt;24h</div>
          <div className="text-emerald-100 text-sm md:text-base font-medium">Response Time</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">10K+</div>
          <div className="text-emerald-100 text-sm md:text-base font-medium">Happy Users</div>
        </div>
      </div>
    </div>
  </div>
</div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Contact Methods Grid */}
        {/* Updated: Increased negative margin for better overlap effect */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 -mt-24 relative z-10">
          {/* Updated: Enhanced card with emerald accent border, better shadows */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-[#10b981] hover:shadow-emerald-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {/* Updated: Emerald gradient icon background */}
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl mb-5 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            {/* Updated: Navy headings, medium weight body text */}
            <h3 className="font-bold text-[#0f172a] mb-3 text-xl">Email Us</h3>
            <p className="text-[#1e293b] text-base mb-2 font-medium">support@headhunters.com</p>
            <p className="text-[#64748b] text-sm">We reply within 24 hours</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-[#10b981] hover:shadow-emerald-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Updated: Teal to emerald gradient */}
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#14b8a6] to-[#10b981] rounded-2xl mb-5 shadow-lg">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-[#0f172a] mb-3 text-xl">Call Us</h3>
            <p className="text-[#1e293b] text-base mb-2 font-medium">(+88)01639-448792</p>
            <p className="text-[#64748b] text-sm">Mon-Fri, 9AM-6PM EST</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-[#10b981] hover:shadow-emerald-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {/* Updated: Emerald variant gradient */}
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#059669] to-[#047857] rounded-2xl mb-5 shadow-lg">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-[#0f172a] mb-3 text-xl">Live Chat</h3>
            <p className="text-[#1e293b] text-base mb-2 font-medium">Instant Support</p>
            <p className="text-[#64748b] text-sm">Available 24/7</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-[#10b981] hover:shadow-emerald-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {/* Updated: Dark emerald gradient */}
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
            {/* Updated: Enhanced border radius, better shadow */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 hover:shadow-emerald-50 hover:shadow-2xl transition-all duration-300">
              {/* Updated: Navy heading, extrabold */}
              <h2 className="text-4xl font-extrabold text-[#0f172a] mb-3 tracking-tight">Send us a Message</h2>
              {/* Updated: Medium gray text */}
              <p className="text-[#64748b] text-lg mb-10 leading-relaxed">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>

              {submitted ? (
                <div className="text-center py-16 animate-scale-in">
                  {/* Updated: Emerald success state */}
                  <div className="flex items-center justify-center w-24 h-24 bg-emerald-50 border-4 border-emerald-200 rounded-full mx-auto mb-6 animate-bounce">
                    <CheckCircle2 className="w-12 h-12 text-[#10b981]" />
                  </div>
                  {/* Updated: Navy heading */}
                  <h3 className="text-3xl font-bold text-[#0f172a] mb-4">Message Sent Successfully!</h3>
                  <p className="text-[#64748b] text-lg">Thank you for reaching out. Our team will respond within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      {/* Updated: Navy labels, semibold */}
                      <label htmlFor="name" className="block text-sm font-bold text-[#0f172a] mb-3">
                        Full Name *
                      </label>
                      {/* Updated: Emerald focus ring, better border radius */}
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

                  {/* Updated: Full Rezoom.AI button style - emerald, rounded-full, hover:scale-105 */}
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
            {/* Updated: Emerald gradient background */}
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
                {/* Updated: Emerald icon background */}
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
              {/* Updated: Emerald background for note */}
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
                {/* Updated: Emerald social buttons with rounded-xl */}
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

        {/* Team Section */}
        <div className="animate-fade-in-up mb-20">
          <div className="text-center mb-16">
            {/* Updated: Emerald badge */}
            <div className="inline-flex items-center gap-3 bg-emerald-50 border-2 border-emerald-200 text-[#047857] px-8 py-3 rounded-full mb-6 font-bold text-base shadow-md">
              <Users className="w-6 h-6" />
              Our Team
            </div>
            {/* Updated: Navy heading, extrabold */}
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#0f172a] mb-6 tracking-tight">Meet the Head Hunters</h2>
            <p className="text-xl text-[#64748b] max-w-2xl mx-auto leading-relaxed font-medium">
              A passionate team of developers and designers dedicated to helping you build the perfect resume.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                // Updated: Enhanced card with emerald accent, better hover
                className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100 hover:border-emerald-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 animate-fade-in-up group"
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
                <div className="flex justify-center gap-3">
                  {/* Updated: Emerald hover states */}
                  <Link href="https://www.linkedin.com" className="w-10 h-10 bg-gray-50 hover:bg-emerald-50 border-2 border-gray-200 hover:border-[#10b981] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md">
                    <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-[#10b981]" />
                  </Link>
                  <Link href="https://www.github.com" className="w-10 h-10 bg-gray-50 hover:bg-gray-900 border-2 border-gray-200 hover:border-gray-900 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md group">
                    <Github className="w-5 h-5 text-gray-600 group-hover:text-white" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-gray-100 animate-fade-in">
          {/* Updated: Navy heading */}
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

      <style jsx>{`
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