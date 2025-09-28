"use client";
import Lottie from "lottie-react";
import { IoEnter } from "react-icons/io5";
import { LuArrowBigRightDash } from "react-icons/lu";
import Link from "next/link";

import createAccount from "../../public/lotties/createAccount.json";

export default function CreateAccount() {
  return (
    <div className="w-full flex items-center justify-center min-h-screen px-4">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Lottie Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6 border-b md:border-b-0 md:border-r border-gray-200">
          <Lottie animationData={createAccount} className="w-full max-w-md h-auto" loop />
        </div>

        {/* Text + Buttons Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-primary text-center md:text-left">
            Welcome to Rezoom.AI
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-600 text-center md:text-left">
            Sign in or create an account to start crafting professional,
            AI-powered resumes. Save your work securely and access it anytime.
          </p>

          <div className="mt-8 flex flex-col items-center md:items-start space-y-4">
            <Link
              href="/createAccount/signIn"
              className="btn btn-primary hover:btn-ghost w-72 max-w-full rounded-full flex items-center justify-center gap-2"
            >
              Create a new account <IoEnter size={20} />
            </Link>

            <Link
              href="/createAccount/signUp"
              className="btn btn-primary hover:btn-ghost w-72 max-w-full rounded-full flex items-center justify-center gap-2"
            >
              Login to existing account <LuArrowBigRightDash size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
