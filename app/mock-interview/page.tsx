"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
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
  MicOff,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Types
interface CodingProblem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  testCases: TestCase[];
  starterCode: string;
  functionName: string;
}

interface TestCase {
  input: unknown[];
  expected: unknown;
  description: string;
}

interface TestResult {
  passed: boolean;
  testCase: TestCase;
  actual?: unknown;
  error?: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface InterviewCard {
  id: number;
  title: string;
  category: string;
  icon: React.ReactNode;
  description: string;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// Move coding problems outside component to avoid recreating on every render
const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    difficulty: 'easy',
    functionName: 'twoSum',
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  
}`,
    testCases: [
      {
        input: [[2, 7, 11, 15], 9],
        expected: [0, 1],
        description: 'nums = [2,7,11,15], target = 9'
      },
      {
        input: [[3, 2, 4], 6],
        expected: [1, 2],
        description: 'nums = [3,2,4], target = 6'
      },
      {
        input: [[3, 3], 6],
        expected: [0, 1],
        description: 'nums = [3,3], target = 6'
      }
    ]
  },
  {
    id: '2',
    title: 'Reverse String',
    description: 'Write a function that reverses a string. The input string is given as an array of characters s.',
    difficulty: 'easy',
    functionName: 'reverseString',
    starterCode: `function reverseString(s) {
  // Write your solution here
  
}`,
    testCases: [
      {
        input: [['h', 'e', 'l', 'l', 'o']],
        expected: ['o', 'l', 'l', 'e', 'h'],
        description: 's = ["h","e","l","l","o"]'
      },
      {
        input: [['H', 'a', 'n', 'n', 'a', 'h']],
        expected: ['h', 'a', 'n', 'n', 'a', 'H'],
        description: 's = ["H","a","n","n","a","h"]'
      }
    ]
  },
  {
    id: '3',
    title: 'Valid Palindrome',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
    difficulty: 'easy',
    functionName: 'isPalindrome',
    starterCode: `function isPalindrome(s) {
  // Write your solution here
  
}`,
    testCases: [
      {
        input: ['A man, a plan, a canal: Panama'],
        expected: true,
        description: 's = "A man, a plan, a canal: Panama"'
      },
      {
        input: ['race a car'],
        expected: false,
        description: 's = "race a car"'
      }
    ]
  }
];

const MockInterviewPage = () => {
  // State management
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
  const [currentCode, setCurrentCode] = useState('');
  const [formData, setFormData] = useState({
    interviewType: 'Technical',
    role: '',
    techStack: '',
    duration: '30'
  });

  // Voice and coding states
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions] = useState(10);
  const [currentCodingProblem, setCurrentCodingProblem] = useState<CodingProblem | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showTestResults, setShowTestResults] = useState(false);
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_OPENAI_API_KEY || '');

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Format time as MM:SS
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Browser TTS fallback (regular function, not a hook)
  const browserTTS = useCallback((text: string, currentVolume: number, onEnd: () => void) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = currentVolume / 100;
      utterance.onend = onEnd;

      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // OpenAI API call - memoized with useCallback
  const callOpenAI = useCallback(async (messages: ConversationMessage[]): Promise<string | null> => {
    if (!apiKey) {
      alert('Please enter your OpenAI API key in settings');
      return null;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      alert('Error calling OpenAI API. Please check your API key and try again.');
      return null;
    }
  }, [apiKey]);

  // Text to Speech using OpenAI - memoized
  const speakText = useCallback(async (text: string) => {
    setIsSpeaking(true);

    try {
      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'tts-1',
          voice: 'alloy',
          input: text,
          speed: 1.0
        })
      });

      if (!response.ok) {
        throw new Error('TTS API error');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }

      audioRef.current = new Audio(audioUrl);
      audioRef.current.volume = volume / 100;
      
      audioRef.current.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audioRef.current.play();
    } catch (error) {
      console.error('TTS Error:', error);
      // Fallback to browser speech synthesis
      browserTTS(text, volume, () => setIsSpeaking(false));
      setIsSpeaking(true);
    }
  }, [apiKey, volume, browserTTS]);

  // Trigger coding question - memoized
  const triggerCodingQuestion = useCallback(() => {
    const randomProblem = CODING_PROBLEMS[Math.floor(Math.random() * CODING_PROBLEMS.length)];
    setCurrentCodingProblem(randomProblem);
    setCurrentCode(randomProblem.starterCode);
    setShowCodeEditor(true);
    setCodeEditorCollapsed(false);
    setTestResults([]);
    setShowTestResults(false);
  }, []);

  // Handle user speech - memoized
  const handleUserSpeech = useCallback(async (transcript: string) => {
    const userMessage: ConversationMessage = {
      role: 'user',
      content: transcript,
      timestamp: formatTime(interviewTime)
    };

    const updatedHistory = [...conversationHistory, userMessage];
    setConversationHistory(updatedHistory);

    setIsProcessing(true);

    // Create system prompt based on interview type
    const systemPrompt: ConversationMessage = {
      role: 'assistant',
      content: `You are an experienced ${formData.role || 'software engineer'} interviewer conducting a ${formData.interviewType} interview. 
      The candidate is interviewing for a ${formData.role} position with tech stack: ${formData.techStack}. 
      Ask relevant questions, provide constructive feedback, and occasionally give coding challenges when appropriate.
      Keep responses concise and professional. Current question number: ${questionNumber} of ${totalQuestions}.`,
      timestamp: new Date().toISOString()
    };

    const response = await callOpenAI([systemPrompt, ...updatedHistory]);

    if (response) {
      const aiMessage: ConversationMessage = {
        role: 'assistant',
        content: response,
        timestamp: formatTime(interviewTime)
      };

      setConversationHistory([...updatedHistory, aiMessage]);
      setCurrentQuestion(response);
      
      // Speak the response
      await speakText(response);

      // Check if AI wants to give a coding question
      if (response.toLowerCase().includes('coding challenge') || 
          response.toLowerCase().includes('write a function') ||
          response.toLowerCase().includes('solve this problem')) {
        setTimeout(() => {
          triggerCodingQuestion();
        }, 2000);
      }

      setQuestionNumber(prev => Math.min(prev + 1, totalQuestions));
    }

    setIsProcessing(false);
  }, [conversationHistory, formData.interviewType, formData.role, formData.techStack, interviewTime, questionNumber, totalQuestions, callOpenAI, speakText, triggerCodingQuestion, formatTime]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          handleUserSpeech(transcript);
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, [handleUserSpeech]);

  // Interview timer
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (showMockInterview && !isPaused) {
      interval = setInterval(() => {
        setInterviewTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showMockInterview, isPaused]);

  // Start interview with initial question - memoized
  const startInterviewConversation = useCallback(async () => {
    const initialPrompt = `Hello! I'm your AI interviewer for the ${formData.role} position. 
    This will be a ${formData.duration}-minute ${formData.interviewType} interview. 
    Let's start with an introduction. Tell me about yourself and your experience with ${formData.techStack}.`;

