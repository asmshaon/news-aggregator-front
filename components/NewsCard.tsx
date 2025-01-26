import { Article } from "@/types";
import Link from "next/link";
import ArticleImage from "./ArticleImage";
import InfoLine from "./InfoLine";

export default function NewsCard({ article }: { article: Article }) {
  return (
    <div className="flex flex-col sm:flex-row mb-6 border-b pb-6 bg-white p-6 hover:bg-gray-200">
      <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
        <ArticleImage article={article} />
      </div>

      <div className="w-full sm:w-2/3 sm:pl-4">
        <Link href={article.url} target="_blank">
          <h2 className="text-xl font-bold mb-2">{article.title}</h2>
        </Link>
        <p className="text-gray-600 mb-4">{article.description}</p>
        <div className="text-sm text-gray-500">
          <InfoLine article={article} />
        </div>
      </div>
    </div>
  );
}
