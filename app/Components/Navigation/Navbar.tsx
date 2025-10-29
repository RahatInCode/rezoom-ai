'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import BuildButton from '../../Elements/BuildButton';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { app } from '../../utils/firebaseConfig';
import { h } from 'framer-motion/dist/types.d-DsEeKk6G';



const MenuIcon: React.FC = () => (
  <svg
    className="pointer-events-none"
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

const Logo: React.FC = () => (
  <div className="flex items-center justify-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" width="28" height="28">
      {/* your svg */}
    </svg>
    <Link href="/">
      <span className="font-bold text-lg tracking-wider text-gray-900 dark:text-white">Rezoom.AI</span>
    </Link>
  </div>
);

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: FirebaseUser | null) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const navigationLinks = [
    { href: "/resume-templates", label: "Resume Templates" },
    { href: "/Career", label: "Career Center" },
    { href: "/contact", label: "Contact Us" },
    { href: "/mock-interview", label: "Mock Interview" },
    { href: "/ats-checker", label: "ATS Checker" },
    { href: "/ai", label: "CV Generator" },
  ];

  if (user) navigationLinks.push({ href: "/user-dashboard", label: "My Account" });

  return (
    <header className="rounded-2xl w-full backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-700 shadow-2xl  sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-2  sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-700 text-sm dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium relative group transition-all duration-300 block px-3 py-2"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className='w-fit hidden md:flex justify-center items-center gap-3 '>
              <BuildButton buttonName={"ResumeBuild"} />
            <BuildButton buttonName={"RegisterButton"} />
            </div>
            <div className="md:hidden">
              <button
                className="group text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 h-10 w-10 flex items-center justify-center rounded-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden p-2">
            <div className="px-2 pt-2 pb-2 space-y-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-600">
              {navigationLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
              <div className='w-full gap-2  flex flex-col justify-center items-start '>
            <BuildButton buttonName={"ResumeBuild"} />
            <BuildButton buttonName={"RegisterButton"} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
