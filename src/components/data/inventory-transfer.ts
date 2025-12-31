export interface LocationOption {
  value: string;
  label: string;
}

export type TransferStatus = "completed" | "pending";

export interface TransferRow {
  id: string;
  from: string;
  to: string;
  medications: string;
  status: TransferStatus;
  date: string;
}

interface TransferStatusConfig {
  label: string;
  badgeClasses: string;
  textClasses: string;
}

export const LOCATIONS: LocationOption[] = [
  { value: "", label: "Select location..." },
  { value: "HQ", label: "Headquarters (HQ)" },
  { value: "D1", label: "Depot 1 (D1)" },
  { value: "D2", label: "Depot 2 (D2)" },
  { value: "D3", label: "Depot 3 (D3)" },
  { value: "D4", label: "Depot 4 (D4)" },
];

export const TRANSFER_STATUS_CONFIG: Record<TransferStatus, TransferStatusConfig> =
  {
    completed: {
      label: "completed",
      badgeClasses: "bg-green-100",
      textClasses: "text-green-800",
    },
    pending: {
      label: "pending",
      badgeClasses: "bg-yellow-100",
      textClasses: "text-yellow-800",
    },
  };

export const RECENT_TRANSFERS: TransferRow[] = [
  {
    id: "TRF001",
    from: "Headquarters",
    to: "Depot 1",
    medications: "Morphine: 10, Fentanyl: 5",
    status: "completed",
    date: "26/01/2025",
  },
  {
    id: "TRF002",
    from: "Headquarters",
    to: "Depot 3",
    medications: "Fentanyl: 8, Ketamine: 5",
    status: "pending",
    date: "27/01/2025",
  },
];

export interface Medication {
  name: string;
  available?: number;
  current?: number;
}

// Sample medication data - in real app, this would come from API based on selected location
export const SAMPLE_AVAILABLE_MEDICATIONS: Medication[] = [
  { name: "Morphine", available: 85 },
  { name: "Hydromorphone", available: 32 },
  { name: "Fentanyl", available: 28 },
  { name: "Ketamine", available: 45 },
  { name: "Midazolam", available: 38 },
];

export const SAMPLE_CURRENT_INVENTORY: Medication[] = [
  { name: "Morphine", current: 3 },
  { name: "Hydromorphone", current: 8 },
  { name: "Fentanyl", current: 12 },
  { name: "Ketamine", current: 2 },
  { name: "Midazolam", current: 15 },
];


