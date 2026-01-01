"use client";
import { useState } from "react";
import {
  LOCATIONS,
  RECENT_TRANSFERS,
  TRANSFER_STATUS_CONFIG,
  SAMPLE_AVAILABLE_MEDICATIONS,
  SAMPLE_CURRENT_INVENTORY,
} from "@/components/data/inventory-transfer";
import InventoryTransferScene from "./inventoryTransferScene";
import InventoryTransferModal from "./InventoryTransferModal";

const InventoryTransferContainer = () => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const handleCloseModal = (data?: any) => {
    setIsTransferModalOpen(false);
    if (data) {
      // Handle successful transfer - refresh data, show success message, etc.
      console.log("Transfer completed:", data);
    }
  };

  return (
    <>
      <InventoryTransferScene
        locations={LOCATIONS}
        recentTransfers={RECENT_TRANSFERS}
        transferStatusConfig={TRANSFER_STATUS_CONFIG}
        onOpenTransferModal={() => setIsTransferModalOpen(true)}
      />
      {isTransferModalOpen && (
        <InventoryTransferModal
          isOpen={isTransferModalOpen}
          onClose={handleCloseModal}
          locations={LOCATIONS}
          availableMedications={SAMPLE_AVAILABLE_MEDICATIONS}
          currentInventory={SAMPLE_CURRENT_INVENTORY}
        />
      )}
    </>
  );
};

export default InventoryTransferContainer;
