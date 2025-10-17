"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { FirebaseError } from "firebase/app";
import { useRootContext } from "../../context/createContext";

export default function SignUp() {
  const { signup, sendVerificationEmail, googleLogin } = useRootContext();
  const [open, setOpen] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
  const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
  const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;

  const passwordExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}/;
  if (!passwordExp.test(password)) {
    setError(
      "Password must include 1 uppercase, 1 lowercase, 1 number, and be at least 6 characters long"
    );
    return;
  }
  setError("");

  try {
    await signup(email, password, name);

    const userInfo = {
      username: name,
      email,
      plan: "Free",
      joinDate: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      status: "active"
    };

    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    Swal.fire({
      position: "top-end",
      title: "Signup successful! Please check your email for verification.",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (err) {
    const fe = err as FirebaseError;
    setError(
      fe.code === "auth/email-already-in-use"
        ? "This email is already registered. Please login instead."
        : fe.message
    );
  }
};

  const handleResendVerification = async () => {
    if (cooldown > 0) return;
    try {
      await sendVerificationEmail();
      Swal.fire({
        position: "top-end",
        title: "Verification email resent! Please check your inbox.",
        showConfirmButton: false,
        timer: 1500,
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
    } catch (err) {
      const fe = err as FirebaseError;
      setError(
        fe.code === "auth/too-many-requests"
          ? "Too many attempts. Please wait a while before trying again."
          : "Failed to resend verification email: " + fe.message
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-6xl flex-col md:flex-row rounded-lg shadow-md overflow-hidden bg-white">
        {/* Left image & title */}
        <div className="relative hidden md:flex md:w-1/2">
          <Image
            src="/signup-bg.jpg"
            alt="Register background"
            fill
            className="object-cover"
          />
          <h1 className="absolute inset-0 flex items-center justify-center text-5xl font-extrabold text-white drop-shadow-lg">
            Create Account
          </h1>
        </div>

        {/* Right form section */}
        <div className="flex w-full md:w-1/2 flex-col justify-center p-8 sm:p-12 space-y-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Join Rezoom.AI
            </h2>
            <p className="text-gray-600">
              Create your free account to start building AI-powered resumes.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <label className="input flex w-full items-center gap-2 rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
              <input
                name="name"
                type="text"
                placeholder="Full name"
                className="w-full outline-none"
                required
              />
            </label>

            {/* Email */}
            <label className="input flex w-full items-center gap-2 rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
              <input
                name="email"
                type="email"
                placeholder="mail@site.com"
                className="w-full outline-none"
                required
              />
            </label>

            {/* Password with toggle */}
            <label className="input flex w-full items-center gap-2 rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-primary relative">
              <input
                name="password"
                type={open ? "text" : "password"}
                placeholder="Password"
                className="w-full outline-none pr-8"
                required
              />
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="absolute right-3 text-gray-500"
              >
                {open ? <FaEye /> : <FaEyeSlash />}
              </button>
            </label>

            {error && <p className="text-red-500 text-sm">{error}</p>}

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
            onClick={googleLogin}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} />
            Sign up with Google
          </button>

          {/* Resend verification */}
          <div className="text-center">
            <button
              onClick={handleResendVerification}
              disabled={cooldown > 0}
              className={`mt-2 px-4 py-2 rounded-lg text-white ${
                cooldown > 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Email"}
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/createAccount/signIn"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
