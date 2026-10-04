import React, { useState, useEffect } from 'react';
import {
  Brain,
  Zap,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Play,
  RotateCcw,
  Check,
  Cpu,
  Mail,
  Database,
  ArrowRight,
  Sparkles,
  Layers,
  Activity,
  UserCheck,
  HelpCircle,
  XCircle,
  RefreshCw,
  Send,
  SlidersHorizontal,
  Settings,
  Copy,
  ExternalLink,
  ChevronDown,
  Terminal,
  MessageSquare,
  FileCode,
} from 'lucide-react';
import { ScenarioItem, NavigationTab } from '../../types';
import { triggerWorkflow, sendApproval } from '../../services/n8n';
import { analyzePromptAsync } from '../../services/aiReasoning';
import { AISettings, getStoredAISettings, saveAISettings } from '../../services/aiEngine';
import confetti from 'canvas-confetti';

interface AutopilotRoomProps {
  scenario: ScenarioItem;
  onResetToHome: () => void;
  onNavigateTab?: (tab: NavigationTab) => void;
  onReanalyzePrompt?: (customPrompt: string) => void;
  onUpdateScenario?: (newScenario: ScenarioItem, newPromptText: string) => void;
}

const PRESET_PROBLEMS = [
  {
    label: '🚚 Wedding Outfit Delay (₹18,500)',
    text: "Customer Priya Sharma says her ₹18,500 wedding outfit hasn't arrived. The event is tomorrow and she already contacted support twice with no response.",
  },
  {
    label: '☁️ AWS RDS Database High CPU',
    text: "AWS RDS PostgreSQL instance in us-east-1 reached 99% CPU utilization. Over 150 enterprise customers are experiencing HTTP 504 gateway timeouts.",
  },
  {
    label: '💳 $45,000 Suspicious Wire Transfer',
    text: "Suspicious $45,000 wire transfer requested from a new overseas IP address on dormant corporate account AC-99201 without 2FA confirmation.",
  },
  {
    label: '🏥 Hospital ICU Oxygen Telemetry Alarm',
    text: "ICU Bed 14 oxygen flow sensor telemetry dropped below the 88% SpO2 critical threshold on Ward 4B. Immediate nurse lead alert needed.",
  },
  {
    label: '✈️ Lost Baggage with Emergency Medicine',
    text: "Passenger Sarah Jenkins lost priority baggage on Flight AI-102 containing vital emergency insulin. Connecting flight departs in 3 hours.",
  },
  {
    label: '🎓 Urgent Visa Document Rejection',
    text: "International student Aarav Mehta's visa eligibility verification letter was rejected due to missing seal 14 hours before scheduled flight.",
  },
];

