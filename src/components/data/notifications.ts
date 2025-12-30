export type NotificationPriority = "low" | "medium" | "high" | "critical";

export interface NotificationSummary {
  /** Total notifications count */
  total: number;
  /** Unread notifications count */
  unread: number;
  /** Critical notifications count */
  critical: number;
  /** High priority (but not critical) notifications count */
  highPriority: number;
}

export type NotificationFilterKey =
  | "all"
  | "unread"
  | "critical"
  | "highPriority";

export interface NotificationFilter {
  key: NotificationFilterKey;
  label: string;
  /** Tailwind classes for the default (unselected) state */
  baseClasses: string;
  /** Tailwind classes for the active state */
  activeClasses: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  /** e.g. "308d ago" */
  timeAgo: string;
  /** Human-readable priority label shown in the pill */
  priorityLabel: string;
  priority: NotificationPriority;
  /** Whether this notification is unread */
  unread: boolean;
  /** Badge background and text color classes */
  badgeClasses: string;
  badgeTextClasses: string;
  /** Tailwind classes to control the leading icon background */
  iconBgClasses: string;
  /** Tailwind classes for the outer container background/border when unread */
  containerClasses: string;
  /** Optional tag for grouping, e.g. "inventory", "orders", "incidents" */
  category?: "inventory" | "orders" | "incidents" | "eta";
}

export const NOTIFICATION_SUMMARY: NotificationSummary = {
  total: 4,
  unread: 3,
  critical: 1,
  highPriority: 2,
};

export const NOTIFICATION_FILTERS: NotificationFilter[] = [
  {
    key: "all",
    label: "All",
    baseClasses:
      "px-3 py-1 rounded-full text-sm transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200",
    activeClasses: "bg-blue-100 text-blue-700",
  },
  {
    key: "unread",
    label: "Unread",
    baseClasses:
      "px-3 py-1 rounded-full text-sm transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200",
    activeClasses: "",
  },
  {
    key: "critical",
    label: "Critical",
    baseClasses:
      "px-3 py-1 rounded-full text-sm transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200",
    activeClasses: "",
  },
  {
    key: "highPriority",
    label: "High Priority",
    baseClasses:
      "px-3 py-1 rounded-full text-sm transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200",
    activeClasses: "",
  },
];

export const NOTIFICATION_ITEMS: NotificationItem[] = [
  {
    id: "notif-low-inventory",
    title: "Low Inventory Alert",
    description: "Morphine at Depot 1 is below minimum threshold (3/5)",
    timeAgo: "308d ago",
    priorityLabel: "high",
    priority: "high",
    unread: true,
    badgeClasses: "bg-orange-100",
    badgeTextClasses: "text-orange-800",
    iconBgClasses: "bg-orange-100 text-orange-600",
    containerClasses: "bg-blue-50 border-l-4 border-l-blue-500",
    category: "inventory",
  },
  {
    id: "notif-critical-inventory",
    title: "Critical Inventory Alert",
    description: "Fentanyl at Depot 3 is critically low (1/4)",
    timeAgo: "308d ago",
    priorityLabel: "critical",
    priority: "critical",
    unread: true,
    badgeClasses: "bg-red-100",
    badgeTextClasses: "text-red-800",
    iconBgClasses: "bg-red-100 text-red-600",
    containerClasses: "bg-blue-50 border-l-4 border-l-blue-500",
    category: "inventory",
  },
  {
    id: "notif-order-eta",
    title: "Order ETA Update",
    description: "Order ORD001 estimated delivery: Jan 30, 2:00 PM",
    timeAgo: "308d ago",
    priorityLabel: "medium",
    priority: "medium",
    unread: false,
    badgeClasses: "bg-blue-100",
    badgeTextClasses: "text-blue-800",
    iconBgClasses: "bg-blue-100 text-blue-600",
    containerClasses: "",
    category: "eta",
  },
  {
    id: "notif-incident-report",
    title: "Incident Report Filed",
    description: "New incident INC003 requires review and reporting",
    timeAgo: "308d ago",
    priorityLabel: "high",
    priority: "high",
    unread: true,
    badgeClasses: "bg-orange-100",
    badgeTextClasses: "text-orange-800",
    iconBgClasses: "bg-orange-100 text-orange-600",
    containerClasses: "bg-blue-50 border-l-4 border-l-blue-500",
    category: "incidents",
  },
];

export interface NotificationQuickLink {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
}

export const NOTIFICATION_QUICK_LINKS: NotificationQuickLink[] = [
  {
    id: "threshold-alerts",
    title: "Threshold Alerts",
    description: "2 active alerts",
    actionLabel: "Review Inventory",
  },
  {
    id: "incident-reports",
    title: "Incident Reports",
    description: "1 pending review",
    actionLabel: "View Incidents",
  },
  {
    id: "order-updates",
    title: "Order Updates",
    description: "0 new updates",
    actionLabel: "Manage Orders",
  },
  {
    id: "eta-notifications",
    title: "ETA Notifications",
    description: "0 delivery updates",
    actionLabel: "Check Deliveries",
  },
];


