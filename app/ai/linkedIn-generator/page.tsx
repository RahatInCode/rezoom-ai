'use client'
import React from 'react';
import CoverLetterGenerator from './ai-cover-letter/page';
import LinkedInSummaryGenerator from './linkedIn-generator/page';
import Lottie from 'lottie-react';
import coverLetter from '../../public/lotties/cvLetter.json'
import linkedInAi from '../../public/lotties/linkedInAi.json'
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function LinkedInSummaryGenerator() {
  const [form, setForm] = useState({
    name: "",
    profession: "",
    years: "",
    skills: "",
    achievements: "",
    careerGoal: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("https://rezoom-ai-pi.vercel.app/generate-linkedin-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResult(data.summary || "Error: No response from AI");
    } catch (error) {
      console.error(error);
      setResult("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className=" px-4 md:px-10">
      

      <motion.form
        onSubmit={handleSubmit}
        className=" grid  text-gray-900  gap-4 max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
          required
        />
        <input
          type="text"
          name="profession"
          placeholder="Profession (e.g., Software Engineer)"
          value={form.profession}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
          required
        />
        <input
          type="text"
          name="years"
          placeholder="Years of Experience (e.g., 5)"
          value={form.years}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
          required
        />
        <input
          type="text"
          name="skills"
          placeholder="Key Skills (comma separated: React, Leadership, SQL)"
          value={form.skills}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
          required
        />
        <textarea
          name="achievements"
          placeholder="Career Achievements (e.g., Led a team of 10, Built a SaaS product)"
          value={form.achievements}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full h-24"
          required
        />
        <textarea
          name="careerGoal"
          placeholder="Career Goal (e.g., Passionate about building scalable systems & mentoring developers)"
          value={form.careerGoal}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full h-24"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
        >
          AI Cover Letter Generator
        </motion.h1>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <CoverLetterGenerator />
          </motion.div>
          
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            className="hidden md:flex justify-center"
          >
            <Lottie animationData={coverLetter} loop={true} className="max-w-md w-full" />
          </motion.div>
        </div>
      </section>

     
      <div className="w-full h-px bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300" />

      {/* Section 2 - LinkedIn Summary */}
      <section className="pt-16 px-4 md:px-10 bg-white">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="text-3xl md:text-5xl font-bold text-center mb-12
          bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 bg-clip-text text-transparent"
        >
          AI LinkedIn Summary Generator
        </motion.h1>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            className="hidden md:flex justify-center"
          >
            <Lottie animationData={linkedInAi} loop={true} className="max-w-md w-full" />
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <LinkedInSummaryGenerator />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Page;
