"use client";

import { useProcureTraceStore } from "@/lib/store/useStore";
import { Truck } from "lucide-react";

export default function ShipmentsPage() {
  const { shipments, vendors } = useProcureTraceStore();

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <header className="flex items-end justify-between border-b border-[#1a1a1a] pb-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-white mb-1">Shipment Operations</h1>
          <p className="text-neutral-500 text-sm">Physical receipt verification and manifest integrity monitoring.</p>
        </div>
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4">
          <span className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest">Total Tracked Shipments</span>
          <p className="text-2xl font-medium text-white mt-1">{shipments.length * 125}</p>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <span className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest">Discrepancies Flagged</span>
          <p className="text-2xl font-medium text-red-400 mt-1">{shipments.filter(s => s.status === 'DISCREPANCY').length}</p>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <span className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest">Modified Records</span>
          <p className="text-2xl font-medium text-amber-400 mt-1">1</p>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <span className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest">Delivery Integrity</span>
          <p className="text-2xl font-medium text-emerald-400 mt-1">98.2%</p>
        </div>
      </div>

      {/* Shipment Table */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs text-neutral-400">
          <thead className="bg-[#0a0a0a] text-neutral-500 uppercase border-b border-[#1a1a1a]">
            <tr>
              <th className="px-4 py-3">Shipment ID</th>
              <th className="px-4 py-3">Procurement</th>
              <th className="px-4 py-3">Vendor</th>
              <th className="px-4 py-3">Expected</th>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Delta</th>
              <th className="px-4 py-3">Transporter</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {shipments.map((s) => {
              const vendor = vendors.find((v) => v.id === s.vendorId);
              return (
                <tr key={s.id} className="hover:bg-[#0a0a0a] transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-white">{s.id}</td>
                  <td className="px-4 py-3 font-mono text-orange-400">{s.procurementId}</td>
                  <td className="px-4 py-3 text-neutral-300">{vendor?.name || s.vendorId}</td>
                  <td className="px-4 py-3 font-medium">{s.expectedQuantity}</td>
                  <td className="px-4 py-3 font-medium text-neutral-300">{s.receivedQuantity}</td>
                  <td className={`px-4 py-3 font-medium ${s.delta < 0 ? "text-red-400" : "text-emerald-400"}`}>
                    {s.delta}
                  </td>
                  <td className="px-4 py-3 text-neutral-500 font-mono">{s.transporterId}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded font-medium ${
                      s.status === 'DISCREPANCY' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
