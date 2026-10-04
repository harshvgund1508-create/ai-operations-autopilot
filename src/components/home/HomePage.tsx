import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  ArrowRight,
  Play,
  Brain,
  Cpu,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Package,
  UserCheck,
  GraduationCap,
  Store,
  Layers,
  AlertTriangle,
  ChevronDown,
  Check,
  Activity,
  ArrowDown,
} from 'lucide-react';
import { SCENARIOS_DATA } from '../../data/autopilotData';
import { ScenarioItem, NavigationTab } from '../../types';

interface HomePageProps {
  promptInput: string;
  onChangePrompt: (val: string) => void;
  onAnalyzeAndAutomate: () => void;
  onSelectScenario: (scenario: ScenarioItem) => void;
  onStartDemo: () => void;
  onNavigateTab?: (tab: NavigationTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  promptInput,
  onChangePrompt,
  onAnalyzeAndAutomate,
  onSelectScenario,
  onStartDemo,
  onNavigateTab,
}) => {
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);

  // Subtle cyclic animation for the interactive pipeline
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePipelineStep((prev) => (prev + 1) % 8);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const quickChips = [
    { label: '📦 Delayed Wedding Order (₹18,500)', scenario: SCENARIOS_DATA[0] },
    { label: '👨‍💼 HR Candidate Screening', scenario: SCENARIOS_DATA[1] },
    { label: '🎓 Missing Student Document', scenario: SCENARIOS_DATA[2] },
    { label: '🏪 Invoice Dispute (₹18,500 Refund)', scenario: SCENARIOS_DATA[3] },
  ];

  const pipelineStages = [
    { name: 'REAL-WORLD EVENT', icon: '📩', sub: 'Customer / Webhook signal' },
    { name: 'AI UNDERSTANDS', icon: '🤖', sub: 'Extracts entities & SLA' },
    { name: 'AI REASONS', icon: '🧠', sub: 'Evaluates risk & rules' },
    { name: 'AI DECIDES', icon: '🎯', sub: 'Dynamic action plan' },
    { name: 'n8n ORCHESTRATES', icon: '⚡', sub: 'Multi-node workflow' },
    { name: 'ACTIONS EXECUTED', icon: '📋', sub: 'DB, Slack, SendGrid' },
    { name: 'MONITOR', icon: '⏳', sub: 'Watchdog & carrier sensor' },
    { name: 'RESOLVE / ESCALATE', icon: '✅', sub: 'Closed-loop verified' },
  ];

  return (
    <div className="space-y-16 py-6 max-w-6xl mx-auto">
      
      {/* 1. Hero Section */}
      <div className="text-center space-y-6 pt-4">
        
        {/* Track Badge & Killer Differentiation Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200/90 text-sky-800 text-xs font-extrabold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-spin" style={{ animationDuration: '4s' }} />
          <span>From Scattered Information to Intelligent Action</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span className="text-sky-600 font-bold">AI Decision + n8n Execution</span>
        </div>

        {/* Exact Hero Headline */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-black text-[#0B192C] tracking-tight leading-[1.15]">
            AI That Doesn't Just Understand Work.<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600">
              It Gets It Done.
            </span>
          </h1>
          <p className="text-base sm:text-xl font-medium text-slate-600 max-w-3xl mx-auto leading-relaxed">
            AI Operations Autopilot understands real-world situations, decides what should happen next, orchestrates actions through n8n, monitors the outcome, and escalates only when human judgment is needed.
          </p>
        </div>

        {/* Primary & Secondary Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            id="hero-btn-start-demo"
            onClick={onStartDemo}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-black text-sm shadow-glow hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>START 3-MINUTE DEMO</span>
          </button>

          <button
            onClick={() => onNavigateTab ? onNavigateTab('architecture') : onAnalyzeAndAutomate()}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-sm border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4 text-slate-600" />
            <span>Explore Architecture</span>
          </button>

          <button
            onClick={onAnalyzeAndAutomate}
            className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-subtle transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-sky-400 fill-sky-400" />
            <span>Run Live Scenario</span>
          </button>
        </div>

        {/* Hero Supporting Metrics (Connected to Live State) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle text-center">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">94%</span>
            <span className="text-[11px] font-bold text-slate-500 block uppercase mt-0.5">AI Confidence</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle text-center">
            <span className="text-2xl sm:text-3xl font-black text-sky-600">7</span>
            <span className="text-[11px] font-bold text-slate-500 block uppercase mt-0.5">Actions Executed</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#0B192C]">18 min</span>
            <span className="text-[11px] font-bold text-slate-500 block uppercase mt-0.5">Time Saved</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle text-center">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">0</span>
            <span className="text-[11px] font-bold text-slate-500 block uppercase mt-0.5">Human Interventions</span>
          </div>
        </div>

        {/* 10-Second Mental Model: The Real Idea */}
        <div className="bg-gradient-to-br from-slate-900 via-[#0B192C] to-slate-950 rounded-3xl p-6 sm:p-8 text-white max-w-4xl mx-auto shadow-2xl border border-slate-800 space-y-6">
          <div className="text-center space-y-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-500/30">
              The Real Idea in 30 Seconds
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              AI is the Brain. n8n is the Hands. The Watchdog is the Eyes.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl mx-auto">
              Traditional automations blindly run fixed scripts. AI Operations Autopilot <strong>understands the situation and decides WHICH actions to run dynamically</strong>.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-sky-400">
                <Brain className="w-5 h-5" />
                <span className="font-extrabold text-xs uppercase tracking-wider text-white">1. AI (The Brain)</span>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Reads the event, extracts entities (₹18.5k, wedding tomorrow, 2 complaints), and <strong>builds a custom action plan</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400">
                <Cpu className="w-5 h-5" />
                <span className="font-extrabold text-xs uppercase tracking-wider text-white">2. n8n (The Hands)</span>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Executes the steps: queries PostgreSQL state DB, alerts Slack #ops-lead, drafts email, and arms watchdog.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-extrabold text-xs uppercase tracking-wider text-white">3. Watchdog (The Eyes)</span>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Monitors delivery resolution over time. If carrier fails, it auto-retries and escalates to a human manager.
              </p>
            </div>
          </div>
        </div>

        {/* Operational Situation Live Input Box */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-premium text-left max-w-3xl mx-auto space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-sky-600" />
                <span>Test With Your Own Operational Situation</span>
              </label>
              <span className="text-[10px] font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 font-bold">
                Live AI Engine Active
              </span>
            </div>
            <textarea
              value={promptInput}
              onChange={(e) => onChangePrompt(e.target.value)}
              rows={3}
              placeholder="My ₹18,500 order hasn't arrived and I need it for a wedding tomorrow. I've already contacted support twice."
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all resize-none leading-relaxed shadow-inner"
            />
          </div>

          {/* Quick Scenario Chips */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 block">
              Or Click Any Situation to See the AI Adapt:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectScenario(chip.scenario)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-xs font-semibold text-slate-700 hover:text-sky-800 transition-all"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Trigger Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onStartDemo}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 order-2 sm:order-1"
            >
              <Play className="w-3.5 h-3.5 text-sky-600 fill-sky-600" />
              <span>Watch 3-Minute Guided Walkthrough</span>
            </button>

            <button
              id="btn-analyze-automate"
              onClick={onAnalyzeAndAutomate}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-black text-sm shadow-glow hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 order-1 sm:order-2"
            >
              <Zap className="w-4 h-4 text-sky-200 fill-sky-200" />
              <span>ANALYZE & ACT</span>
            </button>
          </div>
        </div>

      </div>

      {/* 2. Interactive Premium Execution Pipeline */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Interactive Operational Flow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight">
            The Autonomous Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Real-world Event → Context → AI Understanding → AI Decision → Dynamic Action Plan → n8n Execution → Monitoring → Resolution
          </p>
        </div>

        {/* 8 Pipeline Stages */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {pipelineStages.map((stage, idx) => {
            const isHighlight = idx === activePipelineStep;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-between ${
                  isHighlight
                    ? 'bg-sky-500 text-white border-sky-400 shadow-md ring-2 ring-sky-300 scale-105'
                    : 'bg-white text-slate-700 border-slate-200/80 shadow-subtle hover:border-sky-300'
                }`}
              >
                <span className="text-2xl mb-1.5">{stage.icon}</span>
                <span className={`text-[10px] font-black leading-tight block ${isHighlight ? 'text-white' : 'text-[#0B192C]'}`}>
                  {stage.name}
                </span>
                <span className={`text-[9px] mt-1 font-medium block leading-tight ${isHighlight ? 'text-sky-100' : 'text-slate-400'}`}>
                  {stage.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. "Why This is Different" 3 Comparison Cards */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-premium space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Killer Differentiation
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight">
            Why AI Operations Autopilot is Different
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Traditional automation executes predefined workflows. AI Operations Autopilot decides which workflow should happen based on context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Traditional Automation */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Legacy Approach</span>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  Predefined
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-800">Traditional Automation</h3>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs font-mono text-slate-600 text-center space-y-2">
                <p className="font-bold text-slate-700">Trigger</p>
                <p className="text-slate-400">↓</p>
                <p className="font-bold text-slate-700">Fixed Workflow</p>
                <p className="text-slate-400">↓</p>
                <p className="font-bold text-slate-700">Fixed Action</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Rigid scripts that execute blind if-then triggers without contextual reasoning or adaptive decisions.
            </p>
          </div>

          {/* Card 2: AI Chatbot */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Conversational Only</span>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  Informational
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-800">AI Chatbot</h3>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs font-mono text-slate-600 text-center space-y-2">
                <p className="font-bold text-slate-700">User</p>
                <p className="text-slate-400">↓</p>
                <p className="font-bold text-slate-700">AI Response</p>
                <p className="text-slate-400">↓</p>
                <p className="text-rose-500 font-bold">No Real Action</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Generates conversational answers but cannot query state DBs, dispatch couriers, or verify resolutions.
            </p>
          </div>

          {/* Card 3: AI Operations Autopilot (Highlighted) */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 border-2 border-sky-400 space-y-4 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-sky-200/50 rounded-full blur-xl pointer-events-none" />
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-sky-700 uppercase">National Hackathon Winner</span>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-sky-600 text-white shadow-xs">
                  Autonomous
                </span>
              </div>
              <h3 className="text-base font-black text-[#0B192C]">AI Operations Autopilot</h3>

              <div className="p-3.5 rounded-2xl bg-white/90 border border-sky-200 text-[11px] font-mono text-slate-800 text-center space-y-1 font-bold">
                <p className="text-sky-800">Real-world Event</p>
                <p className="text-slate-300 font-normal">↓</p>
                <p className="text-sky-800">Understand & Reason</p>
                <p className="text-slate-300 font-normal">↓</p>
                <p className="text-sky-800">Decide Dynamic Workflow</p>
                <p className="text-slate-300 font-normal">↓</p>
                <p className="text-sky-800">Execute via n8n</p>
                <p className="text-slate-300 font-normal">↓</p>
                <p className="text-emerald-700">Monitor & Adapt</p>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-bold">
              AI is the decision layer. n8n is the execution layer. Closed-loop resolution with human safety gates.
            </p>
          </div>

        </div>

        {/* Central Slogan Banner */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#1E3A5F] to-[#0B192C] rounded-2xl p-6 text-white text-center shadow-md space-y-2">
          <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
            “AI is the decision layer. n8n is the execution layer.”
          </h3>
          <p className="text-xs sm:text-sm text-sky-200 max-w-xl mx-auto font-medium">
            Don't just automate tasks. Automate decisions and actions around real-world situations.
          </p>
        </div>
      </div>

      {/* 4. Responsible Automation Principles */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-extrabold text-[#0B192C]">Responsible Autonomous AI Principles</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">Human-in-the-Loop</strong>
            <p className="text-slate-600">High financial impact (&gt;₹10,000) or low confidence (&lt;85%) automatically triggers human authorization.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">Deterministic Rules</strong>
            <p className="text-slate-600">Strict safety guardrails enforce policy checks before releasing live API triggers.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">Immutable Audit Trail</strong>
            <p className="text-slate-600">Every decision factor, prompt payload, and n8n webhook trace is logged permanently.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">No Fabricated Actions</strong>
            <p className="text-slate-600">Transparent distinction between live n8n webhook webhooks and deterministic simulation mode.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

