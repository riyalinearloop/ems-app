export interface Pouch {
  id: string;
  pouchNumber: string;
  pouchType?: string;
  status: "Available" | "Signed Out";
  location: string;
  medications: MedicationInventory[];
  lastUpdated: string;
}

export interface MedicationInventory {
  name: string;
  abbreviation?: string;
  quantity: number;
  dosage?: string; // e.g., "10mg/mL", "50mcg/mL"
}

export interface PouchType {
  value: string;
  label: string;
}

export interface WithdrawFormData {
  // Step 1
  selectedPouchId?: string;
  newPouchType?: string;
  newPouchNumber?: string;
  isNewPouch?: boolean;

  // Step 2
  verifiedQuantities?: Record<string, number>;
  photoUrl?: string;

  // Step 3
  witnessName?: string;
  witnessSignature?: string;
  witnessDate?: string;
}

export const POUCH_TYPES: PouchType[] = [
  { value: "pcp", label: "PCP" },
  { value: "standard", label: "Standard" },
  { value: "emergency", label: "Emergency" },
  { value: "custom", label: "Custom" },
];

export const AVAILABLE_POUCHES: Pouch[] = [
  {
    id: "p001",
    pouchNumber: "PCP - 123",
    pouchType: "pcp",
    status: "Available",
    location: "Depot 1",
    medications: [
      { name: "Morphine", abbreviation: "Mor", quantity: 3, dosage: "10mg/mL" },
      {
        name: "Fentanyl",
        abbreviation: "Fen",
        quantity: 2,
        dosage: "50mcg/mL",
      },
      { name: "Midazolam", abbreviation: "Mid", quantity: 3, dosage: "5mg/mL" },
    ],
    lastUpdated: "2024-01-20 10:30:00",
  },
  {
    id: "p002",
    pouchNumber: "PCP - 124",
    pouchType: "pcp",
    status: "Available",
    location: "Depot 1",
    medications: [
      { name: "Morphine", abbreviation: "Mor", quantity: 2, dosage: "10mg/mL" },
      {
        name: "Fentanyl",
        abbreviation: "Fen",
        quantity: 1,
        dosage: "50mcg/mL",
      },
      {
        name: "Ketamine",
        abbreviation: "Ket",
        quantity: 2,
        dosage: "100mg/mL",
      },
    ],
    lastUpdated: "2024-01-20 11:00:00",
  },
  {
    id: "p003",
    pouchNumber: "Standard - 001",
    pouchType: "standard",
    status: "Available",
    location: "Depot 2",
    medications: [
      { name: "Morphine", abbreviation: "Mor", quantity: 1, dosage: "10mg/mL" },
      { name: "Midazolam", abbreviation: "Mid", quantity: 2, dosage: "5mg/mL" },
    ],
    lastUpdated: "2024-01-20 09:15:00",
  },
];
