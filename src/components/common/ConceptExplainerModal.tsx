import React, { useState } from 'react';
import {
  Brain,
  Cpu,
  Eye,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  UserCheck,
  Zap,
  HelpCircle,
  XCircle,
  Play,
  Layers,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

interface ConceptExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTryScenario?: (text: string) => void;
}

export const ConceptExplainerModal: React.FC<ConceptExplainerModalProps> = ({
  isOpen,
  onClose,
  onTryScenario,
}) => {
  const [activeInteractiveDemo, setActiveInteractiveDemo] = useState<'routine' | 'crisis' | 'financial'>('crisis');

  if (!isOpen) return null;

  const demoExamples = {
    routine: {
      title: 'Routine Inquiry: ₹400 Book Delivery',
      input: 'Customer is asking when their ₹400 paperback book order placed yesterday will arrive.',
      brainDecision: 'Low Priority | AI Confidence: 96% | Action: Auto-reply with tracking link',
      handsExecution: 'n8n queries DB → sends email with tracking link → closes ticket (0 Humans)',
      watchdogAction: 'No follow-up needed (Routine Task Complete)',
      color: 'emerald',
    },
    crisis: {
      title: 'Operational Crisis: ₹18,500 Wedding Dress (Tomorrow)',
      input: 'Customer Priya Sharma says her ₹18,500 wedding outfit hasn’t arrived. Event is tomorrow and support ignored 2 tickets.',
      brainDecision: 'CRITICAL Priority | AI Confidence: 94% | Action: Escalate logistics + alert duty lead + draft apology',
      handsExecution: 'n8n pulls carrier GPS → pings #ops-escalations on Slack → sends SMS to customer → arms 2h watchdog',
      watchdogAction: 'Watchdog checks carrier at 2h mark → if still delayed, rings manager phone',
      color: 'sky',
    },
    financial: {
      title: 'High-Risk Event: ₹75,000 Refund Request',
      input: 'Customer requests immediate ₹75,000 refund due to defective server shipment.',
      brainDecision: 'HIGH RISK | AI Confidence: 82% | Policy Gate: Financial Exposure > ₹25,000',
      handsExecution: 'n8n PAUSES automated refund → routes approval card to Finance Director (HITL)',
      watchdogAction: 'Awaits human 1-click approval before releasing money via Stripe API',
      color: 'amber',
    },
  };

  const current = demoExamples[activeInteractiveDemo];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl border border-slate-200 my-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-500 text-white flex items-center justify-center shadow-glow">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#0B192C]">
                What is AI Operations Autopilot?
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                The 60-Second Plain-English Mental Model
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* 3 Core Roles: Brain, Hands, Eyes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-sky-950 uppercase tracking-wider">1. The Brain</h4>
                <span className="text-[10px] text-sky-700 font-bold block">AI Decision Layer</span>
              </div>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Reads the problem, extracts names, prices, deadlines, and calculates risk. It <strong>decides WHICH plan to build</strong> on the fly.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider">2. The Hands</h4>
                <span className="text-[10px] text-indigo-700 font-bold block">n8n Execution Layer</span>
              </div>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Takes the dynamic plan and <strong>actually does the work</strong>: queries database, sends Slack alerts, writes emails, and sets timers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider">3. The Eyes</h4>
                <span className="text-[10px] text-emerald-700 font-bold block">Autonomous Watchdog</span>
              </div>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Doesn't just fire-and-forget! It <strong>monitors if the issue is actually resolved</strong>. If it fails, it escalates to a human manager.
            </p>
          </div>

        </div>

        {/* Interactive Live Comparison: See How the Decision Changes */}
        <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-4 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Simulator: Click a Situation to See the AI Adapt</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Real-time dynamic orchestration</span>
          </div>

          {/* 3 Clickable Scenario Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => setActiveInteractiveDemo('routine')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all border ${
                activeInteractiveDemo === 'routine'
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/40'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              📗 1. Routine Inquiry (₹400)
            </button>

            <button
              onClick={() => setActiveInteractiveDemo('crisis')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all border ${
                activeInteractiveDemo === 'crisis'
                  ? 'bg-sky-950 border-sky-400 text-sky-300 ring-2 ring-sky-400/40'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              🚨 2. Wedding Crisis (₹18,500)
            </button>

            <button
              onClick={() => setActiveInteractiveDemo('financial')}
              className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all border ${
                activeInteractiveDemo === 'financial'
                  ? 'bg-amber-950 border-amber-400 text-amber-300 ring-2 ring-amber-400/40'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              ⚠️ 3. High Refund (₹75,000)
            </button>
          </div>

          {/* Dynamic Result Card */}
          <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 space-y-3 font-mono text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Input Situation:</span>
              <p className="text-slate-200 font-sans font-medium text-xs mt-0.5">"{current.input}"</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-sky-400 font-bold block mb-1">🧠 AI Decision:</span>
                <span className="text-slate-300">{current.brainDecision}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-indigo-400 font-bold block mb-1">⚙️ n8n Execution:</span>
                <span className="text-slate-300">{current.handsExecution}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">👁️ Monitoring Watchdog:</span>
                <span className="text-slate-300">{current.watchdogAction}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="text-xs text-slate-500 font-semibold">
            Traditional automation runs the <em>same fixed script</em>. AI Operations Autopilot <em>decides which script to run based on context</em>.
          </p>

          <button
            onClick={() => {
              if (onTryScenario) {
                onTryScenario(current.input);
              }
              onClose();
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white text-xs font-black shadow-glow flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Zap className="w-4 h-4 text-sky-200 fill-sky-200" />
            <span>Test This in Autopilot Room</span>
          </button>
        </div>

      </div>
    </div>
  );
};
