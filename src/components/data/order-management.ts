export type OrderVersion = "expiry" | "threshold";

export type OrderStatusVariant = "eta" | "authRequested" | "received";

export type IconName = "Clock" | "AlertTriangle" | "CheckCircle" | "Package";

export interface OrderMedication {
  name: string;
  amount: number;
}

export interface OrderHistoryRow {
  id: string;
  medications: OrderMedication[];
  status: OrderStatusVariant;
  typeVersion: string;
  typeLabel: string;
  created: string;
  eta?: string;
}

interface StatusConfig {
  label: string;
  icon: IconName;
  badgeClasses: string;
  textClasses: string;
}

export const ORDER_STATUS_CONFIG: Record<OrderStatusVariant, StatusConfig> = {
  eta: {
    label: "ETA Provided",
    icon: "Clock",
    badgeClasses: "bg-purple-100",
    textClasses: "text-purple-800",
  },
  authRequested: {
    label: "Auth Requested",
    icon: "AlertTriangle",
    badgeClasses: "bg-yellow-100",
    textClasses: "text-yellow-800",
  },
  received: {
    label: "Received",
    icon: "CheckCircle",
    badgeClasses: "bg-green-100",
    textClasses: "text-green-800",
  },
};

export const ORDER_HISTORY_ROWS: OrderHistoryRow[] = [
  {
    id: "ORD001",
    medications: [
      { name: "Morphine", amount: 50 },
      { name: "Fentanyl", amount: 20 },
    ],
    status: "eta",
    typeVersion: "Version 1",
    typeLabel: "expiry based",
    created: "25/01/2025",
    eta: "30/01/2025",
  },
  {
    id: "ORD002",
    medications: [
      { name: "Ketamine", amount: 30 },
      { name: "Midazolam", amount: 25 },
    ],
    status: "authRequested",
    typeVersion: "Version 2",
    typeLabel: "threshold based",
    created: "26/01/2025",
  },
  {
    id: "ORD003",
    medications: [
      { name: "Hydromorphone", amount: 15 },
      { name: "Morphine", amount: 25 },
    ],
    status: "received",
    typeVersion: "Version 1",
    typeLabel: "expiry based",
    created: "20/01/2025",
    eta: "28/01/2025",
  },
];

interface StatusFlowStep {
  label: string;
  icon: IconName;
  circleClasses: string;
}

export const STATUS_FLOW_STEPS: StatusFlowStep[] = [
  {
    label: "Draft",
    icon: "Package",
    circleClasses: "bg-gray-100 text-gray-800",
  },
  {
    label: "Auth Generated",
    icon: "Package",
    circleClasses: "bg-blue-100 text-blue-800",
  },
  {
    label: "Auth Requested",
    icon: "AlertTriangle",
    circleClasses: "bg-yellow-100 text-yellow-800",
  },
  {
    label: "ETA Provided",
    icon: "Clock",
    circleClasses: "bg-purple-100 text-purple-800",
  },
  {
    label: "Delivered",
    icon: "Package",
    circleClasses: "bg-green-100 text-green-800",
  },
  {
    label: "Received",
    icon: "CheckCircle",
    circleClasses: "bg-green-100 text-green-800",
  },
  {
    label: "Transferred",
    icon: "CheckCircle",
    circleClasses: "bg-emerald-100 text-emerald-800",
  },
];

interface SummaryRow {
  name: string;
  detail: string;
}

export const EXPIRY_SUMMARY_ROWS: SummaryRow[] = [
  {
    name: "Morphine",
    detail: "Expiring: 25, Usage: 15/month, Suggested: 40",
  },
  {
    name: "Fentanyl",
    detail: "Expiring: 10, Usage: 8/month, Suggested: 18",
  },
  {
    name: "Ketamine",
    detail: "Expiring: 18, Usage: 12/month, Suggested: 30",
  },
];

export const THRESHOLD_SUMMARY_ROWS: SummaryRow[] = [
  { name: "Morphine", detail: "Needed: 22 units" },
  { name: "Ketamine", detail: "Needed: 28 units" },
  { name: "Fentanyl", detail: "Needed: 19 units" },
];

interface QuantityRow {
  name: string;
  suggested?: string;
}

export const ORDER_QUANTITIES: Record<OrderVersion, QuantityRow[]> = {
  expiry: [
    { name: "Morphine", suggested: "40" },
    { name: "Hydromorphone" },
    { name: "Fentanyl", suggested: "18" },
    { name: "Ketamine", suggested: "30" },
    { name: "Midazolam" },
  ],
  threshold: [
    { name: "Morphine", suggested: "22" },
    { name: "Hydromorphone" },
    { name: "Fentanyl", suggested: "19" },
    { name: "Ketamine", suggested: "28" },
    { name: "Midazolam" },
  ],
};


