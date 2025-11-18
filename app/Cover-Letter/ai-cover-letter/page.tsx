"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../../Components/ui/Input";
import { Textarea } from "../../Components/ui/Textarea";
import { Button } from "../../Components/ui/Button";
import { Card, CardContent } from "../../Components/ui/Card";

export default function CoverLetterGenerator() {
  const [copied, setCopied] = useState(false);

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
      const res = await fetch("/api/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      console.log(process.env.PUBLIC_URL);

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
        className="grid gap-4 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        {/* Updated: White card with emerald border */}
        <Card className="p-8 md:p-10 space-y-6 shadow-2xl rounded-2xl border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300">
          <Input
            name="jobTitle"
            placeholder="Job Title (e.g., Software Engineer)"
            value={form.jobTitle}
            onChange={handleChange}
            required
            className="border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 rounded-xl p-4 text-slate-900 font-medium transition-all"
          />
          <Input
            name="companyName"
            placeholder="Company Name (e.g., Google)"
            value={form.companyName}
            onChange={handleChange}
            required
            className="border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 rounded-xl p-4 text-slate-900 font-medium transition-all"
          />
          <Input
            name="skills"
            placeholder="Skills (comma separated: React, Node, MongoDB)"
            value={form.skills}
            onChange={handleChange}
            required
            className="border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 rounded-xl p-4 text-slate-900 font-medium transition-all"
          />
          <Input
            name="experience"
            placeholder="Years of Experience (e.g., 3)"
            value={form.experience}
            onChange={handleChange}
            required
            className="border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 rounded-xl p-4 text-slate-900 font-medium transition-all"
          />
          <Textarea
            name="highlights"
            placeholder="Career Highlights (e.g., Built scalable web apps, Led a team of 5)"
            value={form.highlights}
            onChange={handleChange}
            required
            className="border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 rounded-xl p-4 text-slate-900 font-medium transition-all min-h-[120px]"
          />

          {/* Updated: Emerald gradient button with rounded-full */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full py-4 text-lg font-bold shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-['Inter',sans-serif]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Cover Letter"
            )}
          </Button>
        </Card>
      </motion.form>

      {/* Updated: Result card with emerald accents */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          {/* Updated: White card with emerald border */}
          <Card className="p-8 bg-white shadow-2xl rounded-2xl border-l-4 border-emerald-500">
            <h2 className="text-2xl font-bold mb-6 text-emerald-700 flex items-center gap-2 font-['Inter',sans-serif]">
              <span className="text-3xl">✨</span>
              Your Generated Cover Letter:
            </h2>
            {/* Fixed: Removed style prop, added font to className */}
            <CardContent className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg mb-6 p-6 bg-emerald-50/50 rounded-xl border border-emerald-200 font-['Inter',sans-serif]">
              {result}
            </CardContent>

            {/* Updated: Emerald copy button */}
            <Button
              onClick={() => {
                navigator.clipboard.writeText(result).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 5000);
                });
              }}
              className={`w-full text-white rounded-full py-4 text-lg font-bold shadow-2xl transform hover:scale-[1.02] transition-all duration-300 font-['Inter',sans-serif] ${
                copied
                  ? "bg-green-600 hover:bg-green-700 shadow-green-500/50"
                  : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-emerald-500/50"
              }`}
            >
              {copied ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy to Clipboard
                </span>
              )}
            </Button>
          </Card>
        </motion.div>
      )}
    </div>
  );
}