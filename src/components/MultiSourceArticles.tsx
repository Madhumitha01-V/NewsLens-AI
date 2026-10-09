import React, { useState } from 'react';
import { NewsArticle, GroundingSource } from '../types/news.js';
import { Globe, ExternalLink, Calendar, Search, Filter, ShieldCheck, Newspaper } from 'lucide-react';

interface MultiSourceArticlesProps {
  articles: NewsArticle[];
  sources: GroundingSource[];
  searchQueries: string[];
}

export const MultiSourceArticles: React.FC<MultiSourceArticlesProps> = ({
  articles,
  sources,
  searchQueries,
}) => {
  const [filterPublisher, setFilterPublisher] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const uniquePublishers = Array.from(new Set(articles.map((a) => a.publisher)));

  const filteredArticles = articles.filter((art) => {
    const matchesPublisher = filterPublisher === 'all' || art.publisher === filterPublisher;
    const matchesSearch =
      searchTerm.trim() === '' ||
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.publisher.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPublisher && matchesSearch;
  });

  const getStanceBadge = (stance?: string) => {
    switch (stance) {
      case 'Supportive':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Supportive Angle</span>;
      case 'Critical':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">Critical Angle</span>;
      case 'Mixed':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">Mixed Stance</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">Neutral Reporting</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and live search query tags */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-600" />
              Multi-Source News Retrieval
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Live reports retrieved and verified via Google Search grounding across {uniquePublishers.length} journalism outlets.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{sources.length} Grounding Links Verified</span>
          </div>
        </div>

        {/* Live Search Queries executed by Agent */}
        {searchQueries.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Google Search Grounding Queries Executed:
            </span>
            <div className="flex flex-wrap gap-2">
              {searchQueries.map((query, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-50 text-slate-700 border border-slate-200"
                >
                  <Search className="w-3 h-3 text-sky-600" />
                  "{query}"
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search headlines, keywords, or publishers..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterPublisher}
            onChange={(e) => setFilterPublisher(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-200 cursor-pointer"
          >
            <option value="all">All Publishers ({articles.length})</option>
            {uniquePublishers.map((pub) => (
              <option key={pub} value={pub}>
                {pub}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Publisher & Date Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs border border-sky-100">
                    <Newspaper className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      {article.publisher}
                    </span>
                    {article.publisherReliabilityTier && (
                      <span className="block text-[10px] text-slate-400 font-medium">
                        {article.publisherReliabilityTier}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getStanceBadge(article.stance)}
                  {article.date && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {article.date}
                    </span>
                  )}
                </div>
              </div>

              {/* Headline */}
              <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug mb-2.5">
                {article.title}
              </h4>

              {/* Snippet */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {article.snippet}
              </p>
            </div>

            {/* Source Link */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono truncate max-w-[200px]">
                {article.url ? new URL(article.url).hostname : 'Grounding URL'}
              </span>

              {article.url && article.url !== '#' ? (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-800 hover:underline transition-colors cursor-pointer"
                >
                  <span>Read Original Article</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">Direct grounding reference</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 text-sm">No articles matched your search filter.</p>
          <button
            onClick={() => {
              setFilterPublisher('all');
              setSearchTerm('');
            }}
            className="mt-2 text-xs font-semibold text-sky-600 hover:underline cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
};
