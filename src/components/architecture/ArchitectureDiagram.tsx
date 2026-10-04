import React from 'react';
import {
  Layers,
  Cpu,
  Brain,
  Database,
  Mail,
  FileSpreadsheet,
  Webhook,
  CheckSquare,
  MessageSquare,
  Clock,
  CheckCircle2,
  ShieldAlert,
  ArrowDown,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-[#0B192C]">System Architecture</h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                Layered Topology
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              End-to-end operational architecture showing ingestion, n8n orchestration, AI reasoning, execution branches, and monitoring loops.
            </p>
          </div>
        </div>
      </div>

      {/* Layered Visual Flow */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-subtle flex flex-col items-center space-y-6">
        
        {/* Layer 1: Data Sources */}
        <div className="w-full max-w-4xl p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              Layer 1: Fragmented Ingest Sources
            </span>
            <span className="text-[10px] font-mono text-slate-400">Multi-Channel Ingest</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-sky-600 shrink-0" />
              <div>
                <strong className="text-xs text-[#0B192C] block">Gmail / IMAP</strong>
                <span className="text-[10px] text-slate-500">Unstructured emails</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-2.5">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <strong className="text-xs text-[#0B192C] block">Google Forms & Sheets</strong>
                <span className="text-[10px] text-slate-500">Event registrations</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-green-600 shrink-0" />
              <div>
                <strong className="text-xs text-[#0B192C] block">WhatsApp / Chat</strong>
                <span className="text-[10px] text-slate-500">Direct customer queries</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-2.5">
              <Webhook className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <strong className="text-xs text-[#0B192C] block">REST Webhooks</strong>
                <span className="text-[10px] text-slate-500">B2B & accounting APIs</span>
              </div>
            </div>
          </div>
        </div>

        <FlowArrow text="Webhook & Polling Ingest" />

        {/* Layer 2: n8n Automation Engine */}
        <div className="w-full max-w-4xl p-5 rounded-3xl bg-gradient-to-r from-[#0B192C] to-[#1E3A5F] text-white shadow-premium flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 text-sky-300">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400">
                Layer 2: Execution Backbone
              </span>
              <h3 className="text-base font-extrabold text-white">n8n Workflow Automation Engine</h3>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-sky-200 font-mono">
            <span>Webhook Router</span>
            <span>•</span>
            <span>Payload Normalizer</span>
            <span>•</span>
            <span>Execution Tracer</span>
          </div>
        </div>

        <FlowArrow text="Normalized JSON Payload" />

        {/* Layer 3: AI Context & Decision Engine */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-sky-50/80 border border-sky-200 space-y-2">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-sky-700" />
              <h4 className="text-xs font-extrabold text-sky-950 uppercase tracking-wider">
                AI Context Engine
              </h4>
            </div>
            <p className="text-xs text-sky-900 leading-relaxed">
              Extracts intent, urgency timeline, entities (Order IDs, amounts, assignees), and customer sentiment score in &lt; 200ms.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-indigo-50/80 border border-indigo-200 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-700" />
              <h4 className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider">
                Autonomous Decision Engine
              </h4>
            </div>
            <p className="text-xs text-indigo-900 leading-relaxed">
              Evaluates confidence matrix against policy thresholds: Auto-Execute (&ge;85%), Request Info (60-85%), or Human Escalate (&lt;60%).
            </p>
          </div>
        </div>

        <FlowArrow text="Deterministic Decision Directives" />

        {/* Layer 4: Execution Branches */}
        <div className="w-full max-w-4xl p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Layer 4: Multi-Branch Business Action Execution
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-sky-600 font-bold text-xs">
                <CheckSquare className="w-4 h-4" />
                <span>Task & CRM Dispatch</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Creates Jira tasks, Notion volunteer cards, updates Zendesk tickets.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                <Database className="w-4 h-4" />
                <span>State & Database Sync</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                PostgreSQL order DB updates, Google Sheets real-time row appends.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                <Mail className="w-4 h-4" />
                <span>Customer & Team Alerts</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                SendGrid customer emails, Slack #dispatch alerts, WhatsApp tokens.
              </p>
            </div>
          </div>
        </div>

        <FlowArrow text="Action Verification & Telemetry" />

        {/* Layer 5: Monitoring, Follow-up & HITL */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
              <Clock className="w-4 h-4" />
              <span>Monitoring Watchdog</span>
            </div>
            <p className="text-[11px] text-amber-900 leading-snug">
              Tracks real-world sensor/API status to verify courier departure & document uploads.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Follow-Up Engine (Cron)</span>
            </div>
            <p className="text-[11px] text-emerald-900 leading-snug">
              Armed checkpoint pings at 2h / 24h intervals to ensure complete resolution.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-1">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
              <ShieldAlert className="w-4 h-4" />
              <span>Human Escalation (HITL)</span>
            </div>
            <p className="text-[11px] text-rose-900 leading-snug">
              Supervisor 1-click approvals for low confidence (&lt;60%) or high-value (&gt;₹10k) edge cases.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

function FlowArrow({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="w-0.5 h-4 bg-sky-300" />
      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 my-0.5">
        {text}
      </span>
      <div className="w-0.5 h-4 bg-sky-300" />
      <ChevronDown className="w-4 h-4 text-sky-500 -mt-1" />
    </div>
  );
}
