import React, { useState } from 'react';
import { SourceComparison } from '../types/news.js';
import { 
  GitCompare, 
  CheckCircle2, 
  AlertTriangle, 
  Split, 
  HelpCircle, 
  Building2, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface SourceComparisonViewProps {
  sourceComparison: SourceComparison;
}

export const SourceComparisonView: React.FC<SourceComparisonViewProps> = ({ sourceComparison }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'agreements' | 'disagreements' | 'viewpoints' | 'gaps'>('all');

  const { agreements, disagreements, differingViewpoints, evidenceGaps } = sourceComparison;

  return (
    <div className="space-y-6">
      {/* Header and Sub-tabs */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-sky-600" />
              Cross-Publisher Source Comparison Matrix
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Identifies inter-media consensus, conflicting accounts, differing framing angles, and uncorroborated evidence gaps.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Matrix
            </button>
            <button
              onClick={() => setActiveTab('agreements')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                activeTab === 'agreements'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-teal-600" />
              Agreements ({agreements.length})
            </button>
            <button
              onClick={() => setActiveTab('disagreements')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                activeTab === 'disagreements'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              Disagreements ({disagreements.length})
            </button>
            <button
              onClick={() => setActiveTab('viewpoints')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                activeTab === 'viewpoints'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Split className="w-3 h-3 text-indigo-600" />
              Viewpoints ({differingViewpoints.length})
            </button>
            <button
              onClick={() => setActiveTab('gaps')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                activeTab === 'gaps'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3 h-3 text-rose-600" />
              Gaps ({evidenceGaps.length})
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: AGREEMENTS */}
      {(activeTab === 'all' || activeTab === 'agreements') && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              Agreements & Factual Consensus Across Publishers
            </h4>
            <span className="text-xs font-semibold bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full border border-teal-200">
              {agreements.length} verified consensus points
            </span>
          </div>

          <div className="space-y-4">
            {agreements.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-teal-50/40 border border-teal-100 hover:border-teal-200 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                    Topic: {item.topic}
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-slate-500 font-medium">Corroborated by:</span>
                    {item.publishers.map((pub, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white text-slate-800 border border-teal-200 shadow-2xs"
                      >
                        {pub}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-900 mb-2">
                  "{item.statement}"
                </p>

                <p className="text-xs text-slate-600 leading-relaxed bg-white/70 p-2.5 rounded-lg border border-teal-100/60">
                  <strong className="text-slate-700 font-semibold">Corroborating Evidence: </strong>
                  {item.evidenceSummary}
                </p>
              </div>
            ))}

            {agreements.length === 0 && (
              <p className="text-xs text-slate-500 italic py-2">
                No formal multi-outlet agreements isolated for this specific query.
              </p>
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: DISAGREEMENTS & CONFLICTING REPORTS */}
      {(activeTab === 'all' || activeTab === 'disagreements') && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Disagreements & Contradictory Reporting
            </h4>
            <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200">
              {disagreements.length} divergences mapped
            </span>
          </div>

          <div className="space-y-4">
            {disagreements.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/80 hover:border-amber-300 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Contested Issue: {item.topic}
                  </span>
                  <span className="text-[11px] font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    Root Cause: {item.rootCause}
                  </span>
                </div>

                <p className="text-sm font-bold text-slate-900 mb-3">
                  {item.issue}
                </p>

                {/* Stance A vs Stance B Comparison Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-white border border-amber-200 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1">
                      <Building2 className="w-3.5 h-3.5 text-sky-600" />
                      <span>{item.publisherA}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      "{item.stanceA}"
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-amber-200 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1">
                      <Building2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>{item.publisherB}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      "{item.stanceB}"
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {disagreements.length === 0 && (
              <div className="p-4 rounded-lg bg-slate-50 text-slate-600 text-xs">
                No acute factual contradictions found between the retrieved reports on this topic (broad editorial consistency).
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: DIFFERING VIEWPOINTS & FRAMING */}
      {(activeTab === 'all' || activeTab === 'viewpoints') && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Split className="w-5 h-5 text-indigo-600" />
              Differing Viewpoints & Framing Perspectives
            </h4>
            <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200">
              {differingViewpoints.length} framing perspectives
            </span>
          </div>

          <div className="space-y-4">
            {differingViewpoints.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-indigo-50/30 border border-indigo-100 hover:border-indigo-200 transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 block mb-2">
                  Editorial Angle: {item.aspect}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2.5">
                  <div className="p-3 rounded-lg bg-white border border-indigo-100">
                    <span className="text-xs font-bold text-indigo-900 block mb-1">
                      {item.publisherA} Framing:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {item.perspectiveA}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-indigo-100">
                    <span className="text-xs font-bold text-indigo-900 block mb-1">
                      {item.publisherB} Framing:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {item.perspectiveB}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 bg-white/70 p-2 rounded border border-indigo-100/50">
                  <strong className="text-slate-800 font-semibold">Analytical Nuance: </strong>
                  {item.nuanceExplanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: EVIDENCE GAPS */}
      {(activeTab === 'all' || activeTab === 'gaps') && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              Evidence Gaps & Verification Blindspots
            </h4>
            <span className="text-xs font-semibold bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">
              {evidenceGaps.length} areas requiring further verification
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evidenceGaps.map((item, idx) => {
              const riskColors: Record<string, string> = {
                High: 'bg-rose-50 text-rose-700 border-rose-200',
                Medium: 'bg-amber-50 text-amber-700 border-amber-200',
                Low: 'bg-sky-50 text-sky-700 border-sky-200',
              };
              const badgeStyle = riskColors[item.riskAssessment] || 'bg-slate-100 text-slate-700 border-slate-200';

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-slate-900">
                        {item.topic}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${badgeStyle}`}>
                        {item.riskAssessment} Uncertainty Risk
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      <strong className="text-slate-700">Missing Evidence: </strong>
                      {item.missingEvidence}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-teal-800 bg-teal-50/50 p-2 rounded">
                    <strong>Recommended Verification: </strong>
                    {item.recommendedVerification}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
