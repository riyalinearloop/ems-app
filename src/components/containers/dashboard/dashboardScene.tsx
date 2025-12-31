"use client";

import React from "react";
import {
  Package,
  AlertTriangle,
  Activity,
  TrendingUp,
  ArrowDown,
  ArrowUp,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommonButton from "@/components/custom-components/commonButton";

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

interface DashboardSceneProps {
  userType?: string;
}

export const DashboardScene = ({ userType }: DashboardSceneProps) => {
  const isParamedic = userType === "paramedic";

  // Paramedic Dashboard Content
  if (isParamedic) {
    return <ParamedicDashboard />;
  }

  // Logistic Dashboard Content
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
    <div className="space-y-4 md:space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Inventory Overview */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              Inventory Overview
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mb-4">
              Real-time inventory levels across all locations
            </p>

            {/* Headquarters */}
            <div className="mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                Headquarters (HQ)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                {medications.map((med) => (
                  <InventoryCard key={med.name} {...med} />
                ))}
              </div>
            </div>

            {/* Depot 1 */}
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                Depot 1 (D1)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
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

// Paramedic Dashboard Component
const ParamedicDashboard = () => {
  const myPouches = [
    {
      pouchNumber: "P001",
      status: "In Use",
      withdrawnDate: "2025-01-26 08:00:00",
      medications: [
        { name: "Morphine", quantity: 2, used: 1 },
        { name: "Fentanyl", quantity: 1, used: 0 },
        { name: "Midazolam", quantity: 1, used: 1 },
      ],
    },
    {
      pouchNumber: "P003",
      status: "In Use",
      withdrawnDate: "2025-01-26 10:00:00",
      medications: [
        { name: "Fentanyl", quantity: 2, used: 0 },
        { name: "Midazolam", quantity: 2, used: 1 },
        { name: "Ketamine", quantity: 1, used: 0 },
      ],
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <MetricCard
          title="Active Pouches"
          value={myPouches.length.toString()}
          icon={Package}
          iconColor="bg-blue-600"
        />
        <MetricCard
          title="Available Pouches"
          value="2"
          icon={Activity}
          iconColor="bg-green-600"
        />
        <MetricCard
          title="Pending Returns"
          value="1"
          icon={AlertTriangle}
          iconColor="bg-yellow-600"
        />
        <MetricCard
          title="Notifications"
          value="3"
          icon={TrendingUp}
          iconColor="bg-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* My Active Pouches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              My Active Pouches
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myPouches.map((pouch) => (
              <Card key={pouch.pouchNumber} className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">
                      {pouch.pouchNumber}
                    </h4>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                      {pouch.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    Withdrawn: {pouch.withdrawnDate}
                  </p>
                  <div className="space-y-1">
                    {pouch.medications.map((med, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-700">{med.name}</span>
                        <span className="text-gray-600">
                          {med.used}/{med.quantity} used
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CommonButton
              variant="primary"
              className="w-full justify-start"
              onClick={() => (window.location.href = "/withdraw-pouch")}
            >
              <ArrowDownCircle className="w-4 h-4 mr-2" />
              Withdraw New Pouch
            </CommonButton>
            <CommonButton
              variant="secondary"
              className="w-full justify-start"
              onClick={() => (window.location.href = "/return-pouch")}
            >
              <ArrowUpCircle className="w-4 h-4 mr-2" />
              Return Pouch
            </CommonButton>
            <CommonButton
              variant="secondary"
              className="w-full justify-start"
              onClick={() => (window.location.href = "/pouch-history")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              View Pouch History
            </CommonButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
