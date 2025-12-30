export type ReportType = "medication" | "inventory" | "paramedic";
export type ParamedicSubtype = "incident" | "usage";

export interface ReportHistoryRow {
  id: string;
  name: string;
  type: ReportType;
  period: string;
  generated: string;
  subtype?: ParamedicSubtype; // For paramedic reports
}

export const REPORT_HISTORY: ReportHistoryRow[] = [
  {
    id: "RPT001",
    name: "Monthly Medication Usage Report - December 2024",
    type: "medication",
    period: "December 2024",
    generated: "01/01/2025",
  },
  {
    id: "RPT003",
    name: "Controlled Substances Audit Report - Q4 2024",
    type: "medication",
    period: "Q4 2024",
    generated: "15/01/2025",
  },
  {
    id: "RPT002",
    name: "Weekly Inventory Status Report - Week 4",
    type: "inventory",
    period: "Week 4, January 2025",
    generated: "25/01/2025",
  },
  {
    id: "PMR001",
    name: "",
    type: "paramedic",
    period: "",
    generated: "Invalid Date",
    subtype: "incident",
  },
  {
    id: "PMR002",
    name: "",
    type: "paramedic",
    period: "",
    generated: "Invalid Date",
    subtype: "usage",
  },
  {
    id: "PMR003",
    name: "",
    type: "paramedic",
    period: "",
    generated: "Invalid Date",
    subtype: "incident",
  },
  {
    id: "PMR004",
    name: "",
    type: "paramedic",
    period: "",
    generated: "Invalid Date",
    subtype: "usage",
  },
  {
    id: "PMR005",
    name: "",
    type: "paramedic",
    period: "",
    generated: "Invalid Date",
    subtype: "usage",
  },
];

export interface ReportStats {
  medication: number;
  inventory: number;
  paramedic: number;
  thisMonth: number;
  paramedicIncident?: number;
  paramedicUsage?: number;
}

export const REPORT_STATS: ReportStats = {
  medication: 2,
  inventory: 1,
  paramedic: 5,
  thisMonth: 0,
  paramedicIncident: 2,
  paramedicUsage: 3,
};

export interface QuickReportTemplate {
  id: string;
  title: string;
  description: string;
  type: ReportType;
  iconColor: "blue" | "green" | "purple";
}

export const QUICK_REPORT_TEMPLATES: QuickReportTemplate[] = [
  {
    id: "monthly-usage",
    title: "Monthly Usage Report",
    description: "Medication usage patterns for the current month",
    type: "medication",
    iconColor: "blue",
  },
  {
    id: "low-stock",
    title: "Low Stock Summary",
    description: "Current inventory levels below minimum thresholds",
    type: "inventory",
    iconColor: "green",
  },
  {
    id: "quarterly-audit",
    title: "Quarterly Audit",
    description: "Comprehensive audit report for regulatory compliance",
    type: "medication",
    iconColor: "purple",
  },
];

