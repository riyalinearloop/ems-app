"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Bell, User, LogOut, ChevronRight } from "lucide-react";
import { getAuthCookie } from "@/lib/auth";
import { logout } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getPageTitle = (pathname: string): string => {
  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/inventory-transfer": "Inventory Transfer",
    "/order-management": "Order Management",
    "/notifications": "Notifications",
    "/reports": "Reports",
    "/incidents": "Incidents",
    "/live-pouch-status": "Live Pouch Status",
    "/pouch-history": "Pouch History",
  };
  return titles[pathname] || "Dashboard";
};

export const Header = () => {
  const pathname = usePathname();
  const [user, setUser] = React.useState<{
    firstName: string;
    lastName: string;
    userType: string;
  } | null>(null);

  React.useEffect(() => {
    const authCookie = getAuthCookie();
    if (authCookie?.user) {
      setUser(authCookie.user);
    }
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {getPageTitle(pathname)}
        </h1>
        {user && (
          <p className="text-sm text-gray-500">
            Welcome back, {user.firstName} {user.lastName}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="text-right">
                {user && (
                  <>
                    <div className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-xs text-gray-500">{user.userType}</div>
                  </>
                )}
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
