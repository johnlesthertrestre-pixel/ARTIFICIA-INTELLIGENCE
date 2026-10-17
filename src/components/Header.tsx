import React from 'react';
import { Hammer, Download, FileText, Sparkles, Code2, RefreshCw, Layers } from 'lucide-react';
import { AppForgePlan } from '../types/forge';
import { downloadProjectZip, generateMarkdownPrd, downloadTextFile } from '../lib/exportUtils';
import confetti from 'canvas-confetti';

interface HeaderProps {
  plan: AppForgePlan | null;
  onOpenRefine: () => void;
  onNewIdea: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ plan, onOpenRefine, onNewIdea, isLoading }) => {
  const handleDownloadZip = async () => {
    if (!plan) return;
    try {
      await downloadProjectZip(plan);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.15 }
      });
    } catch (e) {
      console.error('Failed to zip:', e);
    }
  };

  const handleExportPrd = () => {
    if (!plan) return;
    const md = generateMarkdownPrd(plan);
    downloadTextFile(`${plan.appName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-PRD.md`, md, 'text/markdown');
  };

  const handleExportJson = () => {
    if (!plan) return;
    downloadTextFile(
      `${plan.appName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-blueprint.json`,
      JSON.stringify(plan, null, 2),
      'application/json'
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNewIdea}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              <Hammer className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  AppForge
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  AI Lead Architect
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Idea → PRD • Database Schema • Wireframes • Starter Code • Test Suite
              </p>
            </div>
          </button>

          {plan && (
            <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-slate-800">
              <span className="text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                {plan.appName}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {plan ? (
            <>
              <button
                onClick={onOpenRefine}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition shadow-sm"
                title="Refine architecture with AI"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Refine Plan</span>
              </button>

              <button
                onClick={handleExportPrd}
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-750 border-slate-800 hover:border-slate-700 transition shadow-sm"
                title="Export Product Requirements Document (PRD.md)"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Export PRD</span>
              </button>

              <button
                onClick={handleDownloadZip}
                disabled={isLoading}
                className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-600/30 transition hover:shadow-indigo-600/50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Starter (.zip)</span>
              </button>

              <button
                onClick={onNewIdea}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Start New Idea"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Engine Ready</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
