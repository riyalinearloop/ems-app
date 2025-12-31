"use client";

import { useState } from "react";
import {
  EXPIRY_SUMMARY_ROWS,
  ORDER_HISTORY_ROWS,
  ORDER_QUANTITIES,
  ORDER_STATUS_CONFIG,
  STATUS_FLOW_STEPS,
  THRESHOLD_SUMMARY_ROWS,
} from "@/components/data/order-management";
import OrderManagementScene from "./orderManagementScene";
import OrderManagementModal from "./OrderManagementModal";

const OrderManagementContainer = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleCloseModal = (data?: any) => {
    setIsOrderModalOpen(false);
    if (data) {
      // Handle successful order creation - refresh data, show success message, etc.
      console.log("Order created:", data);
    }
  };

  return (
    <>
      <OrderManagementScene
        expirySummaryRows={EXPIRY_SUMMARY_ROWS}
        thresholdSummaryRows={THRESHOLD_SUMMARY_ROWS}
        orderHistoryRows={ORDER_HISTORY_ROWS}
        orderStatusConfig={ORDER_STATUS_CONFIG}
        statusFlowSteps={STATUS_FLOW_STEPS}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
      />
      {isOrderModalOpen && (
        <OrderManagementModal
          isOpen={isOrderModalOpen}
          onClose={handleCloseModal}
          expirySummaryRows={EXPIRY_SUMMARY_ROWS}
          thresholdSummaryRows={THRESHOLD_SUMMARY_ROWS}
          orderQuantities={ORDER_QUANTITIES}
        />
      )}
    </>
  );
};

export default OrderManagementContainer;
