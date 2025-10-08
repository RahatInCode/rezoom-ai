'use client'
// import { useRootContext } from "@/app/components/userContext";
import { FirebaseError } from "firebase/app";
// "use client";
// import Lottie from "lottie-react";
// import { IoEnter } from "react-icons/io5";
// import { LuArrowBigRightDash } from "react-icons/lu";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useRootContext } from "../context/createContext";
import MyAccount from "../userDashboard/UserDashboard";

// import createAccount from "../../public/lotties/createAccount.json";


function SignUp() {
  const { signup,  sendVerificationEmail, googleLogin, user } = useRootContext();
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
   <>
   {user ? <MyAccount></MyAccount> :  <div className="text-black  w-[50%] space-y-12 p-8 m-auto mt-8">
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
    </div>}
   </>
  );
}

export default SignUp;
