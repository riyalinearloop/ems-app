"use client";

import { DashboardScene } from "./dashboardScene";

interface DashboardContainerProps {
  userType?: "logistic" | "paramedic";
}

const DashboardContainer = ({ userType = "logistic" }: DashboardContainerProps) => {
  return <DashboardScene userType={userType} />;
};

export default DashboardContainer;
