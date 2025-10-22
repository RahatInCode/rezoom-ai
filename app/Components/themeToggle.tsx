"use client"; // Next.js 13+ app directory

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Sync with document / localStorage
  useEffect(() => {
    // Check saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <label htmlFor="theme" className="theme">
      <span className="theme__toggle-wrap">
        <input
          id="theme"
          className="theme__toggle"
          type="checkbox"
          role="switch"
          checked={isDark}
          onChange={toggleTheme}
        />
        <span className="theme__fill"></span>
        <span className="theme__icon">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="theme__icon-part"></span>
          ))}
        </span>
      </span>
    </label>
  );
}
