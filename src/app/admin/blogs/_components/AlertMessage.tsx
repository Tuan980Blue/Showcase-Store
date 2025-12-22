"use client";

import React from "react";

interface AlertMessageProps {
  type: "error" | "success" | "warning" | "info";
  message: string | React.ReactNode;
  onDismiss?: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  message,
  onDismiss,
}) => {
  const styles = {
    error: {
      container: "bg-red-50 border-l-4 border-red-400 text-red-700",
      icon: (
        <svg
          className="w-5 h-5 mt-0.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      dismissColor: "text-red-500 hover:text-red-700",
    },
    success: {
      container: "bg-green-50 border-l-4 border-green-400 text-green-700",
      icon: (
        <svg
          className="w-5 h-5 mt-0.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      dismissColor: "text-green-500 hover:text-green-700",
    },
    warning: {
      container: "bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700",
      icon: (
        <svg
          className="w-5 h-5 mt-0.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      dismissColor: "text-yellow-500 hover:text-yellow-700",
    },
    info: {
      container: "bg-blue-50 border-l-4 border-blue-400 text-blue-700",
      icon: (
        <svg
          className="w-5 h-5 mt-0.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      dismissColor: "text-blue-500 hover:text-blue-700",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`${style.container} px-4 py-3 rounded-lg shadow-sm flex items-start gap-3`}
    >
      {style.icon}
      <div className="flex-1">{message}</div>
      {onDismiss && (
        <button onClick={onDismiss} className={style.dismissColor}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AlertMessage;

