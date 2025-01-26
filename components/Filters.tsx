import AuthorFilter from "./AuthorFilter";
import SourceFilter from "./SourceFilter";
import CategoryFilter from "./CategoryFilter";

export default function Filters() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm sm:w-4/5 lg:w-3/12 hidden lg:block">
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
