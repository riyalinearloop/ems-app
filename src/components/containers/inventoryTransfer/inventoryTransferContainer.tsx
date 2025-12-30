import {
  LOCATIONS,
  RECENT_TRANSFERS,
  TRANSFER_STATUS_CONFIG,
} from "@/components/data/inventory-transfer";
import InventoryTransferScene from "./inventoryTransferScene";

const InventoryTransferContainer = () => {
  return (
    <InventoryTransferScene
      locations={LOCATIONS}
      recentTransfers={RECENT_TRANSFERS}
      transferStatusConfig={TRANSFER_STATUS_CONFIG}
    />
  );
};

export default InventoryTransferContainer;
