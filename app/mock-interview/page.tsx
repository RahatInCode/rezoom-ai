"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

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
  Loader,
  Bug
} from 'lucide-react';
import { type CodingProblem, type TestCase, getRandomProblem } from '../Components/CodingProblems';

// Types
interface TestResult {
  passed: boolean;
  testCase: TestCase;
  actual?: unknown;
  error?: string;
}

interface ConversationMessage {
  role: 'user' | 'model' | 'system';
  parts: string;
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
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const MockInterviewPage = () => {
  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

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

  // Voice and conversation states
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions] = useState(10);
  const [currentCodingProblem, setCurrentCodingProblem] = useState<CodingProblem | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showTestResults, setShowTestResults] = useState(false);

  // Transcript states
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');

  // Debug state
  const [debugLog, setDebugLog] = useState<string[]>([]);
  const [showDebug, setShowDebug] = useState(false);

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const processingRef = useRef(false);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const accumulatedTranscriptRef = useRef<string>('');
  const lastProcessedTranscriptRef = useRef<string>('');
  const lastUserSpeechTimeRef = useRef<number>(Date.now());
  const isRestartingRef = useRef(false);
  const shouldRestartAfterEndRef = useRef(true);

  // Constants
  const SILENCE_DELAY = 2500;
  const INACTIVITY_DELAY = 10000;

  // Debug helper
  const addDebugLog = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setDebugLog(prev => [...prev.slice(-50), logMessage]);
    console.log(logMessage);
  }, []);

  // Format time
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Save interview state
  useEffect(() => {
    if (showMockInterview) {
      const interviewState = {
        conversationHistory,
        currentQuestion,
        questionNumber,
        interviewTime,
        formData
      };
      try {
        localStorage.setItem('interviewState', JSON.stringify(interviewState));
      } catch (error) {
        console.error('Error saving interview state:', error);
      }
    }
  }, [showMockInterview, conversationHistory, currentQuestion, questionNumber, interviewTime, formData]);

  // Restore interview state
  useEffect(() => {
    const savedState = localStorage.getItem('interviewState');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);

        Swal.fire({
          title: 'Resume Interview?',
          text: 'You have an ongoing interview. Would you like to continue?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#10b981',
          cancelButtonColor: '#64748b',
          confirmButtonText: 'Yes, resume it!',
          cancelButtonText: 'Start fresh'
        }).then((result) => {
          if (result.isConfirmed) {
            setConversationHistory(state.conversationHistory || []);
            setCurrentQuestion(state.currentQuestion || '');
            setQuestionNumber(state.questionNumber || 1);
            setInterviewTime(state.interviewTime || 0);
            setFormData(state.formData || formData);
            setShowMockInterview(true);
            toast.success('Interview resumed!');
          } else {
            localStorage.removeItem('interviewState');
          }
        }).catch((error) => {
          console.error('SweetAlert error:', error);
        });
      } catch (error) {
        console.error('Error restoring interview state:', error);
        localStorage.removeItem('interviewState');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prevent accidental reload
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (showMockInterview) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [showMockInterview]);

  // System prompt
  const getSystemPrompt = useCallback((): string => {
    return `You are Sneha, a senior ${formData.role || 'Software Engineer'} and experienced technical interviewer at a top-tier tech company.

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

INTERVIEWING STYLE:
1. Introduction & Rapport:
   - Start with a warm greeting
   - Build rapport by asking about their background

2. Flow & Progression:
   - Begin with simple, open-ended questions
   - Gradually increase difficulty
   - Ask ONE clear question at a time
   - Wait for complete answers

3. Acknowledge & Encourage:
   - React naturally: "That's a great point", "Interesting approach", "I like how you explained that"

4. Coding & Problem-Solving:
   - Occasionally introduce coding challenges
   - Give subtle hints if they struggle
   - Provide constructive feedback

5. Response Guidelines:
   - Keep responses under 3 sentences
   - Speak naturally and conversationally
   - Don't repeat yourself unless asked
   - Move forward with new questions

Remember: Create a comfortable interview environment while assessing talent.`;
  }, [formData, questionNumber, totalQuestions]);

  // Call Gemini API
  const callGeminiAPI = useCallback(async (messages: ConversationMessage[], isFollowUp = false): Promise<string | null> => {
    if (!GEMINI_API_KEY) {
      toast.error('Gemini API key not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to .env.local');
      addDebugLog('❌ Gemini API key not configured');
      return null;
    }

    if (processingRef.current && !isFollowUp) {
      addDebugLog('⏭️ Already processing, skipping API call');
      return null;
    }

    processingRef.current = true;
    setIsProcessing(true);

    try {
      addDebugLog(`📤 Calling Gemini API... ${isFollowUp ? '(Follow-up)' : ''}`);

      const systemPrompt = getSystemPrompt();
      const conversationText = messages
        .filter(msg => msg.role !== 'system')
        .map(msg => `${msg.role === 'user' ? 'User' : 'Sneha'}: ${msg.parts}`)
        .join('\n\n');

      let fullPrompt = `${systemPrompt}\n\n${conversationText}\n\nSneha:`;

      if (isFollowUp) {
        fullPrompt += "\n\n[The candidate hasn't responded. Ask a follow-up question or rephrase to encourage them to speak.]";
      }

      const lastUserMsg = messages.filter(m => m.role === 'user').pop();
      if (lastUserMsg) {
        addDebugLog(`💬 User said: "${lastUserMsg.parts.substring(0, 50)}..."`);
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: fullPrompt
              }]
            }],
            generationConfig: {
              temperature: 0.85,
              maxOutputTokens: 250,
              topP: 0.95,
              topK: 40
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_NONE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_NONE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_NONE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_NONE"
              }
            ]
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API Error:', errorText);
        addDebugLog(`❌ API error: ${response.status}`);
        
        if (response.status === 429) {
          toast.error('Rate limit exceeded. Please wait a moment...');
          await new Promise(resolve => setTimeout(resolve, 3000));
          return null;
        }
        
        toast.error('Failed to get AI response');
        return null;
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        addDebugLog('❌ Invalid response structure from Gemini');
        return null;
      }

      const aiResponse = data.candidates[0].content.parts[0].text.trim();
      addDebugLog(`📥 AI response: "${aiResponse.substring(0, 50)}..."`);

      return aiResponse;

    } catch (error) {
      console.error('Gemini API Error:', error);
      addDebugLog(`❌ Network error: ${error instanceof Error ? error.message : String(error)}`);
      toast.error('Network error. Please check your connection.');
      return null;
    } finally {
      processingRef.current = false;
      setIsProcessing(false);
    }
  }, [GEMINI_API_KEY, getSystemPrompt, addDebugLog]);

  // Clear inactivity timer
  const clearInactivityTimer = useCallback(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
      inactivityTimeoutRef.current = null;
      addDebugLog('⏰ Cleared inactivity timer');
    }
  }, [addDebugLog]);

  // ✅ FIX: Auto-restart speech recognition (doesn't clear unprocessed data)
  const autoRestartListening = useCallback(() => {
    if (!showMockInterview || isPaused) {
      addDebugLog('⏭️ Skipping auto-restart (paused or not in interview)');
      return;
    }

    if (isRestartingRef.current) {
      addDebugLog('⏭️ Already restarting, skipping duplicate restart');
      return;
    }

    isRestartingRef.current = true;

    setTimeout(() => {
      if (recognitionRef.current && !isSpeaking && !isProcessing) {
        try {
          // ✅ FIX: Only clear if transcript has been processed
          const pending = accumulatedTranscriptRef.current.trim();
          const alreadyProcessed = pending === lastProcessedTranscriptRef.current;

          if (!pending || alreadyProcessed) {
            // Safe to clear - no pending data or already processed
            accumulatedTranscriptRef.current = '';
            setFinalTranscript('');
            setInterimTranscript('');
            addDebugLog('🧹 Cleared transcripts (safe - no pending data)');
          } else {
            addDebugLog(`⚠️ NOT clearing unprocessed transcript: "${pending.substring(0, 30)}..."`);
            // Don't restart if there's unprocessed pending data
            isRestartingRef.current = false;
            return;
          }
          
          shouldRestartAfterEndRef.current = true;
          recognitionRef.current.start();
          addDebugLog('🎤 Auto-restarted speech recognition');
          toast.success('🎤 Listening...', { duration: 2000 });
        } catch (error) {
          const err = error as Error;
          // Ignore "already started" errors
          if (err.message.includes('already started')) {
            addDebugLog('✅ Recognition already active');
            setIsListening(true);
          } else {
            console.error('Error auto-restarting recognition:', error);
            addDebugLog(`❌ Failed to auto-restart: ${err.message}`);
          }
        }
      }
      isRestartingRef.current = false;
    }, 800);
  }, [showMockInterview, isPaused, isSpeaking, isProcessing, addDebugLog]);

// Start inactivity timer
const speakTextRef = useRef<((text: string) => Promise<void>) | null>(null);

const startInactivityTimer = useCallback(() => {
  if (inactivityTimeoutRef.current) {
    clearTimeout(inactivityTimeoutRef.current);
  }

  if (!showMockInterview || isPaused || isSpeaking || isProcessing) {
    return;
  }

  addDebugLog('⏰ Starting 10s inactivity timer');

  inactivityTimeoutRef.current = setTimeout(async () => {
    const timeSinceLastSpeech = Date.now() - lastUserSpeechTimeRef.current;
    
    if (timeSinceLastSpeech >= INACTIVITY_DELAY && !isSpeaking && !isProcessing) {
      addDebugLog('⚠️ User inactive for 10s - asking follow-up');
      
      toast('🤔 Still there? Let me ask a follow-up question...', { duration: 3000 });
      
      const followUpMessage: ConversationMessage = {
        role: 'user',
        parts: '[SILENCE - No response from candidate]',
        timestamp: formatTime(interviewTime)
      };

      const updatedHistory = [...conversationHistory, followUpMessage];
      const response = await callGeminiAPI(updatedHistory, true);

      if (response) {
        const aiMessage: ConversationMessage = {
          role: 'model',
          parts: response,
          timestamp: formatTime(interviewTime)
        };

        setConversationHistory([...updatedHistory, aiMessage]);
        setCurrentQuestion(response);
        
        if (speakTextRef.current) {
          await speakTextRef.current(response);
        }
      }
    }
  }, INACTIVITY_DELAY);
}, [showMockInterview, isPaused, isSpeaking, isProcessing, conversationHistory, interviewTime, callGeminiAPI, formatTime, addDebugLog]);

// ✅ FIX: Text-to-Speech with guaranteed auto-restart
const speakText = useCallback(async (text: string) => {
  if (!text) return;

  setIsSpeaking(true);
  addDebugLog(`🔊 Speaking: "${text.substring(0, 50)}..."`);

  // Stop recognition while AI is speaking
  if (recognitionRef.current && isListening) {
    try {
      shouldRestartAfterEndRef.current = false; // Don't restart from onend, we'll do it after TTS
      recognitionRef.current.stop();
      setIsListening(false);
      addDebugLog('🛑 Stopped listening for AI speech');
    } catch (error) {
      console.error('Error stopping recognition:', error);
    }
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.volume = volume / 100;
    
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Samantha') ||
      voice.name.includes('Karen') ||
      voice.name.includes('Google UK English Female')
    ) || voices[0];
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
      addDebugLog('✅ TTS finished - auto-restarting listening');
      
      lastUserSpeechTimeRef.current = Date.now();
      
      // ✅ FIX: Always restart listening after TTS completes
      setTimeout(() => {
        autoRestartListening();
        startInactivityTimer();
      }, 500);
    };

    utterance.onerror = (event) => {
      setIsSpeaking(false);
      addDebugLog(`❌ TTS error: ${event.error}`);
      toast.error('Speech synthesis error');
      
      // ✅ FIX: CRITICAL - Restart listening even after TTS error
      lastUserSpeechTimeRef.current = Date.now();
      setTimeout(() => {
        autoRestartListening();
        startInactivityTimer();
      }, 500);
    };

    window.speechSynthesis.speak(utterance);
  } else {
    setIsSpeaking(false);
    toast.error('Speech synthesis not supported');
    
    // ✅ FIX: Restart listening even if TTS not supported
    setTimeout(() => {
      autoRestartListening();
      startInactivityTimer();
    }, 500);
  }
}, [volume, isListening, addDebugLog, autoRestartListening, startInactivityTimer]);

