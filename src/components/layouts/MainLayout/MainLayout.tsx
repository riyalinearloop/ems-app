"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import ButtonLoader from "@/components/custom-components/buttonLoader";

interface MainLayoutProps {
  children: React.ReactNode;
  userType?: "logistic" | "paramedic";
}

export const MainLayout = ({
  children,
  userType = "logistic",
}: MainLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(true); // Start collapsed on mobile
  const pathname = usePathname();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const prevPathnameRef = React.useRef<string>(pathname);
  const isInitialMount = React.useRef<boolean>(true);

  // Detect mobile screen size
  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile, sidebar should be collapsed by default
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    // Skip loader on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevPathnameRef.current = pathname;
      return;
    }

    // Only show loader if pathname actually changed
    if (prevPathnameRef.current !== pathname) {
      setIsLoading(true);
      prevPathnameRef.current = pathname;

      // Hide loader after route transition completes
      // Next.js app router typically completes navigation quickly
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userType={userType}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative min-w-0">
        {/* Route Change Loader Overlay - Only covers main content area */}
        {isLoading && (
          <div className="absolute inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <ButtonLoader size="sm" />
              <p className="text-sm sm:text-base text-muted-foreground font-medium">
                Loading...
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <Header
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          isMobile={isMobile}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-2 sm:p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
