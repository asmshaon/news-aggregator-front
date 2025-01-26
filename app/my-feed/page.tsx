import NewsCard from "@/components/NewsCard";
import sendApiRequest from "@/lib/api/for-client";
import { Article } from "@/types";

export default async function MyFeedPage() {
  const { data: articles }: { data: Article[] } = await sendApiRequest(
    "/api/user-feeds"
  );

  return (
    <div className="container mx-auto px-4">
      {articles.length === 0 ? (
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
