"use client";

import Link from "next/link";
import { useProcureTraceStore } from "@/lib/store/useStore";
import { Filter, Search, Eye, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function CasesPage() {
  const { cases, vendors } = useProcureTraceStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredCases = cases.filter((c) => {
    const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-16">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-[#1a1a1a] pb-5">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-white mb-1">Investigation Cases</h1>
          <p className="text-neutral-500 text-sm">{cases.length} prioritized cases requiring human auditor review</p>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-600" />
          <input
            type="text"
            placeholder="Search case ID, department, or signal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500/50"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Filter className="h-3.5 w-3.5 text-neutral-500" /> Status:
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0a0a0a] border border-[#1f1f1f] text-xs text-neutral-300 rounded-lg px-3.5 py-2 focus:outline-none"
          >
            <option value="ALL">ALL STATUSES</option>
            <option value="NEW">NEW</option>
            <option value="REVIEW">IN REVIEW</option>
            <option value="MORE_EVIDENCE">MORE EVIDENCE</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>
      </div>

      {/* Cases Cards */}
      <div className="space-y-4">
        {filteredCases.map((c) => {
          const vendor = vendors.find((v) => v.id === c.vendorId);
          return (
            <div key={c.id} className="glass-panel glass-panel-interactive p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-l-2 border-l-orange-500">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-base font-medium text-white">{c.id}</span>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                    c.priorityScore >= 90 ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                  }`}>
                    Priority {c.priorityScore}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">{c.confidence}% Confidence</span>
                  <span className="text-xs bg-[#1a1a1a] text-neutral-300 font-medium px-2.5 py-0.5 rounded-full">{c.status}</span>
                </div>

                <p className="text-xs font-medium text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                  {c.primarySignal}
                </p>

                <div className="flex items-center gap-6 text-xs text-neutral-500 pt-1">
                  <span>Department: <strong className="text-neutral-300">{c.department}</strong></span>
                  <span>Vendor: <strong className="text-neutral-300">{vendor?.name}</strong></span>
                  <span>Anomalies: <strong className="text-neutral-300">{c.anomaliesCount} signals</strong></span>
                </div>
              </div>

              <Link
                href={`/cases/${c.id}`}
                className="bg-orange-gradient hover:opacity-90 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-opacity shadow-[0_0_15px_rgba(249,115,22,0.2)] shrink-0 flex items-center gap-2"
              >
                <Eye className="h-4 w-4" /> Investigate
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
