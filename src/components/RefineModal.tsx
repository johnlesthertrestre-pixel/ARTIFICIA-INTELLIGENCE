import React, { useState } from 'react';
import { Sparkles, X, Wand2, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { AppForgePlan } from '../types/forge';

interface RefineModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: AppForgePlan;
  onApplyRefinement: (instruction: string, section: string) => Promise<void>;
  isRefining: boolean;
}

const QUICK_PROMPTS = [
  'Add Stripe subscription webhook handling with customer portal',
  'Add multi-tenant organization boundary and team member invitations',
  'Implement real-time WebSocket event streaming and presence indicator',
  'Add Redis caching layer and API rate-limiting with token bucket',
  'Add end-to-end encryption for sensitive customer payloads',
  'Add mobile-first offline optimistic mutations with background sync'
];

export const RefineModal: React.FC<RefineModalProps> = ({
  isOpen,
  onClose,
  plan,
  onApplyRefinement,
  isRefining
}) => {
  const [instruction, setInstruction] = useState('');
  const [section, setSection] = useState('general');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim() || isRefining) return;
    setStatusMessage('Refining architecture with Gemini AI...');
    try {
      await onApplyRefinement(instruction.trim(), section);
      setStatusMessage('Refinement successfully incorporated!');
      setTimeout(() => {
        setStatusMessage(null);
        onClose();
      }, 1500);
    } catch (err: any) {
      setStatusMessage('Refinement error: ' + (err?.message || 'Failed'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Refine Architecture with AI</h3>
              <p className="text-xs text-slate-400">Iterate on {plan.appName} specifications and schemas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isRefining}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Target Section
            </label>
            <select
              value={section}
              onChange={e => setSection(e.target.value)}
              disabled={isRefining}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="general">Entire Architecture & PRD Blueprint</option>
              <option value="database">Database Schema & Relational Integrity</option>
              <option value="wireframes">UI Wireframes & Screen Workflows</option>
              <option value="code">Starter Code Scaffolding</option>
              <option value="security">Security, Risks & Test Suite</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Refinement Instruction
            </label>
            <textarea
              value={instruction}
              onChange={e => setInstruction(e.target.value)}
              placeholder="e.g., Add Stripe customer portal billing routes, include subscription plan table in the DB schema, and generate tests for webhook verification."
              rows={3}
              disabled={isRefining}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>

          {/* Quick suggestions */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-2">
              Or pick an enhancement:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((qp, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInstruction(qp)}
                  disabled={isRefining}
                  className="text-[11px] text-left px-2.5 py-1 rounded-md bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-indigo-500/50 transition cursor-pointer"
                >
                  {qp}
                </button>
              ))}
            </div>
          </div>

          {statusMessage && (
            <div className="p-3 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-xs text-indigo-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>{statusMessage}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isRefining}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!instruction.trim() || isRefining}
              className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition disabled:opacity-50 cursor-pointer"
            >
              {isRefining ? (
                <>
                  <Wand2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Apply Refinement</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
