import React from 'react';
import { Newspaper, Globe, Sparkles, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenDemoGuide: () => void;
  onOpenPipelineInspector: () => void;
  hasResults: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDemoGuide,
  onOpenPipelineInspector,
  hasResults,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-sky-600 via-teal-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-sky-600/20">
              <Newspaper className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-sans">
                  NewsLens <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-600">AI</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                  <ShieldCheck className="w-3 h-3 text-teal-600" />
                  Agentic Analysis
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Multi-Source Retrieval • Claim Extraction • Publisher Comparison • Balanced Synthesis
              </p>
            </div>
          </div>

          {/* Action buttons & Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenDemoGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
              title="Demonstration Guide for College Presentation"
            >
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Demo Guide</span>
            </button>

            {hasResults && (
              <button
                onClick={onOpenPipelineInspector}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors cursor-pointer"
                title="Inspect Agentic Steps & Search Queries"
              >
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span className="hidden sm:inline">Agent Trace</span>
                <span className="sm:hidden">Trace</span>
              </button>
            )}

            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Google Search Grounding Active
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
