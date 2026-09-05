"use client";

import { useProcureTraceStore } from "@/lib/store/useStore";
import { Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function EvidencePage() {
  const { evidence } = useProcureTraceStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvidence = evidence.filter((e) =>
    e.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.claim.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <header className="flex items-end justify-between border-b border-[#1a1a1a] pb-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-white mb-1">Evidence Explorer</h1>
          <p className="text-neutral-500 text-sm">Auditable, evidence-first signal catalog powered by deterministic algorithms.</p>
        </div>
      </header>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 glass-panel p-4 rounded-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-600" />
          <input
            type="text"
            placeholder="Search evidence IDs, claims, source records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500/50"
          />
        </div>
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-2 gap-6">
        {filteredEvidence.map((e) => (
          <div key={e.id} className="glass-panel glass-panel-interactive p-6 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-orange-400">{e.id}</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#1a1a1a] text-neutral-400 border border-[#262626]">
                  {e.type}
                </span>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                {e.confidence}% Confidence
              </span>
            </div>

            <p className="text-sm font-medium text-neutral-200">{e.claim}</p>

            <div className="grid grid-cols-3 gap-3 bg-[#0a0a0a] p-3 rounded-lg text-xs border border-[#1a1a1a]">
              <div>
                <span className="text-neutral-600">Observed Value</span>
                <p className="font-semibold text-red-400 mt-0.5">{e.currentValue}</p>
              </div>
              <div>
                <span className="text-neutral-600">Median Benchmark</span>
                <p className="font-semibold text-neutral-300 mt-0.5">{e.medianValue}</p>
              </div>
              <div>
                <span className="text-neutral-600">Deviation</span>
                <p className="font-semibold text-amber-400 mt-0.5">{e.deviation}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-500 pt-2">
              <span className="font-mono">Source: {e.sourceRecord} ({e.sourceTable})</span>
              <Link href={`/cases/${e.caseId}`} className="text-orange-400 hover:underline">
                View Parent Case
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
