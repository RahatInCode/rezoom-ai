import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2 border text-gray-900 border-gray-600 rounded-lg focus:ring-2 
      focus:ring-indigo-500 focus:outline-none transition ${className}`}
    />
  );
};