export const AutopilotRoom: React.FC<AutopilotRoomProps> = ({
  scenario: initialScenario,
  onResetToHome,
  onNavigateTab,
  onReanalyzePrompt,
  onUpdateScenario,
}) => {
  const [currentScenario, setCurrentScenario] = useState<ScenarioItem>(initialScenario);
  const [pipelineStageIdx, setPipelineStageIdx] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState<boolean>(true);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [aiThinkingPhase, setAiThinkingPhase] = useState<string>('');
  const [actionPlanState, setActionPlanState] = useState(initialScenario.actionPlan);
  const [displayedLogs, setDisplayedLogs] = useState(initialScenario.activityLogs.slice(0, 2));
  const [monitoringPath, setMonitoringPath] = useState<'success' | 'failure'>('success');
  const [resolutionStatus, setResolutionStatus] = useState<'monitoring' | 'resolved' | 'escalated'>('monitoring');
  const [isHumanApprovalPending, setIsHumanApprovalPending] = useState<boolean>(
    initialScenario.extractedContext.humanApprovalRequired
  );
  const [humanDecisionFeedback, setHumanDecisionFeedback] = useState<string | null>(null);
  const [customInputText, setCustomInputText] = useState<string>(initialScenario.promptText);
  const [activeViewTab, setActiveViewTab] = useState<'decision' | 'response' | 'payload'>('decision');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // AI Model Settings State
  const [aiSettings, setAiSettings] = useState<AISettings>(getStoredAISettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [tempApiKey, setTempApiKey] = useState<string>(aiSettings.apiKey || '');
  const [tempProvider, setTempProvider] = useState<AISettings['provider']>(aiSettings.provider);

  useEffect(() => {
    setCurrentScenario(initialScenario);
    setCustomInputText(initialScenario.promptText);
  }, [initialScenario]);

  const n8nPipelineNodes = [
    { id: 'ai-decision', label: 'AI DECISION', type: 'engine' },
    { id: 'n8n-webhook', label: 'n8n WEBHOOK', type: 'trigger' },
    { id: 'get-customer', label: 'ENTITY CONTEXT', type: 'db' },
    { id: 'get-order', label: 'STATUS CHECK', type: 'carrier' },
    { id: 'notify-logistics', label: 'TEAM ALERT', type: 'slack' },
    { id: 'send-response', label: 'DISPATCH UPDATE', type: 'email' },
    { id: 'schedule-followup', label: 'ARM WATCHDOG', type: 'cron' },
    { id: 'monitor', label: 'MONITOR', type: 'watchdog' },
  ];

  // Execution Sequencer
  useEffect(() => {
    setIsExecuting(true);
    setPipelineStageIdx(0);
    setResolutionStatus('monitoring');
    setActionPlanState(
      currentScenario.actionPlan.map((a, i) => ({
        ...a,
        status: i === 0 ? 'running' : 'pending',
      }))
    );
    setDisplayedLogs(currentScenario.activityLogs.slice(0, 2));

    const t1 = setTimeout(() => {
      setPipelineStageIdx(1);
      setDisplayedLogs(currentScenario.activityLogs.slice(0, 3));
    }, 600);

    const t2 = setTimeout(() => {
      setPipelineStageIdx(2);
      setDisplayedLogs(currentScenario.activityLogs.slice(0, 4));
    }, 1200);

    const t3 = setTimeout(() => {
      setPipelineStageIdx(3);
      setDisplayedLogs(currentScenario.activityLogs.slice(0, 5));
    }, 1800);

    const t4 = setTimeout(() => {
      setPipelineStageIdx(4);
      triggerWorkflow(currentScenario.id, currentScenario.title, { prompt: currentScenario.promptText });
      setDisplayedLogs(currentScenario.activityLogs.slice(0, 6));
    }, 2400);

    const t5 = setTimeout(() => {
      setPipelineStageIdx(5);
      setActionPlanState(
        currentScenario.actionPlan.map((a, i) => ({
          ...a,
          status: i < 5 ? 'completed' : a.status === 'skipped' ? 'skipped' : 'pending',
        }))
      );
      setDisplayedLogs(currentScenario.activityLogs.slice(0, 7));
    }, 3200);

    const t6 = setTimeout(() => {
      setPipelineStageIdx(6);
      setActionPlanState(
        currentScenario.actionPlan.map((a) => ({
          ...a,
          status: a.status === 'skipped' ? 'skipped' : 'completed',
        }))
      );
      setDisplayedLogs(currentScenario.activityLogs);
      if (!currentScenario.extractedContext.humanApprovalRequired) {
        setResolutionStatus(monitoringPath === 'success' ? 'resolved' : 'escalated');
      }
    }, 4200);

    const t7 = setTimeout(() => {
      setPipelineStageIdx(7);
      setIsExecuting(false);
      if (!currentScenario.extractedContext.humanApprovalRequired && monitoringPath === 'success') {
        confetti({
          particleCount: 80,
          spread: 75,
          origin: { y: 0.6 },
        });
      }
    }, 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [currentScenario, monitoringPath]);

  const handleHumanAction = async (decision: 'approve' | 'reject' | 'modify') => {
    const res = await sendApproval(currentScenario.id, decision);
    setIsHumanApprovalPending(false);
    setHumanDecisionFeedback(res.message);
    setResolutionStatus(decision === 'approve' ? 'resolved' : 'escalated');
    setPipelineStageIdx(7);
    setIsExecuting(false);
    if (decision === 'approve') {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleCustomAnalyze = async (promptToRun?: string) => {
    const targetText = (promptToRun || customInputText).trim();
    if (!targetText) return;

    setIsAiThinking(true);
    setAiThinkingPhase('Phase 1: Tokenizing input & semantic extraction...');

    setTimeout(() => {
      setAiThinkingPhase('Phase 2: Calculating risk scores & evaluating policy rules...');
    }, 300);

    setTimeout(() => {
      setAiThinkingPhase('Phase 3: Synthesizing dynamic multi-node action plan...');
    }, 600);

    try {
      const result = await analyzePromptAsync(targetText);
      setAiThinkingPhase('Phase 4: Dispatching execution payload...');
      setTimeout(() => {
        setIsAiThinking(false);
        setCurrentScenario(result);
        setIsHumanApprovalPending(result.extractedContext.humanApprovalRequired);
        if (onUpdateScenario) {
          onUpdateScenario(result, targetText);
        } else if (onReanalyzePrompt) {
          onReanalyzePrompt(targetText);
        }
      }, 400);
    } catch (e) {
      console.error(e);
      setIsAiThinking(false);
    }
  };

  const handleSaveSettings = () => {
    const newSettings: AISettings = {
      ...aiSettings,
      provider: tempProvider,
      apiKey: tempApiKey.trim() || undefined,
    };
    setAiSettings(newSettings);
    saveAISettings(newSettings);
    setIsSettingsOpen(false);
  };

  const handleCopyPayload = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const confidenceVal = currentScenario.extractedContext.confidence || 94;
  const isCompleted = pipelineStageIdx >= 6 && !isHumanApprovalPending;

  // Generate Personalized Message preview based on current situation
  const generatedMessage = {
    recipient: currentScenario.extractedContext.customerName || 'Customer',
    channel: currentScenario.category === 'HR Operations' ? 'Calendar Invite / Email' : currentScenario.category === 'Business Operations' ? 'Slack Incident Alert' : 'Priority SMS & Email',
    subject: `[Expedited SLA] Update regarding your ${currentScenario.extractedContext.intentLabel} (${currentScenario.extractedContext.orderId || 'OP-82941'})`,
    body: `Dear ${currentScenario.extractedContext.customerName || 'Customer'},\n\nWe understand that this is extremely critical and you need resolution by ${currentScenario.extractedContext.deadline}. Our AI Operations Autopilot has automatically escalated this to the duty lead.\n\n✓ Priority Status: ${currentScenario.extractedContext.priority}\n✓ Assigned Workflow: ${currentScenario.extractedContext.intent}\n✓ SLA Target: ${currentScenario.extractedContext.deadline}\n\nOur automated watchdog is monitoring this in real time until resolved.`,
  };

  // Structured JSON Telemetry for n8n
  const n8nPayload = {
    event_id: currentScenario.id,
    timestamp: new Date().toISOString(),
    ai_decision_layer: {
      provider: aiSettings.provider,
      intent: currentScenario.extractedContext.intent,
      priority: currentScenario.extractedContext.priority,
      risk_level: currentScenario.extractedContext.risk,
      confidence_score: confidenceVal / 100,
      order_valuation: currentScenario.extractedContext.orderValue || null,
      deadline_constraint: currentScenario.extractedContext.deadline,
      previous_contacts_count: currentScenario.extractedContext.previousComplaints,
      human_approval_required: currentScenario.extractedContext.humanApprovalRequired,
    },
    orchestration_plan: currentScenario.actionPlan.map((step) => ({
      step_id: step.id,
      action: step.title,
      target_system: step.responsibleSystem,
      status: step.status,
    })),
    monitoring_policy: {
      watchdog_active: true,
      polling_interval_minutes: 15,
      auto_escalation_on_timeout: true,
    },
  };

  return (
    <div className="space-y-8 py-4 max-w-6xl mx-auto animate-in fade-in">
      
      {/* 1. Header & Subtitle */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B192C] tracking-tight">
              Autopilot
            </h1>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-0.5 rounded-full border border-sky-200">
              Decision & Execution Control Room
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
            “AI is deciding. n8n is executing.”
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* AI Model Badge & Settings Trigger */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Brain className="w-3.5 h-3.5 text-sky-400" />
            <span className="capitalize">{aiSettings.provider === 'built-in' ? 'Autonomous AI Engine' : aiSettings.provider}</span>
            <Settings className="w-3 h-3 text-slate-400 ml-1" />
          </button>

          <button
            onClick={onResetToHome}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Situation</span>
          </button>
        </div>
      </div>

      {/* 2. Situation Input Panel with Live Problem Presets */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Operational Event Under Triage</span>
          </label>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
            {currentScenario.category}
          </span>
        </div>

        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            value={customInputText}
            onChange={(e) => setCustomInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomAnalyze()}
            placeholder="Describe any operational crisis, customer escalation, server outage..."
            className="flex-1 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
          />
          <button
            id="btn-autopilot-analyze"
            onClick={() => handleCustomAnalyze()}
            disabled={isAiThinking}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white text-xs font-black shadow-glow flex items-center justify-center gap-1.5 shrink-0 active:scale-95 transition-all disabled:opacity-50"
          >
            {isAiThinking ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Zap className="w-3.5 h-3.5 text-sky-200 fill-sky-200" />
            )}
            <span>{isAiThinking ? 'AI REASONING...' : 'ANALYZE & ACT'}</span>
          </button>
        </div>

        {/* Problem Presets for Instant Testing */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Quick Test Scenarios (Click to Analyze Any Problem with AI):
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_PROBLEMS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCustomInputText(preset.text);
                  handleCustomAnalyze(preset.text);
                }}
                className="text-[11px] font-semibold bg-slate-100 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 transition-all text-left"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live AI Reasoning / Thinking Stream Banner */}
        {isAiThinking && (
          <div className="p-3.5 rounded-2xl bg-slate-900 text-sky-400 font-mono text-xs flex items-center gap-3 border border-sky-500/30 animate-pulse">
            <Terminal className="w-4 h-4 shrink-0 text-cyan-400" />
            <span>{aiThinkingPhase}</span>
          </div>
        )}
      </div>

      {/* 3. AI DECISION ROOM */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-premium space-y-6">
        
        {/* Navigation Tabs for Decision Room */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-[#0B192C]">AI Decision Room</h3>
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                  Autonomous Triage
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Context extraction, risk evaluation, and decision policy</p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveViewTab('decision')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeViewTab === 'decision'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-sky-600" />
              <span>Decision Factors</span>
            </button>
            <button
              onClick={() => setActiveViewTab('response')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeViewTab === 'response'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Response Draft</span>
            </button>
            <button
              onClick={() => setActiveViewTab('payload')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeViewTab === 'payload'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-indigo-600" />
              <span>n8n Payload</span>
            </button>
          </div>

          {/* Clean Circular Progress Indicator (Confidence Meter) */}
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200/80">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-1000"
                  strokeDasharray={`${confidenceVal}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[11px] font-black text-[#0B192C]">{confidenceVal}%</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                AI Confidence
              </span>
              <span className="text-xs font-semibold text-slate-500">Autonomous Gate Pass</span>
            </div>
          </div>
        </div>

        {/* Situation Grid */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
            Classified Situation & Entities
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Classified Intent</span>
              <p className="text-xs sm:text-sm font-black text-slate-900">{currentScenario.extractedContext.intentLabel}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-rose-700">Priority Level</span>
              <p className="text-xs sm:text-sm font-black text-rose-800">{currentScenario.extractedContext.priority}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Customer Risk</span>
              <p className="text-xs sm:text-sm font-black text-rose-600">{currentScenario.extractedContext.risk}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Order / Value</span>
              <p className="text-xs sm:text-sm font-black text-slate-900">{currentScenario.extractedContext.orderValue || 'N/A'}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Deadline</span>
              <p className="text-xs sm:text-sm font-black text-slate-900">{currentScenario.extractedContext.deadline}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Prev. Contacts</span>
              <p className="text-xs sm:text-sm font-black text-slate-900">{currentScenario.extractedContext.previousComplaints}</p>
            </div>

          </div>
        </div>

        {/* TAB 1: "WHY THIS DECISION?" PANEL */}
        {activeViewTab === 'decision' && (
          <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span className="text-xs font-black uppercase tracking-wider text-sky-950">
                Why was this prioritized?
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-sky-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Urgency deadline detected: {currentScenario.extractedContext.deadline}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-sky-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Financial exposure: {currentScenario.extractedContext.orderValue || 'Standard Record'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-sky-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Past contacts: {currentScenario.extractedContext.previousComplaints} interaction(s)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-sky-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Risk Level evaluated: {currentScenario.extractedContext.risk}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-sky-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Autonomous execution gate pass: {confidenceVal}% &gt;= 85%</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-sky-100">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Constructed dynamic {actionPlanState.length}-step n8n pipeline</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI DRAFTED RESPONSE */}
        {activeViewTab === 'response' && (
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-black uppercase tracking-wider text-emerald-950">
                  AI-Synthesized Stakeholder Communication
                </span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                Channel: {generatedMessage.channel}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-700">Subject: {generatedMessage.subject}</span>
                <span className="text-slate-400 font-medium">To: {generatedMessage.recipient}</span>
              </div>
              <p className="text-xs text-slate-700 font-medium whitespace-pre-line leading-relaxed">
                {generatedMessage.body}
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: n8n PAYLOAD JSON */}
        {activeViewTab === 'payload' && (
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-400">
                <FileCode className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-wider">
                  Live Dispatch Payload for n8n Webhook
                </span>
              </div>
              <button
                onClick={() => handleCopyPayload(JSON.stringify(n8nPayload, null, 2))}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3 h-3" />
                <span>{isCopied ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>

            <pre className="p-3 bg-black/60 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-56">
              {JSON.stringify(n8nPayload, null, 2)}
            </pre>
          </div>
        )}

        {/* 4. DYNAMIC ACTION PLAN */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Dynamic Action Plan ({actionPlanState.length} Steps)
            </span>
            <span className="text-xs text-slate-400 font-mono font-medium">Deterministic n8n Sequence</span>
          </div>

          <div className="space-y-2">
            {actionPlanState.map((act, idx) => (
              <div
                key={act.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  act.status === 'completed'
                    ? 'bg-slate-50/80 border-slate-200 text-slate-800'
                    : act.status === 'running'
                    ? 'bg-sky-50 border-sky-300 shadow-xs ring-1 ring-sky-300'
                    : act.status === 'skipped'
                    ? 'bg-slate-100/50 border-slate-200 text-slate-400 opacity-60'
                    : 'bg-white border-slate-200/70 text-slate-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      act.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-700'
                        : act.status === 'running'
                        ? 'bg-sky-500 text-white animate-pulse'
                        : act.status === 'skipped'
                        ? 'bg-slate-200 text-slate-400'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {act.status === 'completed' ? <Check className="w-3 h-3" /> : idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs font-bold text-slate-900">{act.title}</h5>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {act.responsibleSystem}
                      </span>
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.2 rounded-full ${
                          act.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : act.status === 'running'
                            ? 'bg-sky-100 text-sky-800 animate-pulse'
                            : act.status === 'skipped'
                            ? 'bg-slate-100 text-slate-500'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {act.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{act.reason}</p>
                    {act.outputSummary && (
                      <span className="text-[11px] font-semibold text-sky-800 bg-sky-50/90 px-2 py-0.5 rounded border border-sky-100 mt-1 inline-block">
                        Output: {act.outputSummary}
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0">
                  {act.durationMs > 0 ? `⚡ ${act.durationMs}ms` : 'Bypassed'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. LIVE N8N AUTOMATION VIEW */}
      <div className="bg-[#0B192C] rounded-3xl p-6 sm:p-7 text-white shadow-premium space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="font-black text-sm text-white uppercase tracking-wider">
                Live n8n Execution Pipeline
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                AI DECISION → n8n WEBHOOK → MULTI-NODE EXECUTION → MONITOR
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>n8n: CONNECTED</span>
            </div>
            <span className="text-slate-400">RUN: {currentScenario.id}</span>
          </div>
        </div>

        {/* 8-Node Visual Execution Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {n8nPipelineNodes.map((node, i) => {
            const isDone = pipelineStageIdx > i;
            const isCurrent = pipelineStageIdx === i;
            return (
              <div
                key={node.id}
                className={`p-3 rounded-2xl border text-center transition-all duration-300 relative ${
                  isDone
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : isCurrent
                    ? 'bg-sky-950/80 border-sky-400 text-sky-200 ring-2 ring-sky-400/50 shadow-glow'
                    : 'bg-slate-900/50 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono uppercase font-bold block mb-1">
                  Step {i + 1}
                </div>
                <div className="text-xs font-extrabold tracking-tight">
                  {node.label}
                </div>
                {isDone && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mx-auto mt-1.5" />
                )}
                {isCurrent && (
                  <div className="w-2 h-2 rounded-full bg-sky-400 mx-auto mt-2 animate-ping" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. ACTIVITY LOG */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-sky-600" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Live Operations Activity Feed
            </h4>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Microsecond telemetry</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl font-mono text-xs text-slate-300 space-y-2 max-h-48 overflow-y-auto border border-slate-800">
          {displayedLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-2.5">
              <span className="text-slate-500 shrink-0 font-semibold">{log.timestamp}</span>
              <span
                className={`shrink-0 text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                  log.type === 'decision'
                    ? 'bg-sky-950 text-sky-400 border border-sky-800'
                    : log.type === 'n8n'
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                    : log.type === 'action'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : log.type === 'success'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {log.type}
              </span>
              <span className="text-slate-200">{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. AUTONOMOUS MONITORING */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-600" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Autonomous Closed-Loop Monitoring
            </h4>
          </div>

          {/* Interactive Simulation Switcher (Success vs Failure Path) */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold">Test Path:</span>
            <button
              onClick={() => setMonitoringPath('success')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                monitoringPath === 'success'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Happy Path (Resolved)
            </button>
            <button
              onClick={() => setMonitoringPath('failure')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                monitoringPath === 'failure'
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Failure Path (Retry → Escalate)
            </button>
          </div>
        </div>

        {/* Monitoring Flow Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs font-semibold">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Initial action completed</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Follow-up scheduled</span>
          </div>

          <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-600 shrink-0" />
            <span>Resolution check active</span>
          </div>

          {monitoringPath === 'success' ? (
            <>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Resolution detected</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-600 text-white font-black flex items-center justify-center gap-1.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>TASK COMPLETED</span>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Follow-up timeout (Retry 1/2)</span>
              </div>
              <div className="p-3 rounded-2xl bg-rose-600 text-white font-black flex items-center justify-center gap-1.5 shadow-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>MANAGER ESCALATION</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 8. HUMAN-IN-THE-LOOP APPROVAL (When Triggered) */}
      {isHumanApprovalPending && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 sm:p-7 border-2 border-amber-300 shadow-premium space-y-4 animate-in zoom-in-95">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-amber-950 uppercase tracking-tight">
                HUMAN APPROVAL REQUIRED (Gate Threshold Triggered)
              </h3>
              <p className="text-xs font-semibold text-amber-800">
                {currentScenario.extractedContext.approvalReason ||
                  'Financial risk or policy exception exceeds autonomous execution threshold.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-white/80 rounded-2xl border border-amber-200 text-xs font-semibold">
            <div>
              <span className="text-slate-400 uppercase text-[10px] block font-bold">Target Value</span>
              <span className="text-slate-900 font-bold">{currentScenario.extractedContext.orderValue || '₹18,500'}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] block font-bold">AI Confidence</span>
              <span className="text-amber-700 font-bold">{confidenceVal}%</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] block font-bold">Policy Rule</span>
              <span className="text-slate-900 font-bold">Financial Exposure &gt; ₹15,000</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => handleHumanAction('approve')}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-xs flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>APPROVE EXECUTION</span>
            </button>
            <button
              onClick={() => handleHumanAction('reject')}
              className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-xs flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <XCircle className="w-4 h-4" />
              <span>REJECT ACTION</span>
            </button>
            <button
              onClick={() => handleHumanAction('modify')}
              className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-black border border-slate-200 shadow-xs flex items-center gap-1.5 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-600" />
              <span>MODIFY PARAMETERS</span>
            </button>
          </div>
        </div>
      )}

      {/* Feedback banner after human action */}
      {humanDecisionFeedback && (
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-sky-600" />
          <span>{humanDecisionFeedback}</span>
        </div>
      )}

      {/* 9. AUTOMATION RESULT PAGE */}
      {isCompleted && (
        <div className="bg-gradient-to-br from-slate-900 via-[#0B192C] to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-premium space-y-6 animate-in slide-in-from-bottom-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-glow">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Task Completed</h2>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Status: {resolutionStatus.toUpperCase()}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab && onNavigateTab('audit')}
              className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-black shadow-glow flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Layers className="w-4 h-4" />
              <span>VIEW AUDIT TRAIL</span>
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Actions Executed</span>
              <span className="text-lg font-black text-white">{currentScenario.resultSummary.actionsExecutedCount}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Decisions</span>
              <span className="text-lg font-black text-white">{currentScenario.resultSummary.aiDecisionsCount}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Human Interventions</span>
              <span className="text-lg font-black text-emerald-400">{currentScenario.resultSummary.humanInterventionsCount}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Confidence</span>
              <span className="text-lg font-black text-sky-400">{confidenceVal}%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Time Saved</span>
              <span className="text-lg font-black text-amber-400">{currentScenario.resultSummary.timeSavedMinutes} min</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Follow-up</span>
              <span className="text-lg font-black text-emerald-400">Completed</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Final Status</span>
              <span className="text-lg font-black text-emerald-300">RESOLVED</span>
            </div>
          </div>

          {/* AI Summary Memo */}
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block">AI Execution Summary</span>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {currentScenario.decisionExplanation}
            </p>
          </div>
        </div>
      )}

      {/* 10. AI Model Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-sky-600" />
                <h3 className="font-black text-slate-900 text-base">AI Decision Engine Config</h3>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-extrabold uppercase text-slate-400 block mb-1.5">
                  Select AI Provider
                </label>
                <select
                  value={tempProvider}
                  onChange={(e) => setTempProvider(e.target.value as any)}
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold"
                >
                  <option value="built-in">⚡ Built-in Autonomous Neural Reasoner (Zero Config / Offline)</option>
                  <option value="gemini">🌟 Google Gemini API (1.5 Flash / 2.0 Flash)</option>
                  <option value="openai">🤖 OpenAI (GPT-4o / GPT-4o-mini)</option>
                  <option value="groq">⚡ Groq (Llama 3.3 70B - Ultra Fast)</option>
                  <option value="ollama">💻 Local Ollama (localhost:11434)</option>
                </select>
              </div>

              {tempProvider !== 'built-in' && (
                <div>
                  <label className="text-xs font-extrabold uppercase text-slate-400 block mb-1.5">
                    API Key for {tempProvider.toUpperCase()}
                  </label>
                  <input
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    placeholder={`Enter your ${tempProvider} API key...`}
                    className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Keys are stored only in your local browser memory and never sent to external servers.
                  </span>
                </div>
              )}

              <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200 text-sky-900 text-xs font-medium space-y-1">
                <span className="font-bold block">💡 Instant AI Analysis Note:</span>
                <p>
                  The Built-in Autonomous Neural Reasoner parses ANY arbitrary English problem statement dynamically, extracting currencies, SLAs, past contacts, and generating custom action plans on the fly.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
