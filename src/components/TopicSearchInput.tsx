import React, { useState } from 'react';
import { Search, Sparkles, Loader2, ArrowRight, TrendingUp } from 'lucide-react';

interface TopicSearchInputProps {
  onAnalyze: (topic: string) => void;
  isLoading: boolean;
  currentTopic: string;
}

const PRESET_TOPICS = [
  { label: 'James Webb Space Telescope Exoplanets', category: 'Science' },
  { label: 'Global AI Chip Export Controls & Regulations', category: 'Tech' },
  { label: 'Renewable Energy Grid Storage Breakthroughs', category: 'Energy' },
  { label: 'Commercial Spaceflight Moon Landing Missions', category: 'Aerospace' },
  { label: 'Electric Vehicle Solid-State Battery Tech', category: 'Automotive' },
  { label: 'European Union Artificial Intelligence Act', category: 'Policy' },
];

export const TopicSearchInput: React.FC<TopicSearchInputProps> = ({
  onAnalyze,
  isLoading,
  currentTopic,
}) => {
  const [topicInput, setTopicInput] = useState(currentTopic);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topicInput.trim().length >= 3 && !isLoading) {
      onAnalyze(topicInput.trim());
    }
  };

  const handleSelectPreset = (preset: string) => {
    setTopicInput(preset);
    if (!isLoading) {
      onAnalyze(preset);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
      <div className="max-w-3xl mx-auto text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          Autonomous Multi-Publisher Investigative Agent
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Investigate Any News Topic in Real Time
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Enter any breaking or ongoing news event. NewsLens AI retrieves live reports from Reuters, AP, BBC, and major news outlets to extract claims, map disagreements, and generate a balanced synthesis.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5 p-1.5 rounded-xl bg-slate-50 border border-slate-300 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-200 transition-all">
          <div className="flex-1 flex items-center pl-3 pr-2">
            <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2.5" />
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="e.g. Artemis moon mission, renewable energy tariffs, semiconductor chip policies..."
              disabled={isLoading}
              className="w-full bg-transparent border-none text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-0 disabled:opacity-50 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || topicInput.trim().length < 3}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 active:from-sky-700 active:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-sky-600/20 transition-all cursor-pointer text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Investigating...</span>
              </>
            ) : (
              <>
                <span>Analyze News</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Preset Topics */}
      <div className="max-w-3xl mx-auto mt-5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
          <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
          <span>Recommended Demonstration Topics:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_TOPICS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(item.label)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-300 transition-colors cursor-pointer disabled:opacity-50"
            >
              <span className="text-slate-400">#{item.category}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
