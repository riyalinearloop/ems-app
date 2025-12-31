"use client";

import { CommonDialog } from "@/components/custom-components/commonDialog";
import CommonButton from "@/components/custom-components/commonButton";
import { Package, CheckCircle } from "lucide-react";
import type { Pouch } from "@/components/data/live-pouch-status";

interface PouchDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pouch: Pouch | null;
  onViewHistory?: (pouch: Pouch) => void;
  onExportDetails?: (pouch: Pouch) => void;
}

const PouchDetailsModal = ({
  isOpen,
  onClose,
  pouch,
  onViewHistory,
  onExportDetails,
}: PouchDetailsModalProps) => {
  if (!pouch) return null;

  const isSignedOut = pouch.status === "Signed Out";
  const isFull = pouch.fullness === "Full";
  const totalItems = pouch.medications.reduce(
    (sum, med) => sum + med.quantity,
    0
  );
  const uniqueMedications = pouch.medications.length;

  const handleViewHistory = () => {
    onViewHistory?.(pouch);
  };

  const handleExportDetails = () => {
    onExportDetails?.(pouch);
  };

  const footerActions = (
    <>
      <CommonButton
        variant="secondary"
        size="sm"
        type="button"
        onClick={handleExportDetails}
        className="w-30 bg-gray-600 hover:bg-gray-700 text-white"
      >
        Export Details
      </CommonButton>
      <CommonButton
        variant="primary"
        size="sm"
        type="button"
        onClick={handleViewHistory}
        className="w-30"
      >
        View History
      </CommonButton>
    </>
  );

  return (
    <CommonDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={pouch.pouchNumber}
      description="Detailed inventory breakdown"
      showFooter={true}
      footerActions={footerActions}
      dialogContentClassName="max-w-[95%] md:max-w-[90%] lg:max-w-[800px]"
    >
      <div className="max-h-[75vh] overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Status Information Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Status Information
            </h4>
            <div className="space-y-3">
              {/* Status */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Status
                </label>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    isSignedOut
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {pouch.status}
                </span>
              </div>

              {/* Assigned To */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Assigned To
                </label>
                <p
                  className={`text-sm ${
                    pouch.assignedTo ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {pouch.assignedTo || "Unassigned"}
                </p>
              </div>

              {/* Last Updated */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Last Updated
                </label>
                <p className="text-sm text-gray-900">{pouch.timeAgo}</p>
              </div>

              {/* Full Status */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Full Status
                </label>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    isFull
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {pouch.fullness}
                </span>
              </div>
            </div>
          </div>

          {/* Inventory Summary Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Inventory Summary
            </h4>
            <div className="space-y-4">
              {/* Total Items */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Total Items
                </label>
                <p className="text-3xl font-bold text-gray-900">{totalItems}</p>
              </div>

              {/* Unique Medications */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Unique Medications
                </label>
                <p className="text-3xl font-bold text-gray-900">
                  {uniqueMedications}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Medication Breakdown Section */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">
            Medication Breakdown
          </h4>
          <div className="space-y-3">
            {pouch.medications.map((medication, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {medication.name}
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {medication.quantity} {medication.quantity === 1 ? "unit" : "units"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CommonDialog>
  );
};

export default PouchDetailsModal;

