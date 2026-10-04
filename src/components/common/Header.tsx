import React from 'react';
import { Play, Sparkles, Zap, Cpu, Radio, ShieldCheck } from 'lucide-react';
import { NavigationTab } from '../../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onStartDemo: () => void;
  isLiveMode: boolean;
  onToggleLiveMode: (live: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onStartDemo,
  isLiveMode,
  onToggleLiveMode,
}) => {
  const navTabs: Array<{ id: NavigationTab; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'autopilot', label: 'Autopilot' },
    { id: 'scenarios', label: 'Scenarios' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'audit', label: 'Audit' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Logo & Brand */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0B192C] via-[#0284C7] to-[#06B6D4] p-0.5 shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0B192C] rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-sky-400 fill-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base tracking-tight text-[#0B192C]">
                AI Operations Autopilot
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-200">
                n8n
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden md:block">
              From scattered information to intelligent action
            </p>
          </div>
        </div>

        {/* 6 Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1">
          {navTabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => onNavigate(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200/80 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Live Mode Switch & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Concept Explainer Quick Trigger */}
          <button
            onClick={() => onStartDemo ? onStartDemo() : null}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200 transition-all"
            title="Understand the 30-second core concept"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>How It Works</span>
          </button>

          {/* Demo vs Live Indicator */}
          <button
            onClick={() => onToggleLiveMode(!isLiveMode)}
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
              isLiveMode
                ? 'bg-sky-50 text-sky-800 border-sky-300'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
            title="Toggle Live Webhook vs High-Fidelity Simulation"
          >
            <span className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-sky-500 animate-ping' : 'bg-emerald-500'}`} />
            <span>{isLiveMode ? 'Live Webhook' : 'Demo Mode'}</span>
          </button>

          {/* Primary Action: START 3-MINUTE DEMO */}
          <button
            id="btn-start-demo"
            onClick={onStartDemo}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-glow hover:shadow-lg transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>START 3-MIN DEMO</span>
          </button>
        </div>

      </div>
    </header>
  );
};
