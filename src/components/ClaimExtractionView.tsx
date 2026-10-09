import React, { useState } from 'react';
import { ExtractedClaim, ClaimType, CorroborationStatus } from '../types/news.js';
import { 
  CheckCircle, 
  Search, 
  ExternalLink, 
  Filter, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  FileText,
  Table as TableIcon,
  LayoutGrid
} from 'lucide-react';

interface ClaimExtractionViewProps {
  claims: ExtractedClaim[];
}

export const ClaimExtractionView: React.FC<ClaimExtractionViewProps> = ({ claims }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [claimSearch, setClaimSearch] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredClaims = claims.filter((c) => {
    const matchesType = selectedType === 'all' || c.claimType === selectedType;
    const matchesStatus = selectedStatus === 'all' || c.verificationStatus === selectedStatus;
    const matchesSearch =
      claimSearch.trim() === '' ||
      c.claim.toLowerCase().includes(claimSearch.toLowerCase()) ||
      c.evidence.toLowerCase().includes(claimSearch.toLowerCase()) ||
      c.sourcePublisher.toLowerCase().includes(claimSearch.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const getClaimTypeBadge = (type: ClaimType) => {
    const styleMap: Record<ClaimType, { bg: string; text: string; border: string }> = {
      Factual: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
      Statistical: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
      Policy: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
      Predictive: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      Opinion: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
      Eyewitness: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
    };
    const s = styleMap[type] || { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${s.bg} ${s.text} ${s.border}`}>
        {type}
      </span>
    );
  };

  const getStatusBadge = (status: CorroborationStatus) => {
    switch (status) {
      case 'Corroborated':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Corroborated
          </span>
        );
      case 'Single-Source':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <FileText className="w-3 h-3 text-sky-600" />
            Single Source
          </span>
        );
      case 'Disputed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Disputed Claim
          </span>
        );
      case 'Unverified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <HelpCircle className="w-3 h-3 text-rose-600" />
            Unverified
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal-600" />
              Automated Claim & Evidence Extraction
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Identifies epistemic claim assertions, corroboration levels across outlets, and cited documentary evidence.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg self-start md:self-auto border border-slate-200">
            <button
              onClick={() => setViewMode('cards')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={claimSearch}
              onChange={(e) => setClaimSearch(e.target.value)}
              placeholder="Search claims or evidence..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500"
            />
          </div>

          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-200 cursor-pointer"
            >
              <option value="all">All Claim Types</option>
              <option value="Factual">Factual Claims</option>
              <option value="Statistical">Statistical / Quantitative</option>
              <option value="Policy">Policy / Regulatory</option>
              <option value="Predictive">Predictive Forecasts</option>
              <option value="Opinion">Opinion / Editorial</option>
              <option value="Eyewitness">Eyewitness / Direct Quote</option>
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-200 cursor-pointer"
            >
              <option value="all">All Veracity Statuses</option>
              <option value="Corroborated">Corroborated (Multi-Publisher)</option>
              <option value="Single-Source">Single-Source Reporting</option>
              <option value="Disputed">Disputed / Inconsistent</option>
              <option value="Unverified">Unverified Claims</option>
            </select>
          </div>
        </div>
      </div>

      {/* CARDS VIEW */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredClaims.map((claim, idx) => (
            <div
              key={claim.id || idx}
              className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Type, Status, Confidence */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {getClaimTypeBadge(claim.claimType)}
                    {getStatusBadge(claim.verificationStatus)}
                  </div>
                  <div className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {claim.confidenceScore}% conf.
                  </div>
                </div>

                {/* Claim Text */}
                <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-3">
                  "{claim.claim}"
                </h4>

                {/* Supporting Evidence */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 mb-4">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Supporting Evidence & Context:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {claim.evidence}
                  </p>
                </div>
              </div>

              {/* Source Reference */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Source:</span>
                  <strong className="text-slate-800">{claim.sourcePublisher}</strong>
                </div>

                {claim.sourceUrl && claim.sourceUrl !== '#' && (
                  <a
                    href={claim.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-sky-600 hover:text-sky-800 hover:underline cursor-pointer"
                  >
                    <span>View Citation</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Key Claim Assertion</th>
                  <th className="py-3.5 px-3 font-bold w-24">Type</th>
                  <th className="py-3.5 px-4 font-bold">Evidence Cited</th>
                  <th className="py-3.5 px-3 font-bold w-32">Status</th>
                  <th className="py-3.5 px-3 font-bold w-28">Source Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredClaims.map((claim, idx) => (
                  <tr key={claim.id || idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 leading-snug">
                      "{claim.claim}"
                    </td>
                    <td className="py-3.5 px-3">
                      {getClaimTypeBadge(claim.claimType)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 leading-relaxed">
                      {claim.evidence}
                    </td>
                    <td className="py-3.5 px-3">
                      {getStatusBadge(claim.verificationStatus)}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-slate-800 block truncate">
                        {claim.sourcePublisher}
                      </span>
                      {claim.sourceUrl && (
                        <a
                          href={claim.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 text-sky-600 hover:underline text-[11px]"
                        >
                          <span>link</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredClaims.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 text-sm">No claims match the active filters.</p>
        </div>
      )}
    </div>
  );
};
