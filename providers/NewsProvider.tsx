"use client";

import NewsContext from "@/contexts/NewsContext";
import { Author, Category, NewsContextType, Source } from "@/types";
import React, { useContext, useState } from "react";

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
  const [selectedSources, setSelectedSources] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const contextValue: NewsContextType = {
    authors,
    sources,
    categories,
    searchTerm,
    selectedAuthors,
    selectedSources,
    selectedCategories,

    setAuthors,
    setSources,
    setCategories,
    setSearchTerm,
    setSelectedAuthors,
    setSelectedSources,
    setSelectedCategories,
  };

  return (
    <NewsContext.Provider value={contextValue}>{children}</NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  const context = useContext(NewsContext);

  if (!context) {
    throw new Error("useNewsContext must be used within a NewsProvider");
  }

  return context;
};
