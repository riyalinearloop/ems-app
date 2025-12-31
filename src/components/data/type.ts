export type InventoryStatus = "ok" | "low";

export interface InventoryItem {
  name: string;
  current: number;
  min: number;
  max: number;
  lot: string;
  expiry: string;
}

export interface DepotSectionData {
  title: string;
  code: string;
  items: InventoryItem[];
}

export interface LowStockItem {
  name: string;
  location: string;
  current: number;
  min: number;
}

export type ActivityColor = "blue" | "green" | "yellow";

export interface ActivityItem {
  color: ActivityColor;
  title: string;
  description: string;
  ago: string;
}
