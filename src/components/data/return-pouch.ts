export type ReturnStatus = "Pending" | "Completed" | "Verified";

export interface ReturnPouch {
  id: string;
  pouchNumber: string;
  status: ReturnStatus;
  withdrawnBy: string;
  withdrawnDate: string;
  returnedDate?: string;
  medications: {
    name: string;
    quantity: number;
    used: number;
    remaining: number;
  }[];
  notes?: string;
}

export const RETURN_POUCHES: ReturnPouch[] = [
  {
    id: "r001",
    pouchNumber: "P001",
    status: "Pending",
    withdrawnBy: "John Mitchell",
    withdrawnDate: "2025-01-26 08:00:00",
    medications: [
      { name: "Morphine", quantity: 2, used: 1, remaining: 1 },
      { name: "Fentanyl", quantity: 1, used: 0, remaining: 1 },
      { name: "Midazolam", quantity: 1, used: 1, remaining: 0 },
    ],
    notes: "Used for emergency response",
  },
  {
    id: "r002",
    pouchNumber: "P002",
    status: "Completed",
    withdrawnBy: "Sarah Chen",
    withdrawnDate: "2025-01-25 14:00:00",
    returnedDate: "2025-01-25 20:00:00",
    medications: [
      { name: "Morphine", quantity: 2, used: 0, remaining: 2 },
      { name: "Hydromorphone", quantity: 1, used: 0, remaining: 1 },
      { name: "Ketamine", quantity: 2, used: 1, remaining: 1 },
    ],
    notes: "No medications used",
  },
];

