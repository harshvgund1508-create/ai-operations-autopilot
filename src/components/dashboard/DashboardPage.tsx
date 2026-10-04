import React from 'react';
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  UserCheck,
  ArrowRight,
  TrendingUp,
  Activity,
  ShieldCheck,
  Layers,
  BarChart3,
  PieChart as PieIcon,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { DASHBOARD_STATS, SCENARIOS_DATA } from '../../data/autopilotData';
import { ScenarioItem } from '../../types';

interface DashboardPageProps {
  onOpenScenarioTimeline: (scenario: ScenarioItem) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onOpenScenarioTimeline }) => {
  const recentRecords = [
    {
      request: 'Delayed high-value order ORD-82941 (₹18,500 Wedding, Priya Sharma)',
      category: 'Customer Operations',
      priority: 'Critical',
      status: 'Resolved',
      statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      timeSaved: '18 min',
      confidence: 94,
      scenario: SCENARIOS_DATA[0],
    },
    {
      request: 'Candidate screening: Sarah Jenkins (Senior Fullstack, Req #ENG-402)',
      category: 'HR Operations',
      priority: 'Medium',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      timeSaved: '25 min',
      confidence: 92,
      scenario: SCENARIOS_DATA[1],
    },
    {
      request: 'Invoice dispute #INV-1092: Apex Corp (₹18,500 refund review)',
      category: 'Business Operations',
      priority: 'High',
      status: 'Awaiting Approval',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
      timeSaved: '15 min',
      confidence: 71,
      scenario: SCENARIOS_DATA[3],
    },
    {
      request: 'Student ID upload compliance (HackInnovate 42 missing IDs)',
      category: 'College Administration',
      priority: 'High',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      timeSaved: '45 min',
      confidence: 96,
      scenario: SCENARIOS_DATA[2],
    },
  ];

  // Recharts Chart Data
  const outcomeData = [
    { name: 'Autonomous Resolved', value: 21, color: '#10B981' },
    { name: 'Human Approved', value: 2, color: '#F59E0B' },
    { name: 'Escalated / Exception', value: 1, color: '#EF4444' },
  ];

  const confidenceData = [
    { domain: 'Customer Ops', confidence: 94, benchmark: 85 },
    { domain: 'HR Ops', confidence: 92, benchmark: 85 },
    { domain: 'College Admin', confidence: 96, benchmark: 85 },
    { domain: 'Business Ops', confidence: 71, benchmark: 85 },
  ];

  const actionsByCategoryData = [
    { name: 'Customer Ops', actions: 7 },
    { name: 'HR Ops', actions: 5 },
    { name: 'College Ops', actions: 4 },
    { name: 'Business Ops', actions: 4 },
  ];

  const successVsEscalationData = [
    { day: 'Mon', success: 18, escalated: 1 },
    { day: 'Tue', success: 22, escalated: 0 },
    { day: 'Wed', success: 19, escalated: 2 },
    { day: 'Thu', success: 25, escalated: 1 },
    { day: 'Today', success: 21, escalated: 1 },
  ];

  return (
    <div className="space-y-8 py-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Operations Telemetry
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight mt-1.5">
            Operational Dashboard
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>n8n Active • AI Decision Engine Online</span>
        </div>
      </div>

      {/* 6 Lightweight KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-subtle space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Active Automations
          </span>
          <span className="text-2xl font-black text-[#0B192C]">4</span>
          <span className="text-[10px] text-sky-600 font-bold block">Live Monitoring</span>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-subtle space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
            Completed Today
          </span>
          <span className="text-2xl font-black text-emerald-600">{DASHBOARD_STATS.successfullyCompleted}</span>
          <span className="text-[10px] text-slate-400 block">87.5% Zero-Touch</span>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-subtle space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
            Needs Attention
          </span>
          <span className="text-2xl font-black text-amber-600">2</span>
          <span className="text-[10px] text-amber-800 font-semibold block">HITL Review</span>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-subtle space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block">
            Avg AI Confidence
          </span>
          <span className="text-2xl font-black text-slate-900">88.2%</span>
          <span className="text-[10px] text-emerald-600 font-bold block">&gt; 85% Auto Gate</span>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-subtle space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
            Human Approvals
          </span>
          <span className="text-2xl font-black text-purple-600">{DASHBOARD_STATS.awaitingApproval}</span>
          <span className="text-[10px] text-slate-400 block">High Financial Limit</span>
        </div>

        <div className="bg-gradient-to-br from-sky-500 to-cyan-600 text-white rounded-3xl p-4 shadow-glow space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-100 block">
            Time Saved
          </span>
          <span className="text-2xl font-black text-white">{DASHBOARD_STATS.timeSavedFormatted}</span>
          <span className="text-[10px] text-sky-100 block">Shift Equivalent</span>
        </div>

      </div>

      {/* Lightweight Recharts Grid (Supporting the story) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Chart 1: Outcomes (Pie) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B192C]">
              Automation Outcomes
            </span>
            <PieIcon className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={outcomeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {outcomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-around text-[10px] font-bold text-slate-600">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> 87.5% Auto</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> 8.3% HITL</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> 4.2% Esc</span>
          </div>
        </div>

        {/* Chart 2: AI Confidence by Domain (Bar) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B192C]">
              AI Confidence Score
            </span>
            <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={confidenceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="domain" tick={{ fontSize: 9 }} interval={0} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Tooltip />
                <Bar dataKey="confidence" fill="#0284C7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-400 text-center font-medium">
            Autonomous threshold: ≥ 85% score
          </p>
        </div>

        {/* Chart 3: Success vs Escalation (Bar) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B192C]">
              Success vs Escalation
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={successVsEscalationData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />
                <Bar dataKey="success" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="escalated" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-400 text-center font-medium">
            96% weekly resolution stability
          </p>
        </div>

        {/* Chart 4: Actions Executed by Category (Bar) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B192C]">
              Actions By Category
            </span>
            <Layers className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={actionsByCategoryData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />
                <Bar dataKey="actions" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-400 text-center font-medium">
            Dynamic 4-10 node orchestration plans
          </p>
        </div>

      </div>

      {/* Recent Automations Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle overflow-hidden space-y-0">
        
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-[#0B192C]">Recent Operations</h3>
            <p className="text-xs text-slate-500">Click any operational event to load its AI decision room and live n8n execution timeline</p>
          </div>
          <span className="text-xs font-bold text-slate-400">4 Active Domain Pipelines</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-4 font-bold">Request / Operational Event</th>
                <th className="p-4 font-bold">Domain</th>
                <th className="p-4 font-bold">Priority</th>
                <th className="p-4 font-bold">AI Confidence</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {recentRecords.map((item, idx) => (
                <tr
                  key={idx}
                  onClick={() => onOpenScenarioTimeline(item.scenario)}
                  className="hover:bg-sky-50/50 transition-colors cursor-pointer group"
                >
                  <td className="p-4">
                    <strong className="text-slate-900 group-hover:text-sky-700 transition-colors block text-xs sm:text-sm">
                      {item.request}
                    </strong>
                    <span className="text-[11px] text-slate-400">Saved {item.timeSaved} of human operational triage</span>
                  </td>

                  <td className="p-4 text-slate-600 whitespace-nowrap">
                    {item.category}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.priority === 'Critical' ? 'bg-rose-100 text-rose-800' :
                      item.priority === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800'
                    }`}>
                      {item.priority}
                    </span>
                  </td>

                  <td className="p-4 whitespace-nowrap font-bold text-emerald-600">
                    {item.confidence}% AI
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4 text-right whitespace-nowrap">
                    <button
                      className="px-3 py-1.5 rounded-xl bg-slate-100 group-hover:bg-sky-600 text-slate-600 group-hover:text-white text-xs font-bold transition-all flex items-center gap-1 ml-auto"
                    >
                      <span>Decision Room</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

