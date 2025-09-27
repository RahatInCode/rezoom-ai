<<<<<<< HEAD
"use client";

import Image from "next/image";
=======
'use client'
// import { useRootContext } from "@/app/components/userContext";
import { FirebaseError } from "firebase/app";
>>>>>>> dev
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useRootContext } from "../../context/createContext";

<<<<<<< HEAD
export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-6xl flex-col md:flex-row rounded-lg shadow-md overflow-hidden bg-white">
        {/* Left image + title */}
        <div className="relative hidden md:flex md:w-1/2">
          <Image
            src="/login-bg.jpg"
            alt="Register background"
            fill
            className="object-cover"
          />
          <h1 className="absolute inset-0 flex items-center justify-center text-5xl font-extrabold text-white drop-shadow-lg">
            Create Account
          </h1>
        </div>

        {/* Right form section */}
        <div className="flex w-full md:w-1/2 flex-col justify-center p-8 sm:p-12 space-y-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Join Rezoom.AI
            </h2>
            <p className="text-gray-600">
              Create your free account to start building AI-powered resumes.
            </p>
          </div>

          <form className="space-y-5">
            {/* Username */}
            <label className="input w-full flex items-center gap-2 rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
              <svg
                className="h-5 w-5 opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21a7 7 0 0 1 13 0" />
                </g>
              </svg>
              <input
                type="text"
                placeholder="Username"
                className="w-full outline-none"
                required
              />
            </label>

            {/* Email */}
            <label className="input w-full flex items-center gap-2 rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
              <svg
                className="h-5 w-5 opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </g>
              </svg>
              <input
                type="email"
                placeholder="mail@site.com"
                className="w-full outline-none"
                required
              />
            </label>

            {/* Password */}
            <label className="input w-full flex items-center gap-2 rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
              <svg
                className="h-5 w-5 opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </g>
              </svg>
              <input
                type="password"
                placeholder="Password"
                className="w-full outline-none"
                required
                pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be at least 8 characters with a number, lowercase and uppercase letter"
              />
            </label>

            {/* Confirm Password */}
            <label className="input w-full flex items-center gap-2 rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
              <svg
                className="h-5 w-5 opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  <path d="M12 1v22M1 12h22" />
                </g>
              </svg>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full outline-none"
                required
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 text-white font-semibold transition hover:opacity-90"
            >
              Create Account
            </button>
          </form>

          {/* Google Sign-Up */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} />
            Sign up with Google
          </button>

          {/* Footer link */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
=======

export default function SignUp() {
  const { signup,  sendVerificationEmail, googleLogin } = useRootContext();
  const [open, setOpen] = useState(false)
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value || "";

    const passwordExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}/;
    if (!passwordExp.test(password)) {
      setError('Password must include 1 uppercase, 1 lowercase, 1 number, and be at least 6 characters long');
      return;
    }
    setError('')
    // signup handler
    try {
      await signup(email, password, name);
      // alert("Signup successful! Please check your email for verification.");
      Swal.fire({
        position: "top-end",
        title: "Signup successful! Please check your email for verification.",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      const error = err as FirebaseError; // cast error properly
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please login instead.");
      } else {
        console.error("Signup error:", error);
        setError(error.message);
      }
    }

  };

  // resend verification
  const handleResendVerification = async () => {
    if (cooldown > 0) return;
    try {
      await sendVerificationEmail();
      // alert("Verification email resent! Please check your inbox.");
      Swal.fire({
        position: "top-end",
        title: "Verification email resent! Please check your inbox.",
        showConfirmButton: false,
        timer: 1500
      });

      // cooldown timer
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
    } catch (err) {
      const error = err as FirebaseError; // cast here too
      if (error.code === "auth/too-many-requests") {
        setError("Too many attempts. Please wait a while before trying again.");
      } else {
        console.error("Resend error:", error);
        setError("Failed to resend verification email: " + error.message);
      }
    }
  };

  return (
    <div className="text-black  w-[50%] space-y-12 p-8 m-auto mt-8">
      <div>
        <h1 className="text-3xl font-bold">Create account</h1>
        <p className="font-bold text-gray-400">Sign up to get started!</p>
      </div>
      <form onSubmit={handleRegister} className="space-y-8  w-full">
        <div className="space-y-3">
          <div className="form">
            <input type="text" name="name" placeholder="" className="textbox w-full" />
            <label className="label-box text-gray-400">Full name</label>
          </div>
          <div className="form">
            <input type="email" name="email" placeholder="" className="textbox w-full" />
            <label className="label-box text-gray-400">Email</label>
          </div>
          <div className="form">
            <input type={open ? 'text' : 'password'} name="password" placeholder="" className="textbox w-full" />
            <button onClick={() => { setOpen(!open) }} className='btn btn-xs absolute top-4 right-5'>{open ? <FaEye /> : <FaEyeSlash />}</button>
            <label className="label-box text-gray-400">Password</label>
          </div>
        </div>
        <p className="text-red-500">{error}</p>
        <div className="flex flex-col gap-2">

          <button
            type="submit"
            className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-2xl"
          >
            Register
          </button>
          <button type="button" onClick={googleLogin} className="flex justify-center items-center gap-2 button3">
            <FcGoogle size={20} /> Continue with Google
          </button>
          {/* resend verification button */}
          <div className="text-center mt-4">
            <button
              onClick={handleResendVerification}
              disabled={cooldown > 0}
              className={`px-4 py-2 rounded-lg ${cooldown > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Email"}
            </button>
          </div>
        </div>

      </form>
      <p className="text-center font-bold text-gray-400">
        I am already a member{" "}
        <Link href="/createAccount/signIn">
          <span className="text-orange-500">Log in</span>
        </Link>
      </p>
>>>>>>> dev
    </div>
  );
}
