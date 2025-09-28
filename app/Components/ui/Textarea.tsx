import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ className = "", ...props }) => {
  return (
    <textarea
      {...props}
      className={`w-full px-4 py-2 border text-gray-900 border-gray-600 rounded-lg focus:ring-2 
      focus:ring-indigo-500 focus:outline-none transition resize-none ${className}`}
    />
  );
};
