import { Procurement, Vendor, Shipment } from "@/lib/data/types";

export interface AnomalyScoreResult {
  priorityScore: number;
  confidence: number;
  signals: string[];
}

export function calculatePriorityScore(
  procurement: Procurement,
  vendor?: Vendor,
  shipment?: Shipment
): AnomalyScoreResult {
  let score = 0;
  let signals: string[] = [];

  // Price deviation signal
  if (procurement.priceDeviation > 50) {
    score += 40;
    signals.push(`Extreme Price Deviation (+${procurement.priceDeviation.toFixed(1)}%)`);
  } else if (procurement.priceDeviation > 20) {
    score += 20;
    signals.push(`Moderate Price Deviation (+${procurement.priceDeviation.toFixed(1)}%)`);
  }

  // Vendor risk signal
  if (vendor) {
    if (vendor.winRate > 0.8) {
      score += 25;
      signals.push(`Abnormally High Win Rate (${(vendor.winRate * 100).toFixed(0)}%)`);
    }
    if (vendor.connectedBidders.length > 0) {
      score += 15;
      signals.push(`Co-bidding Relationship Detected (${vendor.connectedBidders.length} connected vendors)`);
    }
  }

  // Shipment discrepancy signal
  if (shipment && shipment.status === "DISCREPANCY") {
    score += 20;
    signals.push(`Physical Shipment Quantity Discrepancy (${shipment.delta} units)`);
  }

  const priorityScore = Math.min(100, Math.max(10, score));
  const confidence = Math.round(75 + (signals.length * 5) - (procurement.priceDeviation < 30 ? 15 : 0));

  return {
    priorityScore,
    confidence,
    signals
  };
}
