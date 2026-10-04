import React, { useState } from 'react';
import {
  Layers,
  Network,
  Cpu,
  Brain,
  Database,
  Mail,
  Bell,
  CheckCircle2,
  ChevronDown,
  Download,
  Check,
  User,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  Eye,
  Zap,
} from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'dfd-0' | 'dfd-1' | 'rules'>('architecture');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<{ title: string; desc: string } | null>({
    title: '🧠 AI Brain (The Decision Layer)',
    desc: 'Understands context, evaluates risk levels, calculates confidence scores, and dynamically synthesizes the multi-step action plan.',
  });

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 py-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            System Design & Core Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight mt-1.5">
            Architecture, DFD & Decision Rules
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
            “The Brain decides. The Hands execute. The Eyes verify.”
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'architecture' ? 'bg-white text-[#0B192C] shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              System Architecture
            </button>
            <button
              onClick={() => setActiveTab('dfd-0')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'dfd-0' ? 'bg-white text-[#0B192C] shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              DFD Level 0
            </button>
            <button
              onClick={() => setActiveTab('dfd-1')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'dfd-1' ? 'bg-white text-[#0B192C] shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              DFD Level 1
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'rules' ? 'bg-white text-[#0B192C] shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Decision Rules (Policy)
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-[#0B192C] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
          >
            {downloadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
            <span>{downloadSuccess ? 'Spec Saved' : 'Download Spec'}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas View */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-subtle min-h-[500px]">
        
        {/* Tab 1: System Architecture (Unified 3 Pillars: Brain -> Hands -> Eyes) */}
        {activeTab === 'architecture' && (
          <div className="flex flex-col items-center space-y-3 max-w-3xl mx-auto animate-in fade-in">
            
            {/* User Event */}
            <div
              onClick={() => setSelectedNodeInfo({ title: 'User / Operational Event Ingest', desc: 'Ingests signals from customer emails, WhatsApp, webhooks, and tickets into normalized JSON payloads.' })}
              className="px-6 py-2.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200 text-xs font-bold text-slate-800 cursor-pointer transition-colors shadow-xs"
            >
              REAL-WORLD OPERATIONAL EVENT (WEBHOOK / INGEST)
            </div>

            <ArchArrow />

            {/* Frontend / API Gateway */}
            <div
              onClick={() => setSelectedNodeInfo({ title: 'Frontend / API Gateway', desc: 'Secure React / Vite application layer and backend API routing.' })}
              className="px-6 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-extrabold text-slate-700 cursor-pointer transition-colors shadow-xs"
            >
              FRONTEND & API GATEWAY
            </div>

            <ArchArrow />

            {/* 1. THE BRAIN: AI Decision Layer */}
            <div className="w-full max-w-lg p-3.5 rounded-2xl bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-sky-500/10 border-2 border-sky-300 text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Brain className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-black tracking-wider text-sky-900 uppercase">
                  1. 🧠 THE BRAIN (AI Decision Layer)
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div
                  onClick={() => setSelectedNodeInfo({ title: 'Context Retrieval', desc: 'Queries customer lifetime value, order state, and previous complaint tickets.' })}
                  className="p-2.5 rounded-xl bg-white border border-sky-200 text-center cursor-pointer hover:bg-sky-50"
                >
                  <Database className="w-3.5 h-3.5 text-sky-600 mx-auto mb-0.5" />
                  <span className="text-[10px] font-bold text-[#0B192C] block">Context Retrieval</span>
                </div>
                <div
                  onClick={() => setSelectedNodeInfo({ title: 'Reasoning Engine', desc: 'Evaluates priority, deadline constraints, and policy edge cases.' })}
                  className="p-2.5 rounded-xl bg-white border border-sky-200 text-center cursor-pointer hover:bg-sky-50"
                >
                  <Brain className="w-3.5 h-3.5 text-sky-600 mx-auto mb-0.5" />
                  <span className="text-[10px] font-bold text-[#0B192C] block">Reasoning Engine</span>
                </div>
                <div
                  onClick={() => setSelectedNodeInfo({ title: 'Risk Engine', desc: 'Enforces financial threshold caps (₹25,000) and confidence gates (85%).' })}
                  className="p-2.5 rounded-xl bg-white border border-sky-200 text-center cursor-pointer hover:bg-sky-50"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600 mx-auto mb-0.5" />
                  <span className="text-[10px] font-bold text-[#0B192C] block">Risk Engine</span>
                </div>
              </div>
            </div>

            <ArchArrow />

            {/* Action Planner */}
            <div
              onClick={() => setSelectedNodeInfo({ title: 'Dynamic Action Planner', desc: 'Dynamically synthesizes a tailored 6 to 10 step deterministic execution plan based on the situation.' })}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-xs font-black cursor-pointer shadow-md flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>DYNAMIC ACTION PLANNER (CUSTOM PLAN)</span>
            </div>

            <ArchArrow />

            {/* 2. THE HANDS: n8n Execution Layer */}
            <div className="w-full max-w-lg p-3.5 rounded-2xl bg-slate-900 border-2 border-slate-700 text-center text-white space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-black tracking-wider text-sky-400 uppercase">
                  2. ⚡ THE HANDS (n8n Execution Layer)
                </span>
              </div>
              
              <div
                onClick={() => setSelectedNodeInfo({ title: 'n8n Orchestration Webhook', desc: 'Dispatches multi-node automated workflows, executing API calls to external services and state stores.' })}
                className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-sky-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-sky-400 fill-sky-400" />
                <span>n8n ORCHESTRATOR (/webhook/ai-ops)</span>
              </div>
            </div>

            {/* Branch to 3 systems */}
            <div className="w-full max-w-lg py-1 flex flex-col items-center">
              <div className="w-0.5 h-3 bg-sky-300" />
              <div className="w-4/5 h-0.5 bg-sky-300" />
              <div className="w-4/5 flex justify-between">
                <div className="w-0.5 h-3 bg-sky-300" />
                <div className="w-0.5 h-3 bg-sky-300" />
                <div className="w-0.5 h-3 bg-sky-300" />
              </div>
            </div>

            <div className="w-full max-w-lg grid grid-cols-3 gap-3">
              <div
                onClick={() => setSelectedNodeInfo({ title: 'PostgreSQL State Database', desc: 'Updates order status, stores execution traces, and appends audit records.' })}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-center cursor-pointer text-xs"
              >
                <Database className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <strong className="block text-[#0B192C]">PostgreSQL (State)</strong>
              </div>

              <div
                onClick={() => setSelectedNodeInfo({ title: 'SendGrid Email & SMS API', desc: 'Dispatches personalized stakeholder reassurance and live tracking updates.' })}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-center cursor-pointer text-xs"
              >
                <Mail className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                <strong className="block text-[#0B192C]">SendGrid / SMS</strong>
              </div>

              <div
                onClick={() => setSelectedNodeInfo({ title: 'Slack Notifications (#ops-lead)', desc: 'Posts interactive alert cards in #ops-lead channel for fast duty response.' })}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-center cursor-pointer text-xs"
              >
                <Bell className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <strong className="block text-[#0B192C]">Slack (#ops-lead)</strong>
              </div>
            </div>

            {/* Rejoin */}
            <div className="w-full max-w-lg py-1 flex flex-col items-center">
              <div className="w-4/5 flex justify-between">
                <div className="w-0.5 h-3 bg-sky-300" />
                <div className="w-0.5 h-3 bg-sky-300" />
                <div className="w-0.5 h-3 bg-sky-300" />
              </div>
              <div className="w-4/5 h-0.5 bg-sky-300" />
              <div className="w-0.5 h-3 bg-sky-300" />
            </div>

            {/* 3. THE EYES: Autonomous Watchdog */}
            <div
              onClick={() => setSelectedNodeInfo({ title: '3. 👁️ The Watchdog (Autonomous Verification)', desc: 'Validates actual resolution over time instead of firing-and-forgetting. If unresolved, triggers retry and human manager escalation.' })}
              className="w-full max-w-lg p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 text-center cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-center gap-2">
                <Eye className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-black tracking-wider text-emerald-950 uppercase">
                  3. 👁️ THE WATCHDOG (Continuous Verification)
                </span>
              </div>
              <span className="text-[11px] text-emerald-800 font-semibold block mt-0.5">
                Autonomous Closed-Loop Resolution Polling
              </span>
            </div>

            <ArchArrow />

            {/* Resolved vs Retry vs Escalate */}
            <div className="w-full max-w-lg grid grid-cols-3 gap-3">
              <div
                onClick={() => setSelectedNodeInfo({ title: 'Resolve', desc: 'Outcome confirmed resolved with zero human roadblock.' })}
                className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-center cursor-pointer"
              >
                <Check className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <strong className="text-[11px] text-emerald-950 block">RESOLVE</strong>
              </div>

              <div
                onClick={() => setSelectedNodeInfo({ title: 'Retry Engine', desc: 'Automated 3x exponential backoff on transient network failures.' })}
                className="p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-300 text-center cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                <strong className="text-[11px] text-sky-950 block">RETRY</strong>
              </div>

              <div
                onClick={() => setSelectedNodeInfo({ title: 'Human Escalation (HITL)', desc: 'Exceptions (<85% confidence or >₹25k) safely route to manager review queue.' })}
                className="p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-300 text-center cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-rose-600 mx-auto mb-1" />
                <strong className="text-[11px] text-rose-950 block">ESCALATE (HITL)</strong>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: DFD Level 0 */}
        {activeTab === 'dfd-0' && (
          <div className="flex flex-col items-center justify-center space-y-8 py-10 max-w-2xl mx-auto animate-in fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Context Diagram (DFD Level 0)
            </span>

            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-300 text-center w-44">
                <User className="w-6 h-6 text-slate-700 mx-auto mb-2" />
                <strong className="text-xs text-[#0B192C] block">User / Ingest</strong>
                <span className="text-[10px] text-slate-500">Emails, Forms, Webhooks</span>
              </div>

              <div className="p-7 rounded-3xl bg-[#0B192C] text-white text-center w-64 border-2 border-sky-400 shadow-premium">
                <Cpu className="w-8 h-8 text-sky-400 mx-auto mb-2" />
                <h4 className="text-sm font-black text-white">0.0 AI Operations Autopilot</h4>
                <p className="text-[10px] text-sky-200 mt-1">Brain (AI) + Hands (n8n) + Eyes (Watchdog)</p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-300 text-center w-44">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <strong className="text-xs text-[#0B192C] block">External Services</strong>
                <span className="text-[10px] text-slate-500">Logistics, DB, Slack</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: DFD Level 1 */}
        {activeTab === 'dfd-1' && (
          <div className="space-y-6 max-w-4xl mx-auto py-4 animate-in fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block text-center">
              Level 1 Detailed Data Flow Decomposition
            </span>

            {/* 4 Data Stores */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-white border-2 border-dashed border-slate-300 text-center">
                <span className="text-[10px] font-mono font-bold text-slate-400">D1</span>
                <p className="text-xs font-bold text-[#0B192C]">PostgreSQL State DB</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border-2 border-dashed border-slate-300 text-center">
                <span className="text-[10px] font-mono font-bold text-slate-400">D2</span>
                <p className="text-xs font-bold text-[#0B192C]">Task State Database</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border-2 border-dashed border-slate-300 text-center">
                <span className="text-[10px] font-mono font-bold text-slate-400">D3</span>
                <p className="text-xs font-bold text-[#0B192C]">n8n Workflow Telemetry</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border-2 border-dashed border-slate-300 text-center">
                <span className="text-[10px] font-mono font-bold text-slate-400">D4</span>
                <p className="text-xs font-bold text-[#0B192C]">Policy Rules & SLA Gates</p>
              </div>
            </div>

            {/* 6 Sequential Functional Processes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                { id: '1.0', title: 'Input Processing', desc: 'Ingests email, WhatsApp, and form webhooks into normalized schemas.' },
                { id: '2.0', title: 'Context Retrieval', desc: 'Queries D1 PostgreSQL DB to attach lifetime value & complaint history.' },
                { id: '3.0', title: 'AI Analysis (The Brain)', desc: 'Extracts intent, urgency multiplier, and scores confidence against D4 rules.' },
                { id: '4.0', title: 'Action Planner', desc: 'Generates structured dynamic action plan in D2 Task DB.' },
                { id: '5.0', title: 'n8n Execution (The Hands)', desc: 'Dispatches multi-node API actions to Slack, SendGrid, and DB.' },
                { id: '6.0', title: 'Watchdog (The Eyes)', desc: 'Verifies real-world resolution or escalates exception to Human Lead.' },
              ].map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                    Process {p.id}
                  </span>
                  <h4 className="text-xs font-extrabold text-[#0B192C]">{p.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-snug">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Decision Rules */}
        {activeTab === 'rules' && (
          <div className="space-y-6 max-w-3xl mx-auto py-4 animate-in fade-in">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                Deterministic Policy Specification
              </span>
              <h3 className="text-xl font-black text-[#0B192C]">
                Operational Decision Engine Rules
              </h3>
              <p className="text-xs text-slate-500">
                Rule logic that governs autonomous action dispatch vs human-in-the-loop authorization.
              </p>
            </div>

            <div className="bg-[#0B192C] text-sky-300 font-mono text-xs sm:text-sm p-6 rounded-3xl border border-slate-800 shadow-premium space-y-3 leading-relaxed">
              <p className="text-emerald-400 font-bold">// Autonomous Execution Policy</p>
              <p><span className="text-sky-400 font-bold">IF</span> confidence &gt;= 0.85</p>
              <p className="pl-6 text-white font-semibold">→ autonomous execution (0 human interventions)</p>
              <br />
              <p className="text-amber-400 font-bold">// Human-in-the-Loop Safety Gate</p>
              <p><span className="text-sky-400 font-bold">IF</span> confidence &lt; 0.85</p>
              <p className="pl-6 text-amber-200 font-semibold">→ human approval required</p>
              <br />
              <p><span className="text-sky-400 font-bold">IF</span> financial_risk == "high" (amount &gt; ₹25,000)</p>
              <p className="pl-6 text-amber-200 font-semibold">→ human manager authorization</p>
              <br />
              <p><span className="text-sky-400 font-bold">IF</span> operational_risk == "high"</p>
              <p className="pl-6 text-sky-200 font-semibold">→ manager Slack notification (#ops-lead)</p>
              <br />
              <p className="text-rose-400 font-bold">// Failure Recovery & Watchdog Escalation</p>
              <p><span className="text-sky-400 font-bold">IF</span> action fails</p>
              <p className="pl-6 text-sky-200 font-semibold">→ automated retry (max 3 attempts with exponential backoff)</p>
              <br />
              <p><span className="text-sky-400 font-bold">IF</span> unresolved after retry</p>
              <p className="pl-6 text-rose-300 font-semibold">→ on-call manager incident escalation</p>
              <br />
              <p className="text-emerald-400 font-bold">// Mission Completion</p>
              <p><span className="text-sky-400 font-bold">IF</span> resolved</p>
              <p className="pl-6 text-white font-semibold">→ append audit record and close task</p>
            </div>
          </div>
        )}

      </div>

      {/* Interactive Node Info Drawer */}
      {selectedNodeInfo && (
        <div className="p-5 rounded-3xl bg-slate-900 text-white flex items-start justify-between gap-4 shadow-subtle border border-slate-800 animate-in slide-in-from-bottom-2">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
              Selected Architecture Component
            </span>
            <h4 className="text-sm font-black text-white">{selectedNodeInfo.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">{selectedNodeInfo.desc}</p>
          </div>
          <button
            onClick={() => setSelectedNodeInfo(null)}
            className="text-xs text-slate-400 hover:text-white font-bold p-1"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
};

const ArchArrow = () => (
  <div className="w-0.5 h-4 bg-sky-300 relative">
    <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-r-2 border-b-2 border-sky-400 transform rotate-45" />
  </div>
);
