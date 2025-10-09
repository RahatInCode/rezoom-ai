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
  AlertCircle,
  Globe,
  Server,
  CloudLightning,
  AlertTriangle
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
  role: 'user' | 'assistant' | 'system';
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

// Coding problems
const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    functionName: 'twoSum',
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1], description: 'nums = [2,7,11,15], target = 9' },
      { input: [[3, 2, 4], 6], expected: [1, 2], description: 'nums = [3,2,4], target = 6' },
      { input: [[3, 3], 6], expected: [0, 1], description: 'nums = [3,3], target = 6' }
    ]
  },
  {
    id: '2',
    title: 'Reverse String',
    description: 'Write a function that reverses a string. The input string is given as an array of characters.',
    difficulty: 'easy',
    functionName: 'reverseString',
    starterCode: `function reverseString(s) {
  // Write your solution here
  
}`,
    testCases: [
      { input: [['h', 'e', 'l', 'l', 'o']], expected: ['o', 'l', 'l', 'e', 'h'], description: 's = ["h","e","l","l","o"]' },
      { input: [['H', 'a', 'n', 'n', 'a', 'h']], expected: ['h', 'a', 'n', 'n', 'a', 'H'], description: 's = ["H","a","n","n","a","h"]' }
    ]
  },
  {
    id: '3',
    title: 'Valid Palindrome',
    description: 'Check if a phrase is a palindrome, ignoring non-alphanumeric characters and case.',
    difficulty: 'easy',
    functionName: 'isPalindrome',
    starterCode: `function isPalindrome(s) {
  // Write your solution here
  
}`,
    testCases: [
      { input: ['A man, a plan, a canal: Panama'], expected: true, description: 's = "A man, a plan, a canal: Panama"' },
      { input: ['race a car'], expected: false, description: 's = "race a car"' }
    ]
  }
];

