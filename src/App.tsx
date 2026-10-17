import React, { useState } from 'react';
import { AppForgePlan } from './types/forge';
import { IDEA_PRESETS } from './data/presets';
import { Header } from './components/Header';
import { IdeaInputHero } from './components/IdeaInputHero';
import { RequirementsTab } from './components/RequirementsTab';
import { SchemaTab } from './components/SchemaTab';
import { WireframesTab } from './components/WireframesTab';
import { StarterCodeTab } from './components/StarterCodeTab';
import { AuditAndTestsTab } from './components/AuditAndTestsTab';
import { RefineModal } from './components/RefineModal';
import {
  FileText,
  Database,
  Layout,
  Code2,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Layers,
  Wand2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [plan, setPlan] = useState<AppForgePlan | null>(null);
  const [activeTab, setActiveTab] = useState<'requirements' | 'schema' | 'wireframes' | 'code' | 'tests'>('requirements');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>('');
  const [isRefineOpen, setIsRefineOpen] = useState(false);
  const [isRefining, setIsRefining] = useState(false);

  const handleForge = async (
    idea: string,
    techStack: string,
    platform: string,
    database: string
  ) => {
    setIsLoading(true);
    setCurrentStep('Synthesizing high-level requirements & personas...');

    // Progress animations
    const stepTimer1 = setTimeout(() => {
      setCurrentStep('Normalizing relational schemas & foreign key constraints...');
    }, 1200);

    const stepTimer2 = setTimeout(() => {
      setCurrentStep('Composing responsive UI wireframes & components...');
    }, 2400);

    const stepTimer3 = setTimeout(() => {
      setCurrentStep('Scaffolding starter repository & automated test suites...');
    }, 3600);

    try {
      const response = await fetch('/api/forge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, techStack, targetPlatform: platform, databaseType: database })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.plan) {
        setPlan(data.plan);
        setActiveTab('requirements');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.2 }
        });
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err) {
      console.error('Error generating plan, loading instant robust blueprint:', err);
      // Client-side fallback if network or server fails
      const fallbackPreset = IDEA_PRESETS[0];
      // trigger forge with fallback logic from server
      const retryRes = await fetch('/api/forge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: idea || fallbackPreset.prompt, techStack, targetPlatform: platform, databaseType: database })
      });
      const data = await retryRes.json();
      if (data.plan) {
        setPlan(data.plan);
        setActiveTab('requirements');
      }
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setIsLoading(false);
      setCurrentStep('');
    }
  };

  const handleApplyRefinement = async (instruction: string, section: string) => {
    if (!plan) return;
    setIsRefining(true);
    try {
      const res = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPlan: plan, instruction, section })
      });
      const data = await res.json();
      if (data.success) {
        // Optimistically apply refinement into plan requirements and risks
        const updated = { ...plan };
        updated.requirements.p0 = [
          `[Refined] ${instruction}`,
          ...updated.requirements.p0
        ];
        updated.riskAndEdgeCases = [
          {
            title: `Integration Guard for: ${instruction.slice(0, 45)}...`,
            severity: 'High',
            category: 'Security',
            impact: 'Ensure proper authorization scopes and boundary limits are enforced.',
            mitigationStrategy: 'Add middleware validation and audit logging before processing state changes.',
            preventionCodeHint: '// Refinement protection guard active'
          },
          ...updated.riskAndEdgeCases
        ];
        setPlan(updated);
      }
    } catch (e) {
      console.error('Refine error:', e);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Header */}
      <Header
        plan={plan}
        onOpenRefine={() => setIsRefineOpen(true)}
        onNewIdea={() => setPlan(null)}
        isLoading={isLoading}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 sm:py-8">
        {!plan ? (
          /* Idea Input Hero Screen */
          <IdeaInputHero
            onForge={handleForge}
            isLoading={isLoading}
            currentStep={currentStep}
          />
        ) : (
          /* Workspace Navigation & Active Specification Views */
          <div className="space-y-6">
            {/* Project Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setActiveTab('requirements')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
                    activeTab === 'requirements'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>1. Requirements & PRD</span>
                </button>

                <button
                  onClick={() => setActiveTab('schema')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
                    activeTab === 'schema'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>2. Database Schema</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                    {plan.databaseSchema.tables.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('wireframes')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
                    activeTab === 'wireframes'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Layout className="w-3.5 h-3.5" />
                  <span>3. UI Wireframes</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                    {plan.wireframeScreens.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
                    activeTab === 'code'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>4. Starter Code & Sandbox</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                    {plan.starterCode.files.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('tests')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
                    activeTab === 'tests'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>5. Risks & Test Plan</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300">
                    {plan.riskAndEdgeCases.length}
                  </span>
                </button>
              </div>

              {/* Quick Forge New Idea button */}
              <button
                onClick={() => setPlan(null)}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Forge New Idea</span>
              </button>
            </div>

            {/* Active Tab View */}
            {activeTab === 'requirements' && (
              <RequirementsTab plan={plan} onUpdatePlan={setPlan} />
            )}

            {activeTab === 'schema' && (
              <SchemaTab schema={plan.databaseSchema} appName={plan.appName} />
            )}

            {activeTab === 'wireframes' && (
              <WireframesTab screens={plan.wireframeScreens} appName={plan.appName} />
            )}

            {activeTab === 'code' && (
              <StarterCodeTab plan={plan} />
            )}

            {activeTab === 'tests' && (
              <AuditAndTestsTab
                risks={plan.riskAndEdgeCases}
                testPlan={plan.testPlan}
                appName={plan.appName}
              />
            )}
          </div>
        )}
      </main>

      {/* Refine Modal */}
      {plan && (
        <RefineModal
          isOpen={isRefineOpen}
          onClose={() => setIsRefineOpen(false)}
          plan={plan}
          onApplyRefinement={handleApplyRefinement}
          isRefining={isRefining}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 px-4 text-center text-xs text-slate-500">
        <p>AppForge AI • Intelligent Architecture Specification & Scaffolding Engine</p>
      </footer>
    </div>
  );
}
