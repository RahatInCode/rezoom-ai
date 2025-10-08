"use client";
// setting up vapi for ai voice
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayCircle, 
  Code, 
  Database, 
  Smartphone, 
  Shield, 
  TrendingUp, 
  Users, 
  Briefcase, 
  X,
  Repeat,
  LogOut,
  User,
  ChevronDown,
  ChevronUp,
  Play,
  Send,
  Pause,
  Volume2,
  Settings,
  FileText,
  Mic,
  // MicOff,
  Clock,
  // CheckCircle
} from 'lucide-react';

const MockInterviewPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMockInterview, setShowMockInterview] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [codeEditorCollapsed, setCodeEditorCollapsed] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interviewTime, setInterviewTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showSettings, setShowSettings] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcript, setTranscript] = useState([
    { speaker: 'AI', text: 'Hello! Welcome to your mock interview. Let\'s get started.', time: '0:00' },
    { speaker: 'You', text: 'Hi, I\'m ready!', time: '0:05' },
    { speaker: 'AI', text: 'Great! Tell me about yourself and your background.', time: '0:10' }
  ]);
  const [currentCode, setCurrentCode] = useState(`// Write your solution here
function solution() {
    // Your code goes here
    
}`);
  const [formData, setFormData] = useState({
    interviewType: 'Technical',
    role: '',
    techStack: '',
    duration: '30'
  });

  // Simulate AI speaking
  useEffect(() => {
    if (showMockInterview) {
      const interval = setInterval(() => {
        setIsSpeaking((prev) => !prev);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showMockInterview]);

  // Interview timer
  useEffect(() => {
    let interval;
    if (showMockInterview && !isPaused) {
      interval = setInterval(() => {
        setInterviewTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showMockInterview, isPaused]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Interview types data
  const interviewTypes = [
    {
      id: 1,
      title: 'System Design',
      category: 'Technical',
      icon: <Code className="w-8 h-8 text-blue-400" />,
      description: 'Design scalable systems and architecture'
    },
    {
      id: 2,
      title: 'Business Analyst',
      category: 'Non-Technical',
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      description: 'Business requirements and analysis'
    },
    {
      id: 3,
      title: 'Mobile App Development',
      category: 'Technical',
      icon: <Smartphone className="w-8 h-8 text-purple-400" />,
      description: 'iOS and Android development'
    },
    {
      id: 4,
      title: 'SQL & Database',
      category: 'Technical',
      icon: <Database className="w-8 h-8 text-yellow-400" />,
      description: 'Database design and queries'
    },
    {
      id: 5,
      title: 'Cybersecurity',
      category: 'Technical',
      icon: <Shield className="w-8 h-8 text-red-400" />,
      description: 'Security protocols and practices'
    },
    {
      id: 6,
      title: 'Sales & Marketing',
      category: 'Non-Technical',
      icon: <Users className="w-8 h-8 text-pink-400" />,
      description: 'Sales strategies and marketing'
    }
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setFormData({ ...formData, interviewType: card.category });
    setShowModal(true);
  };

  const handleStartInterview = () => {
    console.log('Starting interview with:', formData);
    setShowModal(false);
    setShowMockInterview(true);
  };

  const handleLeaveInterview = () => {
    if (window.confirm('Are you sure you want to leave the interview? Your progress will be saved.')) {
      setShowMockInterview(false);
      setSelectedCard(null);
      setShowCodeEditor(false);
      setCodeEditorCollapsed(true);
      setIsSpeaking(false);
      setInterviewTime(0);
      setIsPaused(false);
      setCurrentCode(`// Write your solution here
function solution() {
    // Your code goes here
    
}`);
    }
  };

  const handleTriggerCodingQuestion = () => {
    setShowCodeEditor(true);
    setCodeEditorCollapsed(false);
    console.log('Coding question triggered - opening code editor');
  };

  const handleToggleCodeEditor = () => {
    setCodeEditorCollapsed(!codeEditorCollapsed);
  };

  const handleSubmitCode = () => {
    console.log('Code submitted:', currentCode);
    alert('Code submitted successfully! Check console for the code.');
  };

  const handleCodeChange = (e) => {
    setCurrentCode(e.target.value);
  };

  // Mock Interview Interface Component
  if (showMockInterview) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Top Navigation Bar */}
        <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Left: Interview Info */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-lg font-semibold">{formatTime(interviewTime)}</span>
                  <span className="text-sm text-gray-400">/ {formData.duration}:00</span>
                </div>
                <div className="hidden md:block text-sm text-gray-400">
                  {formData.role || 'General Interview'} • {formData.interviewType}
                </div>
              </div>

              {/* Right: Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  title={isPaused ? 'Resume' : 'Pause'}
                >
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className={`p-2 hover:bg-gray-700 rounded-lg transition-colors ${showTranscript ? 'bg-gray-700' : ''}`}
                  title="Transcript"
                >
                  <FileText className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-2 hover:bg-gray-700 rounded-lg transition-colors ${showSettings ? 'bg-gray-700' : ''}`}
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>

                <div className="h-6 w-px bg-gray-700"></div>

                <button
                  onClick={handleLeaveInterview}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Leave</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-4">
              {/* Main Content Area */}
              <div className="flex-1 space-y-8">
                {/* Interview Panels */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* AI Interviewer Panel with Framer Motion */}
                  <motion.div 
                    className="bg-gray-800 rounded-2xl p-8 text-center relative overflow-hidden"
                    animate={{
                      boxShadow: isSpeaking 
                        ? [
                            '0 0 20px rgba(59, 130, 246, 0.5)',
                            '0 0 40px rgba(139, 92, 246, 0.6)',
                            '0 0 20px rgba(59, 130, 246, 0.5)'
                          ]
                        : '0 0 0px rgba(0, 0, 0, 0)'
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isSpeaking ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Animated glow overlay */}
                    <AnimatePresence>
                      {isSpeaking && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          style={{
                            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2), transparent 70%)'
                          }}
                        />
                      )}
                    </AnimatePresence>

                    <motion.div
                      className="relative z-10"
                      animate={{
                        scale: isSpeaking ? [1, 1.05, 1] : 1
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: isSpeaking ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.div 
                        className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center"
                        animate={{
                          background: isSpeaking 
                            ? [
                                'linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))',
                                'linear-gradient(135deg, rgb(139, 92, 246), rgb(236, 72, 153))',
                                'linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))'
                              ]
                            : 'linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))'
                        }}
                        transition={{
                          duration: 2,
                          repeat: isSpeaking ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center">
                          <motion.div 
                            className="text-4xl"
                            animate={{
                              scale: isSpeaking ? [1, 1.1, 1] : 1
                            }}
                            transition={{
                              duration: 0.5,
                              repeat: isSpeaking ? Infinity : 0,
                              ease: "easeInOut"
                            }}
                          >
                            🤖
                          </motion.div>
                        </div>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">AI Interviewer</h3>
                      <motion.div
                        className="w-4 h-4 rounded-full mx-auto"
                        animate={{
                          backgroundColor: isSpeaking ? '#4ade80' : '#6b7280',
                          scale: isSpeaking ? [1, 1.2, 1] : 1
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: isSpeaking ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      />
                      {isSpeaking && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-green-400 mt-2"
                        >
                          Speaking...
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* User Panel */}
                  <div className="bg-gray-800 rounded-2xl p-8 text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">You</h3>
                    <div className="w-4 h-4 bg-gray-500 rounded-full mx-auto"></div>
                  </div>
                </div>

                {/* Question Section */}
                <div className="bg-gray-800 rounded-2xl p-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <h4 className="text-xl font-semibold text-white">Interview Question</h4>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">Question 3 of 10</span>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                      What job experience level are you targeting?
                    </p>
                    
                    {/* Microphone Status */}
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <div className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg">
                        <Mic className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Microphone Active</span>
                      </div>
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={handleTriggerCodingQuestion}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm"
                      >
                        <Code className="w-4 h-4" />
                        <span>Trigger Coding Question</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Collapsible Code Editor Panel */}
                {showCodeEditor && (
                  <div>
                    <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                      {/* Code Editor Header */}
                      <div 
                        className="flex items-center justify-between p-4 bg-gray-900 cursor-pointer hover:bg-gray-700 transition-colors"
                        onClick={handleToggleCodeEditor}
                      >
                        <div className="flex items-center space-x-3">
                          <Code className="w-5 h-5 text-blue-400" />
                          <h4 className="text-lg font-semibold text-white">Code Editor</h4>
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                            JavaScript/TypeScript
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {codeEditorCollapsed ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {/* Code Editor Content */}
                      <div className={`transition-all duration-300 ease-in-out ${
                        codeEditorCollapsed ? 'max-h-0 overflow-hidden' : 'max-h-screen overflow-visible'
                      }`}>
                        <div className="p-6">
                          {/* Problem Statement */}
                          <div className="mb-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
                            <h5 className="text-md font-semibold text-yellow-400 mb-2">Coding Challenge</h5>
                            <p className="text-gray-300 text-sm">
                              Write a function that finds the two numbers in an array that add up to a target sum.
                              Return the indices of these two numbers.
                            </p>
                          </div>

                          {/* Code Editor Area */}
                          <div className="relative bg-gray-900 rounded-lg border border-gray-600">
                            <textarea
                              value={currentCode}
                              onChange={handleCodeChange}
                              className="w-full h-64 bg-transparent text-gray-100 font-mono text-sm p-4 pl-12 rounded-lg focus:outline-none resize-none"
                              style={{
                                lineHeight: '1.5',
                              }}
                              spellCheck={false}
                              placeholder="// Start coding here..."
                            />
                            
                            {/* Line numbers */}
                            <div className="absolute top-4 left-4 text-xs text-gray-500 font-mono leading-6 pointer-events-none select-none">
                              {currentCode.split('\n').map((_, index) => (
                                <div key={index}>{index + 1}</div>
                              ))}
                            </div>
                          </div>

                          {/* Editor Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span>Ready to code</span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => console.log('Run code:', currentCode)}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
                              >
                                <Play className="w-4 h-4" />
                                <span>Run Code</span>
                              </button>
                              
                              <button
                                onClick={handleSubmitCode}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
                              >
                                <Send className="w-4 h-4" />
                                <span>Submit Code</span>
                              </button>
                            </div>
                          </div>

                          {/* Code Output/Results Area */}
                          <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
                            <div className="flex items-center justify-between mb-2">
                              <h6 className="text-sm font-semibold text-gray-300">Output</h6>
                              <div className="text-xs text-gray-500">Console</div>
                            </div>
                            <div className="text-sm text-green-400 font-mono">
                              {/* Output will appear here when you run your code */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => console.log('Repeat question')}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                  >
                    <Repeat className="w-5 h-5" />
                    <span>Repeat Question</span>
                  </button>
                  <button 
                    onClick={() => console.log('Skip question')}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
                  >
                    <span>Skip Question</span>
                  </button>
                </div>
              </div>

              {/* Right Sidebar - Transcript/Settings */}
              <AnimatePresence>
                {(showTranscript || showSettings) && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 320, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800 rounded-2xl p-6 border border-gray-700 overflow-hidden"
                  >
                    {showTranscript && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Transcript</h3>
                          <button
                            onClick={() => setShowTranscript(false)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto">
                          {transcript.map((entry, index) => (
                            <div key={index} className="text-sm">
                              <div className="flex items-center justify-between mb-1">
                                <span className={`font-semibold ${
                                  entry.speaker === 'AI' ? 'text-blue-400' : 'text-green-400'
                                }`}>
                                  {entry.speaker}
                                </span>
                                <span className="text-xs text-gray-500">{entry.time}</span>
                              </div>
                              <p className="text-gray-300">{entry.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {showSettings && !showTranscript && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Settings</h3>
                          <button
                            onClick={() => setShowSettings(false)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-6">
                          {/* Volume Control */}
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              AI Voice Volume
                            </label>
                            <div className="flex items-center space-x-3">
                              <Volume2 className="w-4 h-4 text-gray-400" />
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={(e) => setVolume(Number(e.target.value))}
                                className="flex-1"
                              />
                              <span className="text-sm text-gray-400 w-10">{volume}%</span>
                            </div>
                          </div>

                          {/* Microphone Toggle */}
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Microphone
                            </label>
                            <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                              <div className="flex items-center space-x-2">
                                <Mic className="w-4 h-4 text-green-400" />
                                <span className="text-sm">Active</span>
                              </div>
                              <div className="w-10 h-6 bg-green-600 rounded-full relative">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                              </div>
                            </button>
                          </div>

                          {/* Difficulty Level */}
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Difficulty Level
                            </label>
                            <select className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm">
                              <option>Easy</option>
                              <option>Medium</option>
                              <option>Hard</option>
                            </select>
                          </div>

                          {/* Auto-transcript */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Auto-transcript</span>
                            <div className="w-10 h-6 bg-blue-600 rounded-full relative">
                              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Landing Page
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ace Your Next Interview with AI-Powered Practice
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Practice technical and non-technical interviews, tailored to your role and experience.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('pick-interview');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-lg font-semibold transition-all transform hover:scale-105"
            >
              <PlayCircle className="w-6 h-6" />
              <span>Start Practicing Now</span>
            </button>
          </div>
          
          {/* Background Decoration */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
        </div>
      </section>

      {/* Pick Your Interview Section */}
      <section id="pick-interview" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Pick Your Interview</h2>
            <p className="text-gray-400 text-lg">Choose from our comprehensive interview categories</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {interviewTypes.map((interview) => (
              <div
                key={interview.id}
                onClick={() => handleCardClick(interview)}
                className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all cursor-pointer transform hover:scale-105 border border-gray-700 hover:border-gray-600"
              >
                <div className="flex items-center justify-between mb-4">
                  {interview.icon}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    interview.category === 'Technical' 
                      ? 'bg-blue-500/20 text-blue-300' 
                      : 'bg-green-500/20 text-green-300'
                  }`}>
                    {interview.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{interview.title}</h3>
                <p className="text-gray-400 mb-4">{interview.description}</p>
                <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-colors">
                  Take Interview
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Create or Polish Your Resume</h2>
            <p className="text-xl text-gray-300 mb-8">
              Build a professional AI-powered resume in minutes to boost your chances of success.
            </p>
            <button 
              onClick={() => console.log('Navigate to Resume Builder')}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-xl text-lg font-semibold transition-all transform hover:scale-105"
            >
              <Briefcase className="w-6 h-6" />
              <span>Build My Resume</span>
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Starting your interview...</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Interview Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="interviewType"
                      value="Technical"
                      checked={formData.interviewType === 'Technical'}
                      onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })}
                      className="mr-2"
                    />
                    Technical
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="interviewType"
                      value="Non-Technical"
                      checked={formData.interviewType === 'Non-Technical'}
                      onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })}
                      className="mr-2"
                    />
                    Non-Technical
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. Frontend Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tech Stack</label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. React, Node.js, MongoDB"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Interview Length</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                </select>
              </div>

              <button
                onClick={handleStartInterview}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-colors"
              >
                Start Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterviewPage;