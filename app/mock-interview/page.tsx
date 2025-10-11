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
  Loader
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

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  interpretation: unknown;
  emma: unknown;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  onaudiostart: (() => void) | null;
  onaudioend: (() => void) | null;
  onsoundstart: (() => void) | null;
  onsoundend: (() => void) | null;
  onspeechstart: (() => void) | null;
  onspeechend: (() => void) | null;
  onnomatch: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const MockInterviewPage = () => {
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

  // Transcript states
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');

  // ✅ NEW: Request queue and rate limiting
  const [requestQueue, setRequestQueue] = useState<string[]>([]);
  const isProcessingQueueRef = useRef(false);
  const lastRequestTimeRef = useRef<number>(0);
  const MIN_REQUEST_INTERVAL = 3000; // Minimum 3 seconds between API calls

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const processingRef = useRef(false);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Save interview state to localStorage
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
        console.error('Error saving interview state:', error instanceof Error ? error.message : String(error));
      }
    }
  }, [showMockInterview, conversationHistory, currentQuestion, questionNumber, interviewTime, formData]);

  // Restore interview state on mount
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
          confirmButtonColor: '#3b82f6',
          cancelButtonColor: '#6b7280',
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
          console.error('SweetAlert error:', error instanceof Error ? error.message : String(error));
        });
      } catch (error) {
        console.error('Error restoring interview state:', error instanceof Error ? error.message : String(error));
        localStorage.removeItem('interviewState');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prevent accidental page reload
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

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

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
Your tone should feel like a real interviewer from a reputable tech company — empathetic, focused, and conversational.

🗣 INTERVIEWING STYLE

Introduction & Rapport

Start with a warm greeting and introduce yourself as Sneha.

Build rapport by asking about their background and comfort level.

Example:

"Hi, I'm Sneha. I'll be conducting your mock interview today. How are you feeling?"

Flow & Progression

Begin with simple, open-ended questions.

Gradually increase question difficulty (mix behavioral + technical).

Ask one clear question at a time.

Acknowledge & Encourage

React naturally to answers with brief affirmations:

"That's a great point."
"Interesting approach — tell me more."
"I like how you explained that."

Coding & Problem-Solving

Occasionally introduce small coding or logic challenges:

"Let's try a quick coding problem."

Wait patiently for the candidate's response.

Give subtle hints if they struggle but don't reveal the full solution.

Afterward, give short, constructive feedback:

"Good attempt! You structured it well, though you could optimize by…"

Conclusion

End politely, summarize overall feedback, and thank them for participating.

Example:

"That wraps up our interview. You handled the questions thoughtfully — keep practicing and you'll do great in real interviews!"

⚙️ BEHAVIORAL RULES (Realtime Handling)

Voice + Text Output

Speak all responses and display them as text.

Maintain natural pacing with short pauses.

Add small fillers ("Hmm", "Alright", "I see") for realism — not too often.

Turn Detection & Timing

Wait until the user finishes speaking.

Treat ~2 seconds of silence as end of speech.

Never interrupt the user; listen fully.

Speech Recognition Failures

If speech is unclear or missing:

"I did not quite catch that — could you please repeat your answer?"

Do not display system messages like "no speech detected" or "rate limit exceeded".

Retry once automatically.

If it happens 3 times, gracefully end with:

"It seems we're having audio issues. Let's reconnect and continue later."

Error Handling

On API rate-limit or timeout, pause 2 seconds and retry once.

During processing delays, show "Sneha is listening…" or a waveform animation (if supported).

Response Limits

Keep each response under 3 sentences.

Keep each voice reply under 15 seconds for smooth streaming.

User Commands

If the user says "repeat", repeat your last question.

If they say "end interview" or "stop", end immediately and thank them politely.

Remember: Create a comfortable interview environment while assessing talent.`;
  }, [formData, questionNumber, totalQuestions]);

  // ✅ UPDATED: API call with exponential backoff
  const callOpenAI = useCallback(async (
    messages: ConversationMessage[],
    retryCount = 0
  ): Promise<string | null> => {
    if (!API_KEY) {
      toast.error('API key not configured. Please add NEXT_PUBLIC_OPENAI_API_KEY to .env.local');
      return null;
    }

    if (!API_KEY.startsWith('sk-')) {
      toast.error('Invalid API key format');
      return null;
    }

    const MAX_RETRIES = 3;
    const BASE_DELAY = 2000; // Start with 2 seconds

    try {
      console.log(`[${new Date().toISOString()}] API Call initiated (attempt ${retryCount + 1})`);

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

      // ✅ Handle 429 with exponential backoff
      if (response.status === 429) {
        if (retryCount < MAX_RETRIES) {
          const delay = BASE_DELAY * Math.pow(2, retryCount); // 2s, 4s, 8s
          console.log(`Rate limited. Retrying in ${delay}ms (attempt ${retryCount + 1}/${MAX_RETRIES})`);
          
          toast.loading(`Rate limited. Retrying in ${delay / 1000}s...`, { 
            duration: delay,
            id: 'rate-limit-toast'
          });

          await new Promise(resolve => setTimeout(resolve, delay));
          return callOpenAI(messages, retryCount + 1); // ✅ Recursive retry
        } else {
          toast.error('Rate limit exceeded. Please wait a moment before continuing.', {
            duration: 5000
          });
          return null;
        }
      }

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Invalid API key');
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          toast.error('API error occurred');
        }
        return null;
      }

      const data = await response.json();
      toast.dismiss('rate-limit-toast'); // Clear retry toast
      console.log(`[${new Date().toISOString()}] API Call successful`);
      return data.choices[0].message.content;

    } catch (error) {
      console.error('OpenAI API Error:', error instanceof Error ? error.message : String(error));
      
      // ✅ Retry on network errors
      if (retryCount < MAX_RETRIES) {
        const delay = BASE_DELAY * Math.pow(2, retryCount);
        console.log(`Network error. Retrying in ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return callOpenAI(messages, retryCount + 1);
      }
      
      toast.error('Network error. Please check your connection.');
      return null;
    }
  }, [API_KEY]);

  const speakText = useCallback(async (text: string) => {
    if (!text) return;

    setIsSpeaking(true);

    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (error) {
        console.error('Error stopping recognition:', error instanceof Error ? error.message : String(error));
      }
    }

    if (!API_KEY) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.1;
        utterance.volume = volume / 100;
        utterance.onend = () => {
          setIsSpeaking(false);
          toast.success('🎤 Your turn! Click the microphone to speak', { duration: 3000 });
        };
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
          model: 'tts-1',
          voice: 'nova',
          input: text,
          speed: 0.95
        })
      });

      if (!response.ok) {
        throw new Error(`TTS API failed with status: ${response.status}`);
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
        toast.success('🎤 Your turn! Click the microphone to speak', { duration: 3000 });
      };

      audioRef.current.onerror = (event) => {
        console.error('Audio playback error:', event);
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audioRef.current.play();
    } catch (error) {
      console.error('TTS Error:', error instanceof Error ? error.message : String(error));
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.1;
        utterance.volume = volume / 100;
        utterance.onend = () => {
          setIsSpeaking(false);
          toast.success('🎤 Your turn! Click the microphone to speak', { duration: 3000 });
        };
        window.speechSynthesis.speak(utterance);
      } else {
        setIsSpeaking(false);
      }
    }
  }, [API_KEY, volume, isListening]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const triggerCodingQuestion = useCallback(() => {
    const randomProblem = getRandomProblem();
    setCurrentCodingProblem(randomProblem);
    setCurrentCode(randomProblem.starterCode);
    setShowCodeEditor(true);
    setCodeEditorCollapsed(false);
    setTestResults([]);
    setShowTestResults(false);
    toast.success(`Coding challenge: ${randomProblem.title}`);
  }, []);

  // ✅ NEW: Internal handler that processes the actual API call
  const handleUserSpeechInternal = useCallback(async (transcript: string) => {
    if (processingRef.current) {
      console.log('Already processing, skipping');
      return;
    }

    console.log('Processing user speech:', transcript);
    processingRef.current = true;
    setIsProcessing(true);
    setFinalTranscript(transcript);
    setInterimTranscript('');

    const userMessage: ConversationMessage = {
      role: 'user',
      content: transcript,
      timestamp: formatTime(interviewTime)
    };

    const updatedHistory = [...conversationHistory, userMessage];
    setConversationHistory(updatedHistory);

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

      const lower = response.toLowerCase();
      if (lower.includes('coding problem') ||
          lower.includes('coding challenge') ||
          lower.includes('write a function') ||
          lower.includes("let's code")) {
        setTimeout(() => triggerCodingQuestion(), 2000);
      }

      setQuestionNumber(prev => Math.min(prev + 1, totalQuestions));
    } else {
      toast.error('Failed to get AI response. Please try again.');
    }

    setIsProcessing(false);
    setFinalTranscript('');
    processingRef.current = false;
  }, [conversationHistory, interviewTime, getSystemPrompt, callOpenAI, speakText, triggerCodingQuestion, formatTime, totalQuestions]);

  // ✅ NEW: Queue processor with rate limiting
  const processRequestQueue = useCallback(async () => {
    if (isProcessingQueueRef.current || requestQueue.length === 0) {
      return;
    }

    isProcessingQueueRef.current = true;
    const transcript = requestQueue[0];

    // ✅ Enforce minimum delay between requests
    const timeSinceLastRequest = Date.now() - lastRequestTimeRef.current;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      console.log(`Rate limiting: waiting ${waitTime}ms before next request`);
      toast.loading(`Processing in ${Math.ceil(waitTime / 1000)}s...`, { 
        duration: waitTime,
        id: 'queue-wait-toast'
      });
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    toast.dismiss('queue-wait-toast');

    // Process the request
    await handleUserSpeechInternal(transcript);

    // Remove from queue and update timestamp
    setRequestQueue(prev => prev.slice(1));
    lastRequestTimeRef.current = Date.now();
    isProcessingQueueRef.current = false;

    // Process next in queue if exists
    setTimeout(() => {
      if (requestQueue.length > 1) { // Check if more items exist after removal
        processRequestQueue();
      }
    }, 100);
  }, [requestQueue, handleUserSpeechInternal, MIN_REQUEST_INTERVAL]);

  // Auto-process queue when items are added
  useEffect(() => {
    if (requestQueue.length > 0) {
      console.log('Queue size:', requestQueue.length);
      processRequestQueue();
    }
  }, [requestQueue, processRequestQueue]);

  // ✅ UPDATED: Add to queue instead of processing immediately
  const handleUserSpeech = useCallback(async (transcript: string) => {
    if (!transcript.trim()) {
      return;
    }

    console.log('Adding to queue:', transcript);
    setRequestQueue(prev => [...prev, transcript]);
    toast('Adding your response to queue...', { icon: '⏳', duration: 2000 });
  }, []);

  // ✅ UPDATED: Speech recognition with batching
  const setupSpeechRecognition = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Speech recognition not supported. Please use Chrome or Edge.');
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Recognition stop error:', error instanceof Error ? error.message : String(error));
      }
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    // ✅ NEW: Accumulate speech instead of immediate processing
    let accumulatedTranscript = '';
    const SILENCE_DELAY = 2000; // Wait 2s after speech stops

    recognitionRef.current.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
      setInterimTranscript('');
      setFinalTranscript('');
      accumulatedTranscript = ''; // ✅ Reset accumulator
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

      // Update UI with interim results
      if (interim) {
        setInterimTranscript(interim);
        console.log('Interim:', interim);
      }

      // ✅ NEW: Accumulate final transcripts instead of processing immediately
      if (final.trim()) {
        accumulatedTranscript += final;
        console.log('Accumulated so far:', accumulatedTranscript);

        // ✅ Clear previous silence timeout
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
        }

        // ✅ Wait for silence before processing
        silenceTimeoutRef.current = setTimeout(() => {
          const fullTranscript = accumulatedTranscript.trim();
          
          if (fullTranscript) {
            console.log('Silence detected. Processing full transcript:', fullTranscript);
            
            // Stop recognition
            if (recognitionRef.current) {
              try {
                recognitionRef.current.stop();
              } catch (error) {
                console.error('Error stopping recognition:', error instanceof Error ? error.message : String(error));
              }
            }

            // ✅ Process the complete accumulated speech
            handleUserSpeech(fullTranscript);
            accumulatedTranscript = ''; // Reset
          }
        }, SILENCE_DELAY);
      }
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);

      if (event.error === 'no-speech') {
        console.log('No speech detected, will retry...');
        return;
      }

      if (event.error === 'aborted') {
        return;
      }

      setIsListening(false);

      if (event.error === 'not-allowed') {
        toast.error('🎤 Microphone access denied. Please enable it in browser settings.');
      } else if (event.error === 'network') {
        toast.error('🌐 Network error. Check your connection.');
      } else if (event.error !== 'no-speech') {
        toast.error(`Speech error: ${event.error}`);
      }
    };

    recognitionRef.current.onend = () => {
      console.log('Speech recognition ended');
      setIsListening(false);
      setInterimTranscript('');

      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
    };
  }, [handleUserSpeech]);

  useEffect(() => {
    setupSpeechRecognition();

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error('Cleanup error:', error instanceof Error ? error.message : String(error));
        }
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
    };
  }, [setupSpeechRecognition]);

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

  const startInterviewConversation = useCallback(async () => {
    const greeting = `Hello! I'm Sneha, and I'll be your interviewer today for the ${formData.role || 'software engineering'} position. I'm really excited to learn about your background and experience, especially with ${formData.techStack || 'your tech stack'}. This will be a ${formData.duration}-minute conversation. Let's start - could you tell me a bit about yourself and what interests you most about this role?`;

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

  // ✅ UPDATED: Better queue awareness
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

    // ✅ Check queue instead of just isProcessing
    if (isProcessing || requestQueue.length > 0) {
      toast.error(`⏳ Processing ${requestQueue.length} response(s), please wait...`);
      return;
    }

    if (isListening) {
      toast('Already listening...', { icon: '🎤' });
      return;
    }

    try {
      recognitionRef.current.start();
      toast.success('🎤 Listening... Speak now!', { duration: 2000 });
    } catch (error) {
      console.error('Start listening error:', error instanceof Error ? error.message : String(error));
      setIsListening(false);

      setupSpeechRecognition();

      setTimeout(() => {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch (retryError) {
            console.error('Retry start error:', retryError instanceof Error ? retryError.message : String(retryError));
            toast.error('Could not start microphone. Please try again.');
          }
        }
      }, 500);
    }
  }, [isListening, isSpeaking, isProcessing, requestQueue.length, setupSpeechRecognition]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
        toast('Stopped listening', { icon: '🛑' });
      } catch (error) {
        console.error('Stop listening error:', error instanceof Error ? error.message : String(error));
      }
      setIsListening(false);
      setInterimTranscript('');
    }
  }, [isListening]);

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

  const handleSubmitCode = useCallback(async () => {
    runCodeTests();
  }, [runCodeTests]);

  const handleStartInterview = useCallback(() => {
    if (!API_KEY) {
      toast.error('API key not configured. Please check your .env.local file');
      return;
    }

    setShowModal(false);
    setShowMockInterview(true);
    toast.success('Interview started! Good luck! 🎯');
    startInterviewConversation();
  }, [API_KEY, startInterviewConversation]);

  const handleLeaveInterview = useCallback(async () => {
    const result = await Swal.fire({
      title: 'Leave Interview?',
      text: "Are you sure you want to leave? Your progress will be saved.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, leave',
      cancelButtonText: 'Stay'
    });

    if (result.isConfirmed) {
      if (audioRef.current) audioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error('Error stopping recognition:', error instanceof Error ? error.message : String(error));
        }
      }

      setShowMockInterview(false);
      setShowCodeEditor(false);
      setCodeEditorCollapsed(true);
      setIsSpeaking(false);
      setIsListening(false);
      setIsProcessing(false);
      setRequestQueue([]); // ✅ Clear queue

      toast.success('Interview saved. You can resume later!');
    }
  }, []);

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

  if (showMockInterview) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Toaster position="top-center" reverseOrder={false} />

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
                <button onClick={() => setIsPaused(!isPaused)} className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title={isPaused ? 'Resume' : 'Pause'}>
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </button>
                <button onClick={() => setShowTranscript(!showTranscript)} className={`p-2 hover:bg-gray-700 rounded-lg transition-colors ${showTranscript ? 'bg-gray-700' : ''}`} title="Transcript">
                  <FileText className="w-5 h-5" />
                </button>
                <button onClick={() => setShowSettings(!showSettings)} className={`p-2 hover:bg-gray-700 rounded-lg transition-colors ${showSettings ? 'bg-gray-700' : ''}`} title="Settings">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="h-6 w-px bg-gray-700"></div>
                <button onClick={handleLeaveInterview} className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors">
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
              <div className="flex-1 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center relative overflow-hidden border border-gray-700"
                    animate={{
                      boxShadow: isSpeaking
                        ? ['0 0 20px rgba(59, 130, 246, 0.5)', '0 0 40px rgba(139, 92, 246, 0.6)', '0 0 20px rgba(59, 130, 246, 0.5)']
                        : '0 0 0px rgba(0, 0, 0, 0)'
                    }}
                    transition={{ duration: 1.5, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" }}
                  >
                    <AnimatePresence>
                      {isSpeaking && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          style={{ background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2), transparent 70%)' }}
                        />
                      )}
                    </AnimatePresence>

                    <motion.div
                      className="relative z-10"
                      animate={{ scale: isSpeaking ? [1, 1.05, 1] : 1 }}
                      transition={{ duration: 1.5, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" }}
                    >
                      <motion.div
                        className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center relative"
                        animate={{
                          background: isSpeaking
                            ? ['linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))', 'linear-gradient(135deg, rgb(139, 92, 246), rgb(236, 72, 153))', 'linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))']
                            : 'linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))'
                        }}
                        transition={{ duration: 2, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" }}
                      >
                        <div className="w-28 h-28 bg-gray-900 rounded-full flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <User className="w-12 h-12 text-white" />
                          </div>
                        </div>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-1">Sneha</h3>
                      <p className="text-sm text-gray-400 mb-3">AI Interviewer</p>
                      <motion.div
                        className="w-3 h-3 rounded-full mx-auto"
                        animate={{
                          backgroundColor: isSpeaking ? '#4ade80' : '#6b7280',
                          scale: isSpeaking ? [1, 1.3, 1] : 1
                        }}
                        transition={{ duration: 0.8, repeat: isSpeaking ? Infinity : 0, ease: "easeInOut" }}
                      />
                      {isSpeaking && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-green-400 mt-2 font-medium"
                        >
                          Speaking...
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center relative overflow-hidden border border-gray-700"
                    animate={{
                      boxShadow: isListening
                        ? ['0 0 20px rgba(34, 197, 94, 0.5)', '0 0 40px rgba(34, 197, 94, 0.6)', '0 0 20px rgba(34, 197, 94, 0.5)']
                        : '0 0 0px rgba(0, 0, 0, 0)'
                    }}
                    transition={{ duration: 1.5, repeat: isListening ? Infinity : 0, ease: "easeInOut" }}
                  >
                    <AnimatePresence>
                      {isListening && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          style={{ background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.2), transparent 70%)' }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10">
                      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center border-4 border-gray-500">
                        <User className="w-16 h-16 text-gray-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">You</h3>
                      <p className="text-sm text-gray-400 mb-3">Candidate</p>
                      <motion.div
                        className="w-3 h-3 rounded-full mx-auto"
                        animate={{
                          backgroundColor: isListening ? '#4ade80' : '#6b7280',
                          scale: isListening ? [1, 1.3, 1] : 1
                        }}
                        transition={{ duration: 0.8, repeat: isListening ? Infinity : 0, ease: "easeInOut" }}
                      />
                      {isListening && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-green-400 mt-2 font-medium"
                        >
                          Listening...
                        </motion.p>
                      )}
                      {isProcessing && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-blue-400 mt-2 font-medium flex items-center justify-center gap-2"
                        >
                          <Loader className="w-4 h-4 animate-spin" />
                          Processing...
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* ✅ NEW: Queue status display */}
                {requestQueue.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Loader className="w-5 h-5 text-purple-400 animate-spin" />
                      <div className="text-center">
                        <p className="text-purple-300 font-medium">
                          {requestQueue.length} response{requestQueue.length > 1 ? 's' : ''} in queue
                        </p>
                        <p className="text-xs text-purple-400 mt-1">
                          Processing with rate limiting (3s interval)
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {(interimTranscript || finalTranscript) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-2">
                      <Mic className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-400 mb-1">You&apos;re saying:</p>
                        <p className="text-white">
                          {finalTranscript}
                          <span className="text-gray-400">{interimTranscript}</span>
                          <span className="inline-block w-1 h-4 bg-blue-400 ml-1 animate-pulse"></span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <h4 className="text-xl font-semibold text-white">Current Question</h4>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                        {questionNumber} / {totalQuestions}
                      </span>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6 min-h-[60px]">
                      {currentQuestion || 'Waiting for AI interviewer...'}
                    </p>

                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={isListening ? stopListening : startListening}
                          disabled={isSpeaking || isProcessing || requestQueue.length > 0}
                          className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                            isListening
                              ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                              : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                          } ${(isSpeaking || isProcessing || requestQueue.length > 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                          <span className="text-lg">
                            {isListening ? 'Stop Recording' : isProcessing || requestQueue.length > 0 ? 'Processing...' : 'Click to Speak'}
                          </span>
                        </button>
                      </div>

                      {(isSpeaking || isProcessing) && (
                        <div className="flex items-center space-x-2 text-sm">
                          {isSpeaking && (
                            <div className="flex items-center space-x-2 text-blue-400">
                              <Volume2 className="w-4 h-4" />
                              <span>AI is speaking...</span>
                            </div>
                          )}
                          {isProcessing && (
                            <div className="flex items-center space-x-2 text-purple-400">
                              <Loader className="w-4 h-4 animate-spin" />
                              <span>Processing your response...</span>
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        onClick={triggerCodingQuestion}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl transition-all transform hover:scale-105 text-sm font-medium"
                      >
                        <Code className="w-5 h-5" />
                        <span>Practice Coding Challenge</span>
                      </button>
                    </div>
                  </div>
                </div>

                {showCodeEditor && currentCodingProblem && (
                  <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                    <div
                      className="flex items-center justify-between p-4 bg-gray-900 cursor-pointer hover:bg-gray-700 transition-colors"
                      onClick={() => setCodeEditorCollapsed(!codeEditorCollapsed)}
                    >
                      <div className="flex items-center space-x-3">
                        <Code className="w-5 h-5 text-blue-400" />
                        <h4 className="text-lg font-semibold text-white">{currentCodingProblem.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          currentCodingProblem.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                          currentCodingProblem.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {currentCodingProblem.difficulty}
                        </span>
                        <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                          {currentCodingProblem.category}
                        </span>
                      </div>
                      {codeEditorCollapsed ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronUp className="w-5 h-5 text-gray-400" />}
                    </div>

                    <div className={`transition-all duration-300 ${codeEditorCollapsed ? 'max-h-0 overflow-hidden' : 'max-h-[1000px]'}`}>
                      <div className="p-6">
                        <div className="mb-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
                          <h5 className="text-md font-semibold text-yellow-400 mb-2">Problem Description</h5>
                          <p className="text-gray-300 text-sm mb-4">{currentCodingProblem.description}</p>
                          <h6 className="text-sm font-semibold text-blue-400 mb-2">Test Cases:</h6>
                          {currentCodingProblem.testCases.map((tc, idx) => (
                            <div key={idx} className="text-xs text-gray-400 pl-4 mb-1">
                              • {tc.description} → Expected: <code className="text-green-400">{JSON.stringify(tc.expected)}</code>
                            </div>
                          ))}
                        </div>

                        <div className="relative bg-gray-900 rounded-lg border border-gray-600">
                          <textarea
                            value={currentCode}
                            onChange={(e) => setCurrentCode(e.target.value)}
                            className="w-full h-64 bg-transparent text-gray-100 font-mono text-sm p-4 pl-12 rounded-lg focus:outline-none resize-none"
                            style={{ lineHeight: '1.5' }}
                            spellCheck={false}
                          />
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
                            <button
                              onClick={runCodeTests}
                              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                            >
                              <Play className="w-4 h-4" />
                              <span>Run Tests</span>
                            </button>
                            <button
                              onClick={handleSubmitCode}
                              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                            >
                              <Send className="w-4 h-4" />
                              <span>Submit</span>
                            </button>
                          </div>
                        </div>

                        {showTestResults && testResults.length > 0 && (
                          <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
                            <div className="flex justify-between mb-3">
                              <h6 className="text-sm font-semibold text-white">Test Results</h6>
                              <span className="text-xs text-gray-400">
                                {testResults.filter(r => r.passed).length} / {testResults.length} passed
                              </span>
                            </div>
                            {testResults.map((result, idx) => (
                              <div
                                key={idx}
                                className={`p-3 rounded-lg border mb-2 ${
                                  result.passed
                                    ? 'bg-green-900/20 border-green-500/30'
                                    : 'bg-red-900/20 border-red-500/30'
                                }`}
                              >
                                <div className="flex justify-between mb-1">
                                  <span className="text-xs text-gray-400">
                                    Test {idx + 1}: {result.testCase.description}
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

                <div className="flex justify-center">
                  <button
                    onClick={() => currentQuestion && speakText(currentQuestion)}
                    disabled={isSpeaking}
                    className={`flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all transform hover:scale-105 font-medium ${isSpeaking ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Repeat className="w-5 h-5" />
                    <span>Repeat Question</span>
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {(showTranscript || showSettings) && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 320, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="bg-gray-800 rounded-2xl p-6 border border-gray-700 overflow-hidden"
                  >
                    {showTranscript && (
                      <div>
                        <div className="flex justify-between mb-4">
                          <h3 className="text-lg font-semibold">Transcript</h3>
                          <button onClick={() => setShowTranscript(false)}>
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                          {conversationHistory.map((msg, idx) => (
                            <div key={idx} className="text-sm">
                              <div className="flex justify-between mb-1">
                                <span className={`font-semibold ${msg.role === 'assistant' ? 'text-blue-400' : 'text-green-400'}`}>
                                  {msg.role === 'assistant' ? 'Sneha' : 'You'}
                                </span>
                                <span className="text-xs text-gray-500">{msg.timestamp}</span>
                              </div>
                              <p className="text-gray-300 leading-relaxed">{msg.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {showSettings && (
                      <div>
                        <div className="flex justify-between mb-4">
                          <h3 className="text-lg font-semibold">Settings</h3>
                          <button onClick={() => setShowSettings(false)}>
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              AI Voice Volume: {volume}%
                            </label>
                            <div className="flex items-center space-x-3">
                              <Volume2 className="w-4 h-4" />
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={(e) => setVolume(Number(e.target.value))}
                                className="flex-1"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">API Status</label>
                            <div className={`px-4 py-3 rounded-lg ${
                              API_KEY ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'
                            }`}>
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${API_KEY ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                <span className="text-sm">{API_KEY ? 'Connected' : 'Not Set'}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Speech Recognition</label>
                            <div className={`px-4 py-3 rounded-lg ${
                              recognitionRef.current ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'
                            }`}>
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${recognitionRef.current ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                <span className="text-sm">{recognitionRef.current ? 'Ready' : 'Not Supported'}</span>
                              </div>
                            </div>
                          </div>
                          {/* ✅ NEW: Queue info in settings */}
                          <div>
                            <label className="block text-sm font-medium mb-2">Request Queue</label>
                            <div className="px-4 py-3 rounded-lg bg-purple-900/20 border border-purple-500/30">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Queued:</span>
                                <span className="text-sm font-semibold text-purple-300">{requestQueue.length}</span>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-400">Min interval:</span>
                                <span className="text-xs text-gray-400">{MIN_REQUEST_INTERVAL / 1000}s</span>
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster position="top-center" />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ace Your Next Interview with AI
            </h1>
            <p className="text-xl text-gray-300 mb-8">Practice with real-time voice AI and coding challenges</p>
            <button
              onClick={() => document.getElementById('pick-interview')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-lg font-semibold transition-all transform hover:scale-105"
            >
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
              <div
                key={interview.id}
                onClick={() => handleCardClick(interview)}
                className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all cursor-pointer transform hover:scale-105 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  {interview.icon}
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    interview.category === 'Technical' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'
                  }`}>
                    {interview.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{interview.title}</h3>
                <p className="text-gray-400 mb-4">{interview.description}</p>
                <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-800 rounded-lg">
                  Start Interview
                </button>
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
              <button onClick={() => setShowModal(false)}>
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
                      name="type"
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
                      name="type"
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
                  placeholder="e.g. React, Node.js"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
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
                disabled={!API_KEY}
                className={`w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold ${
                  !API_KEY ? 'opacity-50 cursor-not-allowed' : ''
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