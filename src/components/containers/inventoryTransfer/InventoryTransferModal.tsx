"use client";

import { ArrowRight, Plus, Minus } from "lucide-react";
import { CommonSelectInput } from "@/components/custom-components/commonSelectInput";
import { CommonDialog } from "@/components/custom-components/commonDialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CommonButton from "@/components/custom-components/commonButton";
import { Medication } from "@/components/data/inventory-transfer";

interface InventoryTransferModalProps {
  isOpen: boolean;
  onClose: (data?: any) => void;
  locations: Array<{ value: string; label: string }>;
  availableMedications?: Medication[];
  currentInventory?: Medication[];
}

const InventoryTransferModal = (props: InventoryTransferModalProps) => {
  const {
    isOpen,
    onClose,
    locations,
    availableMedications = [],
    currentInventory = [],
  } = props;

  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [transferQuantities, setTransferQuantities] = useState<
    Record<string, number>
  >({});

  // Get location label
  const getLocationLabel = (value: string) => {
    const location = locations.find((loc) => loc.value === value);
    return location?.label || value;
  };

  // Handle quantity change
  const handleQuantityChange = (medicationName: string, delta: number) => {
    const medication = availableMedications.find(
      (m) => m.name === medicationName
    );
    if (!medication || medication.available === undefined) return;

    const currentQuantity = transferQuantities[medicationName] || 0;
    const newQuantity = Math.max(
      0,
      Math.min(medication.available, currentQuantity + delta)
    );

    setTransferQuantities({
      ...transferQuantities,
      [medicationName]: newQuantity,
    });
  };

  // Handle direct input change
  const handleInputChange = (medicationName: string, value: string) => {
    const medication = availableMedications.find(
      (m) => m.name === medicationName
    );
    if (!medication || medication.available === undefined) return;

    const numValue = parseInt(value) || 0;
    const newQuantity = Math.max(0, Math.min(medication.available, numValue));

    setTransferQuantities({
      ...transferQuantities,
      [medicationName]: newQuantity,
    });
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically call an API to process the transfer
    const transferData = {
      fromLocation,
      toLocation,
      quantities: transferQuantities,
    };
    onClose(transferData);
    // Reset form
    setFromLocation("");
    setToLocation("");
    setTransferQuantities({});
  };

  // Handle close
  const handleClose = () => {
    setFromLocation("");
    setToLocation("");
    setTransferQuantities({});
    onClose();
  };

  const footerActions = (
    <>
      <CommonButton
        variant="secondary"
        size="sm"
        type="button"
        onClick={handleClose}
        className="w-full sm:w-auto"
      >
        Cancel
      </CommonButton>
      <CommonButton
        variant="primary"
        type="submit"
        size="sm"
        className="w-full sm:w-auto"
        disabled={!fromLocation || !toLocation}
      >
        Transfer
      </CommonButton>
    </>
  );

  return (
    <CommonDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
      title="Inventory Transfer"
      description="Transfer medications between locations"
      showFooter={true}
      footerActions={footerActions}
      onSubmit={handleSubmit}
      dialogContentClassName="max-w-[95%] md:max-w-[90%] lg:max-w-[1000px]"
    >
      <div className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-180px)] sm:max-h-[calc(90vh-200px)]">
        {/* Location Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-7 md:mb-8">
          {/* From location */}
          <div>
            <CommonSelectInput
              label="From Location"
              placeholder="Select location..."
              options={locations.filter((loc) => loc.value !== "")}
              value={fromLocation}
              onValueChange={(val) => {
                setFromLocation(val || "");
                setTransferQuantities({});
              }}
              className="w-full"
            />
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center order-3 md:order-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center rotate-90 md:rotate-0">
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>

          {/* To location */}
          <div className="order-2 md:order-3">
            <CommonSelectInput
              label="To Location"
              placeholder="Select location..."
              options={locations.filter((loc) => loc.value !== "")}
              value={toLocation}
              onValueChange={(val) => {
                setToLocation(val || "");
              }}
              className="w-full"
            />
          </div>
        </div>

        {/* Medication Quantities Section */}
        {fromLocation && toLocation && availableMedications.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-7 md:mb-8">
            {/* Available Medications */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">
                Available at {getLocationLabel(fromLocation)}
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {availableMedications.map((medication) => (
                  <div
                    key={medication.name}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium text-gray-700">
                      {medication.name}
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {medication.available ?? 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfer Quantities */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">
                Transfer Quantities
              </h4>
              <div className="space-y-3">
                {availableMedications.map((medication) => {
                  const quantity = transferQuantities[medication.name] || 0;
                  const available = medication.available ?? 0;
                  return (
                    <div
                      key={medication.name}
                      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                    >
                      <span className="font-medium text-gray-700">
                        {medication.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="h-8 w-8 p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          disabled={quantity === 0}
                          onClick={() =>
                            handleQuantityChange(medication.name, -1)
                          }
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <input
                          type="number"
                          min="0"
                          max={available}
                          value={quantity}
                          onChange={(e) =>
                            handleInputChange(medication.name, e.target.value)
                          }
                          className="w-16 text-center border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="h-8 w-8 p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          disabled={quantity >= available}
                          onClick={() =>
                            handleQuantityChange(medication.name, 1)
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <span className="text-sm text-gray-500">
                          / {available}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current Inventory at Destination */}
            {currentInventory.length > 0 && (
              <div className="lg:col-span-2">
                <h4 className="font-medium text-gray-900 mb-4">
                  Current at {getLocationLabel(toLocation)}
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  {currentInventory.map((medication) => (
                    <div
                      key={medication.name}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium text-gray-700">
                        {medication.name}
                      </span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">
                          {medication.current || 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </CommonDialog>
  );
};

export default InventoryTransferModal;