const MockInterviewPage = () => {
  // Get API key from environment variable ONLY
  const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
  
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
  const [errorMessage, setErrorMessage] = useState('');
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

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Format time
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Enhanced professional system prompt
  const getSystemPrompt = useCallback((): string => {
    return `You are sneha, a senior ${formData.role || 'Software Engineer'} and experienced technical interviewer at a top-tier tech company like Google or Microsoft.

INTERVIEW CONTEXT:
- Position: ${formData.role || 'Software Engineer'}
- Interview Type: ${formData.interviewType}
- Tech Stack Focus: ${formData.techStack || 'General'}
- Duration: ${formData.duration} minutes
- Current Progress: Question ${questionNumber} of ${totalQuestions}

YOUR PERSONALITY:
- Warm, professional, and encouraging
- Clear and articulate communicator
- Patient but thorough
- Genuinely interested in the candidate's experience
- Balance between challenging and supportive

INTERVIEWING STYLE:
1. **Start with Introduction**: Begin with a warm greeting, introduce yourself as sneha, and put the candidate at ease
2. **Build Rapport**: Ask about their background and what excites them about this role
3. **Progressive Difficulty**: Start with easier questions, gradually increase complexity
4. **Active Listening**: Acknowledge their answers with phrases like:
   - "That's a great point..."
   - "Interesting approach..."
   - "Tell me more about..."
   - "Can you walk me through..."
5. **Follow-up Questions**: Ask natural follow-ups based on their responses
6. **Mix Question Types**:
   - Technical depth questions
   - Problem-solving scenarios
   - Past experience (STAR method)
   - System design (for senior roles)
   - Behavioral questions

TECHNICAL INTERVIEW FOCUS:
- Algorithm and data structure understanding
- Code optimization and time/space complexity
- System design principles
- Best practices and clean code
- Real-world application scenarios
- Debugging and problem-solving approach

NON-TECHNICAL INTERVIEW FOCUS:
- Leadership and teamwork examples
- Conflict resolution skills
- Communication abilities
- Career motivations and goals
- Cultural fit and values
- Adaptability and learning mindset

RESPONSE GUIDELINES:
- Keep responses conversational and under 3 sentences
- Ask ONE clear question at a time
- Use professional but friendly tone
- Acknowledge answers before moving forward
- Provide subtle encouragement
- Occasionally introduce coding challenges by saying "Let's try a quick coding problem"

IMPORTANT:
- Sound like a real person, not a robot
- Show genuine interest in their answers
- Create a comfortable interview environment
- Help candidates showcase their best abilities
- End gracefully when reaching question ${totalQuestions}

Remember: You're assessing talent while helping candidates perform at their best.`;
  }, [formData, questionNumber, totalQuestions]);

  // OpenAI API call with proper error handling
  const callOpenAI = useCallback(async (messages: ConversationMessage[]): Promise<string | null> => {
    if (!API_KEY) {
      setErrorMessage('❌ OpenAI API key is not configured. Please add NEXT_PUBLIC_OPENAI_API_KEY to your .env.local file and restart the server.');
      return null;
    }

    if (!API_KEY.startsWith('sk-')) {
      setErrorMessage('❌ Invalid API key format. Your OpenAI API key should start with "sk-"');
      return null;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          temperature: 0.85,
          max_tokens: 250,
          presence_penalty: 0.6,
          frequency_penalty: 0.3
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('OpenAI API Error:', errorData);
        
        if (response.status === 401) {
          setErrorMessage('❌ Invalid API key. Please check your OpenAI API key in .env.local');
        } else if (response.status === 429) {
          setErrorMessage('⚠️ Rate limit exceeded. Please wait a moment...');
        } else if (response.status === 500) {
          setErrorMessage('⚠️ OpenAI service error. Trying again...');
        } else {
          setErrorMessage(`API Error: ${response.statusText}`);
        }
        return null;
      }

      const data = await response.json();
      setErrorMessage('');
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      setErrorMessage('❌ Network error. Please check your internet connection.');
      return null;
    }
  }, [API_KEY]);

  // Professional Text to Speech
  const speakText = useCallback(async (text: string) => {
    if (!text) return;
    
    setIsSpeaking(true);

    if (!API_KEY) {
      // Fallback to browser TTS
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.1;
        utterance.volume = volume / 100;
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
      return;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'tts-1-hd',
          voice: 'nova',
          input: text,
          speed: 0.95
        })
      });

      if (!response.ok) {
        throw new Error('TTS failed');
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

      audioRef.current.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audioRef.current.play();
    } catch (error) {
      console.error('TTS Error:', error);
      // Fallback to browser TTS
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.1;
        utterance.volume = volume / 100;
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setIsSpeaking(false);
      }
    }
  }, [API_KEY, volume]);

  // Trigger coding question
  const triggerCodingQuestion = useCallback(() => {
    const randomProblem = CODING_PROBLEMS[Math.floor(Math.random() * CODING_PROBLEMS.length)];
    setCurrentCodingProblem(randomProblem);
    setCurrentCode(randomProblem.starterCode);
    setShowCodeEditor(true);
    setCodeEditorCollapsed(false);
    setTestResults([]);
    setShowTestResults(false);
  }, []);

  // Handle user speech
  const handleUserSpeech = useCallback(async (transcript: string) => {
    if (!transcript.trim()) return;

    const userMessage: ConversationMessage = {
      role: 'user',
      content: transcript,
      timestamp: formatTime(interviewTime)
    };

    const updatedHistory = [...conversationHistory, userMessage];
    setConversationHistory(updatedHistory);
    setIsProcessing(true);

    const systemPrompt: ConversationMessage = {
      role: 'system',
      content: getSystemPrompt(),
      timestamp: new Date().toISOString()
    };

    const apiMessages = [systemPrompt, ...updatedHistory];
    const response = await callOpenAI(apiMessages);

    if (response) {
      const aiMessage: ConversationMessage = {
        role: 'assistant',
        content: response,
        timestamp: formatTime(interviewTime)
      };

      setConversationHistory([...updatedHistory, aiMessage]);
      setCurrentQuestion(response);
      await speakText(response);

      // Check if AI wants to give coding challenge
      const lower = response.toLowerCase();
      if (lower.includes('coding problem') || 
          lower.includes('coding challenge') ||
          lower.includes('write a function') ||
          lower.includes("let's code")) {
        setTimeout(() => triggerCodingQuestion(), 2000);
      }

      setQuestionNumber(prev => Math.min(prev + 1, totalQuestions));
    }

    setIsProcessing(false);
  }, [conversationHistory, interviewTime, getSystemPrompt, callOpenAI, speakText, triggerCodingQuestion, formatTime, totalQuestions]);

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
          console.log('Speech recognized:', transcript);
          handleUserSpeech(transcript);
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech error:', event.error);
          setIsListening(false);
          
          if (event.error === 'not-allowed') {
            setErrorMessage('🎤 Microphone access denied. Please enable it in browser settings.');
          } else if (event.error === 'no-speech') {
            setErrorMessage('🎤 No speech detected. Please try again.');
            setTimeout(() => setErrorMessage(''), 3000);
          } else if (event.error === 'network') {
            setErrorMessage('🌐 Network error. Check your connection.');
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      } else {
        setErrorMessage('⚠️ Speech recognition not supported. Please use Chrome or Edge.');
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore
        }
      }
    };
  }, [handleUserSpeech]);

  // Timer
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

  // Start interview
  const startInterviewConversation = useCallback(async () => {
    const greeting = `Hello! I'm sneha, and I'll be your interviewer today for the ${formData.role || 'software engineering'} position. I'm really excited to learn about your background and experience, especially with ${formData.techStack || 'your tech stack'}. 

This will be a ${formData.duration}-minute conversation where we'll discuss your technical skills, past projects, and problem-solving approach. Let's start - could you tell me a bit about yourself and what interests you most about this role?`;

    const aiMessage: ConversationMessage = {
      role: 'assistant',
      content: greeting,
      timestamp: '00:00'
    };

    setConversationHistory([aiMessage]);
    setCurrentQuestion(greeting);
    setQuestionNumber(1);
    await speakText(greeting);
  }, [formData, speakText]);

  // Start/stop listening
  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening && !isSpeaking) {
      try {
        setIsListening(true);
        setErrorMessage('');
        recognitionRef.current.start();
      } catch (error) {
        console.error('Start listening error:', error);
        setIsListening(false);
        setErrorMessage('❌ Could not start microphone. Please try again.');
      }
    }
  }, [isListening, isSpeaking]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Stop listening error:', error);
      }
      setIsListening(false);
    }
  }, [isListening]);

  // Run tests
  const runCodeTests = useCallback(() => {
    if (!currentCodingProblem) return;

    const results: TestResult[] = [];

    try {
      const userFunction = new Function('return ' + currentCode)() as (...args: unknown[]) => unknown;

      currentCodingProblem.testCases.forEach((testCase) => {
        try {
          const actual = userFunction(...testCase.input);
          const passed = JSON.stringify(actual) === JSON.stringify(testCase.expected);
          results.push({ passed, testCase, actual });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          results.push({ passed: false, testCase, error: errorMessage });
        }
      });

      setTestResults(results);
      setShowTestResults(true);

      const passedCount = results.filter(r => r.passed).length;
      const totalCount = results.length;
      
      const feedback = passedCount === totalCount
        ? `Excellent work! All ${totalCount} test cases passed. Your solution looks solid. Can you explain your approach and the time complexity?`
        : `I see ${passedCount} out of ${totalCount} test cases passing. Let's review the failing cases - what do you think might be causing the issue?`;

      speakText(feedback);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setErrorMessage(`Code Error: ${errorMessage}`);
    }
  }, [currentCodingProblem, currentCode, speakText]);

  // Submit code
  const handleSubmitCode = useCallback(async () => {
    runCodeTests();
  }, [runCodeTests]);

  // Start interview
  const handleStartInterview = useCallback(() => {
    if (!API_KEY) {
      setErrorMessage('❌ API key not found. Please add NEXT_PUBLIC_OPENAI_API_KEY to .env.local and restart the server.');
      return;
    }
    
    setShowModal(false);
    setShowMockInterview(true);
    setErrorMessage('');
    startInterviewConversation();
  }, [API_KEY, startInterviewConversation]);

  // Leave interview
  const handleLeaveInterview = useCallback(() => {
    if (window.confirm('Are you sure you want to leave the interview?')) {
      if (audioRef.current) audioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore
        }
      }

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
      setErrorMessage('');
    }
  }, []);

  // Interview types
  const interviewTypes: InterviewCard[] = [
    { id: 1, title: 'System Design', category: 'Technical', icon: <Code className="w-8 h-8 text-blue-400" />, description: 'Design scalable systems' },
    { id: 2, title: 'Business Analyst', category: 'Non-Technical', icon: <TrendingUp className="w-8 h-8 text-green-400" />, description: 'Business analysis' },
    { id: 3, title: 'Mobile Development', category: 'Technical', icon: <Smartphone className="w-8 h-8 text-purple-400" />, description: 'iOS/Android' },
    { id: 4, title: 'SQL & Database', category: 'Technical', icon: <Database className="w-8 h-8 text-yellow-400" />, description: 'Database design' },
    { id: 5, title: 'Cybersecurity', category: 'Technical', icon: <Shield className="w-8 h-8 text-red-400" />, description: 'Security protocols' },
    { id: 6, title: 'Sales & Marketing', category: 'Non-Technical', icon: <Users className="w-8 h-8 text-pink-400" />, description: 'Sales strategies' },
    { id: 7, title: 'Front-End', category: 'Technical', icon: <Code className="w-8 h-8 text-indigo-400" />, description: 'React, Angular, Vue' },
    { id: 8, title: 'Back-End', category: 'Technical', icon: <Server className="w-8 h-8 text-teal-400" />, description: 'Node.js, APIs' },
    { id: 9, title: 'Full-Stack', category: 'Technical', icon: <Globe className="w-8 h-8 text-orange-400" />, description: 'End-to-end development' },
    { id: 10, title: 'Web Performance', category: 'Technical', icon: <CloudLightning className="w-8 h-8 text-yellow-600" />, description: 'Optimization & SEO' }
  ];

  const handleCardClick = useCallback((card: InterviewCard) => {
    setFormData(prev => ({ ...prev, interviewType: card.category }));
    setShowModal(true);
  }, []);

  // Mock Interview UI
  if (showMockInterview) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-lg font-semibold">{formatTime(interviewTime)}</span>
                  <span className="text-sm text-gray-400">/ {formData.duration}:00</span>
                </div>
                <div className="hidden md:block text-sm text-gray-400">
                  {formData.role || 'General'} • {formData.interviewType}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button onClick={() => setIsPaused(!isPaused)} className="p-2 hover:bg-gray-700 rounded-lg">
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </button>
                <button onClick={() => setShowTranscript(!showTranscript)} className={`p-2 hover:bg-gray-700 rounded-lg ${showTranscript ? 'bg-gray-700' : ''}`}>
                  <FileText className="w-5 h-5" />
                </button>
                <button onClick={() => setShowSettings(!showSettings)} className={`p-2 hover:bg-gray-700 rounded-lg ${showSettings ? 'bg-gray-700' : ''}`}>
                  <Settings className="w-5 h-5" />
                </button>
                <div className="h-6 w-px bg-gray-700"></div>
                <button onClick={handleLeaveInterview} className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Leave</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence>
              {errorMessage && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-red-300 text-sm">{errorMessage}</p>
                  </div>
                  <button onClick={() => setErrorMessage('')} className="text-red-400 hover:text-red-300">
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4">
              <div className="flex-1 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div className="bg-gray-800 rounded-2xl p-8 text-center relative overflow-hidden" animate={{ boxShadow: isSpeaking ? ['0 0 20px rgba(59, 130, 246, 0.5)', '0 0 40px rgba(139, 92, 246, 0.6)', '0 0 20px rgba(59, 130, 246, 0.5)'] : '0 0 0px rgba(0, 0, 0, 0)' }} transition={{ duration: 1.5, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" }}>
                    <AnimatePresence>
                      {isSpeaking && (
                        <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: [0.3, 0.6, 0.3] }} exit={{ opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} style={{ background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2), transparent 70%)' }} />
                      )}
                    </AnimatePresence>

                    <motion.div className="relative z-10" animate={{ scale: isSpeaking ? [1, 1.05, 1] : 1 }} transition={{ duration: 1.5, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" }}>
                      <motion.div className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center" animate={{ background: isSpeaking ? ['linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))', 'linear-gradient(135deg, rgb(139, 92, 246), rgb(236, 72, 153))', 'linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))'] : 'linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))' }} transition={{ duration: 2, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" }}>
                        <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center">
                          <motion.div className="text-4xl" animate={{ scale: isSpeaking ? [1, 1.1, 1] : 1 }} transition={{ duration: 0.5, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" }}>🎤</motion.div>
                        </div>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">sneha - AI Interviewer</h3>
                      <motion.div className="w-4 h-4 rounded-full mx-auto" animate={{ backgroundColor: isSpeaking ? '#4ade80' : '#6b7280', scale: isSpeaking ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.8, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" }} />
                      {isSpeaking && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-green-400 mt-2">Speaking...</motion.p>}
                    </motion.div>
                  </motion.div>

                  <motion.div className="bg-gray-800 rounded-2xl p-8 text-center relative overflow-hidden" animate={{ boxShadow: isListening ? ['0 0 20px rgba(34, 197, 94, 0.5)', '0 0 40px rgba(34, 197, 94, 0.6)', '0 0 20px rgba(34, 197, 94, 0.5)'] : '0 0 0px rgba(0, 0, 0, 0)' }} transition={{ duration: 1.5, repeat: isListening ? Infinity : 0, ease: "easeInOut" }}>
                    <AnimatePresence>
                      {isListening && <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: [0.3, 0.6, 0.3] }} exit={{ opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} style={{ background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.2), transparent 70%)' }} />}
                    </AnimatePresence>

                    <div className="relative z-10">
                      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">You</h3>
                      <motion.div className="w-4 h-4 rounded-full mx-auto" animate={{ backgroundColor: isListening ? '#4ade80' : '#6b7280', scale: isListening ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.8, repeat: isListening ? Infinity : 0, ease: "easeInOut" }} />
                      {isListening && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-green-400 mt-2">Listening...</motion.p>}
                    </div>
                  </motion.div>
                </div>

                <div className="bg-gray-800 rounded-2xl p-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <h4 className="text-xl font-semibold text-white">Current Question</h4>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">Question {questionNumber} of {totalQuestions}</span>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6 min-h-[60px]">{currentQuestion || 'Waiting for AI interviewer...'}</p>
                    
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <button onClick={isListening ? stopListening : startListening} disabled={isSpeaking || isProcessing} className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} ${(isSpeaking || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}>
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

                    <button onClick={triggerCodingQuestion} className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm mx-auto">
                      <Code className="w-4 h-4" />
                      <span>Practice Coding</span>
                    </button>
                  </div>
                </div>

                {showCodeEditor && currentCodingProblem && (
                  <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                    <div className="flex items-center justify-between p-4 bg-gray-900 cursor-pointer hover:bg-gray-700 transition-colors" onClick={() => setCodeEditorCollapsed(!codeEditorCollapsed)}>
                      <div className="flex items-center space-x-3">
                        <Code className="w-5 h-5 text-blue-400" />
                        <h4 className="text-lg font-semibold text-white">{currentCodingProblem.title}</h4>
                        <span className={`px-2 py-1 rounded text-sm ${currentCodingProblem.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' : currentCodingProblem.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>{currentCodingProblem.difficulty}</span>
                      </div>
                      {codeEditorCollapsed ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronUp className="w-5 h-5 text-gray-400" />}
                    </div>

                    <div className={`transition-all duration-300 ${codeEditorCollapsed ? 'max-h-0 overflow-hidden' : 'max-h-[1000px]'}`}>
                      <div className="p-6">
                        <div className="mb-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
                          <h5 className="text-md font-semibold text-yellow-400 mb-2">Problem</h5>
                          <p className="text-gray-300 text-sm mb-4">{currentCodingProblem.description}</p>
                          <h6 className="text-sm font-semibold text-blue-400">Test Cases:</h6>
                          {currentCodingProblem.testCases.map((tc, idx) => (
                            <div key={idx} className="text-xs text-gray-400 pl-4">• {tc.description} → {JSON.stringify(tc.expected)}</div>
                          ))}
                        </div>

                        <div className="relative bg-gray-900 rounded-lg border border-gray-600">
                          <textarea value={currentCode} onChange={(e) => setCurrentCode(e.target.value)} className="w-full h-64 bg-transparent text-gray-100 font-mono text-sm p-4 pl-12 rounded-lg focus:outline-none resize-none" style={{ lineHeight: '1.5' }} spellCheck={false} />
                          <div className="absolute top-4 left-4 text-xs text-gray-500 font-mono leading-6 pointer-events-none select-none">
                            {currentCode.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
                          </div>
                        </div>

                        <div className="flex justify-between mt-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>JavaScript</span>
                          </div>
                          <div className="flex space-x-3">
                            <button onClick={runCodeTests} className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
                              <Play className="w-4 h-4" />
                              <span>Run</span>
                            </button>
                            <button onClick={handleSubmitCode} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                              <Send className="w-4 h-4" />
                              <span>Submit</span>
                            </button>
                          </div>
                        </div>

                        {showTestResults && testResults.length > 0 && (
                          <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
                            <div className="flex justify-between mb-3">
                              <h6 className="text-sm font-semibold">Results</h6>
                              <span className="text-xs text-gray-500">{testResults.filter(r => r.passed).length} / {testResults.length} passed</span>
                            </div>
                            {testResults.map((result, idx) => (
                              <div key={idx} className={`p-3 rounded-lg border mb-2 ${result.passed ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
                                <div className="flex justify-between mb-1">
                                  <span className="text-xs text-gray-400">Test {idx + 1}: {result.testCase.description}</span>
                                  {result.passed ? <CheckCircle className="w-4 h-4 text-green-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
                                </div>
                                {!result.passed && (
                                  <div className="text-xs mt-2">
                                    <div className="text-red-400">Expected: {JSON.stringify(result.testCase.expected)}</div>
                                    <div className="text-gray-400">{result.error || `Got: ${JSON.stringify(result.actual)}`}</div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center">
                  <button onClick={() => currentQuestion && speakText(currentQuestion)} className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl">
                    <Repeat className="w-5 h-5" />
                    <span>Repeat Question</span>
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {(showTranscript || showSettings) && (
                  <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 320, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    {showTranscript && (
                      <div>
                        <div className="flex justify-between mb-4">
                          <h3 className="text-lg font-semibold">Transcript</h3>
                          <button onClick={() => setShowTranscript(false)}><X className="w-4 h-4" /></button>
                        </div>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto">
                          {conversationHistory.map((msg, idx) => (
                            <div key={idx} className="text-sm">
                              <div className="flex justify-between mb-1">
                                <span className={`font-semibold ${msg.role === 'assistant' ? 'text-blue-400' : 'text-green-400'}`}>{msg.role === 'assistant' ? 'sneha' : 'You'}</span>
                                <span className="text-xs text-gray-500">{msg.timestamp}</span>
                              </div>
                              <p className="text-gray-300">{msg.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {showSettings && (
                      <div>
                        <div className="flex justify-between mb-4">
                          <h3 className="text-lg font-semibold">Settings</h3>
                          <button onClick={() => setShowSettings(false)}><X className="w-4 h-4" /></button>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">Volume</label>
                            <div className="flex items-center space-x-3">
                              <Volume2 className="w-4 h-4" />
                              <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="flex-1" />
                              <span className="text-sm w-10">{volume}%</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">API Status</label>
                            <div className={`px-4 py-3 rounded-lg ${API_KEY ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'}`}>
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${API_KEY ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                <span className="text-sm">{API_KEY ? 'Connected' : 'Not Set'}</span>
                              </div>
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

  // Landing page
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Ace Your Next Interview with AI</h1>
            <p className="text-xl text-gray-300 mb-8">Practice with real-time voice AI and coding challenges</p>
            <button onClick={() => document.getElementById('pick-interview')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-lg font-semibold transition-all transform hover:scale-105">
              <PlayCircle className="w-6 h-6" />
              <span>Start Practicing</span>
            </button>
          </div>
        </div>
      </section>

      <section id="pick-interview" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Pick Your Interview</h2>
            <p className="text-gray-400 text-lg">Choose from comprehensive categories</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {interviewTypes.map((interview) => (
              <div key={interview.id} onClick={() => handleCardClick(interview)} className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all cursor-pointer transform hover:scale-105 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  {interview.icon}
                  <span className={`px-3 py-1 rounded-full text-sm ${interview.category === 'Technical' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}>{interview.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{interview.title}</h3>
                <p className="text-gray-400 mb-4">{interview.description}</p>
                <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg">Start</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Build Your Resume</h2>
            <p className="text-xl text-gray-300 mb-8">Create a professional AI-powered resume</p>
            <button className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-xl text-lg font-semibold">
              <Briefcase className="w-6 h-6" />
              <span>Build Resume</span>
            </button>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700">
            <div className="flex justify-between mb-6">
              <h3 className="text-2xl font-bold">Setup Interview</h3>
              <button onClick={() => setShowModal(false)}><X className="w-6 h-6" /></button>
            </div>

            <div className="space-y-6">
              {!API_KEY && (
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />API Key Required
                  </h4>
                  <p className="text-xs text-gray-400 mb-2">Add to .env.local:</p>
                  <code className="text-xs bg-gray-900 p-2 rounded block">NEXT_PUBLIC_OPENAI_API_KEY=sk-...</code>
                  <p className="text-xs text-gray-400 mt-2">
                    Get from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">platform.openai.com</a>
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Interview Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="type" value="Technical" checked={formData.interviewType === 'Technical'} onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })} className="mr-2" />
                    Technical
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="type" value="Non-Technical" checked={formData.interviewType === 'Non-Technical'} onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })} className="mr-2" />
                    Non-Technical
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none" placeholder="e.g. Frontend Developer" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tech Stack</label>
                <input type="text" value={formData.techStack} onChange={(e) => setFormData({ ...formData, techStack: e.target.value })} className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none" placeholder="e.g. React, Node.js" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <select value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                </select>
              </div>

              <button onClick={handleStartInterview} disabled={!API_KEY} className={`w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold ${!API_KEY ? 'opacity-50 cursor-not-allowed' : ''}`}>
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