"use client";

import React from "react";
import { Mail, Lock } from "lucide-react";
import { handleLogin } from "@/app/actions/auth/login-action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await handleLogin(formData);

    if (!result.success) {
      setErrorMessage(result.message as string);
    } else {
      login(result.data.access_token, result.data.user);
      setErrorMessage("");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome & Enjoy!</h2>
          <p className="mt-2 text-gray-600">
            Sign in to exprience more feature!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
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
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-500 rounded border-gray-300"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-[#4b9b5c] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Sign up
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
