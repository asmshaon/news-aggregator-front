import Filters from "@/components/Filters";
import NewsList from "@/components/NewsList";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        <Filters />
        <NewsList />
      </div>
    </div>
  );
}
