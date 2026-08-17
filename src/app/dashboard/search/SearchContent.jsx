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
  ArrowLeft,
  FileText as PressIcon,
  User as LeadershipIcon,
  Building2 as BoardIcon,
  Briefcase as JobIcon,
  FileText as ActiveTenderIcon,
  Image as MediaIcon
} from "lucide-react";

export default function SearchContent() {
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
           results.users.length +
           results.pressReleases?.length || 0 +
           results.leadershipTeam?.length || 0 +
           results.boardDirectors?.length || 0 +
           results.jobOpenings?.length || 0 +
           results.activeTenders?.length || 0 +
           results.mediaGallery?.length || 0;
  };

  const categoryIcons = {
    project: FolderKanban,
    news: Newspaper,
    event: Calendar,
    tender: FileText,
    user: Users,
    press: PressIcon,
    leadership: LeadershipIcon,
    board: BoardIcon,
    job: JobIcon,
    'active-tender': ActiveTenderIcon,
    media: MediaIcon
  };

  const categoryNames = {
    project: "Projects",
    news: "News",
    event: "Events",
    tender: "Tender Notices",
    user: "Users",
    press: "Press Releases",
    leadership: "Leadership Team",
    board: "Board Directors",
    job: "Job Openings",
    'active-tender': "Active Tenders",
    media: "Media Gallery"
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
        
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Search Results
        </h1>
        
        <div className="flex items-center gap-3 text-slate-500">
          <SearchIcon size={18} />
          <span className="text-base">
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
              <h2 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <FolderKanban size={18} className="text-blue-600" />
                Projects ({results.projects.length})
              </h2>
              <div className="space-y-2">
                {results.projects.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-3 hover:border-blue-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1">
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
              <h2 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Newspaper size={18} className="text-green-600" />
                News ({results.news.length})
              </h2>
              <div className="space-y-2">
                {results.news.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-3 hover:border-green-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={18} className="text-green-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1">
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
              <h2 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Calendar size={18} className="text-purple-600" />
                Events ({results.events.length})
              </h2>
              <div className="space-y-2">
                {results.events.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-3 hover:border-purple-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={18} className="text-purple-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1">
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
              <h2 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <FileText size={18} className="text-orange-600" />
                Tender Notices ({results.tenderNotices.length})
              </h2>
              <div className="space-y-2">
                {results.tenderNotices.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-3 hover:border-orange-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={18} className="text-orange-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1">
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
              <h2 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Users size={18} className="text-indigo-600" />
                Users ({results.users.length})
              </h2>
              <div className="space-y-2">
                {results.users.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-3 hover:border-indigo-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={18} className="text-indigo-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1">
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

          {/* Press Releases */}
          {results.pressReleases && results.pressReleases.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <PressIcon size={18} className="text-cyan-600" />
                Press Releases ({results.pressReleases.length})
              </h2>
              <div className="space-y-2">
                {results.pressReleases.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-3 hover:border-cyan-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={18} className="text-cyan-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1">
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

          {/* Leadership Team */}
          {results.leadershipTeam && results.leadershipTeam.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <LeadershipIcon size={18} className="text-teal-600" />
                Leadership Team ({results.leadershipTeam.length})
              </h2>
              <div className="space-y-2">
                {results.leadershipTeam.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-3 hover:border-teal-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={18} className="text-teal-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1">
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

          {/* Board Directors */}
          {results.boardDirectors && results.boardDirectors.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <BoardIcon size={18} className="text-amber-600" />
                Board Directors ({results.boardDirectors.length})
              </h2>
              <div className="space-y-2">
                {results.boardDirectors.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-3 hover:border-amber-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={18} className="text-amber-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1">
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

          {/* Job Openings */}
          {results.jobOpenings && results.jobOpenings.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <JobIcon size={18} className="text-rose-600" />
                Job Openings ({results.jobOpenings.length})
              </h2>
              <div className="space-y-2">
                {results.jobOpenings.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-3 hover:border-rose-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={18} className="text-rose-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1">
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

          {/* Active Tenders */}
          {results.activeTenders && results.activeTenders.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <ActiveTenderIcon size={18} className="text-lime-600" />
                Active Tenders ({results.activeTenders.length})
              </h2>
              <div className="space-y-2">
                {results.activeTenders.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-3 hover:border-lime-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={18} className="text-lime-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1">
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

          {/* Media Gallery */}
          {results.mediaGallery && results.mediaGallery.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <MediaIcon size={18} className="text-pink-600" />
                Media Gallery ({results.mediaGallery.length})
              </h2>
              <div className="space-y-2">
                {results.mediaGallery.map((item) => {
                  const Icon = categoryIcons[item.type];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.route)}
                      className="bg-white border border-slate-200 rounded-lg p-3 hover:border-pink-400 hover:shadow-md cursor-pointer transition"
                    >
                      <div className="flex items-start gap-3">
                        <Icon size={18} className="text-pink-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-800 truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1">
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
            Enter at least 2 characters to search across Projects, News, Events, Tenders, Users, Press Releases, Leadership Team, Board Directors, Job Openings, Active Tenders, and Media Gallery
          </p>
        </div>
      )}
    </div>
  );
}