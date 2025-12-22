"use client";

import React from "react";
import Link from "next/link";

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "orange";
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200",
    green: "bg-green-50 text-green-600 hover:bg-green-100 border-green-200",
    purple: "bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200",
    orange: "bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${colorClasses[action.color]}`}
          >
            <div className="flex-shrink-0">{action.icon}</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

