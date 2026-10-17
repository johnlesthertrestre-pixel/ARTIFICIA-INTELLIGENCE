import React, { useState } from 'react';
import { WireframeScreen, MockUiElement } from '../types/forge';
import {
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  Layout,
  Layers,
  Search,
  Plus,
  Bell,
  Settings,
  User,
  CheckCircle,
  Clock,
  Sparkles,
  Compass
} from 'lucide-react';

interface WireframesTabProps {
  screens: WireframeScreen[];
  appName: string;
}

export const WireframesTab: React.FC<WireframesTabProps> = ({ screens, appName }) => {
  const [selectedScreenId, setSelectedScreenId] = useState<string>(screens[0]?.id || '');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [renderMode, setRenderMode] = useState<'interactive' | 'blueprint'>('interactive');
  
  // Interactive prototype state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [demoItems, setDemoItems] = useState([
    { id: 1, title: 'Authenticate OAuth JWT Bearer Pipeline', status: 'Active', category: 'Security', author: 'Alex R.' },
    { id: 2, title: 'Optimistic Write Queue with Local Sync', status: 'In Review', category: 'Frontend', author: 'Jordan V.' },
    { id: 3, title: 'Composite Foreign Key Schema Migration', status: 'Completed', category: 'Database', author: 'Sarah K.' }
  ]);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [newDemoTitle, setNewDemoTitle] = useState('');

  const activeScreen = screens.find(s => s.id === selectedScreenId) || screens[0];

  const handleAddDemoItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDemoTitle.trim()) return;
    setDemoItems(prev => [
      { id: Date.now(), title: newDemoTitle.trim(), status: 'Active', category: 'General', author: 'You' },
      ...prev
    ]);
    setNewDemoTitle('');
    setShowDemoModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header & Viewport Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layout className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Interactive UI Wireframe Studio</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {screens.length} Screens Architected
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Preview simulated layouts across desktop, tablet, and mobile with low-fi blueprint and high-fi interactive modes.
          </p>
        </div>

        {/* Viewport & Mode Controllers */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Mode toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setRenderMode('interactive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                renderMode === 'interactive' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Interactive Prototype</span>
            </button>
            <button
              onClick={() => setRenderMode('blueprint')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                renderMode === 'blueprint' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Blueprint Wireframe</span>
            </button>
          </div>

          {/* Viewport switch */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-lg text-xs transition ${
                viewport === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop (100% width)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-1.5 rounded-lg text-xs transition ${
                viewport === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-lg text-xs transition ${
                viewport === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile (375px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Screen Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {screens.map(screen => (
          <button
            key={screen.id}
            onClick={() => setSelectedScreenId(screen.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium shrink-0 transition flex items-center gap-2 ${
              selectedScreenId === screen.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>{screen.title}</span>
          </button>
        ))}
      </div>

      {/* Screen Anatomy Specification Card */}
      {activeScreen && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-bold text-white text-sm">{activeScreen.title}:</span>{' '}
            <span className="text-slate-300">{activeScreen.description}</span>
            <div className="mt-1 text-slate-400 font-mono text-[11px]">
              Layout: {activeScreen.layout}
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-500 font-semibold mr-1">Components:</span>
            {activeScreen.keyComponents.map((comp, idx) => (
              <span
                key={idx}
                className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-mono text-slate-300 text-[10px]"
              >
                {comp}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Viewport Frame Container */}
      <div className="flex justify-center bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 sm:p-8 overflow-hidden min-h-[560px]">
        <div
          className={`transition-all duration-300 w-full ${
            viewport === 'mobile'
              ? 'max-w-[390px] border-4 border-slate-700 rounded-[36px] p-3 shadow-2xl bg-slate-950'
              : viewport === 'tablet'
              ? 'max-w-[768px] border-2 border-slate-700 rounded-2xl p-4 shadow-2xl bg-slate-950'
              : 'max-w-5xl rounded-2xl border border-slate-800 shadow-2xl bg-slate-950'
          }`}
        >
          {/* Mock Window Top Bar */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-slate-500">
                https://{appName.toLowerCase().replace(/[^a-z0-9]/g, '')}.app/{selectedScreenId.replace('screen-', '')}
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-500 uppercase">
              {viewport} view ({renderMode} mode)
            </span>
          </div>

          {/* Render Mode: Interactive Prototype */}
          {renderMode === 'interactive' ? (
            <div className="space-y-4">
              {/* App Navbar */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-xs">
                    ⚡
                  </div>
                  <span>{appName}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowDemoModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create</span>
                  </button>
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Screen Content Depending on activeScreen */}
              {activeScreen?.id.includes('settings') ? (
                /* Settings Prototype */
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-white">Workspace Team & Roles</h3>
                    <p className="text-xs text-slate-400">Manage organization seat allocation and RBAC policies</p>
                  </div>

                  <div className="space-y-2">
                    {[
                      { name: 'Alex Rivera', email: 'alex@example.com', role: 'Owner / Super Admin' },
                      { name: 'Jordan Vance', email: 'jordan@example.com', role: 'Staff Engineer' },
                      { name: 'Morgan Lee', email: 'morgan@example.com', role: 'Security Auditor' }
                    ].map((member, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                        <div>
                          <p className="font-semibold text-white">{member.name}</p>
                          <p className="text-slate-400 font-mono text-[11px]">{member.email}</p>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                          {member.role}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-end">
                    <button className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded-lg font-medium transition">
                      + Invite Member
                    </button>
                  </div>
                </div>
              ) : (
                /* Dashboard / Explorer Prototype */
                <div className="space-y-4">
                  {/* KPI Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
                      <p className="text-xs text-slate-400 font-medium">Active Pipeline Items</p>
                      <p className="text-2xl font-bold text-white font-mono mt-1">{demoItems.length + 12}</p>
                      <span className="text-[10px] text-emerald-400 font-medium">↑ +14% vs last cycle</span>
                    </div>
                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
                      <p className="text-xs text-slate-400 font-medium">Execution SLA</p>
                      <p className="text-2xl font-bold text-white font-mono mt-1">99.98%</p>
                      <span className="text-[10px] text-indigo-400 font-medium">Verified Healthy</span>
                    </div>
                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
                      <p className="text-xs text-slate-400 font-medium">Active Collaborators</p>
                      <p className="text-2xl font-bold text-white font-mono mt-1">8 Seats</p>
                      <span className="text-[10px] text-slate-400 font-medium">Pro Plan Tier</span>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
                    <div className="relative w-full sm:w-72">
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      {['all', 'active', 'in review'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition ${
                            activeTab === tab
                              ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40'
                              : 'bg-slate-900 text-slate-400 hover:text-white'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Record Items */}
                  <div className="space-y-2">
                    {demoItems
                      .filter(i => searchQuery === '' || i.title.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(item => (
                        <div
                          key={item.id}
                          className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-3 flex items-center justify-between gap-3 transition"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <div>
                              <p className="text-xs font-semibold text-white">{item.title}</p>
                              <p className="text-[11px] text-slate-400">{item.category} • by {item.author}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {item.status}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Blueprint Wireframe (Low-fi CAD / Spec Mode) */
            <div className="p-4 bg-slate-950 font-mono text-xs border border-dashed border-indigo-500/40 rounded-xl space-y-4">
              <div className="text-[11px] text-indigo-400 flex items-center justify-between border-b border-dashed border-indigo-500/30 pb-2">
                <span>[WIRE-SPEC] {activeScreen.title.toUpperCase()}</span>
                <span>GRID: 12-COL FLUID</span>
              </div>

              {/* Wireframe blocks representation */}
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 p-3 border border-dashed border-slate-700 rounded bg-slate-900/30 flex items-center justify-between text-slate-400">
                  <span>[NAVBAR COMPONENT: Brand, Search, UserProfile, Actions]</span>
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">h: 56px</span>
                </div>

                <div className="col-span-12 sm:col-span-4 p-4 border border-dashed border-slate-700 rounded bg-slate-900/30 text-slate-400 space-y-2">
                  <p className="text-indigo-300 font-bold">[KPI CARD 1: PRIMARY METRIC]</p>
                  <div className="h-6 bg-slate-800/60 rounded" />
                  <div className="h-3 w-2/3 bg-slate-800/40 rounded" />
                </div>

                <div className="col-span-12 sm:col-span-4 p-4 border border-dashed border-slate-700 rounded bg-slate-900/30 text-slate-400 space-y-2">
                  <p className="text-indigo-300 font-bold">[KPI CARD 2: SLA]</p>
                  <div className="h-6 bg-slate-800/60 rounded" />
                  <div className="h-3 w-2/3 bg-slate-800/40 rounded" />
                </div>

                <div className="col-span-12 sm:col-span-4 p-4 border border-dashed border-slate-700 rounded bg-slate-900/30 text-slate-400 space-y-2">
                  <p className="text-indigo-300 font-bold">[KPI CARD 3: STATUS]</p>
                  <div className="h-6 bg-slate-800/60 rounded" />
                  <div className="h-3 w-2/3 bg-slate-800/40 rounded" />
                </div>

                <div className="col-span-12 p-5 border border-dashed border-slate-700 rounded bg-slate-900/30 text-slate-400 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-300 font-bold">[MAIN DATA TABLE / LIST VIEW]</span>
                    <span className="text-[10px] text-slate-500">Virtualizer: enabled</span>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map(row => (
                      <div key={row} className="h-8 border border-slate-800 rounded bg-slate-950 flex items-center justify-between px-3 text-[10px] text-slate-500">
                        <span>[ROW-{row} DATA SLUG]</span>
                        <span>[ACTIONS: EDIT | ARCHIVE]</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Demo Modal for Interactive Prototype */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleAddDemoItem} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Create Record</h3>
            <p className="text-xs text-slate-400 mb-4">Simulate adding an entity in the wireframe prototype</p>
            <input
              type="text"
              placeholder="e.g., Integrate payment webhook handler"
              value={newDemoTitle}
              onChange={e => setNewDemoTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
