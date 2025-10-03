"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../../Components/ui/Input";
import { Textarea } from "../../Components/ui/Textarea";
import { Button } from "../../Components/ui/Button";
import { Card, CardContent } from "../../Components/ui/Card";



export default function CoverLetterGenerator() {
  const [form, setForm] = useState({
    jobTitle: "",
    companyName: "",
    skills: "",
    experience: "",
    highlights: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("https://rezoom-ai-pi.vercel.app/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResult(data.coverLetter || "Error: No response from AI");
    } catch (error) {
      console.error(error);
      setResult("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="px-4 md:px-10">
      

      <motion.form
        onSubmit={handleSubmit}
        className=" grid gap-4 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <Card className="p-8 space-y-4 shadow-lg rounded-2xl">
          <Input
            name="jobTitle"
            placeholder="Job Title (e.g., Software Engineer)"
            value={form.jobTitle}
            onChange={handleChange}
            required
          />
          <Input
            name="companyName"
            placeholder="Company Name (e.g., Google)"
            value={form.companyName}
            onChange={handleChange}
            required
          />
          <Input
            name="skills"
            placeholder="Skills (comma separated: React, Node, MongoDB)"
            value={form.skills}
            onChange={handleChange}
            required
          />
          <Input
            name="experience"
            placeholder="Years of Experience (e.g., 3)"
            value={form.experience}
            onChange={handleChange}
            required
          />
          <Textarea
            name="highlights"
            placeholder="Career Highlights (e.g., Built scalable web apps, Led a team of 5)"
            value={form.highlights}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-lg py-2"
          >
            {loading ? "Generating..." : "Generate Cover Letter"}
          </Button>
        </Card>
      </motion.form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <Card className="p-5 bg-gray-50 shadow-md rounded-2xl">
            <h2 className="text-lg font-semibold mb-3 text-indigo-600">
              Your Generated Cover Letter:
            </h2>
            <CardContent className="whitespace-pre-wrap text-gray-700">
              {result}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
