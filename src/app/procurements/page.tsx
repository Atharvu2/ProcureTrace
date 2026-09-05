"use client";

import { useState } from "react";
import { useProcureTraceStore } from "@/lib/store/useStore";
import { Database } from "lucide-react";

export default function ProcurementsPage() {
  const { procurements, vendors } = useProcureTraceStore();
  const [activeTab, setActiveTab] = useState<"TENDERS" | "VENDORS">("TENDERS");

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <header className="flex items-end justify-between border-b border-[#1a1a1a] pb-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-white mb-1">Procurement Data</h1>
          <p className="text-neutral-500 text-sm">Canonical underlying data ecosystem across tenders, bids, contracts, and vendors.</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1a1a1a] pb-2">
        <button
          onClick={() => setActiveTab("TENDERS")}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
            activeTab === "TENDERS" ? "bg-orange-600 text-white" : "text-neutral-500 hover:text-white hover:bg-[#111]"
          }`}
        >
          Tenders & Procurements
        </button>
        <button
          onClick={() => setActiveTab("VENDORS")}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
            activeTab === "VENDORS" ? "bg-orange-600 text-white" : "text-neutral-500 hover:text-white hover:bg-[#111]"
          }`}
        >
          Registered Vendors
        </button>
      </div>

      {/* Table Content */}
      {activeTab === "TENDERS" ? (
        <div className="glass-panel rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs text-neutral-400">
            <thead className="bg-[#0a0a0a] text-neutral-500 uppercase border-b border-[#1a1a1a]">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Expected Price</th>
                <th className="px-4 py-3">Winning Price</th>
                <th className="px-4 py-3">Deviation</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {procurements.map((p) => (
                <tr key={p.id} className="hover:bg-[#0a0a0a] transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-white">{p.id}</td>
                  <td className="px-4 py-3 text-neutral-300">{p.title}</td>
                  <td className="px-4 py-3 text-neutral-500">{p.department}</td>
                  <td className="px-4 py-3">₹{p.expectedPrice.toLocaleString()}</td>
                  <td className="px-4 py-3 font-medium text-neutral-200">₹{p.winningPrice.toLocaleString()}</td>
                  <td className="px-4 py-3 text-red-400 font-medium">+{p.priceDeviation}%</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-[#1a1a1a] text-neutral-400 font-medium">{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass-panel rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs text-neutral-400">
            <thead className="bg-[#0a0a0a] text-neutral-500 uppercase border-b border-[#1a1a1a]">
              <tr>
                <th className="px-4 py-3">Vendor ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Win Rate</th>
                <th className="px-4 py-3">Contracts</th>
                <th className="px-4 py-3">Avg Deviation</th>
                <th className="px-4 py-3">Risk Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {vendors.map((v) => (
                <tr key={v.id} className="hover:bg-[#0a0a0a] transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-orange-400">{v.id}</td>
                  <td className="px-4 py-3 font-medium text-neutral-200">{v.name}</td>
                  <td className="px-4 py-3 text-neutral-500">{v.category}</td>
                  <td className="px-4 py-3 font-medium text-amber-400">{(v.winRate * 100).toFixed(0)}%</td>
                  <td className="px-4 py-3">{v.totalContracts}</td>
                  <td className="px-4 py-3 text-red-400 font-medium">+{v.avgPriceDeviation}%</td>
                  <td className="px-4 py-3 font-medium text-red-500">{v.riskScore}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
