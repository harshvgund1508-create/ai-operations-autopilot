# 📐 Data Flow Diagram (DFD) Specification

## Level 0 Context Diagram

```text
External Users / Channels ───► [ 0.0 AI Operations Autopilot ] ───► Business Actions & Systems
                                         ▲
                                         │
                                   n8n Engine
```

---

## Level 1 Detailed Functional Decomposition

```text
User / Event Request
       │
       ▼
[ 1.0 Input Processing & Normalization ]
       │
       ▼
[ 2.0 Context Retrieval & DB Match ] ◄───► D1: Customer & Order Database
       │
       ▼
[ 3.0 AI Analysis & Confidence Scoring ] ◄───► D4: Knowledge Base & Policies
       │
       ▼
[ 4.0 Decision Engine & Action Planner ] ◄───► D2: Task State Database
       │
       ▼
[ 5.0 n8n Multi-Node Workflow Execution ] ───► D3: Immutable Audit Logs
       │
       ▼
[ 6.0 Continuous Monitoring & Watchdog ]
       │
       ├──► [ Outcome Verified: RESOLVED ]
       │
       └──► [ Exception / Low Confidence ] ───► Human Supervisor (HITL)
```

### Data Stores
- **D1: Customer & Order Database:** User profile, order status, purchase history, delivery hub.
- **D2: Task State Database:** Active operational tasks and execution stages.
- **D3: Workflow Logs:** Real-time n8n execution telemetry and timestamps.
- **D4: Knowledge Base:** Safety thresholds, financial limits, and SLA rules.
