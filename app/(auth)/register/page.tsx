"use client";

import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/app/actions/auth/register-action";
import { useAuth } from "@/providers/AuthProvider";

export default function RegisterPge() {
  const router = useRouter();
  const { login } = useAuth();

  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await handleRegister(formData);

    if (!result.success) {
      setErrorMessage(result.message);
    } else {
      login(result.data.access_token, result.data.user);
      setErrorMessage("");
      router.push("/"); // Redirect after successful register
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Create FREE Account!
          </h2>
          <p className="mt-2 text-gray-600">Sign up for your one!</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter password"
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-[#4b9b5c] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>

        {errorMessage && (
          <div className="message text-red-500 text-center">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}
