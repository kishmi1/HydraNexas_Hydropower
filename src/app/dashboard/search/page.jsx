"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  FolderKanban, 
  Newspaper, 
  Calendar, 
  FileText, 
  Users,
  Search as SearchIcon,
  ArrowLeft
} from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.trim().length >= 2) {
      fetchResults(query);
    } else {
      setResults(null);
    }
  }, [query]);

  const fetchResults = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.results);
      } else {
        setError(data.message || "Search failed");
      }
    } catch (err) {
      setError("Failed to fetch results");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (route) => {
    router.push(route);
  };

  const getTotalResults = () => {
    if (!results) return 0;
    return results.projects.length + 
           results.news.length + 
           results.events.length + 
           results.tenderNotices.length + 
           results.users.length;
  };

  const categoryIcons = {
    project: FolderKanban,
    news: Newspaper,
    event: Calendar,
    tender: FileText,
    user: Users
  };

  const categoryNames = {
    project: "Projects",
    news: "News",
    event: "Events",
    tender: "Tender Notices",
    user: "Users"
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4 transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Search Results
        </h1>
        
        <div className="flex items-center gap-3 text-slate-500">
          <SearchIcon size={18} />
          <span className="text-lg">
            {query ? `"${query}"` : "Enter a search term"}
          </span>
          {!loading && results && (
            <span className="text-slate-400">
              ({getTotalResults()} results found)
            </span>
          )}
        </div>


      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* No Results */}
      {!loading && !error && results && getTotalResults() === 0 && (
        <div className="text-center py-12">
          <SearchIcon size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            No results found
          </h3>
          <p className="text-slate-500">
            Try different keywords or check your spelling
          </p>
        </div>
      )}

      {/* Results */}
      {!loading && !error && results && getTotalResults() > 0 && (
        <div className="space-y-8">
          {/* Projects */}
          {results.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <FolderKanban size={20} className="text-blue-600" />
                Projects ({results.projects.length})
              </h2>
              <div className="space-y-3">
                {results.projects.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-600 mt-1">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* News */}
          {results.news.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Newspaper size={20} className="text-green-600" />
                News ({results.news.length})
              </h2>
              <div className="space-y-3">
                {results.news.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-4 hover:border-green-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={20} className="text-green-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-600 mt-1">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Events */}
          {results.events.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-purple-600" />
                Events ({results.events.length})
              </h2>
              <div className="space-y-3">
                {results.events.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-4 hover:border-purple-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-600 mt-1">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tender Notices */}
          {results.tenderNotices.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-orange-600" />
                Tender Notices ({results.tenderNotices.length})
              </h2>
              <div className="space-y-3">
                {results.tenderNotices.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-4 hover:border-orange-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={20} className="text-orange-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-600 mt-1">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Users */}
          {results.users.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Users size={20} className="text-indigo-600" />
                Users ({results.users.length})
              </h2>
              <div className="space-y-3">
                {results.users.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-4 hover:border-indigo-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={20} className="text-indigo-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-600 mt-1">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && !results && query.trim().length < 2 && (
        <div className="text-center py-12">
          <SearchIcon size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            Start searching
          </h3>
          <p className="text-slate-500">
            Enter at least 2 characters to search across Projects, News, Events, Tenders, and Users
          </p>
        </div>
      )}
    </div>
  );
}