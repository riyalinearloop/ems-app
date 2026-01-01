"use client";

import { useState } from "react";
import { AVAILABLE_POUCHES } from "@/components/data/withdraw-pouch";
import WithdrawPouchScene from "./withdrawPouchScene";
import WithdrawPouchModal from "./WithdrawPouchModal/WithdrawPouchModal";

const WithdrawPouchContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (data?: any) => {
    setIsModalOpen(false);
    if (data) {
      // TODO: Handle withdrawal completion
      console.log("Withdrawal completed:", data);
      // Show success toast, refresh data, etc.
    }
  };

  return (
    <>
      <WithdrawPouchScene
        pouches={AVAILABLE_POUCHES}
        onOpenWithdrawModal={handleOpenModal}
      />

      <WithdrawPouchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        availablePouches={AVAILABLE_POUCHES}
      />
    </>
  );
};

export default WithdrawPouchContainer;
