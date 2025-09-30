"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState, ChangeEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useRootContext } from "../../context/createContext";

export default function SignIn() {
  const [open, setOpen] = useState(false);
  const { resetPassword, login, googleLogin } = useRootContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      Swal.fire({
        position: "top-end",
        title: "✅ Logged in successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      setMessage(
        err instanceof Error ? `❌ ${err.message}` : "❌ Something went wrong."
      );
    }
  };

  const handleForgetPassword = async () => {
    if (!email) {
      Swal.fire({
        position: "top-end",
        title: "⚠️ Enter your email first to reset password.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    try {
      await resetPassword(email);
      Swal.fire({
        position: "top-end",
        title: "📩 Password reset email sent!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      setMessage(
        err instanceof Error ? `❌ ${err.message}` : "❌ Something went wrong."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-6xl flex-col md:flex-row rounded-lg shadow-md overflow-hidden bg-white">
        {/* Left Image + Title */}
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

        {/* Right Form */}
        <div className="flex w-full md:w-1/2 flex-col justify-center p-8 sm:p-12 space-y-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to access your AI-powered resume builder and manage your saved resumes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <label className="flex items-center gap-2 rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <input
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="mail@site.com"
                className="w-full outline-none"
                required
              />
            </label>

            {/* Password */}
            <div className="relative flex items-center gap-2 rounded-md border px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <input
                type={open ? "text" : "password"}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                placeholder="Password"
                className="w-full outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="absolute right-3 text-gray-500 hover:text-gray-700"
              >
                {open ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            {/* Forgot Password */}
            <button
              type="button"
              onClick={handleForgetPassword}
              className="w-full text-right text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </button>

            {message && (
              <p className="text-sm text-red-500 text-center">{message}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 text-white font-semibold transition hover:opacity-90"
            >
              Log In
            </button>
          </form>

          {/* Google Sign-In */}
          <button
            type="button"
            onClick={googleLogin}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* Register Link */}
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
