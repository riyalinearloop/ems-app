"use client";

import React from "react";
import {
  Package,
  AlertTriangle,
  Activity,
  TrendingUp,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

const MetricCard = ({
  title,
  value,
  icon: Icon,
  iconColor,
}: MetricCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${iconColor} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

interface InventoryCardProps {
  name: string;
  quantity: number;
  min: number;
  max: number;
  isLowStock?: boolean;
}

const InventoryCard = ({
  name,
  quantity,
  min,
  max,
  isLowStock = false,
}: InventoryCardProps) => (
  <Card className={isLowStock ? "bg-red-50 border-red-200" : ""}>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{quantity}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 text-green-600">
            <ArrowDown className="w-3 h-3" />
            <span className="text-xs font-medium">{min}</span>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <ArrowUp className="w-3 h-3" />
            <span className="text-xs font-medium">{max}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const DashboardScene = () => {
  const medications = [
    { name: "Morphine", quantity: 85, min: 10, max: 100, isLowStock: false },
    {
      name: "Hydromorphone",
      quantity: 32,
      min: 5,
      max: 50,
      isLowStock: false,
    },
    { name: "Fentanyl", quantity: 28, min: 8, max: 40, isLowStock: false },
    { name: "Ketamine", quantity: 45, min: 12, max: 60, isLowStock: false },
    { name: "Midazolam", quantity: 38, min: 7, max: 45, isLowStock: false },
  ];

  const depot1Medications = [
    { name: "Morphine", quantity: 3, min: 5, max: 10, isLowStock: true },
    {
      name: "Hydromorphone",
      quantity: 8,
      min: 5,
      max: 50,
      isLowStock: false,
    },
    { name: "Fentanyl", quantity: 1, min: 4, max: 40, isLowStock: true },
    { name: "Ketamine", quantity: 2, min: 6, max: 60, isLowStock: true },
    { name: "Midazolam", quantity: 10, min: 7, max: 45, isLowStock: false },
  ];

  const lowStockAlerts = [
    {
      medication: "Morphine",
      location: "Depot 1",
      quantity: "3/5",
      status: "Below min",
    },
    {
      medication: "Ketamine",
      location: "Depot 1",
      quantity: "2/6",
      status: "Below min",
    },
    {
      medication: "Fentanyl",
      location: "Depot 3",
      quantity: "1/4",
      status: "Below min",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Medications"
          value="479"
          icon={Package}
          iconColor="bg-blue-600"
        />
        <MetricCard
          title="Low Stock Alerts"
          value="3"
          icon={AlertTriangle}
          iconColor="bg-red-600"
        />
        <MetricCard
          title="Active Pouches"
          value="2/4"
          icon={Activity}
          iconColor="bg-green-600"
        />
        <MetricCard
          title="Pending Orders"
          value="2"
          icon={TrendingUp}
          iconColor="bg-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Inventory Overview
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Real-time inventory levels across all locations
            </p>

            {/* Headquarters */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Headquarters (HQ)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {medications.map((med) => (
                  <InventoryCard key={med.name} {...med} />
                ))}
              </div>
            </div>

            {/* Depot 1 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Depot 1 (D1)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {depot1Medications.map((med) => (
                  <InventoryCard key={med.name} {...med} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Low Stock Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lowStockAlerts.map((alert, index) => (
                <Card key={index} className="bg-red-50 border-red-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">
                        {alert.medication}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">{alert.location}</p>
                    <p className="text-sm text-gray-600">
                      {alert.quantity} - {alert.status}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
