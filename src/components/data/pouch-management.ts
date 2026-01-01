export interface SignedOutPouch {
  id: string;
  pouchNumber: string;
  pouchType?: string;
  status: "Active" | "Inactive" | "Returned";
  signedOutBy: string;
  signedOutDate: string;
  medications: Array<{
    name: string;
    dosage?: string;
    quantity: number;
  }>;
  location?: string;
  lastUpdated?: string;
}

export const SIGNED_OUT_POUCHES: SignedOutPouch[] = [
  {
    id: "p001",
    pouchNumber: "ACP - ACP001",
    pouchType: "ACP",
    status: "Active",
    signedOutBy: "J. Smith",
    signedOutDate: "2025-01-12",
    medications: [
      { name: "Morphine", dosage: "10mg/mL", quantity: 5 },
      { name: "Hydromorphone", dosage: "2mg/mL", quantity: 3 },
      { name: "Fentanyl", dosage: "50mcg/mL", quantity: 2 },
      { name: "Midazolam", dosage: "5mg/mL", quantity: 4 },
      { name: "Ketamine", dosage: "50mg/mL", quantity: 2 },
    ],
    location: "Field Unit 1",
    lastUpdated: "2025-01-12 14:30:00",
  },
  {
    id: "p002",
    pouchNumber: "PCP - PCP123",
    pouchType: "PCP",
    status: "Active",
    signedOutBy: "M. Johnson",
    signedOutDate: "2025-01-11",
    medications: [
      { name: "Morphine", dosage: "10mg/mL", quantity: 3 },
      { name: "Fentanyl", dosage: "50mcg/mL", quantity: 2 },
      { name: "Midazolam", dosage: "5mg/mL", quantity: 3 },
    ],
    location: "Field Unit 2",
    lastUpdated: "2025-01-11 10:15:00",
  },
  {
    id: "p003",
    pouchNumber: "Standard - STD001",
    pouchType: "Standard",
    status: "Active",
    signedOutBy: "R. Williams",
    signedOutDate: "2025-01-10",
    medications: [
      { name: "Morphine", dosage: "10mg/mL", quantity: 2 },
      { name: "Midazolam", dosage: "5mg/mL", quantity: 2 },
      { name: "Ketamine", dosage: "50mg/mL", quantity: 1 },
    ],
    location: "Field Unit 3",
    lastUpdated: "2025-01-10 16:45:00",
  },
  {
    id: "p004",
    pouchNumber: "ACP - ACP002",
    pouchType: "ACP",
    status: "Active",
    signedOutBy: "S. Davis",
    signedOutDate: "2025-01-09",
    medications: [
      { name: "Morphine", dosage: "10mg/mL", quantity: 4 },
      { name: "Hydromorphone", dosage: "2mg/mL", quantity: 2 },
      { name: "Fentanyl", dosage: "50mcg/mL", quantity: 3 },
      { name: "Midazolam", dosage: "5mg/mL", quantity: 3 },
    ],
    location: "Field Unit 4",
    lastUpdated: "2025-01-09 09:20:00",
  },
  {
    id: "p005",
    pouchNumber: "Emergency - EMG001",
    pouchType: "Emergency",
    status: "Active",
    signedOutBy: "T. Brown",
    signedOutDate: "2025-01-08",
    medications: [
      { name: "Morphine", dosage: "10mg/mL", quantity: 3 },
      { name: "Fentanyl", dosage: "50mcg/mL", quantity: 2 },
      { name: "Ketamine", dosage: "50mg/mL", quantity: 2 },
    ],
    location: "Field Unit 5",
    lastUpdated: "2025-01-08 11:00:00",
  },
];
