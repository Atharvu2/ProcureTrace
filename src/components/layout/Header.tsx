"use client";

import { Search, Command } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const q = query.trim().toUpperCase();
    if (q.startsWith("PROC-")) {
      router.push(`/cases/${q}`);
    } else if (q.startsWith("VEN-")) {
      router.push(`/network`);
    } else if (q.startsWith("SHIP-")) {
      router.push(`/shipments`);
    } else {
      router.push(`/cases`);
    }
  };

  return (
    <header className="h-20 border-b border-[#1a1a1a] bg-black px-8 flex items-center justify-between text-xs sticky top-0 z-10">
      {/* Global Search Bar */}
      <form onSubmit={handleSearch} className="relative flex-1 max-w-xl">
        <Search className="absolute left-4 top-3.5 h-4 w-4 text-neutral-600" />
        <input
          type="text"
          placeholder="Search by ID, Vendor, or Signal..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-full pl-12 pr-12 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500/50 transition-colors"
        />
        <div className="absolute right-4 top-3 flex items-center gap-1 text-[10px] font-mono text-neutral-500">
          <Command className="h-3 w-3" /> K
        </div>
      </form>

      {/* Header Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-orange-400 text-[10px] font-bold uppercase tracking-widest">AI Audit Active</span>
        </div>
      </div>
    </header>
  );
}
