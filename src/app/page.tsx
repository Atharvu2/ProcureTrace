"use client";

import Link from "next/link";
import { useProcureTraceStore } from "@/lib/store/useStore";
import { ArrowRight, Activity, Zap, TrendingUp, AlertTriangle, ShieldAlert, FileCheck2, Info } from "lucide-react";

export default function CommandCenterPage() {
  const { cases, auditEvents } = useProcureTraceStore();

  const totalAnalyzed = 1250;
  const prioritizedCount = cases.length;
  const highPriorityCount = cases.filter((c) => c.priorityScore >= 85).length;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8 max-w-5xl mx-auto text-center space-y-16">
      
      {/* HERO SECTION (REDSUN Style) */}
      <section className="space-y-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 bg-[#111111] border border-[#262626] rounded-full p-1 pr-4">
            <span className="bg-orange-gradient text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              What's New
            </span>
            <span className="text-xs text-neutral-400 font-medium">
              Autonomous Investigation Engine v2.1
            </span>
            <ArrowRight className="h-3 w-3 text-neutral-500" />
          </div>

          <h1 className="text-5xl sm:text-7xl font-medium tracking-tight text-white leading-tight">
            Intelligent Auditing <br />
            Powered by AI.
          </h1>
          
          <p className="text-neutral-400 text-sm max-w-2xl font-light leading-relaxed">
            Gain clarity and harness the power of your procurement data with ProcureTrace. 
            Our deterministic engine provides real-time anomaly detection across tenders, bids, and shipments.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <Link
              href="/cases/PROC-482"
              className="bg-orange-gradient hover:opacity-90 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-opacity shadow-[0_0_20px_rgba(249,115,22,0.3)] flex items-center gap-2"
            >
              Start Investigation
            </Link>
            <Link
              href="/cases"
              className="bg-[#111111] hover:bg-[#1a1a1a] border border-[#262626] text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-colors"
            >
              View Cases
            </Link>
          </div>
        </div>
      </section>

      {/* KPI METRICS WITH HOVER TOOLTIPS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full pt-12 border-t border-[#1a1a1a]">
        
        <div className="spec-container glass-panel p-6 rounded-2xl text-left border-l-2 border-l-orange-500">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Tenders Analyzed</span>
          <p className="text-3xl font-medium text-white mt-2">{totalAnalyzed.toLocaleString()}</p>
          <div className="spec-tooltip">
            <strong>Continuous Ingestion</strong>
            Matches 1,250 live tenders against historical median price benchmarks.
          </div>
        </div>

        <div className="spec-container glass-panel p-6 rounded-2xl text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Priority Cases</span>
          <p className="text-3xl font-medium text-white mt-2">{prioritizedCount}</p>
          <div className="spec-tooltip">
            <strong>Human Review Required</strong>
            {prioritizedCount} cases exceed the baseline anomaly threshold.
          </div>
        </div>

        <div className="spec-container glass-panel p-6 rounded-2xl text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">High Risk Alerts</span>
          <p className="text-3xl font-medium text-white mt-2">{highPriorityCount}</p>
          <div className="spec-tooltip">
            <strong>Critical Anomalies</strong>
            Priority Score &gt; 85. Often involves multi-layered pricing and shipment discrepancies.
          </div>
        </div>

        <div className="spec-container glass-panel p-6 rounded-2xl text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Evidence Coverage</span>
          <p className="text-3xl font-medium text-white mt-2">94%</p>
          <div className="spec-tooltip">
            <strong>Auditable Claims</strong>
            Every anomaly is backed by deterministic baseline formulas and database citations.
          </div>
        </div>

      </section>

      {/* PRIORITY QUEUE LIST */}
      <section className="w-full text-left space-y-6 pt-8">
        <h2 className="text-lg font-medium text-white">Active Investigations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map((c) => (
            <Link key={c.id} href={`/cases/${c.id}`} className="block">
              <div className="spec-container glass-panel glass-panel-interactive p-5 rounded-xl flex flex-col justify-between h-full space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-white">{c.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    c.priorityScore >= 90 ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                  }`}>
                    Score {c.priorityScore}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-medium">{c.primarySignal}</p>
                
                {/* Custom Tooltip for Cases */}
                <div className="spec-tooltip text-left w-64">
                  <strong>{c.id} Context</strong>
                  Dept: {c.department}<br/>
                  Confidence: {c.confidence}%<br/>
                  Signals: {c.anomaliesCount} detected.<br/><br/>
                  <span className="text-orange-500 font-semibold">Click to open investigation workspace.</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
