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
    label: "Pouch Management",
    href: "/pouch-management",
    icon: ArrowDownCircle,
  },
];

export const Sidebar = ({
  collapsed,
  onToggle,
  userType = "logistic",
}: SidebarProps) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = React.useState(false);

  // Detect mobile screen size
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get navigation items based on user type
  const navItems = React.useMemo(() => {
    if (userType === "paramedic") {
      return paramedicNavItems;
    }
    return logisticNavItems;
  }, [userType]);

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col z-50",
          "fixed md:static h-full",
          collapsed ? "w-20" : "w-64",
          isMobile && !collapsed
            ? "translate-x-0"
            : isMobile && collapsed
            ? "-translate-x-full"
            : "",
          "md:translate-x-0"
        )}
      >
        {/* Logo Section */}
        <div className="h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                  HealthO EMS
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 truncate">
                  {userType === "paramedic"
                    ? "PARAMEDIC PORTAL"
                    : "LOGISTICS PORTAL"}
                </div>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto flex-shrink-0">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1 sm:p-1.5 rounded-md hover:bg-gray-100 transition-colors flex-shrink-0 ml-2"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 rotate-180" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4">
          <ul className="space-y-1.5 sm:space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      // Close sidebar on mobile when item is clicked
                      if (isMobile) {
                        onToggle();
                      }
                    }}
                    className={cn(
                      "w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-left transition-all font-medium text-sm sm:text-base",
                      isActive
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="truncate flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-red-500 text-white text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0">
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
    </>
  );
};
