"use client";

import { useState } from "react";
import { useProcureTraceStore } from "@/lib/store/useStore";
import { Network, Building2 } from "lucide-react";
import Link from "next/link";

export default function NetworkPage() {
  const { vendors, cases } = useProcureTraceStore();
  const [selectedVendorId, setSelectedVendorId] = useState<string>("VEN-9921");

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId) || vendors[0];
  const connectedCases = cases.filter((c) => c.vendorId === selectedVendor.id);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <header className="flex items-end justify-between border-b border-[#1a1a1a] pb-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-white mb-1">Procurement Network</h1>
          <p className="text-neutral-500 text-sm">Explore relationships between vendors, bidders, transporters and procurement cases.</p>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="grid grid-cols-12 gap-6 flex-1 min-h-[550px]">
        {/* Left: Network Graph Surface */}
        <div className="col-span-8 glass-panel rounded-xl p-6 flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3 mb-4">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest">Interactive Relationship Graph</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-neutral-500">Live Entity Mapping</span>
            </div>
          </div>

          <div className="flex-1 bg-[#050505] border border-[#111] rounded-lg p-8 relative flex items-center justify-center">
            {/* SVG Link lines — warm palette, no blue */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="50%" y1="50%" x2="20%" y2="25%" stroke="#f97316" strokeWidth="1" strokeDasharray="4" />
              <line x1="50%" y1="50%" x2="20%" y2="75%" stroke="#f97316" strokeWidth="1" strokeDasharray="4" />
              <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="#ef4444" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="#f59e0b" strokeWidth="1" />
            </svg>

            {/* Central Vendor Node */}
            <div className="absolute left-[40%] top-[40%] bg-orange-600 border-2 border-white text-white p-4 rounded-xl text-center shadow-lg cursor-pointer z-10 w-44">
              <Building2 className="h-6 w-6 mx-auto mb-1" />
              <p className="text-xs font-semibold">{selectedVendor.name}</p>
              <p className="text-[10px] text-orange-200">{selectedVendor.id}</p>
            </div>

            {/* Co-Bidder Nodes */}
            {vendors.filter(v => v.id !== selectedVendor.id).slice(0, 2).map((v, idx) => (
              <div
                key={v.id}
                onClick={() => setSelectedVendorId(v.id)}
                style={{ top: `${20 + idx * 50}%`, left: '15%' }}
                className="absolute bg-[#111] border border-[#333] hover:border-orange-500/50 text-neutral-300 p-3 rounded-lg text-center cursor-pointer transition-all w-36"
              >
                <p className="text-xs font-medium">{v.name}</p>
                <p className="text-[10px] text-neutral-500">Co-Bidder</p>
              </div>
            ))}

            {/* Case Nodes */}
            {connectedCases.map((c, idx) => (
              <div
                key={c.id}
                style={{ top: `${25 + idx * 40}%`, left: '75%' }}
                className="absolute bg-red-950/40 border border-red-500/40 text-red-400 p-3 rounded-lg text-center cursor-pointer transition-all w-36"
              >
                <p className="text-xs font-semibold">{c.id}</p>
                <p className="text-[10px] text-red-300/70">Case Priority {c.priorityScore}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Inspector Panel */}
        <div className="col-span-4 glass-panel rounded-xl p-6 space-y-6 overflow-y-auto">
          <div className="border-b border-[#1a1a1a] pb-3">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Entity Inspector</span>
            <h2 className="text-lg font-medium text-white mt-1">{selectedVendor.name}</h2>
            <p className="text-xs text-neutral-500 font-mono">{selectedVendor.id} • {selectedVendor.category}</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-[#1a1a1a]">
              <span className="text-neutral-600">Win Rate</span>
              <p className="text-lg font-medium text-white mt-0.5">{(selectedVendor.winRate * 100).toFixed(0)}%</p>
            </div>
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-[#1a1a1a]">
              <span className="text-neutral-600">Total Contracts</span>
              <p className="text-lg font-medium text-white mt-0.5">{selectedVendor.totalContracts}</p>
            </div>
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-[#1a1a1a]">
              <span className="text-neutral-600">Avg Price Dev</span>
              <p className="text-lg font-medium text-red-400 mt-0.5">+{selectedVendor.avgPriceDeviation}%</p>
            </div>
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-[#1a1a1a]">
              <span className="text-neutral-600">Risk Score</span>
              <p className="text-lg font-medium text-amber-400 mt-0.5">{selectedVendor.riskScore}/100</p>
            </div>
          </div>

          {/* Connected Cases */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Connected Cases ({connectedCases.length})</h3>
            <div className="space-y-2">
              {connectedCases.map((c) => (
                <div key={c.id} className="bg-[#0a0a0a] border border-[#1a1a1a] p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">{c.id}</p>
                    <p className="text-[11px] text-amber-400">{c.primarySignal}</p>
                  </div>
                  <Link href={`/cases/${c.id}`} className="text-xs bg-orange-600 hover:bg-orange-500 text-white px-2.5 py-1 rounded-full">
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
