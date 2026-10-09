import React from 'react';
import { AnalysisStatistics, BalancedReport } from '../types/news.js';
import { Newspaper, Building2, CheckCircle2, AlertTriangle, Scale } from 'lucide-react';

interface KPICardsProps {
  statistics: AnalysisStatistics;
  balancedReport: BalancedReport;
}

export const KPICards: React.FC<KPICardsProps> = ({ statistics, balancedReport }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* 1. Article Count */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-sm transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Articles Retrieved
          </span>
          <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
            <Newspaper className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans">
            {statistics.articleCount}
          </span>
          <span className="text-xs text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md font-medium border border-sky-100">
            Live Grounded
          </span>
        </div>
        <p className="mt-1.5 text-xs text-slate-500">
          From genuine Google Search grounding
        </p>
      </div>

      {/* 2. Distinct Publishers */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-sm transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Distinct Publishers
          </span>
          <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans">
            {statistics.distinctPublishersCount}
          </span>
          <span className="text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md font-medium border border-teal-100">
            Diverse Media
          </span>
        </div>
        <p className="mt-1.5 text-xs text-slate-500">
          Cross-outlet journalism coverage
        </p>
      </div>

      {/* 3. Extracted Claims */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-sm transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Extracted Claims
          </span>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans">
            {statistics.extractedClaimsCount}
          </span>
          <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium border border-emerald-100">
            {statistics.corroborationRate}% Corroborated
          </span>
        </div>
        <p className="mt-1.5 text-xs text-slate-500">
          Categorized & verified with evidence
        </p>
      </div>

      {/* 4. Disagreements */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-sm transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Disagreements
          </span>
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans">
            {statistics.disagreementsCount}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-md font-medium border ${
            statistics.disagreementsCount > 0 
              ? 'bg-amber-50 text-amber-700 border-amber-200' 
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            {statistics.disagreementsCount > 0 ? 'Divergences Found' : 'Broad Consensus'}
          </span>
        </div>
        <p className="mt-1.5 text-xs text-slate-500">
          Conflicting claims or differing data
        </p>
      </div>
    </div>
  );
};
