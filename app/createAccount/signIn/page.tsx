"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, ChangeEvent } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { useRootContext } from "../../context/createContext";

export default function SignIn() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { resetPassword, login, googleLogin } = useRootContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      
      // Success toast with custom styling
      toast.success("Welcome back! Redirecting...", {
        duration: 2000,
        style: {
          background: '#10b981',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '12px',
          padding: '16px',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10b981',
        },
      });

      // Redirect after 1 second
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
        {
          duration: 4000,
          style: {
            background: '#ef4444',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '12px',
            padding: '16px',
          },
        }
      );
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await googleLogin();
      toast.success("Signed in with Google! Redirecting...", {
        duration: 2000,
        style: {
          background: '#10b981',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '12px',
          padding: '16px',
        },
      });
      setTimeout(() => {
        router.push("/user-dashboard");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error("Google login error:", error);
      toast.error("Google sign-in failed. Please try again.", {
        duration: 4000,
        style: {
          background: '#ef4444',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '12px',
          padding: '16px',
        },
      });
    }
  };

  const handleForgetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first", {
        duration: 3000,
        icon: '⚠️',
        style: {
          background: '#f59e0b',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '12px',
          padding: '16px',
        },
      });
      return;
    }
    
    try {
      await resetPassword(email);
      toast.success("Password reset email sent! Check your inbox.", {
        duration: 4000,
        icon: '📧',
        style: {
          background: '#10b981',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '12px',
          padding: '16px',
        },
      });
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to send reset email",
        {
          duration: 4000,
          style: {
            background: '#ef4444',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '12px',
            padding: '16px',
          },
        }
      );
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-green-300/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal-300/10 to-emerald-300/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Main Content */}
        <div className="relative flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-6xl">
            <div className="flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white/80 backdrop-blur-xl border-2 border-white">
              
              {/* Left Side - Image & Branding */}
              <div className="relative hidden md:flex md:w-1/2 bg-gradient-to-br from-emerald-500 to-teal-600 p-12 flex-col justify-between overflow-hidden">
                {/* Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                
                <div className="relative z-10">
                  <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
                    Welcome to<br />Rezoom.AI
                  </h1>
                  <p className="text-emerald-50 text-lg font-medium leading-relaxed">
                    Your AI-powered career companion. Build professional resumes, ace interviews, and land your dream job.
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                      <span className="text-2xl">✨</span>
                    </div>
                    <div>
                      <p className="font-bold">AI-Powered Templates</p>
                      <p className="text-sm text-emerald-50">Industry-specific resume designs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <p className="font-bold">Interview Simulations</p>
                      <p className="text-sm text-emerald-50">Practice with AI interviewers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                      <p className="font-bold">Career Growth</p>
                      <p className="text-sm text-emerald-50">Tools to accelerate your success</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Sign In Form */}
              <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16">
                <div className="max-w-md mx-auto space-y-8">
                  
                  {/* Header */}
                  <div className="space-y-3 text-center md:text-left">
                    <h2 className="text-4xl font-extrabold text-[#0f172a] tracking-tight">
                      Welcome Back
                    </h2>
                    <p className="text-slate-600 font-medium text-lg">
                      Sign in to continue your journey
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Email Input */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-bold text-slate-700">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaEnvelope className="text-slate-400" size={18} />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaLock className="text-slate-400" size={18} />
                        </div>
                        <input
                          id="password"
                          type={open ? "text" : "password"}
                          value={password}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setOpen(!open)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-emerald-600 transition-colors"
                        >
                          {open ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                        </button>
                      </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleForgetPassword}
                        className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {/* Sign In Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </span>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-slate-500 font-bold">Or continue with</span>
                    </div>
                  </div>

                  {/* Google Sign In */}
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-emerald-200 bg-white hover:bg-emerald-50 text-slate-700 font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FcGoogle size={24} />
                    Sign in with Google
                  </button>

                  {/* Sign Up Link */}
                  <p className="text-center text-slate-600 font-medium">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/createAccount/signUp"
                      className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}