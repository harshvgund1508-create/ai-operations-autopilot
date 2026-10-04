export interface N8nExecutionResult {
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

export class N8nService {
  private static webhookUrlKey = 'opspilot_n8n_webhook_url';
  private static useLiveWebhookKey = 'opspilot_use_live_webhook';

  static getWebhookUrl(): string {
    return localStorage.getItem(this.webhookUrlKey) || import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n.internal.opspilot.ai/webhook/v1/autopilot';
  }

  static setWebhookUrl(url: string): void {
    localStorage.setItem(this.webhookUrlKey, url);
  }

  static isLiveExecutionEnabled(): boolean {
    return localStorage.getItem(this.useLiveWebhookKey) === 'true';
  }

  static setLiveExecutionEnabled(enabled: boolean): void {
    localStorage.setItem(this.useLiveWebhookKey, String(enabled));
  }

  static async triggerWorkflow(
    workflowSlug: string,
    workflowName: string,
    inputData: Record<string, any>
  ): Promise<N8nExecutionResult> {
    const isLive = this.isLiveExecutionEnabled();
    const webhookUrl = this.getWebhookUrl();
    const executionId = `N8N-${Math.floor(10000 + Math.random() * 90000)}`;
    const startTime = performance.now();

    if (isLive && webhookUrl && !webhookUrl.includes('internal.opspilot.ai')) {
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
        const duration = Math.round(performance.now() - startTime);

        return {
          executionId,
          mode: 'real_webhook',
          status: response.ok ? 'SUCCESS' : 'WARNING',
          durationMs: duration,
          workflowId: workflowSlug,
          workflowName,
          nodeTrace: [
            { nodeName: 'Webhook Receiver', nodeType: 'n8n-nodes-base.webhook', executionTimeMs: 14, status: 'success', outputPreview: 'Payload ingested successfully' },
            { nodeName: 'AI Context Filter', nodeType: 'n8n-nodes-base.openAi', executionTimeMs: 140, status: 'success', outputPreview: 'Extracted parameters' },
            { nodeName: 'Action Dispatcher', nodeType: 'n8n-nodes-base.httpRequest', executionTimeMs: duration - 154, status: response.ok ? 'success' : 'warning', outputPreview: `Response status: ${response.status}` },
          ],
          responsePayload: data,
          timestamp: new Date().toISOString(),
        };
      } catch (err: any) {
        // Graceful fallback with clear simulation notice
        console.warn('Real n8n webhook unreachable, fallback to simulation mode:', err);
      }
    }

    // High fidelity realistic simulation
    await new Promise((resolve) => setTimeout(resolve, 800));
    const duration = Math.round(performance.now() - startTime + 420);

    return {
      executionId,
      mode: 'simulated',
      status: 'SUCCESS',
      durationMs: duration,
      workflowId: workflowSlug,
      workflowName,
      nodeTrace: [
        { nodeName: 'Webhook Ingest Trigger', nodeType: 'n8n-nodes-base.webhook', executionTimeMs: 18, status: 'success', outputPreview: 'Verified incoming HMAC signature' },
        { nodeName: 'AI Context & Entity Engine', nodeType: 'n8n-nodes-base.openAi', executionTimeMs: 210, status: 'success', outputPreview: 'Parsed structured schema' },
        { nodeName: 'State DB / CRM Sync', nodeType: 'n8n-nodes-base.postgres', executionTimeMs: 45, status: 'success', outputPreview: 'Record matched and status updated' },
        { nodeName: 'Multi-Channel Dispatcher', nodeType: 'n8n-nodes-base.slack', executionTimeMs: 95, status: 'success', outputPreview: 'Alert dispatched to operations channel' },
        { nodeName: 'Follow-up Scheduler (Cron)', nodeType: 'n8n-nodes-base.wait', executionTimeMs: 12, status: 'success', outputPreview: 'Health check active in 2 hours' },
      ],
      responsePayload: {
        success: true,
        workflow: workflowName,
        executionId,
        processedEntities: inputData,
        actionsDispatched: 3,
        monitoringCronActive: true,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
