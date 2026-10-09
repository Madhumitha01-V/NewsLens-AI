import React, { useState } from 'react';
import { AnalysisStatistics, SourceComparison, BalancedReport, ClaimType } from '../types/news.js';
import { BarChart3, PieChart, GitCompare, ShieldCheck, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

interface StatisticsDashboardProps {
  statistics: AnalysisStatistics;
  sourceComparison: SourceComparison;
  balancedReport: BalancedReport;
}

const CLAIM_COLOR_MAP: Record<ClaimType, { fill: string; stroke: string; bg: string; text: string }> = {
  Factual: { fill: '#0284c7', stroke: '#0369a1', bg: 'bg-sky-50', text: 'text-sky-700' },
  Statistical: { fill: '#0d9488', stroke: '#0f766e', bg: 'bg-teal-50', text: 'text-teal-700' },
  Policy: { fill: '#6366f1', stroke: '#4f46e5', bg: 'bg-indigo-50', text: 'text-indigo-700' },
  Predictive: { fill: '#8b5cf6', stroke: '#7c3aed', bg: 'bg-purple-50', text: 'text-purple-700' },
  Opinion: { fill: '#f59e0b', stroke: '#d97706', bg: 'bg-amber-50', text: 'text-amber-700' },
  Eyewitness: { fill: '#ec4899', stroke: '#db2777', bg: 'bg-pink-50', text: 'text-pink-700' },
};

export const StatisticsDashboard: React.FC<StatisticsDashboardProps> = ({
  statistics,
  sourceComparison,
  balancedReport,
}) => {
  const [hoveredClaimType, setHoveredClaimType] = useState<ClaimType | null>(null);

  // Calculate maximum article count for scaling bar chart
  const maxArticles = Math.max(...statistics.articlesByPublisher.map((p) => p.count), 1);

  // Calculate Donut Chart Segments
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  const donutSegments = statistics.claimsByType.map((item) => {
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedOffset;
    accumulatedOffset += (item.percentage / 100) * circumference;
    const colors = CLAIM_COLOR_MAP[item.type] || { fill: '#64748b', stroke: '#475569', bg: 'bg-slate-50', text: 'text-slate-700' };

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
      colors,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-600" />
            Live Analytics & Synthesis Statistics
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Calculated strictly from the current multi-source retrieval and verified claims.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium self-start sm:self-auto">
          <span>Corroboration Index:</span>
          <strong className="text-slate-900">{statistics.corroborationRate}%</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART 1: Articles by Publisher (Bar Chart) */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-sky-600"></span>
                Articles by Publisher
              </h4>
              <span className="text-xs text-slate-400 font-medium">
                {statistics.articlesByPublisher.length} Outlets
              </span>
            </div>

            <div className="space-y-3.5">
              {statistics.articlesByPublisher.map((pub, idx) => {
                const widthPercent = Math.max(12, Math.round((pub.count / maxArticles) * 100));
                return (
                  <div key={idx} className="group">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span className="truncate max-w-[180px] text-slate-800 group-hover:text-sky-700 transition-colors">
                        {pub.publisher}
                      </span>
                      <span className="text-slate-500 font-mono">
                        {pub.count} {pub.count === 1 ? 'article' : 'articles'}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-teal-500 rounded-full transition-all duration-500 group-hover:opacity-90"
                        style={{ width: `${widthPercent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Reputable journalism outlets retrieved via search grounding
          </p>
        </div>

        {/* CHART 2: Claim Categories (Donut Chart) */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <PieChart className="w-4 h-4 text-teal-600" />
                Claim Categories
              </h4>
              <span className="text-xs text-slate-400 font-medium">
                {statistics.extractedClaimsCount} Total Claims
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* SVG Donut */}
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke="#f1f5f9"
                    strokeWidth="20"
                  />
                  {donutSegments.map((segment, idx) => (
                    <circle
                      key={idx}
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="transparent"
                      stroke={segment.colors.fill}
                      strokeWidth={hoveredClaimType === segment.type ? '24' : '20'}
                      strokeDasharray={segment.strokeDasharray}
                      strokeDashoffset={segment.strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-300 cursor-pointer"
                      onMouseEnter={() => setHoveredClaimType(segment.type)}
                      onMouseLeave={() => setHoveredClaimType(null)}
                    />
                  ))}
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-black text-slate-900 font-sans">
                    {statistics.extractedClaimsCount}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    Claims
                  </span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex-1 w-full space-y-1.5">
                {donutSegments.map((seg, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredClaimType(seg.type)}
                    onMouseLeave={() => setHoveredClaimType(null)}
                    className={`flex items-center justify-between px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                      hoveredClaimType === seg.type ? seg.colors.bg : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: seg.colors.fill }}
                      ></span>
                      <span className="font-medium text-slate-700">{seg.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                      <span className="font-bold text-slate-800">{seg.count}</span>
                      <span>({seg.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Categorized by epistemic nature (Factual, Statistical, Policy, Predictive, Opinion)
          </p>
        </div>

        {/* CHART 3: Source Comparison & Veracity Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <GitCompare className="w-4 h-4 text-sky-600" />
                Source Comparison Statistics
              </h4>
              <span className="text-xs text-sky-700 bg-sky-50 px-2 py-0.5 rounded font-medium border border-sky-100">
                Synthesis Metrics
              </span>
            </div>

            {/* Matrix Comparison Counters */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-teal-50/70 border border-teal-100">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-800 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  Agreements
                </div>
                <div className="text-2xl font-black text-teal-900 font-sans">
                  {sourceComparison.agreements.length}
                </div>
                <div className="text-[11px] text-teal-700">Consensus points mapped</div>
              </div>

              <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-100">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  Disagreements
                </div>
                <div className="text-2xl font-black text-amber-900 font-sans">
                  {sourceComparison.disagreements.length}
                </div>
                <div className="text-[11px] text-amber-700">Differing accounts/data</div>
              </div>
            </div>

            {/* Veracity Status Breakdown Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Corroboration Distribution</span>
                <span className="text-slate-500 font-mono">
                  {statistics.extractedClaimsCount} Claims
                </span>
              </div>
              <div className="space-y-1.5">
                {statistics.claimsByStatus.map((item, idx) => {
                  const statusColors: Record<string, { bar: string; badge: string }> = {
                    Corroborated: { bar: 'bg-emerald-500', badge: 'text-emerald-700' },
                    'Single-Source': { bar: 'bg-sky-500', badge: 'text-sky-700' },
                    Disputed: { bar: 'bg-amber-500', badge: 'text-amber-700' },
                    Unverified: { bar: 'bg-rose-500', badge: 'text-rose-700' },
                  };
                  const colors = statusColors[item.status] || { bar: 'bg-slate-400', badge: 'text-slate-700' };
                  const percent = Math.round((item.count / (statistics.extractedClaimsCount || 1)) * 100);

                  return (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <span className="w-24 text-slate-600 truncate">{item.status}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colors.bar} rounded-full`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <span className="w-10 text-right font-mono font-semibold text-slate-700">
                        {item.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Evidence Gaps Identified:</span>
            <span className="font-semibold text-slate-800">
              {sourceComparison.evidenceGaps.length} areas requiring further data
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
