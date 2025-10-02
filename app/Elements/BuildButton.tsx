'use client'
import Link from 'next/link';
import React from 'react';

// The main App component that renders our ShimmerButton
export default function BuildButton({buttonName}) {
  const customCss = `
    /* This is the key to the seamless animation.
      The @property rule tells the browser that '--angle' is a custom property
      of type <angle>. This allows the browser to smoothly interpolate it
      during animations, preventing the "jump" at the end of the loop.
    */
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    /* The keyframe animation simply transitions the --angle property
      from its start (0deg) to its end (360deg).
    */
    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;

if (buttonName === "ResumeBuild"){
    return (
    // Main container to center the button on the page
    <div className="flex items-center justify-center font-sans">
      <style>{customCss}</style>
      <Link
      href={'/create-resume'}
      className="relative inline-flex text-sm items-center justify-center p-[1.5px] bg-gray-300 dark:bg-black rounded-full overflow-hidden group">
        <div 
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from var(--angle), transparent 25%, #06b6d4, transparent 50%)',
            animation: 'shimmer-spin 2.5s linear infinite',
          }}
        />
        <span className="relative  inline-flex items-cente justify-cente w-full  px-6 py-2 text-gray-900 dark:text-white hover:text-white bg-white dark:bg-gray-900 rounded-full group-hover:bg-[radial-gradient(circle,#4f46e5,#544cd7,#5851c9,#5d57ba,#615dac,#66629e,#6a6890,#6f6d81,#737373)] dark:group-hover:bg-gray-800 transition-colors duration-300">
          Build Resume
        </span>
      </Link>
    </div>
  );
}
if(buttonName === "RegisterButton"){
    return (
    // Main container to center the button on the page
    <div className="flex items-center justify-center font-sans">
      <style>{customCss}</style>
      <Link href={"/createAccount/signUp"} className="relative inline-flex text-sm items-center justify-center p-[1.5px] bg-gray-300 dark:bg-black rounded-full overflow-hidden group">
        <div 
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from var(--angle), transparent 25%, #06b6d4, transparent 50%)',
            animation: 'shimmer-spin 2.5s linear infinite',
          }}
        />
        <span className="relative  inline-flex items-cente justify-cente w-full  px-6 py-2 text-gray-900 dark:text-white hover:text-white bg-white dark:bg-gray-900 rounded-full group-hover:bg-[radial-gradient(circle,#4f46e5,#544cd7,#5851c9,#5d57ba,#615dac,#66629e,#6a6890,#6f6d81,#737373)] dark:group-hover:bg-gray-800 transition-colors duration-300">
          Register
        </span>
      </Link>
    </div>
  );
}
}
