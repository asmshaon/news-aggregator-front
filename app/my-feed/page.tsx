"use client";

import NewsCard from "@/components/NewsCard";
import sendApiRequest from "@/lib/api/for-client";
import { Article } from "@/types";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const fetchFeed = async () => {
  const { data: articles }: { data: Article[] } = await sendApiRequest(
    "/api/user-feeds",
    "GET",
    {},
    {},
    Cookies.get("access_token") ?? undefined
  );

  return articles;
};

export default function MyFeedPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchFeed().then((articles) => {
      setArticles(articles);
    });
  });

  return (
    <div className="container mx-auto px-4 py-6">
      {typeof articles === undefined || articles.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No articles found. Please check back later.
        </div>
      ) : (
        articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))
      )}
    </div>
  );
}
