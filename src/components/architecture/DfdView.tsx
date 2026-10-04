import React, { useState } from 'react';
import {
  Network,
  Download,
  Layers,
  Database,
  User,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Mail,
  Check,
} from 'lucide-react';

export const DfdView: React.FC = () => {
  const [level, setLevel] = useState<'0' | '1'>('1');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-[#0B192C]">Data Flow Diagram (DFD)</h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                Level {level} Representation
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Formal data engineering specification mapping data stores, processes, and entities.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Level Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setLevel('0')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                level === '0' ? 'bg-white text-[#0B192C] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Level 0 (Context)
            </button>
            <button
              onClick={() => setLevel('1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                level === '1' ? 'bg-white text-[#0B192C] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Level 1 (Detailed)
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-[#0B192C] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            {downloadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
            <span>{downloadSuccess ? 'Specification Saved' : 'Download Spec'}</span>
          </button>
        </div>
      </div>

      {/* DFD Canvas View */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-subtle min-h-[550px] flex flex-col items-center justify-center">
        
        {level === '0' ? (
          /* Level 0 Context Diagram */
          <div className="w-full max-w-2xl flex flex-col items-center space-y-6 animate-in fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Level 0 Context Diagram
            </span>

            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* External Entity 1 */}
              <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-300 shadow-sm text-center w-48 shrink-0">
                <User className="w-6 h-6 text-slate-700 mx-auto mb-2" />
                <strong className="text-xs text-[#0B192C] block">External Users & Channels</strong>
                <span className="text-[10px] text-slate-500">Customers, Staff, Forms</span>
              </div>

              {/* Central System Entity */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0B192C] to-[#1E3A5F] text-white shadow-premium text-center w-64 border-2 border-sky-400/40">
                <Cpu className="w-8 h-8 text-sky-400 mx-auto mb-3" />
                <h4 className="text-sm font-black text-white">0.0 AI Operations Autopilot</h4>
                <p className="text-[11px] text-sky-200 mt-1">Autonomous Reasoning & n8n Execution Layer</p>
              </div>

              {/* External Entity 2 */}
              <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-300 shadow-sm text-center w-48 shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <strong className="text-xs text-[#0B192C] block">Business Actions & Systems</strong>
                <span className="text-[10px] text-slate-500">Logistics, CRM, Outreach</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 max-w-lg text-center pt-6 leading-relaxed">
              At Level 0, all external operational requests enter the AI Operations Autopilot, which autonomously resolves and dispatches deterministic business outcomes.
            </div>
          </div>
        ) : (
          /* Level 1 Detailed DFD */
          <div className="w-full max-w-5xl space-y-8 animate-in fade-in">
            
            {/* Top Row: Input Sources + 4 Data Stores */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-center">
                <span className="text-[10px] font-bold text-sky-600 uppercase">Input Entity</span>
                <strong className="text-xs text-sky-950 block mt-0.5">User / Ingest Sources</strong>
              </div>

              {/* Data Store D1 */}
              <div className="p-3.5 rounded-2xl bg-white border-2 border-dashed border-slate-300 text-center">
                <span className="text-[10px] font-mono font-bold text-slate-400">D1: User Data</span>
                <p className="text-xs font-bold text-[#0B192C]">Customer & Order DB</p>
              </div>

              {/* Data Store D2 */}
              <div className="p-3.5 rounded-2xl bg-white border-2 border-dashed border-slate-300 text-center">
                <span className="text-[10px] font-mono font-bold text-slate-400">D2: Task Database</span>
                <p className="text-xs font-bold text-[#0B192C]">State & Kanban Store</p>
              </div>

              {/* Data Store D3 */}
              <div className="p-3.5 rounded-2xl bg-white border-2 border-dashed border-slate-300 text-center">
                <span className="text-[10px] font-mono font-bold text-slate-400">D3: Workflow Logs</span>
                <p className="text-xs font-bold text-[#0B192C]">n8n Execution History</p>
              </div>

              {/* Data Store D4 */}
              <div className="p-3.5 rounded-2xl bg-white border-2 border-dashed border-slate-300 text-center">
                <span className="text-[10px] font-mono font-bold text-slate-400">D4: Knowledge Base</span>
                <p className="text-xs font-bold text-[#0B192C]">Business Policies & SLAs</p>
              </div>
            </div>

            {/* Sequential Processes Flow (1.0 to 6.0) */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Detailed Functional Decomposition
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                {[
                  { id: '1.0', title: 'Data Collection', desc: 'Ingests email, WhatsApp, forms via n8n webhooks' },
                  { id: '2.0', title: 'Context Understanding', desc: 'Parses intent, urgency, sentiment & entities' },
                  { id: '3.0', title: 'AI Decision Engine', desc: 'Evaluates confidence against policy matrix' },
                  { id: '4.0', title: 'Action Execution', desc: 'Dispatches multi-node n8n automations & DB updates' },
                  { id: '5.0', title: 'Continuous Monitoring', desc: 'Tracks carrier/API resolution status' },
                  { id: '6.0', title: 'Follow-up & Escalate', desc: 'Triggers cron reminders or routes to Human Lead' },
                ].map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:border-sky-300 transition-colors"
                  >
                    <span className="text-[10px] font-mono font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">
                      Process {p.id}
                    </span>
                    <h5 className="text-xs font-extrabold text-[#0B192C]">{p.title}</h5>
                    <p className="text-[11px] text-slate-500 leading-snug">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Target Entity: Human Operator */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <div>
                  <strong className="text-xs text-amber-950 block">External Target: Human Operator</strong>
                  <span className="text-[11px] text-amber-800">Receives low confidence exceptions (&lt;60%) & high-value financial approval items.</span>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-white px-2.5 py-1 rounded-lg border border-amber-200">
                HITL Gate
              </span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
