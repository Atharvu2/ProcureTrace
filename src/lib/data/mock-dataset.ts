import { Vendor, Procurement, Bid, Contract, Transporter, Warehouse, Shipment, Evidence, Case, AuditEvent } from "./types";

// Curated Vendors
export const mockVendors: Vendor[] = [
  {
    id: "VEN-9921",
    name: "Apex Medical Supplies Ltd",
    category: "Healthcare Logistics",
    winRate: 0.85,
    totalContracts: 20,
    avgPriceDeviation: 48.5,
    prioritizedCases: 3,
    riskScore: 92,
    connectedBidders: ["VEN-1042", "VEN-8831"],
    connectedTransporters: ["TRN-882", "TRN-901"]
  },
  {
    id: "VEN-1042",
    name: "BioTech Solutions Corp",
    category: "Healthcare Logistics",
    winRate: 0.25,
    totalContracts: 12,
    avgPriceDeviation: 5.2,
    prioritizedCases: 1,
    riskScore: 68,
    connectedBidders: ["VEN-9921"],
    connectedTransporters: ["TRN-882"]
  },
  {
    id: "VEN-8831",
    name: "Crestview Pharma Distribution",
    category: "Healthcare Logistics",
    winRate: 0.15,
    totalContracts: 8,
    avgPriceDeviation: -2.1,
    prioritizedCases: 1,
    riskScore: 45,
    connectedBidders: ["VEN-9921"],
    connectedTransporters: ["TRN-105"]
  },
  {
    id: "VEN-4029",
    name: "Delta Infrastructure Works",
    category: "Civil Construction",
    winRate: 0.72,
    totalContracts: 18,
    avgPriceDeviation: 32.1,
    prioritizedCases: 2,
    riskScore: 84,
    connectedBidders: ["VEN-5012"],
    connectedTransporters: ["TRN-441"]
  },
  {
    id: "VEN-5012",
    name: "Echo Engineering Services",
    category: "Civil Construction",
    winRate: 0.20,
    totalContracts: 15,
    avgPriceDeviation: 1.4,
    prioritizedCases: 0,
    riskScore: 22,
    connectedBidders: ["VEN-4029"],
    connectedTransporters: ["TRN-441"]
  }
];

// Curated Procurements
export const mockProcurements: Procurement[] = [
  {
    id: "PROC-482",
    title: "High-Volume ICU Ventilator Procurement",
    department: "Department of Health & Human Services",
    category: "Healthcare Equipment",
    region: "Northern District",
    date: "2026-08-14",
    expectedPrice: 53500,
    winningPrice: 82000,
    unitPrice: 82000,
    quantity: 1000,
    winningVendorId: "VEN-9921",
    status: "AWARDED",
    priceDeviation: 53.2
  },
  {
    id: "PROC-721",
    title: "Regional Diagnostic Equipment Supply",
    department: "Department of Health & Human Services",
    category: "Healthcare Equipment",
    region: "Eastern District",
    date: "2026-08-02",
    expectedPrice: 41000,
    winningPrice: 62000,
    unitPrice: 62000,
    quantity: 500,
    winningVendorId: "VEN-9921",
    status: "AWARDED",
    priceDeviation: 51.2
  },
  {
    id: "PROC-109",
    title: "District Infrastructure Repair & Paving",
    department: "Department of Transportation",
    category: "Civil Construction",
    region: "Western District",
    date: "2026-07-28",
    expectedPrice: 1200000,
    winningPrice: 1580000,
    unitPrice: 1580000,
    quantity: 1,
    winningVendorId: "VEN-4029",
    status: "AWARDED",
    priceDeviation: 31.6
  },
  {
    id: "PROC-201",
    title: "Emergency Medical Consumables Batch B",
    department: "Department of Health & Human Services",
    category: "Healthcare Equipment",
    region: "Northern District",
    date: "2026-06-15",
    expectedPrice: 52000,
    winningPrice: 79000,
    unitPrice: 79000,
    quantity: 1200,
    winningVendorId: "VEN-9921",
    status: "AWARDED",
    priceDeviation: 51.9
  }
];

