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
    pouchNumber: "P001",
    status: "Signed Out",
    assignedTo: "John Mitchell",
    timeAgo: "309d ago",
    medications: [
      { name: "Morphine", quantity: 2 },
      { name: "Fentanyl", quantity: 1 },
      { name: "Midazolam", quantity: 1 },
    ],
    fullness: "Full",
  },
  {
    id: "p002",
    pouchNumber: "P002",
    status: "Signed In",
    assignedTo: null,
    timeAgo: "309d ago",
    medications: [
      { name: "Morphine", quantity: 2 },
      { name: "Hydromorphone", quantity: 1 },
      { name: "Ketamine", quantity: 2 },
    ],
    fullness: "Full",
  },
  {
    id: "p003",
    pouchNumber: "P003",
    status: "Signed Out",
    assignedTo: "Sarah Connor",
    timeAgo: "309d ago",
    medications: [
      { name: "Fentanyl", quantity: 2 },
      { name: "Midazolam", quantity: 2 },
      { name: "Ketamine", quantity: 1 },
    ],
    fullness: "Not Full",
  },
  {
    id: "p004",
    pouchNumber: "P004",
    status: "Signed In",
    assignedTo: null,
    timeAgo: "309d ago",
    medications: [
      { name: "Morphine", quantity: 1 },
      { name: "Hydromorphone", quantity: 2 },
      { name: "Fentanyl", quantity: 1 },
    ],
    fullness: "Full",
  },
];


