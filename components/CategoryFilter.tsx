"use client";

import React, { useState, useEffect } from "react";
import sendApiRequest from "@/lib/api/for-client";
import { Category } from "@/types";
import { useNewsContext } from "@/providers/NewsProvider";

export default function CategoryFilter() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedCategories, setSelectedCategories } = useNewsContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchedCategories = async () => {
      try {
        const fetchedCategories = await sendApiRequest("/api/categories");
        setCategories(fetchedCategories);
        setLoading(false);
      } catch {
        setError("Failed to load categories");
        setLoading(false);
      }
    };

    fetchedCategories();
  }, []);

  const displayCategories = categories
    .filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev: number[]) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="">
      <h3 className="text-sm text-orange-600 mb-2 font-medium mt-4">
        Categories
      </h3>

      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-2 py-1 border rounded mb-2 text-sm"
      />

      {displayCategories.map((category) => (
        <label key={category.id} className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category.id)}
            onChange={() => toggleCategory(category.id)}
            className="rounded text-blue-500"
          />
          <span className="text-sm text-gray-600">{category.name}</span>
        </label>
      ))}

      {categories.length > 5 && (
        <div className="text-xs text-gray-500 mt-2">
          {searchTerm
            ? `Showing matching categories`
            : `Showing top 5 categories`}
        </div>
      )}
    </div>
  );
}
