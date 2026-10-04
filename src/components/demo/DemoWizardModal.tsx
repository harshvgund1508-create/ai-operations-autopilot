import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Cpu,
  Mail,
  Database,
  Check,
  ArrowRight,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DemoWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAutopilotWithPreset?: () => void;
}

interface StepInfo {
  number: number;
  title: string;
  badge: string;
  timeEstimate: string;
  summary: string;
  details: string;
  telemetry: Record<string, any>;
}

const DEMO_11_STEPS: StepInfo[] = [
  {
    number: 1,
    title: 'Receive Customer Issue',
    badge: 'Ingest Trigger',
    timeEstimate: '10:42:01',
    summary: 'Natural language customer complaint received via Email / Webhook.',
    details: '“My ₹18,500 order hasn\'t arrived and I need it for a wedding tomorrow. I\'ve already contacted support twice.”',
    telemetry: {
      channel: 'Email / Webhook',
      rawText: "My ₹18,500 order hasn't arrived and I need it for a wedding tomorrow. I've already contacted support twice.",
      timestamp: '10:42:01.204Z',
    },
  },
  {
    number: 2,
    title: 'Analyze Context & Urgency',
    badge: 'AI Context Engine',
    timeEstimate: '10:42:02',
    summary: 'AI extracts semantic entities, temporal urgency, and emotional frustration.',
    details: 'Extracted: Intent (Delivery Escalation), Order Amount (₹18,500), Occasion (Wedding), Strict Deadline (Tomorrow), Prior Inquiries (2 times).',
    telemetry: {
      intent: 'delivery_escalation',
      entities: { orderValue: 18500, deadline: 'Tomorrow', event: 'Wedding', priorComplaints: 2 },
      sentimentScore: -0.74,
      urgencyScore: 'CRITICAL_URGENT',
    },
  },
  {
    number: 3,
    title: 'Retrieve Customer Record',
    badge: 'PostgreSQL DB',
    timeEstimate: '10:42:03',
    summary: 'Customer profile matched in PostgreSQL CRM.',
    details: 'Customer identified as Priya Sharma (Customer ID: CUST-1048). Risk: High. Loyalty Tier: VIP.',
    telemetry: {
      customerId: 'CUST-1048',
      name: 'Priya Sharma',
      tier: 'VIP',
      risk: 'High',
      lifetimeValue: '₹142,000',
      accountHealth: 'EXCELLENT',
    },
  },
  {
    number: 4,
    title: 'Retrieve Order ORD-82941',
    badge: 'Order Database',
    timeEstimate: '10:42:04',
    summary: 'Order details and live carrier location queried.',
    details: 'Order ORD-82941 (Silk Wedding Set, ₹18,500, Expected: Tomorrow). Current status: "Delayed at North Logistics Hub - Transit Bottleneck".',
    telemetry: {
      orderId: 'ORD-82941',
      value: 18500,
      status: 'Delayed',
      expected: 'Tomorrow',
      carrier: 'BlueDart Express',
      currentLocation: 'North Logistics Hub (Bay 4)',
      transitStatus: 'DELAYED_HUB_HOLD',
    },
  },
  {
    number: 5,
    title: 'Determine Priority & SLA Level',
    badge: 'AI Reasoning Layer',
    timeEstimate: '10:42:05',
    summary: 'Priority upgraded to CRITICAL (Risk: High, AI Confidence: 94%).',
    details: 'Policy evaluation: High Order Value (₹18,500) + 2 Previous Contacts + Tomorrow Wedding Deadline = Tier-1 Priority Courier Expedite.',
    telemetry: {
      intent: 'delivery_escalation',
      priority: 'CRITICAL',
      risk: 'HIGH',
      confidence: 0.94,
      humanApprovalRequired: false,
    },
  },
  {
    number: 6,
    title: 'Generate Dynamic Action Plan',
    badge: 'Decision Room',
    timeEstimate: '10:42:05',
    summary: 'AI structures a 10-step targeted operational action plan.',
    details: 'Plan includes: Notify Hub lead on Slack, draft personalized customer email with guaranteed 2 PM delivery and GPS tracking, and arm 2-hour monitoring cron.',
    telemetry: {
      planStepsCount: 10,
      executionStrategy: 'PARALLEL_ORCHESTRATION',
      responsibleWorkflow: 'delivery-escalation',
    },
  },
  {
    number: 7,
    title: 'Trigger n8n Orchestration',
    badge: 'n8n Webhook',
    timeEstimate: '10:42:06',
    summary: 'AI sends payload to n8n webhook: /webhook/delivery-escalation.',
    details: 'n8n initializes multi-node workflow orchestrating Slack, SendGrid, PostgreSQL, and carrier sensor webhooks.',
    telemetry: {
      endpoint: '/webhook/delivery-escalation',
      method: 'POST',
      executionId: 'AUTO-8294',
      status: '200 OK',
    },
  },
  {
    number: 8,
    title: 'Execute Multi-Node Actions',
    badge: 'System Actions',
    timeEstimate: '10:42:08',
    summary: 'Slack dispatch alert sent & customer reassurance email delivered.',
    details: 'North Hub Manager briefed on Slack (#dispatch-urgent). Customer Priya Sharma receives email with live GPS courier tracking link.',
    telemetry: {
      slackNotified: '#dispatch-urgent (North Hub Manager)',
      emailDispatched: 'priya.sharma@gmail.com (Guaranteed Tomorrow 2:00 PM)',
      databaseUpdated: 'ORD-82941 flagged as EXPEDITED_HIGH_PRIORITY',
    },
  },
  {
    number: 9,
    title: 'Schedule Autonomous Follow-Up',
    badge: 'n8n Cron Scheduler',
    timeEstimate: '10:42:09',
    summary: 'Armed automated 2-hour cron watchdog checkpoint.',
    details: 'Cron will poll carrier departure scan at +120 minutes. If departure scan fails, system escalates to senior logistics manager.',
    telemetry: {
      checkpointScheduled: '+120 minutes (12:42:00)',
      cronTrigger: '0 */2 * * *',
      fallbackEscalation: 'logistics-manager@brand.com',
    },
  },
  {
    number: 10,
    title: 'Autonomous Resolution Monitoring',
    badge: 'Closed-Loop Monitor',
    timeEstimate: '10:42:10',
    summary: 'Carrier sensor watchdog confirms parcel dispatched on priority van.',
    details: 'Carrier sensor confirms departure from North Logistics Hub onto flight BD-402. Delivery window safely locked for tomorrow.',
    telemetry: {
      carrierSensorStatus: 'CONFIRMED_DEPARTURE_NORTH_HUB',
      flightNumber: 'BD-402 Priority Express',
      resolutionOutcome: 'SUCCESSFULLY_RESOLVED',
    },
  },
  {
    number: 11,
    title: 'Show Final Result & Audit Log',
    badge: 'Mission Complete',
    timeEstimate: '10:42:11',
    summary: 'Task Completed ✓ (18 min saved, 0 human bottlenecks, 94% confidence).',
    details: 'The delayed high-value order was resolved autonomously. Logistics was coordinated and the customer reassured in real time.',
    telemetry: {
      finalStatus: 'RESOLVED',
      actionsExecuted: 7,
      aiDecisions: 4,
      humanInterventions: 0,
      timeSaved: '18 minutes',
      auditRecordId: 'AUD-1048',
    },
  },
];

