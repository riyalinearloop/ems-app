export type IncidentStatus = "open" | "closed";
export type IncidentType = "Loss/Theft" | "Damage" | "Discrepancy" | "Other";

export interface IncidentStats {
  openIncidents: number;
  closedIncidents: number;
  ehsReports: number;
  policeReports: number;
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
  },
];


