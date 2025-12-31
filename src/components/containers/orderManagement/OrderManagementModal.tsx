"use client";

import { useState } from "react";
import { CommonDialog } from "@/components/custom-components/commonDialog";
import CommonButton from "@/components/custom-components/commonButton";
import type { OrderVersion } from "@/components/data/order-management";

interface QuantityRow {
  name: string;
  suggested?: string;
}

interface OrderManagementModalProps {
  isOpen: boolean;
  onClose: (data?: any) => void;
  expirySummaryRows: Array<{ name: string; detail: string }>;
  thresholdSummaryRows: Array<{ name: string; detail: string }>;
  orderQuantities: Record<OrderVersion, QuantityRow[]>;
}

const OrderManagementModal = (props: OrderManagementModalProps) => {
  const {
    isOpen,
    onClose,
    expirySummaryRows,
    thresholdSummaryRows,
    orderQuantities,
  } = props;

  const [orderVersion, setOrderVersion] = useState<OrderVersion>("expiry");
  const [orderQuantitiesState, setOrderQuantitiesState] = useState<
    Record<string, number>
  >({});

  // Handle quantity input change
  const handleQuantityChange = (medicationName: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setOrderQuantitiesState({
      ...orderQuantitiesState,
      [medicationName]: numValue,
    });
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const orderData = {
      version: orderVersion,
      quantities: orderQuantitiesState,
    };
    onClose(orderData);
    // Reset form
    setOrderVersion("expiry");
    setOrderQuantitiesState({});
  };

  // Handle close
  const handleClose = () => {
    setOrderVersion("expiry");
    setOrderQuantitiesState({});
    onClose();
  };

  const footerActions = (
    <>
      <CommonButton
        variant="secondary"
        size="sm"
        type="button"
        onClick={handleClose}
        className="w-30"
      >
        Cancel
      </CommonButton>
      <CommonButton
        variant="primary"
        type="submit"
        size="sm"
        className="w-30"
      >
        Create Order
      </CommonButton>
    </>
  );

  return (
    <CommonDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
      title="Create New Order"
      description="Configure your medication order"
      showFooter={true}
      footerActions={footerActions}
      onSubmit={handleSubmit}
      dialogContentClassName="max-w-[95%] md:max-w-[90%] lg:max-w-[1000px]"
    >
      <div className="max-h-[70vh] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 space-y-6 bg-gray-50">
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
                    orderVersion === "expiry" ? "bg-blue-500" : "bg-gray-300"
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
                  value={orderQuantitiesState[item.name] || ""}
                  onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                  className="w-full rounded border border-gray-300 px-2 py-1 text-right text-sm sm:w-24 sm:text-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </CommonDialog>
  );
};

export default OrderManagementModal;

