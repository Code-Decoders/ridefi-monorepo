"use client"
import { useState } from "react";
import { auth } from "@/app/_lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "/dashboard";
        } catch (err) {
            alert(err.message);
        }
    };
    return (
        <div className="flex items-center justify-center px-3 min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Welcome Back
                </h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition"
                    >
                        Log In
                    </button>
                </form>

                {/* Link to Signup */}
                <p className="text-sm text-center text-gray-600 mt-6">
                    Dont have an account?{" "}
                    <a href="/signup" className="text-teal-500 font-medium">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}
