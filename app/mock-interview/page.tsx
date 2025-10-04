"use client";
// setting up vapi for ai voice
import React, { useState } from 'react';
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
  Send
} from 'lucide-react';

const MockInterviewPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMockInterview, setShowMockInterview] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [codeEditorCollapsed, setCodeEditorCollapsed] = useState(true);
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
    setShowMockInterview(false);
    setSelectedCard(null);
    setShowCodeEditor(false);
    setCodeEditorCollapsed(true);
    setCurrentCode(`// Write your solution here
function solution() {
    // Your code goes here
    
}`);
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
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Interview Panels */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* AI Interviewer Panel */}
              <div className="bg-gray-800 rounded-2xl p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center">
                    <div className="text-4xl">🤖</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">AI Interviewer</h3>
                <div className="w-4 h-4 bg-green-400 rounded-full mx-auto animate-pulse"></div>
              </div>

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
            <div className="bg-gray-800 rounded-2xl p-8 mb-8">
              <div className="text-center">
                <h4 className="text-xl font-semibold text-white mb-4">Interview Question</h4>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  What job experience level are you targeting?
                </p>
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
              <div className="mb-8">
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
                          {currentCode.split('\n').map((line, index) => (
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

            {/* Controls */}
            <div className="flex justify-center space-x-6">
              <button 
                onClick={() => console.log('Repeat question')}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
              >
                <Repeat className="w-5 h-5" />
                <span>Repeat</span>
              </button>
              <button 
                onClick={handleLeaveInterview}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Leave Interview</span>
              </button>
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
                  Take Interview x
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







