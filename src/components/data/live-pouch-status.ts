export type PouchStatus = "Signed Out" | "Signed In";
export type PouchFullness = "Full" | "Not Full";

export interface PouchStats {
  totalPouches: number;
  signedOut: number;
  signedIn: number;
  fullPouches: number;
}

export interface MedicationInventory {
  name: string;
  abbreviation?: string; // e.g., "Mor", "Fen", "Mid" - optional for backward compatibility
  quantity: number;
}

export interface Pouch {
  id: string;
  pouchNumber: string;
  status: PouchStatus;
  assignedTo: string | null;
  timeAgo: string;
  medications: MedicationInventory[];
  fullness: PouchFullness;
}

export const POUCH_STATS: PouchStats = {
  totalPouches: 4,
  signedOut: 2,
  signedIn: 2,
  fullPouches: 3,
};

export const POUCHES: Pouch[] = [
  {
    id: "p001",
    pouchNumber: "Pouch P001",
    status: "Signed Out",
    assignedTo: "John Mitchell",
    timeAgo: "338d ago",
    medications: [
      { name: "Morphine", abbreviation: "Mor", quantity: 2 },
      { name: "Fentanyl", abbreviation: "Fen", quantity: 1 },
      { name: "Midazolam", abbreviation: "Mid", quantity: 1 },
    ],
    fullness: "Full",
  },
  {
    id: "p002",
    pouchNumber: "Pouch P002",
    status: "Signed In",
    assignedTo: null,
    timeAgo: "338d ago",
    medications: [
      { name: "Morphine", abbreviation: "Mor", quantity: 2 },
      { name: "Hydromorphone", abbreviation: "Hyd", quantity: 1 },
      { name: "Ketamine", abbreviation: "Ket", quantity: 2 },
    ],
    fullness: "Full",
  },
  {
    id: "p003",
    pouchNumber: "Pouch P003",
    status: "Signed Out",
    assignedTo: "Sarah Connor",
    timeAgo: "338d ago",
    medications: [
      { name: "Fentanyl", abbreviation: "Fen", quantity: 2 },
      { name: "Midazolam", abbreviation: "Mid", quantity: 2 },
      { name: "Ketamine", abbreviation: "Ket", quantity: 1 },
    ],
    fullness: "Not Full",
  },
  {
    id: "p004",
    pouchNumber: "Pouch P004",
    status: "Signed In",
    assignedTo: null,
    timeAgo: "338d ago",
    medications: [
      { name: "Morphine", abbreviation: "Mor", quantity: 1 },
      { name: "Hydromorphone", abbreviation: "Hyd", quantity: 2 },
      { name: "Fentanyl", abbreviation: "Fen", quantity: 1 },
    ],
    fullness: "Full",
  },
];


