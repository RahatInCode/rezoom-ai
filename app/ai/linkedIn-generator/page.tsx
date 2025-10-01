"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../Components/ui/Button";


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
  const [copied, setCopied] = useState(false);

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
      const res = await fetch("http://localhost:5000/generate-linkedin-summary", {
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
    <div className="py-10 px-4 md:px-10">
      <motion.form
        onSubmit={handleSubmit}
        className="mt-8 grid border text-gray-900 gap-4 max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6"
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
          {loading ? "Generating..." : "Generate Summary"}
        </button>
      </motion.form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 max-w-2xl mx-auto bg-gray-50 shadow-md rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold mb-3 text-blue-600">
            Your LinkedIn Summary:
          </h2>
          <p className="whitespace-pre-wrap text-gray-700 mb-4">{result}</p>

          {/* Copy Button */}
          <Button
            onClick={() => {
              navigator.clipboard.writeText(result).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 5000);
              });
            }}
            className={`w-full text-white rounded-lg py-2 ${
              copied
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gradient-to-r from-blue-500 via-teal-500 to-green-500"
            }`}
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
