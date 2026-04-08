import React from "react";

const Tips = () => {
  return (
    <>
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
        <h3 className="text-white font-semibold mb-3 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          Pro Tips
        </h3>
        <ul className="text-gray-400 text-sm space-y-2">
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            Provide clear and specific context for better answers
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            Ask precise questions to get accurate responses
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            You can paste documents, articles, or any text as context
          </li>
        </ul>
      </div>
    </>
  );
};

export default Tips;
