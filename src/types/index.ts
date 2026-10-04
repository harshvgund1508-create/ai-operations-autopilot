export type NavigationTab = 
  | 'home'
  | 'dashboard'
  | 'autopilot'
  | 'scenarios'
  | 'architecture'
  | 'audit';

export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface ExtractedContext {
  intent: string;
  intentLabel: string;
  priority: PriorityLevel;
  risk: RiskLevel;
  orderValue?: string;
  customerName?: string;
  orderId?: string;
  deadline: string;
  previousComplaints: number;
  confidence: number; // 0 - 100
  humanApprovalRequired: boolean;
  approvalReason?: string;
  customerStatus?: string;
  hubLocation?: string;
}

export interface ActionPlanItem {
  id: string;
  title: string;
  reason: string;
  responsibleSystem: string;
  status: 'pending' | 'running' | 'completed' | 'skipped' | 'escalated';
  durationMs: number;
  outputSummary?: string;
}

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'decision' | 'n8n' | 'action' | 'monitor' | 'warning' | 'success';
}

export interface ScenarioItem {
  id: string;
  title: string;
  category: 'Customer Operations' | 'HR Operations' | 'College Administration' | 'Business Operations';
  icon: string;
  description: string;
  promptText: string;
  extractedContext: ExtractedContext;
  decisionExplanation: string;
  actionPlan: ActionPlanItem[];
  activityLogs: ActivityLogEntry[];
  resultSummary: {
    actionsExecutedCount: number;
    aiDecisionsCount: number;
    humanInterventionsCount: number;
    timeSavedMinutes: number;
    finalStatus: 'Resolved' | 'Completed' | 'Awaiting Approval' | 'Escalated';
    memo: string;
  };
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  input: string;
  category: string;
  aiClassification: string;
  priority: PriorityLevel;
  decision: string;
  actionSummary: string;
  workflow: string;
  result: string;
  humanApproval: 'Not Required' | 'Approved by Human' | 'Pending Review' | 'Rejected';
  finalStatus: 'Resolved' | 'Completed' | 'Awaiting Approval' | 'Escalated';
  confidence: number;
  telemetryPayload?: Record<string, any>;
}

export interface DashboardStats {
  automationsToday: number;
  successfullyCompleted: number;
  awaitingApproval: number;
  escalated: number;
  timeSavedFormatted: string;
}
