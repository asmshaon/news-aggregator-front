import { Article } from "@/types";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ArticleImage({ article }: { article: Article }) {
  return (
    <>
      {article.image ? (
        <Image
          src={article.image}
          alt={article.title}
          width={300}
          height={200}
          className="rounded-md object-cover"
        />
      ) : (
        <div className="flex items-center justify-center bg-gray-100 rounded-md h-[200px] mr-2">
          <ImageOff className="text-gray-400" size={48} />
        </div>
      )}
    </>
  );
}
