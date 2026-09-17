# ProcureTrace

**Automated Public Procurement Anomaly Detection**

ProcureTrace is an auditing system we built to tackle a real problem in government procurement: finding the suspicious patterns that manual reviewers miss. The platform ingests tender, bid, vendor, contract, and shipment data, runs deterministic anomaly detection algorithms across it, and surfaces prioritized cases for human investigators.

The core idea isn't just "flag outliers" - it's about helping auditors distinguish genuinely unusual behavior from legitimate market variation, especially in specialized procurement categories where normal looks weird.

![ProcureTrace Dashboard](./docs/screenshot.png)

---

## Problem Statement

> Government procurement generates large volumes of tenders, bids, vendors, contracts, and payments. Most transactions are legitimate, yet unusual bidding behavior, repeated awards, unexplained price differences, or relationships between participants can be difficult to identify through manual review.

## What It Does

ProcureTrace works as a complete investigation workspace, not a single-page dashboard. An auditor can:

1. **Start at the Command Center** - see the overall health of the procurement ecosystem, how many tenders were analyzed, how many got flagged, and what the current high-priority cases are.

2. **Drill into a Case** - each case has a dedicated workspace with three columns: anomaly signals & context, an evidence relationship graph showing how entities connect, and a live AI agent trace that walks through the investigation step by step.

3. **Explore the Network** - an interactive graph showing vendor relationships, co-bidding patterns, and which vendors connect to which flagged cases. Click any node to inspect it.

4. **Browse Raw Data** - full tables for procurements, shipments, vendors, and bids. Everything the system flagged is traceable back to specific rows in the underlying data.

5. **Run an AI Investigation** - click "Run AI Investigation" on any case and watch the autonomous agent execute a multi-step analysis: querying price baselines, checking vendor history, cross-referencing shipment manifests, and producing a structured finding.

6. **Generate Reports** - export audit dossiers with evidence chains, confidence scores, and executive summaries.

---

## How It Works (Technical Architecture)

### Detection Engines

The system runs four parallel detection engines:

- **Price Anomaly Engine** - compares each winning bid against historical regional median baselines. Flags deviations above 20%.
- **Vendor Behavior Engine** - monitors win rates across category populations. A vendor winning 87% in a category where the average is 22% gets flagged.
- **Bid Network Engine** - computes Jaccard similarity coefficients for co-bidding pairs across tender submissions. Identifies vendors that consistently appear together.
- **Shipment Integrity Engine** - cross-checks physical warehouse scan receipts against dispatch manifests. Catches quantity discrepancies and unauthorized record modifications.

### Scoring

Each case gets a composite priority score (0–100) computed deterministically from:
- Price deviation magnitude (weighted)
- Vendor behavioral anomaly indicators
- Co-bidding network density
- Shipment discrepancy severity

The score is fully explainable - every component is traceable to a specific data point.

### Evidence-First Design

Every claim the system makes is backed by:
- The specific database record it references
- The observed value vs. the population median
- The computed deviation
- A confidence percentage

Nothing is a black box. An auditor (or a judge reviewing this) can trace any flag back to the exact row in the data.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State Management | Zustand |
| Charts | Recharts |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Command Center (dashboard)
│   ├── cases/
│   │   ├── page.tsx        # Case directory
│   │   └── [caseId]/
│   │       └── page.tsx    # Investigation workspace (hero page)
│   ├── network/            # Vendor relationship graph
│   ├── evidence/           # Evidence explorer
│   ├── procurements/       # Raw procurement data tables
│   ├── shipments/          # Shipment operations & integrity
│   ├── analytics/          # Population-level analytics
│   ├── audit/              # Immutable system audit log
│   ├── reports/            # Exportable audit dossiers
│   └── settings/           # System configuration & engine status
├── components/
│   └── layout/
│       ├── Sidebar.tsx     # Persistent navigation
│       └── Header.tsx      # Global search & status
└── lib/
    ├── data/
    │   ├── types.ts        # TypeScript interfaces
    │   └── mock-dataset.ts # Interconnected synthetic dataset
    ├── store/
    │   └── useStore.ts     # Zustand global state + agent simulation
    ├── analysis/
    │   └── score.ts        # Deterministic anomaly scoring
    └── utils.ts            # Utility functions
```

---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/ProcureTrace.git
cd ProcureTrace

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).


---

## Design Decisions

**Why deterministic scoring over ML?** For a government auditing tool, explainability matters more than accuracy. Every score component maps to a specific, auditable formula. An investigator needs to defend findings in court - "the model said so" doesn't work.

**Why a unified dataset?** Every entity ID (PROC-482, VEN-9921, SHIP-19382) is consistent across every page. Click a vendor in the network graph and the same vendor appears in the procurement tables, shipment logs, and case files. This isn't multiple disconnected demos - it's one coherent data model.

**Why the agent trace?** Modern auditing tools need to show their work. The AI investigation feature doesn't just produce a conclusion - it shows each step: which database was queried, what was found, how it connects to the existing evidence, and what the confidence level is.

---
