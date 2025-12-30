export type ReportType = "count out" | "administration" | "count in";

export interface Report {
  id: string;
  type: ReportType;
  pouchNumber: string;
  user: string;
  timestamp: string;
  medications: { name: string; quantity: number }[];
  images?: string[];
  notes: string;
}

export const POUCH_REPORTS: Report[] = [
  {
    id: "1",
    type: "count out",
    pouchNumber: "P001",
    user: "Sarah Chen",
    timestamp: "2024-01-15 08:30:00",
    medications: [
      { name: "Morphine", quantity: 2 },
      { name: "Fentanyl", quantity: 1 },
      { name: "Midazolam", quantity: 3 },
    ],
    images: ["pouch-out-1.jpg", "pouch-out-2.jpg"],
    notes: "Pouch checked out for shift",
  },
  {
    id: "2",
    type: "administration",
    pouchNumber: "P001",
    user: "Sarah Chen",
    timestamp: "2024-01-15 14:45:00",
    medications: [{ name: "Morphine", quantity: -1 }],
    notes: "Administered to patient #12345",
  },
  {
    id: "3",
    type: "count in",
    pouchNumber: "P001",
    user: "Sarah Chen",
    timestamp: "2024-01-15 20:00:00",
    medications: [
      { name: "Morphine", quantity: 1 },
      { name: "Fentanyl", quantity: 1 },
      { name: "Midazolam", quantity: 3 },
    ],
    images: ["pouch-in-1.jpg"],
    notes: "Pouch returned after shift",
  },
];


