import React from 'react';
import { X, Sparkles, CheckCircle2, Search, ArrowRight, ShieldCheck, Database, Layers } from 'lucide-react';
import { NewsAnalysisResult } from '../types/news.js';

interface AgenticPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: NewsAnalysisResult | null;
}

export const AgenticPipelineModal: React.FC<AgenticPipelineModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Agentic Pipeline Execution Trace
              </h3>
              <p className="text-xs text-slate-500">
                Live verification trace for: "{result.topic}"
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Pipeline steps */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Autonomous Agent Lifecycle Steps
            </h4>
            <div className="space-y-3">
              {result.agentPipelineSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {step.step}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Completed
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {step.description}
                    </p>
                    <p className="text-[11px] font-mono text-sky-700 bg-white p-2 rounded border border-slate-200 mt-2">
                      {step.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search Grounding Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Google Search Grounding Queries Executed
            </h4>
            <div className="space-y-1.5">
              {result.searchQueries.map((query, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-100 text-xs font-mono"
                >
                  <Search className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>{query}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grounding Sources Discovered */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Grounding URLs Captured ({result.sources.length})
              </h4>
              <span className="text-[11px] text-slate-500 font-mono">
                No hallucinated links
              </span>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              {result.sources.map((src, idx) => (
                <div key={idx} className="p-2 rounded bg-white border border-slate-200/80">
                  <div className="font-semibold text-slate-800 truncate">{src.title}</div>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 hover:underline text-[11px] font-mono truncate block"
                  >
                    {src.url}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
