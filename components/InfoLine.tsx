import { Article } from "@/types";
import React from "react";

export default function InfoLine({ article }: { article: Article }) {
  return (
    <div className="text-sm text-gray-500">
      {article.author.name} • {article.source.name} • {article.category.name} •{" "}
      {new Date(article.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </div>
  );
}
