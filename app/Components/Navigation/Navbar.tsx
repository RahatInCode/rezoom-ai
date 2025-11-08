'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import BuildButton from '../../Elements/BuildButton';
import { getAuth, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { app } from '../../utils/firebaseConfig';
import Image from 'next/image';

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
    <path d="M4 12L20 12" />
    <path d="M4 6H20" />
    <path d="M4 18H20" />
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const navigationLinks = [
    { href: '/resume-templates', label: 'Resume Templates' },
    { href: '/Career', label: 'Career Center' },
    { href: '/mock-interview', label: 'Mock Interview' },
    { href: '/ats-checker', label: 'ATS Checker' },
    { href: '/ai', label: 'CV Generator' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <header className="rounded-2xl w-full backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-700 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
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

          {/* Right Side Section */}
          <div className="flex items-center gap-4">
            {!user ? (
              <div className="hidden md:flex items-center gap-3">
                <BuildButton buttonName={'ResumeBuild'} />
                <BuildButton buttonName={'RegisterButton'} />
              </div>
            ) : (
              <div className="relative">
                <div className="relative">
  <button
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border border-gray-300 dark:border-gray-600 focus:outline-none"
  >
    {user.photoURL ? (
      <Image
        src={user.photoURL}
        alt="User Avatar"
        width={40}
        height={40}
        className="object-cover rounded-full"
        priority={false}
      />
    ) : (
      <span className="text-gray-600 dark:text-gray-200 font-semibold">
        {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
      </span>
    )}
  </button>

  {isDropdownOpen && (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {user.displayName || 'User'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {user.email}
        </p>
      </div>
      <Link
        href="/user-dashboard"
        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        My Profile
      </Link>
      <Link
        href="/Career"
        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Dashboard
      </Link>
      <button
        onClick={handleSignOut}
        className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
      >
        Sign Out
      </button>
    </div>
  )}
</div>


                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                    <Link
                      href="/user-dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/Career"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
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
              {!user ? (
                <div className="w-full gap-2 flex flex-col justify-center items-start">
                  <BuildButton buttonName={'ResumeBuild'} />
                  <BuildButton buttonName={'RegisterButton'} />
                </div>
              ) : (
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
