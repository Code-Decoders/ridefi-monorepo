"use client"
import { useState } from "react";
import { createUser } from "../_lib/firebase";


export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUser({
                name,
                email,
                password,
            });
            window.location.href = "/dashboard";
        } catch (err) {
            alert(err.message);
        }
    };
    return (
        <div className="flex items-center justify-center px-3 min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Create an Account
                </h2>
                <form onSubmit={handleSignup}>
                    {/* Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email */}
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
                            placeholder="Create a password"
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Link to Login */}
                <p className="text-sm text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-teal-500 font-medium">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
}
