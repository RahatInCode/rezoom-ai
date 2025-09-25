"use client";

import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-6xl flex-col md:flex-row rounded-lg shadow-md overflow-hidden bg-white">
        {/* Left Image + Title (hidden on small) */}
        <div className="relative hidden md:flex md:w-1/2">
          <Image
            src="/login-bg.jpg"
            alt="Login background"
            fill
            className="object-cover"
          />
          <h1 className="absolute inset-0 flex items-center justify-center text-5xl font-extrabold text-white drop-shadow-lg">
            Login
          </h1>
        </div>

        {/* Right Form Section */}
        <div className="flex w-full md:w-1/2 flex-col justify-center p-8 sm:p-12 space-y-8">
          {/* Welcome Text */}
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to access your AI-powered resume builder and manage your saved resumes.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <label className="input flex w-full items-center gap-2 rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
              <svg
                className="h-5 w-5 opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
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

            <label className="input flex w-full items-center gap-2 rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
              <svg
                className="h-5 w-5 opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
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
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 text-white font-semibold transition hover:opacity-90"
            >
              Sign In
            </button>
          </form>

          {/* Google Sign-In */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* Footer link */}
          <p className="text-center text-gray-600">
            New user?{" "}
            <Link
              href="/createAccount/signUp"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
