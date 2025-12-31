export type PouchStatus = "Available" | "Withdrawn" | "In Use";

export interface Pouch {
  id: string;
  pouchNumber: string;
  status: PouchStatus;
  medications: {
    name: string;
    quantity: number;
  }[];
  location: string;
  lastUpdated: string;
}

export const AVAILABLE_POUCHES: Pouch[] = [
  {
    id: "p001",
    pouchNumber: "P001",
    status: "Available",
    medications: [
      { name: "Morphine", quantity: 2 },
      { name: "Fentanyl", quantity: 1 },
      { name: "Midazolam", quantity: 1 },
    ],
    location: "Depot 1",
    lastUpdated: "2025-01-26 08:00:00",
  },
  {
    id: "p002",
    pouchNumber: "P002",
    status: "Available",
    medications: [
      { name: "Morphine", quantity: 2 },
      { name: "Hydromorphone", quantity: 1 },
      { name: "Ketamine", quantity: 2 },
    ],
    location: "Depot 1",
    lastUpdated: "2025-01-26 08:00:00",
  },
  {
    id: "p003",
    pouchNumber: "P003",
    status: "Available",
    medications: [
      { name: "Fentanyl", quantity: 2 },
      { name: "Midazolam", quantity: 2 },
      { name: "Ketamine", quantity: 1 },
    ],
    location: "Depot 2",
    lastUpdated: "2025-01-26 08:00:00",
  },
];

