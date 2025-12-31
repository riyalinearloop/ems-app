"use client";

import { useState } from "react";
import {
  INCIDENTS,
  INCIDENT_STATS,
  INCIDENT_MEDICATIONS,
  DOSAGE_TYPES,
  LOSS_REASONS,
  Incident,
} from "@/components/data/incidents";
import IncidentScene from "./incidentScene";
import IncidentReportModal from "./IncidentReportModal";
import IncidentDetailsModal from "./IncidentDetailsModal";

const IncidentsContainer = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );

  const handleCloseReportModal = (data?: any) => {
    setIsReportModalOpen(false);
    if (data) {
      // Handle successful incident report - refresh data, show success message, etc.
      console.log("Incident reported:", data);
    }
  };

  const handleOpenDetailsModal = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedIncident(null);
  };

  return (
    <>
      <IncidentScene
        incidents={INCIDENTS}
        incidentStats={INCIDENT_STATS}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenDetailsModal={handleOpenDetailsModal}
      />
      {isReportModalOpen && (
        <IncidentReportModal
          isOpen={isReportModalOpen}
          onClose={handleCloseReportModal}
          medications={INCIDENT_MEDICATIONS}
          dosageTypes={DOSAGE_TYPES}
          lossReasons={LOSS_REASONS}
        />
      )}
      {isDetailsModalOpen && (
        <IncidentDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          incident={selectedIncident}
        />
      )}
    </>
  );
};

export default IncidentsContainer;

