# ⚡ AI Operations Autopilot
### *“From scattered information to intelligent action.”*
> **National-Level Hackathon Project | Track: AI Automation with n8n**  
> **Core Principle:** `REAL-WORLD EVENT → AI UNDERSTANDS CONTEXT → AI REASONS → AI DECIDES → n8n ORCHESTRATES → MONITOR → FOLLOW-UP / ESCALATE → HUMAN ONLY WHEN NECESSARY`

---

## 🌟 The One-Line Pitch

> **“Traditional automation executes predefined workflows. AI Operations Autopilot decides what workflow should happen based on context.”**  
> **“AI is the decision layer. n8n is the execution layer.”**

---

## 🚀 1. Problem & Solution

### The Problem
Operational organizations receive critical information through fragmented channels (customer emails, support chats, database alerts, invoices, registration forms). Human operators spend substantial time reading unstructured text, querying databases, determining urgency, and choosing which script or department to notify.

### The Solution: AI Operations Autopilot
AI Operations Autopilot ingests the raw operational situation, extracts structured context, performs multi-factor policy reasoning, dynamically generates an action plan, triggers multi-node workflows across **n8n**, continuously monitors the outcome, and involves a human supervisor only when financial or confidence safety thresholds are exceeded.

---

## 🏆 2. Primary Live Demo Scenario

**Domain:** E-Commerce Customer Support Operations  
**Incoming Situation:**
> *“Customer says their ₹18,500 order hasn't arrived and they need it for a wedding tomorrow. They already contacted support twice.”*

