"use client";

import React, { useState, useEffect } from "react";
import sendApiRequest from "@/lib/api/for-client";
import { Source } from "@/types";
import { useNewsContext } from "@/providers/NewsProvider";

export default function SourceFilter() {
  const [sources, setSources] = useState<Source[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedSources, setSelectedSources } = useNewsContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchedSources = async () => {
      try {
        const fetchedSources = await sendApiRequest("/api/sources");
        setSources(fetchedSources);
        setLoading(false);
      } catch {
        setError("Failed to load sources");
        setLoading(false);
      }
    };

    fetchedSources();
  }, []);

  const displaySources = sources
    .filter((source) =>
      source.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  const toggleSource = (sourceId: number) => {
    setSelectedSources((prev: number[]) => {
      if (prev.includes(sourceId)) {
        return prev.filter((id) => id !== sourceId);
      }
      return [...prev, sourceId];
    });
  };

  if (loading) return <div>Loading sources...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mb-6">
      <h3 className="text-sm text-orange-600 mb-2 font-medium">Sources</h3>

      <input
        type="text"
        placeholder="Search sources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-2 py-1 border rounded mb-2 text-sm"
      />

      {displaySources.map((source) => (
        <label key={source.id} className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={selectedSources.includes(source.id)}
            onChange={() => toggleSource(source.id)}
            className="rounded text-blue-500"
          />
          <span className="text-sm text-gray-600">{source.name}</span>
        </label>
      ))}

      {sources.length > 5 && (
        <div className="text-xs text-gray-500 mt-2">
          {searchTerm ? `Showing matching sources` : `Showing top 5 sources`}
        </div>
      )}
    </div>
  );
}
