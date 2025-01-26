"use client";

import AuthContext from "@/contexts/AuthContext";
import React, { useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthResponse } from "@/types";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthResponse | null>(null);
  const router = useRouter();

  // Check authentication on initial load
  useEffect(() => {
    const token = Cookies.get("access_token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login method
  const login = (token: string, userData: AuthResponse) => {
    // Set authentication token in cookies
    Cookies.set("access_token", token, {
      expires: 7, // 7 days expiration
      secure: process.env.NODE_ENV === "production",
    });

    // Store user data in local storage
    localStorage.setItem("user", JSON.stringify(userData));

    // Update state
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Logout method
  const logout = () => {
    // Remove authentication token and user data
    Cookies.remove("access_token");
    localStorage.removeItem("user");

    // Reset state
    setIsAuthenticated(false);
    setUser(null);

    // Redirect to login page
    router.push("/");
  };

  // Context value
  const contextValue = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
