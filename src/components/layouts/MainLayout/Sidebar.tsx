"use client";

import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  Bell,
  Calendar,
  ChevronLeft,
  FileText,
  Package,
  ClipboardList,
  Search,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  userType?: "logistic" | "paramedic";
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  userTypes?: ("logistic" | "paramedic")[];
}

// Logistic user navigation items
const logisticNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Package,
  },
  {
    label: "Inventory Transfer",
    href: "/inventory-transfer",
    icon: FileText,
  },
  {
    label: "Order Management",
    href: "/order-management",
    icon: ClipboardList,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    badge: 3,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: Search,
  },
  {
    label: "Incidents",
    href: "/incidents",
    icon: AlertTriangle,
  },
  {
    label: "Live Pouch Status",
    href: "/live-pouch-status",
    icon: Activity,
  },
  {
    label: "Pouch History",
    href: "/pouch-history",
    icon: Calendar,
  },
];

// Paramedic user navigation items
const paramedicNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Package,
  },
  {
    label: "Withdraw Pouch",
    href: "/withdraw-pouch",
    icon: ArrowDownCircle,
  },
  {
    label: "Return Pouch",
    href: "/return-pouch",
    icon: ArrowUpCircle,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    badge: 3,
  },
  {
    label: "Pouch History",
    href: "/pouch-history",
    icon: Calendar,
  },
];

export const Sidebar = ({ collapsed, onToggle, userType = "logistic" }: SidebarProps) => {
  const pathname = usePathname();

  // Get navigation items based on user type
  const navItems = React.useMemo(() => {
    if (userType === "paramedic") {
      return paramedicNavItems;
    }
    return logisticNavItems;
  }, [userType]);

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm text-gray-900">HealthO EMS</div>
              <div className="text-xs text-gray-500">
                {userType === "paramedic" ? "PARAMEDIC PORTAL" : "LOGISTICS PORTAL"}
              </div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
            <Package className="w-5 h-5 text-white" />
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronLeft className="w-4 h-4 text-gray-600 rotate-180" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all font-medium",
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    collapsed && "justify-center"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && (
                    <>
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
