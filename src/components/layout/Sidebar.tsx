"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Network,
  Search,
  Database,
  Truck,
  LineChart,
  ShieldAlert,
  FileText,
  Settings,
  HelpCircle,
  Activity
} from "lucide-react";

const mainNav = [
  { name: "Command Center", href: "/", icon: LayoutDashboard },
  { name: "Cases", href: "/cases", icon: Briefcase, badge: "3 Alerts" },
  { name: "Network Graph", href: "/network", icon: Network },
  { name: "Evidence Explorer", href: "/evidence", icon: Search },
  { name: "Procurement Data", href: "/procurements", icon: Database },
  { name: "Shipments", href: "/shipments", icon: Truck },
  { name: "Analytics", href: "/analytics", icon: LineChart },
  { name: "Audit Log", href: "/audit", icon: ShieldAlert },
  { name: "Reports", href: "/reports", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen flex flex-col bg-black border-r border-[#1a1a1a] text-neutral-400 relative z-20">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-[#1a1a1a]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
          <span className="font-bold tracking-widest text-white text-sm uppercase">
            ProcureTrace
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-8 px-4 space-y-1">
        {mainNav.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-lg text-xs font-semibold transition-all group",
                isActive
                  ? "bg-[#111111] text-white border border-[#262626]"
                  : "text-neutral-500 hover:text-white hover:bg-[#0a0a0a]"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-orange-500" : "text-neutral-600 group-hover:text-neutral-400")} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer System Status */}
      <div className="p-6 border-t border-[#1a1a1a] flex items-center justify-between text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-wider">System Active</span>
        </div>
        <Link href="/settings" className="hover:text-white transition-colors">
          <Settings className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
