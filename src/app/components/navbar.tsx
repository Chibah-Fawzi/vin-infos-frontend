import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🚗</div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              VIN Checker
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              Contact
            </a>
          </div>
          <div className="md:hidden">
            <button className="text-white hover:text-blue-200 transition-colors duration-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