    const aiMessage: ConversationMessage = {
      role: 'assistant',
      content: initialPrompt,
      timestamp: '00:00'
    };

    setConversationHistory([aiMessage]);
    setCurrentQuestion(initialPrompt);
    await speakText(initialPrompt);
  }, [formData.role, formData.duration, formData.interviewType, formData.techStack, speakText]);

  // Start listening to user - memoized
  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  }, [isListening]);

  // Stop listening - memoized
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  // Run code tests - memoized
  const runCodeTests = useCallback(() => {
    if (!currentCodingProblem) return;

    const results: TestResult[] = [];

    try {
      const userFunction = new Function('return ' + currentCode)() as (...args: unknown[]) => unknown;

      currentCodingProblem.testCases.forEach((testCase) => {
        try {
          const actual = userFunction(...testCase.input);
          const passed = JSON.stringify(actual) === JSON.stringify(testCase.expected);

          results.push({
            passed,
            testCase,
            actual
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          results.push({
            passed: false,
            testCase,
            error: errorMessage
          });
        }
      });

      setTestResults(results);
      setShowTestResults(true);

      // Provide feedback
      const passedCount = results.filter(r => r.passed).length;
      const totalCount = results.length;
      
      let feedback = '';
      if (passedCount === totalCount) {
        feedback = `Excellent! All ${totalCount} test cases passed. Your solution is correct.`;
      } else {
        feedback = `${passedCount} out of ${totalCount} test cases passed. Please review the failed cases and try again.`;
      }

      speakText(feedback);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error in code: ${errorMessage}`);
    }
  }, [currentCodingProblem, currentCode, speakText]);

  // Submit code solution - memoized
  const handleSubmitCode = useCallback(async () => {
    runCodeTests();

    const submissionMessage = `I've completed the coding challenge: ${currentCodingProblem?.title}`;
    
    const userMessage: ConversationMessage = {
      role: 'user',
      content: submissionMessage,
      timestamp: formatTime(interviewTime)
    };

    const updatedHistory = [...conversationHistory, userMessage];
    setConversationHistory(updatedHistory);

    const systemPrompt: ConversationMessage = {
      role: 'assistant',
      content: `The candidate has submitted their solution for the coding problem. 
      Provide brief feedback and move to the next question.`,
      timestamp: new Date().toISOString()
    };

    const response = await callOpenAI([systemPrompt, ...updatedHistory]);

    if (response) {
      const aiMessage: ConversationMessage = {
        role: 'assistant',
        content: response,
        timestamp: formatTime(interviewTime)
      };

      setConversationHistory([...updatedHistory, aiMessage]);
      setCurrentQuestion(response);
      await speakText(response);
    }
  }, [runCodeTests, currentCodingProblem?.title, interviewTime, conversationHistory, callOpenAI, speakText, formatTime]);

  // Handle starting interview - memoized
  const handleStartInterview = useCallback(() => {
    if (!apiKey) {
      alert('Please enter your OpenAI API key to continue');
      return;
    }
    
    setShowModal(false);
    setShowMockInterview(true);
    startInterviewConversation();
  }, [apiKey, startInterviewConversation]);

  // Handle leaving interview - memoized
  const handleLeaveInterview = useCallback(() => {
    if (window.confirm('Are you sure you want to leave the interview?')) {
      // Stop all audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      // Reset all states
      setShowMockInterview(false);
      setShowCodeEditor(false);
      setCodeEditorCollapsed(true);
      setIsSpeaking(false);
      setIsListening(false);
      setInterviewTime(0);
      setIsPaused(false);
      setConversationHistory([]);
      setCurrentQuestion('');
      setQuestionNumber(1);
      setCurrentCodingProblem(null);
      setTestResults([]);
      setCurrentCode('');
    }
  }, []);

  // Interview types data
  const interviewTypes: InterviewCard[] = [
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

  const handleCardClick = useCallback((card: InterviewCard) => {
    setFormData(prev => ({ ...prev, interviewType: card.category }));
    setShowModal(true);
  }, []);

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
                  {/* AI Interviewer Panel */}
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
                  <motion.div 
                    className="bg-gray-800 rounded-2xl p-8 text-center relative overflow-hidden"
                    animate={{
                      boxShadow: isListening 
                        ? [
                            '0 0 20px rgba(34, 197, 94, 0.5)',
                            '0 0 40px rgba(34, 197, 94, 0.6)',
                            '0 0 20px rgba(34, 197, 94, 0.5)'
                          ]
                        : '0 0 0px rgba(0, 0, 0, 0)'
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isListening ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    <AnimatePresence>
                      {isListening && (
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
                            background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.2), transparent 70%)'
                          }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10">
                      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">You</h3>
                      <motion.div
                        className="w-4 h-4 rounded-full mx-auto"
                        animate={{
                          backgroundColor: isListening ? '#4ade80' : '#6b7280',
                          scale: isListening ? [1, 1.2, 1] : 1
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: isListening ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      />
                      {isListening && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-green-400 mt-2"
                        >
                          Listening...
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Question Section */}
                <div className="bg-gray-800 rounded-2xl p-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <h4 className="text-xl font-semibold text-white">Current Question</h4>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                        Question {questionNumber} of {totalQuestions}
                      </span>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6 min-h-[60px]">
                      {currentQuestion || 'Waiting for AI interviewer...'}
                    </p>
                    
                    {/* Microphone Controls */}
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <button
                        onClick={isListening ? stopListening : startListening}
                        disabled={isSpeaking || isProcessing}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                          isListening 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-green-600 hover:bg-green-700'
                        } ${(isSpeaking || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        <span>{isListening ? 'Stop Speaking' : 'Start Speaking'}</span>
                      </button>

                      {isProcessing && (
                        <div className="flex items-center space-x-2 text-blue-400">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                          <span className="text-sm">Processing...</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={triggerCodingQuestion}
                        className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm"
                      >
                        <Code className="w-4 h-4" />
                        <span>Practice Coding</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Collapsible Code Editor Panel */}
                {showCodeEditor && currentCodingProblem && (
                  <div>
                    <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                      {/* Code Editor Header */}
                      <div 
                        className="flex items-center justify-between p-4 bg-gray-900 cursor-pointer hover:bg-gray-700 transition-colors"
                        onClick={() => setCodeEditorCollapsed(!codeEditorCollapsed)}
                      >
                        <div className="flex items-center space-x-3">
                          <Code className="w-5 h-5 text-blue-400" />
                          <h4 className="text-lg font-semibold text-white">{currentCodingProblem.title}</h4>
                          <span className={`px-2 py-1 rounded text-sm ${
                            currentCodingProblem.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                            currentCodingProblem.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {currentCodingProblem.difficulty}
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
                        codeEditorCollapsed ? 'max-h-0 overflow-hidden' : 'max-h-[1000px] overflow-visible'
                      }`}>
                        <div className="p-6">
                          {/* Problem Statement */}
                          <div className="mb-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
                            <h5 className="text-md font-semibold text-yellow-400 mb-2">Problem Description</h5>
                            <p className="text-gray-300 text-sm mb-4">
                              {currentCodingProblem.description}
                            </p>
                            <div className="space-y-2">
                              <h6 className="text-sm font-semibold text-blue-400">Test Cases:</h6>
                              {currentCodingProblem.testCases.map((tc, idx) => (
                                <div key={idx} className="text-xs text-gray-400 pl-4">
                                  • {tc.description} → Expected: {JSON.stringify(tc.expected)}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Code Editor Area */}
                          <div className="relative bg-gray-900 rounded-lg border border-gray-600">
                            <textarea
                              value={currentCode}
                              onChange={(e) => setCurrentCode(e.target.value)}
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
                              <span>JavaScript</span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={runCodeTests}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
                              >
                                <Play className="w-4 h-4" />
                                <span>Run Tests</span>
                              </button>
                              
                              <button
                                onClick={handleSubmitCode}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
                              >
                                <Send className="w-4 h-4" />
                                <span>Submit Solution</span>
                              </button>
                            </div>
                          </div>

                          {/* Test Results Area */}
                          {showTestResults && testResults.length > 0 && (
                            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
                              <div className="flex items-center justify-between mb-3">
                                <h6 className="text-sm font-semibold text-gray-300">Test Results</h6>
                                <span className="text-xs text-gray-500">
                                  {testResults.filter(r => r.passed).length} / {testResults.length} passed
                                </span>
                              </div>
                              <div className="space-y-2">
                                {testResults.map((result, idx) => (
                                  <div 
                                    key={idx}
                                    className={`p-3 rounded-lg border ${
                                      result.passed 
                                        ? 'bg-green-900/20 border-green-500/30' 
                                        : 'bg-red-900/20 border-red-500/30'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs text-gray-400">
                                        Test Case {idx + 1}: {result.testCase.description}
                                      </span>
                                      {result.passed ? (
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                      ) : (
                                        <AlertCircle className="w-4 h-4 text-red-400" />
                                      )}
                                    </div>
                                    {!result.passed && (
                                      <div className="text-xs mt-2">
                                        <div className="text-red-400">
                                          Expected: {JSON.stringify(result.testCase.expected)}
                                        </div>
                                        <div className="text-gray-400">
                                          {result.error ? `Error: ${result.error}` : `Got: ${JSON.stringify(result.actual)}`}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => {
                      if (currentQuestion) {
                        speakText(currentQuestion);
                      }
                    }}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                  >
                    <Repeat className="w-5 h-5" />
                    <span>Repeat Question</span>
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
                    {showTranscript && !showSettings && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Conversation History</h3>
                          <button
                            onClick={() => setShowTranscript(false)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto">
                          {conversationHistory.map((entry, index) => (
                            <div key={index} className="text-sm">
                              <div className="flex items-center justify-between mb-1">
                                <span className={`font-semibold ${
                                  entry.role === 'assistant' ? 'text-blue-400' : 'text-green-400'
                                }`}>
                                  {entry.role === 'assistant' ? 'AI' : 'You'}
                                </span>
                                <span className="text-xs text-gray-500">{entry.timestamp}</span>
                              </div>
                              <p className="text-gray-300">{entry.content}</p>
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

                          {/* Microphone Status */}
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Microphone
                            </label>
                            <div className="w-full flex items-center justify-between px-4 py-3 bg-gray-700 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Mic className={`w-4 h-4 ${isListening ? 'text-green-400' : 'text-gray-400'}`} />
                                <span className="text-sm">{isListening ? 'Active' : 'Inactive'}</span>
                              </div>
                            </div>
                          </div>

                          {/* API Key */}
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              OpenAI API Key
                            </label>
                            <input
                              type="password"
                              value={apiKey}
                              onChange={(e) => setApiKey(e.target.value)}
                              placeholder="sk-..."
                              className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Get your key from platform.openai.com
                            </p>
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
              Practice technical and non-technical interviews with real-time voice interaction and coding challenges.
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
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Setup Interview</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* API Key Input */}
              <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <h4 className="text-sm font-semibold text-yellow-400 mb-2">🔑 OpenAI API Key Required</h4>
                <p className="text-xs text-gray-400 mb-3">
                  You need an OpenAI API key for voice features. Get one from{' '}
                  <a 
                    href="https://platform.openai.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    platform.openai.com
                  </a>
                </p>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                  placeholder="sk-..."
                />
              </div>

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
                disabled={!apiKey}
                className={`w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-colors ${
                  !apiKey ? 'opacity-50 cursor-not-allowed' : ''
                }`}
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