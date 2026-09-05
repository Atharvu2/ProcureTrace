"use client";

import { useProcureTraceStore } from "@/lib/store/useStore";
import { Printer } from "lucide-react";
import Link from "next/link";

export default function ReportsPage() {
  const { cases, evidence, procurements } = useProcureTraceStore();
  const caseA = cases[0];
  const procA = procurements[0];

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <header className="flex items-end justify-between border-b border-[#1a1a1a] pb-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-white mb-1">Investigation Reports</h1>
          <p className="text-neutral-500 text-sm">Generate and export official audit findings and evidentiary dossiers.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#262626] text-white text-xs px-3 py-2 rounded-lg transition-colors">
            <Printer className="h-4 w-4" /> Print / Export PDF
          </button>
        </div>
      </header>

      {/* Generated Dossier Preview */}
      <div className="glass-panel rounded-xl p-8 space-y-6 text-xs text-neutral-400">
        <div className="border-b border-[#1a1a1a] pb-4 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-medium text-white uppercase tracking-wider">Official Procurement Audit Report</h2>
            <p className="text-neutral-500">Dossier ID: RPT-2026-PROC482</p>
          </div>
          <span className="bg-red-500/10 border border-red-500/20 text-red-400 font-semibold px-3 py-1 rounded">
            PRIORITY 94 / HIGH RISK
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-[#0a0a0a] p-4 rounded-lg border border-[#1a1a1a]">
          <div>
            <span className="text-neutral-600">Case Reference</span>
            <p className="font-medium text-white mt-0.5">{caseA.id}</p>
          </div>
          <div>
            <span className="text-neutral-600">Procurement Title</span>
            <p className="font-medium text-white mt-0.5">{procA.title}</p>
          </div>
          <div>
            <span className="text-neutral-600">Department</span>
            <p className="text-neutral-300 mt-0.5">{caseA.department}</p>
          </div>
          <div>
            <span className="text-neutral-600">Primary Signal</span>
            <p className="text-amber-400 font-medium mt-0.5">{caseA.primarySignal}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-white uppercase tracking-wider">Executive Findings Summary</h3>
          <p className="text-neutral-400 leading-relaxed">
            ProcureTrace automated anomaly detection flagged PROC-482 due to a +53.2% price surge above regional median benchmarks, combined with repeated co-bidding patterns between Apex Medical Supplies Ltd and BioTech Solutions Corp across 14 consecutive tenders. Physical shipment logs further reveal a -30 unit discrepancy at receiving Warehouse B, followed by an unauthorized manual record override.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-white uppercase tracking-wider">Registered Evidence Claims</h3>
          <div className="border border-[#1a1a1a] rounded-lg divide-y divide-[#1a1a1a]">
            {evidence.filter(e => e.caseId === caseA.id).map(e => (
              <div key={e.id} className="p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-neutral-300">{e.id} — {e.type}</p>
                  <p className="text-neutral-500 mt-0.5">{e.claim}</p>
                </div>
                <span className="font-medium text-emerald-400">{e.confidence}% Confidence</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
