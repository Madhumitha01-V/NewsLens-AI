import React from 'react';
import { X, BookOpen, CheckCircle2, ShieldCheck, Cpu, BarChart3, Newspaper, GitCompare } from 'lucide-react';

interface DemonstrationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemonstrationGuideModal: React.FC<DemonstrationGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                College Practical Demonstration Guide
              </h3>
              <p className="text-xs text-slate-500">
                NewsLens AI – System Architecture & Academic Presentation
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

        {/* Content */}
        <div className="p-6 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Overview */}
          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-600" />
              What is NewsLens AI?
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              NewsLens AI is an agentic news analysis application designed to mitigate media polarization, confirmation bias, and journalistic misinformation. Instead of relying on static training data or hallucinations, the agent performs real-time multi-source retrieval using Google Search grounding, extracts claims with evidence, compares cross-publisher alignment and discrepancies, and synthesizes a balanced intelligence report.
            </p>
          </div>

          {/* 4 Core Features */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              The 4 Required Demonstration Modules:
            </h4>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-slate-200 bg-white">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <Newspaper className="w-4 h-4 text-sky-600" />
                  1. Multi-Source Retrieval
                </div>
                <p className="text-xs text-slate-600">
                  Retrieves live news articles from distinct outlets (Reuters, BBC, AP, The Guardian, etc.) via Google Search grounding. Displays real headlines, dates, publisher names, and verified clickable source URLs.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-white">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  2. Claim & Evidence Extraction
                </div>
                <p className="text-xs text-slate-600">
                  Extracts core assertions and categorizes them into epistemic types (Factual, Statistical, Policy, Predictive, Opinion, Eyewitness). Evaluates corroboration status and attaches cited evidence snippets.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-white">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <GitCompare className="w-4 h-4 text-indigo-600" />
                  3. Source Comparison Matrix
                </div>
                <p className="text-xs text-slate-600">
                  Maps areas of inter-media consensus (Agreements), highlights contradictions and differing metrics (Disagreements), uncovers nuanced framing angles (Differing Viewpoints), and notes uncorroborated blindspots (Evidence Gaps).
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-white">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  4. Balanced Report Synthesis
                </div>
                <p className="text-xs text-slate-600">
                  Generates an objective executive summary, structured key findings, uncertainties, reporting limitations, neutrality index score, and direct reference citations.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Dashboard Note */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-teal-600" />
              Dynamic Verifiable Analytics
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every chart on the dashboard (Articles by Publisher Bar Chart, Claim Categories Donut Chart, KPI cards) is calculated purely from the current live analysis data. No mock numbers are used.
            </p>
          </div>

          {/* Evaluator Tips */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-amber-900 text-xs">
            <strong className="block font-bold mb-1">Practical Demonstration Tip:</strong>
            Try entering queries with active international reporting—like "James Webb Space Telescope discoveries", "AI semiconductor export controls", or "European Union Artificial Intelligence Act". Click on "Agent Trace" in the top bar to inspect the actual Google Search grounding queries and verified URLs.
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
