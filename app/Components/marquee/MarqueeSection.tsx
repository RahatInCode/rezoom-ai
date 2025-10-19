// components/MarqueeSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Star, 
  Users, 
  FileText, 
  Briefcase, 
  TrendingUp,
  Award,
  Zap,
  Shield,
  Sparkles
} from 'lucide-react';

// Stats Data
const stats = [
  { icon: Users, value: '50K+', label: 'Active Users', color: 'text-emerald-500' },
  { icon: FileText, value: '100K+', label: 'Resumes Created', color: 'text-blue-500' },
  { icon: Briefcase, value: '95%', label: 'Success Rate', color: 'text-purple-500' },
  { icon: Star, value: '4.9/5', label: 'User Rating', color: 'text-yellow-500' },
  { icon: TrendingUp, value: '87%', label: 'Interview Rate', color: 'text-teal-500' },
  { icon: Award, value: '200+', label: 'Templates', color: 'text-pink-500' },
];

// Testimonials Data
const testimonials = [
  { name: 'Sarah Johnson', role: 'Software Engineer', company: 'Google', text: 'Got my dream job in 2 weeks!' },
  { name: 'Michael Chen', role: 'Product Manager', company: 'Amazon', text: 'Best resume builder I\'ve used' },
  { name: 'Emily Davis', role: 'UX Designer', company: 'Apple', text: 'AI suggestions were incredibly helpful' },
  { name: 'David Miller', role: 'Data Analyst', company: 'Microsoft', text: 'Passed ATS screening every time' },
  { name: 'Jessica Brown', role: 'Marketing Director', company: 'Meta', text: 'Professional templates saved me hours' },
  { name: 'Alex Thompson', role: 'DevOps Engineer', company: 'Netflix', text: 'Interview prep was a game-changer' },
];

// Features Data
const features = [
  { icon: Zap, text: 'AI-Powered Resume Builder', gradient: 'from-emerald-500 to-teal-500' },
  { icon: Shield, text: 'ATS-Friendly Templates', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Sparkles, text: 'Smart Keyword Optimization', gradient: 'from-purple-500 to-pink-500' },
  { icon: CheckCircle, text: '24/7 Expert Support', gradient: 'from-orange-500 to-red-500' },
  { icon: TrendingUp, text: 'Real-Time Feedback', gradient: 'from-green-500 to-emerald-500' },
  { icon: Award, text: 'Industry-Specific Guidance', gradient: 'from-indigo-500 to-purple-500' },
];

// Companies Data
const companies = [
  'Google', 'Amazon', 'Microsoft', 'Apple', 'Meta', 'Netflix', 
  'Tesla', 'Spotify', 'Uber', 'Airbnb', 'LinkedIn', 'Adobe'
];

const MarqueeSection = () => {
  return (
    <div className="relative py-20 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 space-y-16">
        
        {/* Section 1: Stats Marquee */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Trusted by Thousands of Professionals
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="relative overflow-hidden py-8">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-emerald-50/30 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-emerald-50/30 to-transparent z-10"></div>

            {/* Infinite scroll container */}
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {/* Render stats twice for seamless loop */}
              {[...stats, ...stats, ...stats].map((stat, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-white rounded-2xl p-8 shadow-lg border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:scale-105 min-w-[280px]"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color === 'text-emerald-500' ? 'from-emerald-100 to-emerald-200' : stat.color === 'text-blue-500' ? 'from-blue-100 to-blue-200' : stat.color === 'text-purple-500' ? 'from-purple-100 to-purple-200' : stat.color === 'text-yellow-500' ? 'from-yellow-100 to-yellow-200' : stat.color === 'text-teal-500' ? 'from-teal-100 to-teal-200' : 'from-pink-100 to-pink-200'} flex items-center justify-center shadow-md`}>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <div>
                      <div 
                        className="text-3xl font-extrabold text-slate-900"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {stat.value}
                      </div>
                      <div 
                        className="text-sm font-medium text-slate-600"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Section 2: Testimonials Marquee (Reverse Direction) */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              What Our Users Say
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="relative overflow-hidden py-8">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-emerald-50/30 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-emerald-50/30 to-transparent z-10"></div>

            {/* Reverse scroll */}
            <motion.div
              className="flex gap-6"
              animate={{
                x: [-1920, 0],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 35,
                  ease: "linear",
                },
              }}
            >
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl p-6 shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300 min-w-[340px] max-w-[340px]"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                  <p 
                    className="text-slate-700 mb-4 italic font-medium text-base leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-emerald-200">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div 
                        className="font-bold text-slate-900 text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {testimonial.name}
                      </div>
                      <div 
                        className="text-xs text-slate-600"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Section 3: Features Marquee */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Powerful Features at Your Fingertips
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="relative overflow-hidden py-8">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-emerald-50/30 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-emerald-50/30 to-transparent z-10"></div>

            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -1440],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[...features, ...features, ...features].map((feature, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-white rounded-full px-8 py-4 shadow-lg border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-md`}>
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <span 
                      className="font-bold text-slate-900 whitespace-nowrap text-base"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {feature.text}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Section 4: Companies Marquee (Simple Text) */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p 
              className="text-lg font-semibold text-slate-600 mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Our Users Have Been Hired At:
            </p>
          </motion.div>

          <div className="relative overflow-hidden py-6">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-emerald-50/30 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-emerald-50/30 to-transparent z-10"></div>

            <motion.div
              className="flex gap-12"
              animate={{
                x: [-1200, 0],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[...companies, ...companies, ...companies].map((company, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 text-2xl font-bold text-slate-400 hover:text-emerald-600 transition-colors duration-300 whitespace-nowrap"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {company}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MarqueeSection;