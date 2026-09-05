"use client";

import { use } from "react";
import Link from "next/link";
import { useProcureTraceStore } from "@/lib/store/useStore";
import { 
  ArrowLeft, 
  Play, 
  Network, 
  Sparkles,
  Info,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

export default function CaseDetailPage({ params }: { params: Promise<{ caseId: string }> }) {
  const resolvedParams = use(params);
  const caseId = resolvedParams.caseId;

  const { cases, evidence, procurements, vendors, shipments, runAgentInvestigation, isAgentRunning, agentTrace, updateCaseStatus } = useProcureTraceStore();

  const caseData = cases.find((c) => c.id === caseId) || cases[0];
  const procurement = procurements.find((p) => p.id === caseData.procurementId) || procurements[0];
  const vendor = vendors.find((v) => v.id === caseData.vendorId) || vendors[0];
  const caseEvidence = evidence.filter((e) => e.caseId === caseData.id);
  const caseShipment = shipments.find((s) => s.procurementId === caseData.procurementId);

  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto pb-20">
      
      {/* Top Header */}
      <div className="space-y-4">
        <Link href="/cases" className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Priority Cases
        </Link>

        <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-medium tracking-tight text-white">{caseData.id}</span>
              
              <div className="spec-container">
                <span className={`px-3 py-1 rounded text-xs font-bold ${
                  caseData.priorityScore >= 90 ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                }`}>
                  Score {caseData.priorityScore}/100
                </span>
                <div className="spec-tooltip text-left w-48">
                  <strong>Priority Score</strong>
                  Determined by combining price deviation, vendor history, and shipment discrepancies.
                </div>
              </div>

            </div>
            <p className="text-sm font-medium text-neutral-400">{procurement.title}</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={caseData.status}
              onChange={(e) => updateCaseStatus(caseData.id, e.target.value as any)}
              className="bg-[#111111] border border-[#262626] text-xs text-neutral-300 rounded-full px-4 py-2 focus:outline-none"
            >
              <option value="NEW">Status: NEW</option>
              <option value="REVIEW">Status: IN REVIEW</option>
              <option value="MORE_EVIDENCE">Status: MORE EVIDENCE</option>
              <option value="RESOLVED">Status: RESOLVED</option>
            </select>

            <button
              onClick={() => runAgentInvestigation(caseData.id)}
              disabled={isAgentRunning}
              className="flex items-center gap-2 bg-orange-gradient hover:opacity-90 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-opacity shadow-[0_0_15px_rgba(249,115,22,0.3)] disabled:opacity-50 disabled:shadow-none"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              {isAgentRunning ? "Agent Analyzing..." : "Run AI Investigation"}
            </button>
          </div>
        </div>
      </div>

      {/* 3-COLUMN WORKSPACE */}
      <div className="grid grid-cols-12 gap-6 min-h-[440px]">
        
        {/* Column 1: Context & Signals */}
        <div className="col-span-12 lg:col-span-4 glass-panel p-6 rounded-2xl flex flex-col space-y-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 border-b border-[#1a1a1a] pb-3">
            Primary Anomaly Signals
          </h2>

          <div className="spec-container">
            <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Main Risk Signal</span>
              <p className="text-sm font-medium text-white">{caseData.primarySignal}</p>
            </div>
            <div className="spec-tooltip text-left w-64">
              <strong>Context Note</strong>
              Winning bid price deviates by +{procurement.priceDeviation}% from regional benchmark medians. Co-bidding history shows repeated participation alongside BioTech Solutions.
            </div>
          </div>

          <div className="space-y-3 text-xs pt-4">
            <div className="flex justify-between py-2 border-b border-[#1a1a1a]">
              <span className="text-neutral-500">Winning Vendor</span>
              <Link href="/network" className="text-orange-500 font-medium hover:underline">{vendor.name}</Link>
            </div>
            <div className="spec-container">
              <div className="flex justify-between py-2 border-b border-[#1a1a1a]">
                <span className="text-neutral-500">Vendor Win Rate</span>
                <span className="text-white font-medium">{(vendor.winRate * 100).toFixed(0)}%</span>
              </div>
              <div className="spec-tooltip">
                <strong>Population Avg: 22%</strong>
                This vendor wins disproportionately in this specific category.
              </div>
            </div>
            <div className="spec-container">
              <div className="flex justify-between py-2 border-b border-[#1a1a1a]">
                <span className="text-neutral-500">Shipment Status</span>
                <span className="text-red-500 font-medium">DISCREPANCY</span>
              </div>
              <div className="spec-tooltip">
                <strong>-30 units missing</strong>
                Warehouse B scan receipt does not match dispatch manifest.
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Minimalist Node Graph */}
        <div className="col-span-12 lg:col-span-5 glass-panel p-6 rounded-2xl flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3 mb-6 z-10">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
              <Network className="h-3.5 w-3.5" /> Evidence Relationship Graph
            </h2>
          </div>

          <div className="flex-1 relative flex items-center justify-center">
            {/* Minimal SVG Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <line x1="20%" y1="50%" x2="50%" y2="25%" stroke="#ffffff" strokeWidth="1" strokeDasharray="4" />
              <line x1="20%" y1="50%" x2="50%" y2="50%" stroke="#ffffff" strokeWidth="1" />
              <line x1="20%" y1="50%" x2="50%" y2="75%" stroke="#f97316" strokeWidth="1" />
            </svg>

            {/* Target Case Node */}
            <div className="spec-container absolute left-[8%] top-[42%] bg-[#111111] border border-white text-white p-3 rounded-xl text-center shadow-[0_0_15px_rgba(255,255,255,0.1)] w-28">
              <p className="text-xs font-bold">{caseData.id}</p>
              <div className="spec-tooltip text-left w-48">
                <strong>Target Audit Case</strong>
                Base record originating from Department of Health.
              </div>
            </div>

            {/* Connected Nodes */}
            <div className="absolute left-[50%] top-[18%] bg-[#111111] border border-[#333] text-white p-3 rounded-lg text-center text-xs w-36">
              <p className="font-medium text-neutral-300">Price +53% Surge</p>
            </div>

            <div className="absolute left-[50%] top-[42%] bg-[#111111] border border-[#333] text-white p-3 rounded-lg text-center text-xs w-36">
              <p className="font-medium text-neutral-300">Co-Bidding Pair</p>
            </div>

            <div className="absolute left-[50%] top-[66%] bg-[#111111] border border-orange-500/50 text-orange-500 p-3 rounded-lg text-center text-xs w-36">
              <p className="font-medium">-30 Unit Discrepancy</p>
            </div>
          </div>
        </div>

        {/* Column 3: AI Trace */}
        <div className="col-span-12 lg:col-span-3 glass-panel p-6 rounded-2xl flex flex-col">
          <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3 mb-4">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" /> Agent Trace
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {agentTrace.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 text-neutral-600">
                <p className="text-xs">Click "Run AI Investigation" to trigger real-time tool execution.</p>
              </div>
            ) : (
              agentTrace.map((t) => (
                <div key={t.id} className="bg-[#0a0a0a] border border-[#1f1f1f] p-3 rounded-lg space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 font-medium text-[10px]">{t.step}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      t.status === "OK" ? "bg-green-500/10 text-green-500" :
                      t.status === "WARN" ? "bg-orange-500/10 text-orange-500" :
                      "bg-[#1f1f1f] text-neutral-300"
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <p className="text-neutral-500 text-[10px] font-sans leading-relaxed">{t.details}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
