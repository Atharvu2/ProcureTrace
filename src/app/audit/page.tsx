"use client";

import { useProcureTraceStore } from "@/lib/store/useStore";

export default function AuditPage() {
  const { auditEvents } = useProcureTraceStore();

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <header className="flex items-end justify-between border-b border-[#1a1a1a] pb-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-white mb-1">System Audit Log</h1>
          <p className="text-neutral-500 text-sm">Append-only immutable system action trail and modification registry.</p>
        </div>
      </header>

      <div className="glass-panel rounded-xl overflow-hidden font-mono text-xs">
        <table className="w-full text-left text-neutral-400">
          <thead className="bg-[#0a0a0a] text-neutral-500 uppercase border-b border-[#1a1a1a]">
            <tr>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Actor</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Entity ID</th>
              <th className="px-4 py-3">Prev Value</th>
              <th className="px-4 py-3">New Value</th>
              <th className="px-4 py-3">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {auditEvents.map((evt) => (
              <tr key={evt.id} className="hover:bg-[#0a0a0a] transition-colors">
                <td className="px-4 py-3 text-neutral-500">{evt.timestamp}</td>
                <td className="px-4 py-3 font-medium text-neutral-300">{evt.actor}</td>
                <td className="px-4 py-3 text-orange-400 font-semibold">{evt.action}</td>
                <td className="px-4 py-3 text-amber-400">{evt.entityId}</td>
                <td className="px-4 py-3 text-red-400">{evt.previousValue}</td>
                <td className="px-4 py-3 text-emerald-400">{evt.newValue}</td>
                <td className="px-4 py-3 text-neutral-600">{evt.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