// Curated Cases (Case A, B, C)
export const mockCases: Case[] = [
  {
    id: "PROC-482",
    procurementId: "PROC-482",
    vendorId: "VEN-9921",
    department: "Department of Health & Human Services",
    priorityScore: 94,
    confidence: 88,
    primarySignal: "Co-bidding & Price Surge (+53%)",
    anomaliesCount: 5,
    status: "NEW",
    lastUpdated: "2026-09-05 14:15",
    relatedCaseIds: ["PROC-721", "PROC-201"]
  },
  {
    id: "PROC-721",
    procurementId: "PROC-721",
    vendorId: "VEN-9921",
    department: "Department of Health & Human Services",
    priorityScore: 87,
    confidence: 51,
    primarySignal: "Suspicious win rate (85%) & shipment delta",
    anomaliesCount: 4,
    status: "REVIEW",
    lastUpdated: "2026-09-05 13:40",
    relatedCaseIds: ["PROC-482"]
  },
  {
    id: "PROC-109",
    procurementId: "PROC-109",
    vendorId: "VEN-4029",
    department: "Department of Transportation",
    priorityScore: 71,
    confidence: 93,
    primarySignal: "Benign price deviation due to material cost",
    anomaliesCount: 3,
    status: "REVIEW",
    lastUpdated: "2026-09-04 16:20",
    relatedCaseIds: []
  }
];

// Curated Evidence Items
export const mockEvidence: Evidence[] = [
  {
    id: "EV-482-PRICE-01",
    caseId: "PROC-482",
    type: "PRICE_COMPARISON",
    claim: "Winning unit price is 53% above baseline benchmark for ICU Ventilators.",
    currentValue: "₹82,000",
    medianValue: "₹53,500",
    deviation: "+53.2%",
    sourceRecord: "PROC-482 / CONTRACT-C-8821",
    sourceTable: "contracts",
    timestamp: "2026-08-14 16:30",
    confidence: 97,
    calculationMethod: "Category + quantity + regional baseline median calculation"
  },
  {
    id: "EV-482-BID-02",
    caseId: "PROC-482",
    type: "CO_BIDDING_PATTERN",
    claim: "Apex Medical and BioTech Solutions co-bid in 14 recent tenders with complementary pricing.",
    currentValue: "14 Tenders",
    medianValue: "1.2 Tenders",
    deviation: "+1066%",
    sourceRecord: "BID-9921-A / BID-1042-B",
    sourceTable: "bids",
    timestamp: "2026-08-14 17:00",
    confidence: 91,
    calculationMethod: "Jaccard similarity index on bid participant pairs"
  },
  {
    id: "EV-482-SHIP-03",
    caseId: "PROC-482",
    type: "SHIPMENT_DISCREPANCY",
    claim: "Warehouse B received 30 units less than dispatched; manifest retroactively modified.",
    currentValue: "970 received / 1000 dispatched",
    medianValue: "1000 received",
    deviation: "-3.0%",
    sourceRecord: "SHIP-19382",
    sourceTable: "shipments",
    timestamp: "2026-08-20 11:15",
    confidence: 84,
    calculationMethod: "Physical manifest log matching vs warehouse scan input"
  }
];

// Curated Shipments
export const mockShipments: Shipment[] = [
  {
    id: "SHIP-19382",
    procurementId: "PROC-482",
    contractId: "C-8821",
    vendorId: "VEN-9921",
    transporterId: "TRN-882",
    warehouseId: "WH-NORTH-2",
    expectedQuantity: 1000,
    receivedQuantity: 970,
    delta: -30,
    dispatchDate: "2026-08-18",
    receiveDate: "2026-08-20",
    status: "DISCREPANCY"
  },
  {
    id: "SHIP-19401",
    procurementId: "PROC-721",
    contractId: "C-8902",
    vendorId: "VEN-9921",
    transporterId: "TRN-882",
    warehouseId: "WH-EAST-1",
    expectedQuantity: 500,
    receivedQuantity: 500,
    delta: 0,
    dispatchDate: "2026-08-05",
    receiveDate: "2026-08-07",
    status: "DELIVERED"
  }
];

// Curated Audit Events
export const mockAuditEvents: AuditEvent[] = [
  {
    id: "AUD-9011",
    timestamp: "2026-09-05 14:15:21",
    actor: "WAREHOUSE OFFICER 17",
    action: "RECEIPT_MODIFIED",
    entityId: "SHIP-19382",
    entityType: "shipments",
    previousValue: "970",
    newValue: "1000",
    source: "MANUAL_ENTRY_OVERRIDE"
  },
  {
    id: "AUD-8994",
    timestamp: "2026-09-05 13:41:00",
    actor: "SYSTEM_AGENT_ASTRA",
    action: "ANOMALY_FLAGGED",
    entityId: "PROC-482",
    entityType: "cases",
    previousValue: "PRIORITY_87",
    newValue: "PRIORITY_94",
    source: "DETERMINISTIC_SCORER"
  }
];
