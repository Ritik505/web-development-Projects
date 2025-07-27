"use client";
import React, { useEffect, useState } from "react";

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    typeof window !== 'undefined' && window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg border border-gray-300 dark:border-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <i className="fa-solid fa-sun text-yellow-400 text-xl" />
      ) : (
        <i className="fa-solid fa-moon text-gray-700 text-xl" />
      )}
    </button>
  );
}; 