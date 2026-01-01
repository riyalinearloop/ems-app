"use client";

import { useState } from "react";
import {
  REPORT_HISTORY,
  REPORT_STATS,
  QUICK_REPORT_TEMPLATES,
} from "@/components/data/reports";
import ReportsScene from "./reportsScene";

type ReportTabType = "medication" | "inventory" | "paramedic";

const ReportsContainer = () => {
  const [activeTab, setActiveTab] = useState<ReportTabType>("medication");

  const handleTabChange = (tab: ReportTabType) => {
    setActiveTab(tab);
    // TODO: When API is integrated, fetch reports based on selected tab
    // Example: await fetchReportsByType(tab);
  };

  const handleGenerateReport = () => {
    // TODO: When API is integrated, open report generation modal or navigate to report generator
    // Example: openReportGenerationModal(activeTab);
    console.log("Generate report for:", activeTab);
  };

  return (
    <ReportsScene
      reportHistory={REPORT_HISTORY}
      reportStats={REPORT_STATS}
      quickReportTemplates={QUICK_REPORT_TEMPLATES}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onGenerateReport={handleGenerateReport}
    />
  );
};

export default ReportsContainer;
