# 🎬 3-Minute Judge Demonstration Script

## Primary Scenario: E-Commerce Delayed Wedding Order

1. **The Event:** Customer Priya Mehta sends:
   > *"Customer says their ₹18,500 order hasn't arrived and they need it for a wedding tomorrow. They already contacted support twice."*
2. **Context Understanding:** AI parses intent: `Delivery Escalation`, priority: `Critical`, risk: `High`, deadline: `Tomorrow`, complaints: `2`, confidence: `94%`.
3. **AI Decision Room:** Reasons that order value (₹18,500) and strict wedding deadline warrant instant high-priority courier reroute.
4. **n8n Orchestration:** Triggers `/webhook/customer-operations`, queries database, alerts Slack `#dispatch-urgent`, sends customer email with live GPS link, and schedules 2-hour monitoring cron.
5. **Resolution Watchdog:** Confirms courier handoff scan at North Hub and verifies resolution without human burden.
6. **Result:** **18 minutes human time saved**, zero manual data entry, 100% audit log trail.
