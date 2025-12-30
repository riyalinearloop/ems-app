import {
  EXPIRY_SUMMARY_ROWS,
  ORDER_HISTORY_ROWS,
  ORDER_QUANTITIES,
  ORDER_STATUS_CONFIG,
  STATUS_FLOW_STEPS,
  THRESHOLD_SUMMARY_ROWS,
} from "@/components/data/order-management";
import OrderManagementScene from "./orderManagementScene";

const OrderManagementContainer = () => {
  return (
    <OrderManagementScene
      expirySummaryRows={EXPIRY_SUMMARY_ROWS}
      thresholdSummaryRows={THRESHOLD_SUMMARY_ROWS}
      orderHistoryRows={ORDER_HISTORY_ROWS}
      orderQuantities={ORDER_QUANTITIES}
      orderStatusConfig={ORDER_STATUS_CONFIG}
      statusFlowSteps={STATUS_FLOW_STEPS}
    />
  );
};

export default OrderManagementContainer;
