"use client";

import { Calendar, Plus, X, AlertTriangle, CheckCircle, Clock, Package } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type {
  OrderVersion,
  OrderHistoryRow,
  OrderMedication,
  IconName,
} from "../../data/order-management";
import { useState } from "react";

// Icon mapping for converting string identifiers to components
const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
  Clock,
  AlertTriangle,
  CheckCircle,
  Package,
};

interface QuantityRow {
  name: string;
  suggested?: string;
}

interface OrderManagementSceneProps {
  expirySummaryRows: Array<{ name: string; detail: string }>;
  thresholdSummaryRows: Array<{ name: string; detail: string }>;
  orderHistoryRows: OrderHistoryRow[];
  orderQuantities: Record<OrderVersion, QuantityRow[]>;
  orderStatusConfig: Record<
    string,
    {
      label: string;
      icon: IconName;
      badgeClasses: string;
      textClasses: string;
    }
  >;
  statusFlowSteps: Array<{
    label: string;
    icon: IconName;
    circleClasses: string;
  }>;
}

const OrderManagementScene = (props: OrderManagementSceneProps) => {
  const {
    expirySummaryRows,
    thresholdSummaryRows,
    orderHistoryRows,
    orderQuantities,
    orderStatusConfig,
    statusFlowSteps,
  } = props;

  const [showNewOrder, setShowNewOrder] = useState(false);
  const [orderVersion, setOrderVersion] = useState<OrderVersion>("expiry");
  return (
    <div className="space-y-6">
      {/* Header + primary action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
          <p className="text-gray-600">
            Manage medication orders and authorization requests
          </p>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
          onClick={() => setShowNewOrder(true)}
        >
          <Plus className="h-4 w-4" />
          <span>New Order</span>
        </button>
      </div>

      {/* Order history table */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-6">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Order History
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Medications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    ETA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {orderHistoryRows.map((order) => {
                  const statusConfig = orderStatusConfig[order.status];
                  const StatusIcon = iconMap[statusConfig.icon];

                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="max-w-xs space-y-1">
                          {order.medications.map(
                            (medication: OrderMedication) => (
                              <div key={medication.name} className="text-xs">
                                {medication.name}:{" "}
                                <span className="font-medium">
                                  {medication.amount}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex items-center space-x-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig.badgeClasses} ${statusConfig.textClasses}`}
                        >
                          <StatusIcon className="h-4 w-4" />
                          <span>{statusConfig.label}</span>
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div>
                          <div className="font-medium">{order.typeVersion}</div>
                          <div className="text-xs capitalize text-gray-400">
                            {order.typeLabel}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {order.created}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {order.eta ? (
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{order.eta}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order status flow */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-200 p-6">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Order Status Flow
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Track the progress of your orders through the system
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex items-start justify-center overflow-x-auto">
            {statusFlowSteps.flatMap((step, index) => {
              const StepIcon = iconMap[step.icon];
              const elements = [
                <div key={step.label} className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${step.circleClasses}`}
                  >
                    <StepIcon className="h-4 w-4" />
                  </div>
                  <span className="mt-2 text-center text-xs font-medium text-gray-600 whitespace-nowrap">
                    {step.label}
                  </span>
                </div>,
              ];

              if (index < statusFlowSteps.length - 1) {
                elements.push(
                  <div
                    key={`line-${index}`}
                    className="flex-1 h-0.5 bg-gray-200 mx-2 min-w-[40px] relative top-5"
                  />
                );
              }

              return elements;
            })}
          </div>
        </CardContent>
      </Card>

      {/* New Order modal */}
      {showNewOrder ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-2 py-4 sm:px-4 sm:py-8">
          <div className="w-full max-w-lg sm:max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Create New Order
                </h3>
                <p className="text-sm text-gray-600">
                  Configure your medication order
                </p>
              </div>
              <button
                type="button"
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close"
                onClick={() => setShowNewOrder(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 space-y-6 bg-gray-50 pb-8">
              {/* Order configuration */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Order Configuration
                </label>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Version 1 */}
                  <button
                    type="button"
                    onClick={() => setOrderVersion("expiry")}
                    className={`rounded-lg border-2 p-4 text-left transition-all ${
                      orderVersion === "expiry"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="mb-2 flex items-center">
                      <div
                        className={`mr-3 h-4 w-4 rounded-full ${
                          orderVersion === "expiry"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <h4 className="font-medium text-gray-900">
                        Version 1: Expiry-Based
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Order based on expiring medications and usage data
                    </p>
                  </button>

                  {/* Version 2 */}
                  <button
                    type="button"
                    onClick={() => setOrderVersion("threshold")}
                    className={`rounded-lg border-2 p-4 text-left transition-all ${
                      orderVersion === "threshold"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="mb-2 flex items-center">
                      <div
                        className={`mr-3 h-4 w-4 rounded-full ${
                          orderVersion === "threshold"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <h4 className="font-medium text-gray-900">
                        Version 2: Threshold-Based
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Order based on minimum/maximum thresholds
                    </p>
                  </button>
                </div>
              </div>

              {/* Version-specific summary card */}
              {orderVersion === "expiry" ? (
                <div className="rounded-lg bg-white p-4">
                  <h4 className="mb-3 font-medium text-gray-900">
                    Expiring Medications (3-month window)
                  </h4>
                  <div className="space-y-2 text-sm">
                    {expirySummaryRows.map((row) => (
                      <div
                        key={row.name}
                        className="flex flex-col items-start gap-0.5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
                      >
                        <span className="text-gray-700">{row.name}</span>
                        <span className="text-gray-600">{row.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-lg bg-white p-4">
                  <h4 className="mb-3 font-medium text-gray-900">
                    Below Threshold Medications
                  </h4>
                  <div className="space-y-2 text-sm">
                    {thresholdSummaryRows.map((row) => (
                      <div
                        key={row.name}
                        className="flex flex-col items-start gap-0.5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
                      >
                        <span className="text-gray-700">{row.name}</span>
                        <span className="text-gray-600">{row.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order quantities */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Order Quantities
                </label>
                <div className="space-y-3">
                  {orderQuantities[orderVersion].map((item: QuantityRow) => (
                    <div
                      key={item.name}
                      className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex-1 text-sm text-left">
                        <span className="font-medium text-gray-700">
                          {item.name}
                        </span>
                        {item.suggested ? (
                          <span className="ml-2 text-sm text-blue-600">
                            (Suggested: {item.suggested})
                          </span>
                        ) : null}
                      </div>
                      <input
                        type="number"
                        min={0}
                        placeholder="0"
                        className="w-full rounded border border-gray-300 px-2 py-1 text-right text-sm sm:w-24 sm:text-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-white px-6 py-4">
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                onClick={() => setShowNewOrder(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrderManagementScene;
