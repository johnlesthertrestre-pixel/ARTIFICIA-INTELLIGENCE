import React, { useState } from 'react';
import { Sparkles, Terminal, Database, Layers, ArrowRight, Wand2, Check, Cpu } from 'lucide-react';
import { IDEA_PRESETS, IdeaPreset } from '../data/presets';

interface IdeaInputHeroProps {
  onForge: (idea: string, techStack: string, platform: string, database: string) => void;
  isLoading: boolean;
  currentStep?: string;
}

export const IdeaInputHero: React.FC<IdeaInputHeroProps> = ({ onForge, isLoading, currentStep }) => {
  const [prompt, setPrompt] = useState('');
  const [techStack, setTechStack] = useState('React 19 + TypeScript + Vite + Tailwind CSS + Node.js');
  const [database, setDatabase] = useState('PostgreSQL');
  const [platform, setPlatform] = useState('Modern Web Application');

  const handleSelectPreset = (preset: IdeaPreset) => {
    setPrompt(preset.prompt);
    setTechStack(preset.techStack);
    setDatabase(preset.database);
    setPlatform(preset.platform);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onForge(prompt.trim(), techStack, platform, database);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto py-6 sm:py-10 px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Headline */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Autonomous System Architect & Starter Forge
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight sm:leading-tight">
          Turn any app idea into a{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
            battle-tested engineering plan
          </span>{' '}
          and starter project.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Converts plain text descriptions into actionable PRD requirements, relational database schemas,
          interactive UI wireframes, complete starter code packages, and automated test plans.
        </p>
      </div>

      {/* Main Form Box */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl transition hover:border-slate-700/80"
      >
        <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Terminal className="w-4 h-4 text-indigo-400" /> Enter App Vision & Requirements
          </span>
          <span className="hidden sm:inline">Natural language to full-stack scaffolding</span>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            disabled={isLoading}
            placeholder="e.g., A multi-tenant customer support desk with real-time ticket triage, team inbox assignments, customer satisfaction CSAT ratings, and webhooks for Discord & Slack notifications..."
            rows={4}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition resize-none disabled:opacity-50"
          />
        </div>

        {/* Stack & Configuration Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 pt-2 border-t border-slate-800/80">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-indigo-400" /> Stack Preference
            </label>
            <select
              value={techStack}
              onChange={e => setTechStack(e.target.value)}
              disabled={isLoading}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="React 19 + TypeScript + Vite + Tailwind CSS + Node.js">
                React 19 + Vite + Tailwind + Node.js
              </option>
              <option value="Next.js 15 (App Router) + TypeScript + Tailwind CSS">
                Next.js 15 (App Router) + Server Actions
              </option>
              <option value="React Native + Expo + TypeScript + Tailwind">
                React Native + Expo (Mobile Cross-Platform)
              </option>
              <option value="Vue 3 + Vite + Pinia + Tailwind + Express">
                Vue 3 + Vite + Express Backend
              </option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-indigo-400" /> Database Engine
            </label>
            <select
              value={database}
              onChange={e => setDatabase(e.target.value)}
              disabled={isLoading}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="PostgreSQL">PostgreSQL (Relational + JSONB)</option>
              <option value="SQLite / Cloudflare D1">SQLite (Embedded / Edge D1)</option>
              <option value="MySQL 8.0">MySQL 8.0 (InnoDB)</option>
              <option value="Firestore">Google Firestore (Document / NoSQL)</option>
              <option value="MongoDB">MongoDB (Document Collection)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Target Platform
            </label>
            <select
              value={platform}
              onChange={e => setPlatform(e.target.value)}
              disabled={isLoading}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Modern Web Application">Modern Web Application</option>
              <option value="B2B Multi-tenant SaaS">B2B Multi-tenant SaaS</option>
              <option value="Mobile-first PWA">Mobile-first PWA</option>
              <option value="Internal Ops Dashboard">Internal Ops Dashboard</option>
            </select>
          </div>
        </div>

        {/* Submit Button & Progress Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="w-full sm:w-auto text-xs text-slate-400">
            {isLoading ? (
              <div className="flex items-center gap-2 text-indigo-400 font-mono animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                <span>{currentStep || 'Synthesizing architecture & code packages...'}</span>
              </div>
            ) : (
              <span>Instant blueprint generation with schemas, wireframes, and runnable code.</span>
            )}
          </div>

          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition hover:shadow-indigo-600/50 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
          >
            {isLoading ? (
              <>
                <Wand2 className="w-4 h-4 animate-spin text-white" />
                <span>Forging Application...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-200 group-hover:scale-110 transition-transform" />
                <span>Forge Full Application Blueprint</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick Inspiration Presets */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Or test with a production idea blueprint:
          </span>
          <span className="text-[11px] text-slate-500">Click to autofill prompt</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {IDEA_PRESETS.slice(0, 3).map(preset => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className="text-left bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-3.5 transition group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-xs text-white group-hover:text-indigo-300 transition">
                  {preset.title}
                </span>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                  {preset.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">{preset.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
