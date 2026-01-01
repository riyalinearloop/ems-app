"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Bell, User, LogOut, Menu } from "lucide-react";
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
    "/pouch-management": "Pouch Management",
  };
  return titles[pathname] || "Dashboard";
};

const formatUserName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

interface HeaderProps {
  onMenuClick?: () => void;
  isMobile?: boolean;
}

export const Header = ({ onMenuClick, isMobile = false }: HeaderProps) => {
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
    <header className="px-3 sm:px-4 md:px-6 py-2 sm:py-[7.5px] flex items-center justify-between bg-white border-b border-gray-200 gap-2 sm:gap-4">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        {/* Mobile Menu Button */}
        {isMobile && onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 text-gray-600 hover:text-gray-900 md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate">
            {getPageTitle(pathname)}
          </h2>
          {user && (
            <p className="text-xs sm:text-sm text-gray-600 truncate hidden sm:block">
              Welcome back, {formatUserName(user.firstName, user.lastName)}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-400 hover:text-gray-600 h-8 w-8 sm:h-10 sm:w-10"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
              3
            </span>
          </Button>
        </div>

        {/* User Info and Logout */}
        {!loading && (
          <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
            {user ? (
              <>
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                    {formatUserName(user.firstName, user.lastName)}
                  </p>
                </div>
                <CommonAvatar
                  size="md"
                  className="bg-blue-100 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-blue-600" />
                  </div>
                </CommonAvatar>
              </>
            ) : (
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-900">Guest</p>
                <p className="text-xs text-gray-500">User</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-gray-400 hover:text-gray-600 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
              title="Logout"
            >
              <LogOut className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
