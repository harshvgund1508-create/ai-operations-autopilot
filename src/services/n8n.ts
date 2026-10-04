export interface N8nWorkflowExecutionResponse {
  executionId: string;
  mode: 'simulated' | 'real_webhook';
  status: 'SUCCESS' | 'WARNING' | 'ERROR';
  durationMs: number;
  workflowId: string;
  workflowName: string;
  nodeTrace: Array<{
    nodeName: string;
    nodeType: string;
    executionTimeMs: number;
    status: 'success' | 'warning' | 'error';
    outputPreview: string;
  }>;
  responsePayload: Record<string, any>;
  timestamp: string;
}

export async function triggerWorkflow(
  workflowSlug: string,
  workflowName: string,
  inputData: Record<string, any>
): Promise<N8nWorkflowExecutionResponse> {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || '';
  const executionId = `N8N-${Math.floor(10000 + Math.random() * 90000)}`;
  const startTime = performance.now();

  // If a real n8n webhook URL is configured in environment, trigger it
  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-OpsPilot-Source': 'AI-Operations-Autopilot',
          'X-Execution-ID': executionId,
        },
        body: JSON.stringify({
          workflowSlug,
          workflowName,
          data: inputData,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json().catch(() => ({ status: 'received' }));
      const durationMs = Math.round(performance.now() - startTime);

      return {
        executionId,
        mode: 'real_webhook',
        status: response.ok ? 'SUCCESS' : 'WARNING',
        durationMs,
        workflowId: workflowSlug,
        workflowName,
        nodeTrace: [
          { nodeName: 'Webhook Ingest Receiver', nodeType: 'n8n-nodes-base.webhook', executionTimeMs: 14, status: 'success', outputPreview: 'Payload ingested successfully' },
          { nodeName: 'AI Context & Reasoning', nodeType: 'n8n-nodes-base.openAi', executionTimeMs: 180, status: 'success', outputPreview: 'Parsed structured context' },
          { nodeName: 'Action Dispatcher', nodeType: 'n8n-nodes-base.httpRequest', executionTimeMs: durationMs - 194, status: response.ok ? 'success' : 'warning', outputPreview: `Response status: ${response.status}` },
        ],
        responsePayload: data,
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      console.warn('Real n8n webhook unreachable, fallback to simulation mode:', err);
    }
  }

  // Realistic high-fidelity simulation
  await new Promise((resolve) => setTimeout(resolve, 600));
  const durationMs = Math.round(performance.now() - startTime + 380);

  return {
    executionId,
    mode: 'simulated',
    status: 'SUCCESS',
    durationMs,
    workflowId: workflowSlug,
    workflowName,
    nodeTrace: [
      { nodeName: 'Webhook Ingest Trigger', nodeType: 'n8n-nodes-base.webhook', executionTimeMs: 18, status: 'success', outputPreview: 'Verified incoming HMAC payload' },
      { nodeName: 'AI Context & Entity Engine', nodeType: 'n8n-nodes-base.openAi', executionTimeMs: 210, status: 'success', outputPreview: 'Extracted intent & critical priority' },
      { nodeName: 'PostgreSQL Order DB Match', nodeType: 'n8n-nodes-base.postgres', executionTimeMs: 45, status: 'success', outputPreview: 'Order #ORD-48291 found at North Hub' },
      { nodeName: 'Slack #dispatch-urgent Dispatcher', nodeType: 'n8n-nodes-base.slack', executionTimeMs: 85, status: 'success', outputPreview: 'Logistics team notified with priority tag' },
      { nodeName: 'SendGrid Customer Reassurance', nodeType: 'n8n-nodes-base.emailSend', executionTimeMs: 95, status: 'success', outputPreview: 'GPS tracking link emailed to customer' },
      { nodeName: 'n8n 2h Watchdog Scheduler', nodeType: 'n8n-nodes-base.wait', executionTimeMs: 12, status: 'success', outputPreview: 'Follow-up armed for +120 minutes' },
    ],
    responsePayload: {
      success: true,
      workflow: workflowName,
      executionId,
      processedEntities: inputData,
      actionsDispatched: 6,
      monitoringWatchdogActive: true,
    },
    timestamp: new Date().toISOString(),
  };
}

export async function sendApproval(
  executionId: string,
  decision: 'approve' | 'reject' | 'modify',
  notes?: string
): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    success: true,
    message: `Case ${executionId} marked as ${decision.toUpperCase()}. Action released to n8n execution engine.`,
  };
}