export const DemoWizardModal: React.FC<DemoWizardModalProps> = ({
  isOpen,
  onClose,
  onOpenAutopilotWithPreset,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [selectedInspectIdx, setSelectedInspectIdx] = useState<number>(0);

  // Reset when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentStepIdx(0);
      setSelectedInspectIdx(0);
      setIsPlaying(true);
      setIsFinished(false);
    }
  }, [isOpen]);

  // Step Sequencer (1.4s per stage)
  useEffect(() => {
    let timer: any;
    if (isOpen && isPlaying && !isFinished) {
      timer = setTimeout(() => {
        if (currentStepIdx < DEMO_11_STEPS.length - 1) {
          const nextIdx = currentStepIdx + 1;
          setCurrentStepIdx(nextIdx);
          setSelectedInspectIdx(nextIdx);
        } else {
          setIsFinished(true);
          setIsPlaying(false);
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.6 },
          });
        }
      }, 1400);
    }
    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, currentStepIdx, isFinished]);

  if (!isOpen) return null;

  const handleRestart = () => {
    setCurrentStepIdx(0);
    setSelectedInspectIdx(0);
    setIsPlaying(true);
    setIsFinished(false);
  };

  const handleSkipToResult = () => {
    setCurrentStepIdx(DEMO_11_STEPS.length - 1);
    setSelectedInspectIdx(DEMO_11_STEPS.length - 1);
    setIsPlaying(false);
    setIsFinished(true);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
  };

  const activeStep = DEMO_11_STEPS[selectedInspectIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#0B192C] via-[#1E3A5F] to-[#0B192C] text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center">
              <Zap className="w-5 h-5 text-sky-400 fill-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight">
                  3-Minute Live Hackathon Demo
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30">
                  11-Step Closed-Loop Flow
                </span>
              </div>
              <p className="text-xs text-slate-300">
                “A customer has a delayed ₹18,500 order and needs it for a wedding tomorrow.”
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={handleRestart}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Replay from Step 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {!isFinished && (
              <button
                onClick={handleSkipToResult}
                className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-bold text-white flex items-center gap-1 transition-colors"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Skip to Result</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/60">
          
          {/* Progress Status Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-subtle flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-black text-xs">
                {currentStepIdx + 1}/11
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Step {currentStepIdx + 1} of 11 • {DEMO_11_STEPS[currentStepIdx].badge}
                </span>
                <h4 className="text-sm font-extrabold text-[#0B192C]">
                  {DEMO_11_STEPS[currentStepIdx].title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Human Bottlenecks</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-600" />
                <span>18 Min Saved</span>
              </span>
            </div>
          </div>

          {/* 11 Steps Horizontal Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-1.5">
            {DEMO_11_STEPS.map((step, idx) => {
              const isDone = idx < currentStepIdx || (isFinished && idx === currentStepIdx);
              const isCurrent = idx === currentStepIdx && !isFinished;
              const isSelected = selectedInspectIdx === idx;

              return (
                <button
                  key={step.number}
                  onClick={() => setSelectedInspectIdx(idx)}
                  className={`p-2 rounded-xl border text-left transition-all relative flex flex-col justify-between h-20 ${
                    isCurrent
                      ? 'bg-sky-500 text-white border-sky-400 shadow-md ring-2 ring-sky-300 scale-105'
                      : isDone
                      ? 'bg-white text-slate-800 border-emerald-300 hover:border-emerald-400'
                      : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'
                  } ${isSelected && !isCurrent ? 'ring-2 ring-slate-400' : ''}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[9px] font-bold ${isCurrent ? 'text-sky-100' : 'text-slate-400'}`}>
                      #{step.number}
                    </span>
                    {isDone ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    ) : null}
                  </div>

                  <p className={`text-[10px] font-bold leading-tight line-clamp-2 ${isCurrent ? 'text-white' : 'text-slate-700'}`}>
                    {step.title}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left: Selected Step Details */}
            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Phase #{activeStep.number} • {activeStep.badge}
                  </span>
                  <h4 className="text-base font-black text-[#0B192C]">{activeStep.title}</h4>
                </div>
                <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                  {activeStep.timeEstimate}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Action Summary</span>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed font-medium">
                  {activeStep.details}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 block">Node JSON Telemetry</span>
                <div className="bg-[#0B192C] text-sky-300 font-mono text-[11px] p-3 rounded-xl overflow-x-auto max-h-40 border border-slate-800">
                  <pre>{JSON.stringify(activeStep.telemetry, null, 2)}</pre>
                </div>
              </div>
            </div>

            {/* Right: Innovation Highlight & Result Box */}
            <div className="lg:col-span-6 space-y-4">
              
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B192C]">
                    Why This Stage Matters to Judges
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Unlike traditional hardcoded scripts that simply fire an email, AI Operations Autopilot dynamically decides to notify the North Hub warehouse manager on Slack, dispatches live GPS tracking to the VIP customer, and arms an autonomous 2-hour monitoring cron.
                </p>
              </div>

              {isFinished ? (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg space-y-2 animate-in zoom-in-95">
                  <div className="flex items-center gap-2 font-black text-base">
                    <CheckCircle2 className="w-6 h-6" />
                    <span>Closed-Loop Resolution Confirmed ✓</span>
                  </div>
                  <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                    Order #ORD-48291 rerouted and departed North Hub. Customer reassured with guaranteed 2 PM delivery. Zero human manual triage required.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                  <span className="font-semibold">
                    Simulating live n8n execution pipeline (1.4s per node step)...
                  </span>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-white flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium hidden sm:block">
            “AI is the decision layer. n8n is the execution layer.”
          </span>

          <div className="flex items-center gap-2 ml-auto">
            {isFinished ? (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
              >
                Close & Explore App
              </button>
            ) : (
              <button
                onClick={() => {
                  if (currentStepIdx < DEMO_11_STEPS.length - 1) {
                    const next = currentStepIdx + 1;
                    setCurrentStepIdx(next);
                    setSelectedInspectIdx(next);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <span>Next Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
