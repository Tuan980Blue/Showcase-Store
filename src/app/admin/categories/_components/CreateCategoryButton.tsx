"use client";

import React from "react";

interface CreateCategoryButtonProps {
  onClick: () => void;
  disabled?: boolean;
  title?: string;
}

const CreateCategoryButton: React.FC<CreateCategoryButtonProps> = ({
  onClick,
  disabled = false,
  title,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      title={title}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
      Create Category
    </button>
  );
};

export default CreateCategoryButton;