// keep a stable reference for other callbacks to use (breaks circular dependency)
speakTextRef.current = speakText;

  // Trigger coding question
  const triggerCodingQuestion = useCallback(() => {
    const randomProblem = getRandomProblem();
    setCurrentCodingProblem(randomProblem);
    setCurrentCode(randomProblem.starterCode);
    setShowCodeEditor(true);
    setCodeEditorCollapsed(false);
    setTestResults([]);
    setShowTestResults(false);
    toast.success(`Coding challenge: ${randomProblem.title}`);
    addDebugLog(`💻 Coding challenge triggered: ${randomProblem.title}`);
  }, [addDebugLog]);

  // ✅ FIX: Handle user speech with guaranteed restart
  const handleUserSpeech = useCallback(async (transcript: string) => {
    const trimmed = transcript.trim();

    if (trimmed === lastProcessedTranscriptRef.current) {
      addDebugLog('⏭️ Duplicate transcript, skipping');
      // ✅ FIX: Still restart listening even if duplicate
      setTimeout(() => {
        autoRestartListening();
        startInactivityTimer();
      }, 500);
      return;
    }

    if (!trimmed || trimmed.length < 3) {
      addDebugLog('❌ Transcript too short or empty');
      toast.error('Speech too short. Please speak more clearly.');
      accumulatedTranscriptRef.current = '';
      setFinalTranscript('');
      // ✅ FIX: Restart after error
      setTimeout(() => {
        autoRestartListening();
        startInactivityTimer();
      }, 500);
      return;
    }

    if (processingRef.current) {
      addDebugLog('⏭️ Already processing, skipping');
      return;
    }

    lastUserSpeechTimeRef.current = Date.now();
    clearInactivityTimer();

    addDebugLog(`🔄 Processing user speech: "${trimmed.substring(0, 50)}..."`);
    lastProcessedTranscriptRef.current = trimmed;

    const userMessage: ConversationMessage = {
      role: 'user',
      parts: trimmed,
      timestamp: formatTime(interviewTime)
    };

    const updatedHistory = [...conversationHistory, userMessage];
    setConversationHistory(updatedHistory);

    setFinalTranscript('');
    setInterimTranscript('');
    accumulatedTranscriptRef.current = '';

    const response = await callGeminiAPI(updatedHistory);

    if (response) {
      const aiMessage: ConversationMessage = {
        role: 'model',
        parts: response,
        timestamp: formatTime(interviewTime)
      };

      setConversationHistory([...updatedHistory, aiMessage]);
      setCurrentQuestion(response);

      // ✅ TTS will auto-restart listening via its onend/onerror
      await speakText(response);

      const lower = response.toLowerCase();
      if (lower.includes('coding problem') ||
          lower.includes('coding challenge') ||
          lower.includes('write a function') ||
          lower.includes("let's code")) {
        setTimeout(() => triggerCodingQuestion(), 2000);
      }

      setQuestionNumber(prev => Math.min(prev + 1, totalQuestions));
    } else {
      addDebugLog('❌ No response from Gemini');
      toast.error('Failed to get AI response. Restarting...');
      
      // ✅ FIX: CRITICAL - Always restart even on API failure
      setTimeout(() => {
        autoRestartListening();
        startInactivityTimer();
      }, 1000);
    }
  }, [conversationHistory, interviewTime, callGeminiAPI, speakText, triggerCodingQuestion, formatTime, totalQuestions, addDebugLog, clearInactivityTimer, autoRestartListening, startInactivityTimer]);

  // ✅ FIX: Setup speech recognition with proper onend handling
  const setupSpeechRecognition = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Speech recognition not supported. Please use Chrome or Edge.');
      addDebugLog('❌ Speech recognition not supported');
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (error) {
        console.error('Recognition abort error:', error);
      }
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      addDebugLog('🎤 Speech recognition started');
      setIsListening(true);
      setInterimTranscript('');
      clearInactivityTimer();
    };

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + ' ';
        } else {
          interim += transcript;
        }
      }

      if (interim) {
        setInterimTranscript(interim);
        addDebugLog(`💬 Interim: "${interim.substring(0, 30)}..."`);
      }

      if (final.trim()) {
        accumulatedTranscriptRef.current += final;
        setFinalTranscript(accumulatedTranscriptRef.current);
        addDebugLog(`✅ Final: "${final.substring(0, 50)}..."`);

        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
        }

        silenceTimeoutRef.current = setTimeout(() => {
          const fullTranscript = accumulatedTranscriptRef.current.trim();

          addDebugLog(`⏱️ Silence detected (${SILENCE_DELAY}ms). Full: "${fullTranscript.substring(0, 50)}..."`);

          if (fullTranscript && !processingRef.current) {
            // Stop recognition before processing
            if (recognitionRef.current) {
              try {
                shouldRestartAfterEndRef.current = false; // Don't restart from onend
                recognitionRef.current.stop();
              } catch (error) {
                console.error('Error stopping recognition:', error);
              }
            }

            // Process the speech
            handleUserSpeech(fullTranscript);
          }
        }, SILENCE_DELAY);
      }
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      addDebugLog(`❌ Speech error: ${event.error}`);

      if (event.error === 'no-speech') {
        toast('No speech detected. Ready to listen again...', { icon: '🎤' });
        setTimeout(() => {
          autoRestartListening();
          startInactivityTimer();
        }, 1000);
        return;
      }

      if (event.error === 'aborted') {
        addDebugLog('⚠️ Recognition aborted (expected)');
        return;
      }

      setIsListening(false);

      if (event.error === 'not-allowed') {
        toast.error('🎤 Microphone access denied. Please enable it in browser settings.');
      } else if (event.error === 'network') {
        toast.error('🌐 Network error. Check your connection.');
        // ✅ FIX: Restart after network error
        setTimeout(() => {
          autoRestartListening();
          startInactivityTimer();
        }, 2000);
      } else {
        // ✅ FIX: Restart after any other error
        setTimeout(() => {
          autoRestartListening();
          startInactivityTimer();
        }, 1000);
      }
    };

    // ✅ FIX: Process pending transcripts in onend before restarting
    recognitionRef.current.onend = () => {
      addDebugLog('🛑 Speech recognition ended');
      setIsListening(false);
      setInterimTranscript('');

      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }

      // ✅ FIX: Check for pending unprocessed transcript
      const pending = accumulatedTranscriptRef.current.trim();
      const alreadyProcessed = pending === lastProcessedTranscriptRef.current;
      const isProcessingNow = processingRef.current;

      if (pending && !alreadyProcessed && !isProcessingNow) {
        addDebugLog(`⚠️ onend: Processing pending transcript: "${pending.substring(0, 50)}..."`);
        handleUserSpeech(pending);
      } else if (shouldRestartAfterEndRef.current && !isProcessingNow && !isSpeaking) {
        // ✅ FIX: Auto-restart if we should (not stopped intentionally)
        addDebugLog('🔄 onend: Auto-restarting (browser stopped unexpectedly)');
        setTimeout(() => {
          autoRestartListening();
          startInactivityTimer();
        }, 500);
      } else {
        addDebugLog('✅ onend: Clean stop (no restart needed)');
      }

      shouldRestartAfterEndRef.current = true; // Reset flag
    };
  }, [handleUserSpeech, addDebugLog, clearInactivityTimer, autoRestartListening, startInactivityTimer, isSpeaking]);

  // Initialize speech recognition
  useEffect(() => {
    setupSpeechRecognition();

    return () => {
      if (recognitionRef.current) {
        try {
          shouldRestartAfterEndRef.current = false;
          recognitionRef.current.abort();
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, [setupSpeechRecognition]);

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

  // ✅ NEW: Recovery watchdog - detects and recovers from stuck states
  useEffect(() => {
    if (!showMockInterview || isPaused) return;

    const watchdogInterval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastSpeech = now - lastUserSpeechTimeRef.current;
      
      // If stuck for >20s and not actively doing anything
      if (timeSinceLastSpeech > 20000 && 
          !isListening && 
          !isSpeaking && 
          !isProcessing &&
          !isRestartingRef.current) {
        
        addDebugLog('🔧 WATCHDOG: System stuck! Attempting recovery...');
        toast('Recovering... Please wait', { icon: '🔧' });
        
        try {
          // Force abort and restart
          if (recognitionRef.current) {
            shouldRestartAfterEndRef.current = false;
            recognitionRef.current.abort();
          }
          
          setTimeout(() => {
            setupSpeechRecognition();
            setTimeout(() => {
              lastUserSpeechTimeRef.current = Date.now();
              autoRestartListening();
              startInactivityTimer();
              toast.success('✅ Recovered! Ready to listen');
            }, 500);
          }, 500);
          
        } catch (error) {
          console.error('Watchdog recovery failed:', error);
          addDebugLog(`❌ Watchdog recovery failed: ${error}`);
        }
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(watchdogInterval);
  }, [showMockInterview, isPaused, isListening, isSpeaking, isProcessing, setupSpeechRecognition, autoRestartListening, startInactivityTimer, addDebugLog]);

  // Start interview conversation
  const startInterviewConversation = useCallback(async () => {
    const greeting = `Hello! I'm Sneha, and I'll be your interviewer today for the ${formData.role || 'software engineering'} position. I'm really excited to learn about your background and experience${formData.techStack ? `, especially with ${formData.techStack}` : ''}. This will be a ${formData.duration}-minute conversation. Let's start - could you tell me a bit about yourself and what interests you most about this role?`;

    const aiMessage: ConversationMessage = {
      role: 'model',
      parts: greeting,
      timestamp: '00:00'
    };

    setConversationHistory([aiMessage]);
    setCurrentQuestion(greeting);
    setQuestionNumber(1);
    lastUserSpeechTimeRef.current = Date.now();
    addDebugLog('🎬 Interview started');
    
    // ✅ Speak greeting and auto-start listening after
    await speakText(greeting);
  }, [formData, speakText, addDebugLog]);

  // Start listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      toast.error('Speech recognition not available');
      setupSpeechRecognition();
      return;
    }

    if (isSpeaking) {
      toast.error('⏳ Please wait for the interviewer to finish speaking');
      return;
    }

    if (isProcessing) {
      toast.error('⏳ Processing your previous response...');
      return;
    }

    if (isListening) {
      toast('Already listening...', { icon: '🎤' });
      return;
    }

    try {
      accumulatedTranscriptRef.current = '';
      setFinalTranscript('');
      setInterimTranscript('');
      lastProcessedTranscriptRef.current = '';
      shouldRestartAfterEndRef.current = true;
      
      recognitionRef.current.start();
      addDebugLog('🎤 User clicked microphone - starting recognition');
      toast.success('🎤 Listening... Speak now!', { duration: 2000 });
    } catch (error) {
      const err = error as Error;
      console.error('Start listening error:', error);
      addDebugLog(`❌ Failed to start: ${err.message}`);
      
      if (err.message.includes('already started')) {
        setIsListening(true);
        return;
      }
      
      setIsListening(false);

      setTimeout(() => {
        setupSpeechRecognition();
        setTimeout(() => {
          if (recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (retryError) {
              console.error('Retry start error:', retryError);
              toast.error('Could not start microphone. Please try again.');
            }
          }
        }, 500);
      }, 100);
    }
  }, [isListening, isSpeaking, isProcessing, setupSpeechRecognition, addDebugLog]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        shouldRestartAfterEndRef.current = false;
        recognitionRef.current.stop();
        addDebugLog('🛑 User stopped listening');
        toast('Stopped listening', { icon: '🛑' });
      } catch (error) {
        console.error('Stop listening error:', error);
      }
      setIsListening(false);
      setInterimTranscript('');
    }
  }, [isListening, addDebugLog]);

  // Run code tests
  const runCodeTests = useCallback(() => {
    if (!currentCodingProblem) return;

    const results: TestResult[] = [];
    const loadingToast = toast.loading('Running tests...');

    try {
      const userFunction = new Function('return ' + currentCode)() as (...args: unknown[]) => unknown;

      currentCodingProblem.testCases.forEach((testCase) => {
        try {
          const actual = userFunction(...testCase.input);
          const passed = JSON.stringify(actual) === JSON.stringify(testCase.expected);
          results.push({ passed, testCase, actual });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          results.push({ passed: false, testCase, error: errorMessage });
        }
      });

      setTestResults(results);
      setShowTestResults(true);

      const passedCount = results.filter(r => r.passed).length;
      const totalCount = results.length;

      toast.dismiss(loadingToast);

      if (passedCount === totalCount) {
        toast.success(`✅ All ${totalCount} tests passed!`);
        const feedback = `Excellent work! All ${totalCount} test cases passed. Your solution looks solid. Can you explain your approach and the time complexity?`;
        speakText(feedback);
      } else {
        toast.error(`❌ ${passedCount}/${totalCount} tests passed`);
        const feedback = `I see ${passedCount} out of ${totalCount} test cases passing. Let's review the failing cases - what do you think might be causing the issue?`;
        speakText(feedback);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast.dismiss(loadingToast);
      toast.error(`Code Error: ${errorMessage}`);
    }
  }, [currentCodingProblem, currentCode, speakText]);

  // Handle code submission
  const handleSubmitCode = useCallback(() => {
    runCodeTests();
  }, [runCodeTests]);

  // Start interview
  const handleStartInterview = useCallback(() => {
    if (!GEMINI_API_KEY) {
      toast.error('Gemini API key not configured. Please check your .env.local file');
      return;
    }

    setShowModal(false);
    setShowMockInterview(true);
    toast.success('Interview started! Good luck! 🎯');
    
    // ✅ Start conversation after a short delay
    setTimeout(() => {
      startInterviewConversation();
    }, 500);
  }, [GEMINI_API_KEY, startInterviewConversation]);

  // Leave interview
  const handleLeaveInterview = useCallback(async () => {
    const result = await Swal.fire({
      title: 'Leave Interview?',
      text: "Are you sure you want to leave? Your progress will be saved.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, leave',
      cancelButtonText: 'Stay'
    });

    if (result.isConfirmed) {
      if (audioRef.current) audioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (recognitionRef.current) {
        try {
          shouldRestartAfterEndRef.current = false;
          recognitionRef.current.abort();
        } catch (error) {
          console.error('Error stopping recognition:', error);
        }
      }

      clearInactivityTimer();

      setShowMockInterview(false);
      setShowCodeEditor(false);
      setCodeEditorCollapsed(true);
      setIsSpeaking(false);
      setIsListening(false);
      setIsProcessing(false);
      setDebugLog([]);

      toast.success('Interview saved. You can resume later!');
    }
  }, [clearInactivityTimer]);

  // Run diagnostics
  const runDiagnostics = useCallback(() => {
    const results = {
      apiKey: !!GEMINI_API_KEY,
      speechRecognition: !!recognitionRef.current,
      isListening,
      isSpeaking,
      isProcessing,
      conversationLength: conversationHistory.length,
      accumulatedText: accumulatedTranscriptRef.current,
      processingState: processingRef.current,
      lastSpeechTime: new Date(lastUserSpeechTimeRef.current).toLocaleTimeString(),
      timeSinceLastSpeech: `${Math.floor((Date.now() - lastUserSpeechTimeRef.current) / 1000)}s ago`,
      isRestarting: isRestartingRef.current,
      shouldRestartAfterEnd: shouldRestartAfterEndRef.current
    };

    console.table(results);
    addDebugLog('🔍 Diagnostic run - check console');

    const issues = [];
    if (!results.apiKey) issues.push('❌ Gemini API key not configured');
    if (!results.speechRecognition) issues.push('❌ Speech recognition not available');
    if (results.processingState) issues.push('⚠️ Processing stuck');

    if (issues.length === 0) {
      toast.success('✅ All systems operational!');
      addDebugLog('✅ Diagnostics: All systems OK');
    } else {
      console.error('Issues found:', issues);
      toast.error(`Found ${issues.length} issue(s). Check console.`);
      issues.forEach(issue => addDebugLog(issue));
    }

    return results;
  }, [GEMINI_API_KEY, isListening, isSpeaking, isProcessing, conversationHistory, addDebugLog]);

  // Interview cards
  const interviewTypes: InterviewCard[] = [
    { id: 1, title: 'System Design', category: 'Technical', icon: <Code className="w-8 h-8 text-emerald-400" />, description: 'Design scalable systems' },
    { id: 2, title: 'Business Analyst', category: 'Non-Technical', icon: <TrendingUp className="w-8 h-8 text-emerald-500" />, description: 'Business analysis' },
    { id: 3, title: 'Mobile Development', category: 'Technical', icon: <Smartphone className="w-8 h-8 text-emerald-400" />, description: 'iOS/Android' },
    { id: 4, title: 'SQL & Database', category: 'Technical', icon: <Database className="w-8 h-8 text-emerald-500" />, description: 'Database design' },
    { id: 5, title: 'Cybersecurity', category: 'Technical', icon: <Shield className="w-8 h-8 text-emerald-400" />, description: 'Security protocols' },
    { id: 6, title: 'Sales & Marketing', category: 'Non-Technical', icon: <Users className="w-8 h-8 text-emerald-500" />, description: 'Sales strategies' },
    { id: 7, title: 'Front-End', category: 'Technical', icon: <Code className="w-8 h-8 text-emerald-400" />, description: 'React, Angular, Vue' },
    { id: 8, title: 'Back-End', category: 'Technical', icon: <Server className="w-8 h-8 text-emerald-500" />, description: 'Node.js, APIs' },
    { id: 9, title: 'Full-Stack', category: 'Technical', icon: <Globe className="w-8 h-8 text-emerald-400" />, description: 'End-to-end development' },
    { id: 10, title: 'Web Performance', category: 'Technical', icon: <CloudLightning className="w-8 h-8 text-emerald-500" />, description: 'Optimization & SEO' }
  ];

  // Handle card click
  const handleCardClick = useCallback((card: InterviewCard) => {
    setFormData(prev => ({ ...prev, interviewType: card.category }));
    setShowModal(true);
  }, []);

  // RENDER: Mock Interview Mode
  if (showMockInterview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-white text-slate-900">
        <Toaster 
          position="top-center" 
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                background: '#065f46',
                color: '#fff',
              },
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
          }}
        />

        {/* Header */}
        <div className="bg-white border-b border-emerald-100 sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-emerald-600" />
                  <span className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>{formatTime(interviewTime)}</span>
                  <span className="text-sm text-slate-500 font-medium">/ {formData.duration}:00</span>
                </div>
                <div className="hidden md:block text-sm text-slate-600 font-semibold">
                  {formData.role || 'General'} • {formData.interviewType}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowDebug(!showDebug)} 
                  className={`p-2.5 hover:bg-emerald-50 rounded-xl transition-all duration-200 ${showDebug ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600'}`} 
                  title="Debug Panel"
                >
                  <Bug className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsPaused(!isPaused)} 
                  className="p-2.5 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 rounded-xl transition-all duration-200" 
                  title={isPaused ? 'Resume' : 'Pause'}
                >
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setShowTranscript(!showTranscript)} 
                  className={`p-2.5 hover:bg-emerald-50 rounded-xl transition-all duration-200 ${showTranscript ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600'}`} 
                  title="Transcript"
                >
                  <FileText className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setShowSettings(!showSettings)} 
                  className={`p-2.5 hover:bg-emerald-50 rounded-xl transition-all duration-200 ${showSettings ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600'}`} 
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <div className="h-6 w-px bg-slate-300 mx-2"></div>
                <button 
                  onClick={handleLeaveInterview} 
                  className="flex items-center space-x-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-full text-sm text-white font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Leave</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-6">
              <div className="flex-1 space-y-8">
                {/* Debug Panel */}
                {showDebug && (
                  <div className="bg-white rounded-2xl p-6 border-l-4 border-emerald-500 shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <Bug className="w-5 h-5 text-emerald-600" />
                        <h4 className="text-base font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Debug Log</h4>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={runDiagnostics}
                          className="text-xs px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold transition-all duration-200 shadow-lg hover:scale-105"
                        >
                          Run Diagnostics
                        </button>
                        <button 
                          onClick={() => setDebugLog([])}
                          className="text-xs px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full font-semibold transition-all duration-200"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1 max-h-60 overflow-y-auto text-xs font-mono bg-slate-50 rounded-xl p-4 border border-slate-200">
                      {debugLog.length === 0 ? (
                        <div className="text-slate-500">No debug messages yet. Start speaking to see logs.</div>
                      ) : (
                        debugLog.map((log, idx) => (
                          <div key={idx} className="text-slate-700 hover:bg-emerald-50 px-2 py-1 rounded">{log}</div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Interviewer and Candidate cards */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* AI Interviewer */}
                  <motion.div
                    className="bg-white rounded-2xl p-10 text-center relative overflow-hidden border-2 border-slate-200 shadow-xl"
                    animate={{
                      boxShadow: isSpeaking
                        ? ['0 0 0px rgba(16, 185, 129, 0)', '0 0 30px rgba(16, 185, 129, 0.4)', '0 0 0px rgba(16, 185, 129, 0)']
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    transition={{ duration: 1.5, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" }}
                  >
                    <AnimatePresence>
                      {isSpeaking && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.1, 0.2, 0.1] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          style={{ background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1), transparent 70%)' }}
                        />
                      )}
                    </AnimatePresence>

                    <motion.div
                      className="relative z-10"
                      animate={{ scale: isSpeaking ? [1, 1.02, 1] : 1 }}
                      transition={{ duration: 1.5, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" }}
                    >
                      <motion.div
                        className="w-36 h-36 mx-auto mb-6 rounded-full flex items-center justify-center relative"
                        animate={{
                          background: isSpeaking
                            ? ['linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105))', 'linear-gradient(135deg, rgb(5, 150, 105), rgb(4, 120, 87))', 'linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105))']
                            : 'linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105))'
                        }}
                        transition={{ duration: 2, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" }}
                      >
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                            <User className="w-14 h-14 text-white" />
                          </div>
                        </div>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Sneha</h3>
                      <p className="text-sm text-slate-600 mb-4 font-medium">AI Interviewer (Gemini Pro)</p>
                      <motion.div
                        className="w-3 h-3 rounded-full mx-auto shadow-lg"
                        animate={{
                          backgroundColor: isSpeaking ? '#10b981' : '#cbd5e1',
                          scale: isSpeaking ? [1, 1.4, 1] : 1,
                          boxShadow: isSpeaking ? ['0 0 0px rgba(16, 185, 129, 0)', '0 0 10px rgba(16, 185, 129, 0.8)', '0 0 0px rgba(16, 185, 129, 0)'] : 'none'
                        }}
                        transition={{ duration: 0.8, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" }}
                      />
                      {isSpeaking && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-emerald-600 mt-3 font-bold"
                        >
                          Speaking...
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Candidate card */}
                  <motion.div
                    className="bg-white rounded-2xl p-10 text-center relative overflow-hidden border-2 border-slate-200 shadow-xl"
                    animate={{
                      boxShadow: isListening
                        ? ['0 0 0px rgba(16, 185, 129, 0)', '0 0 30px rgba(16, 185, 129, 0.4)', '0 0 0px rgba(16, 185, 129, 0)']
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    transition={{ duration: 1.5, repeat: isListening ? Infinity : 0, ease: "easeInOut" }}
                  >
                    <AnimatePresence>
                      {isListening && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.1, 0.2, 0.1] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          style={{ background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1), transparent 70%)' }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10">
                      <div className="w-36 h-36 mx-auto mb-6 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center border-4 border-slate-300 shadow-xl">
                        <User className="w-16 h-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>You</h3>
                      <p className="text-sm text-slate-600 mb-4 font-medium">Candidate</p>
                      <motion.div
                        className="w-3 h-3 rounded-full mx-auto shadow-lg"
                        animate={{
                          backgroundColor: isListening ? '#10b981' : '#cbd5e1',
                          scale: isListening ? [1, 1.4, 1] : 1,
                          boxShadow: isListening ? ['0 0 0px rgba(16, 185, 129, 0)', '0 0 10px rgba(16, 185, 129, 0.8)', '0 0 0px rgba(16, 185, 129, 0)'] : 'none'
                        }}
                        transition={{ duration: 0.8, repeat: isListening ? Infinity : 0, ease: "easeInOut" }}
                      />
                      {isListening && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-emerald-600 mt-3 font-bold"
                        >
                          Listening...
                        </motion.p>
                      )}
                      {isProcessing && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-emerald-600 mt-3 font-bold flex items-center justify-center gap-2"
                        >
                          <Loader className="w-4 h-4 animate-spin" />
                          Processing...
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Live Transcript */}
                {(interimTranscript || finalTranscript) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 border-l-4 border-emerald-500 rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-start gap-3">
                      <Mic className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-slate-600 mb-2 font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>You&apos;re saying:</p>
                        <p className="text-slate-900 text-lg leading-relaxed font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {finalTranscript}
                          <span className="text-slate-500">{interimTranscript}</span>
                          <span className="inline-block w-0.5 h-5 bg-emerald-600 ml-1 animate-pulse"></span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Current Question card */}
                <div className="bg-white rounded-2xl p-10 border-2 border-slate-200 shadow-2xl">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                      <h4 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Current Question</h4>
                      <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold border-2 border-emerald-300">
                        {questionNumber} / {totalQuestions}
                      </span>
                    </div>
                    <p className="text-lg text-slate-700 leading-relaxed mb-8 min-h-[60px] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {currentQuestion || 'Waiting for AI interviewer...'}
                    </p>

                    <div className="flex flex-col items-center space-y-5">
                      <div className="flex items-center justify-center space-x-4">
                        <button
                          onClick={isListening ? stopListening : startListening}
                          disabled={isSpeaking || isProcessing}
                          className={`flex items-center space-x-3 px-10 py-5 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-2xl ${
                            isListening
                              ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                              : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white'
                          } ${(isSpeaking || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                          <span>
                            {isListening ? 'Stop Recording' : isProcessing ? 'Processing...' : 'Click to Speak'}
                          </span>
                        </button>
                      </div>

                      {(isSpeaking || isProcessing) && (
                        <div className="flex items-center space-x-2 text-sm font-semibold">
                          {isSpeaking && (
                            <div className="flex items-center space-x-2 text-emerald-600">
                              <Volume2 className="w-5 h-5" />
                              <span>AI is speaking...</span>
                            </div>
                          )}
                          {isProcessing && (
                            <div className="flex items-center space-x-2 text-emerald-600">
                              <Loader className="w-5 h-5 animate-spin" />
                              <span>Processing your response...</span>
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        onClick={triggerCodingQuestion}
                        className="flex items-center space-x-2 px-7 py-3.5 bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 rounded-full transition-all transform hover:scale-105 text-sm font-bold shadow-lg"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <Code className="w-5 h-5" />
                        <span>Practice Coding Challenge</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Code Editor */}
                {showCodeEditor && currentCodingProblem && (
                  <div className="bg-white rounded-2xl overflow-hidden border-2 border-slate-200 shadow-2xl">
                    <div
                      className="flex items-center justify-between p-5 bg-slate-50 cursor-pointer hover:bg-emerald-50 transition-colors border-b-2 border-slate-200"
                      onClick={() => setCodeEditorCollapsed(!codeEditorCollapsed)}
                    >
                      <div className="flex items-center space-x-4">
                        <Code className="w-6 h-6 text-emerald-600" />
                        <h4 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>{currentCodingProblem.title}</h4>
                        <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                          currentCodingProblem.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300' :
                          currentCodingProblem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300' :
                          'bg-red-100 text-red-700 border-2 border-red-300'
                        }`}>
                          {currentCodingProblem.difficulty}
                        </span>
                        <span className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-bold">
                          {currentCodingProblem.category}
                        </span>
                      </div>
                      {codeEditorCollapsed ? <ChevronDown className="w-6 h-6 text-slate-600" /> : <ChevronUp className="w-6 h-6 text-slate-600" />}
                    </div>

                    <div className={`transition-all duration-300 ${codeEditorCollapsed ? 'max-h-0 overflow-hidden' : 'max-h-[1000px]'}`}>
                      <div className="p-8">
                        <div className="mb-6 p-6 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
                          <h5 className="text-md font-bold text-emerald-700 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Problem Description</h5>
                          <p className="text-slate-700 text-sm mb-5 leading-relaxed font-medium">{currentCodingProblem.description}</p>
                          <h6 className="text-sm font-bold text-emerald-700 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Test Cases:</h6>
                          {currentCodingProblem.testCases.map((tc, idx) => (
                            <div key={idx} className="text-sm text-slate-600 pl-4 mb-2 font-medium">
                              • {tc.description} → Expected: <code className="text-emerald-700 font-mono bg-white px-2 py-0.5 rounded border border-emerald-200">{JSON.stringify(tc.expected)}</code>
                            </div>
                          ))}
                        </div>

                        <div className="relative bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden">
                          <textarea
                            value={currentCode}
                            onChange={(e) => setCurrentCode(e.target.value)}
                            className="w-full h-64 bg-white text-slate-900 font-mono text-sm p-5 pl-14 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-200 resize-none border-2 border-transparent focus:border-emerald-500"
                            style={{ lineHeight: '1.6', fontFamily: 'Monaco, Consolas, monospace' }}
                            spellCheck={false}
                          />
                          <div className="absolute top-5 left-5 text-xs text-slate-400 font-mono leading-[1.6] pointer-events-none select-none">
                            {currentCode.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
                          </div>
                        </div>

                        <div className="flex justify-between mt-5">
                          <div className="flex items-center space-x-2 text-sm text-slate-600 font-semibold">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div>
                            <span>JavaScript</span>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={runCodeTests}
                              className="flex items-center space-x-2 px-5 py-2.5 bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-lg"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              <Play className="w-4 h-4" />
                              <span>Run Tests</span>
                            </button>
                            <button
                              onClick={handleSubmitCode}
                              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full text-sm font-bold transition-all hover:scale-105 shadow-lg"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              <Send className="w-4 h-4" />
                              <span>Submit</span>
                            </button>
                          </div>
                        </div>

                        {/* Test Results */}
                        {showTestResults && testResults.length > 0 && (
                          <div className="mt-6 p-6 bg-slate-50 rounded-xl border-2 border-slate-200">
                            <div className="flex justify-between mb-4">
                              <h6 className="text-base font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Test Results</h6>
                              <span className="text-sm text-slate-600 font-semibold">
                                {testResults.filter(r => r.passed).length} / {testResults.length} passed
                              </span>
                            </div>
                            {testResults.map((result, idx) => (
                              <div
                                key={idx}
                                className={`p-4 rounded-xl border-2 mb-3 ${
                                  result.passed
                                    ? 'bg-emerald-50 border-emerald-300'
                                    : 'bg-red-50 border-red-300'
                                }`}
                              >
                                <div className="flex justify-between mb-2">
                                  <span className="text-sm text-slate-700 font-semibold">
                                    Test {idx + 1}: {result.testCase.description}
                                  </span>
                                  {result.passed ? (
                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                  ) : (
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                  )}
                                </div>
                                {!result.passed && (
                                  <div className="text-xs mt-2 space-y-1">
                                    <div className="text-red-700 font-mono font-semibold">
                                      Expected: {JSON.stringify(result.testCase.expected)}
                                    </div>
                                    <div className="text-slate-600 font-mono">
                                      {result.error || `Got: ${JSON.stringify(result.actual)}`}
                                    </div>
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

                {/* Repeat Question button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => currentQuestion && speakText(currentQuestion)}
                    disabled={isSpeaking}
                    className={`flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full transition-all transform hover:scale-105 font-bold shadow-2xl ${isSpeaking ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Repeat className="w-5 h-5" />
                    <span>Repeat Question</span>
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <AnimatePresence>
                {(showTranscript || showSettings) && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 360, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="bg-white rounded-2xl p-6 border-2 border-slate-200 overflow-hidden shadow-2xl"
                  >
                    {showTranscript && (
                      <div>
                        <div className="flex justify-between mb-5">
                          <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Transcript</h3>
                          <button onClick={() => setShowTranscript(false)} className="text-slate-500 hover:text-slate-900 transition-colors">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="space-y-5 max-h-[600px] overflow-y-auto pr-2">
                          {conversationHistory.map((msg, idx) => (
                            <div key={idx} className="text-sm">
                              <div className="flex justify-between mb-2">
                                <span className={`font-bold ${msg.role === 'model' ? 'text-emerald-600' : 'text-emerald-700'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                                  {msg.role === 'model' ? 'Sneha' : 'You'}
                                </span>
                                <span className="text-xs text-slate-500 font-medium">{msg.timestamp}</span>
                              </div>
                              <p className="text-slate-700 leading-relaxed font-medium">{msg.parts}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {showSettings && (
                      <div>
                        <div className="flex justify-between mb-5">
                          <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Settings</h3>
                          <button onClick={() => setShowSettings(false)} className="text-slate-500 hover:text-slate-900 transition-colors">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-bold mb-3 text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                              AI Voice Volume: {volume}%
                            </label>
                            <div className="flex items-center space-x-3">
                              <Volume2 className="w-5 h-5 text-emerald-600" />
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={(e) => setVolume(Number(e.target.value))}
                                className="flex-1 accent-emerald-600"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-bold mb-3 text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Gemini API Status</label>
                            <div className={`px-5 py-4 rounded-xl border-2 ${
                              GEMINI_API_KEY ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'
                            }`}>
                              <div className="flex items-center space-x-3">
                                <div className={`w-2.5 h-2.5 rounded-full ${GEMINI_API_KEY ? 'bg-emerald-600' : 'bg-red-600'}`}></div>
                                <span className="text-sm font-semibold text-slate-900">{GEMINI_API_KEY ? 'Connected' : 'Not Set'}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-bold mb-3 text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Speech Recognition</label>
                            <div className={`px-5 py-4 rounded-xl border-2 ${
                              recognitionRef.current ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'
                            }`}>
                              <div className="flex items-center space-x-3">
                                <div className={`w-2.5 h-2.5 rounded-full ${recognitionRef.current ? 'bg-emerald-600' : 'bg-red-600'}`}></div>
                                <span className="text-sm font-semibold text-slate-900">{recognitionRef.current ? 'Ready' : 'Not Supported'}</span>
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

  // RENDER: Landing Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 text-slate-900">
      <Toaster 
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: '#065f46',
              color: '#fff',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
        }}
      />

      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 opacity-70"></div>
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
              Ace Your Next Interview with AI
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 font-medium leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Practice with real-time voice AI powered by Google Gemini and coding challenges
            </p>
            <button
              onClick={() => document.getElementById('pick-interview')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-2xl"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <PlayCircle className="w-7 h-7" />
              <span>Start Practicing</span>
            </button>
          </div>
        </div>
      </section>

      <section id="pick-interview" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-5 text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
              Pick Your Interview
            </h2>
            <p className="text-slate-600 text-xl font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Choose from comprehensive categories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {interviewTypes.map((interview) => (
              <div
                key={interview.id}
                onClick={() => handleCardClick(interview)}
                className="bg-white rounded-2xl p-8 hover:bg-emerald-50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1 border border-slate-200 hover:border-emerald-300 shadow-lg hover:shadow-2xl"
              >
                <div className="flex items-center justify-between mb-5">
                  {interview.icon}
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                    interview.category === 'Technical' 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                    {interview.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {interview.title}
                </h3>
                <p className="text-slate-600 mb-6 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {interview.description}
                </p>
                <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-xl">
                  Start Interview
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
              Build Your Resume
            </h2>
            <p className="text-xl text-slate-600 mb-10 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Create a professional AI-powered resume
            </p>
            <button className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full text-lg font-bold shadow-2xl transition-all transform hover:scale-105">
              <Briefcase className="w-7 h-7" />
              <span>Build Resume</span>
            </button>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-10 max-w-lg w-full shadow-2xl border border-slate-200">
            <div className="flex justify-between mb-8">
              <h3 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                Setup Interview
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-slate-900 transition-colors">
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className="space-y-7">
              <div>
                <label className="block text-sm font-bold mb-3 text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Interview Type
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="Technical"
                      checked={formData.interviewType === 'Technical'}
                      onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })}
                      className="mr-2 accent-emerald-600"
                    />
                    <span className="text-slate-700 font-medium">Technical</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="Non-Technical"
                      checked={formData.interviewType === 'Non-Technical'}
                      onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })}
                      className="mr-2 accent-emerald-600"
                    />
                    <span className="text-slate-700 font-medium">Non-Technical</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-3 text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Role
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all text-slate-900 font-medium"
                  placeholder="e.g. Frontend Developer"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-3 text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Tech Stack (Optional)
                </label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all text-slate-900 font-medium"
                  placeholder="e.g. React, Node.js"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-3 text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all text-slate-900 font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                </select>
              </div>

              <button
                onClick={handleStartInterview}
                disabled={!GEMINI_API_KEY}
                className={`w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 ${
                  !GEMINI_API_KEY ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {GEMINI_API_KEY ? 'Start Interview' : 'API Key Not Configured'}
              </button>
              
              {!GEMINI_API_KEY && (
                <p className="text-xs text-red-600 text-center font-medium">
                  Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterviewPage;