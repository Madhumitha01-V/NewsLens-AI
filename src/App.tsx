/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.js';
import { TopicSearchInput } from './components/TopicSearchInput.js';
import { KPICards } from './components/KPICards.js';
import { StatisticsDashboard } from './components/StatisticsDashboard.js';
import { MultiSourceArticles } from './components/MultiSourceArticles.js';
import { ClaimExtractionView } from './components/ClaimExtractionView.js';
import { SourceComparisonView } from './components/SourceComparisonView.js';
import { BalancedReportView } from './components/BalancedReportView.js';
import { AgenticPipelineModal } from './components/AgenticPipelineModal.js';
import { DemonstrationGuideModal } from './components/DemonstrationGuideModal.js';
import { NewsAnalysisResult } from './types/news.js';
import { 
  BarChart3, 
  Globe, 
  CheckCircle, 
  GitCompare, 
  FileText, 
  AlertCircle, 
  Loader2, 
  Download, 
  Sparkles, 
  ShieldAlert, 
  RefreshCw,
  Search,
  BookOpen
} from 'lucide-react';

type ActiveTab = 'overview' | 'retrieval' | 'claims' | 'comparison' | 'report';

export default function App() {
  const [topic, setTopic] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(1);
  const [error, setError] = useState<{ title: string; message: string; isRetrievalEmpty?: boolean } | null>(null);
  const [analysisResult, setAnalysisResult] = useState<NewsAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState<boolean>(false);
  const [isPipelineModalOpen, setIsPipelineModalOpen] = useState<boolean>(false);

  const handleAnalyzeNews = async (searchTopic: string) => {
    setIsLoading(true);
    setError(null);
    setTopic(searchTopic);
    setLoadingStep(1);

    // Simulate realistic progressive pipeline steps while waiting for server response
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < 4) return prev + 1;
        return prev;
      });
    }, 2800);

    try {
      const response = await fetch('/api/analyze-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: searchTopic }),
      });

      const data = await response.json();
      clearInterval(stepInterval);

      if (!response.ok) {
        if (data.error === 'NO_LIVE_RETRIEVAL') {
          setError({
            title: 'No Live Coverage Found',
            message: data.message || 'No verifiable multi-source news coverage could be verified for this topic via live web search. Please try a different or broader news query.',
            isRetrievalEmpty: true,
          });
        } else if (data.error === 'API_KEY_MISSING') {
          setError({
            title: 'Gemini API Key Required',
            message: data.message || 'Please ensure GEMINI_API_KEY is configured in your project Secrets panel.',
          });
        } else {
          setError({
            title: 'Analysis Failed',
            message: data.message || 'Unable to retrieve and synthesize news for this topic. Please try again.',
          });
        }
        setIsLoading(false);
        return;
      }

      setAnalysisResult(data);
      setActiveTab('overview');
    } catch (err: any) {
      clearInterval(stepInterval);
      setError({
        title: 'Connection Error',
        message: err.message || 'Network error while contacting the news analysis server.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportJSON = () => {
    if (!analysisResult) return;
    const blob = new Blob([JSON.stringify(analysisResult, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newslens-${analysisResult.topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col text-slate-800">
      {/* Top Navbar */}
      <Navbar
        onOpenDemoGuide={() => setIsDemoGuideOpen(true)}
        onOpenPipelineInspector={() => setIsPipelineModalOpen(true)}
        hasResults={Boolean(analysisResult)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Search Input Section */}
        <TopicSearchInput
          onAnalyze={handleAnalyzeNews}
          isLoading={isLoading}
          currentTopic={topic}
        />

        {/* LOADING STATE - Progressive Agent Pipeline Display */}
        {isLoading && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-8 text-center max-w-3xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4 border border-sky-100">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              Agentic NewsLens Investigating: "{topic}"
            </h3>
            <p className="text-sm text-slate-500 mb-8 max-w-lg mx-auto">
              Synthesizing genuine reports using Google Search grounding across authoritative journalism networks.
            </p>

            {/* Stepper */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-left">
              <div className={`p-3 rounded-xl border transition-all ${loadingStep >= 1 ? 'bg-sky-50/80 border-sky-300' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${loadingStep > 1 ? 'bg-teal-600 text-white' : loadingStep === 1 ? 'bg-sky-600 text-white animate-pulse' : 'bg-slate-300 text-slate-700'}`}>
                    1
                  </span>
                  <span className="text-xs font-bold text-slate-900">Retrieval</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Google Search grounding for multi-publisher articles
                </p>
              </div>

              <div className={`p-3 rounded-xl border transition-all ${loadingStep >= 2 ? 'bg-sky-50/80 border-sky-300' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${loadingStep > 2 ? 'bg-teal-600 text-white' : loadingStep === 2 ? 'bg-sky-600 text-white animate-pulse' : 'bg-slate-300 text-slate-700'}`}>
                    2
                  </span>
                  <span className="text-xs font-bold text-slate-900">Claims</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Extracting facts, statistics, and cited evidence
                </p>
              </div>

              <div className={`p-3 rounded-xl border transition-all ${loadingStep >= 3 ? 'bg-sky-50/80 border-sky-300' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${loadingStep > 3 ? 'bg-teal-600 text-white' : loadingStep === 3 ? 'bg-sky-600 text-white animate-pulse' : 'bg-slate-300 text-slate-700'}`}>
                    3
                  </span>
                  <span className="text-xs font-bold text-slate-900">Comparison</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Mapping consensus, disagreements, and gaps
                </p>
              </div>

              <div className={`p-3 rounded-xl border transition-all ${loadingStep >= 4 ? 'bg-sky-50/80 border-sky-300' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${loadingStep === 4 ? 'bg-sky-600 text-white animate-pulse' : 'bg-slate-300 text-slate-700'}`}>
                    4
                  </span>
                  <span className="text-xs font-bold text-slate-900">Synthesis</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Balanced report & calculating dynamic statistics
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {error.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {error.message}
                </p>

                {error.isRetrievalEmpty && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 mb-4">
                    <strong>Notice:</strong> Per system integrity rules, NewsLens AI will never fabricate news links, claims, or statistics when genuine live reports are unavailable.
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleAnalyzeNews(topic || 'James Webb Space Telescope')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Try Recommended Topic</span>
                  </button>
                  <button
                    onClick={() => setError(null)}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESULTS WORKSPACE */}
        {analysisResult && !isLoading && (
          <div className="space-y-6">
            {/* Header info & Export toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  Analysis Complete
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Topic: "{analysisResult.topic}"
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Analyzed on {new Date(analysisResult.timestamp).toLocaleString()} • {analysisResult.sources.length} Live Grounding Sources Checked
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setIsPipelineModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                  title="View grounding queries and agent execution trace"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Agent Trace</span>
                </button>

                <button
                  onClick={handleExportJSON}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors cursor-pointer"
                  title="Export raw data as JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <KPICards
              statistics={analysisResult.statistics}
              balancedReport={analysisResult.balancedReport}
            />

            {/* Navigation Tabs */}
            <div className="border-b border-slate-200 bg-white rounded-xl px-2 py-1.5 shadow-xs">
              <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`inline-flex items-center gap-2 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'overview'
                      ? 'bg-sky-50 text-sky-700 shadow-2xs border border-sky-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-sky-600" />
                  <span>Overview & Statistics</span>
                </button>

                <button
                  onClick={() => setActiveTab('retrieval')}
                  className={`inline-flex items-center gap-2 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'retrieval'
                      ? 'bg-sky-50 text-sky-700 shadow-2xs border border-sky-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Globe className="w-4 h-4 text-sky-600" />
                  <span>1. Multi-Source Retrieval ({analysisResult.articles.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('claims')}
                  className={`inline-flex items-center gap-2 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'claims'
                      ? 'bg-sky-50 text-sky-700 shadow-2xs border border-sky-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>2. Claim Extraction ({analysisResult.claims.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('comparison')}
                  className={`inline-flex items-center gap-2 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'comparison'
                      ? 'bg-sky-50 text-sky-700 shadow-2xs border border-sky-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <GitCompare className="w-4 h-4 text-indigo-600" />
                  <span>3. Source Comparison</span>
                </button>

                <button
                  onClick={() => setActiveTab('report')}
                  className={`inline-flex items-center gap-2 py-2 px-3.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'report'
                      ? 'bg-sky-50 text-sky-700 shadow-2xs border border-sky-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>4. Balanced Report</span>
                </button>
              </nav>
            </div>

            {/* TAB CONTENT */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <StatisticsDashboard
                  statistics={analysisResult.statistics}
                  sourceComparison={analysisResult.sourceComparison}
                  balancedReport={analysisResult.balancedReport}
                />

                {/* Brief Executive Highlight Card */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Executive Synthesis Headline
                    </h4>
                    <button
                      onClick={() => setActiveTab('report')}
                      className="text-xs font-semibold text-sky-600 hover:underline cursor-pointer"
                    >
                      Read Complete Balanced Report →
                    </button>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    {analysisResult.balancedReport.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {analysisResult.balancedReport.executiveSummary}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'retrieval' && (
              <MultiSourceArticles
                articles={analysisResult.articles}
                sources={analysisResult.sources}
                searchQueries={analysisResult.searchQueries}
              />
            )}

            {activeTab === 'claims' && (
              <ClaimExtractionView
                claims={analysisResult.claims}
              />
            )}

            {activeTab === 'comparison' && (
              <SourceComparisonView
                sourceComparison={analysisResult.sourceComparison}
              />
            )}

            {activeTab === 'report' && (
              <BalancedReportView
                report={analysisResult.balancedReport}
                articles={analysisResult.articles}
                sources={analysisResult.sources}
                topic={analysisResult.topic}
              />
            )}
          </div>
        )}

        {/* INITIAL LANDING STATE (when no query has been run yet) */}
        {!analysisResult && !isLoading && !error && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-xs text-center max-w-4xl mx-auto space-y-8">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-500/20">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Empowering Objective News Literacy
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Modern reporting suffers from fragmentation, sensationalism, and narrative silos. NewsLens AI employs agentic retrieval across verified journalism networks to unpack claims, detect factual discrepancies, and construct balanced neutral briefs.
              </p>
            </div>

            {/* Feature Quadrants */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs mb-3">
                  1
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Multi-Source Retrieval
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pulls real-time reporting via Google Search grounding from Reuters, BBC, AP, and major outlets with direct links.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs mb-3">
                  2
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Claim Extraction
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Segments assertions into Factual, Statistical, Policy, Predictive, or Opinion categories with evidence citations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs mb-3">
                  3
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Source Comparison
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Identifies consensus agreements, contradictory figures, conflicting timelines, and unverified reporting gaps.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mb-3">
                  4
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Balanced Synthesis
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Synthesizes executive summaries, key findings, uncertainty factors, limitations, and a neutrality index.
                </p>
              </div>
            </div>

            {/* Quick Demonstration CTA */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="text-xs text-slate-500 font-medium">Ready for your demonstration?</span>
              <button
                onClick={() => handleAnalyzeNews('James Webb Space Telescope Exoplanets')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Run Demo on "James Webb Space Telescope"</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">NewsLens AI</span>
            <span>•</span>
            <span>Agentic Multi-Source News Analysis & Media Literacy</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDemoGuideOpen(true)}
              className="text-sky-600 hover:underline font-medium cursor-pointer"
            >
              Academic Demo Guide
            </button>
            <span>•</span>
            <span>Powered by Gemini & Google Search Grounding</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AgenticPipelineModal
        isOpen={isPipelineModalOpen}
        onClose={() => setIsPipelineModalOpen(false)}
        result={analysisResult}
      />

      <DemonstrationGuideModal
        isOpen={isDemoGuideOpen}
        onClose={() => setIsDemoGuideOpen(false)}
      />
    </div>
  );
}
