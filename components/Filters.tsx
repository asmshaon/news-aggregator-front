import AuthorFilter from "./AuthorFilter";
import SourceFilter from "./SourceFilter";
import CategoryFilter from "./CategoryFilter";

export default function Filters() {
  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-sm">
      <h2 className="font-bold text-gray-700 mb-4">Filters</h2>

      {/* Authors Filter */}
      <AuthorFilter />

      {/* Sources Filter */}
      <SourceFilter />

      {/* Categories Filter */}
      <CategoryFilter />
    </div>
  );
}
