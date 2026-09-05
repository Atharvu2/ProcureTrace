export type PriorityStatus = "NEW" | "REVIEW" | "MORE_EVIDENCE" | "RESOLVED";

export interface Vendor {
  id: string;
  name: string;
  category: string;
  winRate: number;
  totalContracts: number;
  avgPriceDeviation: number;
  prioritizedCases: number;
  riskScore: number;
  connectedBidders: string[];
  connectedTransporters: string[];
}

export interface Procurement {
  id: string;
  title: string;
  department: string;
  category: string;
  region: string;
  date: string;
  expectedPrice: number;
  winningPrice: number;
  unitPrice: number;
  quantity: number;
  winningVendorId: string;
  status: "AWARDED" | "PENDING" | "UNDER_REVIEW";
  priceDeviation: number;
}

export interface Bid {
  id: string;
  procurementId: string;
  vendorId: string;
  amount: number;
  unitPrice: number;
  submissionDate: string;
  isWinning: boolean;
}

export interface Contract {
  id: string;
  procurementId: string;
  vendorId: string;
  amount: number;
  signedDate: string;
  status: "ACTIVE" | "COMPLETED" | "AUDITED";
}

export interface Transporter {
  id: string;
  name: string;
  riskScore: number;
}

export interface Warehouse {
  id: string;
  name: string;
  region: string;
}

export interface Shipment {
  id: string;
  procurementId: string;
  contractId: string;
  vendorId: string;
  transporterId: string;
  warehouseId: string;
  expectedQuantity: number;
  receivedQuantity: number;
  delta: number;
  dispatchDate: string;
  receiveDate: string;
  status: "DELIVERED" | "DISCREPANCY" | "MODIFIED_RECORD" | "IN_TRANSIT";
}

export interface Evidence {
  id: string;
  caseId: string;
  type: string;
  claim: string;
  currentValue: string;
  medianValue: string;
  deviation: string;
  sourceRecord: string;
  sourceTable: string;
  timestamp: string;
  confidence: number;
  calculationMethod: string;
}

export interface Case {
  id: string;
  procurementId: string;
  vendorId: string;
  department: string;
  priorityScore: number;
  confidence: number;
  primarySignal: string;
  anomaliesCount: number;
  status: PriorityStatus;
  lastUpdated: string;
  relatedCaseIds: string[];
  investigatorNotes?: string;
  classification?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entityId: string;
  entityType: string;
  previousValue: string;
  newValue: string;
  source: string;
}
