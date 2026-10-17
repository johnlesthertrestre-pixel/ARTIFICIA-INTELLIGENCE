import React, { useState } from 'react';
import { StarterFile, AppForgePlan } from '../types/forge';
import {
  Folder,
  FileCode,
  FileText,
  FileJson,
  Copy,
  Check,
  Download,
  Play,
  Terminal,
  Layers,
  Code2,
  PackageCheck
} from 'lucide-react';
import { downloadProjectZip, downloadTextFile } from '../lib/exportUtils';
import confetti from 'canvas-confetti';

interface StarterCodeTabProps {
  plan: AppForgePlan;
}

export const StarterCodeTab: React.FC<StarterCodeTabProps> = ({ plan }) => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>(
    plan.starterCode.files[0]?.path || 'src/App.tsx'
  );
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'editor' | 'sandbox'>('editor');

  // Interactive Live Sandbox State
  const [sandboxItems, setSandboxItems] = useState([
    { id: '1', title: 'Setup High-Performance Database Indexes', status: 'active', category: 'Infrastructure', author: 'Alex R.' },
    { id: '2', title: 'Implement Rate Limiting & Auth Guardrails', status: 'active', category: 'Security', author: 'Jordan V.' },
    { id: '3', title: 'Design Interactive Client Wireframes', status: 'pending', category: 'Design', author: 'Sarah K.' }
  ]);
  const [sandboxInput, setSandboxInput] = useState('');
  const [sandboxFilter, setSandboxFilter] = useState<'all' | 'active' | 'pending'>('all');

  const selectedFile =
    plan.starterCode.files.find(f => f.path === selectedFilePath) ||
    plan.starterCode.files[0];

  const handleCopy = () => {
    if (!selectedFile) return;
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      await downloadProjectZip(plan);
      confetti({ particleCount: 50, spread: 50 });
    } catch (e) {
      console.error(e);
    }
  };

  const getFileIcon = (path: string) => {
    if (path.endsWith('.json')) return <FileJson className="w-3.5 h-3.5 text-amber-400" />;
    if (path.endsWith('.md')) return <FileText className="w-3.5 h-3.5 text-blue-400" />;
    if (path.endsWith('.ts') || path.endsWith('.tsx')) return <FileCode className="w-3.5 h-3.5 text-cyan-400" />;
    return <FileCode className="w-3.5 h-3.5 text-indigo-400" />;
  };

  const handleAddSandboxItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sandboxInput.trim()) return;
    setSandboxItems(prev => [
      { id: 'item_' + Date.now(), title: sandboxInput.trim(), status: 'active', category: 'General', author: 'Live Sandbox User' },
      ...prev
    ]);
    setSandboxInput('');
  };

  return (
    <div className="space-y-6">
      {/* Starter Code Studio Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Code2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Production Starter Code Package</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {plan.starterCode.files.length} Ready Files
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Export a full runnable repository with dependencies, API abstractions, types, and automated scripts.
          </p>
        </div>

        {/* View Switcher & Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setMode('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                mode === 'editor' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>File Explorer</span>
            </button>
            <button
              onClick={() => setMode('sandbox')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                mode === 'sandbox' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live App Sandbox</span>
            </button>
          </div>

          <button
            onClick={handleDownloadZip}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-600/30 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Starter (.zip)</span>
          </button>
        </div>
      </div>

      {mode === 'editor' ? (
        /* File Explorer & Code Viewer */
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* File Tree Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 bg-slate-900/60 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 space-y-4">
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-indigo-400" /> Project Workspace
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">{plan.appName.toLowerCase()}-starter</p>
            </div>

            <div className="space-y-1">
              {plan.starterCode.files.map(file => {
                const isSelected = selectedFilePath === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFilePath(file.path)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-mono transition text-left cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                        : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {getFileIcon(file.path)}
                      <span className="truncate">{file.path}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Run instructions */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Terminal className="w-3 h-3 text-emerald-400" /> CLI Setup
              </span>
              <p className="text-[11px] text-slate-300 font-mono mt-1.5 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                npm install<br />
                npm run dev
              </p>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col bg-slate-950">
            {/* Code Header Bar */}
            <div className="bg-slate-900/90 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-white">{selectedFile?.path}</span>
                <span className="text-[10px] text-slate-500 uppercase px-1.5 py-0.5 bg-slate-800 rounded">
                  {selectedFile?.language}
                </span>
                <span className="text-slate-400 text-[11px] hidden sm:inline">
                  {selectedFile?.description}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-[11px]"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() =>
                    downloadTextFile(
                      selectedFile?.path.split('/').pop() || 'file.txt',
                      selectedFile?.content || ''
                    )
                  }
                  className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                  title="Download File"
                >
                  <Download className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Code Lines Display */}
            <div className="p-5 font-mono text-xs overflow-x-auto max-h-[580px] leading-relaxed selection:bg-indigo-600 selection:text-white">
              <pre className="text-slate-200">
                <code>
                  {selectedFile?.content.split('\n').map((line, idx) => (
                    <div key={idx} className="table-row">
                      <span className="table-cell select-none pr-4 text-right text-slate-600 font-mono text-[11px]">
                        {idx + 1}
                      </span>
                      <span className="table-cell">{line}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      ) : (
        /* Live App Sandbox View */
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-base font-bold text-white">Live Starter App Sandbox</h3>
                <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  Real React 19 Client Instance
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Interact with the actual state management and data operations generated for {plan.appName}.
              </p>
            </div>

            <button
              onClick={() => {
                setSandboxItems([
                  { id: '1', title: 'Setup High-Performance Database Indexes', status: 'active', category: 'Infrastructure', author: 'Alex R.' },
                  { id: '2', title: 'Implement Rate Limiting & Auth Guardrails', status: 'active', category: 'Security', author: 'Jordan V.' }
                ]);
              }}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg"
            >
              Reset State
            </button>
          </div>

          {/* Sandbox Interactive Form */}
          <form onSubmit={handleAddSandboxItem} className="flex gap-2">
            <input
              type="text"
              placeholder={`Add new record to ${plan.appName}...`}
              value={sandboxInput}
              onChange={e => setSandboxInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow transition"
            >
              + Create Record
            </button>
          </form>

          {/* Sandbox Filter Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing {sandboxItems.length} records</span>
            <div className="flex items-center gap-1.5">
              {(['all', 'active', 'pending'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setSandboxFilter(tab)}
                  className={`px-2.5 py-1 rounded-md capitalize transition ${
                    sandboxFilter === tab
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Sandbox Items Grid */}
          <div className="space-y-2.5">
            {sandboxItems
              .filter(i => sandboxFilter === 'all' || i.status === sandboxFilter)
              .map(item => (
                <div
                  key={item.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3 hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <div>
                      <p className="text-xs font-semibold text-white">{item.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.category} • by {item.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSandboxItems(prev =>
                          prev.map(i =>
                            i.id === item.id
                              ? { ...i, status: i.status === 'active' ? 'pending' : 'active' }
                              : i
                          )
                        );
                      }}
                      className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    >
                      Toggle: {item.status}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
