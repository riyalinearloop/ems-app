"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Bell, User, LogOut } from "lucide-react";
import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import CommonAvatar from "@/components/custom-components/commonAvatar";

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
    "/withdraw-pouch": "Withdraw Pouch",
    "/return-pouch": "Return Pouch",
  };
  return titles[pathname] || "Dashboard";
};

const formatUserName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

export const Header = () => {
  const pathname = usePathname();
  const [user, setUser] = React.useState<{
    firstName: string;
    lastName: string;
    userType: string;
  } | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/auth/user-info");
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser({
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              userType: data.user.userType,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="px-6 py-[7.5px] flex items-center justify-between bg-white border-b border-gray-200">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {getPageTitle(pathname)}
        </h2>
        {user && (
          <p className="text-sm text-gray-600">
            Welcome back, {formatUserName(user.firstName, user.lastName)}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-400 hover:text-gray-600"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>
        </div>

        {/* User Info and Logout */}
        {!loading && (
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatUserName(user.firstName, user.lastName)}
                  </p>
                </div>
                <CommonAvatar
                  size="md"
                  className="bg-blue-100"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                </CommonAvatar>
              </>
            ) : (
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Guest</p>
                <p className="text-xs text-gray-500">User</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-gray-400 hover:text-gray-600"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
