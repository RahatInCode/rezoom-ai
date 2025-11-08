"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { useRootContext } from "../../context/createContext";

export default function SignUp() {
  const router = useRouter();
  const { signup, sendVerificationEmail, googleLogin } = useRootContext();
  const [open, setOpen] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;

    const passwordExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}/;
    if (!passwordExp.test(password)) {
      setIsLoading(false);
      toast.error(
        "Password must include 1 uppercase, 1 lowercase, 1 number, and be at least 6 characters long",
        {
          duration: 5000,
          style: {
            background: '#ef4444',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '12px',
            padding: '16px',
          },
        }
      );
      return;
    }

    try {
      await signup(email, password, name);

      // Optional: Add your API endpoint later
      // const userInfo = {
      //   username: name,
      //   email,
      //   plan: "Free",
      //   joinDate: new Date().toISOString(),
      //   lastActivity: new Date().toISOString(),
      //   status: "active"
      // };
      // await fetch("YOUR_API_ENDPOINT/users", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(userInfo),
      // });

      toast.success("Account created! Please check your email to verify.", {
        duration: 4000,
        icon: '🎉',
        style: {
          background: '#10b981',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '12px',
          padding: '16px',
        },
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/createAccount/signIn");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      const firebaseError = error as FirebaseError;
      const errorMessage =
        firebaseError.code === "auth/email-already-in-use"
          ? "This email is already registered. Please login instead."
          : firebaseError.message;
      
      console.error("Sign up error:", error);
      toast.error(errorMessage, {
        duration: 5000,
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

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await googleLogin();
      toast.success("Account created with Google! Redirecting...", {
        duration: 2000,
        icon: '🎉',
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
      console.error("Google sign up error:", error);
      toast.error("Google sign-up failed. Please try again.", {
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

  const handleResendVerification = async () => {
    if (cooldown > 0) return;
    
    try {
      await sendVerificationEmail();
      toast.success("Verification email resent! Check your inbox.", {
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

      setCooldown(60);
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      const errorMessage =
        firebaseError.code === "auth/too-many-requests"
          ? "Too many attempts. Please wait before trying again."
          : "Failed to resend verification email: " + firebaseError.message;
      
      console.error("Resend verification error:", error);
      toast.error(errorMessage, {
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
            <div className="flex flex-col md:flex-row-reverse rounded-3xl shadow-2xl overflow-hidden bg-white/80 backdrop-blur-xl border-2 border-white">
              
              {/* Right Side - Image & Branding */}
              <div className="relative hidden md:flex md:w-1/2 bg-gradient-to-br from-emerald-500 to-teal-600 p-12 flex-col justify-between overflow-hidden">
                {/* Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                
                <div className="relative z-10">
                  <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
                    Start Your<br />Success Story
                  </h1>
                  <p className="text-emerald-50 text-lg font-medium leading-relaxed">
                    Join thousands of professionals using Rezoom.AI to create stunning resumes and land their dream jobs.
                  </p>
                </div>

                {/* Stats */}
                <div className="relative z-10 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-white mb-1">10K+</div>
                    <div className="text-sm text-emerald-50">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-white mb-1">50+</div>
                    <div className="text-sm text-emerald-50">Templates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-white mb-1">4.9★</div>
                    <div className="text-sm text-emerald-50">Rating</div>
                  </div>
                </div>
              </div>

              {/* Left Side - Sign Up Form */}
              <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16">
                <div className="max-w-md mx-auto space-y-8">
                  
                  {/* Header */}
                  <div className="space-y-3 text-center md:text-left">
                    <h2 className="text-4xl font-extrabold text-[#0f172a] tracking-tight">
                      Create Account
                    </h2>
                    <p className="text-slate-600 font-medium text-lg">
                      Start building your professional future
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleRegister} className="space-y-5">
                    
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-bold text-slate-700">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaUser className="text-slate-400" size={18} />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700"
                          required
                        />
                      </div>
                    </div>

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
                          name="email"
                          type="email"
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
                          name="password"
                          type={open ? "text" : "password"}
                          placeholder="Create a strong password"
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
                      <p className="text-xs text-slate-500 mt-1">
                        Must include uppercase, lowercase, number, min 6 characters
                      </p>
                    </div>

                    {/* Create Account Button */}
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
                          Creating account...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-slate-500 font-bold">Or sign up with</span>
                    </div>
                  </div>

                  {/* Google Sign Up */}
                  <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-emerald-200 bg-white hover:bg-emerald-50 text-slate-700 font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FcGoogle size={24} />
                    Sign up with Google
                  </button>

                  {/* Resend Verification */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendVerification}
                      disabled={cooldown > 0}
                      className={`text-sm font-bold transition-colors ${
                        cooldown > 0
                          ? "text-slate-400 cursor-not-allowed"
                          : "text-emerald-600 hover:text-emerald-700"
                      }`}
                    >
                      {cooldown > 0 ? `Resend Email in ${cooldown}s` : "Resend Verification Email"}
                    </button>
                  </div>

                  {/* Sign In Link */}
                  <p className="text-center text-slate-600 font-medium">
                    Already have an account?{" "}
                    <Link
                      href="/createAccount/signIn"
                      className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      Sign In
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