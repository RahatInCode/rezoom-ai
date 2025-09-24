"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mic, Send, Lightbulb, Play } from "lucide-react";

export default function MockInterviewPage() {
  const [answer, setAnswer] = useState("");
  const [mode, setMode] = useState<"text" | "code">("text");
  const [code, setCode] = useState("// Write your solution here");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col text-gray-900 dark:text-white">
      
      <header className="flex justify-between items-center px-6 py-4 bg-white/10 dark:bg-gray-800/30 backdrop-blur-md shadow-lg sticky top-0 z-10">
        <h1 className="text-2xl font-bold">🚀 Mock Interview with AI</h1>
        <button className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition shadow">
          Exit
        </button>
      </header>

      <main className="flex flex-col md:flex-row flex-1 gap-6 p-6 max-w-7xl mx-auto w-full min-h-[600px]">
        
        <div className="w-full md:w-1/3 bg-white/10 dark:bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col justify-between">
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="relative w-28 h-28 mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-xl opacity-70 animate-pulse"></div>
              <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-lg"></div>
            </motion.div>
            <h2 className="text-xl font-semibold">AI Interviewer</h2>
            <p className="mt-4 text-gray-200 text-sm">
              Can you implement a function to <strong>reverse a string</strong>?
            </p>
          </div>
          <button className="mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition shadow">
            <Lightbulb size={18} /> Show Hint
          </button>
        </div>

        <div className="flex-1 bg-white/10 dark:bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setMode("text")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                mode === "text"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              Text Answer
            </button>
            <button
              onClick={() => setMode("code")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                mode === "code"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              Coding Task
            </button>
          </div>

          {mode === "text" && (
            <>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="flex-1 p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50/80 dark:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              />
              <div className="flex items-center justify-between mt-6">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition shadow-sm">
                  <Mic size={18} /> Record
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition shadow">
                  <Send size={18} /> Submit
                </button>
              </div>
            </>
          )}

          {mode === "code" && (
            <>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 p-4 rounded-xl font-mono border border-gray-300 dark:border-gray-600 bg-gray-900 text-green-200 resize-none text-sm"
              />
              <div className="flex items-center justify-between mt-6">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition shadow">
                  <Play size={18} /> Run Code
                </button>
              </div>
            </>
          )}
        </div>

        <div className="w-full md:w-1/4 bg-white/10 dark:bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-4">Progress</h3>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full w-1/3"></div>
            </div>
            <p className="mt-2 text-sm text-gray-300">Question 2 of 5</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Timer</h3>
            <p className="text-2xl font-bold">07:32</p>
          </div>
        </div>

      </main>
    </div>
  );
}







