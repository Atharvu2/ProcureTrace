import { create } from "zustand";
import { Case, Evidence, Vendor, Procurement, Shipment, AuditEvent } from "@/lib/data/types";
import { mockCases, mockEvidence, mockVendors, mockProcurements, mockShipments, mockAuditEvents } from "@/lib/data/mock-dataset";

interface AgentTraceStep {
  id: string;
  step: string;
  status: "RUNNING" | "OK" | "WARN" | "DONE";
  details: string;
  timestamp: string;
}

interface ProcureTraceState {
  cases: Case[];
  evidence: Evidence[];
  vendors: Vendor[];
  procurements: Procurement[];
  shipments: Shipment[];
  auditEvents: AuditEvent[];
  
  // Agent State
  isAgentRunning: boolean;
  agentTrace: AgentTraceStep[];
  
  // Global Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Actions
  updateCaseStatus: (caseId: string, status: Case["status"]) => void;
  updateCaseNotes: (caseId: string, notes: string, classification?: string) => void;
  runAgentInvestigation: (caseId: string) => Promise<void>;
  addAuditEvent: (event: Omit<AuditEvent, "id" | "timestamp">) => void;
}

export const useProcureTraceStore = create<ProcureTraceState>((set, get) => ({
  cases: mockCases,
  evidence: mockEvidence,
  vendors: mockVendors,
  procurements: mockProcurements,
  shipments: mockShipments,
  auditEvents: mockAuditEvents,
  
  isAgentRunning: false,
  agentTrace: [],
  
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  updateCaseStatus: (caseId, status) => {
    set((state) => ({
      cases: state.cases.map((c) => (c.id === caseId ? { ...c, status, lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16) } : c))
    }));
    get().addAuditEvent({
      actor: "HUMAN_INVESTIGATOR",
      action: "CASE_STATUS_CHANGED",
      entityId: caseId,
      entityType: "cases",
      previousValue: "PREVIOUS",
      newValue: status,
      source: "UI_ACTION"
    });
  },

  updateCaseNotes: (caseId, notes, classification) => {
    set((state) => ({
      cases: state.cases.map((c) => (c.id === caseId ? { ...c, investigatorNotes: notes, classification: classification || c.classification } : c))
    }));
  },

  addAuditEvent: (event) => {
    const newEvent: AuditEvent = {
      ...event,
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    set((state) => ({ auditEvents: [newEvent, ...state.auditEvents] }));
  },

  runAgentInvestigation: async (caseId: string) => {
    set({ isAgentRunning: true, agentTrace: [] });
    
    const addTrace = (step: string, status: AgentTraceStep["status"], details: string) => {
      set((state) => ({
        agentTrace: [
          ...state.agentTrace,
          {
            id: Math.random().toString(),
            step,
            status,
            details,
            timestamp: new Date().toLocaleTimeString()
          }
        ]
      }));
    };

    // Simulated multi-step agent execution
    addTrace(`get_case_evidence(${caseId})`, "RUNNING", "Fetching registered anomalies...");
    await new Promise((r) => setTimeout(r, 600));
    addTrace(`get_case_evidence(${caseId})`, "OK", "3 primary anomaly signals returned");

    addTrace(`get_connected_cases(${caseId}, all)`, "RUNNING", "Scanning co-bidding network...");
    await new Promise((r) => setTimeout(r, 800));
    addTrace(`get_connected_cases(${caseId}, all)`, "WARN", "2 connected cases identified (PROC-721, PROC-201)");

    addTrace("get_vendor_history(VEN-9921)", "RUNNING", "Analyzing win rate metrics across 20 tenders...");
    await new Promise((r) => setTimeout(r, 700));
    addTrace("get_vendor_history(VEN-9921)", "OK", "Historical win rate: 85% (Population Avg: 22%)");

    addTrace("get_shipment_history(VEN-9921)", "RUNNING", "Checking physical warehouse manifests...");
    await new Promise((r) => setTimeout(r, 900));
    addTrace("get_shipment_history(VEN-9921)", "WARN", "1 shipment discrepancy detected (-30 units, retroactively modified)");

    addTrace("synthesize_investigation_brief()", "DONE", "Investigation brief and graph updated.");
    
    set({ isAgentRunning: false });
  }
}));
