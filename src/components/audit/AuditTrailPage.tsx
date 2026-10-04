import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Download,
  Eye,
  X,
  Code,
  Sparkles,
} from 'lucide-react';
import { INITIAL_AUDIT_RECORDS } from '../../data/autopilotData';
import { AuditRecord } from '../../types';

export const AuditTrailPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<AuditRecord | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredRecords = INITIAL_AUDIT_RECORDS.filter((rec) => {
    const matchesSearch =
      rec.input.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.aiClassification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.workflow.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'ai_decisions' && rec.confidence >= 85) ||
      (selectedStatus === 'n8n_runs' && Boolean(rec.workflow)) ||
      (selectedStatus === 'human_approvals' && (rec.humanApproval === 'Pending Review' || rec.humanApproval === 'Approved by Human')) ||
      (selectedStatus === 'failures' && rec.finalStatus === 'Escalated') ||
      (selectedStatus === 'escalations' && rec.finalStatus === 'Escalated') ||
      (selectedStatus === 'resolved' && (rec.finalStatus === 'Resolved' || rec.finalStatus === 'Completed'));

    return matchesSearch && matchesStatus;
  });

  const handleCopyJson = (rec: AuditRecord) => {
    navigator.clipboard.writeText(JSON.stringify(rec, null, 2));
    setCopiedId(rec.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 py-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Immutable Audit Trail & Governance
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight mt-1.5">
            Operational Audit Trail
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Full Traceability & Compliance Mode</span>
        </div>
      </div>

      {/* Filters & Search Row */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-subtle flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, event, workflow..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
          />
        </div>

        {/* 6 Exact Prompt Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {[
            { id: 'all', label: 'All' },
            { id: 'ai_decisions', label: 'AI Decisions' },
            { id: 'n8n_runs', label: 'n8n Runs' },
            { id: 'human_approvals', label: 'Human Approvals' },
            { id: 'failures', label: 'Failures' },
            { id: 'escalations', label: 'Escalations' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedStatus === tab.id
                  ? 'bg-[#0B192C] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Trail Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-4 font-bold">Audit ID / Time</th>
                <th className="p-4 font-bold">Input Context</th>
                <th className="p-4 font-bold">AI Classification</th>
                <th className="p-4 font-bold">Decision & Action Plan</th>
                <th className="p-4 font-bold">n8n Workflow</th>
                <th className="p-4 font-bold">Human Gate</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Telemetry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-sky-50/40 transition-colors">
                  <td className="p-4 whitespace-nowrap">
                    <span className="font-mono font-bold text-slate-900 block text-xs">{rec.id}</span>
                    <span className="font-mono text-[10px] text-slate-400">{rec.timestamp}</span>
                  </td>

                  <td className="p-4 max-w-xs">
                    <p className="text-slate-800 font-semibold line-clamp-2 leading-relaxed">
                      “{rec.input}”
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">{rec.category}</span>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <strong className="text-slate-900 block text-xs">{rec.aiClassification}</strong>
                    <span className={`text-[10px] font-bold uppercase ${
                      rec.priority === 'Critical' ? 'text-rose-600' :
                      rec.priority === 'High' ? 'text-amber-600' : 'text-sky-600'
                    }`}>
                      {rec.priority} Priority • {rec.confidence}%
                    </span>
                  </td>

                  <td className="p-4 max-w-xs">
                    <p className="text-xs font-bold text-slate-800">{rec.decision}</p>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{rec.actionSummary}</span>
                  </td>

                  <td className="p-4 whitespace-nowrap font-mono text-[11px] text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                      {rec.workflow}
                    </span>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      rec.humanApproval === 'Approved by Human' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                      rec.humanApproval === 'Pending Review' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {rec.humanApproval}
                    </span>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      rec.finalStatus === 'Resolved' || rec.finalStatus === 'Completed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : rec.finalStatus === 'Awaiting Approval'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}>
                      {rec.finalStatus}
                    </span>
                  </td>

                  <td className="p-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelectedRecord(rec)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-700 text-xs font-bold transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raw JSON Telemetry Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-sky-400" />
                <h3 className="font-extrabold text-sm">
                  Audit Telemetry Payload — {selectedRecord.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Natural Language Event</span>
                <p className="font-semibold text-slate-900">“{selectedRecord.input}”</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Structured Decision & Node Trace</span>
                  <button
                    onClick={() => handleCopyJson(selectedRecord)}
                    className="text-sky-600 hover:text-sky-700 text-[11px]"
                  >
                    {copiedId === selectedRecord.id ? '✓ Copied' : 'Copy JSON'}
                  </button>
                </div>
                <div className="bg-[#0B192C] text-sky-300 font-mono text-xs p-4 rounded-2xl overflow-x-auto max-h-72 border border-slate-800">
                  <pre>{JSON.stringify(selectedRecord, null, 2)}</pre>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
