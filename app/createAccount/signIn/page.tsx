"use client";

import Link from "next/link";
import { FormEvent, useState, ChangeEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRootContext } from "../../components/createContext";

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
      setMessage("✅ Logged in successfully!");
    } catch (err) {
      if (err instanceof Error) {
        setMessage(`❌ ${err.message}`);
      } else {
        setMessage("❌ Something went wrong.");
      }
    }
  };

  const handleForgetPassword = async () => {
    if (!email) {
      setMessage("⚠️ Enter your email first to reset password.");
      return;
    }
    try {
      await resetPassword(email);
      setMessage("📩 Password reset email sent!");
    } catch (err) {
      if (err instanceof Error) {
        setMessage(`❌ ${err.message}`);
      } else {
        setMessage("❌ Something went wrong.");
      }
    }
  };

  return (
    <div className="text-black w-[50%] space-y-12 p-8 m-auto mt-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome,</h1>
        <p className="font-bold text-gray-400">Sign in to continue!</p>
      </div>

      <div className="space-y-8">
        <form onSubmit={handleSubmit} className="space-y-3">
          

          <div className="form relative">
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="textbox w-full"
              placeholder=""
              required
            />
            <label className="label-box text-gray-400">Email</label>
          </div>

          <div className="form relative">
            <input
              type={open ? "text" : "password"}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              placeholder=""
              className="textbox w-full"
              required
            />
            <button
              type="button" // ✅ prevent accidental form submit
              onClick={() => setOpen(!open)}
              className="btn btn-xs absolute top-4 right-5"
            >
              {open ? <FaEye /> : <FaEyeSlash />}
            </button>
            <label className="label-box text-gray-400">Password</label>
          </div>

          <button
            type="button"
            onClick={handleForgetPassword}
            className="w-full flex justify-end text-sm text-blue-600 mt-3 hover:underline"
          >
            Forgot Password?
          </button>

          {message && <p className="text-sm text-red-500">{message}</p>}

          {/* ✅ Move login button INSIDE the form */}
          <button
            type="submit"
            className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-2xl w-full text-white font-bold"
          >
            Log in
          </button>
        </form>

        <div className="flex flex-col gap-2">
          <button onClick={googleLogin} className="flex justify-center items-center gap-2 border p-2 rounded-xl hover:bg-gray-100">
            <FcGoogle size={20} /> Continue with Google
          </button>
        </div>
      </div>

      <p className="text-center font-bold text-gray-400">
        I am a new user{" "}
        <Link href={"/createAccount/signUp"}>
          <span className="text-orange-500">Register</span>
        </Link>
      </p>
    </div>
  );
}
