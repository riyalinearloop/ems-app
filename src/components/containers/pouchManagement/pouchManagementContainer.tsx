"use client";

import { useState } from "react";
import { SIGNED_OUT_POUCHES } from "@/components/data/pouch-management";
import PouchManagementScene from "./pouchManagementScene";
import WithdrawPouchModal from "../withdrawPouch/WithdrawPouchModal/WithdrawPouchModal";
import ReturnPouchModal from "../returnPouch/ReturnPouchModal/ReturnPouchModal";
import RefillPouchModal from "../refillPouch/RefillPouchModal/RefillPouchModal";
import { AVAILABLE_POUCHES } from "@/components/data/withdraw-pouch";

const PouchManagementContainer = () => {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);

  const handleOpenWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleCloseWithdrawModal = (data?: any) => {
    setIsWithdrawModalOpen(false);
    if (data) {
      // TODO: Handle withdrawal completion
      console.log("Withdrawal completed:", data);
      // Show success toast, refresh data, etc.
    }
  };

  const handleOpenReturnModal = () => {
    setIsReturnModalOpen(true);
  };

  const handleCloseReturnModal = (data?: any) => {
    setIsReturnModalOpen(false);
    if (data) {
      // TODO: Handle return completion
      console.log("Return completed:", data);
      // Show success toast, refresh data, etc.
    }
  };

  const handleOpenRefillModal = () => {
    setIsRefillModalOpen(true);
  };

  const handleCloseRefillModal = (data?: any) => {
    setIsRefillModalOpen(false);
    if (data) {
      // TODO: Handle refill completion
      console.log("Refill completed:", data);
      // Show success toast, refresh data, etc.
    }
  };

  return (
    <>
      <PouchManagementScene
        signedOutPouches={SIGNED_OUT_POUCHES}
        onOpenWithdrawModal={handleOpenWithdrawModal}
        onOpenReturnModal={handleOpenReturnModal}
        onOpenRefillModal={handleOpenRefillModal}
      />

      {/* Withdraw Pouch Modal */}
      <WithdrawPouchModal
        isOpen={isWithdrawModalOpen}
        onClose={handleCloseWithdrawModal}
        availablePouches={AVAILABLE_POUCHES}
      />

      {/* Return Pouch Modal */}
      <ReturnPouchModal
        isOpen={isReturnModalOpen}
        onClose={handleCloseReturnModal}
        signedOutPouches={SIGNED_OUT_POUCHES.filter(
          (p) => p.status === "Active"
        )}
      />

      {/* Refill Pouch Modal */}
      <RefillPouchModal
        isOpen={isRefillModalOpen}
        onClose={handleCloseRefillModal}
        signedOutPouches={SIGNED_OUT_POUCHES.filter(
          (p) => p.status === "Active"
        )}
      />
    </>
  );
};

export default PouchManagementContainer;
