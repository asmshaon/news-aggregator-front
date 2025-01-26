"use client";

import React, { useState, useEffect } from "react";
import sendApiRequest from "@/lib/api/for-client";
import { Author } from "@/types";
import { useNewsContext } from "@/providers/NewsProvider";

export default function AuthorFilter() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedAuthors, setSelectedAuthors } = useNewsContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const fetchedAuthors = await sendApiRequest("/api/authors");
        setAuthors(fetchedAuthors);
        setLoading(false);
      } catch {
        setError("Failed to load authors");
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const displayAuthors = authors
    .filter((author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  const toggleAuthor = (authorId: number) => {
    setSelectedAuthors((prev: number[]) => {
      if (prev.includes(authorId)) {
        return prev.filter((id) => id !== authorId);
      }
      return [...prev, authorId];
    });
  };

  if (loading) return <div>Loading authors...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mb-6">
      <h3 className="text-sm text-orange-600 mb-2 font-medium">Authors</h3>

      <input
        type="text"
        placeholder="Search authors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-2 py-1 border rounded mb-2 text-sm"
      />

      {displayAuthors.map((author) => (
        <label key={author.id} className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={selectedAuthors.includes(author.id)}
            onChange={() => toggleAuthor(author.id)}
            className="rounded text-blue-500"
          />
          <span className="text-sm text-gray-600">{author.name}</span>
        </label>
      ))}

      {authors.length > 5 && (
        <div className="text-xs text-gray-500 mt-2">
          {searchTerm ? `Showing matching authors` : `Showing top 5 authors`}
        </div>
      )}
    </div>
  );
}
