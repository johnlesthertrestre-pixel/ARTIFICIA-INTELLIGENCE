import React, { useState } from 'react';
import { AppForgePlan, UserStory } from '../types/forge';
import {
  CheckCircle2,
  Circle,
  FileCheck,
  Shield,
  Layers,
  Users,
  Target,
  Plus,
  Server,
  Database,
  Key,
  Globe,
  ChevronDown,
  ChevronRight,
  Filter
} from 'lucide-react';

interface RequirementsTabProps {
  plan: AppForgePlan;
  onUpdatePlan: (updated: AppForgePlan) => void;
}

export const RequirementsTab: React.FC<RequirementsTabProps> = ({ plan, onUpdatePlan }) => {
  const [filterTier, setFilterTier] = useState<'all' | 'p0' | 'p1' | 'p2' | 'nfr'>('all');
  const [expandedStory, setExpandedStory] = useState<string | null>(plan.userStories[0]?.id || null);
  const [newReqText, setNewReqText] = useState('');
  const [newReqTier, setNewReqTier] = useState<'p0' | 'p1' | 'p2'>('p0');
  const [completedReqs, setCompletedReqs] = useState<Record<string, boolean>>({});

  const toggleReq = (req: string) => {
    setCompletedReqs(prev => ({
      ...prev,
      [req]: !prev[req]
    }));
  };

  const handleAddRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReqText.trim()) return;

    const updated = { ...plan };
    if (newReqTier === 'p0') {
      updated.requirements.p0 = [newReqText.trim(), ...updated.requirements.p0];
    } else if (newReqTier === 'p1') {
      updated.requirements.p1 = [newReqText.trim(), ...updated.requirements.p1];
    } else {
      updated.requirements.p2 = [newReqText.trim(), ...(updated.requirements.p2 || [])];
    }

    onUpdatePlan(updated);
    setNewReqText('');
  };

  const allReqs = [
    ...plan.requirements.p0.map(r => ({ text: r, tier: 'p0', label: 'P0 - Must Have' })),
    ...plan.requirements.p1.map(r => ({ text: r, tier: 'p1', label: 'P1 - Should Have' })),
    ...(plan.requirements.p2 || []).map(r => ({ text: r, tier: 'p2', label: 'P2 - Nice to Have' })),
    ...plan.requirements.nonFunctional.map(r => ({ text: r, tier: 'nfr', label: 'Non-Functional SLA' }))
  ];

  const filteredReqs = allReqs.filter(r => filterTier === 'all' || r.tier === filterTier);
  const totalCompleted = Object.values(completedReqs).filter(Boolean).length;
  const progressPercent = Math.min(100, Math.round((totalCompleted / (allReqs.length || 1)) * 100));

  return (
    <div className="space-y-6">
      {/* Executive Summary Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h2 className="text-2xl font-bold text-white tracking-tight">{plan.appName}</h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PRD Verified
              </span>
            </div>
            <p className="text-indigo-300 font-medium text-sm">{plan.tagline}</p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-xl">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Requirements Progress</p>
              <p className="text-sm font-bold text-white font-mono">{totalCompleted} / {allReqs.length} Done ({progressPercent}%)</p>
            </div>
            <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Overview & Audience */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-400" /> Executive Overview
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
              {plan.overview}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" /> Target Audience & Personas
            </h3>
            <ul className="space-y-2">
              {plan.targetAudience.map((aud, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span>{aud}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* High Level Architecture Matrix */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" /> Architectural Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-semibold mb-1">
                <Globe className="w-3.5 h-3.5" /> Frontend Client
              </div>
              <p className="text-xs text-slate-300 font-mono">{plan.architecture.client}</p>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-semibold mb-1">
                <Server className="w-3.5 h-3.5" /> Backend / API
              </div>
              <p className="text-xs text-slate-300 font-mono">{plan.architecture.server}</p>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-semibold mb-1">
                <Database className="w-3.5 h-3.5" /> Database Layer
              </div>
              <p className="text-xs text-slate-300 font-mono">{plan.architecture.database}</p>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-semibold mb-1">
                <Key className="w-3.5 h-3.5" /> Authentication
              </div>
              <p className="text-xs text-slate-300 font-mono">{plan.architecture.authMethod}</p>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-semibold mb-1">
                <Shield className="w-3.5 h-3.5" /> Infra / Hosting
              </div>
              <p className="text-xs text-slate-300 font-mono">{plan.architecture.hosting}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Matrix & Interactive Tracker */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-indigo-400" />
              Functional & Non-Functional Requirements
            </h3>
            <p className="text-xs text-slate-400">Click items to mark verified or implemented</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {(['all', 'p0', 'p1', 'p2', 'nfr'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilterTier(f)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium uppercase tracking-wider transition ${
                  filterTier === f
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Requirements Checklist */}
        <div className="grid gap-2.5 mb-6">
          {filteredReqs.map((req, idx) => {
            const isDone = completedReqs[req.text];
            return (
              <div
                key={idx}
                onClick={() => toggleReq(req.text)}
                className={`p-3.5 rounded-xl border transition flex items-start justify-between gap-3 cursor-pointer select-none ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button type="button" className="mt-0.5 text-slate-400 hover:text-emerald-400 transition">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600" />
                    )}
                  </button>
                  <div>
                    <span className={`text-sm ${isDone ? 'line-through opacity-75' : ''}`}>
                      {req.text}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded shrink-0 ${
                    req.tier === 'p0'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : req.tier === 'p1'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : req.tier === 'p2'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}
                >
                  {req.tier.toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>

        {/* Add custom requirement */}
        <form onSubmit={handleAddRequirement} className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-slate-800">
          <input
            type="text"
            placeholder="Add a new custom product requirement..."
            value={newReqText}
            onChange={e => setNewReqText(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <select
            value={newReqTier}
            onChange={e => setNewReqTier(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="p0">P0 - Must Have</option>
            <option value="p1">P1 - Should Have</option>
            <option value="p2">P2 - Nice to Have</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
          >
            <Plus className="w-3.5 h-3.5" /> Add Requirement
          </button>
        </form>
      </div>

      {/* User Stories & Acceptance Criteria */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            User Stories with Acceptance Criteria (Gherkin Style)
          </h3>
          <p className="text-xs text-slate-400">Concrete behavioral specs mapped to user persona workflows</p>
        </div>

        <div className="space-y-3">
          {plan.userStories.map(story => {
            const isExpanded = expandedStory === story.id;
            return (
              <div
                key={story.id}
                className="bg-slate-950/70 border border-slate-800/80 rounded-xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setExpandedStory(isExpanded ? null : story.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-900/50 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      {story.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Persona: {story.persona}
                    </span>
                    <p className="text-sm font-medium text-slate-100 hidden sm:block">
                      I want to <span className="text-indigo-300">{story.want}</span>
                    </p>
                  </div>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-800/60 bg-slate-950/40 space-y-4">
                    <div className="text-xs text-slate-300 space-y-1.5 pt-2">
                      <p><span className="text-indigo-400 font-semibold font-mono">AS A</span> {story.persona},</p>
                      <p><span className="text-indigo-400 font-semibold font-mono">I WANT TO</span> {story.want},</p>
                      <p><span className="text-indigo-400 font-semibold font-mono">SO THAT</span> {story.soThat}.</p>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Acceptance Criteria:
                      </h4>
                      <ul className="space-y-1.5">
                        {story.acceptanceCriteria.map((ac, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800/60 font-mono">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{ac}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
