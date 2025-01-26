export type Article = {
  id: number;
  image: string | null;
  title: string;
  description: string;
  url: string;
  published_at: string;
  author: { name: string };
  source: { name: string };
  category: { name: string };
};

export type Category = {
  id: number;
  name: string;
};

export type Source = {
  id: number;
  name: string;
};

export type Author = {
  id: number;
  name: string;
};

export interface NewsContextType {
  authors: Author[];
  sources: Source[];
  categories: Category[];
  searchTerm: string;
  selectedAuthors: number[];
  selectedSources: number[];
  selectedCategories: number[];

  setAuthors: (authors: Author[]) => void;
  setSources: (sources: Source[]) => void;
  setCategories: (categories: Category[]) => void;
  setSearchTerm: (term: string) => void;
  setSelectedAuthors: (authors: number[]) => void;
  setSelectedSources: (sources: number[]) => void;
  setSelectedCategories: (categories: number[]) => void;
}

export interface UserPreference {
  id: number;
  user_id: number;
  preferred_sources: string[];
  preferred_categories: string[];
  preferred_authors: string[];
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  preference: UserPreference;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthResponse | null;
  login: (token: string, user: AuthResponse) => void;
  logout: () => void;
}