### Extracted Intelligence:
* **Intent:** Delivery Escalation
* **Priority:** Critical (Urgency SLA: < 2 Hours)
* **Customer Risk:** High (Lifetime Value: ₹142,000, VIP Gold)
* **Order Value:** ₹18,500 (#ORD-48291 Wedding Silk Sherwani)
* **Deadline:** Tomorrow 14:00 Local
* **Previous Inquiries:** 2 in past 24 hours
* **AI Confidence:** 94%
* **Human Approval Required:** False (Autonomous policy approved)

### Dynamic Action Plan Executed via n8n:
1. Identify customer identity & VIP Gold tier in PostgreSQL DB
2. Retrieve Order #ORD-48291 item details & courier transit status
3. Query BlueDart carrier API (Halted at North Logistics Hub Bay 4)
4. Check previous support tickets in Zendesk (2 unassigned chats)
5. Determine escalation tier (`CRITICAL_EXPEDITE_TIER_1`)
6. Notify North Hub dispatch lead Rahul on Slack (`#dispatch-urgent`)
7. Generate empathetic customer response email with live GPS courier link
8. Arm automated 2-hour cron follow-up checkpoint in n8n
9. Recheck carrier sensor telemetry (confirmed flight BD-402 departure)
10. Final Status: **RESOLVED (18 minutes of human triage saved)**

---

## 🏗️ 3. System Architecture

```text
                    USER / EVENT INGEST
                             │
                             ▼
                     AI CONTEXT ENGINE
                             │
             ┌───────────────┴───────────────┐
             ▼                               ▼
     Data Sources (DB/CRM)            AI Reasoning Engine
     (PostgreSQL, Orders)            (Risk & Safety Policy)
             │                               │
             └───────────────┬───────────────┘
                             ▼
                     AI DECISION ROOM
                             │
                             ▼
                  n8n WORKFLOW ORCHESTRATOR
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
           Database        Email       Team Alerts
         (PostgreSQL)    (SendGrid)   (Slack/WhatsApp)
              │              │              │
              └──────────────┼──────────────┘
                             ▼
               AUTONOMOUS RESOLUTION MONITOR
                             │
                    ┌────────┴────────┐
                    ▼                 ▼
                 RESOLVED      HUMAN GATEWAY (HITL)
                (100% Auto)    (Exceptions / Financial Limits)
```

---

## 📊 4. Data Flow Diagram (DFD)

### Level 0 Context Diagram
```text
[ Operational Ingest ] ───► ( 0.0 AI Operations Autopilot ) ───► [ External Services ]
(Emails, Forms, Webhooks)       │ Decision Layer: AI               (PostgreSQL, Slack, SendGrid)
                                │ Execution Layer: n8n
                                ▼
                        [ Result & Audit ]
```

### Level 1 Decomposition
```text
User Event ──► [1.0 Input Processing] ──► [2.0 Context Retrieval] (D1: Customer DB)
                     │
                     ▼
           [3.0 AI Analysis] ◄── (D4: Business Rules & Knowledge Base)
                     │
                     ▼
           [4.0 Decision Engine] ──► (D2: Task State DB)
                     │
                     ▼
           [5.0 n8n Execution] ──► (D3: Audit Logs)
                     │
                     ▼
           [6.0 Continuous Monitoring] ──► [ Resolved ✓ ] OR [ Human Escalation ]
```

---

## 🎯 5. Multi-Domain Cross-Engine Support

| Domain | Operational Situation | AI Decision & n8n Action | Human-in-the-Loop Gate |
|---|---|---|---|
| **Customer Operations** | Delayed ₹18,500 wedding order (#ORD-48291) | Dispatch Slack alert to North Hub + SendGrid tracking + 2h cron | ❌ Auto-Resolved (94% Conf.) |
| **HR Operations** | Candidate resume received (Sarah Jenkins, 6y React) | Match 92% Req #ENG-402 + Calendly screening invite + Slack alert | ❌ Auto-Completed (92% Conf.) |
| **College Admin** | 350 registrations, 42 missing mandatory ID proofs | Filter Sheet + 42 WhatsApp magic upload links + Notion desk task | ❌ Auto-Completed (96% Conf.) |
| **Business Operations**| Invoice #INV-1092 dispute (₹18,500 refund request) | Check ledger, halt autonomous release (>₹10k limit), route to supervisor | ⚠️ **Human Approval Required** (71% Conf.) |

---

## 🛡️ 6. Responsible Automation & Safety Framework

* **Human-in-the-Loop (HITL):** Financial refunds above ₹10,000 or AI confidence below 85% automatically generate a 1-click supervisor sign-off gate (`Approve` / `Reject` / `Modify`).
* **Explainable Decisions:** Clear, human-readable rationale displayed without leaking raw internal chain-of-thought tokens.
* **Immutable Audit Trail:** Every event, priority classification, decision factor, and node latency stored with full JSON telemetry inspection.
* **No Fabricated Actions:** Clear distinction between live n8n webhooks and high-fidelity local demo simulations.

---

## 💻 7. Technology Stack

* **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Canvas Confetti
* **Decision Layer:** Deterministic AI Context & Reasoning Engine
* **Execution Layer:** n8n Workflow Orchestrator
* **Database & Mock Telemetry:** PostgreSQL CRM Schemas & JSON Data Stores

---

## ⚡ 8. Installation & Setup

```bash
# 1. Clone or navigate to the repository
cd ai-operations-autopilot

# 2. Install dependencies
npm install

# 3. Configure environment variables (optional)
cp .env.example .env

# 4. Start development server
npm run dev

# 5. Open browser at:
# http://localhost:5173
```

---

## 🔌 9. n8n Workflow Import Guide

Ready-to-import n8n workflow blueprints are provided in the `/n8n` directory:
1. `n8n/customer-operations.json` — E-commerce delayed order priority dispatch & monitoring cron.
2. `n8n/hr-operations.json` — Candidate screening, ATS ingestion, and Calendly invitation.
3. `n8n/college-operations.json` — Google Sheets compliance filter, WhatsApp tokens, and Notion tasking.
4. `n8n/business-operations.json` — High-value refund approval gate & accounting ledger verification.

### Webhook Configuration:
In `.env`:
```env
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/customer-operations
```

---

## ⏱️ 10. 3-Minute Live Hackathon Demo (Judge Guide)

1. Click **START 3-MIN DEMO** in the top navigation bar.
2. Watch the **11-step automated sequence** transition smoothly through context ingestion, priority calculation, Slack dispatch, email tracking, and carrier sensor departure confirmation.
3. Use the **Pause**, **Replay**, or **Skip to Result** controls at any time.
4. Inspect the **AI Decision Room** and **Audit Trail** to see raw node telemetry and explainability factors.

---

**Developed for the National AI + n8n Hackathon 2026**
