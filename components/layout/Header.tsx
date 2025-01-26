"use client";

import { Search, UserCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useNewsContext } from "@/providers/NewsProvider";
import { useAuth } from "@/providers/AuthProvider";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { setSearchTerm } = useNewsContext();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={"/"}>
          <h1 className="text-xl font-extrabold text-orange-500 tracking-wide uppercase">
            News Aggregator
          </h1>
        </Link>

        <div className="flex items-center space-x-6">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search Articles..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"
              onClick={handleSearch}
            />
          </form>

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <UserCircle className="h-6 w-6 text-gray-600" />
                <span className="text-orange-500-700">{user.name}</span>
                <LogOut
                  className="h-5 w-5 text-gray-600 cursor-pointer"
                  onClick={logout}
                />
              </>
            ) : (
              <Link href="/login">
                <button className="text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white py-1 p-10 rounded-lg">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
