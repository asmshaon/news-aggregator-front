import { NewsContextType } from "@/types";
import { createContext } from "react";

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export default NewsContext;
