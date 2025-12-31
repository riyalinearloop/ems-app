export type IncidentStatus = "open" | "closed";
export type IncidentType = "Loss/Theft" | "Damage" | "Discrepancy" | "Other";
export type IncidentSeverity = "high" | "medium" | "low";

export interface IncidentStats {
  openIncidents: number;
  closedIncidents: number;
  ehsReports: number;
  policeReports: number;
}

export interface RegulatoryReportStatus {
  ehs: boolean;
  cper: boolean;
  police: boolean;
  healthCanada: boolean;
}

export interface Incident {
  id: string;
  type: IncidentType;
  location: string;
  status: IncidentStatus;
  reportedBy: string;
  reportedDate: string;
  reportsCompleted: number;
  reportsRequired: number;
  severity?: IncidentSeverity;
  affectedMedications?: string[];
  description?: string;
  regulatoryReports?: RegulatoryReportStatus;
}

export const INCIDENT_STATS: IncidentStats = {
  openIncidents: 2,
  closedIncidents: 1,
  ehsReports: 2,
  policeReports: 1,
};

export const INCIDENTS: Incident[] = [
  {
    id: "INC001",
    type: "Loss/Theft",
    location: "5040 Mainway, Burlington",
    status: "open",
    reportedBy: "Sarah Chen",
    reportedDate: "26/01/2025",
    reportsCompleted: 1,
    reportsRequired: 4,
    severity: "high",
    affectedMedications: ["Morphine"],
    description: "Missing Morphine vial discovered during routine count",
    regulatoryReports: {
      ehs: true,
      cper: true,
      police: true,
      healthCanada: false,
    },
  },
  {
    id: "INC002",
    type: "Loss/Theft",
    location: "1234 Oak Street, Hamilton",
    status: "closed",
    reportedBy: "John Mitchell",
    reportedDate: "24/01/2025",
    reportsCompleted: 3,
    reportsRequired: 4,
    severity: "medium",
    affectedMedications: ["Fentanyl", "Hydromorphone"],
    description: "Controlled substances discrepancy found during inventory audit",
    regulatoryReports: {
      ehs: true,
      cper: true,
      police: true,
      healthCanada: true,
    },
  },
  {
    id: "INC003",
    type: "Loss/Theft",
    location: "789 Pine Avenue, Oakville",
    status: "open",
    reportedBy: "Mike Rodriguez",
    reportedDate: "26/01/2025",
    reportsCompleted: 0,
    reportsRequired: 4,
    severity: "high",
    affectedMedications: ["Ketamine"],
    description: "Suspected theft of Ketamine ampoules from storage",
    regulatoryReports: {
      ehs: false,
      cper: false,
      police: false,
      healthCanada: false,
    },
  },
];

// Medications for incident reporting
export const INCIDENT_MEDICATIONS = [
  { value: "morphine", label: "Morphine" },
  { value: "hydromorphone", label: "Hydromorphone" },
  { value: "fentanyl", label: "Fentanyl" },
  { value: "ketamine", label: "Ketamine" },
  { value: "midazolam", label: "Midazolam" },
];

// Dosage types
export const DOSAGE_TYPES = [
  { value: "tablet", label: "Tablet" },
  { value: "capsule", label: "Capsule" },
  { value: "vial", label: "Vial" },
  { value: "ampoule", label: "Ampoule" },
  { value: "syringe", label: "Syringe" },
];

// Loss reasons
export const LOSS_REASONS = [
  { value: "theft", label: "Theft" },
  { value: "loss", label: "Loss" },
  { value: "damage", label: "Damage" },
  { value: "discrepancy", label: "Discrepancy" },
  { value: "other", label: "Other" },
];


