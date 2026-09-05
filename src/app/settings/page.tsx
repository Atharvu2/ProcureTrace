export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <header className="flex items-end justify-between border-b border-[#1a1a1a] pb-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-white mb-1">System Configuration</h1>
          <p className="text-neutral-500 text-sm">Dataset statistics, active detection algorithms, and autonomous agent operational parameters.</p>
        </div>
      </header>

      <div className="space-y-6 text-xs text-neutral-400">
        {/* Dataset Stats */}
        <div className="glass-panel rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-medium text-white uppercase tracking-wider">Dataset Health & Scope</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-[#1a1a1a]">
              <span className="text-neutral-600">Procurements</span>
              <p className="text-lg font-medium text-white mt-1">1,250</p>
            </div>
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-[#1a1a1a]">
              <span className="text-neutral-600">Total Bids</span>
              <p className="text-lg font-medium text-white mt-1">4,820</p>
            </div>
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-[#1a1a1a]">
              <span className="text-neutral-600">Vendors</span>
              <p className="text-lg font-medium text-white mt-1">450</p>
            </div>
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-[#1a1a1a]">
              <span className="text-neutral-600">Shipment Manifests</span>
              <p className="text-lg font-medium text-white mt-1">2,500</p>
            </div>
          </div>
        </div>

        {/* Detection Engine Parameters */}
        <div className="glass-panel rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-medium text-white uppercase tracking-wider">Active Detection Engines</h2>
          <div className="space-y-3">
            {[
              { name: "Price Anomaly Engine", desc: "Flags items deviating > 20% from historical regional median baseline.", status: "ENABLED" },
              { name: "Vendor Behavior Engine", desc: "Monitors abnormal win rates (> 75%) across category population.", status: "ENABLED" },
              { name: "Bid Network Engine", desc: "Computes co-bidding pair Jaccard similarity across tender submissions.", status: "ENABLED" },
              { name: "Shipment Integrity Engine", desc: "Cross-checks physical warehouse scan receipts against dispatch manifests.", status: "ENABLED" },
            ].map((eng) => (
              <div key={eng.name} className="flex justify-between items-center bg-[#0a0a0a] p-3 rounded-lg border border-[#1a1a1a]">
                <div>
                  <p className="font-medium text-white">{eng.name}</p>
                  <p className="text-neutral-500 mt-0.5">{eng.desc}</p>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded font-medium">
                  {eng.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Operational Settings */}
        <div className="glass-panel rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-medium text-white uppercase tracking-wider">Autonomous Agent (ASTRA) Configuration</h2>
          <div className="space-y-2 text-neutral-400">
            <div className="flex justify-between py-2 border-b border-[#1a1a1a]">
              <span>Model Architecture</span>
              <span className="font-mono text-orange-400">GPT-6 Astra (Constrained Execution)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#1a1a1a]">
              <span>Maximum Tool Iteration Budget</span>
              <span className="font-mono text-neutral-300">6 calls / investigation</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#1a1a1a]">
              <span>Evidence Audit Trail Requirement</span>
              <span className="font-mono text-emerald-400">ENFORCED (Strict citation matching)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
