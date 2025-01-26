"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import sendApiRequest from "@/lib/api/for-client";
import { Article } from "@/types";
import NewsCard from "@/components/NewsCard";
import LoadMoreButton from "@/components/LoadMoreButton";
import Loading from "./ui/Loading";
import { useNewsContext } from "@/providers/NewsProvider";

export default function NewsList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { searchTerm, selectedAuthors, selectedCategories, selectedSources } =
    useNewsContext();

  const fetchArticles = useCallback(
    async (cursor: string | null = null) => {
      try {
        setLoading(true);

        const authorsQuery = selectedAuthors.length
          ? `&authors=${selectedAuthors.join(",")}`
          : "";

        const sourcesQuery = selectedSources.length
          ? `&sources=${selectedSources.join(",")}`
          : "";

        const categoriesQuery = selectedCategories.length
          ? `&categories=${selectedCategories.join(",")}`
          : "";

        const {
          data,
          next_cursor,
        }: { data: Article[]; next_cursor: string | null } =
          await sendApiRequest(
            `/api/articles?${cursor ? `cursor=${cursor}` : ""}${
              searchTerm ? `&keyword=${searchTerm}` : ""
            }${authorsQuery}${sourcesQuery}${categoriesQuery}`
          );

        setArticles(cursor ? (prev) => [...prev, ...data] : data);
        setNextCursor(next_cursor);
      } catch {
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, selectedAuthors, selectedCategories, selectedSources]
  );

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const noArticlesMessage = useMemo(
    () =>
      articles.length === 0 && !loading ? (
        <div className="text-center py-10 text-gray-500">
          {searchTerm
            ? `No articles found for "${searchTerm}".`
            : "No articles found. please refine your search."}
        </div>
      ) : null,
    [articles, loading, searchTerm]
  );

  return (
    <div className="container mx-auto px-4 sm:w-4/5 lg:w-9/12">
      {noArticlesMessage}
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
      {loading && <Loading />}
      {error && <div className="text-center text-red-500 py-4">{error}</div>}
      {nextCursor && !loading && (
        <LoadMoreButton
          onClick={() => fetchArticles(nextCursor)}
          loading={loading}
        />
      )}
    </div>
  );
}
