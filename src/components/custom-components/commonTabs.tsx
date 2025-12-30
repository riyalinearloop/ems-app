"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type TabConfig = {
  label: string;
  value: string;
  children: React.ReactNode;
};

type CommonTabsProps = {
  tabs: TabConfig[];
  defaultTab?: string;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  tabsListClassName?: string;
};

export default function CommonTabs({
  tabs,
  defaultTab,
  className,
  value,
  onValueChange,
  tabsListClassName,
}: CommonTabsProps) {
  return (
    <div className={cn("w-full", className)}>
      <Tabs
        defaultValue={defaultTab || tabs[0]?.value}
        value={value}
        onValueChange={onValueChange}
      >
        {/* Tabs Header */}
        <TabsList
          className={cn(
            "inline-flex items-center gap-1 rounded-xl p-1 !m-0",
            "border bg-muted/60 backdrop-blur",
            "dark:bg-muted/30 dark:border-border",
            tabsListClassName
          )}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                // Base
                "relative rounded-lg px-4 py-2 text-sm font-medium",
                "transition-all duration-200 ease-in-out",

                // Default
                "text-muted-foreground",

                // Hover
                "hover:text-foreground hover:bg-background/60",
                "dark:hover:bg-background/40",

                // Active
                "data-[state=active]:bg-background",
                "data-[state=active]:text-foreground",
                "data-[state=active]:shadow-sm",
                "data-[state=active]:border",

                // Focus (accessibility)
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                "dark:focus-visible:ring-offset-background"
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tabs Content */}
        <div className="mt-4">
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className={cn(
                "animate-in fade-in-0 slide-in-from-top-1",
                "focus-visible:outline-none"
              )}
            >
              {tab.children}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
