"use client";

import { useProcureTraceStore } from "@/lib/store/useStore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AnalyticsPage() {
  const { procurements, vendors } = useProcureTraceStore();

  const priceDeviationData = procurements.map((p) => ({
    name: p.id,
    deviation: p.priceDeviation,
  }));

  const vendorWinData = vendors.map((v) => ({
    name: v.name.split(" ")[0],
    winRate: Math.round(v.winRate * 100),
  }));

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="flex items-end justify-between border-b border-[#1a1a1a] pb-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-white mb-1">Anomaly Analytics</h1>
          <p className="text-neutral-500 text-sm">Population-level behavioral distribution and market variance metrics.</p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-8">
        {/* Price Deviation Analytics */}
        <div className="glass-panel rounded-xl p-6 space-y-4">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
            Price Deviation Baseline (%)
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceDeviationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                <XAxis dataKey="name" stroke="#525252" fontSize={11} />
                <YAxis stroke="#525252" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#111111", borderColor: "#262626", color: "#ffffff" }} />
                <Bar dataKey="deviation" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vendor Win Rate Analytics */}
        <div className="glass-panel rounded-xl p-6 space-y-4">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
            Vendor Win Concentration (%)
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendorWinData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                <XAxis dataKey="name" stroke="#525252" fontSize={11} />
                <YAxis stroke="#525252" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#111111", borderColor: "#262626", color: "#ffffff" }} />
                <Bar dataKey="winRate" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
