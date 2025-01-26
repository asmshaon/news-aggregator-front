interface LoadMoreButtonProps {
  onClick: () => void;
  loading?: boolean;
}

export default function LoadMoreButton({
  onClick,
  loading = false,
}: LoadMoreButtonProps) {
  return (
    <div className="text-center">
      <button
        onClick={onClick}
        disabled={loading}
        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-[#4b9b5c] disabled:opacity-50"
      >
        {loading ? "Loading..." : "Load More Articles"}
      </button>
    </div>
  );
}
