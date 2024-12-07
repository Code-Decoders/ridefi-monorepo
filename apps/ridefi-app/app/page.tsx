"use client";

import { useEffect, useState } from "react";
import { onUserChanged } from "./_lib/firebase";

export default function LandingPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onUserChanged().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="flex flex-col px-6 w-full items-center justify-center min-h-screen bg-gray-50">
      {/* Logo and App Name */}
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="bg-teal-500 rounded-full p-6 shadow-lg">
          <img
            src="/logo.png" // Replace with your logo path
            alt="RideFi Logo"
            className="h-20 w-20"
          />
        </div>

        {/* App Name */}
        <h1 className="mt-6 text-4xl font-bold text-gray-800 tracking-tight">
          RideFi
        </h1>
        <p className="mt-2 text-gray-500 text-sm">
          Seamless Ride-Sharing, Powered by Blockchain
        </p>
      </div>

      {/* Button */}
      {user ? (
        <button
          onClick={() => (window.location.href = "/dashboard")} // Replace "/dashboard" with your actual route
          className="mt-10 px-6 py-3 bg-teal-500 text-white w-full font-semibold text-lg rounded-lg shadow-md hover:bg-teal-600 transition-all"
        >
          Go to Dashboard
        </button>
      ) : (
        <>
          <button
            onClick={() => (window.location.href = "/login")} // Replace "/login" with your actual route
            className="mt-10 w-full px-6 py-3 bg-teal-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-teal-600 transition-all"
          >
            Login
          </button>
          <button
            onClick={() => (window.location.href = "/signup")} // Replace "/signup" with your actual route
            className="mt-4 w-full px-6 py-3 bg-gray-200 text-gray-800 font-semibold text-lg rounded-lg shadow-md hover:bg-gray-300 transition-all"
          >
            Sign Up
          </button>
        </>
      )}
    </div>
  );
}
