import React, { useState } from 'react';
import { BalancedReport, NewsArticle, GroundingSource } from '../types/news.js';
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  Printer, 
  ShieldCheck, 
  Download,
  Scale
} from 'lucide-react';

interface BalancedReportViewProps {
  report: BalancedReport;
  articles: NewsArticle[];
  sources: GroundingSource[];
  topic: string;
}

export const BalancedReportView: React.FC<BalancedReportViewProps> = ({
  report,
  articles,
  sources,
  topic,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyReport = () => {
    const textContent = `# ${report.headline}
Topic: ${topic}
Neutrality Index: ${report.neutralityScore}%

## Executive Summary
${report.executiveSummary}

## Key Findings
${report.keyFindings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

## Uncertainties & Developing Factors
${report.uncertainties.map((u, i) => `- ${u}`).join('\n')}

## Reporting Limitations
${report.limitations.map((l, i) => `- ${l}`).join('\n')}

## Neutrality & Balance Assessment
${report.neutralityAssessment}

## Conclusion
${report.conclusion}

## References & Sources
${articles.map((a, i) => `[${i + 1}] ${a.title} - ${a.publisher} (${a.url})`).join('\n')}
`;

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Report Header Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              Agentic Balanced Synthesis
            </span>
            <span className="text-xs text-slate-400 font-medium">• Multi-Source Intelligence</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
            {report.headline}
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={handleCopyReport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
            title="Copy formatted markdown report"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Report</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors cursor-pointer"
            title="Print or Save PDF"
          >
            <Printer className="w-3.5 h-3.5 text-sky-600" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Neutrality & Balance Metric Card */}
      <div className="bg-gradient-to-r from-sky-50/80 via-white to-teal-50/80 rounded-xl border border-sky-100 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Multi-Perspective Neutrality & Balance Index
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
                {report.neutralityAssessment}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-teal-200/60 shadow-2xs self-start sm:self-auto">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Balance Score
              </span>
              <span className="text-2xl font-black text-teal-700 font-sans">
                {report.neutralityScore}%
              </span>
            </div>
            <div className="w-12 h-12 relative flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-teal-600"
                  strokeDasharray={`${report.neutralityScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 1. EXECUTIVE SUMMARY */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2 pb-2 border-b border-slate-100">
          <FileText className="w-4 h-4 text-sky-600" />
          Executive Summary
        </h4>
        <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
          {report.executiveSummary.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-slate-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* 2. KEY FINDINGS */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2 pb-2 border-b border-slate-100">
          <CheckCircle2 className="w-4 h-4 text-teal-600" />
          Key Corroborated Findings
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {report.keyFindings.map((finding, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-sky-50/40 hover:border-sky-200 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                {finding}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. UNCERTAINTIES & LIMITATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Uncertainty */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <h4 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-3 flex items-center gap-2 pb-2 border-b border-amber-100">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            Uncertainties & Developing Factors
          </h4>
          <ul className="space-y-2.5">
            {report.uncertainties.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Limitations */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2 pb-2 border-b border-slate-100">
            <AlertCircle className="w-4 h-4 text-slate-500" />
            Reporting Limitations & Constraints
          </h4>
          <ul className="space-y-2.5">
            {report.limitations.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. CONCLUSION */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2 pb-2 border-b border-slate-100">
          <ShieldCheck className="w-4 h-4 text-sky-600" />
          Synthesis Conclusion
        </h4>
        <p className="text-slate-800 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          {report.conclusion}
        </p>
      </div>

      {/* 5. REFERENCES & CITATIONS */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-teal-600" />
            Cited Multi-Publisher References & Live Links
          </h4>
          <span className="text-xs text-slate-500 font-medium">
            {articles.length} Direct Sources
          </span>
        </div>

        <div className="space-y-3">
          {articles.map((art, idx) => (
            <div
              key={art.id || idx}
              className="flex items-start justify-between gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100/70 transition-colors text-xs"
            >
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-slate-400 font-semibold mt-0.5">
                  [{idx + 1}]
                </span>
                <div>
                  <a
                    href={art.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-slate-900 hover:text-sky-700 hover:underline inline-flex items-center gap-1 leading-snug cursor-pointer"
                  >
                    <span>{art.title}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <div className="flex items-center gap-2 text-slate-500 mt-1">
                    <span className="font-semibold text-slate-700">{art.publisher}</span>
                    {art.date && <span>• {art.date}</span>}
                    {art.stance && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-200/70 text-slate-700 font-medium">
                        {art.stance}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {art.url && art.url !== '#' && (
                <a
                  href={art.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-2.5 py-1 rounded bg-white text-sky-700 border border-slate-200 hover:border-sky-300 font-semibold text-[11px] transition-colors cursor-pointer"
                >
                  Visit Source
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
