"use client";

import { useState } from "react";
import {
  POUCHES,
  POUCH_STATS,
  Pouch,
} from "@/components/data/live-pouch-status";
import LivePouchScene from "./livePouchScene";
import PouchDetailsModal from "./PouchDetailsModal";

const LivePouchContainer = () => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedPouch, setSelectedPouch] = useState<Pouch | null>(null);

  const handleSignOutPouch = () => {
    // Handle sign out pouch action
    console.log("Sign out pouch clicked");
  };

  const handleSignInPouch = () => {
    // Handle sign in pouch action
    console.log("Sign in pouch clicked");
  };

  const handleBulkUpdate = () => {
    // Handle bulk update action
    console.log("Bulk update clicked");
  };

  const handleViewDetails = (pouch: Pouch) => {
    setSelectedPouch(pouch);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedPouch(null);
  };

  const handleViewHistory = (pouch: Pouch) => {
    // Handle view history action
    console.log("View history for pouch:", pouch);
  };

  const handleExportDetails = (pouch: Pouch) => {
    // Handle export details action
    console.log("Export details for pouch:", pouch);
  };

  return (
    <>
      <LivePouchScene
        pouches={POUCHES}
        pouchStats={POUCH_STATS}
        onSignOutPouch={handleSignOutPouch}
        onSignInPouch={handleSignInPouch}
        onBulkUpdate={handleBulkUpdate}
        onViewDetails={handleViewDetails}
      />
      {isDetailsModalOpen && (
        <PouchDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          pouch={selectedPouch}
          onViewHistory={handleViewHistory}
          onExportDetails={handleExportDetails}
        />
      )}
    </>
  );
};

export default LivePouchContainer;
